
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Trip, Place, Itinerary, Theme, Day, City, Toggles, AppState, AppContextType } from '../types';
import { DataLoader } from '../utils/dataLoader';

const AppContext = createContext<AppContextType | undefined>(undefined);

const dataLoader = new DataLoader();

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    trip: null,
    places: [],
    itineraryData: { days: [] },
    themes: [],
    tips: [],
    activeCity: 'all',
    openDay: 'all',
    toggles: {
      theme: { 'Gardens': true, 'Museums': true, 'Shimanami Kaido': true, 'Temples': true, 'Castles': true },
      type: { 'Activity': true, 'Food': true, 'Shopping': true, 'Accommodation': true, 'Travel': true },
      visited: false,
    },
    isSidebarOpen: true,
    isMobile: window.innerWidth < 768,
    isLoading: true,
    isAuthenticated: false,
    user: null,
    birthDate: '2026-02-02'
  });

  const checkAuth = useCallback(async () => {
    try {
      const user = await dataLoader.checkAuth();
      if (user) {
        setState(prevState => ({ ...prevState, isAuthenticated: true, user: user, isLoading: false }));
        loadInitialData();
      } else {
        setState(prevState => ({ ...prevState, isAuthenticated: false, user: null, isLoading: false }));
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setState(prevState => ({ ...prevState, isAuthenticated: false, user: null, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    checkAuth();
    
    const handleResize = () => {
      setState(prevState => ({ ...prevState, isMobile: window.innerWidth < 768 }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [checkAuth]);

  const loadInitialData = useCallback(async () => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const [trip, places, itineraryData, themes, tips] = await dataLoader.loadAllData();

      const initialCity = trip?.cities?.[0]?.name.toLowerCase() || 'all';

      setState(prevState => ({
        ...prevState,
        trip,
        places,
        itineraryData,
        themes,
        tips,
        activeCity: initialCity,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Failed to load initial data:", error);
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }, []);

  const login = useCallback(async (password: string) => {
    setState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const user = await dataLoader.login(password);
      if (user) {
        setState(prevState => ({ ...prevState, isAuthenticated: true, user: user, isLoading: false }));
        loadInitialData();
        return true;
      } else {
        setState(prevState => ({ ...prevState, isAuthenticated: false, user: null, isLoading: false }));
        return false;
      }
    } catch (error) {
      console.error("Login failed:", error);
      setState(prevState => ({ ...prevState, isAuthenticated: false, user: null, isLoading: false }));
      return false;
    }
  }, [loadInitialData]);

  const logout = useCallback(async () => {
    try {
      await dataLoader.logout();
      setState(prevState => ({
        ...prevState,
        isAuthenticated: false,
        user: null,
        trip: null,
        places: [],
        itineraryData: { days: [] },
      }));
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  const setActiveCity = useCallback((city: City | 'all') => {
    setState(prevState => ({ ...prevState, activeCity: city, openDay: 'all' }));
  }, []);

  const setOpenDay = useCallback((day: Day['day'] | 'all') => {
    setState(prevState => ({ ...prevState, openDay: day }));
  }, []);

_
  const setSidebarOpen = useCallback((isOpen: boolean) => {
    setState(prevState => ({ ...prevState, isSidebarOpen: isOpen }));
  }, []);

  const toggleFilter = useCallback((group: 'theme' | 'type' | 'visited', key: string, value?: boolean) => {
    setState(prevState => {
      const newToggles = { ...prevState.toggles };
      if (group === 'visited') {
        newToggles.visited = value !== undefined ? value : !newToggles.visited;
      } else {
        const currentGroup = { ...newToggles[group] };
        currentGroup[key] = value !== undefined ? value : !currentGroup[key];
        newToggles[group] = currentGroup;
      }
      return { ...prevState, toggles: newToggles };
    });
  }, []);
  
  const updateItinerary = useCallback(async (updatedItinerary: Itinerary) => {
    try {
      await dataLoader.saveItinerary(updatedItinerary);
      setState(prevState => ({...prevState, itineraryData: updatedItinerary}));
    } catch (error) {
      console.error("Failed to update itinerary:", error);
    }
  }, []);

  const updatePlace = useCallback(async (updatedPlace: Place) => {
    try {
      await dataLoader.savePlace(updatedPlace);
      setState(prevState => {
        const newPlaces = prevState.places.map(p => p.id === updatedPlace.id ? updatedPlace : p);
        return {...prevState, places: newPlaces};
      });
    } catch (error) {
      console.error("Failed to update place:", error);
    }
  }, []);


  const value = useMemo(() => ({
    ...state,
    login,
    logout,
    setActiveCity,
    setOpenDay,
    setSidebarOpen,
    toggleFilter,
    updateItinerary,
    updatePlace
  }), [state, login, logout, setActiveCity, setOpenDay, setSidebarOpen, toggleFilter, updateItinerary, updatePlace]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
