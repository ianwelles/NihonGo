import React from 'react';
import { CityName, DayItinerary, Activity } from '../types';
import { itineraryData } from '../data';
import { Plus, Info, MapPin, Clock } from 'lucide-react';

interface TimelineViewProps {
  activeCity: CityName;
  openDay: string | null;
  handleToggle: (e: React.MouseEvent, dayId: string) => void;
}

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-black/30 rounded-lg border border-white/10">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
            {activity.icon && <span className="text-lg">{activity.icon}</span>}
            <Clock size={14} className="text-gray-400" />
            <span>{activity.time}</span>
        </div>
        <h4 className="text-lg font-bold text-white leading-tight">{activity.label}</h4>
        <p className="text-sm text-gray-300 leading-relaxed">{activity.description}</p>
        {activity.link && (
          <a href={activity.link} target="_blank" rel="noreferrer" className="text-primary hover:underline text-sm">
            Learn more
          </a>
        )}
        {activity.tip && (
            <div className="flex items-start gap-2 text-xs text-amber-200 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20 mt-2">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed"><span className="font-bold uppercase tracking-wider text-[10px] block mb-0.5">Tip:</span> {activity.tip}</p>
            </div>
        )}
    </div>
  );
};

export const TimelineView: React.FC<TimelineViewProps> = ({ activeCity, openDay, handleToggle }) => {
  const filteredItinerary = itineraryData.filter(day => day.city === activeCity);

  return (
    <div className="w-full max-w-4xl mx-auto pb-24">
      {filteredItinerary.map((day) => (
        <details 
            key={day.dayNumber}
            open={openDay === `day${day.dayNumber}`}
            className="group bg-card-bg rounded-2xl border border-border overflow-hidden transition-all duration-300 mb-4"
        >
          <summary 
              onClick={(e) => handleToggle(e, `day${day.dayNumber}`)}
              className="p-5 cursor-pointer list-none flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
                <span className="text-xl font-bold text-[#FF1744] min-w-[3.5rem]">Day {day.dayNumber}</span>
                <div className="flex flex-col items-start border-l border-white/10 pl-4">
                    <span className="text-lg font-bold text-white leading-tight">{day.theme}</span>
                    <span className="text-sm font-medium text-gray-400 mt-0.5">{day.date}</span>
                </div>
            </div>
            <Plus className={`text-gray-400 transition-transform duration-300 ${openDay === `day${day.dayNumber}` ? 'rotate-45' : ''}`} />
          </summary>
          <div className="day-content p-5 pt-0 text-gray-200 border-t border-white/5 flex flex-col gap-4">
            {day.activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}

            {day.hotel && (
              <div className="hotel-section bg-[#121212] rounded-2xl border border-border overflow-hidden mt-10 mb-8 shadow-2xl">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-border">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Base Camp</span>
                      <span className="text-sub-text font-bold text-xs uppercase tracking-widest">Selected Hotel</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-2 leading-none uppercase tracking-tighter">{day.hotel.name}</h3>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed italic">{day.hotel.address}</p>
                    <div className="flex gap-3">
                      <a href={day.hotel.officialSite} target="_blank" rel="noreferrer" className="flex-1 text-center py-3 bg-white text-black font-black text-xs rounded-lg hover:bg-accent hover:text-white transition-all uppercase tracking-widest no-underline border-none">Official Site</a>
                      <a href={day.hotel.directions} target="_blank" rel="noreferrer" className="flex-1 text-center py-3 border border-white/20 text-white font-bold text-xs rounded-lg hover:bg-white/5 transition-all uppercase tracking-widest no-underline">Directions</a>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-8 bg-neutral-900/50 flex flex-col justify-center">
                    <h4 className="text-[11px] font-black text-primary uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                      <span className="w-8 h-[1px] bg-primary"></span> Neighborhood Insights
                    </h4>
                    <p className="text-sm text-sub-text leading-relaxed font-medium">
                      {day.hotel.neighborhoodInsights}
                    </p>
                    <div className="mt-5 flex gap-2">
                      {day.hotel.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-[9px] font-black uppercase text-white/30 tracking-widest border border-white/10 px-2 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </details>
      ))}
    </div>
  );
};
