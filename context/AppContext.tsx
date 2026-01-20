import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CityName, Place, DayItinerary, TipCategory, AppData } from '../types';
import { loadAppData } from '../utils/dataLoader';
import { cityThemeColors as fallbackCityColors, mapMarkerColors as fallbackMarkerColors } from '../theme';

interface Toggles {
  sight_rec: boolean;
  food_rec: boolean;
  bar_rec: boolean;
  shopping: boolean;
}

interface AppContextType {
  // Data
  itineraryData: DayItinerary[];
  tipsList: TipCategory[];
  places: Record<string, Place>;
  theme: {
    cityColors: Record<string, string>;
    markerColors: Record<string, string>;
  };
  startDate: Date;
  endDate: Date;
  isLoading: boolean;
  error: string | null;

  // UI State
  activeCity: CityName | null;
  openDay: string | null;
  openPlaceId: string | null;
  toggles: Toggles;
  isSidebarOpen: boolean;
  isMobile: boolean;

  // Actions
  setActiveCity: (city: CityName | null) => void;
  setOpenDay: (dayId: string | null) => void;
  setOpenPlaceId: (placeId: string | null) => void;
  toggleCategory: (key: keyof Toggles) => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

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

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  
  // Data State
  const [itineraryData, setItineraryData] = useState<DayItinerary[]>([]);
  const [tipsList, setTipsList] = useState<TipCategory[]>([]);
  const [places, setPlaces] = useState<Record<string, Place>>({});
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [theme, setTheme] = useState({
    cityColors: fallbackCityColors,
    markerColors: fallbackMarkerColors,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI State
  const [activeCity, setActiveCity] = useState<CityName | null>(null);
  const [openDay, setOpenDay] = useState<string | null>(null);
  const [openPlaceId, setOpenPlaceId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => !window.matchMedia('(max-width: 767px)').matches);
  const [toggles, setToggles] = useState<Toggles>({
    sight_rec: false,
    food_rec: false,
    bar_rec: false,
    shopping: false,
  });

  // Load Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAppData();
        setItineraryData(data.itinerary);
        setTipsList(data.tips);
        setPlaces(data.places);
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setTheme(data.theme);
        setIsLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Manage Toggles Logic based on City/Day selection
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

  // Actions
  const handleCityChange = useCallback((city: CityName | null) => {
    setActiveCity(city);
    setOpenDay(null);
    setOpenPlaceId(null);
  }, []);

  const handleDayChange = useCallback((dayId: string | null) => {
    // If clicking the same day, close it (toggle behavior handled in components usually, but explicit setter here)
    setOpenDay(prev => (prev === dayId ? null : dayId));
    setOpenPlaceId(null);
  }, []);

  const toggleCategory = useCallback((key: keyof Toggles) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const value = {
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
    openPlaceId,
    toggles,
    isSidebarOpen,
    isMobile,
    setActiveCity: handleCityChange,
    setOpenDay: handleDayChange,
    setOpenPlaceId,
    toggleCategory,
    setIsSidebarOpen,
    toggleSidebar
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
