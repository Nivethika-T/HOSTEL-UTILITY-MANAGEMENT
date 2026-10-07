import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_USERS = [
  {
    id: "usr-admin-1",
    name: "Dr. Arvind Swaminathan",
    email: "warden@hostel.edu",
    role: "admin",
    designation: "Chief Hostel Warden",
    phone: "+91 98765 43210"
  },
  {
    id: "usr-std-1",
    name: "Rahul Sharma",
    email: "rahul.sharma@hostel.edu",
    role: "student",
    roomNo: "204",
    block: "Block A",
    floor: "Floor 2",
    rollNo: "CS21B045",
    phone: "+91 91234 56789",
    roommates: ["Arjun Nair", "Siddharth Verma"],
    greenScore: 84
  },
  {
    id: "usr-std-2",
    name: "Priya Patel",
    email: "priya.patel@hostel.edu",
    role: "student",
    roomNo: "112",
    block: "Block B",
    floor: "Floor 1",
    rollNo: "EC21B019",
    phone: "+91 98111 22334",
    roommates: ["Ananya Das"],
    greenScore: 91
  },
  {
    id: "usr-std-3",
    name: "Vikram Singhania",
    email: "vikram.s@hostel.edu",
    role: "student",
    roomNo: "305",
    block: "Block C",
    floor: "Floor 3",
    rollNo: "ME21B088",
    phone: "+91 97222 33445",
    roommates: ["Karthik R"],
    greenScore: 68
  }
];

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('hostel_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    return DEMO_USERS[0]; // Admin by default
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('hostel_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('hostel_current_user');
    }
  }, [currentUser]);

  const switchUser = (userId) => {
    const found = DEMO_USERS.find(u => u.id === userId);
    if (found) {
      setCurrentUser(found);
    }
  };

  const loginAsRole = (role) => {
    const found = DEMO_USERS.find(u => u.role === role);
    if (found) {
      setCurrentUser(found);
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUser,
        loginAsRole,
        logout,
        demoUsers: DEMO_USERS,
        isAdmin: currentUser?.role === 'admin',
        isStudent: currentUser?.role === 'student'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
