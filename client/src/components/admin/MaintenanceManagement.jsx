import React, { useState } from 'react';
import { 
  Wrench, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  AlertCircle, 
  Filter, 
  Search, 
  MessageSquare, 
  ShieldAlert,
  Edit,
  ArrowRight
} from 'lucide-react';

const CATEGORIES = [
  "All",
  "Electrical",
  "Plumbing",
  "Water Leakage",
  "Furniture",
  "Room",
  "Bathroom",
  "Internet",
  "Cleaning",
  "Other"
];

const TECHNICIANS = [
  { name: "Ramesh Kumar", specialty: "Electrical & Appliances" },
  { name: "Suresh Patil", specialty: "Plumbing & Water Systems" },
  { name: "Manish Verma", specialty: "Carpentry & Furniture" },
  { name: "Amitabh Sen", specialty: "Network & IT Support" },
  { name: "Gopal Rao", specialty: "General Facility & Cleaning" }
];

export const MaintenanceManagement = ({ complaints, onUpdateComplaint }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Selected complaint for editing/assignment modal
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [editStatus, setEditStatus] = useState("");
  const [editTech, setEditTech] = useState("");
  const [editRemarks, setEditRemarks] = useState("");
  const [editPriority, setEditPriority] = useState("");

  const openEditModal = (c) => {
    setEditingComplaint(c);
    setEditStatus(c.status);
    setEditTech(c.assignedTechnician || "");
    setEditRemarks(c.remarks || "");
    setEditPriority(c.priority);
  };

  const handleSaveUpdates = () => {
    if (!editingComplaint) return;
    onUpdateComplaint(editingComplaint.id, {
      status: editStatus,
      assignedTechnician: editTech || null,
      remarks: editRemarks,
      priority: editPriority
    });
    setEditingComplaint(null);
  };

  const filtered = complaints.filter(c => {
    const matchesCat = selectedCategory === "All" || c.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesStatus = selectedStatus === "All" || c.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesPriority = selectedPriority === "All" || c.priority.toLowerCase() === selectedPriority.toLowerCase();
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.roomNo.includes(searchQuery);
    return matchesCat && matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-indigo-500 font-bold text-xs uppercase tracking-wider">
              <Wrench className="w-4 h-4" />
              <span>Hostel Facility Operations</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-1">
              Maintenance Management & SLA Tracking
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review student issues, assign technicians, configure SLAs, and manage resolution workflows.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-700 dark:text-blue-300">
              {complaints.filter(c => c.status !== 'Resolved').length} Open Tickets
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              {complaints.filter(c => c.status === 'Resolved').length} Resolved
            </span>
          </div>
        </div>
      </div>

      {/* Lifecycle Flow Banner (User's Exact Specification: Submitted -> Assigned -> In Progress -> Resolved) */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
        <div className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Maintenance Ticket Progression Pipeline:
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 font-semibold text-slate-600 dark:text-slate-400">
          <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">1. Submitted</span>
          <span>➔</span>
          <span className="px-2.5 py-1 rounded-md bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300">2. Assigned</span>
          <span>➔</span>
          <span className="px-2.5 py-1 rounded-md bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300">3. In Progress</span>
          <span>➔</span>
          <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300">4. Resolved</span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search Ticket ID, Student, Room..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
          >
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Assigned">Assigned</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="py-1.5 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400">
          Showing {filtered.length} of {complaints.length} tickets
        </span>
      </div>

      {/* Complaints Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-750 text-slate-500 dark:text-slate-400 uppercase font-semibold">
              <tr>
                <th className="py-3 px-3">Ticket ID</th>
                <th className="py-3 px-3">Student & Location</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-4">Issue Description</th>
                <th className="py-3 px-3">Priority</th>
                <th className="py-3 px-3">Assigned Tech</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-750">
              {filtered.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-750/30">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    #{c.id}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{c.studentName}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">{c.block} - Rm {c.roomNo}</div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 font-medium text-slate-700 dark:text-slate-300">
                      {c.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <div className="font-semibold text-slate-800 dark:text-slate-200 truncate">{c.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{c.description}</div>
                    {c.remarks && (
                      <div className="mt-0.5 text-[10px] text-blue-600 dark:text-blue-400 italic">
                        Remark: {c.remarks}
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      c.priority === 'Critical' 
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300'
                        : c.priority === 'High'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                    }`}>
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {c.assignedTechnician ? (
                      <span className="font-medium text-slate-800 dark:text-slate-200 flex items-center space-x-1">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{c.assignedTechnician}</span>
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-[11px]">Unassigned</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                      c.status === 'Resolved'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
                        : c.status === 'In Progress'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300'
                        : c.status === 'Assigned'
                        ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => openEditModal(c)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold inline-flex items-center space-x-1 transition"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Manage</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Assign Technician Modal */}
      {editingComplaint && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-700 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Manage Complaint #{editingComplaint.id}
                </h3>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {editingComplaint.block} - Rm {editingComplaint.roomNo} • {editingComplaint.category}
                </div>
              </div>
              <button 
                onClick={() => setEditingComplaint(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Status Selector (Submitted -> Assigned -> In Progress -> Resolved) */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Ticket Status Progression
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="Submitted">1. Submitted</option>
                  <option value="Assigned">2. Assigned</option>
                  <option value="In Progress">3. In Progress</option>
                  <option value="Resolved">4. Resolved</option>
                </select>
              </div>

              {/* Assign Technician */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Assign Technician
                </label>
                <select
                  value={editTech}
                  onChange={(e) => setEditTech(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="">Unassigned</option>
                  {TECHNICIANS.map(t => (
                    <option key={t.name} value={t.name}>{t.name} ({t.specialty})</option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Severity Priority
                </label>
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                >
                  <option value="Low">Low (72h SLA)</option>
                  <option value="Medium">Medium (48h SLA)</option>
                  <option value="High">High (24h SLA)</option>
                  <option value="Critical">Critical (12h SLA)</option>
                </select>
              </div>

              {/* Admin Remarks */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Admin / Technician Remarks
                </label>
                <textarea
                  rows="3"
                  value={editRemarks}
                  onChange={(e) => setEditRemarks(e.target.value)}
                  placeholder="Add notes, parts ordered, or resolution remarks..."
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
                />
              </div>

            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
              <button
                onClick={() => setEditingComplaint(null)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveUpdates}
                className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
