import React from 'react';
import L from 'leaflet';
import { Navigation, Maximize, Minimize } from 'lucide-react';

interface MapControlsProps {
  position: L.LatLng | null;
  isLocating: boolean;
  isFullscreen: boolean;
  isPopupOpen: boolean;
  handleLocateClick: (e: React.MouseEvent) => void;
  toggleFullscreen: (e: React.MouseEvent) => void;
}

const MapControls: React.FC<MapControlsProps> = ({
  position,
  isLocating,
  isFullscreen,
  isPopupOpen,
  handleLocateClick,
  toggleFullscreen,
}) => {
  return (
    <div className={`flex flex-col gap-3 transition-all duration-300 pointer-events-auto ${isPopupOpen ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}>
      <button onClick={toggleFullscreen} className="flex items-center justify-center w-14 h-14 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md text-gray-200 opacity-90 hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl transition-all duration-300" title="Toggle Fullscreen">
        {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
      </button>
      <button onClick={handleLocateClick} className={`flex items-center justify-center w-14 h-14 rounded-xl border backdrop-blur-md transition-all duration-300 ${isLocating ? 'animate-pulse' : ''} ${position ? 'bg-black/70 border-white/40 text-blue-400 opacity-100' : 'bg-black/40 border-white/10 text-gray-200 opacity-90'} hover:opacity-100 hover:scale-[1.05] active:scale-95 cursor-pointer shadow-xl`} title="Center on my location">
        <Navigation size={24} className={position ? 'fill-blue-400/20' : ''} />
      </button>
    </div>
  );
};

export default MapControls;