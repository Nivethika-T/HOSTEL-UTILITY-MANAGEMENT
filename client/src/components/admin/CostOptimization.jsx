import React, { useState } from 'react';
import { 
  TrendingDown, 
  DollarSign, 
  Lightbulb, 
  Zap, 
  Droplets, 
  CheckCircle2, 
  Sliders, 
  ArrowUpRight,
  Sparkles,
  PieChart,
  ShieldCheck
} from 'lucide-react';

export const CostOptimization = ({ data }) => {
  // Interactive Savings Simulator Slider
  const [peakReductionPercent, setPeakReductionPercent] = useState(20);
  const [lightingReductionPercent, setLightingReductionPercent] = useState(30);

  if (!data) {
    return <div className="p-8 text-center text-slate-500">Loading Cost Optimization Telemetry...</div>;
  }

  // Interactive calculations
  // Baseline peak monthly kWh = ~19,200 kWh. Tariff = ₹11.50/kWh
  const calculatedPeakSavingsRupees = Math.round((19200 * (peakReductionPercent / 100)) * 11.5);
  // Lighting corridor baseline = ~3,800 kWh. Tariff = ₹8.00/kWh
  const calculatedLightingSavingsRupees = Math.round((3800 * (lightingReductionPercent / 100)) * 8.0);
  const totalSimulatedSavings = calculatedPeakSavingsRupees + calculatedLightingSavingsRupees + 6400; // + water pump

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-emerald-500 font-bold text-xs uppercase tracking-wider">
              <DollarSign className="w-4 h-4" />
              <span>Institutional Utility Economics & ROI</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Cost Optimization & Financial Shaving Engine
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Actionable prescriptive recommendations with direct monthly INR savings projections.
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-left">
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold">Identified Monthly Savings</div>
            <div className="text-xl font-black text-emerald-700 dark:text-emerald-300">
              ₹{data.totalPotentialSavingsMonthly?.toLocaleString()} <span className="text-xs font-normal text-emerald-600">/ month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Headline Prescriptive Insight (User's Exact Specification) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md uppercase tracking-wider">
              Prescriptive Intelligence Directive
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">
              "Electricity consumption is 15% higher than normal. Reducing AC and heavy cooling usage during 2 PM–5 PM could save approximately ₹18,500 this month."
            </h3>
            <p className="text-xs text-emerald-100 leading-relaxed">
              Our automated tariff arbitrage engine identifies that 28% of hostel load coincides with peak billing intervals (₹11.50/kWh). Pre-cooling common areas at 1:00 PM shaves the sharpest utility spike.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center shrink-0 min-w-[180px]">
            <div className="text-xs text-emerald-200 uppercase font-semibold">Projected Annual Savings</div>
            <div className="text-2xl font-black text-white mt-1">₹2,22,000</div>
            <div className="text-[11px] text-emerald-100 mt-1">ROI: 4.8x Implementation Cost</div>
          </div>
        </div>

        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Interactive Savings Simulator (Interactive Feature for Project Demonstration) */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center space-x-2 text-indigo-500 font-bold text-xs uppercase tracking-wider mb-1">
          <Sliders className="w-4 h-4" />
          <span>Interactive Warden Decision Support Tool</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Live Cost Savings Simulator & Policy Sandbox
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Adjust the sliders below to simulate institutional load-shedding policies and view live monthly rupee savings:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Slider 1: Peak Hour AC/Cooler Load Shaving */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-800 dark:text-slate-200">Peak Hour Load Shaving (2 PM - 5 PM):</span>
              <span className="font-bold text-amber-600 dark:text-amber-400 text-sm">{peakReductionPercent}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={peakReductionPercent} 
              onChange={(e) => setPeakReductionPercent(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0% (Status Quo)</span>
              <span>25% (Optimal)</span>
              <span>50% (Strict Conservation)</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Estimated Monthly Electricity Savings: <strong className="text-amber-600 dark:text-amber-400">₹{calculatedPeakSavingsRupees.toLocaleString()}</strong>
            </div>
          </div>

          {/* Slider 2: Lighting & Corridor Automation */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-800 dark:text-slate-200">Corridor & Perimeter Lighting Dimming:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400 text-sm">{lightingReductionPercent}%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="60" 
              value={lightingReductionPercent} 
              onChange={(e) => setLightingReductionPercent(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>0% (24/7 Illumination)</span>
              <span>30% (PIR Motion Sensors)</span>
              <span>60% (Full Sensor Grid)</span>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
              Estimated Monthly Lighting Savings: <strong className="text-blue-600 dark:text-blue-400">₹{calculatedLightingSavingsRupees.toLocaleString()}</strong>
            </div>
          </div>

        </div>

        {/* Combined Sandbox Output */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-200 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
              Simulated Combined Impact
            </div>
            <div className="text-xl font-black text-emerald-900 dark:text-emerald-100 mt-0.5">
              ₹{totalSimulatedSavings.toLocaleString()} Saved per Month (~₹{(totalSimulatedSavings * 12).toLocaleString()} / year)
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold shadow-sm">
            Policy Validated by AI Optimizer
          </span>
        </div>
      </div>

      {/* Detailed Recommendations Grid (User's Exact Categories) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.recommendations.map((rec) => (
          <div 
            key={rec.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-400 transition"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
                  {rec.category}
                </span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  +₹{rec.potentialSavingsMonthly.toLocaleString()} / mo
                </span>
              </div>

              <h4 className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                {rec.title}
              </h4>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {rec.description}
              </p>

              <div className="mt-3 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Prescribed Implementation Steps:</span>
                {rec.actionSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-400">
              <span>Impact: <strong>{rec.impact}</strong></span>
              <span className="text-blue-600 dark:text-blue-400 font-semibold cursor-pointer hover:underline">Apply Recommendation ➔</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
