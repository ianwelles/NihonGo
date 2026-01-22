import React, { useEffect, useState } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { getUserIcon } from '../mapConstants';
import { useAppStore } from '../../../context/AppContext';

interface UserLocationProps {
  position: L.LatLng | null;
  heading: number | null;
}

const UserLocation: React.FC<UserLocationProps> = ({ position, heading }) => {
  const { popupPaddingTopLeft, popupPaddingBottomRight } = useAppStore();

  if (!position) return null;

  return (
    <Marker position={position} icon={getUserIcon(heading)} zIndexOffset={1000}>
      <Popup keepInView={true} autoPanPaddingTopLeft={popupPaddingTopLeft} autoPanPaddingBottomRight={popupPaddingBottomRight}>
        <div className="text-base font-bold text-gray-900">You are here</div>
      </Popup>
    </Marker>
  );
};

export default UserLocation;