import React, { useState, useRef, useEffect, useMemo } from 'react';
import { PanelLeftClose, Map as MapIcon, Calendar, ChevronUp, ChevronRight, Info, RotateCcw, Menu, ChevronLeft, List, X, Search, MapPin } from 'lucide-react';
import { CityName, Place } from '../types';
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
    isMobile,
    places,
    setOpenPlaceId,
    toggles,
    toggleCategory,
    setOpenPlaceId: setGlobalOpenPlaceId // Alias if needed, but setOpenPlaceId is already destructured
  } = useAppStore();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTipsOpen, setIsTipsOpen] = useState(false);
  const [expandedCity, setExpandedCity] = useState<CityName | null>(activeCity || null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
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

  // --- Search Logic ---
  const allPlaces = useMemo(() => Object.values(places), [places]);

  const searchResults = useMemo(() => {
    // 1. If typing, search everything
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const filtered = allPlaces.filter(place => {
        const nameMatch = place.name.toLowerCase().includes(query);
        const tagsMatch = place.tags?.some(tag => tag.toLowerCase().includes(query)) || 
                          place.hotelMeta?.tags?.some(tag => tag.toLowerCase().includes(query));
        return nameMatch || tagsMatch;
      });

      // Prioritize active city, then alphabetical
      return filtered.sort((a, b) => {
        if (activeCity) {
            const aIsActive = a.city === activeCity;
            const bIsActive = b.city === activeCity;
            if (aIsActive && !bIsActive) return -1;
            if (!aIsActive && bIsActive) return 1;
        }
        return a.name.localeCompare(b.name);
      }).slice(0, 10);
    }
    
    // 2. If focused and city is active, prepopulate with city places
    if (isSearchFocused && activeCity) {
        return allPlaces
            .filter(p => p.city === activeCity)
            .sort((a, b) => a.name.localeCompare(b.name));
    }

    return [];
  }, [searchQuery, allPlaces, isSearchFocused, activeCity]);

  const handleSelectPlace = (place: Place) => {
    // 1. Determine if place is in an itinerary day
    let foundDayId: string | null = null;
    
    for (const day of itineraryData) {
        const isActivity = day.activities.some(act => act.placeId === place.id);
        
        // Handle potential type/data mismatch for hotel
        // @ts-ignore
        const isHotelSingle = day.hotelId === place.id;
        const isHotelArray = day.hotelIds ? day.hotelIds.includes(place.id) : false;
        
        if (isActivity || isHotelSingle || isHotelArray) {
            foundDayId = `day${day.dayNumber}-${day.city}`;
            break;
        }
    }

    // 2. Set Context
    setActiveCity(place.city);
    
    if (foundDayId) {
        setOpenDay(foundDayId);
    } else {
        setOpenDay(null);
    }

    // 3. Ensure visibility
    if (place.type !== 'hotel' && place.type !== 'suggestion') {
        if (!toggles[place.type]) {
            toggleCategory(place.type);
        }
    }

    // 4. Open Place & Close Menu
    setOpenPlaceId(place.id);
    setSearchQuery('');
    setIsSearchFocused(false);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        setIsTipsOpen(false);
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      setIsTipsOpen(false);
      if (activeCity) setExpandedCity(activeCity);
      // Reset search when opening menu
      setSearchQuery(''); 
      setIsSearchFocused(false);
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
  
  const menuContainerClass = "absolute bottom-28 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-[2002] flex flex-col pointer-events-none";

  const menuContentClass = `w-full bg-[#121212]/95 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col ${popupMaxHeightClass} animate-in slide-in-from-bottom-4 fade-in duration-300 pointer-events-auto`;

  return (
    <div className="w-full h-full relative pointer-events-none" ref={menuRef}>
      
      {/* --- POPUP MENUS (CITY & TIPS) --- */}
      <div className={menuContainerClass}>
        
        {isMenuOpen && (
          <div className={menuContentClass}>
              {/* City Header */}
              <div className="px-6 py-5 bg-white/5 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-1.5 rounded-full" style={{ backgroundColor: activeCityColor }}></div>
                    <span className="text-base font-black text-white uppercase tracking-widest">Select City</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => { setActiveCity(null); setIsMenuOpen(false); }} 
                      className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                      title="Reset Selection"
                    >
                      <RotateCcw size={18} />
                    </button>
                     <button 
                     onClick={() => setIsMenuOpen(false)} 
                     className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                   >
                     <X size={20} />
                   </button>
                  </div>
              </div>

              {/* Search Input */}
              <div className="px-6 py-3 border-b border-white/5 bg-white/[0.02]">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-10 py-2.5 border border-white/10 rounded-xl leading-5 bg-black/40 text-gray-100 placeholder-gray-500 focus:outline-none focus:bg-black/60 focus:ring-1 focus:ring-white/30 focus:border-white/30 sm:text-sm transition-all duration-200"
                        placeholder="Search places & tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                    />
                    {(searchQuery || isSearchFocused) && (
                        <button 
                            onClick={() => { 
                                if (searchQuery) {
                                    setSearchQuery(''); 
                                    setIsSearchFocused(true); 
                                } else {
                                    setIsSearchFocused(false);
                                }
                            }}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500 hover:text-white"
                        >
                            {searchQuery ? <X size={16} /> : <ChevronLeft size={16} />}
                        </button>
                    )}
                </div>
              </div>
              
              {/* City List OR Search Results */}
              <div className="overflow-y-auto py-2 custom-scrollbar flex-1">
                {(searchQuery || (isSearchFocused && activeCity)) ? (
                    // Search Results (Filtered or Prepopulated)
                    searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((place) => {
                                const isCurrentCity = activeCity && place.city === activeCity;
                                return (
                                <li key={place.id}>
                                    <button
                                        onClick={() => handleSelectPlace(place)}
                                        className="w-full text-left px-6 py-3 hover:bg-white/5 transition-colors duration-150 border-b border-white/5 last:border-0 group"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <p className="font-bold text-gray-200 group-hover:text-white transition-colors text-sm">{place.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] uppercase font-bold tracking-wider text-gray-500 border border-white/10 px-1.5 py-0.5 rounded">{place.type}</span>
                                                    <span 
                                                        className={`text-xs flex items-center gap-1 ${isCurrentCity ? 'font-bold' : 'text-gray-500'}`}
                                                        style={isCurrentCity ? { color: activeCityColor } : {}}
                                                    >
                                                        <MapPin size={10} /> {place.city}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {(place.tags || place.hotelMeta?.tags) && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {(place.hotelMeta?.tags || place.tags || []).slice(0, 3).map((tag, i) => (
                                                    <span key={i} className="text-[9px] text-gray-500 px-1 rounded bg-white/5">{tag}</span>
                                                ))}
                                            </div>
                                        )}
                                    </button>
                                </li>
                            );})}
                        </ul>
                    ) : (
                        <div className="px-6 py-8 text-center text-gray-500 text-sm">
                             {searchQuery ? `No places found matching "${searchQuery}"` : "No places in this city"}
                        </div>
                    )
                ) : (
                  // City List
                  (Object.keys(cityGroups) as CityName[]).map((city) => (
                    <div key={city} className="flex flex-col">
                      <button onClick={() => handleCityClick(city)} className={`px-6 py-5 flex items-center justify-between transition-colors hover:bg-white/5 ${activeCity === city && !openDay ? 'bg-white/10 text-white' : 'text-gray-300'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-3 h-3 rounded-full" style={activeCity === city ? { backgroundColor: activeCityColor } : { backgroundColor: 'transparent', border: '1px solid rgba(255,255,255,0.2)' }} />
                          <span className="text-base font-black uppercase tracking-wider">{city}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          {activeCity === city && !openDay && <span className="text-xs font-bold tracking-tighter" style={{ color: activeCityColor }}>ACTIVE</span>}
                          <ChevronRight size={22} className={`transition-transform duration-300 ${expandedCity === city ? 'rotate-90' : ''}`} />
                        </div>
                      </button>
                      {expandedCity === city && (
                        <div className="bg-white/[0.02] border-y border-white/5 grid grid-cols-2 gap-3 p-5">
                          {cityGroups[city].map((day) => {
                            const isActive = openDay === day.identifier;
                            return (
                              <button key={day.identifier} onClick={(e) => { e.stopPropagation(); setActiveCity(city); setOpenDay(day.identifier); setIsMenuOpen(false); }} 
                                className={`px-4 py-4 text-sm font-black rounded-xl transition-all text-center ${isActive ? 'text-white shadow-lg' : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'}`}
                                style={isActive ? { backgroundColor: activeCityColor } : {}}
                              >
                                {day.label}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
          </div>
        )}

        {isTipsOpen && (
          <div className={menuContentClass}>
              {/* Tips Header */}
              <div className="px-6 py-5 bg-white/5 border-b border-white/10 flex justify-between items-center flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-1.5 bg-amber-400 rounded-full"></div>
                    <span className="text-base font-black text-amber-400 uppercase tracking-widest">Travel Tips</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsTipsOpen(false)} 
                        className="w-10 h-10 rounded-full bg-transparent border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all"
                        title="Close Tips"
                    >
                        <X size={20} />
                    </button>
                  </div>
              </div>
              <div className="overflow-y-auto py-2 custom-scrollbar">
                {tipsList.map((category) => (
                  <div key={category.title} className="flex flex-col">
                    <button onClick={() => setExpandedCategory(expandedCategory === category.title ? null : category.title)} className={`px-6 py-5 flex items-center justify-between transition-colors hover:bg-white/5 ${expandedCategory === category.title ? 'bg-white/10 text-white' : 'text-gray-300'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-3 h-3 rounded-full ${expandedCategory === category.title ? 'bg-amber-400' : 'bg-transparent border border-white/20'}`} />
                        <span className="text-base font-black uppercase tracking-wider text-left">{category.title}</span>
                      </div>
                      <ChevronRight size={22} className={`shrink-0 transition-transform duration-300 ${expandedCategory === category.title ? 'rotate-90' : ''}`} />
                    </button>
                    {expandedCategory === category.title && (
                      <div className="bg-white/[0.02] border-y border-white/5 flex flex-col p-5 gap-4">
                        {category.items.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-4 px-5 py-5 bg-white/5 border border-white/5 rounded-2xl">
                            <div className="flex flex-col">
                              <div className="text-sm font-black text-white uppercase tracking-wide">{item.name}</div>
                              {item.notes && <div className="text-base text-gray-300 mt-2.5 leading-relaxed" dangerouslySetInnerHTML={sanitizeHtml(item.notes)}></div>}
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-16 z-[1001] flex items-center justify-between rounded-full backdrop-blur-xl border shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 pointer-events-auto"
          style={{
              backgroundColor: activeCity ? `${activeCityColor}F2` : 'rgba(20,20,20,0.9)',
              borderColor: activeCity ? activeCityColor : 'rgba(255,255,255,0.15)',
              boxShadow: activeCity ? `0 8px 32px ${activeCityColor}4D` : '0 8px 32px rgba(0,0,0,0.5)'
          }}
      >
          {/* Left: Sidebar Toggle */}
          <button 
              onClick={(e) => { e.stopPropagation(); toggleSidebar(); }} 
              className="w-20 h-full flex items-center justify-center border-r border-white/10 hover:bg-white/10 active:bg-white/20 transition-colors"
              title="Itinerary"
          >
              {isSidebarOpen ? 
                <PanelLeftClose size={24} color={activeCity ? 'white' : activeCityColor} /> : 
                <List size={26} color={activeCity ? 'white' : activeCityColor} />
              }
          </button>

          {/* Center: City Selector */}
          <button 
              onClick={(e) => { e.stopPropagation(); setIsMenuOpen(!isMenuOpen); }} 
              className="flex-1 h-full flex items-center justify-center gap-3 hover:bg-white/10 active:bg-white/20 transition-colors"
          >
              <div className="flex flex-col items-center justify-center leading-tight">
                  <div className="flex items-center gap-3">
                       <span className="text-base font-black uppercase tracking-widest text-white shadow-sm">
                          {displayTitle()}
                      </span>
                      <ChevronUp size={20} className={`text-white/70 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </div>
              </div>
          </button>

          {/* Right: Info / Tips */}
          <button 
              onClick={(e) => { e.stopPropagation(); setIsTipsOpen(!isTipsOpen); }} 
              className="w-20 h-full flex items-center justify-center border-l border-white/10 hover:bg-white/10 active:bg-white/20 transition-colors"
              title="Tips"
          >
              <Info size={24} color={activeCity ? 'white' : tipsColor} />
          </button>
      </div>

    </div>
  );
};
