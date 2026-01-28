import Papa from 'papaparse';
import { Place, DayItinerary, TipCategory, CityName, Activity, PlaceCategory, AppData } from '../types';
import { places as fallbackPlaces } from '../places';
import { itineraryData as fallbackItinerary, startDate as fallbackStartDate, endDate as fallbackEndDate } from '../itinerary';
import { cityThemeColors as fallbackCityColors, mapMarkerColors as fallbackMarkerColors } from '../theme';
import { tipsList as fallbackTips } from '../tips';

// URLs
const PLACES_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1152874887&single=true&output=csv';
const ITINERARY_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1332892089&single=true&output=csv';
const THEME_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=1754683644&single=true&output=csv';
const TIPS_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRniSOAatP5VkPcJar3i-lMab0sZxPd3Q5td67o9kig_Zc9ZgjR4mCWL78dWHnxy0Yr9HAHdUxskKwb/pub?gid=489356129&single=true&output=csv';

const fetchCSV = async (url: string): Promise<any[]> => {
  if (!url) throw new Error("URL not provided");
  
  const response = await fetch(url);

  if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);
  const text = await response.text();
  
  return new Promise((resolve, reject) => {
    Papa.parse(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().replace(/^\ufeff/, ''), // Handle BOM
      complete: (results) => resolve(results.data),
      error: (error: any) => reject(error),
    });
  });
};

self.onmessage = async () => {
  const fullData: AppData = {
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

  try {
    let allPlaces: Record<string, Place> = {};
    let initialTheme = { cityColors: fallbackCityColors, markerColors: fallbackMarkerColors };

    // 1. Fetch Places and Theme concurrently for initial load
    const [placesRows, themeRows] = await Promise.all([
      PLACES_CSV_URL ? fetchCSV(PLACES_CSV_URL) : Promise.resolve([]),
      THEME_CSV_URL ? fetchCSV(THEME_CSV_URL) : Promise.resolve([]),
    ]);

    // Process Places for initial hotels
    try {
      const newPlaces: Record<string, Place> = {};
      const hotelPlaces: Record<string, Place> = {};
      
      placesRows.forEach((row: any) => {
        if (!row.id) return;
        const place: Place = {
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
        newPlaces[row.id] = place;
        if (place.type === 'hotel') {
          hotelPlaces[row.id] = place;
        }
      });

      if (Object.keys(newPlaces).length > 0) {
        allPlaces = newPlaces; // Store all places for full data
      }

      // If no hotels found, send all places so at least something shows up initially
      const placesToSendInitially = Object.keys(hotelPlaces).length > 0 ? hotelPlaces : allPlaces;
      fullData.places = allPlaces; // Still assign all places (fetched or fallback) to fullData

      // Process Theme for initial load
      try {
        const newCityColors = { ...fallbackCityColors };
        const newMarkerColors = { ...fallbackMarkerColors };
        let hasUpdates = false;
  
        themeRows.forEach((row: any) => {
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
          initialTheme = {
              cityColors: newCityColors,
              markerColors: newMarkerColors
          };
        }
      } catch (e) {
          console.warn("Failed to load Theme CSV for initial load in worker, using fallback.", e);
      }

      // Send initial data (hotels + theme) immediately
      self.postMessage({ type: 'INITIAL_DATA_READY', data: { places: placesToSendInitially, theme: initialTheme } });

    } catch (e) {
      console.warn("Failed to load Places CSV for initial load in worker, using fallback.", e);
      // On error, send fallback hotels or all places if available, along with fallback theme
      const fallbackHotelPlaces: Record<string, Place> = {};
      Object.values(fallbackPlaces).forEach(place => {
        if (place.type === 'hotel') {
          fallbackHotelPlaces[place.id] = place;
        }
      });
      const placesToUseOnFallback = Object.keys(fallbackHotelPlaces).length > 0 ? fallbackHotelPlaces : fallbackPlaces;
      self.postMessage({ type: 'INITIAL_DATA_READY', data: { places: placesToUseOnFallback, theme: fallbackData.theme } });
    }

    fullData.places = allPlaces; // Ensure fullData always has all places after initial processing
    fullData.theme = initialTheme; // Ensure fullData has the theme picked up during initial processing

    // Continue with other data loading (itinerary and tips) which can run in parallel
    const [itineraryRows, tipsRows] = await Promise.all([
      ITINERARY_CSV_URL ? fetchCSV(ITINERARY_CSV_URL) : Promise.resolve([]),
      TIPS_CSV_URL ? fetchCSV(TIPS_CSV_URL) : Promise.resolve([]),
    ]);

    // 2. Process Itinerary
    try {
      const cityGroups = new Map<string, Map<number, DayItinerary>>();

      itineraryRows.forEach((row: any) => {
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
            hotelIds: row.hotelId ? [row.hotelId] : [],
            activities: []
          });
        }

        const dayEntry = cityDays.get(dayNum)!;
        if (row.theme) dayEntry.theme = row.theme;
        if (row.date) dayEntry.date = row.date;
        
        if (row.hotelId) {
          if (!dayEntry.hotelIds) dayEntry.hotelIds = [];
          if (!dayEntry.hotelIds.includes(row.hotelId)) {
            dayEntry.hotelIds.push(row.hotelId);
          }
        }

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
        fullData.itinerary = newItinerary;

        // Set start and end dates from the itinerary
        if (newItinerary.length > 0) {
          fullData.startDate = new Date(newItinerary[0].date);
          fullData.endDate = new Date(newItinerary[newItinerary.length - 1].date);
        }
      }
    } catch (e) {
      console.warn("Failed to load Itinerary CSV in worker, using fallback.", e);
    }

    // 3. Process Tips
    try {
      const tipsMap = new Map<string, TipCategory>();

      tipsRows.forEach((row: any) => {
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
        fullData.tips = newTips;
      }
    } catch (e) {
      console.warn("Failed to load Tips CSV in worker, using fallback.", e);
    }

    self.postMessage({ type: 'FULL_DATA_READY', data: fullData });

  } catch (error) {
    self.postMessage({ type: 'ERROR', error: error instanceof Error ? error.message : String(error) });
  }
};