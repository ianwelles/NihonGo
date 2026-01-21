import React, { useState, useRef, useEffect } from 'react';
import { PanelLeftClose, Map as MapIcon, Calendar, ChevronUp, ChevronRight, Info } from 'lucide-react';
import { CityName } from '../types';
import { useAppStore } from '../context/AppContext';
import { sanitizeHtml } from '../utils/htmlSanitizer';

interface ControlsProps {
}

export const Controls: React.FC<ControlsProps> = () => {
  const {
    openDay,
    isSidebarOpen,
    toggleSidebar,
    activeCity,
    setActiveCity,
    setOpenDay,
    itineraryData,
    tipsList,
    theme,
    isMobile
  } = useAppStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [expandedCity, setExpandedCity] = useState<CityName | null>(activeCity || null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const cityGroups = itineraryData.reduce((acc, day) => {
    const city = day.city;
    const dayIdentifier = `day${day.dayNumber}-${day.city}`;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push({ label: `Day ${day.dayNumber}`, identifier: dayIdentifier });
    return acc;
  }, {} as Record<CityName, { label: string; identifier: string }[]>);

  const buttonBaseClass = "flex items-center justify-center gap-3 px-4 h-14 rounded-xl border backdrop-blur-md transition-all duration-300 text-xs font-black uppercase tracking-widest hover:opacity-100 hover:scale-[1.02] active:scale-95";
  
  const activeCityColor = activeCity ? (theme.cityColors[activeCity] || '#FF1744') : '#FF1744';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsTipsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setIsTipsOpen(false);
      if (activeCity) setExpandedCity(activeCity);
    }
  }, [isMenuOpen, activeCity]);

  useEffect(() => {
    if (isTipsOpen) setIsMenuOpen(false);
  }, [isTipsOpen]);

  const handleCityClick = (city: CityName) => {
    if (expandedCity === city) {
      setActiveCity(city);
      setIsMenuOpen(false);
    } else {
      setExpandedCity(city);
    }
  };

  const displayTitle = () => {
    if (openDay) {
      const parts = openDay.replace('day', '').split('-');
      return `Day ${parts[0]}`;
    }
    if (activeCity) return activeCity;
    return 'City';
  };

  const popupMaxHeightClass = isMobile ? "max-h-[calc(100dvh-320px)]" : "max-h-[calc(100dvh-280px)]";

  return (
    <div className="flex flex-col gap-3 w-full relative" ref={menuRef}>
      <div className="absolute bottom-full left-0 w-full mb-3 flex flex-col gap-3 pointer-events-none z-[10000]">
        {isMenuOpen && (
          <div className={`w-full bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${popupMaxHeightClass} animate-in slide-in-from-bottom-2 duration-200 pointer-events-auto`}>
              <div className="px-5 py-4 bg-white/5 text-xs font-black text-gray-300 uppercase tracking-widest border-b border-white/10 flex justify-between items-center flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-1 rounded-full" style={{ backgroundColor: activeCityColor }}></div>
                    <span>Select City</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsTipsOpen(true)}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Show Shopping & Travel Tips"
                    >
                      <Info size={16} />
                    </button>
                    <button onClick={() => { setActiveCity(null); setIsMenuOpen(false); }} className="text-xs hover:underline" style={{ color: activeCityColor }}>Reset</button>
                  </div>
              </div>
              <div className="overflow-y-auto py-2 custom-scrollbar">
                {(Object.keys(cityGroups) as CityName[]).map((city) => (
                  <div key={city} className="flex flex-col">
                    <button onClick={() => handleCityClick(city)} className={`px-5 py-4 flex items-center justify-between transition-colors hover:bg-white/5 ${activeCity === city && !openDay ? 'bg-white/10 text-white' : 'text-gray-300'}`}>
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full" style={activeCity === city ? { backgroundColor: activeCityColor } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} />
                        <span className="text-sm font-black uppercase tracking-wider">{city}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {activeCity === city && !openDay && <span className="text-[10px] font-bold tracking-tighter" style={{ color: activeCityColor }}>ACTIVE</span>}
                        <ChevronRight size={18} className={`transition-transform duration-300 ${expandedCity === city ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                    {expandedCity === city && (
                      <div className="bg-white/[0.02] border-y border-white/5 grid grid-cols-2 gap-2 p-3">
                        {cityGroups[city].map((day) => {
                          const isActive = openDay === day.identifier;
                          return (
                            <button key={day.identifier} onClick={(e) => { e.stopPropagation(); setActiveCity(city); setOpenDay(day.identifier); setIsMenuOpen(false); }} 
                              className={`px-3 py-3 text-xs font-bold rounded-lg transition-all text-center ${isActive ? 'text-white' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}
                              style={isActive ? { backgroundColor: activeCityColor } : {}}
                            >
                              {day.label}
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
        {isTipsOpen && (
          <div className={`w-full bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col ${popupMaxHeightClass} animate-in slide-in-from-bottom-2 duration-200 pointer-events-auto`}>
              <div className="px-5 py-4 bg-white/5 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                  <div className="flex items-center gap-4">
                    <div className="h-4 w-1 bg-amber-400 rounded-full"></div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Shopping & Travel Tips</span>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(true)}
                    className="text-xs text-amber-400 hover:underline font-black uppercase tracking-widest"
                  >
                    Back to Cities
                  </button>
              </div>
              <div className="overflow-y-auto py-2 custom-scrollbar">
                {tipsList.map((category) => (
                  <div key={category.title} className="flex flex-col">
                    <button onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)} className={`px-5 py-4 flex items-center justify-between transition-colors hover:bg-white/5 ${expandedCategory === category.title ? 'bg-white/10 text-white' : 'text-gray-300'}`}>
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
                              {item.notes && <div className="text-sm text-gray-300 mt-1 leading-relaxed" dangerouslySetInnerHTML={sanitizeHtml(item.notes)}></div>}
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
      </div>
      
      <div className="flex gap-3 w-full relative">
          <button onClick={(e) => { e.stopPropagation(); toggleSidebar(); }} 
            className={`w-14 shrink-0 px-0 ${buttonBaseClass}`}
            style={{ 
                backgroundColor: `${activeCityColor}26`, 
                borderColor: activeCityColor, 
                color: activeCityColor,
                boxShadow: `0 0 12px ${activeCityColor}59`
              }}
          >
              {isSidebarOpen ? <PanelLeftClose size={20} /> : <MapIcon size={20} />}
          </button>
          <button onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
            className={`flex-1 ${buttonBaseClass} ${(openDay || activeCity) ? '' : 'bg-black/70 border-white/60 text-white'} justify-between px-5 transition-all duration-300`}
            style={(openDay || activeCity) ? { 
                backgroundColor: `${activeCityColor}26`, 
                borderColor: activeCityColor, 
                color: activeCityColor,
                boxShadow: `0 0 12px ${activeCityColor}59`
              } : {}}
          >
            <div className="flex items-center gap-3 overflow-hidden">
                <Calendar size={18} style={{ color: (openDay || activeCity) ? activeCityColor : 'white' }} />
                <span className="truncate text-sm">{displayTitle()}</span>
            </div>
            <ChevronUp size={16} className={`shrink-0 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>
      </div>
    </div>
  );
};