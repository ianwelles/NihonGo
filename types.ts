export type CityName = 'Tokyo' | 'Kyoto' | 'Osaka' | 'Shanghai';

export interface Activity {
  time: string;
  label: string;
  description: string;
  link?: string;
  tip?: string;
  icon?: string;
}

export interface Hotel {
  name: string;
  address: string;
  officialSite: string;
  directions: string;
  neighborhoodInsights: string;
  tags: string[];
}

export interface DayItinerary {
  dayNumber: number;
  city: CityName;
  theme: string;
  date: string; // e.g., "Tue 18 Feb"
  activities: Activity[];
  hotel?: Hotel;
}

export interface ShoppingItem {
  name: string;
  notes?: string;
}

export interface ShoppingCategory {
  title: string;
  items: ShoppingItem[];
}

export type LocationType = "travel" | "sight" | "food" | "hotel" | "suggestion" | "sight_rec" | "food_rec" | "shopping";

export interface LocationItem {
  name: string;
  lat: number;
  lon: number;
  type: LocationType;
  desc: string;
  day: string;
  url: string;
}

export type LocationsMap = { [city in CityName]: LocationItem[] };

export type CityThemeColors = {
  [key in CityName]: { 
    primary: string;
    accent: string; 
  };
};

export type MapMarkerColors = {
  [key in LocationType]: string;
};

export enum Interest {
  Culture = 'Culture',
  Food = 'Food',
  Shopping = 'Shopping',
  Nature = 'Nature',
  Anime = 'Anime',
  Nightlife = 'Nightlife',
  Relaxation = 'Relaxation',
  Art = 'Art',
}

export interface ItineraryResponse {
  days: DayItinerary[];
  shoppingList: ShoppingCategory[];
}

export interface UserPreferences {
  duration: number;
  season: string;
  travelers: string;
  budget: string;
  interests: Interest[];
}
