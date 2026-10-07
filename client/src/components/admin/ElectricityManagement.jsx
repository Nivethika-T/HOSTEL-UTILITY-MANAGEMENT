import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Building, 
  Layers, 
  Search, 
  AlertCircle, 
  DollarSign, 
  Sparkles,
  Sliders,
  Filter
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
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
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const ElectricityManagement = ({ data }) => {
  const [selectedBlock, setSelectedBlock] = useState('All');
  const [roomSearch, setRoomSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  if (!data) {
    return <div className="p-8 text-center text-slate-500">Loading Electricity Management Telemetry...</div>;
  }

  // 1. 24-Hour Load Curve with Peak Detection
  const hourlyChartData = {
    labels: data.hourlyCurve.map(h => h.hour),
    datasets: [
      {
        label: 'Hourly Consumption (kWh)',
        data: data.hourlyCurve.map(h => h.kwh),
        borderColor: '#f59e0b',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(245, 158, 11, 0.02)');
          gradient.addColorStop(1, 'rgba(245, 158, 11, 0.35)');
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointBackgroundColor: data.hourlyCurve.map(h => h.isPeak ? '#ef4444' : '#f59e0b'),
        pointRadius: data.hourlyCurve.map(h => h.isPeak ? 5 : 3)
      }
    ]
  };

  // 2. Block-Wise Comparison Bar Chart
  const blockChartData = {
    labels: data.blockWise.map(b => b.block),
    datasets: [
      {
        label: 'Actual This Week (kWh)',
        data: data.blockWise.map(b => b.weeklyKwh),
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderRadius: 6
      },
      {
        label: 'Historical Weekly Average (kWh)',
        data: data.blockWise.map(b => b.avgWeeklyKwh),
        backgroundColor: 'rgba(148, 163, 184, 0.4)',
        borderRadius: 6
      }
    ]
  };

  // Filtered Rooms
  const filteredRooms = data.roomWise.filter(r => {
    const matchesBlock = selectedBlock === 'All' || r.block === selectedBlock;
    const matchesSearch = r.roomNo.includes(roomSearch) || r.students.toLowerCase().includes(roomSearch.toLowerCase());
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchesBlock && matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">

      {/* Header & Quick Tariff Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            <span>Power & Energy Telemetry</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Electricity Management & Tariff Optimization
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor real-time institutional power loads, peak tariffs, and multi-tier floor consumption.
          </p>
        </div>

        {/* Tariffs and Cost Pill */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-left">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Standard Tariff</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">₹8.00 <span className="text-[10px] font-normal text-slate-500">/ kWh</span></div>
          </div>
          <div className="px-3 py-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-left">
            <div className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-semibold">Peak Tariff (2-5PM, 8-11PM)</div>
            <div className="text-sm font-bold text-amber-700 dark:text-amber-300">₹11.50 <span className="text-[10px] font-normal text-amber-600">/ kWh</span></div>
          </div>
        </div>
      </div>

      {/* Smart Analytics Highlight Box (User's Exact Specification) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-amber-500/5 border border-amber-200 dark:border-amber-800/80 flex items-start space-x-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200">
              Smart Analytics Engine Insight
            </h4>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
              Automated Anomaly Tag
            </span>
          </div>
          <p className="mt-1 text-sm font-semibold text-amber-950 dark:text-amber-100">
            "{data.smartInsight}"
          </p>
          <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-300/80">
            Root cause analysis identifies excessive evening appliance draw and cooling loads in Block A and Block C.
          </p>
        </div>
      </div>

      {/* 24-Hour Load Curve with Peak Detection */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              24-Hour Institutional Load Profile & Peak Hour Windows
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Red points indicate peak tariff surcharge intervals (14:00 - 17:00 & 20:00 - 23:00)
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span className="text-slate-600 dark:text-slate-400">Normal Hours</span>
            </span>
            <span className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span className="text-slate-600 dark:text-slate-400 font-semibold">Peak Hours (+43% Tariff)</span>
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <Line 
            data={hourlyChartData} 
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  title: { display: true, text: 'Active Power (kWh)' }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Block-Wise & Floor-Wise Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Block-Wise Comparison */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Block-Wise Weekly Consumption Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Current week vs 4-week historical average
              </p>
            </div>
            <Building className="w-5 h-5 text-blue-500" />
          </div>

          <div className="h-64 w-full">
            <Bar 
              data={blockChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { title: { display: true, text: 'Total Weekly kWh' } }
                }
              }} 
            />
          </div>

          {/* Block cards */}
          <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {data.blockWise.map(b => (
              <div key={b.block} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between font-bold text-slate-800 dark:text-slate-200">
                  <span>{b.block}</span>
                  <span className={b.changePercent > 0 ? "text-rose-500" : "text-emerald-500"}>
                    {b.changePercent > 0 ? `+${b.changePercent}%` : `${b.changePercent}%`}
                  </span>
                </div>
                <div className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  {b.todayKwh} kWh today • {b.students} students
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Floor-Wise Consumption Breakdown */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Floor-Wise Multi-Block Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Identifies vertical energy density across 4 floors
              </p>
            </div>
            <Layers className="w-5 h-5 text-indigo-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Floor Level</th>
                  <th className="py-2.5 px-2">Block A</th>
                  <th className="py-2.5 px-2">Block B</th>
                  <th className="py-2.5 px-2">Block C</th>
                  <th className="py-2.5 px-2">Block D</th>
                  <th className="py-2.5 px-3 font-bold text-slate-900 dark:text-white">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {data.floorWise.map((f, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30">
                    <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">{f.floor}</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{f.blockA} kWh</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{f.blockB} kWh</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{f.blockC} kWh</td>
                    <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{f.blockD} kWh</td>
                    <td className="py-3 px-3 font-bold text-blue-600 dark:text-blue-400">{f.total} kWh</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs text-blue-800 dark:text-blue-300">
            📊 <strong>Observation:</strong> Floor 2 exhibits the highest cumulative load (660 kWh), driven by common media halls and study lounges in Block C.
          </div>
        </div>

      </div>

      {/* Room-Wise Consumption Audit Table (Admin Core Feature) */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Room-Wise Electricity Audit & Top Consumers
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drill down into individual room meters to detect anomalies or excessive usage
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search Room or Student..."
                value={roomSearch}
                onChange={(e) => setRoomSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>

            <select
              value={selectedBlock}
              onChange={(e) => setSelectedBlock(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Blocks</option>
              <option value="Block A">Block A</option>
              <option value="Block B">Block B</option>
              <option value="Block C">Block C</option>
              <option value="Block D">Block D</option>
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Statuses</option>
              <option value="Critical">Critical</option>
              <option value="Warning">Warning</option>
              <option value="Optimal">Optimal</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Room</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Occupants</th>
                <th className="py-2.5 px-3">Today Usage</th>
                <th className="py-2.5 px-3">Weekly Total</th>
                <th className="py-2.5 px-3">Variance vs Avg</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredRooms.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30">
                  <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                    Room {r.roomNo}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    {r.block} • {r.floor}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                    <div>{r.occupants} Students</div>
                    <div className="text-[10px] text-slate-400 truncate max-w-xs">{r.students}</div>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {r.todayKwh} kWh
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {r.weeklyKwh} kWh
                  </td>
                  <td className="py-3 px-3">
                    <span className={`font-bold ${r.changeVsAvg.startsWith('+') ? 'text-rose-500' : 'text-emerald-500'}`}>
                      {r.changeVsAvg}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      r.status === 'Critical'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                        : r.status === 'Warning'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
