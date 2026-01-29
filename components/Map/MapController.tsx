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
  const { activeCity, openDay, isSidebarOpen, isMobile, openPlaceId, places } = useAppStore();
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevActiveCity = useRef<CityName | null | undefined>(undefined);
  const prevOpenDay = useRef<string | null>(null);
  const prevIsSidebarOpen = useRef<boolean | undefined>(isSidebarOpen);
  const prevIsFullscreen = useRef<boolean>(false);
  const prevOpenPlaceId = useRef<string | null>(null);

  useEffect(() => {
    if (map) setMapRef(map);
  }, [map, setMapRef]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    // We need map to be ready. 
    // Note: filteredPlaces might be empty if no category is selected, but if a place is opened via search, 
    // we ensure its category is toggled on, so it should eventually appear in filteredPlaces.
    // However, for the 'flyTo' logic, we use 'places' directly, so we don't strictly need filteredPlaces > 0
    // for the place zoom to work, but the component usually guards against empty data.
    if (!map) return;

    const isCityChange = activeCity !== prevActiveCity.current;
    const isDayChange = openDay !== prevOpenDay.current;
    const isSidebarToggle = isSidebarOpen !== prevIsSidebarOpen.current;
    const isFullscreenChange = isFullscreen !== prevIsFullscreen.current;
    const isInitialLoad = prevActiveCity.current === undefined;
    const isPlaceChange = openPlaceId !== prevOpenPlaceId.current;

    // 1. Handle zooming to a specific place (Search Result or Click)
    if (isPlaceChange && openPlaceId) {
        const place = places[openPlaceId];
        if (place) {
            setIsMapAnimating(true);
            
            // Offset logic for mobile/desktop if needed, but centering (flyTo) is usually sufficient.
            // If we wanted to account for the sidebar, we'd use setView or project/unproject, 
            // but Leaflet's flyTo centers the point. 
            // Given the popup offset logic in AppContext, centering the marker is usually correct behavior.
            map.flyTo([place.coordinates.lat, place.coordinates.lon], 16, {
                duration: 1.5,
                easeLinearity: 0.25
            });

            const handleMoveEnd = () => {
                setIsMapAnimating(false);
                map.off('moveend', handleMoveEnd);
            };
            map.on('moveend', handleMoveEnd);
        }
    } 
    // 2. Handle City/Day/View changes (Fit Bounds)
    // Only if we didn't just zoom to a place (or if place is null)
    else if ((isCityChange || isDayChange || isFullscreenChange || isInitialLoad) && filteredPlaces.length > 0) {
      
      // Close popups on major view changes
      map.closePopup();

      const markers = filteredPlaces.map(place => L.marker([place.coordinates.lat, place.coordinates.lon]));
      const group = L.featureGroup(markers);
      const bounds = group.getBounds();

      let fitBoundsOptions: L.FitBoundsOptions = { maxZoom: 15, animate: true };
      
      if (isFullscreen) {
        fitBoundsOptions.paddingTopLeft = [0, 0];
        fitBoundsOptions.paddingBottomRight = [0, 0];
      } else if (!isMobile) {
        fitBoundsOptions.paddingTopLeft = [40, 40];
        fitBoundsOptions.paddingBottomRight = [40, 250]; 
      } else {
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
    prevOpenPlaceId.current = openPlaceId;
  }, [map, activeCity, openDay, isSidebarOpen, isFullscreen, isMobile, filteredPlaces, setIsMapAnimating, openPlaceId, places]);

  return null;
};

export default MapController;
