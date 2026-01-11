import React from 'react';
import { Download, FileDown, ShoppingBag } from 'lucide-react';

interface HeaderProps {
  onDownloadFull: () => void;
  onDownloadLogistics: () => void;
  onDownloadRecs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onDownloadFull, onDownloadLogistics, onDownloadRecs }) => {
  return (
    <div className="text-center mb-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-2xl">🇯🇵</span>
        <h1 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tight leading-none">
          Cultural & Culinary <br className="md:hidden" /> Journey
        </h1>
        <span className="text-2xl">🇨🇳</span>
      </div>
      
      <p className="text-gray-400 text-xs md:text-sm font-medium tracking-wide uppercase mb-4">
        18 Feb – 28 Feb 2025 <span className="mx-2 text-white/20">|</span> Beto Birthday Experience
      </p>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <button 
          onClick={onDownloadFull}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30"
        >
          <Download size={14} />
          <span>Full Itinerary</span>
        </button>
        
        <button 
          onClick={onDownloadLogistics}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30"
        >
          <FileDown size={14} />
          <span>Logistics</span>
        </button>

        <button 
          onClick={onDownloadRecs}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30"
        >
          <ShoppingBag size={14} />
          <span>Shopping List</span>
        </button>
      </div>
    </div>
  );
};
