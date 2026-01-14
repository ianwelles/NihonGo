
import Papa from 'papaparse';
import fs from 'fs';

const csvContent = `dayNumber,city,theme,date,hotelId,placeId,time,label,description,tip,icon,link
1,Tokyo,Arrival & Local Life,Wed 18 Feb,hilton-tokyo,haneda-airport,10:25,Arrival,,,🛬,
4,Tokyo,Travel,Sat 21 Feb,hilton-tokyo,shinjuku-station,Morning,Travel to Kyoto,Checkout. Train to Tokyo Station. Shinkansen to Kyoto (2.5 hrs).,Buy a Bento at Tokyo Station.,🚅,
4,Kyoto,Bullet Train & Gion,Sat 21 Feb,doubletree-kyoto,gion-district,Afternoon,Gion District,Check in (Hotel is opposite Station). Explore Gion District and Pontocho Alley.,,🍵,
5,Kyoto,Shrines & Deer,Sun 22 Feb,doubletree-kyoto,fushimi-inari,Morning,Fushimi Inari Taisha,Visit Fushimi Inari early. Then take JR Nara Line to Nara.,Arriving by 8:00 AM avoids the massive crowds.,⛩️,
6,Kyoto,Bamboo & Temples,Mon 23 Feb,doubletree-kyoto,arashiyama,Morning,Arashiyama Bamboo,Train to Arashiyama (Bamboo Grove). Visit Tenryu-ji Temple.,Go as early as possible for the best photos.,🎋,
7,Kyoto,Travel,Tue 24 Feb,doubletree-kyoto,kyoto-station,Morning,Travel to Osaka,Checkout. Special Rapid Service to Osaka Station (30 mins).,Stand on the platform early to secure a seat.,🚆,
7,Osaka,Kitchen of Japan,Tue 24 Feb,hilton-osaka,osaka-castle,Morning,Osaka Castle,Visit Osaka Castle.,Hotel is at Umeda; Castle is a short loop line ride away.,🏯,
`;

const parseData = () => {
    Papa.parse(csvContent, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().replace(/^\uFEFF/, ''),
      complete: (results) => {
          const rows = results.data;
          const daysMap = new Map();

          rows.forEach((row) => {
            const dayNum = parseInt(row.dayNumber);
            if (isNaN(dayNum) || !row.city) return; 

            const compositeKey = `${dayNum}-${row.city}`;

            if (!daysMap.has(compositeKey)) {
              daysMap.set(compositeKey, {
                dayNumber: dayNum,
                city: row.city,
                activities: []
              });
            }
          });

          const newItinerary = Array.from(daysMap.values()).sort((a, b) => {
            if (a.dayNumber === b.dayNumber) {
              return a.city.localeCompare(b.city); 
            }
            return a.dayNumber - b.dayNumber;
          });
          
          console.log(JSON.stringify(newItinerary, null, 2));
      }
    });
};

parseData();
