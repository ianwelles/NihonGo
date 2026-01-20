import React, { useEffect, useRef } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import '@maplibre/maplibre-gl-leaflet';

interface PopupManagerProps {
  isMapAnimating: boolean;
}

const PopupManager: React.FC<PopupManagerProps> = ({ isMapAnimating }) => {
  const map = useMap();
  const openPopups = useRef<Set<L.Popup>>(new Set());

  useEffect(() => {
    const handlePopupOpen = (e: L.PopupEvent) => {
      openPopups.current.add(e.popup);
    };

    const handlePopupClose = (e: L.PopupEvent) => {
      openPopups.current.delete(e.popup);
    };

    const checkPopupsVisibility = () => {
      if (isMapAnimating) return; 

      const mapBounds = map.getBounds();
      openPopups.current.forEach(popup => {
        const popupLatLng = popup.getLatLng();
        if (!mapBounds.contains(popupLatLng)) {
          popup.remove();
        }
      });
    };

    map.on('popupopen', handlePopupOpen);
    map.on('popupclose', handlePopupClose);
    map.on('move', checkPopupsVisibility);

    return () => {
      map.off('popupopen', handlePopupOpen);
      map.off('popupclose', handlePopupClose);
      map.off('move', checkPopupsVisibility);
    };
  }, [map, isMapAnimating]);

  return null;
};

export default PopupManager;