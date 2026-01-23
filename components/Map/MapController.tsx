import React, { useEffect, useRef, Dispatch, SetStateAction, useState } from 'react';
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

    // Refactored to remove isSidebarToggle from the auto-fit trigger.
    // The CSS Grid layout handles the shift, and the ResizeObserver in MapContainer
    // handles the size invalidation. This prevents jittery double-animations.
    if (isCityChange || isDayChange || isFullscreenChange || isInitialLoad) {
      const markers = filteredPlaces.map(place => L.marker([place.coordinates.lat, place.coordinates.lon]));
      const group = L.featureGroup(markers);
      const bounds = group.getBounds();

      let fitBoundsOptions: L.FitBoundsOptions = { maxZoom: 15, animate: true };
      
      if (isFullscreen) {
        fitBoundsOptions.paddingTopLeft = [0, 0];
        fitBoundsOptions.paddingBottomRight = [0, 0];
      } else if (!isMobile) {
        // Desktop - Map container is already offset by the sidebar via CSS Grid,
        // so we don't need to add the SIDEBAR_WIDTH to the padding anymore.
        fitBoundsOptions.paddingTopLeft = [40, 40];
        fitBoundsOptions.paddingBottomRight = [40, 250]; // Account for City Selector / Bottom controls
      } else {
        // Mobile - Sidebar remains an overlay
        fitBoundsOptions.paddingTopLeft = [20, 90];
        fitBoundsOptions.paddingBottomRight = [20, 300];
      }

      setIsMapAnimating(true); 
      const handleMoveEnd = () => {
        setIsMapAnimating(false); 
        map.off('moveend', handleMoveEnd);
      };
      map.on('moveend', handleMoveEnd);

      map.stop();
      if (isInitialLoad || (activeCity === null && openDay === null)) {
        map.fitBounds(bounds, { ...fitBoundsOptions, maxZoom: 7, duration: 1.5 });
      }
      else {
        map.flyToBounds(bounds, { ...fitBoundsOptions, duration: 1.2, easeLinearity: 0.25 });
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