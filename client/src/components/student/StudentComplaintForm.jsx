import React, { useState } from 'react';
import { 
  AlertCircle, 
  Send, 
  CheckCircle2, 
  Wrench, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PROBLEM_CATEGORIES = [
  "Water Leakage",
  "Broken Light",
  "Fan Problem",
  "Electrical Issue",
  "Bathroom Problem",
  "Furniture Damage",
  "Cleaning Issue",
  "Internet Problem",
  "Other"
];

export const StudentComplaintForm = ({ onSubmitComplaint, onNavigateToTrack }) => {
  const { currentUser } = useAuth();

  const [category, setCategory] = useState("Water Leakage");
  const [location, setLocation] = useState(`${currentUser?.block || 'Block A'} - Room ${currentUser?.roomNo || '204'}`);
  const [description, setDescription] = useState("Water is continuously leaking from the bathroom tap.");
  const [priority, setPriority] = useState("High");
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    setSubmitting(true);
    try {
      const parts = location.split('-');
      const block = parts[0]?.trim() || currentUser?.block || "Block A";
      const roomNo = parts[1]?.replace(/Room/i, '').trim() || currentUser?.roomNo || "204";

      const newTicket = await onSubmitComplaint({
        studentId: currentUser?.id || "usr-std-1",
        studentName: currentUser?.name || "Rahul Sharma",
        roomNo,
        block,
        category,
        title: `${category} in ${location}`,
        description,
        priority
      });

      setSubmittedTicket(newTicket || { id: "CMP-1027", title: category });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
          <Wrench className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
          Report a Facility or Utility Problem
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
          Log complaints for water leakage, electrical issues, furniture, or Wi-Fi. Tickets are immediately assigned to hostel technicians.
        </p>
      </div>

      {/* Success Notification after submission */}
      {submittedTicket && (
        <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 animate-in fade-in zoom-in-95 text-xs text-emerald-900 dark:text-emerald-200 space-y-3">
          <div className="flex items-center space-x-2 font-bold text-sm text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>Complaint Successfully Submitted! (Ticket #{submittedTicket.id})</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300">
            Your ticket has been dispatched to the Chief Warden and assigned for technician inspection. Expected resolution SLA is within 24 hours.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={onNavigateToTrack}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold flex items-center space-x-1.5 shadow-sm transition"
            >
              <span>Track Maintenance Progress</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setSubmittedTicket(null)}
              className="px-3 py-2 rounded-xl border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 font-semibold hover:bg-emerald-100/50 dark:hover:bg-emerald-900/30 transition"
            >
              File Another Problem
            </button>
          </div>
        </div>
      )}

      {/* The User's Exact Form Specification */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Problem Category */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Problem Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PROBLEM_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Block A - Room 204"
              required
              className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-[10px] text-slate-400 mt-1 block">
              Auto-filled with your assigned room. You can also specify common areas (e.g. Floor 2 Washroom).
            </span>
          </div>

          {/* Description */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Water is continuously leaking from the bathroom tap."
              required
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
              Priority Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['Low', 'Medium', 'High', 'Critical'].map((p) => (
                <button
                  type="button"
                  key={p}
                  onClick={() => setPriority(p)}
                  className={`py-2 px-3 rounded-xl font-bold text-xs transition border text-center ${
                    priority === p
                      ? p === 'Critical' ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : p === 'High' ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                        : 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              High / Critical tickets receive automated expedited dispatch and push notifications to duty technicians.
            </span>
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/20 transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Registering Ticket...' : '[Submit Complaint]'}</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};
