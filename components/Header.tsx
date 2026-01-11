import React from 'react';
import { Download, FileDown } from 'lucide-react';

interface HeaderProps {
  onDownloadFull: () => void;
  onDownloadLogistics: () => void;
  onDownloadRecs: () => void;
  isMobile: boolean;
}
     
export const Header: React.FC<HeaderProps> = ({ onDownloadFull, onDownloadLogistics, onDownloadRecs, isMobile }) => {
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
        18 Feb – 28 Feb 2025 <span className="mx-2 text-white/20">|</span> Beto Birthday Experience
      </p>

      {/* Action Buttons */}
      {!isMobile && (
        <div className="flex flex-col gap-3 w-full">
          <button 
            onClick={onDownloadFull}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full"
          >
            <Download size={14} />
            <span>Full Itinerary</span>
          </button>
          
          <button 
            onClick={onDownloadLogistics}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full"
          >
            <Download size={14} /> {/* Changed icon to Download */}
            <span>Logistics</span>
          </button>

          <button 
            onClick={onDownloadRecs}
            className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full"
          >
            <Download size={14} />
            <span>Recommendations</span>
          </button>
        </div>
      )}
    </div>
  );
};