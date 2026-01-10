import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { locations, iconColors } from '../data';
import { CityName } from '../types';

declare const L: any;

interface MapContainerProps {
  activeCity: CityName;
  openDay: string | null;
  isAuthenticated: boolean;
  onOpenShopping: () => void;
}

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

export const MapContainer: React.FC<MapContainerProps> = ({ activeCity, openDay, isAuthenticated, onOpenShopping }) => {
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const prevActiveCity = useRef<string | null>(null);
  const prevOpenDay = useRef<string | null>(null);
  
  // State for toggling map layers
  const [toggles, setToggles] = useState({
    sight_rec: true,
    food_rec: true,
    shopping: true
  });

  const toggleCategory = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
    }
    const map = L.map('map', { 
        attributionControl: false,
        zoomControl: false,
        center: [35.6895, 139.6917],
        zoom: 12
    });
    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.attribution({ prefix: false }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
        className: 'high-contrast-labels',
        zIndex: 650
    }).addTo(map);
    mapRef.current = map;
    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!mapRef.current || !isAuthenticated) return;
    markersRef.current.forEach(m => mapRef.current.removeLayer(m));
    markersRef.current = [];
    const cityLocs = locations[activeCity];
    if (!cityLocs) return;
    const group = L.featureGroup();
    const currentDayNumber = openDay ? openDay.replace('day', '') : null;
    const dayRegex = currentDayNumber ? new RegExp(`\\b${currentDayNumber}\\b`) : null;
    
    cityLocs.forEach(loc => {
        // Apply filter based on toggles
        if (loc.type === 'sight_rec' && !toggles.sight_rec) return;
        if (loc.type === 'food_rec' && !toggles.food_rec) return;
        if (loc.type === 'shopping' && !toggles.shopping) return;

        const isPersistent = ['hotel', 'suggestion', 'sight_rec', 'food_rec', 'shopping'].includes(loc.type);
        const matchesDay = !dayRegex || (loc.day && (dayRegex.test(loc.day) || loc.day === 'Any'));
        
        if (isPersistent || matchesDay) {
            const icon = getIcon(loc.type);
            const titleHtml = loc.url 
                ? `<a href="${loc.url}" target="_blank" rel="noopener noreferrer" class="text-xl font-bold !text-white mb-1 leading-tight inline-block border-b border-white/30 hover:!text-accent hover:border-accent transition-colors duration-200">${loc.name}</a>` 
                : `<span class="text-xl font-bold text-primary mb-1 leading-tight block">${loc.name}</span>`;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lon}&travelmode=transit`;
            const popupContent = `
                    <div class="text-left">
                        <span class="${loc.type.includes('_rec') ? 'text-[#00BCD4]' : 'text-sub-text'} font-extrabold text-xs uppercase tracking-wide mb-1 block">
                            ${loc.day === 'Any' ? '⭐ Recommended' : loc.day}
                        </span>
                        ${titleHtml}
                        <span class="text-gray-400 font-bold text-xs uppercase tracking-wide mb-2 block">${loc.type.replace('_', ' ')}</span>
                        <span class="text-gray-300 text-sm leading-relaxed mb-4 block">${loc.desc}</span>
                        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="inline-block bg-[#8ab4f8] text-[#202124] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#aecbfa] transition-colors shadow-md no-underline border-none">📍Get Directions</a>
                    </div>
                `;
            const m = L.marker([loc.lat, loc.lon], {icon: icon})
                .bindPopup(popupContent)
                .addTo(mapRef.current);
            group.addLayer(m);
            markersRef.current.push(m);
        }
    });
    
    // Check if we should recenter (City change or Day change)
    // We only want to fitBounds if the user changes context (City or Day), not when filtering.
    const shouldRecenter = (activeCity !== prevActiveCity.current) || (openDay !== prevOpenDay.current);

    setTimeout(() => {
        if (mapRef.current) {
             mapRef.current.invalidateSize();
             if (shouldRecenter && group.getLayers().length > 0) {
                 mapRef.current.fitBounds(group.getBounds().pad(0.1));
             }
        }
    }, 250);
    
    // Update refs
    prevActiveCity.current = activeCity;
    prevOpenDay.current = openDay;

  }, [activeCity, openDay, isAuthenticated, toggles]);

  return (
    <>
      <div className="relative h-[450px] w-full mb-3 rounded-xl border-2 border-border overflow-hidden z-10">
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

      {/* Map Legend / Toggles */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button 
          onClick={() => toggleCategory('sight_rec')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 shadow-sm transition-all duration-300 ${toggles.sight_rec ? 'bg-card-bg/80' : 'bg-card-bg/30 opacity-70 hover:opacity-100'}`}
        >
            <span className={`w-3 h-3 rounded-full bg-[#00BCD4] transition-all duration-300 ${toggles.sight_rec ? 'shadow-[0_0_8px_#00BCD4]' : 'opacity-40 shadow-none'}`}></span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Landmarks</span>
        </button>
        
        <button 
          onClick={() => toggleCategory('food_rec')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 shadow-sm transition-all duration-300 ${toggles.food_rec ? 'bg-card-bg/80' : 'bg-card-bg/30 opacity-70 hover:opacity-100'}`}
        >
            <span className={`w-3 h-3 rounded-full bg-[#F48FB1] transition-all duration-300 ${toggles.food_rec ? 'shadow-[0_0_8px_#F48FB1]' : 'opacity-40 shadow-none'}`}></span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Must-Try Food</span>
        </button>
        
        <button 
          onClick={() => toggleCategory('shopping')}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 shadow-sm transition-all duration-300 ${toggles.shopping ? 'bg-card-bg/80' : 'bg-card-bg/30 opacity-70 hover:opacity-100'}`}
        >
            <span className={`w-3 h-3 rounded-full bg-[#FFD700] transition-all duration-300 ${toggles.shopping ? 'shadow-[0_0_8px_#FFD700]' : 'opacity-40 shadow-none'}`}></span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Shopping Hubs</span>
        </button>

        {/* Must Buy Button */}
        <button
          onClick={onOpenShopping}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.4)] bg-[#FFD700]/10 hover:bg-[#FFD700] hover:text-black text-[#FFD700] transition-all duration-300"
        >
            <ShoppingBag className="w-3 h-3" />
            <span className="text-[10px] font-black uppercase tracking-widest">Must Buy</span>
        </button>
      </div>
    </>
  );
};