import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  AlertCircle, 
  MessageSquare, 
  Calendar, 
  ShieldCheck,
  Wrench,
  Circle
} from 'lucide-react';

const STEPS = [
  { key: 'Submitted', label: 'Submitted' },
  { key: 'Assigned', label: 'Assigned' },
  { key: 'In Progress', label: 'Technician Working' },
  { key: 'Resolved', label: 'Resolved' }
];

export const StudentComplaintTracker = ({ complaints, onNavigateToReport }) => {
  const getStepIndex = (status) => {
    switch (status) {
      case 'Submitted': return 0;
      case 'Assigned': return 1;
      case 'In Progress': return 2;
      case 'Resolved': return 3;
      default: return 0;
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-500 font-bold text-xs uppercase tracking-wider">
            <Wrench className="w-4 h-4" />
            <span>Service Resolution Progress</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
            Maintenance Request Tracker
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time step-by-step progress tracking for your hostel complaints.
          </p>
        </div>

        <button
          onClick={onNavigateToReport}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition self-start sm:self-auto"
        >
          + File New Complaint
        </button>
      </div>

      {complaints.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 p-12 rounded-2xl border border-slate-200 dark:border-slate-700 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Open Complaints</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            All your room's utility fixtures, plumbing, and electrical units are functioning optimally!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {complaints.map((c) => {
            const currentStepIdx = getStepIndex(c.status);

            return (
              <div 
                key={c.id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sm:p-7 space-y-6"
              >
                
                {/* Ticket Top Meta */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700 gap-2">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400">
                        Complaint #{c.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {c.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.priority === 'Critical' ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300' :
                        c.priority === 'High' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                      }`}>
                        {c.priority} Priority
                      </span>
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white mt-1">
                      {c.title}
                    </h3>
                  </div>

                  <div className="text-left sm:text-right text-xs text-slate-400">
                    <div>Logged: {new Date(c.createdAt).toLocaleDateString()}</div>
                    <div className="text-[11px] text-slate-500">Location: {c.block} - Rm {c.roomNo}</div>
                  </div>
                </div>

                {/* The User's Exact Visual Stepper:
                    ✓ Submitted
                    ✓ Assigned
                    ✓ Technician Working
                    ○ Resolved
                */}
                <div className="py-2">
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-4">
                    Resolution Status Pipeline
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {STEPS.map((step, idx) => {
                      const isComplete = idx <= currentStepIdx;
                      const isCurrent = idx === currentStepIdx;

                      return (
                        <div 
                          key={step.key}
                          className={`p-3.5 rounded-xl border flex items-center space-x-3 transition ${
                            isCurrent
                              ? 'bg-blue-50/80 dark:bg-blue-900/40 border-blue-500 shadow-sm'
                              : isComplete
                              ? 'bg-slate-50 dark:bg-slate-750 border-emerald-400/50'
                              : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-60'
                          }`}
                        >
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isComplete 
                              ? 'bg-emerald-500 text-white' 
                              : 'border-2 border-slate-300 text-slate-400'
                          }`}>
                            {isComplete ? '✓' : '○'}
                          </div>

                          <div className="truncate">
                            <div className={`text-xs font-bold truncate ${
                              isCurrent ? 'text-blue-600 dark:text-blue-400' : 
                              isComplete ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'
                            }`}>
                              {step.label}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {isCurrent ? 'Current Phase' : (isComplete ? 'Completed' : 'Pending')}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Student Ticket Details (User Requirements):
                    - Complaint date
                    - Assigned technician
                    - Current status
                    - Expected resolution
                    - Admin remarks
                */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-750 border border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  
                  {/* Complaint date */}
                  <div>
                    <span className="text-slate-400 uppercase font-semibold text-[10px] block">Complaint Date:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {new Date(c.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Assigned Technician */}
                  <div>
                    <span className="text-slate-400 uppercase font-semibold text-[10px] block">Assigned Technician:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 flex items-center space-x-1 mt-0.5">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                      <span>{c.assignedTechnician || 'Awaiting assignment'}</span>
                    </span>
                  </div>

                  {/* Current Status */}
                  <div>
                    <span className="text-slate-400 uppercase font-semibold text-[10px] block">Current Status:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                      {c.status}
                    </span>
                  </div>

                  {/* Expected Resolution */}
                  <div>
                    <span className="text-slate-400 uppercase font-semibold text-[10px] block">Expected Resolution:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center space-x-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Within {c.slaHours} hours (SLA)</span>
                    </span>
                  </div>

                </div>

                {/* Admin Remarks & Description */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-300">Reported Problem Description:</span>
                    <p className="mt-0.5 text-slate-600 dark:text-slate-400 leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      "{c.description}"
                    </p>
                  </div>

                  {c.remarks && (
                    <div>
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">Admin / Technician Remarks:</span>
                      <p className="mt-0.5 text-indigo-900 dark:text-indigo-200 leading-relaxed bg-indigo-50 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800">
                        {c.remarks}
                      </p>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
