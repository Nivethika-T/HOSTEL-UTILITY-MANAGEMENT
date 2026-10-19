import React from 'react';
import { 
  Droplets, 
  TrendingUp, 
  TrendingDown, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  Clock
} from 'lucide-react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const StudentWater = ({ water, roomNo, block }) => {
  const fallbackWater = {
    todayLiters: 165,
    weeklyLiters: 1180,
    prevWeekLiters: 1072,
    weeklyChangePercent: 10.1,
    monthlyLiters: 4850,
    hostelAveragePerRoom: 140,
    dailyTrend7Days: [
      { day: "Mon", liters: 155 },
      { day: "Tue", liters: 160 },
      { day: "Wed", liters: 150 },
      { day: "Thu", liters: 158 },
      { day: "Fri", liters: 175 },
      { day: "Sat", liters: 180 },
      { day: "Sun", liters: 165 }
    ]
  };

  const data = water || fallbackWater;
  const currentRoom = roomNo || "204";
  const currentBlock = block || "Block A";

  // 7-day water chart
  const waterTrendData = {
    labels: (data.dailyTrend7Days || fallbackWater.dailyTrend7Days).map(d => d.day),
    datasets: [
      {
        label: 'Daily Water Consumption (Liters)',
        data: (data.dailyTrend7Days || fallbackWater.dailyTrend7Days).map(d => d.liters),
        borderColor: '#0284c7',
        backgroundColor: 'rgba(2, 132, 199, 0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: '#0284c7'
      }
    ]
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-sky-500 font-bold text-xs uppercase tracking-wider">
              <Droplets className="w-4 h-4" />
              <span>Personal Flow Telemetry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Room {currentRoom} Water Usage & Conservation
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Individual suite sub-metering data for {currentBlock} - Room {currentRoom}.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-left">
            <div className="text-[10px] text-sky-600 dark:text-sky-400 uppercase font-semibold">Hostel Average / Room</div>
            <div className="text-lg font-black text-sky-700 dark:text-sky-300">
              {data.hostelAveragePerRoom} <span className="text-xs font-normal text-slate-500">Liters / day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Water Trend Callout (Exact User Specification) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/80 flex items-start space-x-3.5">
        <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-sky-500/20">
          <Droplets className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-bold text-sky-900 dark:text-sky-200">
              Water Consumption Notice
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300">
              +{data.weeklyChangePercent}% Trend
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-sky-950 dark:text-sky-100">
            "💧 Your water consumption increased by {data.weeklyChangePercent}% this week."
          </p>
          <p className="mt-1 text-xs text-sky-800/80 dark:text-sky-300/80">
            The ongoing bathroom tap dripping issue contributes ~180 Liters daily. A plumber has been dispatched under ticket #CMP-1024.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Daily Water Usage */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Daily Water Usage</div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {data.todayLiters} <span className="text-sm font-normal text-slate-500">Liters</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            ~55 L per resident occupant
          </div>
        </div>

        {/* Weekly Water Usage */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Weekly Total</div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {data.weeklyLiters.toLocaleString()} <span className="text-sm font-normal text-slate-500">Liters</span>
          </div>
          <div className="mt-1 text-xs text-rose-500 font-semibold flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>+{data.weeklyChangePercent}% vs last week ({data.prevWeekLiters} L)</span>
          </div>
        </div>

        {/* Monthly Water Usage */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Monthly Total</div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {data.monthlyLiters.toLocaleString()} <span className="text-sm font-normal text-slate-500">Liters</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Active billing cycle
          </div>
        </div>

        {/* Comparison with Hostel Average */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Hostel Benchmark</div>
          <div className="mt-2 text-2xl font-black text-amber-600 dark:text-amber-400">
            +17.8%
          </div>
          <div className="mt-1 text-xs text-amber-600 font-semibold">
            Above 140 L/room hostel average
          </div>
        </div>

      </div>

      {/* 7-Day Chart & Water Saving Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Daily Flow Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Room {currentRoom} Daily Water Draw
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Water consumption logged via in-line pulse meters
              </p>
            </div>
            <Clock className="w-5 h-5 text-sky-500" />
          </div>

          <div className="h-64 w-full">
            <Line 
              data={waterTrendData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { title: { display: true, text: 'Liters / day' } }
                }
              }} 
            />
          </div>
        </div>

        {/* Water Saving Suggestions (Prompt Requirement) */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-sky-500 font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Smart Conservation</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              Water-Saving Suggestions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Easy habits to reduce waste and boost your room's Green Score:
            </p>

            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-750 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Turn off tap while brushing</strong>
                  <div className="text-[11px] text-slate-400 mt-0.5">Saves approximately 12 Liters per student daily.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-750 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Report dripping taps early</strong>
                  <div className="text-[11px] text-slate-400 mt-0.5">A single dripping faucet wastes up to 5,400 Liters / month.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-750 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <strong>Keep showers under 5 minutes</strong>
                  <div className="text-[11px] text-slate-400 mt-0.5">Reduces hot water heater electric draw and water footprint.</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-sky-50 dark:bg-sky-950/30 text-[11px] text-sky-800 dark:text-sky-300">
            🌱 Reducing water consumption by 20 L/day elevates your room to the <strong>Top 10% Green Rank</strong>.
          </div>
        </div>

      </div>

    </div>
  );
};
