import React, { useEffect, useRef, Dispatch, SetStateAction, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { CityName, Place } from '../../types';
import { useAppStore } from '../../context/AppContext';
import { SIDEBAR_WIDTH } from './mapConstants';

interface MapControllerProps {
  setMapRef: (map: L.Map) => void;
  filteredPlaces: Place[];
  setIsMapAnimating: Dispatch<SetStateAction<boolean>>;
}

const MapController: React.FC<MapControllerProps> = ({ setMapRef, filteredPlaces, setIsMapAnimating }) => {
  const { activeCity, openDay, isSidebarOpen, isMobile } = useAppStore();
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevActiveCity = useRef<CityName | null | undefined>(undefined);
  const prevOpenDay = useRef<string | null>(null);
  const prevIsSidebarOpen = useRef<boolean | undefined>(isSidebarOpen);
  const prevIsFullscreen = useRef<boolean>(false);

  useEffect(() => {
    if (map) setMapRef(map);
  }, [map, setMapRef]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!map || filteredPlaces.length === 0) return;

    const isCityChange = activeCity !== prevActiveCity.current;
    const isDayChange = openDay !== prevOpenDay.current;
    const isSidebarToggle = isSidebarOpen !== prevIsSidebarOpen.current;
    const isFullscreenChange = isFullscreen !== prevIsFullscreen.current;
    const isInitialLoad = prevActiveCity.current === undefined;

    if (isCityChange || isDayChange || isSidebarToggle || isFullscreenChange || isInitialLoad) {
      const markers = filteredPlaces.map(place => L.marker([place.coordinates.lat, place.coordinates.lon]));
      const group = L.featureGroup(markers);

      let fitBoundsOptions: L.FitBoundsOptions = { maxZoom: 15, animate: true };
      
      if (isFullscreen) {
        fitBoundsOptions.paddingTopLeft = [0, 0];
        fitBoundsOptions.paddingBottomRight = [0, 0];
      } else if (!isMobile) {
        // Desktop
        if (isSidebarOpen) {
          fitBoundsOptions.paddingTopLeft = [SIDEBAR_WIDTH, 0];
          fitBoundsOptions.paddingBottomRight = [40, 40]; // Base padding for visibility
        } else {
          fitBoundsOptions.paddingTopLeft = [40, 40];
          fitBoundsOptions.paddingBottomRight = [40, 250]; // Account for City Selector
        }
      } else {
        // Mobile
        fitBoundsOptions.paddingTopLeft = [20, 20];
        fitBoundsOptions.paddingBottomRight = [20, 250]; // Account for City Selector
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
      else if (isCityChange || isDayChange || isFullscreenChange) {
        map.flyToBounds(group.getBounds(), { ...fitBoundsOptions, duration: 1.2, easeLinearity: 0.25 });
      } else if (isSidebarToggle) {
        map.fitBounds(group.getBounds(), { ...fitBoundsOptions, duration: 0.6 });
      }
    }

    prevActiveCity.current = activeCity;
    prevOpenDay.current = openDay;
    prevIsSidebarOpen.current = isSidebarOpen;
    prevIsFullscreen.current = isFullscreen;
  }, [map, activeCity, openDay, isSidebarOpen, isFullscreen, isMobile, filteredPlaces, setIsMapAnimating]);

  return null;
};

export default MapController;