import React from 'react';

interface HeaderProps {
  onDownloadFull: () => void;
  onDownloadLogistics: () => void;
  onDownloadRecs: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  onDownloadFull, onDownloadLogistics, onDownloadRecs 
}) => {
  return (
    <header className="text-center mb-5 pb-5 border-b-[3px] border-border relative">
      <h1 className="text-primary text-3xl md:text-4xl font-bold leading-tight mb-2 mt-0">🇯🇵 Cultural & Culinary Journey 🇨🇳</h1>
      <div className="text-lg text-sub-text font-bold mb-4">18 Feb – 28 Feb 2025 | Beto Birthday Experience</div>
      
      {/* Export Buttons - Visible only on Laptop/Desktop (Large screens) */}
      <div className="hidden lg:flex flex-wrap gap-3 justify-center mb-4">
        <button 
          onClick={onDownloadFull}
          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-accent text-accent rounded-full text-sm font-bold hover:bg-accent hover:text-bg transition-all duration-300"
        >
          📄 Full Itinerary CSV
        </button>
        <button 
          onClick={onDownloadLogistics}
          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-green-500 text-green-500 rounded-full text-sm font-bold hover:bg-green-500 hover:text-bg transition-all duration-300"
        >
          📋 Logistics CSV
        </button>
        <button 
          onClick={onDownloadRecs}
          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#d500f9] text-[#d500f9] rounded-full text-sm font-bold hover:bg-[#d500f9] hover:text-bg transition-all duration-300"
        >
          ⭐ Recommendations CSV
        </button>
      </div>
    </header>
  );
};