import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Sun, 
  Moon, 
  ShieldCheck, 
  UserCheck, 
  Building2, 
  Zap, 
  Droplets, 
  ChevronDown, 
  Activity,
  LogOut,
  Bell
} from 'lucide-react';

export const Navbar = ({ activeRoleTab, setActiveRoleTab }) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { currentUser, switchUser, demoUsers, isAdmin } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Name */}
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
                  AI Optimization
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                Predictive Resource Management Dashboard
              </p>
            </div>
          </div>

          {/* Center Pill: Live Telemetry Indicator */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Live Utility Telemetry Active</span>
          </div>

          {/* Right Controls: Quick Switcher, Dark Mode, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Quick Demo Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center space-x-2 text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
                title="Switch persona for testing (Admin vs Student)"
              >
                {isAdmin ? (
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                ) : (
                  <UserCheck className="w-4 h-4 text-emerald-500" />
                )}
                <span className="hidden sm:inline font-semibold">
                  {isAdmin ? "👔 Warden Portal" : `👨‍🎓 ${currentUser.name.split(' ')[0]} (Rm ${currentUser.roomNo})`}
                </span>
                <span className="sm:hidden font-semibold">
                  {isAdmin ? "Admin" : "Student"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showUserDropdown && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setShowUserDropdown(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Switch Active Persona (S5 Demo)
                  </div>
                  {demoUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => switchUser(user.id)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center space-x-2.5 transition-colors ${
                        currentUser?.id === user.id
                          ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 font-semibold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                    >
                      {user.role === 'admin' ? (
                        <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                          W
                        </div>
                      ) : (
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                          {user.name[0]}
                        </div>
                      )}
                      <div className="truncate">
                        <div className="truncate font-medium">{user.name}</div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                          {user.role === 'admin' ? user.designation : `${user.block} • Room ${user.roomNo}`}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-spin-once" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
