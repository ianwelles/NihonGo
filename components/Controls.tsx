import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Landmark, Utensils, Store, PanelLeftClose, PanelLeftOpen, Map as MapIcon, Calendar, ChevronUp } from 'lucide-react';
import { dayToCity } from '../data'; // Import data to map cities to days
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
  activeCity?: CityName;
  onSelectDay?: (day: string) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  toggles,
  toggleCategory,
  onOpenShopping,
  openDay,
  isSidebarOpen,
  onToggleSidebar,
  isMobile,
  activeCity,
  onSelectDay
}) => {
  const [isDayMenuOpen, setIsDayMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Unified styling class for all buttons
  const buttonBaseClass = "flex items-center justify-center gap-2 px-3 h-10 rounded-lg border backdrop-blur-md transition-all duration-300 text-[10px] font-black uppercase tracking-widest hover:opacity-100 hover:scale-[1.02] active:scale-95";

  // Specific variants for active/inactive states
  const activeClass = "bg-black/60 border-white/40 text-white shadow-md opacity-100";
  const inactiveClass = "bg-black/30 border-white/10 text-gray-400 opacity-70 hover:border-white/30";
  const accentClass = "bg-[#FFD700]/10 border-[#FFD700] text-[#FFD700] shadow-[0_0_8px_rgba(255,215,0,0.3)] hover:bg-[#FFD700]/20";
  const navClass = "bg-[#FF1744]/10 border-[#FF1744] text-[#FF1744] shadow-[0_0_8px_rgba(255,23,68,0.3)] hover:bg-[#FF1744]/20";

  // Filter available days based on active city
  const availableDays = Object.entries(dayToCity)
    .filter(([_, city]) => city === activeCity)
    .map(([day]) => day);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsDayMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

      {/* Full-width Row for Day Indicator & Itinerary Toggle */}
      <div className="grid grid-cols-2 gap-2 w-full relative" ref={menuRef}>
          {/* Day Selection Pop-up Menu */}
          {isDayMenuOpen && (
              <div className="absolute bottom-12 left-0 w-[48%] bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 flex flex-col max-h-60 overflow-y-auto animate-in slide-in-from-bottom-2 duration-200">
                  <div className="px-3 py-2 bg-white/5 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-white/10">
                      Select Day
                  </div>
                  {availableDays.map((day) => (
                      <button
                          key={day}
                          onClick={(e) => {
                              e.stopPropagation();
                              if (onSelectDay) {
                                  onSelectDay(day.toLowerCase().replace(' ', ''));
                                  setIsDayMenuOpen(false);
                              }
                          }}
                          className={`px-4 py-3 text-left text-xs font-bold transition-colors hover:bg-white/10 flex items-center justify-between
                              ${openDay === day.toLowerCase().replace(' ', '') ? 'text-[#FF1744] bg-[#FF1744]/10' : 'text-gray-200'}
                          `}
                      >
                          <span>{day}</span>
                          {openDay === day.toLowerCase().replace(' ', '') && <div className="w-1.5 h-1.5 rounded-full bg-[#FF1744]" />}
                      </button>
                  ))}
              </div>
          )}

          {/* Day Indicator / Menu Trigger */}
          <button
              onClick={(e) => {
                  e.stopPropagation();
                  setIsDayMenuOpen(!isDayMenuOpen);
              }}
              className={`${buttonBaseClass} ${openDay ? navClass : 'bg-black/60 border-white/50 text-white'} justify-between px-4`}
          >
            <div className="flex items-center gap-2">
                <Calendar size={14} className={openDay ? "text-[#FF1744]" : "text-white"} />
                <span>{openDay ? `Day ${openDay.replace('day', '')}` : 'Select Day'}</span>
            </div>
            <ChevronUp size={12} className={`transition-transform duration-300 ${isDayMenuOpen ? 'rotate-180' : ''}`} />
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
              <span>{isSidebarOpen ? 'Close Itinerary' : 'View Itinerary'}</span>
          </button>
      </div>
    </div>
  );
};
