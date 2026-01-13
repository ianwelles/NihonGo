import React, { useState, useRef, useEffect } from 'react';
import { Landmark, Utensils, Store, PanelLeftClose, Map as MapIcon, Calendar, ChevronUp, ChevronRight, Info } from 'lucide-react';
import { CityName, DayItinerary, TipCategory } from '../types';
import { itineraryData as fallbackItinerary, tipsList as fallbackTips } from '../data';

interface Toggles {
  sight_rec: boolean;
  food_rec: boolean;
  shopping: boolean;
}

interface ControlsProps {
  toggles: Toggles;
  toggleCategory: (key: keyof Toggles) => void;
  openDay?: string | null;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
  isMobile?: boolean;
  activeCity?: CityName | null;
  onSelectDay?: (day: string) => void;
  onSelectCity?: (city: CityName | null) => void;
  itineraryData?: DayItinerary[];
  tipsList?: TipCategory[];
}

export const Controls: React.FC<ControlsProps> = ({
  toggles,
  toggleCategory,
  openDay,
  isSidebarOpen,
  onToggleSidebar,
  activeCity,
  onSelectDay,
  onSelectCity,
  itineraryData,
  tipsList
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [expandedCity, setExpandedCity] = useState<CityName | null>(activeCity || null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Use props or fallbacks
  const currentItinerary = itineraryData || fallbackItinerary;
  const currentTips = tipsList || fallbackTips;

  // Group days by city using itineraryData (Source of Truth)
  const cityGroups = currentItinerary.reduce((acc, day) => {
    const city = day.city;
    const dayLabel = `Day ${day.dayNumber}`;

    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(dayLabel);
    return acc;
  }, {} as Record<CityName, string[]>);

  // Unified styling class for all buttons
  // Increased height from h-10 to h-14, font size to text-xs (12px) from 10px, and padding
  const buttonBaseClass = "flex items-center justify-center gap-3 px-4 h-14 rounded-xl border backdrop-blur-md transition-all duration-300 text-xs font-black uppercase tracking-widest hover:opacity-100 hover:scale-[1.02] active:scale-95";

  // Specific variants for active/inactive states
  const activeClass = "bg-black/70 border-white/50 text-white shadow-lg opacity-100";
  const inactiveClass = "bg-black/40 border-white/10 text-gray-300 opacity-80 hover:border-white/40";
  const navClass = "bg-[#FF1744]/15 border-[#FF1744] text-[#FF1744] shadow-[0_0_12px_rgba(255,23,68,0.35)] hover:bg-[#FF1744]/25";
  const tipsClass = "bg-amber-500/15 border-amber-500/30 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:bg-amber-500/25";

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsTipsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Mutually exclusive menus
  useEffect(() => {
    if (isMenuOpen) {
      setIsTipsOpen(false);
      if (activeCity) setExpandedCity(activeCity);
    }
  }, [isMenuOpen, activeCity]);

  useEffect(() => {
    if (isTipsOpen) {
      setIsMenuOpen(false);
    }
  }, [isTipsOpen]);

  const handleCityClick = (city: CityName) => {
    if (expandedCity === city) {
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

  // Safe height calculation to prevent pop-up from extending past top of window
  const popupMaxHeightClass = "max-h-[calc(100dvh-240px)]";

  return (
    <div className="flex flex-col gap-3 w-full relative" ref={menuRef}>
      {/* City Selector Pop-up Menu */}
      {isMenuOpen && (
          <div className={`absolute bottom-full mb-3 left-0 w-full bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-[10000] flex flex-col ${popupMaxHeightClass} animate-in slide-in-from-bottom-2 duration-200`}>
              <div className="px-5 py-4 bg-white/5 text-xs font-black text-gray-300 uppercase tracking-widest border-b border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-1 bg-[#FF1744] rounded-full"></div>
                    <span>Select City</span>
                  </div>
                  <button 
                    onClick={() => { onSelectCity?.(null); setIsMenuOpen(false); }}
                    className="text-xs text-[#FF1744] hover:underline"
                  >
                    Reset
                  </button>
              </div>
              
              <div className="overflow-y-auto py-2 custom-scrollbar">
                {(Object.keys(cityGroups) as CityName[]).map((city) => (
                  <div key={city} className="flex flex-col">
                    <button
                      onClick={() => handleCityClick(city)}
                      className={`px-5 py-4 flex items-center justify-between transition-colors hover:bg-white/5
                        ${activeCity === city && !openDay ? 'bg-white/10 text-white' : 'text-gray-300'}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${activeCity === city ? 'bg-[#FF1744]' : 'bg-transparent border border-white/20'}`} />
                        <span className="text-sm font-black uppercase tracking-wider">{city}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {activeCity === city && !openDay && <span className="text-[10px] font-bold text-[#FF1744] tracking-tighter">ACTIVE</span>}
                        <ChevronRight size={18} className={`transition-transform duration-300 ${expandedCity === city ? 'rotate-90' : ''}`} />
                      </div>
                    </button>

                    {expandedCity === city && (
                      <div className="bg-white/[0.02] border-y border-white/5 grid grid-cols-2 gap-2 p-3">
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
                              className={`px-3 py-3 text-xs font-bold rounded-lg transition-all text-center
                                ${isActive 
                                  ? 'bg-[#FF1744] text-white' 
                                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}
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

      {/* Travel Tips Pop-up Menu */}
      {isTipsOpen && (
          <div className={`absolute bottom-full mb-3 left-0 w-full bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl z-[10000] flex flex-col ${popupMaxHeightClass} animate-in slide-in-from-bottom-2 duration-200`}>
              <div className="px-5 py-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-1 bg-amber-400 rounded-full"></div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Shopping & Travel Tips</span>
                  </div>
              </div>
              
              <div className="overflow-y-auto py-2 custom-scrollbar">
                {currentTips.map((category) => (
                  <div key={category.title} className="flex flex-col">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)}
                      className={`px-5 py-4 flex items-center justify-between transition-colors hover:bg-white/5
                        ${expandedCategory === category.title ? 'bg-white/10 text-white' : 'text-gray-300'}
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${expandedCategory === category.title ? 'bg-amber-400' : 'bg-transparent border border-white/20'}`} />
                        <span className="text-sm font-black uppercase tracking-wider text-left">{category.title}</span>
                      </div>
                      <ChevronRight size={18} className={`shrink-0 transition-transform duration-300 ${expandedCategory === category.title ? 'rotate-90' : ''}`} />
                    </button>

                    {expandedCategory === category.title && (
                      <div className="bg-white/[0.02] border-y border-white/5 flex flex-col p-3 gap-3">
                        {category.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 px-4 py-3 bg-white/5 border border-white/5 rounded-xl">
                            <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
                            <div className="flex flex-col">
                              <div className="text-xs font-black text-white uppercase tracking-wide">{item.name}</div>
                              {item.notes && <div className="text-sm text-gray-300 mt-1 leading-relaxed">{item.notes}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
          </div>
      )}

      {/* 2x2 Grid for Categories */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <button
          onClick={() => toggleCategory('sight_rec')}
          className={`${buttonBaseClass} ${toggles.sight_rec ? activeClass : inactiveClass}`}
        >
          <Landmark size={18} className={toggles.sight_rec ? "text-[#00BCD4]" : "text-gray-400"} />
          <span>Landmarks</span>
        </button>

        <button
          onClick={() => toggleCategory('food_rec')}
          className={`${buttonBaseClass} ${toggles.food_rec ? activeClass : inactiveClass}`}
        >
          <Utensils size={18} className={toggles.food_rec ? "text-[#F48FB1]" : "text-gray-400"} />
          <span>Food</span>
        </button>

        <button
          onClick={() => toggleCategory('shopping')}
          className={`${buttonBaseClass} ${toggles.shopping ? activeClass : inactiveClass}`}
        >
          <Store size={18} className={toggles.shopping ? "text-[#FFD700]" : "text-gray-400"} />
          <span>Shopping</span>
        </button>

        <button
          onClick={() => setIsTipsOpen(!isTipsOpen)}
          className={`${buttonBaseClass} ${isTipsOpen ? 'bg-amber-500/25 border-amber-500/50 text-amber-100 shadow-[0_0_15px_rgba(245,158,11,0.35)]' : tipsClass}`}
        >
          <Info size={18} />
          <span>Tips</span>
        </button>
      </div>

      {/* Full-width Row for Day/City Selector & Itinerary Toggle */}
      <div className="grid grid-cols-2 gap-3 w-full relative">
          {/* Combined Indicator / Menu Trigger */}
          <button
              onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
              }}
              className={`${buttonBaseClass} ${(openDay || activeCity) ? navClass : 'bg-black/70 border-white/60 text-white'} justify-between px-5 transition-all duration-300`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
                <Calendar size={18} className={(openDay || activeCity) ? "text-[#FF1744]" : "text-white"} />
                <span className="truncate text-sm">{displayTitle()}</span>
            </div>
            <ChevronUp size={16} className={`shrink-0 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* View Itinerary Button */}
          <button
              onClick={(e) => {
                  e.stopPropagation();
                  onToggleSidebar && onToggleSidebar();
              }}
              className={`${buttonBaseClass} ${navClass} px-5`}
          >
              {isSidebarOpen ? <PanelLeftClose size={18} /> : <MapIcon size={18} />}
              <span className="text-sm">{isSidebarOpen ? 'Close' : 'Itinerary'}</span>
          </button>
      </div>
    </div>
  );
};
