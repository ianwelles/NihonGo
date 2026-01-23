import React from 'react';
import { CityName } from '../types';
import { useAppStore } from '../context/AppContext';

export const CityTabs: React.FC = () => {
  const { 
    activeCity, 
    setActiveCity, 
    itineraryData, 
    theme 
  } = useAppStore();

  // Derive unique cities from itinerary data to ensure we use loaded data
  const cities = Array.from(new Set(itineraryData.map(d => d.city))) as CityName[];
  
  const cityEmojiMap: Record<string, string> = {
    'Tokyo': '🗼',
    'Kyoto': '⛩️',
    'Osaka': '🐙',
    'Shanghai': '🥟'
  };

  const getCityDateRange = (city: CityName) => {
    const cityDays = itineraryData.filter(d => d.city === city);
    if (cityDays.length === 0) return "";
    
    const start = cityDays[0].date.split(' ').slice(1).join(' '); // e.g., "18 Feb"
    const end = cityDays[cityDays.length - 1].date.split(' ').slice(1).join(' '); // e.g., "20 Feb"
    
    if (start === end) return start;

    const startDay = start.split(' ')[0];
    const endDay = end.split(' ')[0];
    const month = end.split(' ')[1];

    return `${startDay}–${endDay} ${month}`;
  };

  const activeCityColor = activeCity ? (theme.cityColors[activeCity] || '#FF1744') : '#FF1744';

  return (
    <div className="mb-6">
        <div className="tabs grid grid-cols-2 gap-4 mb-6">
        {cities.map((city) => (
            <button 
                key={city}
                onClick={() => {
                    setActiveCity(city);
                }}
                className={`
                    py-5 px-4 rounded-2xl font-black text-xl text-center w-full transition-all duration-300 border
                    ${activeCity === city 
                        ? 'bg-card-bg text-white' 
                        : 'bg-card-bg border-white/10 text-gray-400 hover:bg-white/5 hover:text-white'
                    }
                `}
                style={activeCity === city ? { borderColor: activeCityColor, boxShadow: `0 0 20px ${activeCityColor}40` } : {}}
            >
                <div className="flex items-center justify-center gap-2 mb-1.5">
                    <span>{city}</span>
                    <span className="text-xl opacity-90 filter grayscale-[0.2]">{cityEmojiMap[city] || '📍'}</span>
                </div>
                <span 
                  className="block text-base font-bold"
                  style={{ color: activeCity === city ? activeCityColor : '#6b7280' }}
                >
                    {getCityDateRange(city)}
                </span>
            </button>
        ))}
        </div>
        
        {/* Sub-header to confirm context */}
        <div className="flex items-center gap-3 px-1 mb-4">
            <div 
              className="h-6 w-2 rounded-full"
              style={{ backgroundColor: activeCityColor }}
            ></div>
            <h2 className="text-lg font-black text-gray-100 uppercase tracking-widest">
                {activeCity ? `${activeCity} Itinerary` : 'Select a City'}
            </h2>
            <div className="h-px bg-white/10 flex-1"></div>
        </div>
    </div>
  );
};
