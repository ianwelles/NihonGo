import React from 'react';
import { CityName } from '../types';

interface CityTabsProps {
  activeCity: CityName;
  setActiveCity: (city: CityName) => void;
}

export const CityTabs: React.FC<CityTabsProps> = ({ activeCity, setActiveCity }) => {
  const cities: CityName[] = ['Tokyo', 'Kyoto', 'Osaka', 'Shanghai'];
  const dateRanges = ["18–20 Feb", "21–23 Feb", "24–25 Feb", "25–28 Feb"];
  const emojis = ["🗼", "⛩️", "🐙", "🥟"];

  return (
    <div className="mb-6">
        <div className="tabs grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {cities.map((city, index) => (
            <button 
                key={city}
                onClick={() => setActiveCity(city)}
                className={`
                    py-3 px-4 rounded-2xl font-bold text-base text-center w-full transition-all duration-300 border
                    ${activeCity === city 
                        ? 'bg-card-bg border-[#FF1744] text-white shadow-[0_0_15px_rgba(255,23,68,0.2)]' 
                        : 'bg-card-bg border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                    }
                `}
            >
                <div className="flex items-center justify-center gap-2 mb-1">
                    <span>{city}</span>
                    <span className="text-sm opacity-80 filter grayscale-[0.3]">{emojis[index]}</span>
                </div>
                <span className={`block text-xs font-medium ${activeCity === city ? 'text-[#FF1744]' : 'text-gray-600'}`}>{dateRanges[index]}</span>
            </button>
        ))}
        </div>
        
        {/* Sub-header to confirm context */}
        <div className="flex items-center gap-3 px-1 mb-4">
            <div className="h-4 w-1 bg-[#FF1744] rounded-full"></div>
            <h2 className="text-sm font-bold text-gray-200 uppercase tracking-widest">
                {activeCity} Itinerary
            </h2>
            <div className="h-px bg-white/10 flex-1"></div>
        </div>
    </div>
  );
};
