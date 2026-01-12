import { itineraryData, places, startDate, endDate } from '../data';
import { Place } from '../types';

export const generateCSV = (dataRows: string[][], headers: string[]) => {
  return [
    headers.join(","),
    ...dataRows.map(row => row.join(","))
  ].join("\n");
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

export const downloadFullCSV = () => {
  const headers = ["Date", "Travel / Activity", "City", "Stay", "Details"];
  const rows: string[][] = [];

  itineraryData.forEach(day => {
    const dateStr = day.date; 
    const cityName = day.city;
    const hotel = day.hotelId ? places[day.hotelId] : null;
    const hotelName = hotel ? hotel.name : "-";

    if (day.activities.length === 0) {
       rows.push([dateStr, "-", cityName, hotelName, "Free Day"]);
    } else {
       day.activities.forEach(act => {
         const place = places[act.placeId];
         const name = act.label || place?.name || "Unknown";
         const desc = act.description || place?.description || "";
         const url = act.link || place?.url || "";
         const details = `[${place?.type.toUpperCase() || 'ACTIVITY'}] ${desc} | URL: ${url}`;
         
         // Escape quotes in details
         const safeDetails = `"${details.replace(/"/g, '""')}"`;
         rows.push([dateStr, name, cityName, hotelName, safeDetails]);
       });
    }
  });

  triggerDownload(generateCSV(rows, headers), "beto_birthday_itinerary_full.csv");
};

export const downloadRecommendationsCSV = () => {
  const headers = ["Type", "Name", "Details"];
  const rows: string[][] = [];
  
  Object.values(places).forEach(place => {
      if (['sight_rec', 'food_rec', 'shopping', 'suggestion'].includes(place.type)) {
          const details = `${place.description} | URL: ${place.url || 'N/A'}`;
          const safeDetails = `"${details.replace(/"/g, '""')}"`;
          rows.push([place.type.toUpperCase(), place.name, safeDetails]);
      }
  });

  triggerDownload(generateCSV(rows, headers), "beto_birthday_recommendations.csv");
};

export const downloadLogisticsCSV = () => {
  const headers = ["Date", "City", "Stay", "Transport Details"];
  const rows: string[][] = [];

  itineraryData.forEach(day => {
    const dateStr = day.date;
    const cityName = day.city;
    const hotel = day.hotelId ? places[day.hotelId] : null;
    const hotelName = hotel ? hotel.name : "-";
    
    // Find travel items
    const travelActs = day.activities.filter(a => {
        const p = places[a.placeId];
        return p && p.type === 'travel';
    });
    
    let transportDetails = "-";
    if (travelActs.length > 0) {
        transportDetails = travelActs.map(a => {
             const p = places[a.placeId];
             return `${a.label || p.name}: ${a.description || p.description}`;
        }).join("; ");
    }
    
    rows.push([dateStr, cityName, hotelName, `"${transportDetails.replace(/"/g, '""')}"`]);
  });

  triggerDownload(generateCSV(rows, headers), "beto_birthday_logistics.csv");
};
