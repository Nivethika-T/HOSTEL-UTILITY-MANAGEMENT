import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { api } from '../../services/api';
import { 
  Building2, 
  ShieldCheck, 
  UserCheck, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  DoorClosed, 
  Layers, 
  KeyRound, 
  Sparkles, 
  ArrowRight, 
  Sun, 
  Moon, 
  AlertCircle, 
  CheckCircle2,
  Zap,
  Droplets,
  Eye,
  EyeOff
} from 'lucide-react';

export const LoginRegister = () => {
  const { loginWithUser, loginAsDemo, refreshUsers, demoUsers } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();

  // Mode: 'login' | 'register'
  const [mode, setMode] = useState('login');

  // Role: 'admin' (Warden) | 'student'
  const [selectedRole, setSelectedRole] = useState('admin');

  // Common Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Student Register States
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [block, setBlock] = useState('Block A');
  const [floor, setFloor] = useState('Floor 2');
  const [roomNo, setRoomNo] = useState('204');
  const [phone, setPhone] = useState('');
  const [roommates, setRoommates] = useState('');

  // Warden Register States
  const [designation, setDesignation] = useState('Chief Hostel Warden');
  const [staffKey, setStaffKey] = useState('WARDEN2026');

  // Handle Login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await api.login({
        email: email.trim(),
        password: password.trim(),
        role: selectedRole
      });

      if (res?.success && res?.user) {
        setSuccessMsg(`Welcome back, ${res.user.name}! Entering dashboard...`);
        setTimeout(() => {
          loginWithUser(res.user);
        }, 500);
      } else {
        setError(res?.message || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials or select a demo profile.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Register Submit
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const payload = {
        name,
        email: email.trim(),
        password: password.trim(),
        role: selectedRole,
        phone
      };

      if (selectedRole === 'admin') {
        payload.designation = designation;
        payload.staffKey = staffKey;
      } else {
        payload.rollNo = rollNo;
        payload.block = block;
        payload.floor = floor;
        payload.roomNo = roomNo;
        payload.roommates = roommates;
      }

      const res = await api.register(payload);

      if (res?.success && res?.user) {
        setSuccessMsg(`Account created successfully for ${res.user.name}! Launching dashboard...`);
        await refreshUsers();
        setTimeout(() => {
          loginWithUser(res.user);
        }, 700);
      } else {
        setError(res?.message || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Email might already be taken.');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Profiles (For Instant Evaluation)
  const quickDemoSelect = (user) => {
    loginAsDemo(user);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors relative overflow-hidden font-sans">
      
      {/* Decorative Background Lighting Gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Brand & Dark Mode Toggle */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900 dark:text-white">
                SmartHostel
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-700">
                S5 Mini Project
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              Apex International Institute of Technology
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>
      </header>

      {/* Main Authentication Card Container */}
      <main className="max-w-xl w-full mx-auto px-4 py-4 z-10">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8 backdrop-blur-md">
          
          {/* Header Title */}
          <div className="text-center space-y-1.5 mb-6">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {mode === 'login' ? 'Hostel Portal Login' : 'Create New Account'}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Utility Optimization & Predictive Resource Management Dashboard
            </p>
          </div>

          {/* Mode Tabs: [Sign In] vs [Register] */}
          <div className="grid grid-cols-2 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 mb-6">
            <button
              onClick={() => { setMode('login'); setError(''); setSuccessMsg(''); }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'login'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sign In (Login)
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); setSuccessMsg(''); }}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                mode === 'register'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Register (New Account)
            </button>
          </div>

          {/* Role Selection Cards: Warden vs Student */}
          <div className="space-y-2 mb-6">
            <label className="block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Select Your Access Role:
            </label>
            <div className="grid grid-cols-2 gap-3">
              
              {/* Warden (Admin) Option */}
              <button
                type="button"
                onClick={() => setSelectedRole('admin')}
                className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === 'admin'
                    ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/40 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-850'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedRole === 'admin' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-extrabold ${selectedRole === 'admin' ? 'text-indigo-950 dark:text-indigo-200' : 'text-slate-800 dark:text-slate-200'}`}>
                    Warden / Admin
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Chief Warden, Floor Incharge & Staff
                  </div>
                </div>
              </button>

              {/* Student Option */}
              <button
                type="button"
                onClick={() => setSelectedRole('student')}
                className={`p-3.5 rounded-2xl border text-left flex items-start space-x-3 transition-all ${
                  selectedRole === 'student'
                    ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 shadow-sm ring-2 ring-emerald-500/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-850'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                  selectedRole === 'student' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}>
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className={`text-xs font-extrabold ${selectedRole === 'student' ? 'text-emerald-950 dark:text-emerald-200' : 'text-slate-800 dark:text-slate-200'}`}>
                    Hostel Student
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Resident Scholars across Blocks A–D
                  </div>
                </div>
              </button>

            </div>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-xs text-rose-800 dark:text-rose-300 flex items-start space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-800 dark:text-emerald-300 flex items-start space-x-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* FORM: LOGIN */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  {selectedRole === 'admin' ? 'Official Warden Email' : 'Student Email or Roll Number'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={selectedRole === 'admin' ? 'warden@hostel.edu' : 'rahul.sharma@hostel.edu'}
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium cursor-pointer hover:underline">
                    Default: {selectedRole === 'admin' ? 'warden123' : 'student123'}
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 transition cursor-pointer"
              >
                <span>{loading ? 'Authenticating...' : `Enter ${selectedRole === 'admin' ? 'Warden Portal' : 'Student Portal'}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* FORM: REGISTER */}
          {mode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4 text-xs">
              
              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={selectedRole === 'admin' ? 'Dr. Meenakshi Sundaram' : 'Aarav Gupta'}
                    required
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email & Phone Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={selectedRole === 'admin' ? 'warden.new@hostel.edu' : 'aarav.g@hostel.edu'}
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Create Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* WARDEN SPECIFIC FIELDS */}
              {selectedRole === 'admin' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                  <div>
                    <label className="block font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                      Warden Designation
                    </label>
                    <input
                      type="text"
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Chief Hostel Warden"
                      required
                      className="w-full p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-indigo-900 dark:text-indigo-200 mb-1">
                      Staff Security Passkey
                    </label>
                    <input
                      type="text"
                      value={staffKey}
                      onChange={(e) => setStaffKey(e.target.value)}
                      placeholder="WARDEN2026"
                      required
                      className="w-full p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white font-mono"
                    />
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-0.5 block">
                      Default Key: <strong>WARDEN2026</strong>
                    </span>
                  </div>
                </div>
              )}

              {/* STUDENT SPECIFIC FIELDS */}
              {selectedRole === 'student' && (
                <div className="space-y-3 p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                        College Roll No
                      </label>
                      <input
                        type="text"
                        value={rollNo}
                        onChange={(e) => setRollNo(e.target.value)}
                        placeholder="e.g. CS23B045"
                        required
                        className="w-full p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                        Hostel Block
                      </label>
                      <select
                        value={block}
                        onChange={(e) => setBlock(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      >
                        <option value="Block A">Block A (Senior Tech)</option>
                        <option value="Block B">Block B (Junior Tech)</option>
                        <option value="Block C">Block C (Science & Labs)</option>
                        <option value="Block D">Block D (Postgrad)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                        Floor Level
                      </label>
                      <select
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      >
                        <option value="Floor 1">Floor 1 (Ground)</option>
                        <option value="Floor 2">Floor 2</option>
                        <option value="Floor 3">Floor 3</option>
                        <option value="Floor 4">Floor 4 (Top)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                        Assigned Room No
                      </label>
                      <input
                        type="text"
                        value={roomNo}
                        onChange={(e) => setRoomNo(e.target.value)}
                        placeholder="e.g. 204"
                        required
                        className="w-full p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-emerald-900 dark:text-emerald-200 mb-1">
                      Roommates (Optional, comma-separated)
                    </label>
                    <input
                      type="text"
                      value={roommates}
                      onChange={(e) => setRoommates(e.target.value)}
                      placeholder="e.g. Rohan V, Deepak S"
                      className="w-full p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/25 transition cursor-pointer"
              >
                <span>{loading ? 'Creating Account...' : `Register as ${selectedRole === 'admin' ? 'Hostel Warden' : 'Resident Student'}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* 1-CLICK FAST DEMO LOGIN PROFILES (FOR PROFESSORS / EVALUATION) */}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center space-x-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>1-Click Evaluator Quick Logins:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              
              {/* Warden Demo */}
              <button
                type="button"
                onClick={() => quickDemoSelect(demoUsers[0])}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 bg-slate-50 dark:bg-slate-800/60 text-left transition flex items-center space-x-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs shrink-0">
                  W
                </div>
                <div className="truncate">
                  <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    Chief Warden
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    Dr. Arvind Swaminathan
                  </div>
                </div>
              </button>

              {/* Student 1 (Rahul Sharma - Room 204) */}
              <button
                type="button"
                onClick={() => quickDemoSelect(demoUsers[1])}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left transition flex items-center space-x-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  R
                </div>
                <div className="truncate">
                  <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    Rahul Sharma
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    Block A • Room 204 (CS21B045)
                  </div>
                </div>
              </button>

              {/* Student 2 (Priya Patel - Room 112) */}
              <button
                type="button"
                onClick={() => quickDemoSelect(demoUsers[2])}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left transition flex items-center space-x-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  P
                </div>
                <div className="truncate">
                  <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    Priya Patel
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    Block B • Room 112 (EC21B019)
                  </div>
                </div>
              </button>

              {/* Student 3 (Vikram Singhania - Room 305) */}
              <button
                type="button"
                onClick={() => quickDemoSelect(demoUsers[3])}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800/60 text-left transition flex items-center space-x-2.5"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                  V
                </div>
                <div className="truncate">
                  <div className="font-bold text-slate-800 dark:text-slate-200 truncate">
                    Vikram Singhania
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    Block C • Room 305 (ME21B088)
                  </div>
                </div>
              </button>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-500 dark:text-slate-400 z-10">
        Smart Hostel Utility Optimization & Predictive Resource Management Dashboard • S5 Mini Project
      </footer>

    </div>
  );
};
