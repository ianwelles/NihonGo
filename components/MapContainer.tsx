import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { locations, mapMarkerColors } from '../data';
import { CityName } from '../types';

interface Toggles {
  sight_rec: boolean;
  food_rec: boolean;
  shopping: boolean;
}

interface MapContainerProps {
  activeCity: CityName;
  openDay: string | null;
  isAuthenticated: boolean;
  toggles: Toggles;
  setMapRef: (map: L.Map) => void;
}

const getIcon = (type: string) => {
  const color = mapMarkerColors[type] || mapMarkerColors['default'];
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

export const MapContainer: React.FC<MapContainerProps> = ({ 
  activeCity, 
  openDay, 
  isAuthenticated, 
  toggles, 
  setMapRef 
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const prevActiveCity = useRef<string | null>(null);
  const prevOpenDay = useRef<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || mapRef.current) return;

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
    setMapRef(map);

    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, [isAuthenticated, setMapRef]);

  useEffect(() => {
    if (!mapRef.current || !isAuthenticated) return;
    markersRef.current.forEach(m => mapRef.current!.removeLayer(m));
    markersRef.current = [];
    const cityLocs = locations[activeCity];
    if (!cityLocs) return;
    const group = L.featureGroup();
    const currentDayNumber = openDay ? openDay.replace('day', '') : null;
    const dayRegex = currentDayNumber ? new RegExp('\b' + currentDayNumber + '\b') : null;
    
    cityLocs.forEach(loc => {
        if ((loc.type === 'sight_rec' && !toggles.sight_rec) ||
            (loc.type === 'food_rec' && !toggles.food_rec) ||
            (loc.type === 'shopping' && !toggles.shopping)) {
            return;
        }

        const isPersistent = ['hotel', 'suggestion', 'sight_rec', 'food_rec', 'shopping'].includes(loc.type);
        const matchesDay = !dayRegex || (loc.day && (dayRegex.test(loc.day) || loc.day === 'Any'));
        
        if (isPersistent || matchesDay) {
            const icon = getIcon(loc.type);
            const titleHtml = loc.url 
                ? `<a href="${loc.url}" target="_blank" rel="noopener noreferrer" class="text-xl font-bold !text-white mb-1 leading-tight inline-block border-b border-white/30 hover:!text-white hover:border-transparent transition-colors duration-200">${loc.name}</a>` 
                : `<span class="text-xl font-bold text-primary mb-1 leading-tight block">${loc.name}</span>`;
            const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lon}&travelmode=transit`;
            const popupContent = `
                    <div class="text-left">
                        <span class="${loc.type.includes('_rec') ? 'text-[#00BCD4]' : 'text-sub-text'} font-extrabold text-xs uppercase tracking-wide mb-1 block">
                            ${loc.day === 'Any' ? '⭐ Recommended' : loc.day}
                        </span>
                        ${titleHtml}
                        <span class="text-gray-400 font-bold text-xs uppercase tracking-wide mb-2 block">${loc.type.replace(/_/g, ' ')}</span>
                        <span class="text-gray-300 text-sm leading-relaxed mb-4 block">${loc.desc}</span>
                        <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" class="inline-block bg-[#8ab4f8] text-[#202124] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#aecbfa] transition-colors shadow-md no-underline border-none">📍Get Directions</a>
                    </div>
                `;
            const m = L.marker([loc.lat, loc.lon], {icon: icon})
                .bindPopup(popupContent);
            
            group.addLayer(m);
            markersRef.current.push(m);
        }
    });

    group.addTo(mapRef.current);
    
    const shouldRecenter = (activeCity !== prevActiveCity.current) || (openDay !== prevOpenDay.current);

    if (shouldRecenter && group.getLayers().length > 0) {
        setTimeout(() => {
            if (mapRef.current) {
                // Mobile-specific padding and maxZoom
                const isMobile = window.innerWidth < 768;
                const padding: [number, number] = isMobile ? [50, 50] : [0.1, 0.1]; // More padding on mobile
                const maxZoom = isMobile ? 15 : undefined; // Force closer zoom on mobile if needed

                mapRef.current.fitBounds(group.getBounds(), {
                    padding: padding,
                    maxZoom: maxZoom 
                });
            }
        }, 250);
    }
    
    prevActiveCity.current = activeCity;
    prevOpenDay.current = openDay;

  }, [activeCity, openDay, isAuthenticated, toggles]);

  return (
    <div className="h-full w-full bg-gray-900" id="map">
      {openDay && (
          <div className="absolute bottom-4 right-4 z-[1000] pointer-events-none transition-opacity duration-300">
             <div className="bg-black/90 backdrop-blur border border-primary px-3 py-2 rounded-lg shadow-2xl flex items-center gap-2">
                <span className="text-primary font-bold text-lg uppercase tracking-wider leading-none">
                  Day {openDay.replace('day', '')}
                </span>
             </div>
          </div>
      )}
    </div>
  );
};
