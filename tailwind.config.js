/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        // These colors are inferred from your existing component styles
        'primary': '#FF1744', // Vivid Red (from CityTabs active, Timeline day numbers)
        'accent': '#82b1ff',  // Bright Blue (from general links)
        'bg': '#000000',      // Pure Black Background (from body style)
        'card-bg': '#1c1c1c', // Dark Grey for cards (from TimelineView)
        'border': '#444',     // Border colour (from TimelineView)
        'text': '#ffffff',    // Main text
        'sub-text': '#dddddd',// Secondary text
        'popup-bg': '#1c1c1c', // From Leaflet popup overrides
        'popup-btn': '#8ab4f8', // From Leaflet popup overrides
        'popup-text': '#202124',// From Leaflet popup overrides
        
        // Specific accent colors for map toggles
        'sight-rec-teal': '#00BCD4',
        'food-rec-pink': '#F48FB1',
        'shopping-gold': '#FFD700',
        'amber-200': '#fcd34d',
        'amber-500': '#f59e0b',
      },
      boxShadow: {
        // Inferred from custom shadow classes
        'custom': '0 4px 8px rgba(0,0,0,0.5)',
      },
      borderRadius: {
        // Standardized to match new design
        'xl': '12px',
        '2xl': '16px',
      },
      fontSize: {
        'xl-base': '1.25rem', // 20px
      }
    },
  },
  plugins: [],
}