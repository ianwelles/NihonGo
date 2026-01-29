import React, { useMemo } from 'react';
import { useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { CityName, Place } from '../../types';
import { useAppStore } from '../../context/AppContext';

// This component detects when the user moves the map and automatically 
// updates the active city based on the visible area.
export const CityZoomDetector: React.FC = () => {
  const { activeCity, setActiveCity, places } = useAppStore();

  // Pre-calculate city centers and bounds
  const cityRegions = useMemo(() => {
    const regions: Record<string, { center: L.LatLng, bounds: L.LatLngBounds }> = {};
    
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
        // Store the actual bounds of the city's places
        bounds: bounds
      };
    });

    return regions;
  }, [places]);

  const map = useMapEvents({
    moveend: () => {
      const currentZoom = map.getZoom();
      const currentCenter = map.getCenter();

      // Only trigger auto-city-switching if we are zoomed in enough
      // Increased from 9 to 11 to be more deliberate
      if (currentZoom >= 11) {
        let detectedCity: CityName | null = null;

        // Check if we are inside the bounds of any city (with a small padding)
        Object.entries(cityRegions).forEach(([cityName, region]) => {
          // Add 20% padding to the bounds to be a bit more inclusive
          const paddedBounds = region.bounds.pad(0.2);
          
          if (paddedBounds.contains(currentCenter)) {
            detectedCity = cityName as CityName;
          }
        });

        // If we found a city and it's different from the active one, switch.
        // If we are currently in an active city but the center is NO LONGER 
        // in any city bounds (and we are zoomed in), we stay with the active one 
        // to avoid "flickering" to null while browsing the outskirts.
        if (detectedCity && detectedCity !== activeCity) {
          // Optional: Only switch if the distance to the new city center is 
          // significantly closer than the distance to the current city center.
          if (activeCity) {
            const currentCityRegion = cityRegions[activeCity];
            if (currentCityRegion) {
              const distToNew = currentCenter.distanceTo(cityRegions[detectedCity].center);
              const distToCurrent = currentCenter.distanceTo(currentCityRegion.center);
              
              // Only switch if we are clearly closer to the new city
              if (distToNew < distToCurrent * 0.8) {
                setActiveCity(detectedCity);
              }
            } else {
              setActiveCity(detectedCity);
            }
          } else {
            setActiveCity(detectedCity);
          }
        }
      } else if (currentZoom < 8 && activeCity !== null) {
        // If they zoom out far enough, clear the active city
        setActiveCity(null);
      }
    },
  });

  return null;
};
