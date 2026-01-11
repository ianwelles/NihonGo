import React from 'react';
import { CityName, DayItinerary, Activity } from '../types';
import { Plus, Info, MapPin, Clock } from 'lucide-react';

interface TimelineViewProps {
  activeCity: CityName;
  openDay: string | null;
  handleToggle: (e: React.MouseEvent, dayId: string) => void;
  itineraryDays: DayItinerary[];
  startDate: Date; // To calculate the actual date for each day number
}

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-black/30 rounded-lg border border-white/10">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Clock size={14} className="text-gray-400" />
            <span>{activity.time}</span>
        </div>
        <h4 className="text-lg font-bold text-white leading-tight">{activity.activityName}</h4>
        <p className="text-sm text-gray-300 leading-relaxed">{activity.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-400">
            <MapPin size={12} className="text-gray-500" />
            <span>{activity.location}</span>
        </div>
        {activity.tips && (
            <div className="flex items-start gap-2 text-xs text-amber-200 bg-amber-500/10 px-3 py-2 rounded-lg border border-amber-500/20 mt-2">
                <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <p className="leading-relaxed"><span className="font-bold uppercase tracking-wider text-[10px] block mb-0.5">Tip:</span> {activity.tips}</p>
            </div>
        )}
    </div>
  );
};

export const TimelineView: React.FC<TimelineViewProps> = ({ activeCity, openDay, handleToggle, itineraryDays, startDate }) => {
  // Helper to format date
  const formatDate = (dayNumber: number) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + dayNumber - 1);
    return date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-24">
      {itineraryDays.map((day) => (
        <details 
            key={day.dayNumber}
            open={openDay === `day${day.dayNumber}`.toLowerCase().replace(' ', '')}
            className="group bg-card-bg rounded-2xl border border-border overflow-hidden transition-all duration-300 mb-4"
        >
          <summary 
              onClick={(e) => handleToggle(e, `day${day.dayNumber}`.toLowerCase().replace(' ', ''))}
              className="p-5 cursor-pointer list-none flex items-center justify-between hover:bg-white/5 transition-colors"
          >
            <div className="flex items-center gap-4 flex-1">
                <span className="text-xl font-bold text-[#FF1744] min-w-[3.5rem]">Day {day.dayNumber}</span>
                <div className="flex flex-col items-start border-l border-white/10 pl-4">
                    <span className="text-lg font-bold text-white leading-tight">{day.theme}</span>
                    <span className="text-sm font-medium text-gray-400 mt-0.5">{formatDate(day.dayNumber)}</span>
                </div>
            </div>
            <Plus className={`text-gray-400 transition-transform duration-300 ${openDay === `day${day.dayNumber}`.toLowerCase().replace(' ', '') ? 'rotate-45' : ''}`} />
          </summary>
          <div className="day-content p-5 pt-0 text-gray-200 border-t border-white/5 flex flex-col gap-4">
            {day.activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </div>
        </details>
      ))}
    </div>
  );
};
