import React, { useMemo, useState } from 'react';
import { MapContainer as LeafletMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppStore } from '../context/AppContext';

import VectorTileLayer from './Map/VectorTileLayer';
import MapController from './Map/MapController';
import PopupManager from './Map/PopupManager';
import UserLocationMarker from './Map/controls/UserLocation';
import PlaceMarkers from './Map/PlaceMarkers';

export const MapContainer: React.FC<{ setMapRef: (map: L.Map) => void, isAuthenticated: boolean }> = ({ setMapRef, isAuthenticated }) => {
  const { activeCity, openDay, places, itineraryData, toggles, isSidebarOpen, isMobile } = useAppStore();
  const [isMapAnimating, setIsMapAnimating] = useState(false);

  const itineraryPlaceIds = useMemo(() => {
    const ids = new Set<string>();
    itineraryData.forEach(day => {
      day.activities.forEach(activity => ids.add(activity.placeId));
      if (day.hotelIds) day.hotelIds.forEach(id => ids.add(id));
    });
    return ids;
  }, [itineraryData]);

  const filteredPlaces = useMemo(() => {
    if (!activeCity && !openDay) {
      return Object.values(places).filter(place => place.type === 'hotel');
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
  }, [activeCity, openDay, places, itineraryData, toggles, itineraryPlaceIds]);


  if (!isAuthenticated) return <div className="h-full w-full bg-gray-900" />;

  return (
    <div className="h-full w-full relative">
      <LeafletMap center={[35.6895, 139.6917]} zoom={12} zoomControl={false} attributionControl={false} className="h-full w-full bg-gray-900">
        <VectorTileLayer />
        
        <MapController setMapRef={setMapRef} filteredPlaces={filteredPlaces} setIsMapAnimating={setIsMapAnimating} />
        <PopupManager isMapAnimating={isMapAnimating} />
        <UserLocationMarker isSidebarOpen={isSidebarOpen} isMobile={isMobile} />
        <PlaceMarkers places={filteredPlaces} itineraryPlaceIds={itineraryPlaceIds} />
      </LeafletMap>
    </div>
  );
};