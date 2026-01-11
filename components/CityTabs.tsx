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
    <div className="tabs grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
      {cities.map((city, index) => (
        <button 
            key={city}
            onClick={() => setActiveCity(city)}
            className={`
                tab-btn py-3 px-5 rounded-full font-bold text-lg text-center w-full transition duration-300 border-2
                ${activeCity === city 
                    ? 'bg-card-bg border-primary text-white shadow-[0_0_15px_rgba(255,23,68,0.4)]' 
                    : 'bg-card-bg border-border text-white hover:bg-neutral-800'
                }
            `}
        >
            {city} {emojis[index]}
            <span className="block text-base font-normal text-sub-text mt-1">{dateRanges[index]}</span>
        </button>
      ))}
    </div>
  );
};
