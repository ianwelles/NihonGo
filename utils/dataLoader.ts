import { AppData, Place, Theme } from '../types';
import { places as fallbackPlaces } from '../places';
import { itineraryData as fallbackItinerary, startDate as fallbackStartDate, endDate as fallbackEndDate } from '../itinerary';
import { cityThemeColors as fallbackCityColors, mapMarkerColors as fallbackMarkerColors } from '../theme';
import { tipsList as fallbackTips } from '../tips';
import DataWorker from './data.worker.ts?worker';

interface InitialData {
  places: Record<string, Place>;
  theme: Theme;
}

export const loadAppData = async (
  onInitialDataLoaded?: (data: InitialData) => void
): Promise<AppData> => {
  const fallbackData: AppData = {
    places: fallbackPlaces,
    itinerary: fallbackItinerary,
    startDate: fallbackStartDate,
    endDate: fallbackEndDate,
    theme: {
      cityColors: fallbackCityColors,
      markerColors: fallbackMarkerColors,
    },
    tips: fallbackTips,
  };

  return new Promise((resolve) => {
    const worker = new DataWorker();

    const timeoutId = setTimeout(() => {
        worker.terminate();
        console.warn('Data worker timed out, using fallback data.');
        if (onInitialDataLoaded) {
          onInitialDataLoaded({ places: fallbackData.places, theme: fallbackData.theme });
        }
        resolve(fallbackData);
    }, 10000); // 10 second timeout

    worker.onmessage = (event) => {
        const { type, data, error } = event.data;

        if (type === 'INITIAL_DATA_READY') {
            if (onInitialDataLoaded) {
                onInitialDataLoaded(data);
            }
        } else if (type === 'FULL_DATA_READY') {
            clearTimeout(timeoutId);
            // Need to reconstruct Date objects because JSON serialization converts them to strings
            if (data.startDate) data.startDate = new Date(data.startDate);
            if (data.endDate) data.endDate = new Date(data.endDate);
            resolve(data);
            worker.terminate();
        } else if (type === 'ERROR') {
            clearTimeout(timeoutId);
            console.error('Worker error:', error);
            if (onInitialDataLoaded) {
              onInitialDataLoaded({ places: fallbackData.places, theme: fallbackData.theme });
            }
            resolve(fallbackData);
            worker.terminate();
        }
    };

    worker.onerror = (error) => {
        clearTimeout(timeoutId);
        console.error('Worker failed:', error);
        if (onInitialDataLoaded) {
          onInitialDataLoaded({ places: fallbackData.places, theme: fallbackData.theme });
        }
        resolve(fallbackData);
        worker.terminate();
    };

    worker.postMessage({ type: 'START' });
  });
};

export type { AppData };
