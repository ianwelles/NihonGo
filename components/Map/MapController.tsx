import React, { useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { CityName, Place } from '../../types';
import { useAppStore } from '../../context/AppContext';

interface MapControllerProps {
  setMapRef: (map: L.Map) => void;
  filteredPlaces: Place[];
  setIsMapAnimating: Dispatch<SetStateAction<boolean>>;
}

const MapController: React.FC<MapControllerProps> = ({ setMapRef, filteredPlaces, setIsMapAnimating }) => {
  const { activeCity, openDay, isSidebarOpen } = useAppStore();
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

      let fitBoundsOptions: L.FitBoundsOptions = { maxZoom: 15, animate: true };
      if (isMobileView) {
        fitBoundsOptions.paddingTopLeft = [20, 70];
        fitBoundsOptions.paddingBottomRight = [20, 200];
      } else {
        const sidebarWidth = 384; 
        let leftPadding = 60; 

        if (isSidebarOpen) {
          leftPadding = sidebarWidth + 60;
        }
        fitBoundsOptions.paddingTopLeft = [leftPadding, 80];
        fitBoundsOptions.paddingBottomRight = [100, 160];
      }

      setIsMapAnimating(true); 
      const handleMoveEnd = () => {
        setIsMapAnimating(false); 
        map.off('moveend', handleMoveEnd);
      };
      map.on('moveend', handleMoveEnd);

      map.stop();
      if (isInitialLoad || (activeCity === null && openDay === null)) {
        map.fitBounds(group.getBounds(), { ...fitBoundsOptions, maxZoom: 7, duration: 1.5 });
      }
      else if (isCityChange || isDayChange) {
        map.flyToBounds(group.getBounds(), { ...fitBoundsOptions, duration: 1.2, easeLinearity: 0.25 });
      } else if (isSidebarToggle) {
        map.fitBounds(group.getBounds(), { ...fitBoundsOptions, duration: 0.6 });
      }
    }

    prevActiveCity.current = activeCity;
    prevOpenDay.current = openDay;
    prevIsSidebarOpen.current = isSidebarOpen;
  }, [map, activeCity, openDay, isSidebarOpen, filteredPlaces, setIsMapAnimating]);

  return null;
};

export default MapController;