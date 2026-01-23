import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; 
import 'leaflet/dist/leaflet.css';
import { registerSW } from 'virtual:pwa-register';

// Register the Service Worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App is ready for offline work.');
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
