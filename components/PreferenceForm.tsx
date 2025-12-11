import React from 'react';
import { UserPreferences, Interest } from '../types';
import { Calendar, Users, Wallet, Leaf, Check } from 'lucide-react';

interface PreferenceFormProps {
  preferences: UserPreferences;
  setPreferences: React.Dispatch<React.SetStateAction<UserPreferences>>;
  onSubmit: () => void;
  isLoading: boolean;
}

const SEASONS = ['Spring (Sakura)', 'Summer (Festivals)', 'Autumn (Momiji)', 'Winter (Snow)'];
const BUDGETS = ['Budget (Backpacker)', 'Moderate (Comfort)', 'Luxury (High-end)'];
const TRAVELERS = ['Solo', 'Couple', 'Family (with kids)', 'Group of Friends'];

export const PreferenceForm: React.FC<PreferenceFormProps> = ({ preferences, setPreferences, onSubmit, isLoading }) => {

  const toggleInterest = (interest: Interest) => {
    setPreferences(prev => {
      const exists = prev.interests.includes(interest);
      if (exists) {
        return { ...prev, interests: prev.interests.filter(i => i !== interest) };
      } else {
        return { ...prev, interests: [...prev.interests, interest] };
      }
    });
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreferences(prev => ({ ...prev, duration: parseInt(e.target.value) }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-2xl mx-auto border border-slate-100 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-full -z-0 opacity-50" />

      <h2 className="text-2xl font-bold text-slate-800 mb-6 font-japanese relative z-10">Plan Your Journey</h2>

      <div className="space-y-8 relative z-10">
        
        {/* Duration Slider */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-3">
            <Calendar className="w-4 h-4" />
            Trip Duration: <span className="text-rose-600 text-lg">{preferences.duration} Days</span>
          </label>
          <input
            type="range"
            min="3"
            max="14"
            value={preferences.duration}
            onChange={handleDurationChange}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-500"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>3 Days</span>
            <span>14 Days</span>
          </div>
        </div>

        {/* Selectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <Leaf className="w-4 h-4" /> Season
            </label>
            <select
              value={preferences.season}
              onChange={(e) => setPreferences({ ...preferences, season: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
            >
              {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <Users className="w-4 h-4" /> Who is traveling?
            </label>
            <select
              value={preferences.travelers}
              onChange={(e) => setPreferences({ ...preferences, travelers: e.target.value })}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
            >
              {TRAVELERS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <Wallet className="w-4 h-4" /> Budget
            </label>
            <div className="grid grid-cols-3 gap-3">
              {BUDGETS.map(b => (
                <button
                  key={b}
                  onClick={() => setPreferences({ ...preferences, budget: b })}
                  className={`p-3 text-sm rounded-lg border transition-all ${
                    preferences.budget === b
                      ? 'bg-rose-50 border-rose-500 text-rose-700 font-medium'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {b.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-3">
            <Check className="w-4 h-4" /> Interests (Select multiple)
          </label>
          <div className="flex flex-wrap gap-2">
            {Object.values(Interest).map((interest) => (
              <button
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                  preferences.interests.includes(interest)
                    ? 'bg-slate-800 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 ${
            isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-rose-500 hover:bg-rose-600 hover:shadow-rose-200'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Crafting Itinerary...
            </span>
          ) : (
            'Generate My Itinerary'
          )}
        </button>
      </div>
    </div>
  );
};