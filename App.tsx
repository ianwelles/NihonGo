import React, { useState, useEffect } from 'react';
import { CityName } from './types';
import { LoginScreen } from './components/LoginScreen';
import { Header } from './components/Header';
import { CityTabs } from './components/CityTabs';
import { MapContainer } from './components/MapContainer';
import { ShoppingModal } from './components/ShoppingModal';
import { TimelineView } from './components/TimelineView';
import { downloadFullCSV, downloadLogisticsCSV, downloadRecommendationsCSV } from './utils/csvHelper';

const App: React.FC = () => {
  const [activeCity, setActiveCity] = useState<CityName>('Tokyo');
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [isShoppingOpen, setIsShoppingOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('trip_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Otto45') {
      setIsAuthenticated(true);
      localStorage.setItem('trip_auth', 'true');
    } else {
      setAuthError(true);
    }
  };

  useEffect(() => { setOpenDay(null); }, [activeCity]);

  const handleToggle = (e: React.MouseEvent, dayId: string) => {
    e.preventDefault();
    setOpenDay(prev => prev === dayId ? null : dayId);
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
    <div className="p-4 text-xl-base">
      <Header 
        onDownloadFull={downloadFullCSV}
        onDownloadLogistics={downloadLogisticsCSV}
        onDownloadRecs={downloadRecommendationsCSV}
      />

      <CityTabs activeCity={activeCity} setActiveCity={setActiveCity} />

      <MapContainer 
        activeCity={activeCity} 
        openDay={openDay} 
        isAuthenticated={isAuthenticated} 
        onOpenShopping={() => setIsShoppingOpen(true)}
      />

      <ShoppingModal isOpen={isShoppingOpen} onClose={() => setIsShoppingOpen(false)} />

      <TimelineView 
        activeCity={activeCity}
        openDay={openDay}
        handleToggle={handleToggle}
      />
    </div>
  );
};

export default App;