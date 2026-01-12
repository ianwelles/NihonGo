export type PlaceCategory = 'hotel' | 'food' | 'sight' | 'travel' | 'shopping' | 'suggestion' | 'sight_rec' | 'food_rec';

export type CityName = 'Tokyo' | 'Kyoto' | 'Osaka' | 'Shanghai';

export interface Place {
  id: string;
  name: string;
  type: PlaceCategory;
  city: CityName; // Added field
  coordinates: {
    lat: number;
    lon: number;
  };
  description: string;
  url?: string;
  // Hotel-specific metadata (optional)
  hotelMeta?: {
    address: string;
    directions: string;
    neighborhoodInsights: string;
    tags: string[];
  };
}

export interface Activity {
  placeId: string; // References the Place dictionary
  time: string;
  label?: string; // Overrides Place name if needed
  description?: string; // Overrides static Place description if needed
  tip?: string;
  icon?: string;
  link?: string; // Optional override link
}

export interface DayItinerary {
  dayNumber: number;
  city: CityName;
  date: string; 
  theme: string;
  hotelId?: string; 
  activities: Activity[];
}

export interface ShoppingItem {
  name: string;
  notes: string;
}

export interface ShoppingCategory {
  title: string;
  items: ShoppingItem[];
}