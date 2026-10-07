import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  FileText, 
  Download, 
  Zap, 
  Droplets, 
  Users, 
  DoorClosed, 
  Wrench, 
  ClipboardList, 
  Printer, 
  CheckCircle,
  Eye
} from 'lucide-react';
import { api } from '../../services/api';
import { exportToPDF, exportToCSV } from '../../utils/exportUtils';

const REPORT_TYPES = [
  { id: 'electricity', label: 'Electricity Report', icon: Zap, color: 'text-amber-500 bg-amber-100 dark:bg-amber-950/40' },
  { id: 'water', label: 'Water Report', icon: Droplets, color: 'text-sky-500 bg-sky-100 dark:bg-sky-950/40' },
  { id: 'occupancy', label: 'Student Occupancy Report', icon: Users, color: 'text-indigo-500 bg-indigo-100 dark:bg-indigo-950/40' },
  { id: 'utilization', label: 'Room Utilization Report', icon: DoorClosed, color: 'text-purple-500 bg-purple-100 dark:bg-purple-950/40' },
  { id: 'maintenance', label: 'Maintenance Performance Report', icon: Wrench, color: 'text-emerald-500 bg-emerald-100 dark:bg-emerald-950/40' },
  { id: 'complaints', label: 'Complaint & SLA Report', icon: ClipboardList, color: 'text-rose-500 bg-rose-100 dark:bg-rose-950/40' }
];

export const ReportsExport = () => {
  const [selectedReportId, setSelectedReportId] = useState('electricity');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReport(selectedReportId);
  }, [selectedReportId]);

  const fetchReport = async (type) => {
    try {
      setLoading(true);
      const data = await api.getReportData(type);
      setReportData(data);
    } catch (e) {
      console.error("Error fetching report", e);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    if (!reportData) return;
    exportToPDF(reportData);
  };

  const handleExportCSV = () => {
    if (!reportData) return;
    exportToCSV(reportData.title, reportData.headers, reportData.rows);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-500 font-bold text-xs uppercase tracking-wider">
              <FileSpreadsheet className="w-4 h-4" />
              <span>Compliance & Institutional Audit</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Reports & Analytics Export Center
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Export high-resolution PDF audit documents and Excel/CSV spreadsheets across 6 institutional vectors.
            </p>
          </div>

          {/* Export Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              disabled={!reportData || loading}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center space-x-2 shadow-md transition"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={handleExportCSV}
              disabled={!reportData || loading}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center space-x-2 shadow-md transition"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Export Excel / CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* 6 Report Selector Tabs (User's Exact Specification) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {REPORT_TYPES.map((rep) => {
          const Icon = rep.icon;
          const isSelected = selectedReportId === rep.id;
          return (
            <button
              key={rep.id}
              onClick={() => setSelectedReportId(rep.id)}
              className={`p-3.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                isSelected 
                  ? 'bg-blue-50/80 dark:bg-blue-900/30 border-blue-500 shadow-sm ring-2 ring-blue-500/20' 
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${rep.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-xs font-bold ${isSelected ? 'text-blue-600 dark:text-blue-400' : 'text-slate-800 dark:text-slate-200'}`}>
                {rep.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Report Preview Canvas */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden p-6">
        
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-xs">
            Synthesizing telemetry data & generating report table...
          </div>
        ) : reportData ? (
          <div className="space-y-4">
            
            {/* Report Header Title */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-700 gap-2">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {reportData.title}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Apex International Institute of Technology • Generated: {new Date(reportData.generatedAt).toLocaleString()}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                <Eye className="w-3.5 h-3.5 text-blue-500" />
                <span>Live Audit Preview</span>
              </div>
            </div>

            {/* Summary KPI Badges */}
            {reportData.summary && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Executive KPI Digest:
                </div>
                <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-700 dark:text-slate-300">
                  {Object.entries(reportData.summary).map(([k, v]) => (
                    <div key={k} className="flex items-center space-x-1.5">
                      <span className="text-slate-400 capitalize">{k.replace(/([A-Z])/g, ' $1')}:</span>
                      <strong className="text-slate-900 dark:text-white">{v}</strong>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Data Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase font-bold">
                  <tr>
                    {reportData.headers.map((h, i) => (
                      <th key={i} className="py-2.5 px-3 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
                  {reportData.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-750/50">
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="py-3 px-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer download bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <span>Ready for formal institutional presentation & submission.</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportPDF}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold inline-flex items-center space-x-1 transition"
                >
                  <Download className="w-3 h-3 text-rose-500" />
                  <span>Save as PDF</span>
                </button>
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold inline-flex items-center space-x-1 transition"
                >
                  <Download className="w-3 h-3 text-emerald-500" />
                  <span>Save as CSV</span>
                </button>
              </div>
            </div>

          </div>
        ) : null}

      </div>

    </div>
  );
};
