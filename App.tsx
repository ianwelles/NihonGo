import React, { useState, useCallback } from 'react';
import L from 'leaflet';
import { AppProvider, useAppStore } from './context/AppContext';
import { LoginScreen } from './components/LoginScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { downloadPlacesCSV, downloadItineraryCSV, downloadThemeCSV, downloadTipsCSV } from './utils/csvHelper';
import { SlidersHorizontal, Download } from 'lucide-react';

const Header = React.lazy(() => import('./components/Header').then(module => ({ default: module.Header })));
const CityTabs = React.lazy(() => import('./components/CityTabs').then(module => ({ default: module.CityTabs })));
const MapContainer = React.lazy(() => import('./components/MapContainer').then(module => ({ default: module.MapContainer })));
const TimelineView = React.lazy(() => import('./components/TimelineView').then(module => ({ default: module.TimelineView })));
const Controls = React.lazy(() => import('./components/Controls').then(module => ({ default: module.Controls })));

const PASSWORD_HASH = '9ff855c14133ee4cbe57a39fd5d5c5abe26d4bff63b73476c13f3342410bedc3';

async function hashPassword(password: string): Promise<string> {
  const msgUint8 = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

const AppContent: React.FC = () => {
  const {
    itineraryData,
    tipsList,
    places,
    theme,
    startDate,
    endDate,
    isLoading,
    error,
    activeCity,
    openDay,
    isSidebarOpen,
    isMobile,
    setIsSidebarOpen,
    setActiveCity
  } = useAppStore();

  const [showDownloads, setShowDownloads] = useState(false);
  const [mapRef, setMapRef] = useState<L.Map | null>(null);

  const handleSetMapRef = useCallback((map: L.Map) => {
    setMapRef(map);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="h-screen-safe w-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
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
    <React.Suspense fallback={<LoadingScreen />}>
      <div className={`h-screen-safe w-screen overflow-hidden bg-gray-900 text-white grid grid-cols-1 transition-[grid-template-columns] duration-300 ease-in-out relative
        ${isSidebarOpen && !isMobile ? 'md:grid-cols-[384px_1fr]' : 'md:grid-cols-[0px_1fr]'}
      `}>
        {/* Backdrop - refactored from conditional rendering to CSS-controlled visibility */}
        <div 
          className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden
            ${isSidebarOpen && isMobile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}
          onClick={() => setIsSidebarOpen(false)}
        />
        
        <aside
          className={`bg-black/80 backdrop-blur-sm z-[70] h-full transition-all duration-300 ease-in-out overflow-hidden shadow-2xl
            ${isMobile ? 'fixed top-0 left-0 w-11/12 max-w-sm' : 'relative w-[384px]'}
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
        >
          <div className="h-full overflow-y-auto overflow-x-hidden pb-[env(safe-area-inset-bottom)]">
            <div className="p-4 space-y-4">
              <Header />
              <CityTabs />
              <TimelineView />

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

        <main className="h-full relative min-w-0 z-0">
          <MapContainer
            isAuthenticated={true}
            setMapRef={handleSetMapRef}
          />

          <div className="absolute inset-0 pointer-events-none z-[9999]">
            <div className="pointer-events-none h-full w-full relative">
              <Controls />
            </div>
          </div>
        </main>
      </div>
    </React.Suspense>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => localStorage.getItem('trip_auth') === 'true');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

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

  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;