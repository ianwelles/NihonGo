import React, { useEffect, useMemo, useRef } from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { places, mapMarkerColors, itineraryData } from '../data';
import { CityName, Place } from '../types';

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
  shopping: boolean;
}

interface MapProps {
  activeCity: CityName | null;
  openDay: string | null;
  isAuthenticated: boolean;
  toggles: Toggles;
  setMapRef: (map: L.Map) => void;
  isSidebarOpen?: boolean;
}

const getIcon = (type: string) => {
  const color = mapMarkerColors[type] || mapMarkerColors['default'] || '#3B82F6';
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

const MapController: React.FC<{
  activeCity: CityName | null;
  openDay: string | null;
  isSidebarOpen?: boolean;
  setMapRef: (map: L.Map) => void;
  filteredPlaces: Place[];
}> = ({ activeCity, openDay, isSidebarOpen, setMapRef, filteredPlaces }) => {
  const map = useMap();
  const prevActiveCity = useRef<CityName | null | undefined>(undefined);
  const prevOpenDay = useRef<string | null>(null);
  const prevIsSidebarOpen = useRef<boolean | undefined>(isSidebarOpen);

  useEffect(() => {
    if (map) {
      setMapRef(map);
    }
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
      const sidebarWidth = 320;

      let fitBoundsOptions: L.FitBoundsOptions = {
        paddingTopLeft: [50, 50],
        paddingBottomRight: [50, 50],
        maxZoom: 15,
        animate: true
      };

      if (!isMobileView && isSidebarOpen) {
        fitBoundsOptions.paddingTopLeft = [sidebarWidth + 20, 50];
      }

      map.stop();

      if (isInitialLoad || (activeCity === null && openDay === null)) {
        map.fitBounds(group.getBounds(), {
          paddingTopLeft: !isMobileView && isSidebarOpen ? [sidebarWidth + 20, 50] : [50, 50],
          paddingBottomRight: [50, 50],
          maxZoom: 7,
          animate: true,
          duration: 1.5
        });
      } else if (isCityChange || isDayChange) {
        map.flyToBounds(group.getBounds(), {
          ...fitBoundsOptions,
          duration: 1.2,
          easeLinearity: 0.25
        });
      } else {
        map.fitBounds(group.getBounds(), {
          ...fitBoundsOptions,
          duration: 0.6
        });
      }
    }

    prevActiveCity.current = activeCity;
    prevOpenDay.current = openDay;
    prevIsSidebarOpen.current = isSidebarOpen;
  }, [map, activeCity, openDay, isSidebarOpen, filteredPlaces]);

  return null;
};

export const MapContainer: React.FC<MapProps> = ({
  activeCity,
  openDay,
  isAuthenticated,
  toggles,
  setMapRef,
  isSidebarOpen
}) => {
  const filteredPlaces = useMemo(() => {
    const allPlaces = Object.values(places);
    
    // 1. Identify context (Current City and Open Day items)
    const scheduledPlaceIds = new Set<string>();
    let currentCity: CityName | null = activeCity;

    if (openDay !== null) {
      const dayNum = parseInt(openDay.replace('day', ''));
      const dayItinerary = itineraryData.find(d => d.dayNumber === dayNum);
      if (dayItinerary) {
        currentCity = dayItinerary.city;
        dayItinerary.activities.forEach(act => scheduledPlaceIds.add(act.placeId));
        if (dayItinerary.hotelId) scheduledPlaceIds.add(dayItinerary.hotelId);
      }
    }

    return allPlaces.filter(place => {
      const isRecommendation = ['sight_rec', 'food_rec', 'shopping'].includes(place.type);
      
      // Filter by category toggles
      if (place.type === 'sight_rec' && !toggles.sight_rec) return false;
      if (place.type === 'food_rec' && !toggles.food_rec) return false;
      if (place.type === 'shopping' && !toggles.shopping) return false;

      // If we are in a specific city (either selected or inferred from open day)
      if (currentCity) {
        // If it's a different city, hide it
        if (place.city !== currentCity) return false;

        // If a specific day is open
        if (openDay !== null) {
          // Show scheduled items for that day
          if (scheduledPlaceIds.has(place.id)) return true;
          // Show recommendations in this city
          return isRecommendation;
        }

        // If no day is open, but a city is, show everything in this city (passed toggles)
        return true;
      }

      // Default (Overview Mode): Only show hotels
      return place.type === 'hotel';
    });
  }, [activeCity, openDay, toggles]);

  if (!isAuthenticated) return <div className="h-full w-full bg-gray-900" />;

  return (
    <div className="h-full w-full relative">
      <LeafletMap
        center={[35.6895, 139.6917]}
        zoom={12}
        zoomControl={false}
        attributionControl={false}
        className="h-full w-full bg-gray-900"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={19}
        />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
          zIndex={650}
        />
        <MapController
          activeCity={activeCity}
          openDay={openDay}
          isSidebarOpen={isSidebarOpen}
          setMapRef={setMapRef}
          filteredPlaces={filteredPlaces}
        />
        {filteredPlaces.map((place) => {
          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.coordinates.lat},${place.coordinates.lon}&travelmode=transit`;
          return (
            <Marker
              key={place.id}
              position={[place.coordinates.lat, place.coordinates.lon]}
              icon={getIcon(place.type)}
            >
              <Popup>
                <div className="text-left min-w-[200px]">
                  <span className={`${place.type.includes('_rec') ? 'text-[#00BCD4]' : 'text-sub-text'} font-extrabold text-xs uppercase tracking-wide mb-1 block`}>
                    {place.type.replace(/_/g, ' ')}
                  </span>
                  {place.url ? (
                    <a href={place.url} target="_blank" rel="noopener noreferrer" className="text-xl font-bold !text-white mb-1 leading-tight inline-block border-b border-white/30 hover:!text-white hover:border-transparent transition-colors duration-200">
                      {place.name}
                    </a>
                  ) : (
                    <span className="text-xl font-bold text-primary mb-1 leading-tight block">{place.name}</span>
                  )}
                  <span className="text-gray-300 text-sm leading-relaxed mb-4 block">{place.description}</span>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-[#8ab4f8] text-[#202124] px-4 py-2 rounded-full text-sm font-bold hover:bg-[#aecbfa] transition-colors shadow-md no-underline border-none"
                  >
                    📍Get Directions
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </LeafletMap>
    </div>
  );
};
