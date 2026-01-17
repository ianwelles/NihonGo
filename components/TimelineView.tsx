import React, { useRef, useEffect } from 'react';
import { CityName, DayItinerary, Activity, Place } from '../types';
import { Plus, Info, MapPin, Clock, ExternalLink } from 'lucide-react';

interface TimelineViewProps {
  activeCity: CityName | null;
  openDay: string | null;
  handleToggle: (e: React.MouseEvent, dayId: string) => void;
  fullItineraryDays: DayItinerary[];
  startDate: Date;
  places: Record<string, Place>;
  cityColors?: Record<string, string>;
  onActivityClick: (placeId: string) => void;
}

const ActivityCard: React.FC<{ activity: Activity; places: Record<string, Place>; onActivityClick: (placeId: string) => void }> = ({ activity, places, onActivityClick }) => {
  const place = places[activity.placeId];

  if (!place) {
    return (
      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-sm">
        Place not found: {activity.placeId}
      </div>
    );
  }

  const name = activity.label || place.name;
  const description = activity.description || place.description;
  const url = activity.link || place.url;

  return (
    <div 
      className="flex flex-col gap-2 p-4 bg-black/30 rounded-lg border border-white/10 cursor-pointer hover:bg-black/50 transition-colors duration-200"
      onClick={() => onActivityClick(place.id)}
    >
        <div className="flex items-center gap-2 text-sm font-bold text-white">
            {activity.icon && <span className="text-lg">{activity.icon}</span>}
            <Clock size={14} className="text-gray-400" />
            <span>{activity.time}</span>
        </div>
        <h4 className="text-lg font-bold text-white leading-tight">
          {url ? (
            <a href={url} target="_blank" rel="noreferrer" className="text-white hover:text-[#FF1744] transition-colors flex items-center gap-1">
              {name}
              <ExternalLink size={14} className="opacity-50" />
            </a>
          ) : (
            name
          )}
        </h4>
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
        {activity.tip && (
            <div className="flex items-start gap-2 text-xs text-amber-200 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20 mt-2">
                <div className="flex flex-col">
                  <span className="font-bold uppercase tracking-wider text-[10px] block mb-0.5 text-amber-500">Tip:</span>
                  <p className="leading-relaxed">{activity.tip}</p>
                </div>
            </div>
        )}
    </div>
  );
};

const HotelCard: React.FC<{ place: Place, activeCityColor: string }> = ({ place, activeCityColor }) => {
  if (!place.hotelMeta) return null;

  return (
    <div className="hotel-section bg-[#121212] rounded-2xl border border-border overflow-hidden mt-10 mb-8 shadow-2xl">
      <div className="flex flex-col">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest" style={{ backgroundColor: activeCityColor }}>Base Camp</span>
            <span className="text-sub-text font-bold text-xs uppercase tracking-widest">Selected Hotel</span>
          </div>
          <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase tracking-tighter">{place.name}</h3>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed italic">{place.hotelMeta.address}</p>
          <div className="flex gap-3">
            {place.url && (
              <a href={place.url} target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-white text-black font-black text-xs rounded-lg hover:bg-opacity-90 transition-all uppercase tracking-widest no-underline border-none">Official Site</a>
            )}
            <a href={place.hotelMeta.directions} target="_blank" rel="noreferrer" className="flex-1 text-center py-3 border border-white/20 text-white font-bold text-xs rounded-lg hover:bg-white/5 transition-all uppercase tracking-widest no-underline">Directions</a>
          </div>
        </div>
        <div className="p-8 bg-neutral-900/50 flex flex-col justify-center">
          <h4 className="text-[11px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2" style={{ color: activeCityColor }}>
            <span className="w-8 h-[1px]" style={{ backgroundColor: activeCityColor }}></span> Neighborhood Insights
          </h4>
          <p className="text-sm text-sub-text leading-relaxed font-medium">
            {place.hotelMeta.neighborhoodInsights}
          </p>
          <div className="mt-5 flex gap-2">
            {place.hotelMeta.tags.map((tag, tagIndex) => (
              <span key={tagIndex} className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const TimelineView: React.FC<TimelineViewProps> = ({ activeCity, openDay, handleToggle, fullItineraryDays, startDate, places, cityColors = {}, onActivityClick }) => {
  if (!activeCity) {
    return (
      <div className="py-12 px-6 text-center bg-card-bg rounded-2xl border border-border">
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
          <MapPin size={32} className="text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Select a City</h3>
        <p className="text-gray-400 leading-relaxed">Choose a city above to view your curated itinerary and daily highlights.</p>
      </div>
    );
  }

  const filteredItineraryDays = fullItineraryDays.filter(day => day.city === activeCity);
  const activeCityColor = cityColors[activeCity] || '#FF1744';

  const detailsRefs = useRef<Record<string, HTMLDetailsElement | null>>({});

  useEffect(() => {
    if (openDay && detailsRefs.current[openDay]) {
      detailsRefs.current[openDay]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [openDay]);

  return (
    <div className="w-full pb-24">
      {filteredItineraryDays.map((day, index) => {
        const dayIndexInFullItinerary = fullItineraryDays.findIndex(d => d.dayNumber === day.dayNumber && d.city === day.city);

        const nextDayInFullItinerary = fullItineraryDays[dayIndexInFullItinerary + 1];
        const isLastDayInCity = !nextDayInFullItinerary || nextDayInFullItinerary.city !== day.city;

        let cityHotels: Place[] = [];
        if (isLastDayInCity) {
            const cityDays = fullItineraryDays.filter(d => d.city === day.city);
            const hotelIds = new Set<string>();
            cityDays.forEach(d => {
                if (d.hotelIds) {
                    d.hotelIds.forEach(id => hotelIds.add(id));
                }
            });
            cityHotels = Array.from(hotelIds).map(id => places[id]).filter(Boolean);
        }

        const dayIdentifier = `day${day.dayNumber}-${day.city}`;

        return (
          <React.Fragment key={dayIdentifier}>
            <details
                ref={(el) => (detailsRefs.current[dayIdentifier] = el)}
                open={openDay === dayIdentifier}
                className="group bg-card-bg rounded-2xl border border-border overflow-hidden transition-all duration-300 mb-4"
            >
              <summary
                  onClick={(e) => handleToggle(e, dayIdentifier)}
                  className="p-5 cursor-pointer list-none flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                    <span className="text-xl md:text-base font-bold min-w-[3.5rem]" style={{ color: activeCityColor }}>Day {day.dayNumber}</span>
                    <div className="flex flex-col items-start border-l border-white/10 pl-4">
                        <span className="text-lg font-bold text-white leading-tight">{day.theme}</span>
                        <span className="text-sm font-medium text-gray-400 mt-0.5">{day.date}</span>
                    </div>
                </div>
                <Plus className={`text-gray-400 transition-transform duration-300 ${openDay === dayIdentifier ? 'rotate-45' : ''}`} />
              </summary>
              <div className="day-content p-5 pt-0 text-gray-200 border-t border-white/5 flex flex-col gap-4">
                {day.activities.map((activity, activityIndex) => (
                  <ActivityCard key={activityIndex} activity={activity} places={places} onActivityClick={onActivityClick} />
                ))}
              </div>
            </details>
            {isLastDayInCity && cityHotels.map(hotel => (
                <HotelCard key={hotel.id} place={hotel} activeCityColor={activeCityColor} />
            ))}
          </React.Fragment>
        );
      })}
    </div>
  );
};
