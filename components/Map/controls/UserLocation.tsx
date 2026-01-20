import React, { useEffect, useState, useRef, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import MapControls from './MapControls';
import { getUserIcon } from '../mapConstants';
import { useAppStore } from '../../../context/AppContext';

const UserLocationMarker: React.FC<{ isSidebarOpen?: boolean; isMobile?: boolean }> = ({ isSidebarOpen, isMobile }) => {
  const map = useMap();
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [heading, setHeading] = useState<number | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const controlRef = useRef<L.Control | null>(null);
  const controlDivRef = useRef<HTMLDivElement | null>(null);
  const reactRootRef = useRef<any>(null); 

  const { popupPaddingTopLeft, popupPaddingBottomRight } = useAppStore();

  useEffect(() => {
    const handlePopupOpen = () => setIsPopupOpen(true);
    const handlePopupClose = () => setIsPopupOpen(false);
    map.on('popupopen', handlePopupOpen);
    map.on('popupclose', handlePopupClose);
    return () => {
      map.off('popupopen', handlePopupOpen);
      map.off('popupclose', handlePopupClose);
    };
  }, [map]);

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleOrientation = (e: DeviceOrientationEvent) => {
      // @ts-ignore
      let compass = e.webkitCompassHeading || e.alpha;
      if (compass !== null && compass !== undefined) {
        setHeading(compass);
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

  useEffect(() => {
    map.locate({ watch: true, enableHighAccuracy: true });
    const onLocationFound = (e: L.LocationEvent) => {
      setPosition(e.latlng);
      setIsLocating(false);
    };
    const onLocationError = (e: L.ErrorEvent) => {
      console.warn("Geolocation error:", e.message);
      setIsLocating(false);
    };
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);
    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationError);
      map.stopLocate();
    };
  }, [map]);

  const handleLocateClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (position) {
      map.flyTo(position, 16, { duration: 1.5, easeLinearity: 0.25 });
    } else {
      setIsLocating(true);
      map.locate({ setView: true, maxZoom: 16, enableHighAccuracy: true });
    }
  }, [map, position]);

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

  useEffect(() => {
    if (!map) return;

    if (!controlRef.current) {
      const CustomControl = L.Control.extend({
        onAdd: function(map: L.Map) {
          controlDivRef.current = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
          controlDivRef.current.style.backgroundColor = 'transparent';
          controlDivRef.current.style.backgroundImage = 'none';
          controlDivRef.current.style.width = 'auto';
          controlDivRef.current.style.height = 'auto';
          controlDivRef.current.style.border = 'none';
          controlDivRef.current.style.boxShadow = 'none';
          controlDivRef.current.style.opacity = '1';
          reactRootRef.current = createRoot(controlDivRef.current);
          return controlDivRef.current;
        },
        onRemove: function(map: L.Map) {
        },
      });
      controlRef.current = new CustomControl({ position: 'topright' });
      map.addControl(controlRef.current);
    }

    if (reactRootRef.current) {
      reactRootRef.current.render(
        <MapControls
          position={position}
          isLocating={isLocating}
          isFullscreen={isFullscreen}
          isPopupOpen={isPopupOpen}
          handleLocateClick={handleLocateClick}
          toggleFullscreen={toggleFullscreen}
        />
      );
    }

    return () => {
      if (map && controlRef.current) {
        map.removeControl(controlRef.current);
        controlRef.current = null;
      }
      if (reactRootRef.current) {
        const root = reactRootRef.current;
        setTimeout(() => {
          root.unmount();
        }, 0);
        reactRootRef.current = null;
      }
    };
  }, [map, position, isLocating, isFullscreen, isPopupOpen, handleLocateClick, toggleFullscreen]);

  return (
    <>
      {/* Styles for .leaflet-top .leaflet-control-custom should be handled at a higher level or global stylesheet */}
      {position && (
        <Marker position={position} icon={getUserIcon(heading)} zIndexOffset={1000}>
          <Popup keepInView={true} autoPanPaddingTopLeft={popupPaddingTopLeft} autoPanPaddingBottomRight={popupPaddingBottomRight}>
            <div className="text-base font-bold text-gray-900">You are here</div>
          </Popup>
        </Marker>
      )}
    </>
  );
};

export default UserLocationMarker;