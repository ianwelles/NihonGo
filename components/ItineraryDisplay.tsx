import React from 'react';
import { ItineraryResponse, DayItinerary, Activity } from '../types';
import { MapPin, Clock, Info, ExternalLink, Download } from 'lucide-react';

interface ItineraryDisplayProps {
  data: ItineraryResponse;
  onReset: () => void;
}

const ActivityCard: React.FC<{ activity: Activity, index: number }> = ({ activity, index }) => (
  <div className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 gap-6 group">
    {/* Timeline Line (Desktop) */}
    <div className="hidden md:flex md:col-span-2 flex-col items-end pr-6 border-r-2 border-slate-100 relative">
      <span className="text-sm font-mono text-slate-500 mt-1">{activity.time}</span>
      <div className="absolute top-2 -right-[9px] w-4 h-4 bg-white border-2 border-rose-400 rounded-full z-10 group-hover:bg-rose-400 transition-colors" />
    </div>

    {/* Timeline Line (Mobile) */}
    <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-slate-100 md:hidden">
      <div className="absolute top-0 -left-[5px] w-3 h-3 bg-white border-2 border-rose-400 rounded-full" />
    </div>

    {/* Content */}
    <div className="md:col-span-10 pb-8">
      <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <h4 className="text-lg font-bold text-slate-800">{activity.activityName}</h4>
          <span className="md:hidden text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">{activity.time}</span>
        </div>
        
        <p className="text-slate-600 mb-3 text-sm leading-relaxed">{activity.description}</p>
        
        <div className="flex flex-wrap gap-3 mt-3">
            <div className="flex items-center text-xs text-rose-600 font-medium bg-rose-50 px-3 py-1.5 rounded-full">
                <MapPin className="w-3 h-3 mr-1" />
                {activity.location}
            </div>
            {activity.tips && (
                <div className="flex items-center text-xs text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-100">
                    <Info className="w-3 h-3 mr-1" />
                    Tip: {activity.tips}
                </div>
            )}
        </div>
      </div>
    </div>
  </div>
);

const DaySection: React.FC<{ day: DayItinerary }> = ({ day }) => (
  <div className="mb-12">
    <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-sm py-4 mb-6 border-b border-slate-200">
      <div className="flex items-center gap-4">
        <div className="bg-slate-900 text-white w-12 h-12 flex flex-col items-center justify-center rounded-lg shadow-lg">
          <span className="text-xs uppercase font-bold tracking-wider">Day</span>
          <span className="text-xl font-bold leading-none">{day.dayNumber}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800">{day.city}</h3>
          <p className="text-sm text-slate-500 font-medium">{day.theme}</p>
        </div>
      </div>
    </div>
    
    <div className="space-y-2">
      {day.activities.map((activity, idx) => (
        <ActivityCard key={idx} activity={activity} index={idx} />
      ))}
    </div>
  </div>
);

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ data, onReset }) => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-20">
      {/* Header Summary */}
      <div className="bg-white rounded-2xl p-8 shadow-xl mb-10 border border-slate-100 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-indigo-500" />
         
         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 font-japanese">{data.tripTitle}</h2>
            <button 
                onClick={onReset}
                className="text-sm text-slate-500 hover:text-rose-500 underline decoration-dotted underline-offset-4"
            >
                Start Over
            </button>
         </div>

         <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">{data.summary}</p>
      </div>

      {/* Days Loop */}
      <div className="px-2">
        {data.days.map((day) => (
          <DaySection key={day.dayNumber} day={day} />
        ))}
      </div>

       {/* Floating Action Button for Map (Mockup) */}
       <div className="fixed bottom-6 right-6 z-50">
            <button 
                onClick={() => window.alert("This would export the itinerary to Google Maps in a production app.")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg shadow-indigo-200 transition-transform hover:scale-110 flex items-center gap-2"
            >
                <ExternalLink className="w-5 h-5" />
                <span className="hidden md:inline font-medium">Export Map</span>
            </button>
       </div>
    </div>
  );
};