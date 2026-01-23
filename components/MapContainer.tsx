import React, { useMemo, useState, useRef, useEffect, useCallback } from 'react';
import { MapContainer as LeafletMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '../context/AppContext';
import { Landmark, Utensils, Wine, Store, Info, Navigation, Maximize, Minimize } from 'lucide-react';
import { SIDEBAR_WIDTH } from './Map/mapConstants';
import L from 'leaflet';

import VectorTileLayer from './Map/VectorTileLayer';
import MapController from './Map/MapController';
import PopupManager from './Map/PopupManager';
import UserLocation from './Map/controls/UserLocation';
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
  const [userHeading, setUserHeading] = useState<number | null>(null);
  const [mapInstance, setInternalMapRef] = useState<L.Map | null>(null);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const locationWatcher = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- REFACTORED LOCATION LOGIC ---

  // Effect for device orientation (compass heading)
  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // @ts-ignore
      let compass = e.webkitCompassHeading || e.alpha;
      if (compass !== null && compass !== undefined) {
        setUserHeading(compass);
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

  // Function to stop any active location watching
  const stopWatchingLocation = useCallback(() => {
    if (locationWatcher.current !== null) {
      navigator.geolocation.clearWatch(locationWatcher.current);
      locationWatcher.current = null;
    }
    setIsLocating(false);
  }, []);

  // Initial location fix on mount
  useEffect(() => {
    if (isAuthenticated) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition(new L.LatLng(latitude, longitude));
        },
        () => {
          // Handle error silently on initial load
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
      );
    }
  }, [isAuthenticated]);

  const handleLocateClick = useCallback(() => {
    if (!mapInstance) return;

    // If we are already locating, stop it.
    if (isLocating) {
      stopWatchingLocation();
      return;
    }

    setIsLocating(true);

    // First, try a quick, high-accuracy fix and fly to it.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos = new L.LatLng(latitude, longitude);
        setUserPosition(newPos);
        mapInstance.flyTo(newPos, 16, { duration: 1.5, easeLinearity: 0.25 });

        // Once centered, downgrade to a watcher for orientation updates, etc.
        // Stop any previous watcher first.
        stopWatchingLocation(); 
        
        locationWatcher.current = navigator.geolocation.watchPosition(
          (pos) => {
            setUserPosition(new L.LatLng(pos.coords.latitude, pos.coords.longitude));
          },
          () => { // On error, stop watching
            stopWatchingLocation();
          },
          { enableHighAccuracy: true }
        );
        
        // Set a timeout to automatically stop watching after a while to save battery
        setTimeout(() => {
            stopWatchingLocation();
        }, 30000); // Stop after 30 seconds of active watching

      },
      (error) => {
        console.error(`Geolocation error: ${error.message}`);
        setIsLocating(false); // Stop loading animation on error
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, [mapInstance, isLocating, stopWatchingLocation]);

  // --- END OF REFACTORED LOGIC ---

  const itineraryPlaceIds = useMemo(() => {
    const ids = new Set<string>();
    itineraryData.forEach(day => {
      day.activities.forEach(activity => ids.add(activity.placeId));
      if (day.hotelId) ids.add(day.hotelId);
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
        if (dayItinerary.hotelId) placeIdsForDay.add(dayItinerary.hotelId);
        
        const itineraryPlaces = Array.from(placeIdsForDay).map(id => places[id]).filter(Boolean);

        const toggledCityPlaces = Object.values(places).filter(place => {
          const matchesCity = place.city === activeCity;
          const isAnyItineraryPlace = itineraryPlaceIds.has(place.id);
          const matchesToggle = toggles[place.type] || place.type === 'suggestion' || place.type === 'hotel';

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
          if (day.hotelId) itineraryPlaceIdsInActiveCity.add(day.hotelId);
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

  const displayPlaces = useMemo(() => {
    const hotelIdsInFiltered = new Set(filteredPlaces.filter(p => p.type === 'hotel').map(p => p.id));
    const extraHotels = allHotels.filter(h => !hotelIdsInFiltered.has(h.id));
    return [...filteredPlaces, ...extraHotels];
  }, [filteredPlaces, allHotels]);

  const visibleToggleKeys = useMemo(() => {
    if (!activeCity) return [];

    const itineraryPlaceIdsForActiveCity = new Set<string>();
    itineraryData.forEach(day => {
      if (day.city === activeCity) {
        day.activities.forEach(activity => itineraryPlaceIdsForActiveCity.add(activity.placeId));
        if (day.hotelId) itineraryPlaceIdsForActiveCity.add(day.hotelId);
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
  }, [visibleToggleKeys]);

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
  
  const getMarkerColor = (type: string) => theme.markerColors[type] || '#ffffff';

  // Use ResizeObserver to automatically invalidate map size when the container resizes (e.g. sidebar toggle)
  useEffect(() => {
    if (!mapInstance || !containerRef.current) return;

    let timeout: NodeJS.Timeout;
    const observer = new ResizeObserver(() => {
      // Debounce the invalidation to avoid too many redraws during the animation,
      // but keep it frequent enough to reduce white-space flashes.
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        mapInstance.invalidateSize({ pan: true });
      }, 50);
    });

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, [mapInstance]);

  if (!isAuthenticated) return <div className="h-full w-full bg-gray-900" />;

  const filtersLeftOffset = isMobile ? 0 : 16;
  const filtersMaxWidth = isMobile ? '100%' : 'calc(100% - 140px)';

  return (
    <div ref={containerRef} className="h-full w-full relative overflow-hidden">
      <LeafletMap center={[35.6895, 139.6917]} zoom={12} zoomControl={false} attributionControl={false} className="h-full w-full bg-gray-900">
        <VectorTileLayer />
        
        <MapController setMapRef={handleSetMapRef} filteredPlaces={filteredPlaces} setIsMapAnimating={setIsMapAnimating} />
        <CityZoomDetector />
        <PopupManager isMapAnimating={isMapAnimating} />
        <UserLocation position={userPosition} heading={userHeading} />
        <PlaceMarkers places={displayPlaces} itineraryPlaceIds={itineraryPlaceIds} />
      </LeafletMap>

      {/* Filter Chips Container - Top Left */}
      <div 
        className="absolute top-4 z-[1000] overflow-hidden pointer-events-none transition-all duration-300"
        style={{ 
          left: `${filtersLeftOffset}px`,
          maxWidth: filtersMaxWidth,
          width: isMobile ? '100vw' : 'auto'
        }}
      >
        {visibleToggleKeys.length > 0 && (
          <div 
            ref={scrollContainerRef}
            className={`flex gap-2 overflow-x-auto no-scrollbar py-2 cursor-grab active:cursor-grabbing select-none pointer-events-auto ${isMobile ? 'px-4' : ''}`}
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

      {/* Bottom-Right Stack (Mobile & Desktop) */}
      <div className="absolute right-4 bottom-32 z-[1000] flex flex-col gap-3 transition-all duration-500">
        <button 
          onClick={toggleFullscreen} 
          className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-gray-200 opacity-90 hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl transition-all duration-300"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
        </button>
        <button 
          onClick={handleLocateClick} 
          className={`flex items-center justify-center w-12 h-12 rounded-xl border backdrop-blur-md transition-all duration-300 ${isLocating ? 'animate-pulse' : ''} ${userPosition ? 'bg-black/70 border-white/40 text-blue-400 opacity-100' : 'bg-black/40 border-white/10 text-gray-200 opacity-90'} hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl`} 
          title="Center on my location"
        >
          <Navigation size={24} className={userPosition ? 'fill-blue-400/20' : ''} />
        </button>
      </div>
    </div>
  );
};