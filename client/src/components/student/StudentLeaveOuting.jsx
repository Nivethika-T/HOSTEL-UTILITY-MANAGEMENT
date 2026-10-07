import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Send, 
  Sparkles, 
  LogIn, 
  LogOut,
  BrainCircuit
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const StudentLeaveOuting = ({ leaves, onApplyLeave, onUpdateLeave }) => {
  const { currentUser } = useAuth();

  const [type, setType] = useState('Weekend Outing');
  const [departureDate, setDepartureDate] = useState('2026-09-28T14:00');
  const [returnDate, setReturnDate] = useState('2026-09-29T21:00');
  const [reason, setReason] = useState('Visiting local guardian in Tech Hub City');
  const [emergencyContact, setEmergencyContact] = useState('+91 98765 00112');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) return;

    await onApplyLeave({
      studentId: currentUser?.id || "usr-std-1",
      studentName: currentUser?.name || "Rahul Sharma",
      roomNo: currentUser?.roomNo || "204",
      block: currentUser?.block || "Block A",
      type,
      departureDate: new Date(departureDate).toISOString(),
      returnDate: new Date(returnDate).toISOString(),
      reason,
      emergencyContact
    });

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleToggleCheck = (leave) => {
    const newCheckedOut = !leave.checkedOut;
    const newStatus = newCheckedOut ? 'Checked Out' : 'Checked In';
    onUpdateLeave(leave.id, {
      checkedOut: newCheckedOut,
      status: newStatus
    });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-500 font-bold text-xs uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>Campus Gatepass & Outing Registry</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Leave & Outing Pass Management
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Apply for day outings and weekend leaves with instant check-out/check-in logging.
            </p>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 text-xs font-semibold">
            <BrainCircuit className="w-4 h-4 text-purple-500" />
            <span>AI Predictive Module Synced</span>
          </div>
        </div>
      </div>

      {/* Predictive Correlation Educational Banner (Prompt Requirement) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-transparent border border-purple-200 dark:border-purple-800/80 flex items-start space-x-3.5">
        <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
          <BrainCircuit className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <h4 className="font-bold text-purple-950 dark:text-purple-200">
            How Your Leave Informs Predictive Resource Management:
          </h4>
          <p className="mt-1 text-slate-600 dark:text-slate-300 leading-relaxed">
            "If 100 students are away from the hostel, expected electricity drops by ~240 kWh and water by ~4,400 L. 
            By logging your outing in advance, the hostel automatically de-rates secondary pumps and dims corridor HVAC."
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Outing / Leave Application Form */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            Apply for Outing / Leave Pass
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Pass is automatically routed to Chief Warden for verification
          </p>

          {submitted && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Pass application submitted! Awaiting warden approval.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Pass Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              >
                <option value="Day Outing">Day Outing (Return by 9:00 PM)</option>
                <option value="Weekend Outing">Weekend Outing (1-2 Days)</option>
                <option value="Home Leave">Home Leave (Extended)</option>
                <option value="Medical Leave">Medical Leave</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Departure Date & Time
              </label>
              <input
                type="datetime-local"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                required
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Expected Return Date & Time
              </label>
              <input
                type="datetime-local"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Emergency Contact Number
              </label>
              <input
                type="tel"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="+91 98765 00112"
                required
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Reason for Leave
              </label>
              <textarea
                rows="3"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Visiting local guardian / attending family wedding..."
                required
                className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Leave Request</span>
            </button>
          </form>
        </div>

        {/* Existing Passes & Check-In / Check-Out Actions */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Your Registered Outing Passes
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Click Check-Out when leaving through the campus gate, and Check-In upon return.
            </p>

            <div className="space-y-3">
              {leaves.map((l) => (
                <div 
                  key={l.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-750 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-slate-900 dark:text-white">#{l.id}</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">
                        {l.type}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        l.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300' :
                        l.status === 'Checked Out' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                      }`}>
                        {l.status}
                      </span>
                    </div>

                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      Reason: "{l.reason}"
                    </div>

                    <div className="text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap gap-x-3">
                      <span>Depart: {new Date(l.departureDate).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      <span>Return: {new Date(l.returnDate).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>Emergency: {l.emergencyContact}</span>
                    </div>
                  </div>

                  {/* Gate Check-In/Check-Out Button */}
                  <div className="shrink-0">
                    <button
                      onClick={() => handleToggleCheck(l)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm transition ${
                        l.checkedOut 
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white' 
                          : 'bg-amber-600 hover:bg-amber-500 text-white'
                      }`}
                    >
                      {l.checkedOut ? (
                        <>
                          <LogIn className="w-3.5 h-3.5" />
                          <span>Tap to Check-In</span>
                        </>
                      ) : (
                        <>
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Tap to Check-Out</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-xl bg-purple-50 dark:bg-purple-950/30 text-[11px] text-purple-800 dark:text-purple-300">
            🛡️ <strong>Safety Protocol:</strong> All gate passes require emergency contact verification.
          </div>
        </div>

      </div>

    </div>
  );
};
