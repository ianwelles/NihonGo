import React, { useMemo } from 'react';
import { CityName } from '../types';

interface HeaderProps {
  startDate?: Date;
  endDate?: Date;
  tripTitle?: string;
  activeCity?: CityName | null;
}

// Mapping city names to specific "Type 1" accent colours
const CITY_COLORS: Record<CityName, string> = {
  Tokyo: '#C2185B',
  Kyoto: '#558B2F',
  Osaka: '#E65100',
  Shanghai: '#0097A7'
};

const DEFAULT_DATE_RANGE = "18 FEB – 28 FEB 2025";

const formatDateRange = (startDate?: Date, endDate?: Date) => {
  if (!startDate || !endDate) return DEFAULT_DATE_RANGE;
  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
  const startStr = startDate.toLocaleDateString('en-GB', options).toUpperCase();
  const endStr = endDate.toLocaleDateString('en-GB', options).toUpperCase();
  return `${startStr} – ${endStr} ${endDate.getFullYear()}`;
};

export const Header: React.FC<HeaderProps> = ({ 
  startDate,
  endDate,
  tripTitle = "BETO BIRTHDAY EXPERIENCE",
  activeCity
}) => {
  const activeColor = useMemo(() => 
    activeCity ? CITY_COLORS[activeCity] : 'rgba(255, 255, 255, 0.1)', 
  [activeCity]);

  const dateRangeStr = useMemo(() => formatDateRange(startDate, endDate), [startDate, endDate]);

  const cities: { name: CityName; y: number; r: number }[] = [
    { name: 'Tokyo', y: 4, r: 4.5 },
    { name: 'Kyoto', y: 22, r: 3.5 },
    { name: 'Osaka', y: 42, r: 3.5 },
    { name: 'Shanghai', y: 60, r: 4.5 }
  ];

  return (
    <header className="flex flex-col mb-6 px-2 select-none relative font-sans">
      {/* Brand Identity Row: Height 64px for vertical breathing room */}
      <div className="flex items-start gap-4 h-[64px] relative">
        
        {/* 1. Extended Vertical Itinerary Path using specific city dots */}
        <div className="h-full w-3 shrink-0 py-1">
          <svg viewBox="0 0 10 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full overflow-visible">
            {cities.map((city, i) => (
              <React.Fragment key={city.name}>
                <circle 
                  cx="5" cy={city.y} r={city.r} 
                  fill={CITY_COLORS[city.name]} 
                  className={activeCity === city.name ? "animate-pulse" : ""} 
                />
                {i < cities.length - 1 && (
                  <line 
                    x1="5" y1={city.y + 6} 
                    x2="5" y2={cities[i+1].y - 6} 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="1" 
                    strokeDasharray="2 2" 
                  />
                )}
              </React.Fragment>
            ))}
          </svg>
        </div>

        {/* 2. Spaced Title Block with Refined Neon Glow */}
        <div className="flex flex-col h-full justify-between py-1">
          <h1 className="flex flex-col h-full justify-between items-start">
            <span 
              className="font-black tracking-tighter leading-none text-[1.8rem]"
              style={{ color: '#C2185B', textShadow: '0 0 8px rgba(194, 24, 91, 0.4)' }}
            >
              SEND NOODS
            </span>
            <span 
              className="font-black tracking-tighter leading-none text-[1.8rem]"
              style={{ color: '#0097A7', textShadow: '0 0 8px rgba(0, 151, 167, 0.4)' }}
            >
              DIM SUM MORE
            </span>
          </h1>
        </div>

        {/* 3. Re-weighted Plane Logo: Centred vertically and flush right */}
        <div className="absolute right-0 top-0 h-[64px] w-[64px] flex items-center justify-center">
          <svg className="w-12 h-12 overflow-visible" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="black" stroke="#ef4444" strokeWidth="4" />
            <g transform="translate(50 50) rotate(45) scale(4.8) translate(-11.5 -12)">
              <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" fill="white" />
            </g>
          </svg>
        </div>
      </div>
      
      {/* 4. Sub-header: Vertical Accent Bar and Spacing */}
      <div 
        className="mt-4 flex flex-col border-l pl-4 transition-all duration-300 ease-in-out border-white/10" 
        style={{ borderLeftColor: activeColor }}
      >
        <p className="text-[14px] font-mono font-bold tracking-[0.18em] text-white uppercase leading-snug">
          {tripTitle}
        </p>
        <p className="text-[12px] font-mono font-bold tracking-[0.1em] text-white/60 uppercase leading-none mt-1.5 pb-2">
          {dateRangeStr}
        </p>
      </div>
    </header>
  );
};