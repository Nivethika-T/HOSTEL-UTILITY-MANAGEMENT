import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Trash2, 
  Zap, 
  Droplets, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Plus
} from 'lucide-react';

export const AnnouncementsManagement = ({ announcements, onCreateAnnouncement, onDeleteAnnouncement }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Electricity');
  const [priority, setPriority] = useState('High');

  // Quick Preset Templates matching the user's exact specification
  const applyPreset = (presetTitle, presetContent, presetCategory, presetPriority) => {
    setTitle(presetTitle);
    setContent(presetContent);
    setCategory(presetCategory);
    setPriority(presetPriority);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    onCreateAnnouncement({
      title,
      content,
      category,
      priority
    });
    setTitle('');
    setContent('');
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-500 font-bold text-xs uppercase tracking-wider">
              <Bell className="w-4 h-4" />
              <span>Campus Broadcast Communications</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Hostel Announcements & Utility Outage Notices
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Send immediate push notifications to student dashboards regarding scheduled maintenance or inspections.
            </p>
          </div>

          <span className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-700 dark:text-blue-300">
            {announcements.length} Active Broadcasts
          </span>
        </div>
      </div>

      {/* Broadcast Creation Form & Preset Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Creation Form */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Dispatch New Hostel Announcement
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Announcements are instantly broadcasted to all 850 student portals
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Announcement Subject / Headline
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ⚡ Scheduled Power Maintenance Tomorrow"
                required
                className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="Electricity">⚡ Electricity</option>
                  <option value="Water">💧 Water Supply</option>
                  <option value="Inspection">🧹 Inspection & Sanitation</option>
                  <option value="General">📢 General Administration</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Urgency Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="High">High (Red Banner)</option>
                  <option value="Medium">Medium (Amber Notice)</option>
                  <option value="Normal">Normal (Blue Feed)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Announcement Message Body
              </label>
              <textarea
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Details of outage, timings, affected blocks, or instructions for students..."
                required
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold flex items-center space-x-2 shadow-md transition"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Broadcast to All Students</span>
              </button>
            </div>
          </form>
        </div>

        {/* Quick Presets (Exact Examples from Prompt) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Prompt Specified Presets</span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-2">
              1-Click Notice Templates
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Click any sample announcement to populate the dispatch form:
            </p>

            <div className="space-y-2.5 text-xs">
              
              {/* Preset 1 */}
              <div 
                onClick={() => applyPreset(
                  "⚡ Power maintenance scheduled tomorrow 10 AM–12 PM",
                  "Power maintenance scheduled tomorrow 10:00 AM – 12:00 PM for transformer inspection and switchgear synchronization in Block A and Block B.",
                  "Electricity",
                  "High"
                )}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 cursor-pointer bg-slate-50 dark:bg-slate-750 transition"
              >
                <div className="font-bold text-amber-700 dark:text-amber-400">⚡ Power Maintenance</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Tomorrow 10 AM – 12 PM (DG test)</div>
              </div>

              {/* Preset 2 */}
              <div 
                onClick={() => applyPreset(
                  "💧 Water supply will be interrupted from 2 PM–4 PM",
                  "Water supply will be interrupted from 2:00 PM – 4:00 PM due to underground pipeline cleaning and chlorination sensor calibration.",
                  "Water",
                  "Medium"
                )}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500 cursor-pointer bg-slate-50 dark:bg-slate-750 transition"
              >
                <div className="font-bold text-sky-700 dark:text-sky-400">💧 Water Interruption</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">2 PM – 4 PM pipeline flush</div>
              </div>

              {/* Preset 3 */}
              <div 
                onClick={() => applyPreset(
                  "🧹 Room inspection scheduled for Friday",
                  "Room inspection scheduled for Friday 3:00 PM onwards. Please ensure room wiring complies with hostel fire and energy guidelines.",
                  "Inspection",
                  "Normal"
                )}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 cursor-pointer bg-slate-50 dark:bg-slate-750 transition"
              >
                <div className="font-bold text-indigo-700 dark:text-indigo-400">🧹 Room Inspection</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Friday compliance check</div>
              </div>

            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-[11px] text-blue-700 dark:text-blue-300">
            📢 Pushed via WebSocket / REST to mobile & desktop views.
          </div>
        </div>

      </div>

      {/* Active Broadcasts Feed */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Active Published Announcements ({announcements.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {announcements.map((a) => (
            <div 
              key={a.id}
              className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    a.priority === 'High'
                      ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                      : a.priority === 'Medium'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                  }`}>
                    {a.priority} Priority
                  </span>
                  <button
                    onClick={() => onDeleteAnnouncement(a.id)}
                    className="text-slate-400 hover:text-rose-500 transition p-1"
                    title="Delete Announcement"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {a.title}
                </h4>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {a.content}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
                <span>By: {a.author}</span>
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(a.date).toLocaleDateString()}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
