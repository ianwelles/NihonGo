import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CityName, ItineraryResponse } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { CityTabs } from './components/CityTabs';
import { MapContainer } from './components/MapContainer';
import { ShoppingModal } from './components/ShoppingModal';
import { TimelineView } from './components/TimelineView';
import { Controls } from './components/Controls';
import { downloadFullCSV, downloadLogisticsCSV, downloadRecommendationsCSV } from './utils/csvHelper';
import { startDate, itineraryData as initialItineraryData, shoppingList as initialShoppingList } from './data'; 

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
  const [activeCity, setActiveCity] = useState<CityName | null>(null); 
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
  const [itineraryData] = useState<ItineraryResponse | null>({
    days: initialItineraryData,
    shoppingList: initialShoppingList
  });
  const [isLoadingItinerary] = useState(false);
  const [itineraryError] = useState<string | null>(null);

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

  const handleCityChange = useCallback((city: CityName | null) => {
    setActiveCity(city);
    setOpenDay(null);
  }, []);

  // Sync recommendation toggles based on city/day selection state
  useEffect(() => {
    if (activeCity !== null && openDay === null) {
      // Only city selected: toggle recommendations ON
      setToggles({
        sight_rec: true,
        food_rec: true,
        shopping: true,
      });
    } else {
      // Either a specific day is open, or we're in the global overview: toggle recommendations OFF
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

  if (isLoadingItinerary) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Generating your custom itinerary...</p>
      </div>
    );
  };

  if (itineraryError) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-red-500">Error: {itineraryError}</p>
      </div>
    );
  }

  const fullItineraryDays = itineraryData ? itineraryData.days : [];

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
        <div className="h-full overflow-y-auto overflow-x-hidden">
          <div className="p-4 space-y-4">
            <Header
              onDownloadFull={downloadFullCSV}
              onDownloadLogistics={downloadLogisticsCSV}
              onDownloadRecs={downloadRecommendationsCSV}
              isMobile={isMobile}
            />
            <CityTabs
              activeCity={activeCity}
              setActiveCity={handleCityChange}
              isMobile={isMobile}
              onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
              fullItineraryDays={fullItineraryDays}
            />
            <TimelineView 
              activeCity={activeCity}
              openDay={openDay}
              handleToggle={handleToggle}
              fullItineraryDays={fullItineraryDays} 
              startDate={startDate}
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
        />
        {/* Floating Controls Overlay */}
        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 transition-all duration-300 pointer-events-none z-[9999]`}>
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
                onSelectCity={handleCityChange}
              />
          </div>
        </div>
      </main>

      <ShoppingModal isOpen={isShoppingOpen} onClose={() => setIsShoppingOpen(false)} />
    </div>
  );
};

export default App;
