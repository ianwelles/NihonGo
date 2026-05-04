export interface Trip {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    cities: City[];
}

export interface City {
    name: string;
    country: string;
    lat: number;
    lng: number;
    zoom: number;
}

export interface Place {
    id: string;
    city: string;
    name: string;
    type: string;
    theme: string;
    description: string;
    lat: number;
    lng: number;
    visited: boolean;
    rating: number;
    photos: string[];
    notes: string;
}

export interface Itinerary {
    days: Day[];
}

export interface Day {
    day: string;
    title: string;
    theme: string;
    places: string[];
}

export interface Theme {
    name: string;
    icon: string;
}

export interface Toggles {
    theme: { [key: string]: boolean };
    type: { [key: string]: boolean };
    visited: boolean;
}

export interface AppState {
    trip: Trip | null;
    places: Place[];
    itineraryData: Itinerary;
    themes: Theme[];
    tips: any[];
    activeCity: City['name'] | 'all';
    openDay: Day['day'] | 'all';
    toggles: Toggles;
    isSidebarOpen: boolean;
    isMobile: boolean;
    isLoading: boolean;
    isAuthenticated: boolean;
    user: any;
    birthDate: string;
}

export interface AppContextType extends AppState {
    login: (password: string) => Promise<boolean>;
    logout: () => void;
    setActiveCity: (city: City['name'] | 'all') => void;
    setOpenDay: (day: Day['day'] | 'all') => void;
    setSidebarOpen: (isOpen: boolean) => void;
toggleFilter: (group: 'theme' | 'type' | 'visited', key: string, value?: boolean) => void;
    updateItinerary: (updatedItinerary: Itinerary) => Promise<void>;
    updatePlace: (updatedPlace: Place) => Promise<void>;
}
