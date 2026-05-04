
import React from 'react';
import MapContainer from './components/MapContainer';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import LoginScreen from './components/LoginScreen';
import InstallPrompt from './components/InstallPrompt';
import BirthdayCelebration from './components/BirthdayCelebration';
import TipJarModal from './components/TipJarModal';
import { AppProvider, useAppStore } from './context/AppContext';

const App: React.FC = () => {
  const { isLoading, isAuthenticated, birthDate } = useAppStore();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-gray-900 text-gray-100">
      <Header />
      <MapContainer />
      <InstallPrompt />
      <BirthdayCelebration birthDate={birthDate} />
      <TipJarModal />
    </div>
  );
};

const AppWrapper: React.FC = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWrapper;
