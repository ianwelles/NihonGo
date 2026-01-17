import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import { mapMarkerColors as fallbackMapMarkerColors } from '../theme';
import { CityName, Place, DayItinerary } from '../types';
import { Navigation, Maximize, Minimize, Route } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import '@maplibre/maplibre-gl-leaflet';

// Standard Leaflet icon fix for default markers
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Toggles {
  sight_rec: boolean;
  food_rec: boolean;
  bar_rec: boolean;
  shopping: boolean;
  hotel: boolean;
}

interface MapProps {
  activeCity: CityName | null;
  openDay: string | null;
  isAuthenticated: boolean;
  toggles: Toggles;
  setMapRef: (map: L.Map) => void;
  isSidebarOpen?: boolean;
  isMobile?: boolean;
  itineraryData: DayItinerary[];
  places: Record<string, Place>;
  markerColors?: Record<string, string>;
  openPlaceId: string | null;
  onPopupOpen: (placeId: string) => void;
  onPopupClose: () => void;
}

const getUserIcon = (heading: number | null) => L.divIcon({
  className: 'user-location-marker',
  html: `
    <div class="relative flex items-center justify-center">
      ${heading !== null ? `
        <div class="absolute transition-transform duration-200" style="transform: rotate(${heading}deg); width: 60px; height: 60px; pointer-events: none;">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <defs>
              <radialGradient id="beamGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.4" />
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
              </radialGradient>
            </defs>
            <path d="M50 50 L30 0 A 50 50 0 0 1 70 0 Z" fill="url(#beamGradient)" />
          </svg>
        </div>
      ` : ''}
      <div class="absolute -inset-2 bg-blue-500 rounded-full animate-ping opacity-25"></div>
      <div class="relative bg-blue-500 border-2 border-white rounded-full w-4 h-4 shadow-lg z-10"></div>
    </div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

/**
 * Manages map popups, closing them if they scroll off-screen.
 */
const PopupManager: React.FC<{ isMapAnimating: boolean }> = ({ isMapAnimating }) => {
  const map = useMap();
  const openPopups = useRef<Set<L.Popup>>(new Set());

  useEffect(() => {
    const handlePopupOpen = (e: L.PopupEvent) => {
      openPopups.current.add(e.popup);
    };

    const handlePopupClose = (e: L.PopupEvent) => {
      openPopups.current.delete(e.popup);
    };

    const checkPopupsVisibility = () => {
      if (isMapAnimating) return; // Don't close popups if map is animating

      const mapBounds = map.getBounds();
      openPopups.current.forEach(popup => {
        const popupLatLng = popup.getLatLng();
        if (!mapBounds.contains(popupLatLng)) {
          popup.remove();
        }
      });
    };

    map.on('popupopen', handlePopupOpen);
    map.on('popupclose', handlePopupClose);
    map.on('move', checkPopupsVisibility);

    return () => {
      map.off('popupopen', handlePopupOpen);
      map.off('popupclose', handlePopupClose);
      map.off('move', checkPopupsVisibility);
    };
  }, [map, isMapAnimating]);

  return null;
};

interface MapControlsProps {
  position: L.LatLng | null;
  isLocating: boolean;
  isFullscreen: boolean;
  isPopupOpen: boolean;
  handleLocateClick: (e: React.MouseEvent) => void;
  toggleFullscreen: (e: React.MouseEvent) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  position,
  isLocating,
  isFullscreen,
  isPopupOpen,
  handleLocateClick,
  toggleFullscreen,
}) => {
  return (
    <div className={`flex flex-col gap-3 transition-all duration-300 pointer-events-auto ${isPopupOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}>
      <button onClick={toggleFullscreen} className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-gray-200 opacity-90 hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl transition-all duration-300" title="Toggle Fullscreen">
        {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </button>
      <button onClick={handleLocateClick} className={`flex items-center justify-center w-14 h-14 rounded-xl border backdrop-blur-md transition-all duration-300 ${isLocating ? 'animate-pulse' : ''} ${position ? 'bg-black/70 border-white/40 text-blue-400 opacity-100' : 'bg-black/40 border-white/10 text-gray-200 opacity-90'} hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl`} title="Center on my location">
        <Navigation size={24} className={position ? 'fill-blue-400/20' : ''} />
      </button>
    </div>
  );
};


const UserLocationMarker: React.FC<{ isSidebarOpen?: boolean; isMobile?: boolean }> = ({ isSidebarOpen, isMobile }) => {
  const map = useMap();
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const controlRef = useRef<L.Control | null>(null);
  const controlDivRef = useRef<HTMLDivElement | null>(null);
  const reactRootRef = useRef<any>(null); // Ref for the React root

  useEffect(() => {
    const handlePopupOpen = () => setIsPopupOpen(true);
    const handlePopupClose = () => setIsPopupOpen(false);
    map.on('popupopen', handlePopupOpen);
    map.on('popupclose', handlePopupClose);
    return () => {
      map.off('popupopen', handlePopupOpen);
      map.off('popupclose', handlePopupClose);
    };
  }, [map]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // @ts-ignore
      let compass = e.webkitCompassHeading || e.alpha;
      if (compass !== null && compass !== undefined) {
        setHeading(compass);
      }
    };

    const requestOrientationPermission = async () => {
      // @ts-ignore
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
          // @ts-ignore
          const permissionState = await DeviceOrientationEvent.requestPermission();
          if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.error('DeviceOrientation permission error:', error);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    requestOrientationPermission();
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  useEffect(() => {
    map.locate({ watch: true, enableHighAccuracy: true });
    const onLocationFound = (e: L.LocationEvent) => {
      setPosition(e.latlng);
      setIsLocating(false);
    };
    const onLocationError = (e: L.ErrorEvent) => {
      console.warn("Geolocation error:", e.message);
      setIsLocating(false);
    };
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
      map.stopLocate();
    };
  }, [map]);

  const handleLocateClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (position) {
      map.flyTo(position, 16, { duration: 1.5, easeLinearity: 0.25 });
    } else {
      setIsLocating(true);
      map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    }
  }, [map, position]);

  const toggleFullscreen = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);


  useEffect(() => {
    if (!map) return;

    if (!controlRef.current) {
      const CustomControl = L.Control.extend({
        onAdd: function(map: L.Map) {
          controlDivRef.current = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          controlDivRef.current.style.backgroundColor = 'transparent';
          controlDivRef.current.style.backgroundImage = 'none';
          controlDivRef.current.style.width = 'auto';
          controlDivRef.current.style.height = 'auto';
          controlDivRef.current.style.border = 'none';
          controlDivRef.current.style.boxShadow = 'none';
          controlDivRef.current.style.opacity = '1';
          // Create a React root
          reactRootRef.current = createRoot(controlDivRef.current);
          return controlDivRef.current;
        },
        onRemove: function(map: L.Map) {
          // No-op: actual unmount handled in useEffect cleanup
        },
      });
      controlRef.current = new CustomControl({ position: 'topright' });
      map.addControl(controlRef.current);
    }

    if (reactRootRef.current) {
      reactRootRef.current.render(
        <MapControls
          position={position}
          isLocating={isLocating}
          isFullscreen={isFullscreen}
          isPopupOpen={isPopupOpen}
          handleLocateClick={handleLocateClick}
          toggleFullscreen={toggleFullscreen}
        />
      );
    }

    return () => {
      if (map && controlRef.current) {
        map.removeControl(controlRef.current);
        controlRef.current = null;
      }
      if (reactRootRef.current) {
        const root = reactRootRef.current;
        setTimeout(() => {
          root.unmount();
        }, 0);
        reactRootRef.current = null;
      }
    };
  }, [map, position, isLocating, isFullscreen, isPopupOpen, handleLocateClick, toggleFullscreen]);

  const { popupPaddingTopLeft, popupPaddingBottomRight } = useMemo(() => {
    const isMobileView = window.innerWidth < 768;
    const sidebarWidth = 384;

    if (isMobileView) {
        return {
            popupPaddingTopLeft: L.point(50, 100),
            popupPaddingBottomRight: L.point(50, 100)
        };
    } else {
        const leftPadding = isSidebarOpen ? sidebarWidth + 60 : 50;
        return {
            popupPaddingTopLeft: L.point(leftPadding, 100),
            popupPaddingBottomRight: L.point(50, 100)
        };
    }
  }, [isSidebarOpen]);

  return (
    <>
      <style>{`
        @keyframes popup-scale-in {
            from { transform: scale(0.8); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .leaflet-popup-content-wrapper {
            animation: popup-scale-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        /* Custom styles for Leaflet control to match original spacing */
        .leaflet-top .leaflet-control-custom {
          margin-top: 16px; /* top-4 */
          margin-right: 16px; /* right-4 */
        }
        @media (min-width: 768px) { /* md breakpoint */
          .leaflet-top .leaflet-control-custom {
            margin-top: 24px; /* md:top-6 */
            margin-right: 24px; /* md:right-6 */
          }
        }
      `}</style>
      {position && (
        <Marker position={position} icon={getUserIcon(heading)} zIndexOffset={1000}>
          <Popup keepInView={true} autoPanPaddingTopLeft={popupPaddingTopLeft} autoPanPaddingBottomRight={popupPaddingBottomRight}>
            <div className="text-base font-bold text-gray-900">You are here</div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

const MapController: React.FC<{
  activeCity: CityName | null;
  openDay: string | null;
  isSidebarOpen?: boolean;
  setMapRef: (map: L.Map) => void;
  filteredPlaces: Place[];
  setIsMapAnimating: React.Dispatch<React.SetStateAction<boolean>>; // New prop
}> = ({ activeCity, openDay, isSidebarOpen, setMapRef, filteredPlaces, setIsMapAnimating }) => {
  const map = useMap();
  const prevActiveCity = useRef<CityName | null | undefined>(undefined);
  const prevOpenDay = useRef<string | null>(null);
  const prevIsSidebarOpen = useRef<boolean | undefined>(isSidebarOpen);

  useEffect(() => {
    if (map) setMapRef(map);
  }, [map, setMapRef]);

  useEffect(() => {
    if (!map || filteredPlaces.length === 0) return;

    const isCityChange = activeCity !== prevActiveCity.current;
    const isDayChange = openDay !== prevOpenDay.current;
    const isSidebarToggle = isSidebarOpen !== prevIsSidebarOpen.current;
    const isInitialLoad = prevActiveCity.current === undefined;

    if (isCityChange || isDayChange || isSidebarToggle || isInitialLoad) {
      const markers = filteredPlaces.map(place => L.marker([place.coordinates.lat, place.coordinates.lon]));
      const group = L.featureGroup(markers);
      const isMobileView = window.innerWidth < 768;
      const sidebarWidth = 384;

      let fitBoundsOptions: L.FitBoundsOptions = { maxZoom: 15, animate: true };
      if (isMobileView) {
        fitBoundsOptions.paddingTopLeft = [20, 70];
        fitBoundsOptions.paddingBottomRight = [20, 200];
      } else {
        const sidebarWidth = 384; // Ensure sidebarWidth is defined here
        let leftPadding = 60; // Default padding for desktop

        if (isSidebarOpen) {
          // Apply larger padding only when sidebar is open and map is fitting bounds
          // for a city change, day change, initial load, or sidebar toggle itself.
          // This ensures the overall view respects the sidebar without being overly aggressive
          // during individual popup interactions.
          leftPadding = sidebarWidth + 60;
        }
        fitBoundsOptions.paddingTopLeft = [leftPadding, 80];
        fitBoundsOptions.paddingBottomRight = [100, 160];
      }

      setIsMapAnimating(true); // Set animating to true before map movement
      const handleMoveEnd = () => {
        setIsMapAnimating(false); // Set animating to false after map movement
        map.off('moveend', handleMoveEnd);
      };
      map.on('moveend', handleMoveEnd);

      map.stop();
      if (isInitialLoad || (activeCity === null && openDay === null)) {
        map.fitBounds(group.getBounds(), { ...fitBoundsOptions, maxZoom: 7, duration: 1.5 });
      }
      // Do not fly to bounds if only the sidebar is toggled or initial load without activeCity/openDay
      else if (isCityChange || isDayChange) {
        map.flyToBounds(group.getBounds(), { ...fitBoundsOptions, duration: 1.2, easeLinearity: 0.25 });
      } else if (isSidebarToggle) {
        // Recalculate padding and refit bounds without animation for sidebar toggle
        map.fitBounds(group.getBounds(), { ...fitBoundsOptions, duration: 0.6 });
      }
    }

    prevActiveCity.current = activeCity;
    prevOpenDay.current = openDay;
    prevIsSidebarOpen.current = isSidebarOpen;
  }, [map, activeCity, openDay, isSidebarOpen, filteredPlaces, setIsMapAnimating]);

  return null;
};

// Extracted PlaceMarkers component for optimization
const PlaceMarkers = React.memo(({ places, markerColors, isSidebarOpen, openPlaceId, onPopupOpen, onPopupClose }: { places: Place[], markerColors: Record<string, string>, isSidebarOpen?: boolean, openPlaceId: string | null, onPopupOpen: (placeId: string) => void, onPopupClose: () => void }) => {
  const markerRefs = useRef<Record<string, L.Marker>>({});
  const map = useMap();

  const getIcon = useCallback((type: string) => {
    const color = markerColors[type] || markerColors['default'] || fallbackMapMarkerColors[type] || fallbackMapMarkerColors['default'] || '#3B82F6';
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
  }, [markerColors]);

  const { popupPaddingTopLeft, popupPaddingBottomRight } = useMemo(() => {
    const isMobileView = window.innerWidth < 768;
    const sidebarWidth = 384;

    if (isMobileView) {
        return {
            popupPaddingTopLeft: L.point(50, 100),
            popupPaddingBottomRight: L.point(50, 100)
        };
    } else {
        const leftPadding = isSidebarOpen ? sidebarWidth + 60 : 50;
        return {
            popupPaddingTopLeft: L.point(leftPadding, 100),
            popupPaddingBottomRight: L.point(50, 100)
        };
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    if (openPlaceId && markerRefs.current[openPlaceId]) {
      const marker = markerRefs.current[openPlaceId];
      marker.openPopup();
      onPopupOpen(openPlaceId); // Notify parent that popup is open
    }
  }, [openPlaceId, map, onPopupOpen]);


  return (
    <>
      {places.map((place) => {
        const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lon}&travelmode=transit`;
        const displayTags = place.hotelMeta?.tags || place.tags;
        const typeColor = markerColors[place.type] || markerColors['default'] || fallbackMapMarkerColors[place.type] || fallbackMapMarkerColors['default'] || '#00BCD4';

        return (
          <Marker
            key={place.id}
            position={[place.coordinates.lat, place.coordinates.lon]}
            icon={getIcon(place.type)}
            ref={el => { if (el) markerRefs.current[place.id] = el; }}
            eventHandlers={{
              popupclose: () => onPopupClose(), // Notify parent that popup is closed
            }}
          >
            <Popup keepInView={true} autoPanPaddingTopLeft={popupPaddingTopLeft} autoPanPaddingBottomRight={popupPaddingBottomRight}>
              <div className="text-left min-w-[240px] py-1">
                <span className="font-extrabold text-sm uppercase tracking-widest mb-2 block" style={{ color: typeColor }}>
                  {place.type.replace(/_/g, ' ')}
                </span>
                {place.url ? (
                  <a href={place.url} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold !text-white mb-2 leading-tight inline-block border-b-2 border-white/30 hover:!text-white hover:border-transparent transition-colors duration-200">
                    {place.name}
                  </a>
                ) : (
                  <span className="text-2xl font-bold text-white mb-2 leading-tight block">{place.name}</span>
                )}
                <span className="text-gray-100 text-base leading-relaxed mb-3 block">{place.description}</span>
                {displayTags && displayTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 mb-5">
                    {displayTags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                )}
                <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-black/40 text-white uppercase font-bold text-sm px-6 py-3 rounded-lg border border-white/10 hover:bg-black/60 transition-colors shadow-lg no-underline active:scale-95">
                  <Route className="w-4 h-4 mr-2" /> Get Directions
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
});

const VectorTileLayer = () => {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore
    const glLayer = L.maplibreGL({
      style: '/map-style.json', // Loads the custom style from public folder
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    });

    glLayer.addTo(map);

    return () => {
      map.removeLayer(glLayer);
    };
  }, [map]);

  return null;
};

export const MapContainer: React.FC<MapProps> = ({
  activeCity,
  openDay,
  isAuthenticated,
  toggles,
  setMapRef,
  isSidebarOpen,
  isMobile,
  itineraryData,
  places,
  markerColors = {},
  openPlaceId,
  onPopupOpen,
  onPopupClose
}) => {
  const [isMapAnimating, setIsMapAnimating] = useState(false);

  const filteredPlaces = useMemo(() => {
    // On initial load (no active city or open day), show only hotels
    if (!activeCity && !openDay) {
      return Object.values(places).filter(place => place.type === 'hotel');
    }

    if (openDay) {
      // If a specific day is open, show all places for that day's itinerary, including the hotel.
      const dayItinerary = itineraryData.find(day => `day${day.dayNumber}-${day.city}` === openDay);

      if (dayItinerary) {
        const placeIdsForDay = new Set<string>();

        // Add activity places
        dayItinerary.activities.forEach(activity => {
          if (places[activity.placeId]) {
            placeIdsForDay.add(activity.placeId);
          }
        });

        // Add hotel places
        if (dayItinerary.hotelIds) {
          dayItinerary.hotelIds.forEach(hotelId => {
            if (places[hotelId]) {
              placeIdsForDay.add(hotelId);
            }
          });
        }
        
        const itineraryPlaces = Array.from(placeIdsForDay).map(id => places[id]);

        // Additionally, include places in the active city that match toggles but are not in the day's itinerary
        const toggledCityPlaces = Object.values(places).filter(place => {
          const matchesCity = place.city === activeCity;
          const isInItinerary = placeIdsForDay.has(place.id);
          const matchesToggle =
            (toggles.sight_rec && place.type === 'sight_rec') ||
            (toggles.food_rec && place.type === 'food_rec') ||
            (toggles.bar_rec && place.type === 'bar_rec') ||
            (toggles.shopping && place.type === 'shopping') ||
            (toggles.hotel && place.type === 'hotel'); // Include hotels based on toggle as well

          return matchesCity && !isInItinerary && matchesToggle;
        });

        return [...itineraryPlaces, ...toggledCityPlaces];
      }
      return []; // Return empty if no matching day is found

    } else if (activeCity) {
      // If only a city is active, show all places for that city based on toggles.
      const itineraryPlaceIdsInActiveCity = new Set<string>();
      itineraryData.forEach(day => {
        if (day.city === activeCity) {
          day.activities.forEach(activity => itineraryPlaceIdsInActiveCity.add(activity.placeId));
          if (day.hotelIds) {
            day.hotelIds.forEach(hotelId => {
              itineraryPlaceIdsInActiveCity.add(hotelId)
            });
          }
        }
      });

      return Object.values(places).filter(place => {
        const matchesCity = place.city === activeCity;
        const isItineraryPlace = itineraryPlaceIdsInActiveCity.has(place.id);
        const matchesToggle = 
          (toggles.sight_rec && place.type === 'sight_rec') ||
          (toggles.food_rec && place.type === 'food_rec') ||
          (toggles.bar_rec && place.type === 'bar_rec') ||
          (toggles.shopping && place.type === 'shopping') ||
          place.type === 'hotel'; // ALWAYS include hotel if activeCity is set
        
        return matchesCity && (isItineraryPlace || matchesToggle);
      });
    }

    // Fallback for when only toggles are used (no active city or day)
    return Object.values(places).filter(place => {
      return (toggles.sight_rec && place.type === 'sight_rec') ||
             (toggles.food_rec && place.type === 'food_rec') ||
             (toggles.bar_rec && place.type === 'bar_rec') ||
             (toggles.shopping && place.type === 'shopping') ||
             (toggles.hotel && place.type === 'hotel');
    });
  }, [activeCity, openDay, places, itineraryData, toggles]);


  if (!isAuthenticated) return <div className="h-full w-full bg-gray-900" />;

  return (
    <div className="h-full w-full relative">
      <LeafletMap center={[35.6895, 139.6917]} zoom={12} zoomControl={false} attributionControl={false} className="h-full w-full bg-gray-900">
        <VectorTileLayer />
        
        <MapController activeCity={activeCity} openDay={openDay} isSidebarOpen={isSidebarOpen} setMapRef={setMapRef} filteredPlaces={filteredPlaces} setIsMapAnimating={setIsMapAnimating} />
        <PopupManager isMapAnimating={isMapAnimating} />
        <UserLocationMarker isSidebarOpen={isSidebarOpen} isMobile={isMobile} />
        <PlaceMarkers places={filteredPlaces} markerColors={markerColors} isSidebarOpen={isSidebarOpen} openPlaceId={openPlaceId} onPopupOpen={onPopupOpen} onPopupClose={onPopupClose} />
      </LeafletMap>
    </div>
  );
};
