import Papa from 'papaparse';
import { Place, DayItinerary, TipCategory, CityName, Activity, PlaceCategory } from '../types';
import { places as fallbackPlaces } from '../places';
import { itineraryData as fallbackItinerary, startDate as fallbackStartDate, endDate as fallbackEndDate } from '../itinerary';
import { cityThemeColors as fallbackCityColors, mapMarkerColors as fallbackMarkerColors } from '../theme';
import { tipsList as fallbackTips } from '../tips';

// --- CONFIGURATION ---
// Full URLs for the published Google Sheet CSVs
export const PLACES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1152874887&single=true&output=csv';
export const ITINERARY_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1332892089&single=true&output=csv';
export const THEME_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1754683644&single=true&output=csv';
export const TIPS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=489356129&single=true&output=csv';

// --- CSV STRUCTURE DOCUMENTATION ---

/*
1. PLACES CSV STRUCTURE:
   id, name, type, city, lat, lon, description, url, address, directions, neighborhoodInsights, tags
   
   - type: hotel, food, sight, travel, shopping, suggestion, sight_rec, food_rec
   - city: Tokyo, Kyoto, Osaka, Shanghai
   - tags: comma-separated list (e.g. "Local Vibe, Expert Guide")
   - address, directions, neighborhoodInsights: Only needed for hotels, can be empty for others.

2. ITINERARY CSV STRUCTURE:
   dayNumber, city, theme, date, hotelId, placeId, time, label, description, tip, icon, link

   - One row per activity.
   - dayNumber, city, theme, date, hotelId: These define the Day. Repeat them for every activity in that day.
   - placeId: matches 'id' from Places CSV.
   - icon: emoji character (e.g. 🏯)

3. THEME CSV STRUCTURE:
   category, key, value

   - category: 'city' or 'marker'
   - key: City name (Tokyo) or Marker type (hotel, food)
   - value: Hex color code (e.g. #FF1744)

4. TIPS CSV STRUCTURE:
   category, item, notes

   - category: The section title (e.g. "Convenience Stores")
   - item: The specific item (e.g. "Onigiri")
   - notes: Description or advice
*/

export interface AppData {
  places: Record<string, Place>;
  itinerary: DayItinerary[];
  startDate: Date;
  endDate: Date;
  theme: {
    cityColors: Record<string, string>;
    markerColors: Record<string, string>;
  };
  tips: TipCategory[];
}

const fetchCSV = async (url: string): Promise<any[]> => {
  if (!url) throw new Error("URL not provided");
  
  // Add a cache-busting timestamp to the URL
  const cacheBuster = `&t=${Date.now()}`;
  const fetchUrl = url.includes('?') ? `${url}${cacheBuster}` : `${url}?${cacheBuster}`;

  // Removed custom headers and cache: 'no-store' as per CORS preflight fix
  const response = await fetch(fetchUrl);

  if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  const text = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => resolve(results.data),
      error: (error: any) => reject(error),
    });
  });
};

export const loadAppData = async (): Promise<AppData> => {
  const data: AppData = {
    places: fallbackPlaces,
    itinerary: fallbackItinerary,
    startDate: fallbackStartDate,
    endDate: fallbackEndDate,
    theme: {
      cityColors: fallbackCityColors,
      markerColors: fallbackMarkerColors,
    },
    tips: fallbackTips,
  };

  // 1. Load Places
  if (PLACES_CSV_URL) {
    try {
      const rows = await fetchCSV(PLACES_CSV_URL);
      const newPlaces: Record<string, Place> = {};
      
      rows.forEach((row: any) => {
        if (!row.id) return;
        newPlaces[row.id] = {
          id: row.id,
          name: row.name,
          type: row.type as PlaceCategory,
          city: row.city as CityName,
          coordinates: {
            lat: parseFloat(row.lat),
            lon: parseFloat(row.lon)
          },
          description: row.description,
          url: row.url || undefined,
          tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [], // Populate tags for all Place types
          hotelMeta: (row.type === 'hotel' && row.address) ? {
            address: row.address,
            directions: row.directions,
            neighborhoodInsights: row.neighborhoodInsights,
            tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : []
          } : undefined
        };
      });
      
      if (Object.keys(newPlaces).length > 0) {
        data.places = newPlaces;
      }
    } catch (e) {
      console.warn("Failed to load Places CSV, falling back to local data.", e);
    }
  }

  // 2. Load Itinerary
  if (ITINERARY_CSV_URL) {
    try {
      const rows = await fetchCSV(ITINERARY_CSV_URL);
      const daysMap = new Map<string, DayItinerary>(); // Use string for composite key

      rows.forEach((row: any) => {
        const dayNum = parseInt(row.dayNumber);
        if (isNaN(dayNum) || !row.city) return; // Ensure city is present

        const compositeKey = `${dayNum}-${row.city}`;

        if (!daysMap.has(compositeKey)) {
          daysMap.set(compositeKey, {
            dayNumber: dayNum,
            city: row.city as CityName, // Assign single city
            theme: row.theme,
            date: row.date,
            hotelId: row.hotelId || undefined,
            activities: []
          });
        }

        const day = daysMap.get(compositeKey)!;
        if (row.placeId) {
            const activity: Activity = {
                placeId: row.placeId,
                time: row.time,
                label: row.label || undefined,
                description: row.description || undefined,
                tip: row.tip || undefined,
                icon: row.icon || undefined,
                link: row.link || undefined
            };
            day.activities.push(activity);
        }
      });

      const newItinerary = Array.from(daysMap.values()).sort((a, b) => {
        if (a.dayNumber === b.dayNumber) {
          return a.city.localeCompare(b.city); // Sort by city for same day number
        }
        return a.dayNumber - b.dayNumber;
      });
      
      if (newItinerary.length > 0) {
        data.itinerary = newItinerary;
      }
    } catch (e) {
      console.warn("Failed to load Itinerary CSV, falling back to local data.", e);
    }
  }

  // 3. Load Theme
  if (THEME_CSV_URL) {
    try {
      const rows = await fetchCSV(THEME_CSV_URL);
      const newCityColors = { ...fallbackCityColors };
      const newMarkerColors = { ...fallbackMarkerColors };
      let hasUpdates = false;

      rows.forEach((row: any) => {
        if (row.category === 'city' && row.key && row.value) {
            // @ts-ignore
            newCityColors[row.key] = row.value;
            hasUpdates = true;
        } else if (row.category === 'marker' && row.key && row.value) {
            newMarkerColors[row.key] = row.value;
            hasUpdates = true;
        }
      });

      if (hasUpdates) {
        data.theme = {
            cityColors: newCityColors,
            markerColors: newMarkerColors
        };
      }
    } catch (e) {
        console.warn("Failed to load Theme CSV, falling back to local data.", e);
    }
  }

  // 4. Load Tips
  if (TIPS_CSV_URL) {
      try {
        const rows = await fetchCSV(TIPS_CSV_URL);
        const tipsMap = new Map<string, TipCategory>();

        rows.forEach((row: any) => {
            if (!row.category) return;
            
            if (!tipsMap.has(row.category)) {
                tipsMap.set(row.category, {
                    title: row.category,
                    items: []
                });
            }

            if (row.item) {
                tipsMap.get(row.category)!.items.push({
                    name: row.item,
                    notes: row.notes || ''
                });
            }
        });

        const newTips = Array.from(tipsMap.values());
        if (newTips.length > 0) {
            data.tips = newTips;
        }
      } catch (e) {
        console.warn("Failed to load Tips CSV, falling back to local data.", e);
      }
  }

  return data;
};