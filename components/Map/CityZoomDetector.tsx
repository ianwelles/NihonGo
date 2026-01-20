import React, { useMemo, useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { CityName, Place } from '../../types';
import { useAppStore } from '../../context/AppContext';

// This component detects when the user zooms in or out and manually changes their view.
// If they are zoomed into a specific city's area, we want to set that city as active.
export const CityZoomDetector: React.FC = () => {
  const { activeCity, setActiveCity, places } = useAppStore();

  // Pre-calculate city centers and rough bounds
  const cityRegions = useMemo(() => {
    const regions: Record<string, { center: L.LatLng, radius: number }> = {};
    
    // Group places by city
    const cityPlaces: Record<string, Place[]> = {};
    Object.values(places).forEach(place => {
      if (!cityPlaces[place.city]) cityPlaces[place.city] = [];
      cityPlaces[place.city].push(place);
    });

    Object.entries(cityPlaces).forEach(([cityName, places]) => {
      const coords = places.map(p => L.latLng(p.coordinates.lat, p.coordinates.lon));
      const bounds = L.latLngBounds(coords);
      regions[cityName] = {
        center: bounds.getCenter(),
        // Radius in degrees (very rough) to determine if we are "in" the city
        radius: Math.max(
          bounds.getNorth() - bounds.getSouth(),
          bounds.getEast() - bounds.getWest()
        ) * 1.5 
      };
    });

    return regions;
  }, [places]);

  const map = useMapEvents({
    moveend: () => {
      const currentZoom = map.getZoom();
      const currentCenter = map.getCenter();

      // Only trigger auto-city-switching if we are zoomed in enough
      // to reasonably be looking at a specific city (e.g., zoom > 9)
      if (currentZoom > 9) {
        let closestCity: CityName | null = null;
        let minDistance = Infinity;

        Object.entries(cityRegions).forEach(([cityName, region]) => {
          const distance = currentCenter.distanceTo(region.center);
          // distanceTo returns meters. 50km is a reasonable "city area"
          if (distance < 50000 && distance < minDistance) {
            minDistance = distance;
            closestCity = cityName as CityName;
          }
        });

        if (closestCity && closestCity !== activeCity) {
          setActiveCity(closestCity);
        }
      } else if (currentZoom < 7 && activeCity !== null) {
        // If they zoom out very far, clear the active city
        setActiveCity(null);
      }
    },
  });

  return null;
};
