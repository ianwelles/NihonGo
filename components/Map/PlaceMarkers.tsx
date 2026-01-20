import React, { useEffect, useRef, useCallback } from 'react';
import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { mapMarkerColors as fallbackMapMarkerColors } from '../../theme';
import { Place } from '../../types';
import { useAppStore } from '../../context/AppContext';

const PlaceMarkers = React.memo(({ places, itineraryPlaceIds }: { places: Place[], itineraryPlaceIds: Set<string> }) => {
  const { openPlaceId, setOpenPlaceId, theme } = useAppStore();
  const markerColors = theme.markerColors;
  const markerRefs = useRef<Record<string, L.Marker>>({});
  const map = useMap();

  const { popupPaddingTopLeft, popupPaddingBottomRight } = useAppStore();

  const getIcon = useCallback((type: string, isItinerary: boolean) => {
    const color = markerColors[type] || markerColors['default'] || fallbackMapMarkerColors[type] || fallbackMapMarkerColors['default'] || '#3B82F6';
    const opacity = isItinerary ? 1 : 0.6; // Increased from 0.5 (10% more opaque)
    
    // Scale: 36px base. isItinerary false = 31px (24% larger than original 25px).
    const size = isItinerary ? 36 : 31;

    const pinSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 24 24" 
         width="${size}" 
         height="${size}" 
         style="opacity: ${opacity}; display: block;">
      <path fill="${color}" stroke="#1c1c1c" stroke-width="0.5" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      <circle cx="12" cy="9" r="2.5" fill="#1c1c1c"/>
    </svg>`;

    return L.divIcon({
        className: 'custom-pin',
        html: pinSvg,
        iconSize: [size, size],
        // The bottom tip of the pin is the anchor [center, bottom]
        iconAnchor: [size / 2, size],
        // Offset is relative to iconAnchor. Move up by 'size' to clear the pin.
        popupAnchor: [0, -size]
    });
  }, [markerColors]);

  useEffect(() => {
    if (openPlaceId && markerRefs.current[openPlaceId]) {
      const marker = markerRefs.current[openPlaceId];
      marker.openPopup();
    }
  }, [openPlaceId, map]);

  return (
    <>
      {places.map((place) => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.city}`)}`;
        const displayTags = place.hotelMeta?.tags || place.tags;
        const typeColor = markerColors[place.type] || markerColors['default'] || fallbackMapMarkerColors[place.type] || fallbackMapMarkerColors['default'] || '#00BCD4';
        const isItinerary = itineraryPlaceIds.has(place.id);

        return (
          <Marker
            key={place.id}
            position={[place.coordinates.lat, place.coordinates.lon]}
            icon={getIcon(place.type, isItinerary)}
            zIndexOffset={isItinerary ? 100 : 0}
            ref={el => { if (el) markerRefs.current[place.id] = el; }}
            eventHandlers={{
              click: () => setOpenPlaceId(place.id), 
              popupclose: () => setOpenPlaceId(null), 
            }}
          >
            <Popup keepInView={true} autoPanPaddingTopLeft={popupPaddingTopLeft} autoPanPaddingBottomRight={popupPaddingBottomRight}>
              <div className="text-left min-w-[240px] py-1">
                <span className="font-extrabold text-sm uppercase tracking-widest mb-2 block" style={{ color: typeColor }}>
                  {place.type.replace(/_/g, ' ')}
                </span>
                {place.url ? (
                  <a href={place.url} target="_blank" rel="noopener noreferrer" className="text-2xl font-bold !text-white mb-2 leading-tight inline-block border-b-2 border-white/30 hover:!text-white hover:border-transparent transition-colors duration-200">
                    {place.name}
                  </a>
                ) : (
                  <span className="text-2xl font-bold text-white mb-2 leading-tight block">{place.name}</span>
                )}
                <span className="text-gray-100 text-base leading-relaxed mb-3 block">{place.description}</span>
                {displayTags && displayTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3 mb-5">
                    {displayTags.map((tag, idx) => (
                      <span key={idx} className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">{tag}</span>
                    ))}
                  </div>
                )}
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-black/40 text-white uppercase font-bold text-sm px-6 py-3 rounded-lg border border-white/10 hover:bg-black/60 transition-colors shadow-lg no-underline active:scale-95">
                  <MapPin className="w-4 h-4 mr-2" /> View on Maps
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
});

export default PlaceMarkers;