import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Landmark, Utensils, Store, PanelLeftClose, Map as MapIcon, Calendar, ChevronUp, ChevronRight } from 'lucide-react';
import { itineraryData } from '../data'; // Changed import source
import { CityName } from '../types';

interface Toggles {
  sight_rec: boolean;
  food_rec: boolean;
  shopping: boolean;
}

interface ControlsProps {
  toggles: Toggles;
  toggleCategory: (key: keyof Toggles) => void;
  onOpenShopping: () => void;
  openDay?: string | null;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  isMobile?: boolean;
  activeCity?: CityName | null;
  onSelectDay?: (day: string) => void;
  onSelectCity?: (city: CityName | null) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  toggles,
  toggleCategory,
  onOpenShopping,
  openDay,
  isSidebarOpen,
  onToggleSidebar,
  activeCity,
  onSelectDay,
  onSelectCity
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedCity, setExpandedCity] = useState<CityName | null>(activeCity || null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Group days by city using itineraryData (Source of Truth)
  const cityGroups = itineraryData.reduce((acc, day) => {
    const city = day.city;
    const dayLabel = `Day ${day.dayNumber}`;

    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(dayLabel);
    return acc;
  }, {} as Record<CityName, string[]>);

  // Unified styling class for all buttons
  const buttonBaseClass = "flex items-center justify-center gap-2 px-3 h-10 rounded-lg border backdrop-blur-md transition-all duration-300 text-[10px] font-black uppercase tracking-widest hover:opacity-100 hover:scale-[1.02] active:scale-95";

  // Specific variants for active/inactive states
  const activeClass = "bg-black/60 border-white/40 text-white shadow-md opacity-100";
  const inactiveClass = "bg-black/30 border-white/10 text-gray-400 opacity-70 hover:border-white/30";
  const accentClass = "bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.3)] hover:bg-[#FFD700]/20";
  const navClass = "bg-[#FF1744]/10 border-[#FF1744] text-[#FF1744] shadow-[0_0_8px_rgba(255,23,68,0.3)] hover:bg-[#FF1744]/20";

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Sync expanded city with active city when menu opens
  useEffect(() => {
    if (isMenuOpen && activeCity) {
      setExpandedCity(activeCity);
    }
  }, [isMenuOpen, activeCity]);

  const handleCityClick = (city: CityName) => {
    if (expandedCity === city) {
      // If already expanded, select it and close
      onSelectCity?.(city);
      setIsMenuOpen(false);
    } else {
      setExpandedCity(city);
    }
  };

  const getDayId = (dayStr: string) => dayStr.toLowerCase().replace(' ', '');

  const displayTitle = () => {
    if (openDay) {
      return `Day ${openDay.replace('day', '')}`;
    }
    if (activeCity) {
      return activeCity;
    }
    return 'City';
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      {/* 2x2 Grid for Categories */}
      <div className="grid grid-cols-2 gap-2 w-full">
        <button
          onClick={() => toggleCategory('sight_rec')}
          className={`${buttonBaseClass} ${toggles.sight_rec ? activeClass : inactiveClass}`}
        >
          <Landmark size={14} className={toggles.sight_rec ? "text-[#00BCD4]" : "text-gray-500"} />
          <span>Landmarks</span>
        </button>

        <button
          onClick={() => toggleCategory('food_rec')}
          className={`${buttonBaseClass} ${toggles.food_rec ? activeClass : inactiveClass}`}
        >
          <Utensils size={14} className={toggles.food_rec ? "text-[#F48FB1]" : "text-gray-500"} />
          <span>Food</span>
        </button>

        <button
          onClick={() => toggleCategory('shopping')}
          className={`${buttonBaseClass} ${toggles.shopping ? activeClass : inactiveClass}`}
        >
          <Store size={14} className={toggles.shopping ? "text-[#FFD700]" : "text-gray-500"} />
          <span>Shopping</span>
        </button>

        <button
          onClick={onOpenShopping}
          className={`${buttonBaseClass} ${accentClass}`}
        >
          <ShoppingBag size={14} />
          <span>Must Buy</span>
        </button>
      </div>

      {/* Full-width Row for Day/City Selector & Itinerary Toggle */}
      <div className="grid grid-cols-2 gap-2 w-full relative" ref={menuRef}>
          {/* Enhanced Selection Pop-up Menu */}
          {isMenuOpen && (
              <div className="absolute bottom-12 left-0 w-full bg-black/95 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden shadow-2xl z-[10000] flex flex-col max-h-[70vh] animate-in slide-in-from-bottom-2 duration-200">
                  <div className="px-4 py-3 bg-white/5 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-white/10 flex justify-between items-center">
                      <span>Select City</span>
                      <button 
                        onClick={() => { onSelectCity?.(null); setIsMenuOpen(false); }}
                        className="text-[9px] text-[#FF1744] hover:underline"
                      >
                        Reset
                      </button>
                  </div>
                  
                  <div className="overflow-y-auto py-2 custom-scrollbar">
                    {(Object.keys(cityGroups) as CityName[]).map((city) => (
                      <div key={city} className="flex flex-col">
                        <button
                          onClick={() => handleCityClick(city)}
                          className={`px-4 py-3 flex items-center justify-between transition-colors hover:bg-white/5
                            ${activeCity === city && !openDay ? 'bg-white/10 text-white' : 'text-gray-400'}
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${activeCity === city ? 'bg-[#FF1744]' : 'bg-transparent border border-white/20'}`} />
                            <span className="text-xs font-black uppercase tracking-wider">{city}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {activeCity === city && !openDay && <span className="text-[8px] font-bold text-[#FF1744]">ACTIVE</span>}
                            <ChevronRight size={14} className={`transition-transform duration-300 ${expandedCity === city ? 'rotate-90' : ''}`} />
                          </div>
                        </button>

                        {expandedCity === city && (
                          <div className="bg-white/[0.02] border-y border-white/5 grid grid-cols-2 gap-1 p-2">
                            {cityGroups[city].map((day) => {
                              const dayId = getDayId(day);
                              const isActive = openDay === dayId;
                              return (
                                <button
                                  key={day}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectCity?.(city);
                                    onSelectDay?.(dayId);
                                    setIsMenuOpen(false);
                                  }}
                                  className={`px-3 py-2 text-[10px] font-bold rounded-md transition-all text-center
                                    ${isActive 
                                      ? 'bg-[#FF1744] text-white' 
                                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}
                                  `}
                                >
                                  {day}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
              </div>
          )}

          {/* Combined Indicator / Menu Trigger */}
          <button
              onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
              }}
              className={`${buttonBaseClass} ${(openDay || activeCity) ? navClass : 'bg-black/60 border-white/50 text-white'} justify-between px-4 transition-all duration-300`}
          >
            <div className="flex items-center gap-2 overflow-hidden">
                <Calendar size={14} className={(openDay || activeCity) ? "text-[#FF1744]" : "text-white"} />
                <span className="truncate">{displayTitle()}</span>
            </div>
            <ChevronUp size={12} className={`shrink-0 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* View Itinerary Button */}
          <button
              onClick={(e) => {
                  e.stopPropagation();
                  onToggleSidebar && onToggleSidebar();
              }}
              className={`${buttonBaseClass} ${navClass}`}
          >
              {isSidebarOpen ? <PanelLeftClose size={14} /> : <MapIcon size={14} />}
              <span>{isSidebarOpen ? 'Close' : 'Itinerary'}</span>
          </button>
      </div>
    </div>
  );
};