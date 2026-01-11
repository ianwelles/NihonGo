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
  activeCity: CityName | null;
  openDay: string | null;
  isAuthenticated: boolean;
  toggles: Toggles;
  setMapRef: (map: L.Map) => void;
  isSidebarOpen?: boolean;
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
  setMapRef,
  isSidebarOpen
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const prevActiveCity = useRef<string | null | undefined>(undefined);
  const prevOpenDay = useRef<string | null>(null);
  const prevToggles = useRef<Toggles>(toggles);
  const prevIsSidebarOpen = useRef<boolean | undefined>(isSidebarOpen);

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

    const isCityChange = activeCity !== prevActiveCity.current;
    const isDayChange = openDay !== prevOpenDay.current;
    const isToggleChange = JSON.stringify(toggles) !== JSON.stringify(prevToggles.current);
    const isSidebarToggle = isSidebarOpen !== prevIsSidebarOpen.current;

    // Only rebuild markers if city, day, or toggles changed
    if (isCityChange || isDayChange || isToggleChange || markersRef.current.length === 0) {
        markersRef.current.forEach(m => mapRef.current!.removeLayer(m));
        markersRef.current = [];

        // Determine which cities to show
        const citiesToShow: CityName[] = activeCity ? [activeCity] : ['Tokyo', 'Kyoto', 'Osaka', 'Shanghai'];

        citiesToShow.forEach(cityName => {
            let cityLocs = locations[cityName];
            

            if (cityLocs) {
                cityLocs.forEach(loc => {
                    const isHotel = loc.type === 'hotel';
                    const normalizedLocDay = loc.day?.toLowerCase().replace(' ', '');
                    const isDayAlwaysVisible = ['suggestion', 'any', 'stay'].includes(normalizedLocDay || '');
                    const matchesSelectedDay = openDay === null || normalizedLocDay === openDay;

                    let shouldDisplayMarker = false;

                    if (isHotel) {
                        shouldDisplayMarker = true; // Hotels are always visible
                    } else if (!activeCity) {
                        // If no city is active and it's not a hotel, don't display
                        shouldDisplayMarker = false;
                    } else {
                        // City is active and it's not a hotel: apply toggle and day filters
                        let passesToggleFilter = true;

                        if (loc.type === 'sight_rec' && !toggles.sight_rec) passesToggleFilter = false;
                        if (loc.type === 'food_rec' && !toggles.food_rec) passesToggleFilter = false;
                        if (loc.type === 'shopping' && !toggles.shopping) passesToggleFilter = false;

                        shouldDisplayMarker = passesToggleFilter && (isDayAlwaysVisible || matchesSelectedDay);
                    }

                    if (shouldDisplayMarker) {
                        const icon = getIcon(loc.type);
                        const titleHtml = loc.url 
                            ? `<a href="${loc.url}" target="_blank" rel="noopener noreferrer" class="text-xl font-bold !text-white mb-1 leading-tight inline-block border-b border-white/30 hover:!text-white hover:border-transparent transition-colors duration-200">${loc.name}</a>` 
                            : `<span class="text-xl font-bold text-primary mb-1 leading-tight block">${loc.name}</span>`;
                        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lon}&travelmode=transit`;
                        const popupContent = `
                                <div class="text-left">
                                    <span class="${loc.type.includes('_rec') ? 'text-[#00BCD4]' : 'text-sub-text'}" font-extrabold text-xs uppercase tracking-wide mb-1 block">
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
                        
                        m.addTo(mapRef.current!);
                        markersRef.current.push(m);
                    }
                });
            }
        });
    }

    // Recenter logic
    const isInitialLoad = prevActiveCity.current === undefined;
    if ((isCityChange || isDayChange || isSidebarToggle || isInitialLoad) && markersRef.current.length > 0) {
        requestAnimationFrame(() => {
            if (mapRef.current && markersRef.current.length > 0) {
                const group = L.featureGroup(markersRef.current);
                const isMobileView = window.innerWidth < 768;
                const sidebarWidth = 320;

                let fitBoundsOptions: L.FitBoundsOptions = {
                    paddingTopLeft: [50, 50],
                    paddingBottomRight: [50, 50],
                    maxZoom: 15,
                    animate: true
                };

                if (!isMobileView && isSidebarOpen) {
                    fitBoundsOptions.paddingTopLeft = [sidebarWidth + 20, 50];
                };

                mapRef.current.stop();

                if (isInitialLoad || activeCity === null) {
                    // Zoom out to show all markers on initial load or when no city is selected
                    mapRef.current.fitBounds(group.getBounds(), {
                        paddingTopLeft: !isMobileView && isSidebarOpen ? [sidebarWidth + 20, 50] : [50, 50],
                        paddingBottomRight: [50, 50],
                        maxZoom: 7,
                        animate: true,
                        duration: 1.5
                    });
                } else if (isCityChange) {
                    mapRef.current.flyToBounds(group.getBounds(), {
                        ...fitBoundsOptions,
                        duration: 1.2,
                        easeLinearity: 0.25
                    });
                } else {
                    mapRef.current.fitBounds(group.getBounds(), {
                        ...fitBoundsOptions,
                        duration: 0.6
                    });
                }
            }
        });
    }
    
    prevActiveCity.current = activeCity;
    prevOpenDay.current = openDay;
    prevToggles.current = toggles;
    prevIsSidebarOpen.current = isSidebarOpen;

  }, [activeCity, openDay, isAuthenticated, toggles, isSidebarOpen]); 

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
