import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { api } from './services/api';

// Admin Components
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ElectricityManagement } from './components/admin/ElectricityManagement';
import { WaterManagement } from './components/admin/WaterManagement';
import { AnomalyDetection } from './components/admin/AnomalyDetection';
import { CostOptimization } from './components/admin/CostOptimization';
import { PredictiveManagement } from './components/admin/PredictiveManagement';
import { MaintenanceManagement } from './components/admin/MaintenanceManagement';
import { AnnouncementsManagement } from './components/admin/AnnouncementsManagement';
import { ReportsExport } from './components/admin/ReportsExport';

// Student Components
import { StudentDashboard } from './components/student/StudentDashboard';
import { StudentElectricity } from './components/student/StudentElectricity';
import { StudentWater } from './components/student/StudentWater';
import { StudentComplaintForm } from './components/student/StudentComplaintForm';
import { StudentComplaintTracker } from './components/student/StudentComplaintTracker';
import { StudentAnnouncements } from './components/student/StudentAnnouncements';
import { StudentGreenScore } from './components/student/StudentGreenScore';
import { StudentLeaveOuting } from './components/student/StudentLeaveOuting';
import { StudentFeedback } from './components/student/StudentFeedback';
import { LoginRegister } from './components/auth/LoginRegister';

// Lucide Icons
import {
  LayoutDashboard,
  Zap,
  Droplets,
  ShieldAlert,
  DollarSign,
  BrainCircuit,
  Wrench,
  Bell,
  FileSpreadsheet,
  Home,
  AlertCircle,
  ClipboardList,
  Leaf,
  Calendar,
  MessageSquare,
  Building2,
  ChevronRight
} from 'lucide-react';

