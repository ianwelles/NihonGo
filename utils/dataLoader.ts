import { AppData } from '../types';
import { places as fallbackPlaces } from '../places';
import { itineraryData as fallbackItinerary, startDate as fallbackStartDate, endDate as fallbackEndDate } from '../itinerary';
import { cityThemeColors as fallbackCityColors, mapMarkerColors as fallbackMarkerColors } from '../theme';
import { tipsList as fallbackTips } from '../tips';
import DataWorker from './data.worker.ts?worker';

export const loadAppData = async (): Promise<AppData> => {
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
        resolve(fallbackData);
    }, 10000); // 10 second timeout

    worker.onmessage = (event) => {
        clearTimeout(timeoutId);
        const { type, data, error } = event.data;

        if (type === 'SUCCESS') {
            // Need to reconstruct Date objects because JSON serialization converts them to strings
            if (data.startDate) data.startDate = new Date(data.startDate);
            if (data.endDate) data.endDate = new Date(data.endDate);
            resolve(data);
        } else {
            console.error('Worker error:', error);
            resolve(fallbackData);
        }
        worker.terminate();
    };

    worker.onerror = (error) => {
        clearTimeout(timeoutId);
        console.error('Worker failed:', error);
        resolve(fallbackData);
        worker.terminate();
    };

    worker.postMessage({ type: 'START' });
  });
};

export type { AppData };
