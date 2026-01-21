# Map Component Reference

The `MapContainer` component is the central hub for the mapping functionality, built on top of **React-Leaflet**. It coordinates data from the `AppContext` to determine what to display on the map and handles high-level map UI states like fullscreen mode.

## 1. Data Source: `AppContext`
The map relies heavily on `useAppStore()` (the hook for `AppContext`) to access global state:
*   **Active Selection:** `activeCity` and `openDay` are used to filter which places should be visible.
*   **Data:** `places` (all available locations) and `itineraryData` (the scheduled activities).
*   **UI Controls:** `toggles` (to show/hide specific categories like restaurants or shrines) and `isSidebarOpen`/`isMobile` (to adjust map layout and padding).
*   **Filtering Logic:** Inside `MapContainer`, several `useMemo` hooks (like `filteredPlaces` and `displayPlaces`) process this state to decide exactly which markers should appear on the map at any given time. For example, if a specific day is selected, it prioritizes showing places for that day's itinerary plus any extra places of a type currently toggled "on".

## 2. Imports & Component Structure
The component imports several specialized sub-components to keep its logic clean:
*   **Leaflet Core:** `MapContainer as LeafletMap` from `react-leaflet` provides the map instance.
*   **Custom Map Layers & Markers:**
    *   `VectorTileLayer`: Likely handles the base map style (MapLibre/MVT).
    *   `PlaceMarkers`: Renders the individual markers for filtered places.
    *   `UserLocationMarker`: Shows the user's current GPS position.
*   **Behavioral Controllers:**
    *   `MapController`: Synchronizes the map's view (zoom/center) when `activeCity` or `openDay` changes.
    *   `CityZoomDetector`: Detects zoom levels to perhaps change state when the user zooms in/out of a city.
    *   `PopupManager`: Manages the display and auto-closing of place popups.
*   **UI Elements:**
    *   `MapControls`: Internal UI for things like the fullscreen toggle.

## 3. Key Functionalities
*   **Dynamic Filtering:** It identifies "itinerary place IDs" to ensure that places scheduled in the trip are prioritized or styled differently.
*   **Fullscreen API:** It manages its own fullscreen state using a `ref` and the browser's Fullscreen API.
*   **Responsive Padding:** It uses the `isSidebarOpen` and `isMobile` flags from the context to potentially adjust where the map focuses or how popups are offset (though much of this padding logic is actually calculated within the `AppContext` itself and passed down).

In summary, `MapContainer` acts as the orchestrator that takes the "What" from `AppContext` and distributes it to specialized "How" components within the `Map/` directory.
