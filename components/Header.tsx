import React from 'react';
import { Download, FileDown } from 'lucide-react';

interface HeaderProps {
  onDownloadPlaces: () => void;
  onDownloadItinerary: () => void;
  onDownloadTheme: () => void;
  onDownloadTips: () => void;
  isMobile: boolean;
  startDate?: Date;
  endDate?: Date;
  tripTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onDownloadPlaces, 
  onDownloadItinerary, 
  onDownloadTheme, 
  onDownloadTips, 
  isMobile,
  startDate,
  endDate,
  tripTitle = "Beto Birthday Experience"
}) => {
  const formatDateRange = () => {
    if (!startDate || !endDate) return "18 Feb – 28 Feb 2025";
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    const startStr = startDate.toLocaleDateString('en-GB', options);
    const endStr = endDate.toLocaleDateString('en-GB', options);
    const year = endDate.getFullYear();
    
    return `${startStr} – ${endStr} ${year}`;
  };

  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-3xl">🇯🇵</span>
        <h1 className="text-2xl md:text-2xl font-black text-white uppercase tracking-tight leading-none">
          Send Noods & Dim Sum More
        </h1>
        <span className="text-3xl">🇨🇳</span>
      </div>
      
      <p className="text-gray-400 text-xs md:text-xs font-medium tracking-wide uppercase mb-4">
        {formatDateRange()} <span className="mx-2 text-white/20">|</span> {tripTitle}
      </p>

      {/* Action Buttons */}
      {!isMobile && (
        <div className="flex flex-col gap-3 w-full">
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onDownloadPlaces}
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full"
            >
              <Download size={14} />
              <span>Places</span>
            </button>
            
            <button 
              onClick={onDownloadItinerary}
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full"
            >
              <Download size={14} />
              <span>Itinerary</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={onDownloadTheme}
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full"
            >
              <Download size={14} />
              <span>Theme</span>
            </button>

            <button 
              onClick={onDownloadTips}
              className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full"
            >
              <Download size={14} />
              <span>Tips</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};