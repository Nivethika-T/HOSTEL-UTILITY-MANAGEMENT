import React from 'react';
import { 
  User, 
  Home, 
  DoorClosed, 
  Zap, 
  Droplets, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Leaf,
  Bell,
  Wrench,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentDashboard = ({ stats, onNavigateTab }) => {
  const { currentUser } = useAuth();

  if (!stats) {
    return <div className="p-8 text-center text-slate-500">Loading Student Room Telemetry...</div>;
  }

  const { student, electricity, water, greenScore, complaints, announcements } = stats;

  return (
    <div className="space-y-6">

      {/* Student Profile Hero Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-800 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md uppercase tracking-wider">
                Resident Student Portal
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-400/30 border border-emerald-300/40 text-emerald-100 flex items-center space-x-1">
                <Leaf className="w-3 h-3 text-emerald-300" />
                <span>{greenScore.badge}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {student.name}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-emerald-100 font-medium">
              <span>Roll No: <strong>{student.rollNo}</strong></span>
              <span>•</span>
              <span>Room: <strong>{student.roomNo}</strong> ({student.block} • {student.floor})</span>
              <span>•</span>
              <span>Roommates: <strong>{student.roommates?.join(', ')}</strong></span>
            </div>
          </div>

          {/* Quick Green Score Badge */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center shrink-0 min-w-[170px]">
            <div className="text-[11px] uppercase tracking-wider text-emerald-100 font-semibold">Your Green Score</div>
            <div className="text-3xl font-black text-amber-300 mt-0.5">{greenScore.score} <span className="text-sm font-normal text-white">/ 100</span></div>
            <div className="text-[10px] text-emerald-200 mt-1">{greenScore.percentileRank}</div>
          </div>

        </div>

        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Personal Utility & Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Personal Electricity Usage */}
        <div 
          onClick={() => onNavigateTab('electricity')}
          className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:border-amber-400 group transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-amber-500">
              Today's Room Power
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {electricity.todayKwh} <span className="text-xs font-normal text-slate-500">kWh</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-amber-600 dark:text-amber-400">₹{electricity.todayCost} today</span>
            <span className="text-rose-500 font-bold">+{electricity.weeklyChangePercent}% this wk</span>
          </div>
        </div>

        {/* Personal Water Usage */}
        <div 
          onClick={() => onNavigateTab('water')}
          className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:border-sky-400 group transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-sky-500">
              Today's Room Water
            </span>
            <div className="w-8 h-8 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Droplets className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {water.todayLiters} <span className="text-xs font-normal text-slate-500">Liters</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-slate-500">~{Math.round(water.todayLiters / 3)} L / student</span>
            <span className="text-rose-500 font-bold">+{water.weeklyChangePercent}%</span>
          </div>
        </div>

        {/* Open Complaints */}
        <div 
          onClick={() => onNavigateTab('track')}
          className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer hover:border-blue-400 group transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-blue-500">
              My Complaints
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {complaints.length} <span className="text-xs font-normal text-slate-500">Logged</span>
          </div>
          <div className="mt-1 flex items-center text-xs text-blue-600 dark:text-blue-400 font-medium">
            <span>{complaints.filter(c => c.status !== 'Resolved').length} in active resolution</span>
          </div>
        </div>

        {/* Quick Report CTA */}
        <div 
          onClick={() => onNavigateTab('report')}
          className="bg-gradient-to-br from-indigo-500 to-blue-600 text-white p-5 rounded-2xl shadow-md cursor-pointer hover:shadow-lg transition flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-100">Quick Service</span>
              <AlertCircle className="w-4 h-4 text-blue-200" />
            </div>
            <div className="mt-2 text-lg font-bold">Report a Problem</div>
            <p className="text-[11px] text-blue-100 mt-0.5">Leakage, fan, broken light or Wi-Fi issue</p>
          </div>
          <div className="mt-3 flex items-center space-x-1 text-xs font-semibold">
            <span>Submit Ticket</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>

      {/* Smart Personalized Recommendations (Prompt Requirement) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-transparent border border-amber-200 dark:border-amber-800/60 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Personalized Smart Recommendations for Room {student.roomNo}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-start space-x-2.5">
            <span className="text-base">💡</span>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Turn off your fan</strong> when leaving the room. Fans consume ~34% of your daily energy.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-start space-x-2.5">
            <span className="text-base">💧</span>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Your water usage is higher</strong> than the hostel average. Tap repair in progress for Room 204.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-start space-x-2.5">
            <span className="text-base">🌱</span>
            <p className="text-slate-700 dark:text-slate-300">
              You could improve your <strong>Green Score</strong> to 90+ by unplugging laptops during peak 2 PM–5 PM.
            </p>
          </div>
        </div>
      </div>

      {/* Active Complaints & Hostel Announcements Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Active Complaint Status Preview */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-indigo-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Active Maintenance Requests
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('track')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center space-x-1"
            >
              <span>Track All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {complaints.length === 0 ? (
            <div className="text-xs text-slate-400 py-6 text-center">No active complaints logged for this room.</div>
          ) : (
            <div className="space-y-3">
              {complaints.map((c) => (
                <div 
                  key={c.id}
                  onClick={() => onNavigateTab('track')}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 hover:border-blue-400 cursor-pointer transition text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">#{c.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' :
                      c.status === 'In Progress' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                    }`}>
                      {c.status}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{c.title}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-[11px] truncate mt-0.5">{c.description}</div>
                  {c.assignedTechnician && (
                    <div className="mt-1.5 text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                      Assigned: {c.assignedTechnician}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Hostel Announcements */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-4 h-4 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hostel Announcements
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('announcements')}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {announcements.map((a) => (
              <div 
                key={a.id} 
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 text-xs space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{a.title}</span>
                  <span className="text-[10px] text-slate-400">{new Date(a.date).toLocaleDateString()}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  {a.content}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
