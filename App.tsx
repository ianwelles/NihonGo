import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CityName, Place, DayItinerary } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { CityTabs } from './components/CityTabs';
import { MapContainer } from './components/MapContainer';
import { TimelineView } from './components/TimelineView';
import { Controls } from './components/Controls';
import { downloadPlacesCSV, downloadItineraryCSV, downloadThemeCSV, downloadTipsCSV } from './utils/csvHelper';
import { loadAppData } from './utils/dataLoader';
import { cityThemeColors as fallbackCityColors, mapMarkerColors as fallbackMarkerColors } from './theme';
import { SlidersHorizontal, Download } from 'lucide-react';

const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};

const PASSWORD_HASH = '9ff855c14133ee4cbe57a39fd5d5c5abe26d4bff63b73476c13f3342410bedc3';

async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const App: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  const [activeCity, setActiveCity] = useState<CityName | null>(null); 
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => !window.matchMedia('(max-width: 767px)').matches);
  const [showControls, setShowControls] = useState(true);
  const [showDownloads, setShowDownloads] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('trip_auth') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const [toggles, setToggles] = useState({
    sight_rec: true,
    food_rec: true,
    bar_rec: true,
    shopping: true,
  });

  const [itineraryData, setItineraryData] = useState<DayItinerary[]>([]);
  const [tipsList, setTipsList] = useState<any[]>([]);
  const [places, setPlaces] = useState<Record<string, Place>>({});
  const [appStartDate, setAppStartDate] = useState<Date>(new Date());
  const [appEndDate, setAppEndDate] = useState<Date>(new Date());
  const [theme, setTheme] = useState({
    cityColors: fallbackCityColors,
    markerColors: fallbackMarkerColors,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mapRef = useRef<any>(null);

  const setMapRef = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAppData();
        setItineraryData(data.itinerary);
        setTipsList(data.tips);
        setPlaces(data.places);
        setAppStartDate(data.startDate);
        setAppEndDate(data.endDate);
        setTheme(data.theme);
        setIsLoading(false);
      } catch (err: any) {
        setError(err.message || 'Failed to load data');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedInput = await hashPassword(password);
    if (hashedInput === PASSWORD_HASH) {
      setIsAuthenticated(true);
      localStorage.setItem('trip_auth', 'true');
    } else {
      setAuthError(true);
    }
  };

  const handleCityChange = useCallback((city: CityName | null) => {
    setActiveCity(city);
    setOpenDay(null);
  }, []);

  useEffect(() => {
    if (activeCity !== null && openDay === null) {
      setToggles({
        sight_rec: true,
        food_rec: true,
        bar_rec: true,
        shopping: true,
      });
    } else {
      setToggles({
        sight_rec: false,
        food_rec: false,
        bar_rec: false,
        shopping: false,
      });
    }
  }, [openDay, activeCity]);

  const handleToggle = (e: React.MouseEvent, dayIdentifier: string) => {
    e.preventDefault();
    setOpenDay(prev => (prev === dayIdentifier ? null : dayIdentifier));
  };

  const toggleCategory = (key: keyof typeof toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isAuthenticated) {
    return (
      <LoginScreen
        password={password}
        setPassword={setPassword}
        authError={authError}
        setAuthError={setAuthError}
        handleLogin={handleLogin}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-black text-white animate-in fade-in duration-500">
        <style>
          {`
            @keyframes sequentialPulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.2; }
            }
            .dot-pulse {
              animation: sequentialPulse 1.5s ease-in-out infinite;
            }
          `}
        </style>

        <div className="relative mb-12">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
          <svg className="w-40 h-40 relative z-10" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="38" fill="black" stroke="#ef4444" strokeWidth="4" />
            <g transform="translate(50 50) rotate(45) scale(4.8) translate(-11.5 -12)">
              <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" fill="white" />
            </g>
          </svg>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="flex items-stretch gap-4 h-[80px] relative mb-4">
            <div className="h-full w-3 shrink-0">
              <svg viewBox="0 0 10 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full overflow-visible">
                <circle cx="5" cy="4.5" r="4.5" fill="#C2185B" className="dot-pulse" style={{ animationDelay: '0s' }} />
                <line x1="5" y1="11" x2="5" y2="23" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="5" cy="30" r="3.5" fill="#558B2F" className="dot-pulse" style={{ animationDelay: '0.2s' }} />
                <line x1="5" y1="36" x2="5" y2="44" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="5" cy="50" r="3.5" fill="#E65100" className="dot-pulse" style={{ animationDelay: '0.4s' }} />
                <line x1="5" y1="57" x2="5" y2="69" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="5" cy="75.5" r="4.5" fill="#0097A7" className="dot-pulse" style={{ animationDelay: '0.6s' }} />
              </svg>
            </div>

            <div className="flex flex-col h-full justify-between">
              <h1 className="flex flex-col h-full justify-between items-start">
                <span 
                  className="font-black tracking-tighter leading-none text-[2.2rem] md:text-[2.6rem]"
                  style={{ color: '#C2185B', textShadow: '0 0 12px rgba(194, 24, 91, 0.5)' }}
                >
                  SEND NOODS
                </span>
                <span 
                  className="font-black tracking-tighter leading-none text-[2.2rem] md:text-[2.6rem]"
                  style={{ color: '#0097A7', textShadow: '0 0 12px rgba(0, 151, 167, 0.5)' }}
                >
                  DIM SUM MORE
                </span>
              </h1>
            </div>
          </div>

          <p className="text-gray-400 text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase pt-10 text-center">
            Generating your custom itinerary
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md w-full text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2 text-red-500 uppercase">Oops! Something went wrong</h2>
          <p className="text-gray-400 text-sm"><span>{error}</span></p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
          >
            Try Refreshing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900 text-white md:flex relative">
      {isSidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <aside
        className={`bg-black/80 backdrop-blur-sm z-[70] h-full transition-all duration-300 ease-in-out overflow-hidden fixed top-0 left-0 w-11/12 max-w-sm shadow-2xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
          <div className="p-4 space-y-4">
            <Header
              isMobile={isMobile}
              startDate={appStartDate}
              endDate={appEndDate}
              activeCity={activeCity}
            />
            <CityTabs
              activeCity={activeCity}
              setActiveCity={handleCityChange}
              isMobile={isMobile}
              onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
              fullItineraryDays={itineraryData}
              cityColors={theme.cityColors}
            />
            <TimelineView 
              activeCity={activeCity}
              openDay={openDay}
              handleToggle={handleToggle}
              fullItineraryDays={itineraryData} 
              startDate={appStartDate}
              places={places}
              cityColors={theme.cityColors}
            />

            <div className="mt-8 pb-4">
              <button
                onClick={() => setShowDownloads(prev => !prev)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30"
              >
                <div className="flex items-center gap-2">
                  <Download size={14} />
                  <span>Downloads</span>
                </div>
                <SlidersHorizontal size={14} className={`${showDownloads ? 'rotate-90' : ''} transition-transform duration-300`} />
              </button>
              {showDownloads && (
                <div className="flex flex-col gap-3 w-full mt-4 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => downloadPlacesCSV(places)} className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full">
                        <Download size={14} /> <span>Places</span>
                      </button>
                      <button onClick={() => downloadItineraryCSV(itineraryData)} className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full">
                        <Download size={14} /> <span>Itinerary</span>
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button onClick={() => downloadThemeCSV(theme.cityColors, theme.markerColors)} className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full">
                        <Download size={14} /> <span>Theme</span>
                      </button>
                      <button onClick={() => downloadTipsCSV(tipsList)} className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-xs font-bold text-gray-300 hover:text-white hover:border-white/30 w-full">
                        <Download size={14} /> <span>Tips</span>
                      </button>
                    </div>
                  </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      <main className="h-full flex-1 relative min-w-0 z-0">
        <MapContainer
          activeCity={activeCity}
          openDay={openDay}
          isAuthenticated={isAuthenticated}
          toggles={toggles}
          setMapRef={setMapRef}
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
          itineraryData={itineraryData}
          places={places}
          markerColors={theme.markerColors}
        />

        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] transition-all duration-500 pointer-events-none mb-[env(safe-area-inset-bottom)]
            ${!isMobile && isSidebarOpen ? 'md:left-[calc(50%+192px)]' : ''}
            ${!showControls ? 'translate-y-0 opacity-100' : 'translate-y-[150%] opacity-0'}`}
        >
          <button
            onClick={() => setShowControls(true)}
            className="active:scale-90 transition-all duration-300 hover:scale-110 pointer-events-auto"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-red-600/40 blur-xl rounded-full group-hover:bg-red-500/60 transition-colors" />
              <div className="relative w-16 h-16 flex items-center justify-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="32" fill="black" stroke="#ef4444" strokeWidth="4" />
                  <g transform="translate(50 50) rotate(45) scale(4.2) translate(-11.5 -12)">
                    <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" fill="white" />
                  </g>
                </svg>
              </div>
            </div>
          </button>
        </div>

        <div 
          className={`fixed bottom-8 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 transition-all duration-500 pointer-events-none z-[9999] mb-[env(safe-area-inset-bottom)] 
            ${!isMobile && isSidebarOpen ? 'md:left-[calc(50%+192px)]' : ''}
            ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}`}
        >
          <div className="pointer-events-auto">
            <Controls
                toggles={toggles}
                toggleCategory={toggleCategory}
                openDay={openDay}
                isSidebarOpen={isSidebarOpen}
                isMobile={isMobile}
                onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
                activeCity={activeCity}
                onSelectDay={(dayIdentifier) => setOpenDay(dayIdentifier)}
                onSelectCity={handleCityChange}
                itineraryData={itineraryData}
                tipsList={tipsList}
                onHide={() => setShowControls(false)}
                cityColors={theme.cityColors}
                markerColors={theme.markerColors}
              />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;