import React, { useState } from 'react';
import { 
  Droplets, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Building, 
  Gauge, 
  Wrench,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';

export const WaterManagement = ({ data, onCreateTicketFromLeak }) => {
  const [ticketCreated, setTicketCreated] = useState(false);

  if (!data) {
    return <div className="p-8 text-center text-slate-500">Loading Water Telemetry...</div>;
  }

  // 1. Hourly Flow Curve showing abnormal Night Flow (Leakage Signature)
  const hourlyFlowChart = {
    labels: data.hourlyFlow.map(h => h.hour),
    datasets: [
      {
        label: 'Flow Rate (Liters / Hour)',
        data: data.hourlyFlow.map(h => h.liters),
        borderColor: '#0284c7',
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, 'rgba(2, 132, 199, 0.05)');
          gradient.addColorStop(1, 'rgba(2, 132, 199, 0.35)');
          return gradient;
        },
        fill: true,
        tension: 0.35,
        pointBackgroundColor: data.hourlyFlow.map(h => h.leakSignature ? '#ef4444' : '#0284c7'),
        pointRadius: data.hourlyFlow.map(h => h.leakSignature ? 6 : 3)
      }
    ]
  };

  // 2. Block-Wise Water Bar Chart
  const blockWaterChart = {
    labels: data.blockWise.map(b => b.block),
    datasets: [
      {
        label: "Today's Consumption (Liters)",
        data: data.blockWise.map(b => b.totalLiters),
        backgroundColor: ['#0284c7', '#38bdf8', '#0ea5e9', '#7dd3fc'],
        borderRadius: 6
      }
    ]
  };

  const handleCreateEmergencyTicket = () => {
    setTicketCreated(true);
    if (onCreateTicketFromLeak) {
      onCreateTicketFromLeak({
        category: "Water Leakage",
        block: "Block A",
        roomNo: "Floor 2 Washroom Wing",
        description: "Automated alert: Continuous 180 L/hr night flow detected between 02:00 - 05:00 AM.",
        priority: "High"
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <div className="flex items-center space-x-2 text-sky-500 font-bold text-xs uppercase tracking-wider">
            <Droplets className="w-4 h-4" />
            <span>Hydraulic Telemetry & Flow Monitoring</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Water Management & Automated Leakage Detection
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor overhead reservoir levels, per-capita usage, and AI nocturnal leakage signatures.
          </p>
        </div>

        {/* Cost & Benchmark Pills */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-left">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Water Tariff</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">₹45.00 <span className="text-[10px] font-normal text-slate-500">/ 1,000 L</span></div>
          </div>
          <div className="px-3 py-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-left">
            <div className="text-[10px] text-sky-600 dark:text-sky-400 uppercase font-semibold">Today's Water Cost</div>
            <div className="text-sm font-bold text-sky-700 dark:text-sky-300">₹{data.waterCostToday}</div>
          </div>
        </div>
      </div>

      {/* Per Student & Per Room Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Water */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Total Water Today</span>
            <Droplets className="w-4 h-4 text-sky-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {data.totalWaterToday.toLocaleString()} <span className="text-sm font-normal text-slate-500">Liters</span>
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            38.5 kL total daily draw
          </div>
        </div>

        {/* Consumption Per Student */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Per Student / Day</span>
            <Gauge className="w-4 h-4 text-blue-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            {data.perStudentUsage} <span className="text-sm font-normal text-slate-500">L / day</span>
          </div>
          <div className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center">
            <CheckCircle className="w-3.5 h-3.5 mr-1" />
            <span>Well below 135 L norm</span>
          </div>
        </div>

        {/* Water Cost Estimation */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Estimated Cost</span>
            <span className="text-xs font-bold text-slate-500">₹</span>
          </div>
          <div className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">
            ₹{data.waterCostToday} <span className="text-sm font-normal text-slate-500">today</span>
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            ₹51,960 projected monthly
          </div>
        </div>

        {/* Leakage Status */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase">
            <span>Active Leak Alert</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="mt-2 text-2xl font-bold text-rose-600 dark:text-rose-400">
            {data.leakageDetection?.activeLeaks} Detected
          </div>
          <div className="mt-1 text-xs text-rose-500 font-semibold">
            {data.leakageDetection?.location}
          </div>
        </div>

      </div>

      {/* AI Leakage Detection Callout (Prompt Requirement) */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-500/10 via-sky-500/10 to-transparent border border-rose-200 dark:border-rose-900/60 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Automated Leakage Detection Algorithm (Night Flow Baseline)
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-100 text-rose-800 dark:bg-rose-900/80 dark:text-rose-300">
                  Active Signature
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                Persistent non-zero flow detected between <strong>02:00 AM and 05:00 AM</strong> in <strong>{data.leakageDetection.location}</strong>. 
                Normal nocturnal baseline is 30–50 L/hr; current telemetry shows <strong>{data.leakageDetection.estimatedWastage}</strong> (~₹194.40/day wasted).
              </p>
              
              <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Potential Causes:</span>
                {data.leakageDetection.reasons.map((r, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    • {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleCreateEmergencyTicket}
            disabled={ticketCreated}
            className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center space-x-2 shadow-md transition shrink-0 ${
              ticketCreated 
                ? 'bg-emerald-600 text-white cursor-default' 
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>{ticketCreated ? 'Ticket Dispatched (#CMP-1024)' : 'Create Plumbing Work Order'}</span>
          </button>
        </div>
      </div>

      {/* Hourly Flow Chart & Block-Wise Reservoir Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Hourly Flow Curve with Night Leak Spike */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                24-Hour Hydraulic Flow Pattern (Liters / Hour)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Red dots highlight abnormal nocturnal flow between 02:00 - 05:00 indicating leakage
              </p>
            </div>
            <Clock className="w-5 h-5 text-sky-500" />
          </div>

          <div className="h-64 w-full">
            <Line 
              data={hourlyFlowChart} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { title: { display: true, text: 'Flow Rate (L/hr)' } }
                }
              }} 
            />
          </div>
        </div>

        {/* Overhead Water Tank Levels */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Overhead Reservoir Levels
              </h3>
              <Droplets className="w-5 h-5 text-sky-500" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Real-time ultrasonic water level sensors across 4 blocks
            </p>

            <div className="space-y-4">
              {data.blockWise.map((b) => (
                <div key={b.block}>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-800 dark:text-slate-200">{b.block} Tank</span>
                    <span className={b.tankLevelPercent < 75 ? "text-amber-500 font-bold" : "text-sky-600 dark:text-sky-400 font-bold"}>
                      {b.tankLevelPercent}%
                    </span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        b.tankLevelPercent < 75 ? 'bg-amber-500' : 'bg-sky-500'
                      }`}
                      style={{ width: `${b.tankLevelPercent}%` }}
                    />
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{b.totalLiters.toLocaleString()} L today</span>
                    <span>{b.perStudent} L / student</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-700/50 text-xs text-slate-600 dark:text-slate-300">
            💧 <strong>Smart Pumping Advice:</strong> Schedule overhead tank refill cycle at 11:30 PM to take advantage of off-peak water pressure and lower electricity rates.
          </div>
        </div>

      </div>

      {/* Floor-Wise Water Distribution */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Floor-Wise Water Usage Audit
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Compares water usage across 4 vertical tiers in all blocks
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Floor Level</th>
                <th className="py-2.5 px-3">Block A</th>
                <th className="py-2.5 px-3">Block B</th>
                <th className="py-2.5 px-3">Block C</th>
                <th className="py-2.5 px-3">Block D</th>
                <th className="py-2.5 px-3">Diagnostics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {data.floorWise.map((f, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30">
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">{f.floor}</td>
                  <td className={`py-3 px-3 font-medium ${f.anomalyFlag ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-600 dark:text-slate-300'}`}>
                    {f.blockA} L
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{f.blockB} L</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{f.blockC} L</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{f.blockD} L</td>
                  <td className="py-3 px-3">
                    {f.anomalyFlag ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300">
                        ⚠️ 3,800 L (Elevated due to leakage)
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[11px]">Normal Flow Baseline</span>
                    )}
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
