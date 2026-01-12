import { CityName } from './types';

// --- Colour Configurations ---
export const cityThemeColors: { [key in CityName]: string } = {
  Tokyo: '#FF1744',
  Kyoto: '#00B0FF',
  Osaka: '#FFEA00',
  Shanghai: '#76FF03',
};

export const mapMarkerColors: Record<string, string> = {
  'hotel': '#ffe0b2',     // Orange
  'food': '#ff8a80',      // Red
  'sight': '#b9f6ca',     // Green
  'travel': '#82b1ff',    // Blue
  'suggestion': '#d500f9',// Purple
  'sight_rec': '#00BCD4', // Cyan/Teal
  'food_rec': '#F48FB1',  // Soft Pink
  'shopping': '#FFD700',  // Gold
  'default': '#82b1ff'
};