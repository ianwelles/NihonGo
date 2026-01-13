import { CityName } from './types';

export const cityThemeColors: { [key in CityName]: string } = {
  "Tokyo": "#FF1744",
  "Kyoto": "#00B0FF",
  "Osaka": "#FFEA00",
  "Shanghai": "#76FF03"
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
  "default": "#82b1ff"
};
