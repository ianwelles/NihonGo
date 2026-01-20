import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CityName, Place, DayItinerary, TipCategory } from '../types';
import { loadAppData } from '../utils/dataLoader';
import { cityThemeColors as fallbackCityColors, mapMarkerColors as fallbackMarkerColors } from '../theme';
import L from 'leaflet'; // Import Leaflet
import { SIDEBAR_WIDTH } from '../components/Map/mapConstants'; // Import SIDEBAR_WIDTH

type Toggles = Record<string, boolean>;

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
  popupPaddingTopLeft: L.PointExpression;
  popupPaddingBottomRight: L.PointExpression;

  // Actions
  setActiveCity: (city: CityName | null) => void;
  setOpenDay: (dayId: string | null) => void;
  setOpenPlaceId: (placeId: string | null) => void;
  toggleCategory: (key: string) => void;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSidebar: () => void;
  // No explicit setter for padding, as it's derived
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
  const [toggles, setToggles] = useState<Toggles>({});
  const [popupPaddingTopLeft, setPopupPaddingTopLeft] = useState<L.PointExpression>(L.point(50, 100));
  const [popupPaddingBottomRight, setPopupPaddingBottomRight] = useState<L.PointExpression>(L.point(50, 100));

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

        // Discover all unique place types from the data to initialize toggles
        const types = new Set<string>();
        Object.values(data.places).forEach(place => {
          // Exclude hotel as it's usually handled differently
          if (place.type !== 'hotel' && place.type !== 'suggestion') {
            types.add(place.type);
          }
        });

        const initialToggles: Toggles = {};
        types.forEach(type => {
          initialToggles[type] = false;
        });
        setToggles(initialToggles);

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
    setToggles(prev => {
      const nextToggles = { ...prev };
      const keys = Object.keys(nextToggles);
      
      if (activeCity !== null && openDay === null) {
        keys.forEach(key => {
          nextToggles[key] = true;
        });
      } else {
        keys.forEach(key => {
          nextToggles[key] = false;
        });
      }
      return nextToggles;
    });
  }, [openDay, activeCity]);

  // Calculate popup padding based on sidebar and window size
  const calculatePopupPadding = useCallback(() => {
    const isMobileView = window.innerWidth < 768;

    if (isMobileView) {
      setPopupPaddingTopLeft(L.point(50, 100));
      setPopupPaddingBottomRight(L.point(50, 100));
    } else {
      const leftPadding = isSidebarOpen ? SIDEBAR_WIDTH + 60 : 50;
      setPopupPaddingTopLeft(L.point(leftPadding, 100));
      setPopupPaddingBottomRight(L.point(50, 100));
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    calculatePopupPadding();
    window.addEventListener('resize', calculatePopupPadding);
    return () => window.removeEventListener('resize', calculatePopupPadding);
  }, [calculatePopupPadding]);

  // Actions
  const handleCityChange = useCallback((city: CityName | null) => {
    setActiveCity(city);
    setOpenDay(null);
    setOpenPlaceId(null);
  }, []);

  const handleDayChange = useCallback((dayId: string | null) => {
    setOpenDay(prev => (prev === dayId ? null : dayId));
    setOpenPlaceId(null);
  }, []);

  const toggleCategory = useCallback((key: string) => {
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
    popupPaddingTopLeft,
    popupPaddingBottomRight,
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