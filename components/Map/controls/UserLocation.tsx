import React, { useEffect, useState, useCallback } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getUserIcon } from '../mapConstants';
import { useAppStore } from '../../../context/AppContext';

interface UserLocationMarkerProps {
  isSidebarOpen?: boolean;
  isMobile?: boolean;
  onLocationUpdate?: (pos: L.LatLng) => void;
  onLocationError?: () => void;
}

const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({ 
  onLocationUpdate, 
  onLocationError 
}) => {
  const map = useMap();
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [heading, setHeading] = useState<number | null>(null);

  const { popupPaddingTopLeft, popupPaddingBottomRight } = useAppStore();

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
      onLocationUpdate?.(e.latlng);
    };
    const onLocationErrorEv = (e: L.ErrorEvent) => {
      console.warn("Geolocation error:", e.message);
      onLocationError?.();
    };
    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationErrorEv);
    return () => {
      map.off('locationfound', onLocationFound);
      map.off('locationerror', onLocationErrorEv);
      map.stopLocate();
    };
  }, [map, onLocationUpdate, onLocationError]);

  return (
    <>
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