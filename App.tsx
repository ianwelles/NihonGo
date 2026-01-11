import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CityName, ItineraryResponse, UserPreferences, Interest, DayItinerary } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { CityTabs } from './components/CityTabs';
import { MapContainer } from './components/MapContainer';
import { ShoppingModal } from './components/ShoppingModal';
import { TimelineView } from './components/TimelineView';
import { Controls } from './components/Controls';
import { downloadFullCSV, downloadLogisticsCSV, downloadRecommendationsCSV } from './utils/csvHelper';
import { generateItinerary } from './services/geminiService';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { startDate } from './data'; // To calculate dates for itinerary

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

const App: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [activeCity, setActiveCity] = useState<CityName>('Tokyo');
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => !window.matchMedia('(max-width: 767px)').matches);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('trip_auth') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const [toggles, setToggles] = useState({
    sight_rec: true,
    food_rec: true,
    shopping: true,
  });

  // State for itinerary data
  const [itineraryData, setItineraryData] = useState<ItineraryResponse | null>(null);
  const [isLoadingItinerary, setIsLoadingItinerary] = useState(false);
  const [itineraryError, setItineraryError] = useState<string | null>(null);

  const mapRef = useRef<any>(null);

  const setMapRef = useCallback((map: any) => {
    mapRef.current = map;
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Otto45') {
      setIsAuthenticated(true);
      localStorage.setItem('trip_auth', 'true');
    } else {
      setAuthError(true);
    }
  };

  // Dummy preferences for itinerary generation (replace with actual form data later)
  const dummyPreferences: UserPreferences = {
    duration: 11, 
    season: 'Spring',
    travelers: 'Couple',
    budget: 'Mid-range',
    interests: [Interest.Culture, Interest.Food, Interest.Shopping, Interest.Nature, Interest.Anime, Interest.Nightlife, Interest.Relaxation, Interest.Art],
  };

  // Fetch itinerary on component mount
  useEffect(() => {
    const fetchItinerary = async () => {
      setIsLoadingItinerary(true);
      setItineraryError(null);
      try {
        const data = await generateItinerary(dummyPreferences);
        setItineraryData(data);
      } catch (error) {
        console.error("Failed to fetch itinerary:", error);
        setItineraryError("Failed to load itinerary. Please try again later.");
      } finally {
        setIsLoadingItinerary(false);
      }
    };
    if (isAuthenticated && !itineraryData) { // Only fetch if authenticated and no data yet
      fetchItinerary();
    }
  }, [isAuthenticated, itineraryData]);

  // Filter itinerary days based on active city
  const filteredItineraryDays: DayItinerary[] = useMemo(() => {
    if (!itineraryData) return [];
    return itineraryData.days.filter(day => day.city === activeCity);
  }, [itineraryData, activeCity]);

  useEffect(() => {
    setOpenDay(null);
  }, [activeCity]);

  useEffect(() => {
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 300); 
  }, [isSidebarOpen]);

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

  if (isLoadingItinerary) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Generating your custom itinerary...</p>
      </div>
    );
  }

  if (itineraryError) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-red-500">Error: {itineraryError}</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-900 text-white md:flex relative">
      {/* Backdrop for mobile drawer */}
      {isMobile && isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`bg-black/80 backdrop-blur-sm z-[70] h-full transition-all duration-300 ease-in-out overflow-hidden
          ${isMobile 
            ? `fixed top-0 left-0 w-11/12 max-w-sm shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}` 
            : `relative ${isSidebarOpen ? 'w-[450px]' : 'w-0'}`
          }`}
      >
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <div className="p-4 space-y-4 md:min-w-[450px]">
            <Header
              onDownloadFull={downloadFullCSV}
              onDownloadLogistics={downloadLogisticsCSV}
              onDownloadRecs={downloadRecommendationsCSV}
            />
            <CityTabs activeCity={activeCity} setActiveCity={setActiveCity} />
            <TimelineView 
              activeCity={activeCity}
              openDay={openDay}
              handleToggle={handleToggle}
              itineraryDays={filteredItineraryDays}
              startDate={startDate} // Pass startDate for date calculation
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
        />
        {/* Floating Controls Overlay */}
        <div className={`left-1/2 -translate-x-1/2 w-full max-w-sm px-4 transition-all duration-300 pointer-events-none
          ${isMobile 
            ? 'fixed bottom-8 z-[9999]' 
            : 'absolute top-4 z-[50]'
          }
        `}>
          <div className="pointer-events-auto">
            <Controls
                toggles={toggles}
                toggleCategory={toggleCategory}
                onOpenShopping={() => setIsShoppingOpen(true)}
                openDay={openDay}
                isSidebarOpen={isSidebarOpen}
                onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
                isMobile={isMobile}
                activeCity={activeCity}
                onSelectDay={(day) => setOpenDay(day)}
              />
          </div>
        </div>
      </main>

      {/* Desktop Toggle Button (Only visible on desktop) */}
      {!isMobile && (
        <button 
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="absolute top-4 left-4 z-[9999] p-2 rounded-lg bg-gray-900/80 text-white hover:bg-gray-800 border border-white/20 shadow-lg backdrop-blur-sm transition-all"
          aria-label={isSidebarOpen ? 'Close Itinerary' : 'Open Itinerary'}
        >
          {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
        </button>
      )}

      <ShoppingModal isOpen={isShoppingOpen} onClose={() => setIsShoppingOpen(false)} />
    </div>
  );
};

export default App;
