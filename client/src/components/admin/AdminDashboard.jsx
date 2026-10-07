import React from 'react';
import { 
  Users, 
  DoorClosed, 
  Home, 
  Zap, 
  Droplets, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ArrowRight,
  ShieldAlert,
  Sparkles,
  FileSpreadsheet,
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

export const AdminDashboard = ({ overview, onNavigateTab }) => {
  if (!overview) {
    return (
      <div className="flex items-center justify-center p-12 text-slate-400">
        Loading hostel telemetry data...
      </div>
    );
  }

  // 7-day overview chart data
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri (Spike)', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Electricity (kWh)',
        data: [800, 820, 810, 815, 1450, 890, 840],
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.35,
        fill: true,
        yAxisID: 'y'
      },
      {
        label: 'Water (hundred Liters)',
        data: [372, 381, 369, 378, 442, 395, 385],
        borderColor: '#0284c7',
        backgroundColor: 'rgba(2, 132, 199, 0.1)',
        tension: 0.35,
        fill: true,
        yAxisID: 'y1'
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { boxWidth: 12, font: { size: 12 } }
      },
      tooltip: {
        callbacks: {
          afterLabel: function(ctx) {
            if (ctx.label.includes('Fri')) {
              return '⚠️ AI Anomaly Flag: Sudden +78% surge!';
            }
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: { display: true, text: 'Electricity (kWh)' }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: { drawOnChartArea: false },
        title: { display: true, text: 'Water (x100 L)' }
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Institutional Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-blue-100 uppercase tracking-wider mb-2">
                Apex International Institute of Technology
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Hostel Utility & Resource Command Center
              </h1>
              <p className="mt-1 text-sm text-blue-100/90 max-w-2xl">
                Real-time IoT telemetry, AI anomaly detection, and predictive resource allocation for 4 residential blocks.
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onNavigateTab('predictive')}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-xs font-semibold transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Predictive Engine</span>
              </button>
              <button
                onClick={() => onNavigateTab('reports')}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold shadow-md transition"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export Audit Reports</span>
              </button>
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 5 Core Required Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Total Students */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Students
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {overview.totalStudents}
            </div>
            <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">
              <span>Across 4 Hostel Blocks</span>
            </div>
          </div>
        </div>

        {/* Total Rooms */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Total Rooms
            </span>
            <div className="w-9 h-9 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <DoorClosed className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {overview.totalRooms}
            </div>
            <div className="mt-1 flex items-center text-xs text-slate-500 dark:text-slate-400">
              <span>Floors 1 to 4 configured</span>
            </div>
          </div>
        </div>

        {/* Occupied Rooms */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Occupied Rooms
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Home className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {overview.occupiedRooms}
            </div>
            <div className="mt-1 flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <TrendingUp className="w-3.5 h-3.5 mr-1" />
              <span>{overview.occupancyRate}% Occupancy Rate</span>
            </div>
          </div>
        </div>

        {/* Today's Electricity Consumption */}
        <div 
          onClick={() => onNavigateTab('electricity')}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm transition hover:shadow-md cursor-pointer hover:border-amber-400 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-amber-500">
              Today's Electricity
            </span>
            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {overview.todayElectricity?.value.toLocaleString()} <span className="text-sm font-normal text-slate-500">kWh</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-amber-600 dark:text-amber-400">
                ₹{overview.todayElectricity?.cost.toLocaleString()}
              </span>
              <span className="text-rose-500 flex items-center">
                +{overview.todayElectricity?.trendPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Today's Water Consumption */}
        <div 
          onClick={() => onNavigateTab('water')}
          className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm transition hover:shadow-md cursor-pointer hover:border-sky-400 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 group-hover:text-sky-500">
              Today's Water
            </span>
            <div className="w-9 h-9 rounded-lg bg-sky-100 dark:bg-sky-900/40 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Droplets className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {overview.todayWater?.value.toLocaleString()} <span className="text-sm font-normal text-slate-500">Liters</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-xs">
              <span className="font-semibold text-sky-600 dark:text-sky-400">
                ₹{overview.todayWater?.cost.toLocaleString()}
              </span>
              <span className="text-emerald-500 flex items-center">
                {overview.todayWater?.trendPercent}%
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Critical System Attention Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Electricity Alert */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start space-x-3.5">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
                AI Anomaly: Friday Spike in Block C
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-300">
                1,450 kWh (+78%)
              </span>
            </div>
            <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
              Unusual consumption detected. Suspected equipment left ON continuously or heavy unauthorized appliance draw.
            </p>
            <button
              onClick={() => onNavigateTab('anomalies')}
              className="mt-2.5 inline-flex items-center space-x-1 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline"
            >
              <span>View Anomaly Diagnostics & Assign Work</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Water Leakage Alert */}
        <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/60 flex items-start space-x-3.5">
          <div className="p-2 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Droplets className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-sky-900 dark:text-sky-200">
                Leakage Detected: Block A - Floor 2
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300">
                180 L/hr Night Flow
              </span>
            </div>
            <p className="mt-1 text-xs text-sky-800/80 dark:text-sky-300/80 leading-relaxed">
              Abnormal persistent water flow observed between 02:00 AM – 05:00 AM. Estimated financial loss ₹194.40/day.
            </p>
            <button
              onClick={() => onNavigateTab('water')}
              className="mt-2.5 inline-flex items-center space-x-1 text-xs font-semibold text-sky-700 dark:text-sky-400 hover:underline"
            >
              <span>Inspect Flow Pattern & Isolate Valve</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Main Trends & Predictive Nudge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Weekly Combined Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Hostel Aggregate Weekly Resource Consumption
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Electricity (kWh) vs Water Flow (x100 L) with AI Anomaly Tagging
              </p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              Past 7 Days
            </span>
          </div>

          <div className="h-72 w-full">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Predictive Resource Management Callout */}
        <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl border border-indigo-800 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Predictive Resource Engine</span>
            </div>
            <h3 className="mt-2 text-lg font-extrabold text-white">
              Tomorrow's Consumption Forecast
            </h3>
            <p className="mt-2 text-xs text-indigo-200 leading-relaxed">
              Based on <strong>142 approved student leaves and weekend outings</strong>, expected utility demand will drop significantly tomorrow:
            </p>

            <div className="mt-4 space-y-2.5">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-between">
                <span className="text-xs text-slate-300">⚡ Electricity Expected</span>
                <span className="text-xs font-bold text-amber-300">2,109 kWh (-13.9%)</span>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-between">
                <span className="text-xs text-slate-300">💧 Water Expected</span>
                <span className="text-xs font-bold text-cyan-300">32,752 L (-16.0%)</span>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-indigo-950/60 border border-indigo-700/50 text-[11px] text-indigo-200 leading-normal">
              💡 <strong>Action:</strong> Throttle auxiliary water booster pump to 65% capacity and defer 3 common chillers to conserve ₹3,520 tomorrow.
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('predictive')}
            className="mt-6 w-full py-2.5 px-4 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg transition"
          >
            <span>Explore 7-Day Predictive Model</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
