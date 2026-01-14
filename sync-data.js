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
        const id = row.id || row['id'];
        if (!id) return;
        const place = {
          id: id,
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
            tags: row.tags ? row.tags.split(',').map(t => t.trim()) : [] 
          };
        }
        places[id] = place;
      });
      return `import { Place } from './types';\n\nexport const places: Record<string, Place> = ${JSON.stringify(places, null, 2)};\n`;
    }
  },
  itinerary: {
    url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1332892089&single=true&output=csv',
    path: 'itinerary.ts',
    transform: (rows) => {
      // Group by city, then by day number within each city
      const cityGroups = new Map(); // Map<CityName, Map<DayNum, DayItinerary>>

      rows.forEach(row => {
        const dayNum = parseInt(row.dayNumber);
        if (isNaN(dayNum) || !row.city) return;

        if (!cityGroups.has(row.city)) {
          cityGroups.set(row.city, new Map());
        }
        
        const cityDays = cityGroups.get(row.city);
        if (!cityDays.has(dayNum)) {
          cityDays.set(dayNum, {
            dayNumber: dayNum,
            city: row.city,
            theme: row.theme,
            date: row.date,
            hotelId: row.hotelId || undefined,
            activities: []
          });
        }

        const dayEntry = cityDays.get(dayNum);
        // Only update metadata if provided in the current row
        if (row.theme) dayEntry.theme = row.theme;
        if (row.date) dayEntry.date = row.date;
        if (row.hotelId) dayEntry.hotelId = row.hotelId;

        if (row.placeId) {
          dayEntry.activities.push({
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
      
      // Determine city order by the lowest day number in each city
      const cityOrder = Array.from(cityGroups.entries()).map(([city, cityDays]) => {
        const minDay = Math.min(...Array.from(cityDays.keys()));
        return { city, minDay, cityDays };
      }).sort((a, b) => a.minDay - b.minDay);

      const itinerary = [];
      for (const group of cityOrder) {
        const sortedDays = Array.from(group.cityDays.values()).sort((a, b) => a.dayNumber - b.dayNumber);
        itinerary.push(...sortedDays);
      }
      
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
      }

      // Add cache buster to the URL
      const fetchUrl = `${item.url}${item.url.includes('?') ? '&' : '?'}_t=${Date.now()}`;
      console.log(`  - Fetching CSV: ${key}...`);
      
      const response = await fetch(fetchUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const csvText = await response.text();
      
      const parsed = Papa.parse(csvText, { 
        header: true, 
        skipEmptyLines: true,
        transformHeader: (header) => header.trim().replace(/^\uFEFF/, '') 
      });
      
      if (parsed.errors && parsed.errors.length > 0) {
        console.warn(`  - Parse warnings for ${key}:`, parsed.errors);
      }
      
      if (!parsed.data || parsed.data.length === 0) {
        console.warn(`  - No data found for ${key}, skipping update.`);
        continue;
      }

      const tsContent = item.transform(parsed.data);
      
      fs.writeFileSync(item.path, tsContent);
      console.log(`  - Successfully updated ${item.path} with ${parsed.data.length} rows.`);
    } catch (error) {
      console.error(`  - Failed to sync ${key}:`, error.message);
    }
  }
  
  console.log('\nSync process complete!');
}

sync();
