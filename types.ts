export type PlaceCategory = 'hotel' | 'food' | 'sight' | 'travel' | 'shopping' | 'suggestion' | 'sight_rec' | 'food_rec';

export type CityName = 'Tokyo' | 'Kyoto' | 'Osaka' | 'Shanghai';

export interface Place {
  id: string;
  name: string;
  type: PlaceCategory;
  city: CityName; 
  coordinates: {
    lat: number;
    lon: number;
  };
  description: string;
  url?: string;
  hotelMeta?: {
    address: string;
    directions: string;
    neighborhoodInsights: string;
    tags: string[];
  };
}

export interface Activity {
  placeId: string; 
  time: string;
  label?: string; 
  description?: string; 
  tip?: string;
  icon?: string;
  link?: string; 
}

export interface DayItinerary {
  dayNumber: number;
  city: CityName;
  date: string; 
  theme: string;
  hotelId?: string; 
  activities: Activity[];
}

export interface TipItem {
  name: string;
  notes: string;
}

export interface TipCategory {
  title: string;
  items: TipItem[];
}

export interface ItineraryResponse {
  days: DayItinerary[];
  tipsList: TipCategory[];
}
