import React from 'react';
import { CityName, DayItinerary } from '../types';

interface CityTabsProps {
  activeCity: CityName | null;
  setActiveCity: (city: CityName | null) => void;
  isMobile: boolean;
  onToggleSidebar: () => void;
  fullItineraryDays: DayItinerary[];
}

export const CityTabs: React.FC<CityTabsProps> = ({ activeCity, setActiveCity, isMobile, onToggleSidebar, fullItineraryDays }) => {
  const cities: CityName[] = ['Tokyo', 'Kyoto', 'Osaka', 'Shanghai'];
  const emojis = ["🗼", "⛩️", "🐙", "🥟"];

  const getCityDateRange = (city: CityName) => {
    const cityDays = fullItineraryDays.filter(d => d.city === city);
    if (cityDays.length === 0) return "";
    
    const start = cityDays[0].date.split(' ').slice(1).join(' '); // e.g., "18 Feb"
    const end = cityDays[cityDays.length - 1].date.split(' ').slice(1).join(' '); // e.g., "20 Feb"
    
    if (start === end) return start;

    const startDay = start.split(' ')[0];
    const endDay = end.split(' ')[0];
    const month = end.split(' ')[1];

    return `${startDay}–${endDay} ${month}`;
  };

  return (
    <div className="mb-6">
        <div className="tabs grid grid-cols-2 gap-3 mb-6">
        {cities.map((city, index) => (
            <button 
                key={city}
                onClick={() => {
                    setActiveCity(city);
                    // Removed auto-close sidebar on mobile
                }}
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
                <span className={`block text-xs font-medium ${activeCity === city ? 'text-[#FF1744]' : 'text-gray-600'}`}>
                    {getCityDateRange(city)}
                </span>
            </button>
        ))}
        </div>
        
        {/* Sub-header to confirm context */}
        <div className="flex items-center gap-3 px-1 mb-4">
            <div className="h-4 w-1 bg-[#FF1744] rounded-full"></div>
            <h2 className="text-sm font-bold text-gray-200 uppercase tracking-widest">
                {activeCity ? `${activeCity} Itinerary` : 'Select a City'}
            </h2>
            <div className="h-px bg-white/10 flex-1"></div>
        </div>
    </div>
  );
};
