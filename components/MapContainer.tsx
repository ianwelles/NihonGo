import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer as LeafletMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '../context/AppContext';
import { Landmark, Utensils, Wine, Store, Info, Navigation, Maximize, Minimize } from 'lucide-react';
import { SIDEBAR_WIDTH } from './Map/mapConstants';

import VectorTileLayer from './Map/VectorTileLayer';
import MapController from './Map/MapController';
import PopupManager from './Map/PopupManager';
import UserLocationMarker from './Map/controls/UserLocation';
import PlaceMarkers from './Map/PlaceMarkers';
import { CityZoomDetector } from './Map/CityZoomDetector';

const CategoryIcon: React.FC<{ type: string; size?: number; color?: string }> = ({ type, size = 18, color }) => {
  switch (type) {
    case 'sight_rec':
    case 'sight':
      return <Landmark size={size} style={{ color }} />;
    case 'food_rec':
    case 'food':
      return <Utensils size={size} style={{ color }} />;
    case 'bar_rec':
    case 'bar':
      return <Wine size={size} style={{ color }} />;
    case 'shopping':
      return <Store size={size} style={{ color }} />;
    default:
      return <Info size={size} style={{ color }} />;
  }
};

export const MapContainer: React.FC<{ setMapRef: (map: L.Map) => void, isAuthenticated: boolean }> = ({ setMapRef, isAuthenticated }) => {
  const { activeCity, openDay, places, itineraryData, toggles, isSidebarOpen, isMobile, toggleCategory, theme } = useAppStore();
  const [isMapAnimating, setIsMapAnimating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [userPosition, setUserPosition] = useState<L.LatLng | null>(null);
  const [mapInstance, setInternalMapRef] = useState<L.Map | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const itineraryPlaceIds = useMemo(() => {
    const ids = new Set<string>();
    itineraryData.forEach(day => {
      day.activities.forEach(activity => ids.add(activity.placeId));
      if (day.hotelIds) day.hotelIds.forEach(id => ids.add(id));
    });
    return ids;
  }, [itineraryData]);

  const allHotels = useMemo(() => 
    Object.values(places).filter(place => place.type === 'hotel'),
  [places]);

  const filteredPlaces = useMemo(() => {
    if (!activeCity && !openDay) {
      return allHotels;
    }

    if (openDay) {
      const dayItinerary = itineraryData.find(day => `day${day.dayNumber}-${day.city}` === openDay);
      if (dayItinerary) {
        const placeIdsForDay = new Set<string>();
        dayItinerary.activities.forEach(activity => placeIdsForDay.add(activity.placeId));
        if (dayItinerary.hotelIds) dayItinerary.hotelIds.forEach(id => placeIdsForDay.add(id));
        
        const itineraryPlaces = Array.from(placeIdsForDay).map(id => places[id]).filter(Boolean);

        const toggledCityPlaces = Object.values(places).filter(place => {
          const matchesCity = place.city === activeCity;
          // Check if it belongs to ANY day's itinerary
          const isAnyItineraryPlace = itineraryPlaceIds.has(place.id);
          const matchesToggle = toggles[place.type] || place.type === 'suggestion' || place.type === 'hotel';

          // Only show non-itinerary places via toggles when a specific day is selected
          return matchesCity && !isAnyItineraryPlace && matchesToggle;
        });

        return [...itineraryPlaces, ...toggledCityPlaces];
      }
      return []; 

    } else if (activeCity) {
      const itineraryPlaceIdsInActiveCity = new Set<string>();
      itineraryData.forEach(day => {
        if (day.city === activeCity) {
          day.activities.forEach(activity => itineraryPlaceIdsInActiveCity.add(activity.placeId));
          if (day.hotelIds) day.hotelIds.forEach(id => itineraryPlaceIdsInActiveCity.add(id));
        }
      });

      return Object.values(places).filter(place => {
        const matchesCity = place.city === activeCity;
        const isItineraryPlace = itineraryPlaceIdsInActiveCity.has(place.id);
        const matchesToggle = toggles[place.type] || place.type === 'hotel' || place.type === 'suggestion';
        
        return matchesCity && (isItineraryPlace || matchesToggle);
      });
    }

    return Object.values(places).filter(place => toggles[place.type] || place.type === 'hotel');
  }, [activeCity, openDay, places, itineraryData, toggles, itineraryPlaceIds, allHotels]);

  // Combine filtered places with all hotels to ensure hotels are always visible
  const displayPlaces = useMemo(() => {
    const hotelIdsInFiltered = new Set(filteredPlaces.filter(p => p.type === 'hotel').map(p => p.id));
    const extraHotels = allHotels.filter(h => !hotelIdsInFiltered.has(h.id));
    return [...filteredPlaces, ...extraHotels];
  }, [filteredPlaces, allHotels]);

  // Logic to only show toggles that have "extra" places (not in itinerary)
  const visibleToggleKeys = useMemo(() => {
    if (!activeCity) return []; // Hide all toggles if no city is selected

    const itineraryPlaceIdsForActiveCity = new Set<string>();
    itineraryData.forEach(day => {
      if (day.city === activeCity) {
        day.activities.forEach(activity => itineraryPlaceIdsForActiveCity.add(activity.placeId));
        if (day.hotelIds) day.hotelIds.forEach(id => itineraryPlaceIdsForActiveCity.add(id));
      }
    });

    const extraTypes = new Set<string>();
    Object.values(places).forEach(place => {
      const matchesCity = place.city === activeCity;
      const isExtra = !itineraryPlaceIdsForActiveCity.has(place.id);
      
      if (matchesCity && isExtra && place.type !== 'hotel' && place.type !== 'suggestion') {
        extraTypes.add(place.type);
      }
    });

    return Object.keys(toggles)
      .filter(key => extraTypes.has(key))
      .sort();
  }, [places, itineraryData, activeCity, toggles]);

  // Helper for mouse-wheel horizontal scrolling and drag-to-scroll
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      if (el.scrollWidth > el.clientWidth) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      el.classList.add('active');
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };

    const onMouseLeave = () => {
      isDown = false;
      el.classList.remove('active');
    };

    const onMouseUp = () => {
      isDown = false;
      el.classList.remove('active');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2; 
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('mousedown', onMouseDown);
    el.addEventListener('mouseleave', onMouseLeave);
    el.addEventListener('mouseup', onMouseUp);
    el.addEventListener('mousemove', onMouseMove);

    return () => {
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('mousedown', onMouseDown);
      el.removeEventListener('mouseleave', onMouseLeave);
      el.removeEventListener('mouseup', onMouseUp);
      el.removeEventListener('mousemove', onMouseMove);
    };
  }, [visibleToggleKeys]); // Re-attach when list changes

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleSetMapRef = useCallback((map: L.Map) => {
    setInternalMapRef(map);
    setMapRef(map);
  }, [setMapRef]);

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

  const handleLocateClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!mapInstance) return;

    if (userPosition) {
      mapInstance.flyTo(userPosition, 16, { duration: 1.5, easeLinearity: 0.25 });
    } else {
      setIsLocating(true);
      mapInstance.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    }
  }, [mapInstance, userPosition]);

  const getMarkerColor = (type: string) => theme.markerColors[type] || '#ffffff';

  if (!isAuthenticated) return <div className="h-full w-full bg-gray-900" />;

  const filtersLeftOffset = !isMobile && isSidebarOpen ? SIDEBAR_WIDTH + 16 : 16;
  const filtersMaxWidth = isMobile ? 'calc(100% - 32px)' : 'calc(100% - 140px)';

  return (
    <div className="h-full w-full relative">
      <LeafletMap center={[35.6895, 139.6917]} zoom={12} zoomControl={false} attributionControl={false} className="h-full w-full bg-gray-900">
        <VectorTileLayer />
        
        <MapController setMapRef={handleSetMapRef} filteredPlaces={filteredPlaces} setIsMapAnimating={setIsMapAnimating} />
        <CityZoomDetector />
        <PopupManager isMapAnimating={isMapAnimating} />
        <UserLocationMarker 
          isSidebarOpen={isSidebarOpen} 
          isMobile={isMobile} 
          onLocationUpdate={(pos) => { setUserPosition(pos); setIsLocating(false); }}
          onLocationError={() => setIsLocating(false)}
        />
        <PlaceMarkers places={displayPlaces} itineraryPlaceIds={itineraryPlaceIds} />
      </LeafletMap>

      {/* Filter Chips Container - Top Left */}
      <div 
        className="absolute top-4 z-[1000] overflow-hidden pointer-events-none transition-all duration-300"
        style={{ 
          left: `${filtersLeftOffset}px`,
          maxWidth: filtersMaxWidth
        }}
      >
        {visibleToggleKeys.length > 0 && (
          <div 
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing select-none pointer-events-auto"
          >
            {visibleToggleKeys.map((type) => {
              const isActive = toggles[type];
              const color = getMarkerColor(type);
              return (
                <button
                  key={type}
                  onClick={() => toggleCategory(type)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 text-[10px] font-black uppercase tracking-wider
                    ${isActive 
                      ? 'bg-black/70 text-white shadow-lg' 
                      : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  style={isActive ? { borderColor: `${color}80`, boxShadow: `0 0 10px ${color}33` } : {}}
                >
                  <CategoryIcon type={type} size={14} color={isActive ? color : '#9ca3af'} />
                  <span>{type.replace(/_/g, ' ')}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Map Controls Overlay - Desktop Top Right */}
      {!isMobile && (
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-3">
          <button 
            onClick={toggleFullscreen} 
            className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-gray-200 opacity-90 hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl transition-all duration-300"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>
      )}

      {/* Mobile Bottom-Right Stack / Desktop Bottom-Right */}
      <div 
        className={`absolute right-4 z-[1000] flex flex-col gap-3 transition-all duration-500
          ${isMobile 
            ? 'bottom-[100px]' 
            : (isFullscreen || !isSidebarOpen ? 'bottom-8' : 'bottom-8 md:bottom-8')
          }`}
      >
        {isMobile && (
          <button 
            onClick={toggleFullscreen} 
            className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-gray-200 opacity-90 hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl transition-all duration-300"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        )}
        <button 
          onClick={handleLocateClick} 
          className={`flex items-center justify-center w-14 h-14 rounded-xl border backdrop-blur-md transition-all duration-300 ${isLocating ? 'animate-pulse' : ''} ${userPosition ? 'bg-black/70 border-white/40 text-blue-400 opacity-100' : 'bg-black/40 border-white/10 text-gray-200 opacity-90'} hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl`} 
          title="Center on my location"
        >
          <Navigation size={24} className={userPosition ? 'fill-blue-400/20' : ''} />
        </button>
      </div>
    </div>
  );
};