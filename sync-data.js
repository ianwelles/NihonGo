import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  places: {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1152874887&single=true&output=csv',
    path: 'places.ts',
    transform: (rows) => {
      const places = {};
      rows.forEach(row => {
        if (!row.id) return;
        const place = {
          id: row.id,
          name: row.name,
          type: row.type,
          city: row.city,
          coordinates: {
            lat: parseFloat(row.lat),
            lon: parseFloat(row.lon)
          },
          description: row.description,
          url: row.url || undefined,
          tags: row.tags ? row.tags.split(',').map(t => t.trim()) : []
        };
        
        if (row.type === 'hotel' && row.address) {
          place.hotelMeta = {
            address: row.address,
            directions: row.directions,
            neighborhoodInsights: row.neighborhoodInsights,
            // Tags are now handled at the top level for all places.
            // Keeping `tags` here for backward compatibility if needed, but it's redundant now.
            tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [] 
          };
        }
        places[row.id] = place;
      });
      return `import { Place } from './types';\n\nexport const places: Record<string, Place> = ${JSON.stringify(places, null, 2)};\n`;
    }
  },
  itinerary: {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1332892089&single=true&output=csv',
    path: 'itinerary.ts',
    transform: (rows) => {
      const daysMap = new Map();
      rows.forEach(row => {
        const dayNum = parseInt(row.dayNumber);
        if (isNaN(dayNum) || !row.city) return; // Ensure city is present

        const compositeKey = `${dayNum}-${row.city}`;

        if (!daysMap.has(compositeKey)) {
          daysMap.set(compositeKey, {
            dayNumber: dayNum,
            city: row.city, // Assign single city
            theme: row.theme,
            date: row.date,
            hotelId: row.hotelId || undefined,
            activities: []
          });
        }

        if (row.placeId) {
          daysMap.get(compositeKey).activities.push({
            placeId: row.placeId,
            time: row.time,
            label: row.label || undefined,
            description: row.description || undefined,
            tip: row.tip || undefined,
            icon: row.icon || undefined,
            link: row.link || undefined
          });
        }
      });
      const itinerary = Array.from(daysMap.values()).sort((a, b) => {
        if (a.dayNumber === b.dayNumber) {
          return a.city.localeCompare(b.city); // Sort by city for same day number
        }
        return a.dayNumber - b.dayNumber;
      });
      
      return `import { DayItinerary } from './types';\n\n// --- Date Configuration ---\nexport const startDate = new Date('2025-02-18');\nexport const endDate = new Date('2025-02-28');\n\n// --- Itinerary Data ---\nexport const itineraryData: DayItinerary[] = ${JSON.stringify(itinerary, null, 2)};\n`;
    }
  },
  theme: {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1754683644&single=true&output=csv',
    path: 'theme.ts',
    transform: (rows) => {
      const cityColors = {};
      const markerColors = {};
      rows.forEach(row => {
        if (row.category === 'city') cityColors[row.key] = row.value;
        if (row.category === 'marker') markerColors[row.key] = row.value;
      });
      return `import { CityName } from './types';\n\nexport const cityThemeColors: { [key in CityName]: string } = ${JSON.stringify(cityColors, null, 2)};\n\nexport const mapMarkerColors: Record<string, string> = ${JSON.stringify(markerColors, null, 2)};\n`;
    }
  },
  tips: {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=489356129&single=true&output=csv',
    path: 'tips.tsx',
    transform: (rows) => {
      const tipsMap = new Map();
      rows.forEach(row => {
        if (!row.category) return;
        if (!tipsMap.has(row.category)) {
          tipsMap.set(row.category, { title: row.category, items: [] });
        }
        if (row.item) {
          tipsMap.get(row.category).items.push({
            name: row.item,
            notes: row.notes || ''
          });
        }
      });
      const tips = Array.from(tipsMap.values());
      return `import { TipCategory } from './types';\n\nexport const tipsList: TipCategory[] = ${JSON.stringify(tips, null, 2)};\n`;
    }
  }
};

async function sync() {
  console.log('Starting sync from Google Sheets...');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), 'backups', timestamp);

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  for (const [key, item] of Object.entries(CONFIG)) {
    try {
      console.log(`Processing ${key}...`);
      
      if (fs.existsSync(item.path)) {
        const backupPath = path.join(backupDir, item.path);
        fs.copyFileSync(item.path, backupPath);
        console.log(`  - Backed up to ${backupPath}`);
      }

      console.log(`  - Fetching CSV...`);
      const response = await fetch(item.url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const csvText = await response.text();
      
      const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
      if (parsed.errors && parsed.errors.length > 0) {
        console.warn(`  - Parse warnings for ${key}:`, parsed.errors);
      }
      
      const tsContent = item.transform(parsed.data);
      
      fs.writeFileSync(item.path, tsContent);
      console.log(`  - Successfully updated ${item.path}`);
    } catch (error) {
      console.error(`  - Failed to sync ${key}:`, error.message);
    }
  }
  
  console.log('\nSync process complete!');
  console.log(`Backups are stored in: ${backupDir}`);
}

sync();
