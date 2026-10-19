import React from 'react';
import { 
  Leaf, 
  Sparkles, 
  Zap, 
  Droplets, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Lightbulb,
  ShieldCheck,
  Flame
} from 'lucide-react';

export const StudentGreenScore = ({ greenScore, smartRecommendations }) => {
  const fallbackScore = {
    score: 84,
    badge: "Eco Champion 🌿",
    breakdown: {
      energyConservation: 82,
      waterPrudence: 80,
      reportingResponsiveness: 90
    },
    percentileRank: "Top 15% in Block A"
  };
  const activeScore = greenScore || fallbackScore;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs uppercase tracking-wider">
              <Leaf className="w-4 h-4" />
              <span>Campus Sustainability & Conservation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Your Hostel Green Score & Eco Analytics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Gamified resource stewardship score evaluating your room's electric efficiency and water prudence.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-left">
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">Active Ranking</div>
            <div className="text-sm font-bold text-emerald-700 dark:text-emerald-300">
              {activeScore.percentileRank}
            </div>
          </div>
        </div>
      </div>

      {/* Green Score Hero Card */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-800 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md uppercase tracking-wider">
              Environmental Stewardship Index
            </span>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
              {activeScore.badge}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
              Your room is performing exceptionally well! By turning off appliances when away and promptly reporting tap leaks, you have prevented an estimated <strong>120 kWh of electricity</strong> and <strong>1,800 Liters of water</strong> from being wasted this month.
            </p>
          </div>

          {/* Big Score Ring */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shrink-0 min-w-[200px]">
            <div className="text-xs uppercase tracking-widest text-emerald-200 font-bold">Composite Score</div>
            <div className="text-5xl font-black text-amber-300 mt-1">{activeScore.score}</div>
            <div className="text-xs text-emerald-100 mt-1">out of 100 max</div>
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Sub-Score Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Energy Conservation */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Power Prudence</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {activeScore.breakdown.energyConservation} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: `${activeScore.breakdown.energyConservation}%` }} />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Consistent off-peak charging behavior</p>
        </div>

        {/* Water Prudence */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Water Prudence</span>
            <Droplets className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {activeScore.breakdown.waterPrudence} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div className="h-full bg-sky-500 rounded-full" style={{ width: `${activeScore.breakdown.waterPrudence}%` }} />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Shower & fixture efficiency</p>
        </div>

        {/* Timely Reporting */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Audit Responsiveness</span>
            <Award className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">
            {activeScore.breakdown.reportingResponsiveness} <span className="text-xs font-normal text-slate-400">/ 100</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${activeScore.breakdown.reportingResponsiveness}%` }} />
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">Prompt leakage & defect reporting</p>
        </div>

      </div>

      {/* Smart Personalized Suggestions (Exact User Specification) */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Actionable Optimization Recommendations (Prompt Specifications)
          </h3>
        </div>

        <div className="space-y-3">
          
          {/* Nudge 1 */}
          <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-900 dark:text-amber-200 uppercase tracking-wider">
                💡 Energy Optimization Suggestion
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                "Turn off your fan when leaving the room."
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Fans running in an empty room do not cool ambient air; they merely circulate heat generated by the motor.
              </p>
            </div>
          </div>

          {/* Nudge 2 */}
          <div className="p-4 rounded-xl bg-sky-50/70 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center shrink-0">
              <Droplets className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-sky-900 dark:text-sky-200 uppercase tracking-wider">
                💧 Water Conservation Alert
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                "Your water usage is higher than the hostel average."
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Suite 204 recorded 165 Liters today compared to the 140 Liter floor norm. Once the bathroom tap valve is replaced, this will normalize.
              </p>
            </div>
          </div>

          {/* Nudge 3 */}
          <div className="p-4 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex items-start space-x-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 uppercase tracking-wider">
                🌱 Green Score Multiplier
              </div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1">
                "You could improve your Green Score by reducing electricity consumption during peak hours (2 PM – 5 PM)."
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                Shifting laptop gaming or laundry to 08:00 AM - 12:00 PM earns +8 Eco Karma points.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
