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
  const isDragging = useRef(false);

  useEffect(() => {
    const handlePopupOpen = (e: L.PopupEvent) => {
      openPopups.current.add(e.popup);
    };

    const handlePopupClose = (e: L.PopupEvent) => {
      openPopups.current.delete(e.popup);
    };

    const handleDragStart = () => {
      isDragging.current = true;
    };

    const handleDragEnd = () => {
      isDragging.current = false;
    };

    const checkPopupsVisibility = () => {
      // Only close popups if the user is dragging the map
      if (isMapAnimating || !isDragging.current) return; 

      const mapContainer = map.getContainer();
      const mapRect = mapContainer.getBoundingClientRect();

      openPopups.current.forEach(popup => {
        const popupContainer = popup.getElement();
        if (!popupContainer) return;

        const popupRect = popupContainer.getBoundingClientRect();

        // Calculate intersection area with the map viewport
        const xOverlap = Math.max(0, Math.min(mapRect.right, popupRect.right) - Math.max(mapRect.left, popupRect.left));
        const yOverlap = Math.max(0, Math.min(mapRect.bottom, popupRect.bottom) - Math.max(mapRect.top, popupRect.top));
        const intersectionArea = xOverlap * yOverlap;

        const popupArea = popupRect.width * popupRect.height;

        // If less than 75% of the popup is visible (more than 25% is outside), close it
        if (popupArea > 0 && intersectionArea / popupArea < 0.75) {
          popup.remove();
        }
      });
    };

    map.on('popupopen', handlePopupOpen);
    map.on('popupclose', handlePopupClose);
    map.on('dragstart', handleDragStart);
    map.on('dragend', handleDragEnd);
    map.on('move', checkPopupsVisibility);

    return () => {
      map.off('popupopen', handlePopupOpen);
      map.off('popupclose', handlePopupClose);
      map.off('dragstart', handleDragStart);
      map.off('dragend', handleDragEnd);
      map.off('move', checkPopupsVisibility);
    };
  }, [map, isMapAnimating]);

  return null;
};

export default PopupManager;