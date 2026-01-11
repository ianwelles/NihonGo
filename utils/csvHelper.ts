import { locations, startDate, endDate, dateToDayMap, dayToCity } from '../data';
import { CityName } from '../types';

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
  let currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const dateStr = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const isoDate = currentDate.toISOString().split('T')[0];
    const dayLabel = dateToDayMap[isoDate];
    const cityName = dayToCity[dayLabel];
    if (cityName && locations[cityName]) {
      const dayItems = locations[cityName].filter(l => 
        l.day === dayLabel || (l.day && l.day.includes(dayLabel.replace("Day ", "")))
      );
      const topPickHotel = locations[cityName].find(l => l.type === 'hotel' && l.desc.includes("Top Pick"));
      if (dayItems.length === 0) {
          rows.push([dateStr, "-", cityName, topPickHotel?.name || "-", "No specific activities listed"]);
      } else {
        dayItems.forEach((item) => {
          const detailsCol = `[${item.type.toUpperCase()}] ${item.desc} | URL: ${item.url || 'N/A'}`;
          rows.push([dateStr, item.name, cityName, topPickHotel?.name || "-", `"${detailsCol.replace(/"/g, '""')}"`]);
        });
      }
    } else {
      rows.push([dateStr, "-", "-", "-", "-"]);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  triggerDownload(generateCSV(rows, headers), "beto_birthday_itinerary_full.csv");
};

export const downloadRecommendationsCSV = () => {
  const headers = ["Date", "Travel / Activity", "City", "Stay", "Details"];
  const rows: string[][] = [];
  Object.keys(locations).forEach((cityKey) => {
    const city = cityKey as CityName;
    const suggestions = locations[city].filter(l => 
      l.type === 'suggestion' || l.type === 'sight_rec' || l.type === 'food_rec' || l.day === 'Any'
    );
    const topPickHotel = locations[city].find(l => l.type === 'hotel' && l.desc.includes("Top Pick"));
    
    suggestions.forEach(item => {
      const detailsCol = `[${item.type.toUpperCase()}] ${item.desc} | URL: ${item.url || 'N/A'}`;
      rows.push(["Anytime", item.name, city, topPickHotel?.name || "-", `"${detailsCol.replace(/"/g, '""')}"`]);
    });
  });
  triggerDownload(generateCSV(rows, headers), "beto_birthday_recommendations.csv");
};

export const downloadLogisticsCSV = () => {
  const headers = ["Date", "Travel", "City", "Stay", "Details"];
  const rows: string[][] = [];
  let currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const isoDate = currentDate.toISOString().split('T')[0];
    const dayLabel = dateToDayMap[isoDate];
    const cityName = dayToCity[dayLabel];
    
    let travelCol = "-";
    let stayCol = "-";
    let detailsCol = "";

    if (cityName) {
      const travelItem = locations[cityName].find(l => 
        l.type === 'travel' && 
        (l.day === dayLabel || (l.day && l.day.includes(dayLabel.replace("Day ", ""))))
      );
      const hotelItem = locations[cityName].find(l => l.type === 'hotel' && l.desc.includes("Top Pick"));

      if (travelItem) {
        travelCol = travelItem.name.includes("Airport") || travelItem.name.includes("Station") ? travelItem.desc : travelItem.name;
        if (travelCol.includes("Arrival Airport")) travelCol = `Fly to ${cityName}`;
        if (travelCol.includes("Shinkansen") || travelCol.includes("Train")) travelCol = `Train to ${cityName}`;
        if (travelCol.includes("PVG")) travelCol = `Fly to ${cityName}`;
        detailsCol = travelItem.url;
      }

      if (hotelItem) {
        stayCol = hotelItem.name;
        if (!detailsCol) detailsCol = hotelItem.url;
      }
    }

    if (dayLabel === "Day 11") {
      travelCol = "Fly to London";
      stayCol = "";
      detailsCol = "";
    }

    rows.push([dateStr, travelCol, cityName || "-", stayCol, detailsCol]);
    currentDate.setDate(currentDate.getDate() + 1);
  }
  triggerDownload(generateCSV(rows, headers), "beto_birthday_logistics.csv");
};
