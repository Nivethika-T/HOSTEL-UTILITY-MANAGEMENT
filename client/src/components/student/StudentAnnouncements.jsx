import React from 'react';
import { 
  Bell, 
  Zap, 
  Droplets, 
  Sparkles, 
  Clock, 
  ShieldAlert,
  Info
} from 'lucide-react';

export const StudentAnnouncements = ({ announcements }) => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
          <Bell className="w-4 h-4" />
          <span>Warden Broadcast Channel</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
          Hostel Announcements & Maintenance Notices
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          Official campus alerts regarding scheduled power interruptions, water tank maintenance, and room inspections.
        </p>
      </div>

      {/* Announcements Feed */}
      <div className="space-y-4">
        {announcements.map((a) => {
          const isHigh = a.priority === 'High';
          const isElec = a.category === 'Electricity';
          const isWater = a.category === 'Water';

          return (
            <div 
              key={a.id}
              className={`p-6 rounded-2xl border transition shadow-sm ${
                isHigh 
                  ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/60 gap-2">
                <div className="flex items-center space-x-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    isHigh 
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300' 
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                  }`}>
                    {a.priority} Priority
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {a.category}
                  </span>
                </div>

                <div className="flex items-center space-x-1 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Published: {new Date(a.date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>

              <div className="mt-3 space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <span>{a.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {a.content}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400">
                <span>Issued by: <strong>{a.author}</strong></span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center space-x-1">
                  <span>✓ Verified Campus Notice</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
