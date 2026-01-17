import { CityName } from './types';

export const cityThemeColors: { [key in CityName]: string } = {
  "Tokyo": "#C2185B",
  "Kyoto": "#558B2F",
  "Osaka": "#E65100",
  "Shanghai": "#0097A7"
};

export const mapMarkerColors: Record<string, string> = {
  "hotel": "#fff9c4",
  "food": "#ff3131",
  "sight": "#39ff14",
  "travel": "#00e5ff",
  "suggestion": "#ff00ff",
  "sight_rec": "#ccff00",
  "food_rec": "#ff5e00",
  "shopping": "#ffff00",
  "bar": "#1f51ff",
  "default": "#e0e0e0",
  "bar_rec": "#bc13fe"
};
