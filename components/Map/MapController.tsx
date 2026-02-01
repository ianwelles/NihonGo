import React, { useEffect, useRef, Dispatch, SetStateAction, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { CityName, Place } from '../../types';
import { useAppStore } from '../../context/AppContext';

interface MapControllerProps {
  setMapRef: (map: L.Map) => void;
  filteredPlaces: Place[];
  setIsMapAnimating: Dispatch<SetStateAction<boolean>>;
  locateUserTrigger: number;
  userPosition: L.LatLng | null;
}

const MapController: React.FC<MapControllerProps> = ({ setMapRef, filteredPlaces, setIsMapAnimating, locateUserTrigger, userPosition }) => {
  const { activeCity, openDay, isSidebarOpen, isMobile, openPlaceId, places } = useAppStore();
  const map = useMap();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prevActiveCity = useRef<CityName | null | undefined>(undefined);
  const prevOpenDay = useRef<string | null>(null);
  const prevIsSidebarOpen = useRef<boolean | undefined>(isSidebarOpen);
  const prevIsFullscreen = useRef<boolean>(false);
  const prevOpenPlaceId = useRef<string | null>(null);
  const prevLocateUserTrigger = useRef<number>(locateUserTrigger);

  useEffect(() => {
    if (map) setMapRef(map);
  }, [map, setMapRef]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!map) return;

    const isCityChange = activeCity !== prevActiveCity.current;
    const isDayChange = openDay !== prevOpenDay.current;
    const isFullscreenChange = isFullscreen !== prevIsFullscreen.current;
    const isInitialLoad = prevActiveCity.current === undefined;
    const isPlaceChange = openPlaceId !== prevOpenPlaceId.current;
    const isLocateUser = locateUserTrigger !== prevLocateUserTrigger.current;

    // We only stop the map if we are actively about to move it.
    
    if (isLocateUser && userPosition) {
      map.stop();
      setIsMapAnimating(true);
      map.flyTo(userPosition, 16, { duration: 1.5, easeLinearity: 0.25 });
      const handleMoveEnd = () => {
        setIsMapAnimating(false);
        map.off('moveend', handleMoveEnd);
      };
      map.on('moveend', handleMoveEnd);
    }
    else if (isPlaceChange && openPlaceId) {
        const place = places[openPlaceId];
        if (place) {
            const targetLatLng = L.latLng(place.coordinates.lat, place.coordinates.lon);
            const currentBounds = map.getBounds();
            const currentZoom = map.getZoom();

            // Check if place is visible AND we are at a decent zoom level.
            // If we are zoomed out (e.g. overview mode), we want to fly in.
            const isZoomedInEnough = currentZoom >= 13;
            const isPlaceAlreadyVisible = currentBounds.contains(targetLatLng); 

            if (!isPlaceAlreadyVisible || !isZoomedInEnough) {
                map.stop();
                setIsMapAnimating(true);
                
                // If we need to zoom in, use flyTo with a target zoom
                const targetZoom = Math.max(currentZoom, 15);
                
                map.flyTo([place.coordinates.lat, place.coordinates.lon], targetZoom, {
                    duration: 1.5,
                    easeLinearity: 0.25
                });

                const handleMoveEnd = () => {
                    setIsMapAnimating(false);
                    map.off('moveend', handleMoveEnd);
                };
                map.on('moveend', handleMoveEnd);
            } else {
                // If visible and zoomed in, no map animation needed.
                setIsMapAnimating(false); 
            }
        }
    } 
    else if ((isCityChange || isDayChange || isFullscreenChange || isInitialLoad) && filteredPlaces.length > 0) {
      
      // GUARD: If the city changed because the user selected a place (implied by openPlaceId being set
      // and matching the new city), and we are already looking at that place, DO NOT zoom out to the full city view.
      // This prevents the "Reset" bug where CityZoomDetector updates the activeCity and MapController undoes the user's zoom.
      const isImpliedCityChange = isCityChange && openPlaceId && places[openPlaceId]?.city === activeCity;
      
      if (!isImpliedCityChange) {
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

        map.stop();
        setIsMapAnimating(true); 
        const handleMoveEnd = () => {
          setIsMapAnimating(false); 
          map.off('moveend', handleMoveEnd);
        };
        map.on('moveend', handleMoveEnd);

        if (isInitialLoad || (activeCity === null && openDay === null)) {
          map.fitBounds(bounds, { ...fitBoundsOptions, maxZoom: 7, duration: 1.5 });
        }
        else {
          map.flyToBounds(bounds, { ...fitBoundsOptions, duration: 1.2, easeLinearity: 0.25 });
        }
      }
    }

    prevActiveCity.current = activeCity;
    prevOpenDay.current = openDay;
    prevIsSidebarOpen.current = isSidebarOpen;
    prevIsFullscreen.current = isFullscreen;
    prevOpenPlaceId.current = openPlaceId;
    prevLocateUserTrigger.current = locateUserTrigger;
  }, [map, activeCity, openDay, isSidebarOpen, isFullscreen, isMobile, filteredPlaces, setIsMapAnimating, openPlaceId, places, locateUserTrigger, userPosition]);

  return null;
};

export default MapController;