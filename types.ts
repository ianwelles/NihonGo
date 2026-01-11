export type CityName = 'Tokyo' | 'Kyoto' | 'Osaka' | 'Shanghai';

export interface LocationData {
  name: string;
  lat: number;
  lon: number;
  type: 'travel' | 'sight' | 'food' | 'hotel' | 'suggestion' | 'sight_rec' | 'food_rec' | 'shopping';
  desc: string;
  day: string;
  url: string;
}

export interface LocationsMap {
  [key: string]: LocationData[];
}

export interface ShoppingChecklistItem {
  name: string;
  notes?: string;
}

export interface ShoppingCategory {
  title: string;
  items: ShoppingChecklistItem[];
}

export enum Interest {
  Culture = 'Culture & History',
  Food = 'Food & Dining',
  Nature = 'Nature & Landscapes',
  Shopping = 'Shopping & Fashion',
  Anime = 'Anime & Pop Culture',
  Relaxation = 'Relaxation & Wellness',
  Nightlife = 'Nightlife & Bars',
  Art = 'Art & Museums'
}

export interface UserPreferences {
  duration: number;
  season: string;
  travelers: string;
  budget: string;
  interests: Interest[];
}

export interface Activity {
  time: string;
  activityName: string;
  description: string;
  location: string;
  tips: string;
}

export interface DayItinerary {
  dayNumber: number;
  theme: string;
  city: string;
  activities: Activity[];
}

export interface ItineraryResponse {
  tripTitle: string;
  summary: string;
  days: DayItinerary[];
}