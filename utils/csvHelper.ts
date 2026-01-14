import { places as fallbackPlaces } from '../places';
import { itineraryData as fallbackItinerary } from '../itinerary';
import { cityThemeColors, mapMarkerColors } from '../theme';
import { tipsList as fallbackTips } from '../tips';
import { Place, DayItinerary, TipCategory } from '../types';

export const generateCSV = (dataRows: string[][], headers: string[]) => {
  return [
    headers.join(","),
    ...dataRows.map(row => row.join(","))
  ].join("\n");
};

const escapeCSV = (str: string | undefined | null) => {
    if (!str) return "";
    return `"${str.toString().replace(/"/g, '""')}"`;
};

export const triggerDownload = (csvContent: string, fileName: string) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// 1. PLACES CSV STRUCTURE: id, name, type, city, lat, lon, description, url, address, directions, neighborhoodInsights, tags
export const downloadPlacesCSV = (currentPlaces: Record<string, Place> = fallbackPlaces) => {
  const headers = ["id", "name", "type", "city", "lat", "lon", "description", "url", "address", "directions", "neighborhoodInsights", "tags"];
  const rows: string[][] = [];

  Object.values(currentPlaces).forEach(place => {
    rows.push([
        escapeCSV(place.id),
        escapeCSV(place.name),
        escapeCSV(place.type),
        escapeCSV(place.city),
        escapeCSV(place.coordinates.lat.toString()),
        escapeCSV(place.coordinates.lon.toString()),
        escapeCSV(place.description),
        escapeCSV(place.url),
        escapeCSV(place.hotelMeta?.address),
        escapeCSV(place.hotelMeta?.directions),
        escapeCSV(place.hotelMeta?.neighborhoodInsights),
        escapeCSV(place.hotelMeta?.tags?.join(", "))
    ]);
  });

  triggerDownload(generateCSV(rows, headers), "places.csv");
};

// 2. ITINERARY CSV STRUCTURE: dayNumber, city, theme, date, hotelId, placeId, time, label, description, tip, icon, link
export const downloadItineraryCSV = (currentItinerary: DayItinerary[] = fallbackItinerary) => {
  const headers = ["dayNumber", "city", "theme", "date", "hotelId", "placeId", "time", "label", "description", "tip", "icon", "link"];
  const rows: string[][] = [];

  currentItinerary.forEach(day => {
    const common = [
        escapeCSV(day.dayNumber.toString()),
        escapeCSV(day.city),
        escapeCSV(day.theme),
        escapeCSV(day.date),
        escapeCSV(day.hotelId)
    ];

    if (day.activities.length === 0) {
        rows.push([...common, "", "", "", "", "", "", ""]);
    } else {
        day.activities.forEach(act => {
            rows.push([
                ...common,
                escapeCSV(act.placeId),
                escapeCSV(act.time),
                escapeCSV(act.label),
                escapeCSV(act.description),
                escapeCSV(act.tip),
                escapeCSV(act.icon),
                escapeCSV(act.link)
            ]);
        });
    }
  });

  triggerDownload(generateCSV(rows, headers), "itinerary.csv");
};

// 3. THEME CSV STRUCTURE: category, key, value
export const downloadThemeCSV = (currentCityColors: Record<string, string> = cityThemeColors, currentMarkerColors: Record<string, string> = mapMarkerColors) => {
  const headers = ["category", "key", "value"];
  const rows: string[][] = [];

  Object.entries(currentCityColors).forEach(([key, value]) => {
      rows.push([escapeCSV("city"), escapeCSV(key), escapeCSV(value)]);
  });

  Object.entries(currentMarkerColors).forEach(([key, value]) => {
      rows.push([escapeCSV("marker"), escapeCSV(key), escapeCSV(value)]);
  });

  triggerDownload(generateCSV(rows, headers), "theme.csv");
};

// 4. TIPS CSV STRUCTURE: category, item, notes
export const downloadTipsCSV = (currentTips: TipCategory[] = fallbackTips) => {
  const headers = ["category", "item", "notes"];
  const rows: string[][] = [];

  currentTips.forEach(cat => {
      cat.items.forEach(item => {
          rows.push([
              escapeCSV(cat.title),
              escapeCSV(item.name),
              escapeCSV(item.notes)
          ]);
      });
  });

  triggerDownload(generateCSV(rows, headers), "tips.csv");
};
