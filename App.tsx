import React, { useState, useEffect, useRef } from 'react';
import { LocationsMap, LocationData, CityName } from './types';

// Declare Leaflet global
declare const L: any;

// --- Data ---
const locations: LocationsMap = {
  'Tokyo': [
    {name: "Haneda Airport", lat: 35.5494, lon: 139.7798, type: "travel", desc: "Arrival Airport (10:25 AM)", day: "Day 1", url: "https://tokyo-haneda.com/en/"},
    {name: "Shinjuku Station", lat: 35.6896, lon: 139.7006, type: "travel", desc: "Main Transport Hub", day: "Day 1", url: "https://www.gotokyo.org/en/destinations/western-tokyo/shinjuku/index.html"},
    {name: "Shinjuku Gyoen", lat: 35.6852, lon: 139.7101, type: "sight", desc: "Serene garden with greenhouse", day: "Day 1", url: "https://www.env.go.jp/garden/shinjukugyoen/english/index.html"},
    {name: "Torikizoku", lat: 35.6938, lon: 139.7016, type: "food", desc: "Casual Yakitori (All items same price)", day: "Day 1", url: "https://www.torikizoku.co.jp/en/"},
    {name: "Omoide Yokocho", lat: 35.6929, lon: 139.6995, type: "food", desc: "Atmospheric Memory Lane (Yakitori)", day: "Day 1", url: "http://shinjuku-omoide.com/english/"},
    {name: "Senso-ji", lat: 35.7148, lon: 139.7967, type: "sight", desc: "Tokyo's oldest temple (Asakusa)", day: "Day 2", url: "https://www.senso-ji.jp/english/"},
    {name: "Imperial Palace East Gardens", lat: 35.6852, lon: 139.7528, type: "sight", desc: "Historic castle grounds", day: "Day 2", url: "https://www.kunaicho.go.jp/e-event/higashigyoen02.html"},
    {name: "Tsukiji Outer Market", lat: 35.6655, lon: 139.7704, type: "food", desc: "Fresh Seafood Breakfast/Lunch", day: "Day 2", url: "https://www.tsukiji.or.jp/english/"},
    {name: "Shinjuku Ni-chome", lat: 35.6905, lon: 139.7066, type: "sight", desc: "Tokyo's Gay District", day: "Day 2", url: "https://www.timeout.com/tokyo/lgbtq/shinjuku-nichome-guide"},
    {name: "Shibuya Crossing", lat: 35.6595, lon: 139.7004, type: "sight", desc: "Iconic Scramble Crossing", day: "Day 3", url: "https://www.japan-guide.com/e/e3007.html"},
    {name: "Tokyo Metro Gov Building", lat: 35.6896, lon: 139.6921, type: "sight", desc: "Free Panoramic Views", day: "Day 3", url: "https://www.yokoso.metro.tokyo.lg.jp/en/tenbou/"},
    {name: "Konjiki Hototogisu", lat: 35.6897, lon: 139.7047, type: "food", desc: "Michelin Star Ramen (Clam Broth)", day: "Day 1", url: "https://konjikihototogisu.com/"},
    {name: "Ramen Nagi (Golden Gai)", lat: 35.6943, lon: 139.7046, type: "food", desc: "Famous Niboshi (Sardine) Ramen", day: "Day 2", url: "http://www.n-nagi.com/english/"},
    {name: "Fuunji", lat: 35.6872, lon: 139.6967, type: "food", desc: "Legendary Tsukemen (Dipping Noodles)", day: "Day 3", url: "https://www.fu-unji.com/"},
    {name: "Flower Terrace Hotel", lat: 35.6970, lon: 139.7080, type: "hotel", desc: "Top Pick Hotel", day: "Stay", url: "https://flowerterrace-higashi-shinjuku.com/rooms/"},
    {name: "Vessel Inn", lat: 35.7135, lon: 139.7045, type: "hotel", desc: "Alternative Hotel (Takadanobaba)", day: "Stay", url: "https://www.vessel-hotel.jp/inn/takadanobaba/"},
    {name: "Aman Tokyo", lat: 35.6856, lon: 139.7634, type: "hotel", desc: "OTT Luxury Hotel", day: "Stay", url: "https://www.aman.com/hotels/aman-tokyo"}
  ],
  'Kyoto': [
    {name: "Kyoto Station", lat: 34.9858, lon: 135.7588, type: "travel", desc: "Shinkansen Hub", day: "Day 4", url: "https://www.japan-guide.com/e/e2018.html"},
    {name: "Gion District", lat: 35.0037, lon: 135.7785, type: "sight", desc: "Historic Geisha District", day: "Day 4", url: "https://www.japan-guide.com/e/e3902.html"},
    {name: "Fushimi Inari Taisha", lat: 34.9671, lon: 135.7727, type: "sight", desc: "1,000 Red Torii Gates", day: "Day 5", url: "http://inari.jp/en/"},
    {name: "Kiyomizu-dera", lat: 34.9949, lon: 135.7850, type: "sight", desc: "Iconic Wooden Temple", day: "Day 5", url: "https://www.kiyomizudera.or.jp/en/"},
    {name: "Arashiyama Bamboo Grove", lat: 35.0094, lon: 135.6668, type: "sight", desc: "Famous Bamboo Forest", day: "Day 6", url: "https://www.japan-guide.com/e/e3912.html"},
    {name: "Nishiki Market", lat: 35.0050, lon: 135.7649, type: "food", desc: "Kyoto's Kitchen (Street Food)", day: "Day 6", url: "https://www.kyoto-nishiki.or.jp/"},
    {name: "Honke Daiichi-Asahi", lat: 34.9856, lon: 135.7602, type: "food", desc: "Classic Kyoto Soy Ramen", day: "Day 5", url: "https://www.honke-daiichiasahi.com/"},
    {name: "Organic House Salute", lat: 34.9890, lon: 135.7550, type: "food", desc: "Vegetarian Friendly Dining", day: "Day 5", url: "https://www.happycow.net/reviews/organic-house-salute-kyoto-16345"},
    {name: "Henn na Hotel", lat: 34.9838, lon: 135.7616, type: "hotel", desc: "Top Pick Hotel", day: "Stay", url: "https://global.hennnahotel.com/en/kyoto-hachijoguchi/"},
    {name: "BnA Alter Museum", lat: 35.0003, lon: 135.7686, type: "hotel", desc: "Boutique Art Hotel", day: "Stay", url: "https://bnaaltermuseum.com/"},
    {name: "Hotel The Mitsui", lat: 35.0125, lon: 135.7516, type: "hotel", desc: "OTT Luxury Hotel", day: "Stay", url: "https://www.hotelthemitsui.com/en/kyoto/"}
  ],
  'Osaka': [
    {name: "Osaka Castle", lat: 34.6873, lon: 135.5262, type: "sight", desc: "Historic Landmark", day: "Day 7", url: "https://www.osakacastle.net/english/"},
    {name: "Dotonbori", lat: 34.6687, lon: 135.5013, type: "sight", desc: "Food & Neon District", day: "Day 7", url: "https://osaka-info.jp/en/spot/dotonbori/"},
    {name: "Shinsekai", lat: 34.6520, lon: 135.5063, type: "sight", desc: "Retro Osaka Vibes", day: "Day 7", url: "https://osaka-info.jp/en/spot/shinsekai/"},
    {name: "Doyama-cho", lat: 34.7036, lon: 135.5033, type: "sight", desc: "Gay District", day: "Day 7", url: "https://insideosaka.com/osaka-gay-district/"},
    {name: "Kushikatsu Daruma", lat: 34.6690, lon: 135.5030, type: "food", desc: "Famous Fried Skewers", day: "Day 7", url: "https://www.kushikatsu-daruma.com/"},
    {name: "Fukutaro", lat: 34.6655, lon: 135.5020, type: "food", desc: "Top Rated Okonomiyaki", day: "Day 7", url: "https://2951.jp/"},
    {name: "Ajinoya Honten", lat: 34.6680, lon: 135.5010, type: "food", desc: "Michelin Bib Gourmand Okonomiyaki", day: "Day 7", url: "http://www.ajinoya-okonomiyaki.com/top/"},
    {name: "Joytel Hotel Namba", lat: 34.6690, lon: 135.4985, type: "hotel", desc: "Top Pick Hotel", day: "Stay", url: "https://dotonbori-h.co.jp/en/"},
    {name: "Grids Premium Namba", lat: 34.6645, lon: 135.4980, type: "hotel", desc: "Modern Hotel Option", day: "Stay", url: "https://gridshotel.com/osaka-namba/"},
    {name: "Conrad Osaka", lat: 34.6933, lon: 135.4955, type: "hotel", desc: "OTT Luxury Hotel", day: "Stay", url: "https://www.hilton.com/en/hotels/osacici-conrad-osaka/"}
  ],
  'Shanghai': [
    {name: "Pudong Airport (PVG)", lat: 31.1443, lon: 121.8083, type: "travel", desc: "Arrival/Departure", day: "Day 8/11", url: "https://www.shanghaiairport.com/en/"},
    {name: "Maglev Longyang Rd", lat: 31.2090, lon: 121.5580, type: "travel", desc: "High Speed Train Station", day: "Day 8/11", url: "https://www.meet-in-shanghai.net/traffic/maglev"},
    {name: "French Concession", lat: 31.2155, lon: 121.4556, type: "sight", desc: "Historic Walking Area", day: "Day 9", url: "https://www.smartshanghai.com/articles/tourist/the-former-french-concession"},
    {name: "Yu Garden", lat: 31.2272, lon: 121.4921, type: "sight", desc: "Classical Garden", day: "Day 10", url: "https://www.meet-in-shanghai.net/scenic-spots/yu-garden"},
    {name: "The Bund", lat: 31.2402, lon: 121.4905, type: "sight", desc: "Iconic Waterfront Skyline", day: "Day 10", url: "https://www.meet-in-shanghai.net/scenic-spots/the-bund"},
    {name: "Fu 1039", lat: 31.2200, lon: 121.4300, type: "food", desc: "Birthday Dinner (Classic)", day: "Day 9", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-1039"},
    {name: "Fu He Hui", lat: 31.2210, lon: 121.4310, type: "food", desc: "Birthday Dinner (Veg Option)", day: "Day 9", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-he-hui"},
    {name: "Old Jesse", lat: 31.2050, lon: 121.4400, type: "food", desc: "Authentic Local Cuisine", day: "Day 10", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/old-jesse-xuhui"},
    {name: "Jianguo 328", lat: 31.2080, lon: 121.4550, type: "food", desc: "MSG-Free Shanghainese", day: "Day 10", url: "https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/jianguo-328"},
    {name: "Eddy's", lat: 31.2100, lon: 121.4500, type: "sight", desc: "Gay Bar", day: "Day 9", url: "https://www.timeoutshanghai.com/venue/Bars__Clubs-Bars-Gay_Bars/1368/Eddys-Bar.html"},
    {name: "Rayfont Downtown", lat: 31.2035, lon: 121.4655, type: "hotel", desc: "Top Pick Hotel", day: "Stay", url: "http://www.rayfontdowntownhotel.com/"},
    {name: "Howard Johnson Huaihai", lat: 31.2170, lon: 121.4590, type: "hotel", desc: "Style Hotel Option", day: "Stay", url: "https://www.wyndhamhotels.com/hojo/shanghai-china/howard-johnson-huaihai-hotel-shanghai/overview"},
    {name: "J Hotel Shanghai Tower", lat: 31.2335, lon: 121.5056, type: "hotel", desc: "Highest Hotel in World", day: "Stay", url: "https://www.jhotel-shanghai.com/"}
  ]
};

// --- Map Logic ---
const iconColors: Record<string, string> = {
  'hotel': '#ffe0b2',  // Orange
  'food': '#ff8a80',   // Red
  'sight': '#b9f6ca',  // Green
  'travel': '#82b1ff', // Blue
  'default': '#82b1ff'
};

const getIcon = (type: string) => {
  const color = iconColors[type] || iconColors['default'];
  const pinSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="${color}" stroke="#1c1c1c" stroke-width="0.5">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      <circle cx="12" cy="9" r="2.5" fill="#1c1c1c"/>
    </svg>`;
    
  return L.divIcon({
    className: 'custom-pin',
    html: pinSvg,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -32]
  });
};

const App: React.FC = () => {
  const [activeCity, setActiveCity] = useState<CityName>('Tokyo');
  const [openDay, setOpenDay] = useState<string | null>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Initialize Map
  useEffect(() => {
    if (!document.getElementById('map')) return;
    
    // Check if map is already initialized
    if (!mapRef.current) {
        mapRef.current = L.map('map').setView([35.6895, 139.6917], 12);
        
        // Add Base Layer (Dark, No Labels)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(mapRef.current);

        // Add Label Layer (Dark, Only Labels) with custom CSS class for high contrast
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
            subdomains: 'abcd',
            maxZoom: 19,
            className: 'high-contrast-labels', // Increases brightness via CSS
            zIndex: 650 // Ensure labels stay above polygons but below markers/popups
        }).addTo(mapRef.current);
    }

    // Update markers based on active city and selected day
    const updateMarkers = () => {
        // Clear existing
        markersRef.current.forEach(m => mapRef.current.removeLayer(m));
        markersRef.current = [];

        const cityLocs = locations[activeCity];
        if (!cityLocs) return;

        const group = L.featureGroup();

        // Extract day number if a day is open (e.g., "day1" -> "1", "day8" -> "8")
        const currentDayNumber = openDay ? openDay.replace('day', '') : null;
        
        // Regex to match whole word numbers. 
        // e.g. "8" should match "Day 8" and "Day 8/11" but not "Day 18"
        const dayRegex = currentDayNumber ? new RegExp(`\\b${currentDayNumber}\\b`) : null;

        cityLocs.forEach(loc => {
            const isHotel = loc.type === 'hotel';
            // Show if: it is a hotel OR no day is selected OR the location's day matches the selected day
            const matchesDay = !dayRegex || (loc.day && dayRegex.test(loc.day));

            if (isHotel || matchesDay) {
                const icon = getIcon(loc.type);
                const titleHtml = loc.url 
                    ? `<a href="${loc.url}" target="_blank" rel="noopener noreferrer" class="text-xl font-bold !text-white mb-1 leading-tight inline-block border-b border-white/30 hover:!text-accent hover:border-accent transition-colors duration-200">${loc.name}</a>` 
                    : `<span class="text-xl font-bold text-primary mb-1 leading-tight block">${loc.name}</span>`;

                const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lon}&travelmode=transit`;

                const m = L.marker([loc.lat, loc.lon], {icon: icon})
                    .bindPopup(`
                        <div class="text-left">
                            <span class="text-sub-text font-extrabold text-xs uppercase tracking-wide mb-1 block">${loc.day}</span>
                            ${titleHtml}
                            <span class="text-gray-400 font-bold text-xs uppercase tracking-wide mb-2 block">${loc.type}</span>
                            <span class="text-gray-300 text-sm leading-relaxed mb-4 block">${loc.desc}</span>
                            <a href="${directionsUrl}" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="inline-block bg-[#8ab4f8] text-[#202124] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#aecbfa] transition-colors shadow-md no-underline border-none">
                                📍Get Directions
                            </a>
                        </div>
                    `)
                    .addTo(mapRef.current);
                
                group.addLayer(m);
                markersRef.current.push(m);
            }
        });

        // Fit bounds to the currently visible markers
        if (group.getLayers().length > 0) {
            mapRef.current.fitBounds(group.getBounds().pad(0.2));
        }
    };

    updateMarkers();

    // Re-size map when tab changes as container might have shifted
    setTimeout(() => {
        mapRef.current.invalidateSize();
    }, 100);

  }, [activeCity, openDay]);

  // Close all cards when switching cities
  useEffect(() => {
    setOpenDay(null);
  }, [activeCity]);

  // Handle accordion toggle
  const handleToggle = (e: React.MouseEvent, dayId: string) => {
    e.preventDefault();
    setOpenDay(prev => prev === dayId ? null : dayId);
  };

  return (
    <div className="p-4 text-xl-base">
      <header className="text-center mb-5 pb-5 border-b-[3px] border-border">
        <h1 className="text-primary text-3xl md:text-4xl font-bold leading-tight mb-2 mt-0">🇯🇵 Cultural & Culinary Journey 🇨🇳</h1>
        <div className="text-lg text-sub-text font-bold">18 Feb – 28 Feb 2025 | Beto Birthday Experience</div>
      </header>

      {/* NAVIGATION TABS */}
      <div className="tabs grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {(['Tokyo', 'Kyoto', 'Osaka', 'Shanghai'] as CityName[]).map((city, index) => {
            const dateRanges = ["18–20 Feb", "21–23 Feb", "24–25 Feb", "25–28 Feb"];
            const emojis = ["🗼", "⛩️", "🐙", "🥟"];
            
            return (
                <button 
                    key={city}
                    onClick={() => setActiveCity(city)}
                    className={`
                        tab-btn py-3 px-5 rounded-full font-bold text-lg text-center w-full transition duration-300 border-2
                        ${activeCity === city 
                            ? 'bg-card-bg border-primary text-white' 
                            : 'bg-card-bg border-border text-white hover:bg-neutral-800'
                        }
                    `}
                >
                    {city} {emojis[index]}
                    <span className="block text-base font-normal text-sub-text mt-1">{dateRanges[index]}</span>
                </button>
            );
        })}
      </div>

      {/* MAP DIV */}
      <div className="relative h-[400px] w-full mb-8 rounded-xl border-2 border-border overflow-hidden z-10">
        <div id="map" className="h-full w-full bg-gray-900"></div>
        {openDay && (
          <div className="absolute bottom-4 left-4 z-[1000] pointer-events-none transition-opacity duration-300">
             <div className="bg-black/90 backdrop-blur border border-primary px-3 py-2 rounded-lg shadow-2xl flex items-center gap-2">
                <span className="text-primary font-bold text-lg uppercase tracking-wider leading-none">
                  Day {openDay.replace('day', '')}
                </span>
             </div>
          </div>
        )}
      </div>

      {/* CONTENT SECTIONS */}
      <div className="max-w-4xl mx-auto animate-fade-in">
        
        {/* TOKYO CONTENT */}
        {activeCity === 'Tokyo' && (
            <div className="timeline">
                <details open={openDay === 'day1'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day1')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 1: Arrival & Local Life (Tue 18 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🛬 Morning (10:25 AM)</div>
                            Arrive at <strong><a href="https://tokyo-haneda.com/en/" target="_blank" rel="noreferrer">Haneda Airport</a></strong>. Pick up <a href="https://www.japan-guide.com/e/e2359_003.html" target="_blank" rel="noreferrer">Suica/Pasmo cards</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🚅 Day</div>
                            Transfer to <strong>Shinjuku</strong>. Lunch at <a href="https://konjikihototogisu.com/" target="_blank" rel="noreferrer">Sobahouse Konjiki Hototogisu</a>. Walk through 🌳 <a href="https://www.env.go.jp/garden/shinjukugyoen/english/index.html" target="_blank" rel="noreferrer">Shinjuku Gyoen National Garden</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Konjiki Hototogisu</em> holds a Michelin Star for their clam-broth ramen. Arrive early for a ticket!</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍢 Evening</div>
                            Dinner at <a href="https://www.torikizoku.co.jp/en/" target="_blank" rel="noreferrer">Torikizoku</a> (Yakitori) or the atmospheric <a href="http://shinjuku-omoide.com/english/" target="_blank" rel="noreferrer">Omoide Yokocho</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Torikizoku</em> is a reliable chain where every item is the same price—great for a low-stress first meal.</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day2'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day2')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 2: Old Tokyo & Culture (Wed 19 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">⛩️ Morning</div>
                            Visit <a href="https://www.senso-ji.jp/english/" target="_blank" rel="noreferrer">Senso-ji Temple</a> in Asakusa.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Try the <em>Ningyo-yaki</em> (doll-shaped sponge cakes) on Nakamise street; they are freshly baked and filled with red bean paste.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏯 Day</div>
                            Walk the <a href="https://www.kunaicho.go.jp/e-event/higashigyoen02.html" target="_blank" rel="noreferrer">Imperial Palace East Gardens</a>. Lunch at 🍣 <a href="https://www.tsukiji.or.jp/english/" target="_blank" rel="noreferrer">Tsukiji Outer Market</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> At Tsukiji, look for the queues at <em>Sushizanmai</em> for reliable quality, or grab a <em>Tamagoyaki</em> (sweet egg omelette) stick for a classic street snack.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍸 Evening</div>
                            Dinner at <a href="http://www.n-nagi.com/english/" target="_blank" rel="noreferrer">Ramen Nagi</a> (Golden Gai). Then explore 🏳️‍🌈 <a href="https://www.timeout.com/tokyo/lgbtq/shinjuku-nichome-guide" target="_blank" rel="noreferrer">Shinjuku Ni-chōme</a>. Drinks at <a href="https://bridge-shinjuku.com/" target="_blank" rel="noreferrer">Bridge</a> or <a href="https://www.travelgay.com/venue/new-sazae/" target="_blank" rel="noreferrer">New Sazae</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Ramen Nagi</em> is legendary for its intense Niboshi (sardine) broth. <em>New Sazae</em> is a disco institution since the 60s/70s.</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day3'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day3')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 3: Modern Icons (Thu 20 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">📸 Morning</div>
                            Witness the <a href="https://www.japan-guide.com/e/e3007.html" target="_blank" rel="noreferrer">Shibuya Crossing</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏙️ Day</div>
                            Views from <a href="https://www.yokoso.metro.tokyo.lg.jp/en/tenbou/" target="_blank" rel="noreferrer">Tokyo Metro Gov. Building</a>. Walk 👠 <a href="https://www.japan-guide.com/e/e3006.html#takeshita" target="_blank" rel="noreferrer">Takeshita Street</a> (Harajuku).
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍣 Lunch</div>
                            Authentic sushi at <a href="https://japan-food.guide/en/restaurants/962" target="_blank" rel="noreferrer">Sushi Kunimitsu</a> or <a href="https://www.instagram.com/osushiya_taiki/" target="_blank" rel="noreferrer">Osushiya Taiki</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Kunimitsu</em> is highly rated (4.7★) for its <em>Omakase</em> course. Booking essential.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍜 Dinner</div>
                            <a href="https://www.fu-unji.com/" target="_blank" rel="noreferrer">Fuunji</a> (Shinjuku).
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Known for the best <em>Tsukemen</em> (dipping noodles) in Tokyo. Expect a line, but it moves fast!</span>
                        </div>
                    </div>
                </details>

                <div className="hotel-section bg-card-bg p-5 rounded-xl mt-10 mb-8 border-l-8 border-accent">
                    <h3 className="hotel-title text-primary text-xl font-bold mb-5 mt-0">🏨 Where to Stay: Shinjuku Area</h3>
                    <div className="hotel-grid grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-top inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#b9f6ca]">Top Pick</span>
                            <a href="https://flowerterrace-higashi-shinjuku.com/rooms/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">FLOWER TERRACE</a>
                            <div className="text-sm text-white">Exceptional value (4.9★). Modern, clean.</div>
                        </div>
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-alt inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#bbdefb]">Convenience</span>
                            <a href="https://www.vessel-hotel.jp/inn/takadanobaba/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">VESSEL INN Takadanobaba</a>
                            <div className="text-sm text-white">Directly on JR Yamanote Loop line.</div>
                        </div>
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-lux inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#ffe0b2]">OTT Luxury</span>
                            <a href="https://www.aman.com/hotels/aman-tokyo" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">Aman Tokyo</a>
                            <div className="text-sm text-white">Architectural masterpiece in Otemachi.</div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* KYOTO CONTENT */}
        {activeCity === 'Kyoto' && (
            <div className="timeline">
                <details open={openDay === 'day4'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day4')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 4: Bullet Train & Gion (Fri 21 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🚅 Morning</div>
                            <a href="https://www.japan-guide.com/e/e2018.html" target="_blank" rel="noreferrer">Shinkansen</a> to Kyoto (2.5 hrs). Buy an Ekiben!
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Buy a "Makunouchi" bento at Tokyo Station's <em>Ekibenya Matsuri</em> before boarding.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍵 Afternoon</div>
                            Check in. Explore <a href="https://www.japan-guide.com/e/e3902.html" target="_blank" rel="noreferrer">Gion District</a> and Pontocho Alley.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍱 Dinner</div>
                            Traditional <a href="https://www.japan-guide.com/e/e2036.html" target="_blank" rel="noreferrer">Kyo-Kaiseki</a> meal in Gion.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Kaiseki</em> is the haute cuisine of Japan. If not booked, wander down <strong>Pontocho Alley</strong> for atmospheric river-side dining.</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day5'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day5')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 5: Shrines, Zen & Tea (Sat 22 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">⛩️ Morning</div>
                            <a href="http://inari.jp/en/" target="_blank" rel="noreferrer">Fushimi Inari Taisha</a> (1,000 Gates). Go early!
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Arriving by 8:00 AM avoids the massive crowds and allows for a peaceful walk up the mountain.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍂 Day</div>
                            Visit <a href="https://www.kiyomizudera.or.jp/en/" target="_blank" rel="noreferrer">Kiyomizu-dera</a> and attend a traditional Tea Ceremony.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥗 Lunch</div>
                            <a href="https://www.honke-daiichiasahi.com/" target="_blank" rel="noreferrer">Honke Daiichi-Asahi</a> (Kyoto Ramen).
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> A Kyoto institution serving classic soy-based ramen. A perfect "fanatic" stop.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍱 Dinner</div>
                            Explore a <a href="https://www.japan-guide.com/e/e2062.html" target="_blank" rel="noreferrer">Depachika</a> (Department Store Food Hall) for a variety dinner.
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day6'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day6')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 6: Bamboo & Local Flavours (Sun 23 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥒 Morning</div>
                            <a href="https://www.kyoto-nishiki.or.jp/" target="_blank" rel="noreferrer">Nishiki Market</a> ("Kyoto's Kitchen").
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Try the <em>Tako Tamago</em> (red baby octopus with a quail egg inside).</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🎋 Day</div>
                            Train to <a href="https://www.japan-guide.com/e/e3912.html" target="_blank" rel="noreferrer">Arashiyama</a> (Bamboo Grove) or 🦌 Nara Deer Park.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍲 Dinner</div>
                            <a href="https://kyoto.travel/en/dining/obanzai.html" target="_blank" rel="noreferrer">Obanzai</a> (home cooking) at a local tavern.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Obanzai</em> focuses on seasonal Kyoto vegetables. For casual exploration, walk down <strong>Kiyamachi-dori</strong>.</span>
                        </div>
                    </div>
                </details>

                <div className="hotel-section bg-card-bg p-5 rounded-xl mt-10 mb-8 border-l-8 border-accent">
                    <h3 className="hotel-title text-primary text-xl font-bold mb-5 mt-0">🏨 Where to Stay: Station / Central</h3>
                    <div className="hotel-grid grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-top inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#b9f6ca]">Top Pick</span>
                            <a href="https://global.hennnahotel.com/en/kyoto-hachijoguchi/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">Henn na Hotel</a>
                            <div className="text-sm text-white">Unbeatable access right next to Kyoto Station.</div>
                        </div>
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-alt inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#bbdefb]">Boutique</span>
                            <a href="https://bnaaltermuseum.com/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">BnA Alter Museum</a>
                            <div className="text-sm text-white">Unique art-themed hotel near Gion (walkable).</div>
                        </div>
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-lux inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#ffe0b2]">OTT Luxury</span>
                            <a href="https://www.hotelthemitsui.com/en/kyoto/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">HOTEL THE MITSUI</a>
                            <div className="text-sm text-white">Natural hot spring (onsen) spa near Nijo Castle.</div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* OSAKA CONTENT */}
        {activeCity === 'Osaka' && (
            <div className="timeline">
                <details open={openDay === 'day7'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day7')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 7: Kitchen of Japan (Mon 24 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🚆 Morning</div>
                            Train to Osaka (30 mins). Visit <a href="https://www.osakacastle.net/english/" target="_blank" rel="noreferrer">Osaka Castle</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🦀 Day</div>
                            Lunch at <a href="https://www.kushikatsu-daruma.com/" target="_blank" rel="noreferrer">Kushikatsu Daruma</a>. Eat through <a href="https://osaka-info.jp/en/spot/dotonbori/" target="_blank" rel="noreferrer">Dotonbori</a> and retro <a href="https://osaka-info.jp/en/spot/shinsekai/" target="_blank" rel="noreferrer">Shinsekai</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Famous for "no double dipping" fried skewers. The Dotombori branch has the giant angry chef statue!</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏳️‍🌈 Evening</div>
                            Visit <a href="https://insideosaka.com/osaka-gay-district/" target="_blank" rel="noreferrer">Dōyama-chō</a> (Gay District). Drinks at <a href="https://www.frenzybar.com/" target="_blank" rel="noreferrer">FrenZy Bar</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥞 Dinner</div>
                            Okonomiyaki at <a href="https://2951.jp/" target="_blank" rel="noreferrer">Fukutaro</a> or <a href="http://www.ajinoya-okonomiyaki.com/top/" target="_blank" rel="noreferrer">Ajinoya Honten</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Both places are legendary. Order the <em>Negiyaki</em> (green onion pancake) at Fukutaro.</span>
                        </div>
                    </div>
                </details>

                <div className="hotel-section bg-card-bg p-5 rounded-xl mt-10 mb-8 border-l-8 border-accent">
                    <h3 className="hotel-title text-primary text-xl font-bold mb-5 mt-0">🏨 Where to Stay: Namba / Dotonbori</h3>
                    <div className="hotel-grid grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-top inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#b9f6ca]">Top Pick</span>
                            <a href="https://dotonbori-h.co.jp/en/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">JOYTEL HOTEL Namba</a>
                            <div className="text-sm text-white">Right in Dotonbori; perfect for nightlife.</div>
                        </div>
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-alt inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#bbdefb]">Modern</span>
                            <a href="https://gridshotel.com/osaka-namba/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">GRIDS PREMIUM Namba</a>
                            <div className="text-sm text-white">Newer, more refined option in central Namba.</div>
                        </div>
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-lux inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#ffe0b2]">OTT Luxury</span>
                            <a href="https://www.hilton.com/en/hotels/osacici-conrad-osaka/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">Conrad Osaka</a>
                            <div className="text-sm text-white">Incredible skyline views from Nakanoshima.</div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* SHANGHAI CONTENT */}
        {activeCity === 'Shanghai' && (
            <div className="timeline">
                <details open={openDay === 'day8'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day8')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 8: Arrival & Maglev (Tue 25 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🦀 Morning</div>
                            Quick visit to <a href="https://kuromon.com/en/" target="_blank" rel="noreferrer">Kuromon Market</a> in Osaka.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🛫 Travel</div>
                            Fly KIX to PVG (Use BA Gold Lounge).
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🚄 Arrival</div>
                            Ride the <a href="https://www.meet-in-shanghai.net/traffic/maglev" target="_blank" rel="noreferrer">MAGLEV</a> (430km/h). Simple Lamian noodle dinner.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Maglev closes at 23:40. If hungry late, wander <strong>Anfu Road</strong> near FFC.</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day9'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day9')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 9: Birthday Celebration 🎂 (Wed 26 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🌳 Day</div>
                            Walk the <a href="https://www.smartshanghai.com/articles/tourist/the-former-french-concession" target="_blank" rel="noreferrer">French Concession</a>. Shopping and cafe hopping at <strong>Ferguson Lane</strong>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥢 Dinner</div>
                            <strong><a href="https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-1039" target="_blank" rel="noreferrer">Fu 1039</a></strong> (Classic) or <strong><a href="https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/fu-he-hui" target="_blank" rel="noreferrer">Fu He Hui</a></strong> (Veg).
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> <em>Fu 1039</em> (1 Michelin Star) for Smoked Fish. <em>Fu He Hui</em> (2 Michelin Stars) for world-class vegetarian.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍸 Drinks</div>
                            <a href="https://www.timeoutshanghai.com/venue/Bars__Clubs-Bars-Gay_Bars/1368/Eddys-Bar.html" target="_blank" rel="noreferrer">Eddy's</a> or <a href="https://www.smartshanghai.com/venue/9946/Lucca" target="_blank" rel="noreferrer">Lucca 390</a>.
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day10'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day10')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 10: History & Skylines (Thu 27 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏮 Morning</div>
                            <a href="https://www.meet-in-shanghai.net/scenic-spots/yu-garden" target="_blank" rel="noreferrer">Yu Garden</a> & Bazaar.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥟 Lunch</div>
                            <a href="https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/jianguo-328" target="_blank" rel="noreferrer">Jianguo 328</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Bib Gourmand favorite for MSG-free home-style cooking.</span>
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🏙️ Evening</div>
                            Walk <a href="https://www.meet-in-shanghai.net/scenic-spots/the-bund" target="_blank" rel="noreferrer">The Bund</a>. Drinks at <a href="https://www.marriott.com/en-us/hotels/shawh-w-shanghai-the-bund/dining/" target="_blank" rel="noreferrer">Wet Bar (W Hotel)</a>.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🍽️ Dinner</div>
                            <a href="https://guide.michelin.com/en/shanghai-municipality/shanghai/restaurant/old-jesse-xuhui" target="_blank" rel="noreferrer">Old Jesse</a>.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Pre-order the <em>Hong Shao Rou</em> and <em>Scallion Roasted Fish Head</em> when booking!</span>
                        </div>
                    </div>
                </details>

                <details open={openDay === 'day11'} className="bg-card-bg mb-6 rounded-xl border border-border overflow-hidden">
                    <summary onClick={(e) => handleToggle(e, 'day11')} className="p-5 cursor-pointer font-bold text-xl flex justify-between items-center bg-card-bg text-primary hover:bg-neutral-800">Day 11: Departure (Fri 28 Feb)</summary>
                    <div className="day-content p-5 text-white">
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🛫 Morning</div>
                            07:30 Depart. Ride MAGLEV to PVG. Access First Class Lounge.
                        </div>
                        <div className="time-block mb-8 pl-5 border-l-4 border-gray-600">
                            <div className="time-label font-extrabold text-sub-text text-lg uppercase flex items-center gap-2 mb-2">🥟 Snack</div>
                            <a href="https://www.tripadvisor.com/Restaurant_Review-g308272-d1807352-Reviews-Yang_s_Fry_Dumpling-Shanghai.html" target="_blank" rel="noreferrer">Yang's Dumplings</a> inside airport.
                            <span className="tip-text block mt-2 text-base text-[#ffcc80] italic bg-white/5 p-3 rounded-md">💡 <strong>Tip:</strong> Bite a small hole in the <em>Sheng Jian Bao</em> first to vent the steam!</span>
                        </div>
                    </div>
                </details>

                <div className="hotel-section bg-card-bg p-5 rounded-xl mt-10 mb-8 border-l-8 border-accent">
                    <h3 className="hotel-title text-primary text-xl font-bold mb-5 mt-0">🏨 Where to Stay: Former French Concession</h3>
                    <div className="hotel-grid grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-top inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#b9f6ca]">Top Pick</span>
                            <a href="http://www.rayfontdowntownhotel.com/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">Rayfont Downtown</a>
                            <div className="text-sm text-white">Budget-friendly 4-star option.</div>
                        </div>
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-alt inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#bbdefb]">Style</span>
                            <a href="https://www.wyndhamhotels.com/hojo/shanghai-china/howard-johnson-huaihai-hotel-shanghai/overview" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">Howard Johnson Huaihai</a>
                            <div className="text-sm text-white">Excellent value 5-star property in central FFC.</div>
                        </div>
                        <div className="hotel-card bg-neutral-800 p-5 rounded-xl border border-border">
                            <span className="tag-lux inline-block text-sm py-1 px-2 rounded-md uppercase font-extrabold mb-2 text-black bg-[#ffe0b2]">OTT Luxury</span>
                            <a href="https://www.jhotel-shanghai.com/" target="_blank" rel="noreferrer" className="text-lg font-bold text-white hover:text-accent hover:bg-transparent block mb-1 border-b-0">J Hotel Shanghai Tower</a>
                            <div className="text-sm text-white">Highest hotel in the world (Lujiazui district).</div>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </div>
    </div>
  );
};

export default App;