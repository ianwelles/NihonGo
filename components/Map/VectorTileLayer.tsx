import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import '@maplibre/maplibre-gl-leaflet';

const VectorTileLayer = () => {
  const map = useMap();

  useEffect(() => {
    // @ts-ignore
    const glLayer = L.maplibreGL({
      style: '/map-style.json', 
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OSM</a> © <a href="https://carto.com/attributions">CARTO</a>'
    });

    glLayer.addTo(map);

    return () => {
      map.removeLayer(glLayer);
    };
  }, [map]);

  return null;
};

export default VectorTileLayer;