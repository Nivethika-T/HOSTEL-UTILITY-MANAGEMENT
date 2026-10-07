import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  PieChart, 
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';

export const StudentElectricity = ({ electricity, roomNo, block }) => {
  if (!electricity) return null;

  // 7-Day Personal Trend Line Chart
  const trendChartData = {
    labels: electricity.dailyTrend7Days.map(d => d.day),
    datasets: [
      {
        label: 'Room Electricity (kWh)',
        data: electricity.dailyTrend7Days.map(d => d.kwh),
        borderColor: '#f59e0b',
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: '#f59e0b'
      }
    ]
  };

  // Appliance Breakdown Doughnut Chart
  const applianceChartData = {
    labels: electricity.applianceBreakdown.map(a => a.name),
    datasets: [
      {
        data: electricity.applianceBreakdown.map(a => a.percent),
        backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6'],
        borderWidth: 0
      }
    ]
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Personal Sub-Metering Telemetry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Room {roomNo} Electricity Usage & Cost Breakdown
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live consumption readings for {block} - Room {roomNo} with historical peer comparisons.
            </p>
          </div>

          <div className="px-4 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-left">
            <div className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-semibold">Estimated Monthly Room Bill</div>
            <div className="text-lg font-black text-amber-700 dark:text-amber-300">
              ₹{electricity.estimatedMonthlyCost?.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Usage Trend Callout (Exact User Specification) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 flex items-start space-x-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20">
          <TrendingUp className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              Usage Trend Analysis
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-800 dark:text-amber-300">
              Weekly Alert
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-amber-950 dark:text-amber-100">
            "Your room consumed {electricity.weeklyChangePercent}% more electricity this week than last week."
          </p>
          <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-300/80">
            Peak appliance draw was registered on Friday evening (16.5 kWh). Consider switching off unused study lamps and personal cooling fans.
          </p>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's Usage */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Today's Usage</div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {electricity.todayKwh} <span className="text-sm font-normal text-slate-500">kWh</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Cost today: <strong>₹{electricity.todayCost}</strong>
          </div>
        </div>

        {/* Weekly Usage */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Weekly Total</div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {electricity.weeklyKwh} <span className="text-sm font-normal text-slate-500">kWh</span>
          </div>
          <div className="mt-1 text-xs text-rose-500 font-semibold flex items-center">
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            <span>+{electricity.weeklyChangePercent}% vs last week</span>
          </div>
        </div>

        {/* Monthly Usage */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Monthly Total</div>
          <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
            {electricity.monthlyKwh} <span className="text-sm font-normal text-slate-500">kWh</span>
          </div>
          <div className="mt-1 text-xs text-slate-500">
            Active billing cycle
          </div>
        </div>

        {/* Previous Month Comparison */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="text-xs text-slate-400 uppercase font-semibold">Previous Month Comparison</div>
          <div className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {electricity.monthlyChangePercent}%
          </div>
          <div className="mt-1 text-xs text-emerald-600 font-semibold flex items-center">
            <TrendingDown className="w-3.5 h-3.5 mr-1" />
            <span>Lower than prev month (448 kWh)</span>
          </div>
        </div>

      </div>

      {/* 7-Day Personal Trend & Estimated Appliance Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Line Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Room {roomNo} Daily Consumption Trend
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Daily meter logs across the current 7-day period
              </p>
            </div>
            <Clock className="w-5 h-5 text-amber-500" />
          </div>

          <div className="h-64 w-full">
            <Line 
              data={trendChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { title: { display: true, text: 'kWh / day' } }
                }
              }} 
            />
          </div>
        </div>

        {/* Appliance Breakdown */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Estimated Appliance Split
              </h3>
              <PieChart className="w-5 h-5 text-blue-500" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Estimated sub-circuit power distribution
            </p>

            <div className="h-44 flex items-center justify-center">
              <Doughnut data={applianceChartData} options={{ maintainAspectRatio: false }} />
            </div>

            <div className="mt-4 space-y-1.5 text-xs">
              {electricity.applianceBreakdown.map((a, i) => (
                <div key={i} className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                  <span>{a.name}</span>
                  <span className="font-bold">{a.percent}% ({a.kwh} kWh)</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 text-[11px] text-amber-800 dark:text-amber-300">
            💡 <strong>Tip:</strong> Turning off the ceiling fan while in college saves up to ~1.8 kWh daily.
          </div>
        </div>

      </div>

    </div>
  );
};
