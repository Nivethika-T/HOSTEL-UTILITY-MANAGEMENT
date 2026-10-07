import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Calendar, 
  Zap, 
  Droplets, 
  TrendingDown, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  BrainCircuit,
  Sliders
} from 'lucide-react';
import { Line } from 'react-chartjs-2';

export const PredictiveManagement = ({ data }) => {
  const [interactiveStudentsAway, setInteractiveStudentsAway] = useState(142);

  if (!data) {
    return <div className="p-8 text-center text-slate-500">Loading Predictive Resource Model...</div>;
  }

  // Dynamic calculations based on interactive slider
  const calcPredictedElec = Math.max(1200, 2450 - Math.round(interactiveStudentsAway * 2.4));
  const calcPredictedWater = Math.max(18000, 39000 - Math.round(interactiveStudentsAway * 44));
  const calcElecSavings = Math.round(2450 - calcPredictedElec);
  const calcWaterSavings = Math.round(39000 - calcPredictedWater);
  const calcRupeesSaved = Math.round((calcElecSavings * 8.5) + (calcWaterSavings * 0.045));

  // 7-Day Forecast Comparison Chart
  const forecastChartData = {
    labels: data.next7DaysForecast.map(f => f.day),
    datasets: [
      {
        label: 'Baseline Electricity Demand (kWh)',
        data: data.next7DaysForecast.map(f => f.baselineElecKwh),
        borderColor: '#94a3b8',
        borderDash: [5, 5],
        tension: 0.3,
        pointRadius: 3
      },
      {
        label: 'Predictive Electricity Demand (kWh)',
        data: data.next7DaysForecast.map(f => f.predictedElecKwh),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 4
      }
    ]
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-500 font-bold text-xs uppercase tracking-wider">
              <BrainCircuit className="w-4 h-4" />
              <span>Predictive Resource Modeling Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Occupancy-Correlated Utility Demand Forecasting
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Correlating student leaves & outing schedules with institutional electricity and hydraulic requirements.
            </p>
          </div>

          <div className="px-4 py-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-left">
            <div className="text-[10px] text-indigo-600 dark:text-indigo-400 uppercase font-semibold">Tomorrow's Approved Outings</div>
            <div className="text-xl font-black text-indigo-700 dark:text-indigo-300">
              {data.studentsAwayTomorrow} Students <span className="text-xs font-normal text-slate-500">({data.percentAway}% Away)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Correlation Insight Directive Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-700 via-purple-700 to-slate-900 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md uppercase tracking-wider">
              Automated Facility Dispatch Directive
            </span>
            <h3 className="text-xl sm:text-2xl font-black leading-snug">
              "Tomorrow {data.studentsAwayTomorrow} students are away on approved leave: Expected utility demand drops by {Math.abs(data.electricitySavingsPercent)}%."
            </h3>
            <p className="text-xs text-indigo-100 leading-relaxed">
              {data.optimalAction}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-center shrink-0 min-w-[200px]">
            <div className="text-xs text-indigo-200 uppercase font-semibold">Predicted Resource Savings</div>
            <div className="text-2xl font-black text-amber-300 mt-1">₹{data.predictedCostSavingsTomorrow}</div>
            <div className="text-[11px] text-indigo-100 mt-1">Single-Day Reduced Footprint</div>
          </div>
        </div>

        <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 7-Day Forecast Chart vs Baseline */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              7-Day Predictive Load Curve vs Fixed Institutional Baseline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Notice the weekend dips (Saturday/Sunday) where large cohorts go on approved outings
            </p>
          </div>
          <div className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 rounded-lg border border-indigo-200 dark:border-indigo-800">
            Model Accuracy: 94.2% R²
          </div>
        </div>

        <div className="h-72 w-full">
          <Line 
            data={forecastChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { title: { display: true, text: 'Electricity Demand (kWh)' } }
              }
            }} 
          />
        </div>

        {/* Forecast Table Breakdown */}
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Date / Day</th>
                <th className="py-2.5 px-3">Students Away</th>
                <th className="py-2.5 px-3">Predicted Electricity</th>
                <th className="py-2.5 px-3">Electricity Reduction</th>
                <th className="py-2.5 px-3">Predicted Water</th>
                <th className="py-2.5 px-3">Optimal Pump Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {data.next7DaysForecast.map((f, i) => {
                const elecDrop = f.baselineElecKwh - f.predictedElecKwh;
                const waterDrop = f.baselineWaterL - f.predictedWaterL;
                return (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30">
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{f.day}</td>
                    <td className="py-3 px-3 text-indigo-600 dark:text-indigo-400 font-semibold">
                      {f.studentsAway} Students
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {f.predictedElecKwh} kWh
                    </td>
                    <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-medium">
                      -{elecDrop} kWh (-{((elecDrop / f.baselineElecKwh) * 100).toFixed(1)}%)
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                      {f.predictedWaterL.toLocaleString()} L
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                      {f.studentsAway > 150 
                        ? '🟢 Idle Secondary Borewell Pump' 
                        : (f.studentsAway > 80 ? '🟡 De-rate booster to 70%' : '⚪ Standard Duty Cycle')}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Predictive Simulator Sandbox */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center space-x-2 text-purple-500 font-bold text-xs uppercase tracking-wider mb-1">
          <Sliders className="w-4 h-4" />
          <span>Interactive Outing Simulation Sandbox</span>
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Predict Utility Demand for Custom Leave Cohorts
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
          Drag the slider to test how large festival vacations or exam breaks impact hostel utility load:
        </p>

        <div className="space-y-4 max-w-2xl">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="text-slate-800 dark:text-slate-200">Simulate Students on Leave (out of 850 total):</span>
            <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-base">{interactiveStudentsAway} Students</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="600" 
            value={interactiveStudentsAway} 
            onChange={(e) => setInteractiveStudentsAway(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>0 (Full Hostel)</span>
            <span>250 (Weekend Leave)</span>
            <span>600 (Semester Break)</span>
          </div>
        </div>

        {/* Live Simulator Results */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-left">
            <div className="text-[10px] text-amber-600 uppercase font-bold">Predicted Electricity Load</div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{calcPredictedElec} kWh</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">-{calcElecSavings} kWh saved / day</div>
          </div>

          <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800 text-left">
            <div className="text-[10px] text-sky-600 uppercase font-bold">Predicted Water Requirement</div>
            <div className="text-xl font-black text-slate-900 dark:text-white mt-1">{calcPredictedWater.toLocaleString()} L</div>
            <div className="text-xs text-emerald-600 font-semibold mt-1">-{calcWaterSavings.toLocaleString()} L conserved / day</div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-left">
            <div className="text-[10px] text-emerald-600 uppercase font-bold">Estimated Cost Savings</div>
            <div className="text-xl font-black text-emerald-700 dark:text-emerald-300 mt-1">₹{calcRupeesSaved} / day</div>
            <div className="text-xs text-slate-500 mt-1">~₹{(calcRupeesSaved * 30).toLocaleString()} / month</div>
          </div>
        </div>
      </div>

    </div>
  );
};
