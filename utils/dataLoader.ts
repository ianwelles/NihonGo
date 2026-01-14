import Papa from 'papaparse';
import { Place, DayItinerary, TipCategory, CityName, Activity, PlaceCategory } from '../types';
import { places as fallbackPlaces } from '../places';
import { itineraryData as fallbackItinerary, startDate as fallbackStartDate, endDate as fallbackEndDate } from '../itinerary';
import { cityThemeColors as fallbackCityColors, mapMarkerColors as fallbackMarkerColors } from '../theme';
import { tipsList as fallbackTips } from '../tips';

// --- CONFIGURATION ---
// These URLs point to the published Google Sheets CSVs
export const PLACES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1152874887&single=true&output=csv';
export const ITINERARY_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1332892089&single=true&output=csv';
export const THEME_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1754683644&single=true&output=csv';
export const TIPS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=489356129&single=true&output=csv';

const fetchCSV = async (url: string): Promise<any[]> => {
  if (!url) throw new Error("URL not provided");
  
  const cacheBuster = `t=${Date.now()}`;
  const fetchUrl = url.includes('?') ? `${url}&${cacheBuster}` : `${url}?${cacheBuster}`;

  const response = await fetch(fetchUrl);

  if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  const text = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().replace(/^\uFEFF/, ''),
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
          tags: row.tags ? row.tags.split(',').map((t: string) => t.trim()) : [], 
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
      const cityGroups = new Map<string, Map<number, DayItinerary>>();

      rows.forEach((row: any) => {
        const dayNum = parseInt(row.dayNumber);
        if (isNaN(dayNum) || !row.city) return; 

        if (!cityGroups.has(row.city)) {
          cityGroups.set(row.city, new Map<number, DayItinerary>());
        }

        const cityDays = cityGroups.get(row.city)!;
        if (!cityDays.has(dayNum)) {
          cityDays.set(dayNum, {
            dayNumber: dayNum,
            city: row.city as CityName,
            theme: row.theme,
            date: row.date,
            hotelId: row.hotelId || undefined,
            activities: []
          });
        }

        const dayEntry = cityDays.get(dayNum)!;
        if (row.theme) dayEntry.theme = row.theme;
        if (row.date) dayEntry.date = row.date;
        if (row.hotelId) dayEntry.hotelId = row.hotelId;

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
            dayEntry.activities.push(activity);
        }
      });

      // Determine city order by the lowest day number in each city
      const cityOrder = Array.from(cityGroups.entries()).map(([city, cityDays]) => {
        const minDay = Math.min(...Array.from(cityDays.keys()));
        return { city, minDay, cityDays };
      }).sort((a, b) => a.minDay - b.minDay);

      const newItinerary: DayItinerary[] = [];
      for (const group of cityOrder) {
        const sortedDays = Array.from(group.cityDays.values()).sort((a, b) => a.dayNumber - b.dayNumber);
        newItinerary.push(...sortedDays);
      }
      
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
