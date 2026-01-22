import React, { useState, useRef, useEffect } from 'react';
import { PanelLeftClose, Map as MapIcon, Calendar, ChevronUp, ChevronRight, Info, RotateCcw, Menu, ChevronLeft, List, X } from 'lucide-react';
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

  const activeCityColor = activeCity ? (theme.cityColors[activeCity] || '#FF1744') : '#FF1744';
  const tipsColor = '#fbbf24'; // Amber-400 to match Tips Header

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
    return 'Select City';
  };

  const popupMaxHeightClass = isMobile ? "max-h-[60dvh]" : "max-h-[500px]";
  
  const menuContainerClass = "fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-[2002] flex flex-col pointer-events-none";

  const menuContentClass = `w-full bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col ${popupMaxHeightClass} animate-in slide-in-from-bottom-4 fade-in duration-300 pointer-events-auto`;

  return (
    <div className={`w-full h-full relative ${isMobile ? 'static' : ''}`} ref={menuRef}>
      
      {/* --- POPUP MENUS (CITY & TIPS) --- */}
      <div className={menuContainerClass}>
        
        {isMenuOpen && (
          <div className={menuContentClass}>
              {/* City Header */}
              <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-1 rounded-full" style={{ backgroundColor: activeCityColor }}></div>
                    <span className="text-sm font-black text-white uppercase tracking-widest">Select City</span>
                  </div>
                  <div className="flex items-center gap-3">
                     {/* Reset Button */}
                    <button 
                      onClick={() => { setActiveCity(null); setIsMenuOpen(false); }} 
                      className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                      title="Reset Selection"
                    >
                      <RotateCcw size={14} />
                    </button>
                    {/* Close Button */}
                     <button 
                     onClick={() => setIsMenuOpen(false)} 
                     className="w-8 h-8 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                   >
                     <X size={16} />
                   </button>
                  </div>
              </div>
              
              {/* City List */}
              <div className="overflow-y-auto py-2 custom-scrollbar">
                {(Object.keys(cityGroups) as CityName[]).map((city) => (
                  <div key={city} className="flex flex-col">
                    <button onClick={() => handleCityClick(city)} className={`px-6 py-4 flex items-center justify-between transition-colors hover:bg-white/5 ${activeCity === city && !openDay ? 'bg-white/10 text-white' : 'text-gray-300'}`}>
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
                      <div className="bg-white/[0.02] border-y border-white/5 grid grid-cols-2 gap-2 p-4">
                        {cityGroups[city].map((day) => {
                          const isActive = openDay === day.identifier;
                          return (
                            <button key={day.identifier} onClick={(e) => { e.stopPropagation(); setActiveCity(city); setOpenDay(day.identifier); setIsMenuOpen(false); }} 
                              className={`px-3 py-3 text-xs font-bold rounded-xl transition-all text-center ${isActive ? 'text-white shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}
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
          <div className={menuContentClass}>
              {/* Tips Header */}
              <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="h-4 w-1 bg-amber-400 rounded-full"></div>
                    <span className="text-xs font-black text-amber-400 uppercase tracking-widest">Travel Tips</span>
                  </div>
                  
                  {/* Right Actions: Back & Close */}
                  <div className="flex items-center gap-3">
                    {/* Back Button */}
                    <button 
                        onClick={() => setIsMenuOpen(true)}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                        title="Back to Cities"
                    >
                        <ChevronLeft size={18} className="-ml-0.5" />
                    </button>

                    {/* Close Button */}
                    <button 
                        onClick={() => setIsTipsOpen(false)} 
                        className="w-8 h-8 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                        title="Close Tips"
                    >
                        <X size={16} />
                    </button>
                  </div>
              </div>
              <div className="overflow-y-auto py-2 custom-scrollbar">
                {tipsList.map((category) => (
                  <div key={category.title} className="flex flex-col">
                    <button onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)} className={`px-6 py-4 flex items-center justify-between transition-colors hover:bg-white/5 ${expandedCategory === category.title ? 'bg-white/10 text-white' : 'text-gray-300'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-2 h-2 rounded-full ${expandedCategory === category.title ? 'bg-amber-400' : 'bg-transparent border border-white/20'}`} />
                        <span className="text-sm font-black uppercase tracking-wider text-left">{category.title}</span>
                      </div>
                      <ChevronRight size={18} className={`shrink-0 transition-transform duration-300 ${expandedCategory === category.title ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedCategory === category.title && (
                      <div className="bg-white/[0.02] border-y border-white/5 flex flex-col p-4 gap-3">
                        {category.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 px-4 py-4 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="flex flex-col">
                              <div className="text-xs font-black text-white uppercase tracking-wide">{item.name}</div>
                              {item.notes && <div className="text-sm text-gray-300 mt-2 leading-relaxed" dangerouslySetInnerHTML={sanitizeHtml(item.notes)}></div>}
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
      
      {/* --- UNIFIED CONTROLS PILL --- */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] h-14 z-[1001] flex items-center justify-between rounded-full backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300"
          style={{
              backgroundColor: activeCity ? `${activeCityColor}F2` : 'rgba(20,20,20,0.9)',
              borderColor: activeCity ? activeCityColor : 'rgba(255,255,255,0.15)',
              boxShadow: activeCity ? `0 8px 32px ${activeCityColor}4D` : '0 8px 32px rgba(0,0,0,0.5)'
          }}
      >
          {/* Left: Sidebar Toggle */}
          <button 
              onClick={(e) => { e.stopPropagation(); toggleSidebar(); }} 
              className="w-16 h-full flex items-center justify-center border-r border-white/10 hover:bg-white/10 active:bg-white/20 transition-colors"
              title="Itinerary"
          >
              {/* Icon is RED (activeCityColor) when inactive, WHITE when active (to prevent invisible icon on red background) */}
              {isSidebarOpen ? 
                <PanelLeftClose size={20} color={activeCity ? 'white' : activeCityColor} /> : 
                <List size={22} color={activeCity ? 'white' : activeCityColor} />
              }
          </button>

          {/* Center: City Selector */}
          <button 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
              className="flex-1 h-full flex items-center justify-center gap-2 hover:bg-white/10 active:bg-white/20 transition-colors"
          >
              <div className="flex flex-col items-center justify-center leading-tight">
                  <div className="flex items-center gap-2">
                       <span className="text-sm font-black uppercase tracking-widest text-white shadow-sm">
                          {displayTitle()}
                      </span>
                      <ChevronUp size={16} className={`text-white/70 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
              </div>
          </button>

          {/* Right: Info / Tips */}
          <button 
              onClick={(e) => { e.stopPropagation(); setIsTipsOpen(!isTipsOpen); }} 
              className="w-16 h-full flex items-center justify-center border-l border-white/10 hover:bg-white/10 active:bg-white/20 transition-colors"
              title="Tips"
          >
              {/* Icon is YELLOW when inactive, WHITE when active */}
              <Info size={20} color={activeCity ? 'white' : tipsColor} />
          </button>
      </div>

    </div>
  );
};