const MainApp = () => {
  const { currentUser, isAdmin, isStudent } = useAuth();

  // Admin Tab State
  const [adminTab, setAdminTab] = useState('overview');

  // Student Tab State
  const [studentTab, setStudentTab] = useState('dashboard');

  // Telemetry Data State
  const [overview, setOverview] = useState(null);
  const [electricityData, setElectricityData] = useState(null);
  const [waterData, setWaterData] = useState(null);
  const [anomalyData, setAnomalyData] = useState(null);
  const [optimizationData, setOptimizationData] = useState(null);
  const [predictiveData, setPredictiveData] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [studentStats, setStudentStats] = useState(null);

  // Load telemetry data from backend API
  const loadAllData = async () => {
    try {
      const [
        ovRes,
        elRes,
        wtRes,
        anRes,
        opRes,
        prRes,
        cpRes,
        anListRes,
        lvRes,
        fbRes
      ] = await Promise.all([
        api.getOverviewStats().catch(() => null),
        api.getElectricityAnalytics().catch(() => null),
        api.getWaterAnalytics().catch(() => null),
        api.getAnomalies().catch(() => null),
        api.getOptimizationRecommendations().catch(() => null),
        api.getPredictiveForecast().catch(() => null),
        api.getComplaints().catch(() => ({ complaints: [] })),
        api.getAnnouncements().catch(() => ({ announcements: [] })),
        api.getLeaves().catch(() => ({ leaves: [] })),
        api.getFeedback().catch(() => ({ feedback: [] }))
      ]);

      if (ovRes?.data) setOverview(ovRes.data);
      if (elRes?.data) setElectricityData(elRes.data);
      if (wtRes?.data) setWaterData(wtRes.data);
      if (anRes?.data) setAnomalyData(anRes.data);
      if (opRes?.data) setOptimizationData(opRes.data);
      if (prRes?.data) setPredictiveData(prRes.data);
      if (cpRes?.complaints) setComplaints(cpRes.complaints);
      if (anListRes?.announcements) setAnnouncements(anListRes.announcements);
      if (lvRes?.leaves) setLeaves(lvRes.leaves);
      if (fbRes?.feedback) setFeedbackList(fbRes.feedback);
    } catch (err) {
      console.error("Telemetry fetch error:", err);
    }
  };

  // Load student-specific stats when student changes
  const loadStudentData = async (studentId) => {
    try {
      const res = await api.getStudentStats(studentId);
      if (res?.data) {
        setStudentStats(res.data);
      }
    } catch (err) {
      console.error("Student stats fetch error:", err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  useEffect(() => {
    if (isStudent && currentUser?.id) {
      loadStudentData(currentUser.id);
    }
  }, [currentUser, isStudent]);

  // Handler for creating tickets from Anomaly / Leak
  const handleCreateTicketFromDiagnostic = async (ticketData) => {
    try {
      const res = await api.submitComplaint({
        studentId: "system-ai",
        studentName: "AI Anomaly Detector",
        roomNo: ticketData.roomNo || "General",
        block: ticketData.block || "Block A",
        category: ticketData.category || "Electrical",
        title: ticketData.title || `Automated Ticket: ${ticketData.category}`,
        description: ticketData.description,
        priority: ticketData.priority || "High"
      });
      if (res?.complaint) {
        setComplaints(prev => [res.complaint, ...prev]);
        loadAllData();
      }
    } catch (err) {
      console.error("Failed to create ticket:", err);
    }
  };

  // Complaint Operations
  const handleUpdateComplaint = async (id, updates) => {
    try {
      const res = await api.updateComplaint(id, updates);
      if (res?.complaint) {
        setComplaints(prev => prev.map(c => c.id === id ? res.complaint : c));
        if (isStudent && currentUser?.id) {
          loadStudentData(currentUser.id);
        }
      }
    } catch (err) {
      console.error("Failed to update complaint:", err);
    }
  };

  const handleStudentSubmitComplaint = async (complaintData) => {
    try {
      const res = await api.submitComplaint(complaintData);
      if (res?.complaint) {
        setComplaints(prev => [res.complaint, ...prev]);
        if (isStudent && currentUser?.id) {
          loadStudentData(currentUser.id);
        }
        return res.complaint;
      }
    } catch (err) {
      console.error("Failed to submit student complaint:", err);
    }
  };

  // Announcement Operations
  const handleCreateAnnouncement = async (announcementData) => {
    try {
      const res = await api.createAnnouncement(announcementData);
      if (res?.announcement) {
        setAnnouncements(prev => [res.announcement, ...prev]);
      }
    } catch (err) {
      console.error("Failed to post announcement:", err);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await api.deleteAnnouncement(id);
      setAnnouncements(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error("Failed to delete announcement:", err);
    }
  };

  // Leave Operations
  const handleApplyLeave = async (leaveData) => {
    try {
      const res = await api.applyLeave(leaveData);
      if (res?.leave) {
        setLeaves(prev => [res.leave, ...prev]);
      }
    } catch (err) {
      console.error("Failed to apply leave:", err);
    }
  };

  const handleUpdateLeave = async (id, updates) => {
    try {
      const res = await api.updateLeave(id, updates);
      if (res?.leave) {
        setLeaves(prev => prev.map(l => l.id === id ? res.leave : l));
      }
    } catch (err) {
      console.error("Failed to update leave status:", err);
    }
  };

  // Feedback Operations
  const handleSubmitFeedback = async (feedbackData) => {
    try {
      const res = await api.submitFeedback(feedbackData);
      if (res?.feedback) {
        setFeedbackList(prev => [res.feedback, ...prev]);
      }
    } catch (err) {
      console.error("Failed to submit feedback:", err);
    }
  };

  // Admin Navigation Tabs List
  const adminTabs = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'electricity', label: 'Electricity Management', icon: Zap },
    { id: 'water', label: 'Water Management', icon: Droplets },
    { id: 'anomalies', label: 'AI Anomaly Detection', icon: ShieldAlert, badge: anomalyData?.totalActiveAnomalies },
    { id: 'optimization', label: 'Cost Optimization', icon: DollarSign },
    { id: 'predictive', label: 'Predictive Resource Mgmt', icon: BrainCircuit, highlight: true },
    { id: 'maintenance', label: 'Maintenance & Complaints', icon: Wrench, badge: complaints.filter(c => c.status !== 'Resolved').length },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'reports', label: 'Reports & Export', icon: FileSpreadsheet }
  ];

  // Student Navigation Tabs List
  const studentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'electricity', label: 'Electricity Usage', icon: Zap },
    { id: 'water', label: 'Water Usage', icon: Droplets },
    { id: 'report', label: 'Report a Problem', icon: AlertCircle },
    { id: 'track', label: 'Maintenance Tracker', icon: ClipboardList, badge: complaints.filter(c => c.studentId === currentUser?.id && c.status !== 'Resolved').length },
    { id: 'announcements', label: 'Announcements', icon: Bell },
    { id: 'greenscore', label: 'Green Score', icon: Leaf },
    { id: 'leaves', label: 'Leave / Outing Pass', icon: Calendar },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare }
  ];

  const activeTabsList = isAdmin ? adminTabs : studentTabs;
  const currentTab = isAdmin ? adminTab : studentTab;
  const setCurrentTab = isAdmin ? setAdminTab : setStudentTab;

  if (!currentUser) {
    return <LoginRegister />;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      
      {/* Top Navigation Bar with Quick Persona Switcher and Theme Toggle */}
      <Navbar />

      {/* Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row gap-6">
        
        {/* Left Vertical Sidebar / Tab Bar */}
        <aside className="w-full md:w-64 shrink-0 space-y-4">
          
          {/* Active Persona Profile Card */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-md ${
                isAdmin 
                  ? 'bg-gradient-to-tr from-indigo-600 to-blue-600' 
                  : 'bg-gradient-to-tr from-emerald-600 to-teal-600'
              }`}>
                {currentUser?.name[0] || 'U'}
              </div>
              <div className="truncate">
                <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  {currentUser?.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  {isAdmin ? currentUser?.designation : `${currentUser?.block} • Room ${currentUser?.roomNo}`}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Portal View:</span>
              <span className={`font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isAdmin 
                  ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300' 
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300'
              }`}>
                {currentUser?.role}
              </span>
            </div>
          </div>

          {/* Navigation Tab Links */}
          <nav className="bg-white dark:bg-slate-800 p-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-1">
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {isAdmin ? "Admin Navigation" : "Student Services"}
            </div>

            {activeTabsList.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : tab.highlight
                      ? 'text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : (tab.highlight ? 'text-purple-500' : 'text-slate-400')}`} />
                    <span className="truncate">{tab.label}</span>
                  </div>

                  {tab.badge ? (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-white text-blue-600' : 'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300'
                    }`}>
                      {tab.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Mini Institutional Badge */}
          <div className="p-3.5 rounded-xl bg-slate-200/60 dark:bg-slate-800/50 border border-slate-300/60 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-400 space-y-1 hidden md:block">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-1">
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Smart Hostel Complex</span>
            </div>
            <div>Institutional S5 Mini Project</div>
            <div className="text-[10px] text-slate-400">Version 2.4 • Node & React</div>
          </div>

        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          
          {/* ================= ADMIN VIEWS ================= */}
          {isAdmin && (
            <>
              {adminTab === 'overview' && (
                <AdminDashboard 
                  overview={overview} 
                  onNavigateTab={(tab) => setAdminTab(tab)} 
                />
              )}

              {adminTab === 'electricity' && (
                <ElectricityManagement data={electricityData} />
              )}

              {adminTab === 'water' && (
                <WaterManagement 
                  data={waterData} 
                  onCreateTicketFromLeak={handleCreateTicketFromDiagnostic} 
                />
              )}

              {adminTab === 'anomalies' && (
                <AnomalyDetection 
                  data={anomalyData} 
                  onCreateTicket={handleCreateTicketFromDiagnostic} 
                />
              )}

              {adminTab === 'optimization' && (
                <CostOptimization data={optimizationData} />
              )}

              {adminTab === 'predictive' && (
                <PredictiveManagement data={predictiveData} />
              )}

              {adminTab === 'maintenance' && (
                <MaintenanceManagement 
                  complaints={complaints} 
                  onUpdateComplaint={handleUpdateComplaint} 
                />
              )}

              {adminTab === 'announcements' && (
                <AnnouncementsManagement 
                  announcements={announcements} 
                  onCreateAnnouncement={handleCreateAnnouncement}
                  onDeleteAnnouncement={handleDeleteAnnouncement} 
                />
              )}

              {adminTab === 'reports' && (
                <ReportsExport />
              )}
            </>
          )}

          {/* ================= STUDENT VIEWS ================= */}
          {isStudent && (
            <>
              {studentTab === 'dashboard' && (
                <StudentDashboard 
                  stats={studentStats} 
                  onNavigateTab={(tab) => setStudentTab(tab)} 
                />
              )}

              {studentTab === 'electricity' && (
                <StudentElectricity 
                  electricity={studentStats?.electricity} 
                  roomNo={currentUser?.roomNo} 
                  block={currentUser?.block} 
                />
              )}

              {studentTab === 'water' && (
                <StudentWater 
                  water={studentStats?.water} 
                  roomNo={currentUser?.roomNo} 
                  block={currentUser?.block} 
                />
              )}

              {studentTab === 'report' && (
                <StudentComplaintForm 
                  onSubmitComplaint={handleStudentSubmitComplaint} 
                  onNavigateToTrack={() => setStudentTab('track')} 
                />
              )}

              {studentTab === 'track' && (
                <StudentComplaintTracker 
                  complaints={complaints.filter(c => c.studentId === currentUser?.id || c.roomNo === currentUser?.roomNo)} 
                  onNavigateToReport={() => setStudentTab('report')} 
                />
              )}

              {studentTab === 'announcements' && (
                <StudentAnnouncements announcements={announcements} />
              )}

              {studentTab === 'greenscore' && (
                <StudentGreenScore 
                  greenScore={studentStats?.greenScore} 
                  smartRecommendations={studentStats?.smartRecommendations} 
                />
              )}

              {studentTab === 'leaves' && (
                <StudentLeaveOuting 
                  leaves={leaves.filter(l => l.studentId === currentUser?.id)} 
                  onApplyLeave={handleApplyLeave}
                  onUpdateLeave={handleUpdateLeave} 
                />
              )}

              {studentTab === 'feedback' && (
                <StudentFeedback 
                  feedbackList={feedbackList} 
                  onSubmitFeedback={handleSubmitFeedback} 
                />
              )}
            </>
          )}

        </main>

      </div>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-2">
          <div>
            <strong>Smart Hostel Utility Optimization and Predictive Resource Management Dashboard</strong>
          </div>
          <div>
            S5 Mini Project • High-Density Institutional Energy & Water Resource Center
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}
