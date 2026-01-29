import L from 'leaflet';

// Standard Leaflet icon fix for default markers
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export const getUserIcon = (heading: number | null) => L.divIcon({
  className: 'user-location-marker',
  html: `
    <div class="relative flex items-center justify-center">
      ${heading !== null ? `
        <div class="absolute transition-transform duration-200" style="transform: rotate(${heading}deg); width: 60px; height: 60px; pointer-events: none;">
          <svg viewBox="0 0 100 100" class="w-full h-full">
            <defs>
              <radialGradient id="beamGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stop-color="#3B82F6" stop-opacity="0.4" />
                <stop offset="100%" stop-color="#3B82F6" stop-opacity="0" />
              </radialGradient>
            </defs>
            <path d="M50 50 L30 0 A 50 50 0 0 1 70 0 Z" fill="url(#beamGradient)" />
          </svg>
        </div>
      ` : ''}
      <div class="absolute -inset-2 bg-blue-500 rounded-full opacity-25"></div>
      <div class="relative bg-blue-500 border-2 border-white rounded-full w-4 h-4 shadow-lg z-10"></div>
    </div>
  `,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

export const SIDEBAR_WIDTH = 384;