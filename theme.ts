import { CityName } from './types';

export const cityThemeColors: { [key in CityName]: string } = {
  "Tokyo": "#C2185B",
  "Kyoto": "#558B2F",
  "Osaka": "#E65100",
  "Shanghai": "#0097A7"
};

export const mapMarkerColors: Record<string, string> = {
  "hotel": "#ffe0b2",
  "food": "#ff8a80",
  "sight": "#b9f6ca",
  "travel": "#82b1ff",
  "suggestion": "#d500f9",
  "sight_rec": "#00BCD4",
  "food_rec": "#F48FB1",
  "shopping": "#FFD700",
  "bar": "#007BFF",
  "default": "#82b1ff"
};
