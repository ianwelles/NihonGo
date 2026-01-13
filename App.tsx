import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CityName, ItineraryResponse, Place, DayItinerary } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { CityTabs } from './components/CityTabs';
import { MapContainer } from './components/MapContainer';
import { TimelineView } from './components/TimelineView';
import { Controls } from './components/Controls';
import { downloadPlacesCSV, downloadItineraryCSV, downloadThemeCSV, downloadTipsCSV } from './utils/csvHelper';
import { loadAppData } from './utils/dataLoader';
import { LayoutPanelTop, SlidersHorizontal } from 'lucide-react';

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

// SHA-256 hash of 'password'
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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('trip_auth') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const [toggles, setToggles] = useState({
    sight_rec: true,
    food_rec: true,
    shopping: true,
  });

  // State for data
  const [itineraryData, setItineraryData] = useState<DayItinerary[]>([]);
  const [tipsList, setTipsList] = useState<any[]>([]);
  const [places, setPlaces] = useState<Record<string, Place>>({});
  const [appStartDate, setAppStartDate] = useState<Date>(new Date());
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

  // Sync recommendation toggles based on city/day selection state
  useEffect(() => {
    if (activeCity !== null && openDay === null) {
      setToggles({
        sight_rec: true,
        food_rec: true,
        shopping: true,
      });
    } else {
      setToggles({
        sight_rec: false,
        food_rec: false,
        shopping: false,
      });
    }
  }, [openDay, activeCity]);

  const handleToggle = (e: React.MouseEvent, dayId: string) => {
    e.preventDefault();
    setOpenDay(prev => (prev === dayId ? null : dayId));
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
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white animate-in fade-in duration-500">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full" />
          <svg className="w-32 h-32 relative z-10 animate-pulse" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="32" fill="black" stroke="#ef4444" strokeWidth="4" />
            <g transform="translate(50 50) rotate(45) scale(4.2) translate(-11.5 -12)">
              <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" fill="white" />
            </g>
          </svg>
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter">
            Send Noods & Dim Sum More
          </h1>
          <div className="flex items-center justify-center gap-2">
            <div className="h-1 w-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="h-1 w-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="h-1 w-1 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <p className="text-gray-400 text-sm font-medium tracking-widest uppercase pt-4">
            Generating your custom itinerary
          </p>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-md w-full text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold mb-2 text-red-500 uppercase">Oops! Something went wrong</h2>
          <p className="text-gray-400 text-sm">{error}</p>
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
      {/* Backdrop for mobile drawer */}
      {isSidebarOpen && (
        <div 
          className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm ${isMobile ? '' : 'md:hidden'}`}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`bg-black/80 backdrop-blur-sm z-[70] h-full transition-all duration-300 ease-in-out overflow-hidden fixed top-0 left-0 w-11/12 max-w-sm shadow-2xl
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
          <div className="p-4 space-y-4">
            <Header
              onDownloadPlaces={() => downloadPlacesCSV()}
              onDownloadItinerary={() => downloadItineraryCSV()}
              onDownloadTheme={() => downloadThemeCSV()}
              onDownloadTips={() => downloadTipsCSV()}
              isMobile={isMobile}
            />
            <CityTabs
              activeCity={activeCity}
              setActiveCity={handleCityChange}
              isMobile={isMobile}
              onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
              fullItineraryDays={itineraryData}
            />
            <TimelineView 
              activeCity={activeCity}
              openDay={openDay}
              handleToggle={handleToggle}
              fullItineraryDays={itineraryData} 
              startDate={appStartDate}
              places={places}
            />
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
        />

        {/* Floating Toggle for Controls (when hidden) */}
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
              {/* Glow effect */}
              <div className="absolute inset-0 bg-red-600/40 blur-xl rounded-full group-hover:bg-red-500/60 transition-colors" />
              
              {/* Favicon-style Button - Consistent with Loading Screen and Favicon */}
              <div className="relative w-16 h-16 flex items-center justify-center drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100">
                  {/* Black Circle with Red Border */}
                  <circle cx="50" cy="50" r="32" fill="black" stroke="#ef4444" strokeWidth="4" />
                  {/* Plane Icon - Scaled to be bigger than the circle */}
                  <g transform="translate(50 50) rotate(45) scale(4.2) translate(-11.5 -12)">
                    <path d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" fill="white" />
                  </g>
                </svg>
              </div>
            </div>
          </button>
        </div>

        {/* Floating Controls Overlay */}
        <div 
          className={`fixed bottom-8 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 transition-all duration-500 pointer-events-none z-[9999] mb-[env(safe-area-inset-bottom)] 
            ${!isMobile && isSidebarOpen ? 'md:left-[calc(50%+192px)]' : ''}
            ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}
            `}
        >
          <div className="pointer-events-auto">
            <Controls
                toggles={toggles}
                toggleCategory={toggleCategory}
                openDay={openDay}
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
                isMobile={isMobile}
                activeCity={activeCity}
                onSelectDay={(day) => setOpenDay(day)}
                onSelectCity={handleCityChange}
                itineraryData={itineraryData}
                tipsList={tipsList}
                onHide={() => setShowControls(false)}
              />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
