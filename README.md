# Smart Hostel Utility Optimization & Predictive Resource Management Dashboard
### High-Density Institutional Energy & Hydraulic Conservation System (S5 Mini Project)

[![Node.js](https://img.shields.io/badge/Node.js-v22.15-green.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.2-blue.svg)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-v19.2-cyan.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)

---

## 🌟 Executive Summary

**Smart Hostel Utility Optimization and Predictive Resource Management Dashboard** is a full-stack IoT and AI-driven telemetry application tailored for high-density educational institutions (hostels, residential universities, dormitories).

The system addresses the dual challenges of **uncontrolled utility wastage** and **unpredictable load surges** by pairing sub-metering telemetry with **AI Anomaly Detection** and an innovative **Predictive Resource Management Module** that correlates student outing and leave schedules with expected institutional utility demand.

---

## 🚀 Key Features

### 1. 👔 Admin (Chief Warden) Portal
* **Institutional Dashboard Cards**:
  * 👥 Total Students (850)
  * 🛏️ Total Rooms (300)
  * 🏠 Occupied Rooms (284 — 94.7% occupancy rate)
  * ⚡ Today's Electricity Consumption (2,420 kWh • ₹21,732)
  * 💧 Today's Water Consumption (38,500 L • ₹1,733)
* **⚡ Electricity Management**:
  * 24-Hour Load Curve with highlighted **Peak Hour Surcharge Windows** (2 PM – 5 PM & 8 PM – 11 PM)
  * Block-wise weekly consumption breakdown (Block A, B, C, D)
  * Floor-wise multi-tier vertical energy density audit (Floors 1 to 4)
  * Room-wise top consumers audit table with search, block filter, and variance tags
  * Smart Analytics Engine: *"Block A consumed 18% more electricity than its average this week."*
* **💧 Water Management & Automated Leakage Detection**:
  * Total daily draw & consumption per student (45.3 L/day benchmarked against 135 L norm)
  * Overhead reservoir ultrasonic sensor levels across 4 residential blocks
  * **Nocturnal Leakage Detection**: Identifies abnormal flow patterns (e.g. 180 L/hr night flow between 02:00 AM – 05:00 AM in Block A Floor 2)
  * 1-Click conversion of leak alerts into dispatched plumbing work orders
* **🧠 AI-Based Anomaly Detection**:
  * Automated statistical IQR and Z-score anomaly detector
  * **Exact Benchmark Incident**:
    * Mon: 800 kWh | Tue: 820 kWh | Wed: 810 kWh | Thu: 815 kWh | **Fri: 1,450 kWh ⚠️**
    * Inferred root causes: Equipment left ON, faulty appliance, electrical leakage, unauthorized high-wattage coils
  * Live load spike simulator for evaluators
* **💰 Cost & Tariff Optimization**:
  * Prescriptive Directive: *"Electricity consumption is 15% higher than normal. Reducing AC usage during 2 PM–5 PM could save approximately ₹18,500 this month."*
  * Peak hour shaving, high-consumption room audits, motor capacitor servicing, and photocell corridor lighting automation
  * **Interactive Policy Sandbox**: Dynamic sliders calculating real-time monthly rupee savings
* **🔮 Predictive Resource Management (Project Highlight)**:
  * **Student Leave / Outing Correlation**: Directly correlates approved student leaves with expected demand drop (~2.4 kWh/student, ~44 L/student)
  * Real-time projection: *"Tomorrow 142 students on approved leave: Expected utility demand drops by -14.8% (Electricity: -380 kWh, Water: -6,200 L)"*
  * Actionable directives: Automated de-rating of auxiliary booster pumps and chiller staging
* **🛠️ Maintenance Management**:
  * Complete lifecycle: `Submitted ➔ Assigned ➔ In Progress ➔ Resolved`
  * Technician roster with specialties (Electrical, Plumbing, Furniture, IT, Cleaning)
  * Priority SLA tracking (12h, 24h, 48h, 72h) and remarks logging
* **📢 Campus Announcements Broadcast**:
  * Dispatch alerts with 1-click presets:
    * ⚡ *Power maintenance scheduled tomorrow 10 AM–12 PM*
    * 💧 *Water supply will be interrupted from 2 PM–4 PM*
    * 🧹 *Room inspection scheduled for Friday*
* **📄 Reports & Analytics Export**:
  * 6 Audited Reports: Electricity, Water, Student Occupancy, Room Utilization, Maintenance Performance, Complaints Log
  * **Export to PDF**: Generated using `jspdf` and `jspdf-autotable`
  * **Export to Excel / CSV**: Instant tabular downloads

---

### 2. 👨‍🎓 Student Portal
* **🏠 Student Dashboard**:
  * Resident profile (Name, Roll Number, Room Number, Block, Floor, Roommates)
  * Room's daily electricity and water consumption
  * Personal Green Score badge
* **⚡ Personal Electricity Usage**:
  * Daily, weekly, and monthly consumption
  * Estimated room billing
  * Usage trend: *"Your room consumed 8% more electricity this week than last week."*
  * Estimated appliance breakdown (Fans 34%, Laptops 28%, Lighting 18%, Cooler 20%)
* **💧 Personal Water Usage**:
  * Daily and weekly water usage with hostel average comparisons
  * Water-saving suggestions & alerts: *"💧 Your water consumption increased by 10% this week."*
* **🛠️ Report a Problem (Complaint Form)**:
  * Categories: Water Leakage, Broken Light, Fan Problem, Electrical Issue, Bathroom Problem, Furniture Damage, Cleaning Issue, Internet Problem, Other
  * Pre-filled location (e.g., `Block A - Room 204`)
  * Priority selector (Low, Medium, High, Critical)
* **📋 Maintenance Request Tracking**:
  * Visual stepper pipeline matching exact specification:
    ```
    Complaint #1024
    ✓ Submitted
    ✓ Assigned
    ✓ Technician Working (In Progress)
    ○ Resolved
    ```
  * Shows complaint date, assigned technician, current status, expected resolution SLA, and admin remarks
* **📢 Announcements Feed**:
  * Real-time official notices from the Warden
* **🌱 Smart Recommendations & Green Score**:
  * 💡 *Turn off your fan when leaving the room.*
  * 💧 *Your water usage is higher than the hostel average.*
  * 🌱 *You could improve your Green Score by reducing electricity consumption during peak hours.*
* **📅 Leave & Outing Pass System**:
  * Apply for Day Outing, Weekend Pass, Home Leave, or Medical Leave
  * Interactive **Check-Out** and **Check-In** logging
  * Direct synchronization with the institutional predictive resource forecasting engine
* **📝 Facility & Experience Feedback**:
  * 1 to 5 star ratings and reviews across 7 categories (Hostel facilities, Water, Electricity, Mess, Cleaning, Maintenance, Overall hostel)

---

### 3. 🌓 Modern UI & Design System
* **Theme Support**: Seamless Light Mode and High-Tech Dark Mode toggle with automatic system preference detection and localStorage persistence.
* **1-Click Persona Switcher**: Instantly switch between Warden (Admin) and Student personas (`Rahul Sharma - Rm 204`, `Priya Patel - Rm 112`, `Vikram Singhania - Rm 305`) directly from the top navigation bar for smooth presentation and grading.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Tailwind CSS v4, Lucide React, Chart.js, React-ChartJS-2 |
| **Document Generation** | jsPDF, jspdf-autotable (PDF) + Native CSV / Excel Engine |
| **Backend & API** | Node.js (v22), Express.js (v5), CORS |
| **Build & Tooling** | Vite 8, Rollup, PostCSS |

---

## 🚀 Running the Project

### Option A: Run Full Stack Unified Server (Recommended)
The Express backend is pre-configured to serve both the REST API and the production client bundle:

```bash
# Navigate to the project directory
cd C:\Users\nivet\.gemini\antigravity\scratch\smart-hostel-optimizer

# Start the unified server
node server.js
# Or: npm start
```

Open your browser at:
👉 **`http://localhost:5000`**

### Option B: Run in Hot-Reload Development Mode
If you wish to run the Vite dev server with hot module replacement:

```bash
# Terminal 1: Start Backend API (Port 5000)
node server.js

# Terminal 2: Start Vite Client (Port 5173 with proxy to 5000)
cd client
npm run dev
```

---

## 📁 Project Directory Structure

```
smart-hostel-optimizer/
├── server.js                          # Express.js backend with complete REST API & Telemetry Models
├── package.json                       # Root scripts and server dependencies
├── README.md                          # Comprehensive project documentation
└── client/                            # React 19 + Vite frontend
    ├── index.html                     # HTML template with institutional title & favicon
    ├── vite.config.js                 # Vite config with Tailwind plugin & API proxy
    ├── package.json                   # Client dependencies (Lucide, Chart.js, jsPDF, Tailwind)
    ├── dist/                          # Production compiled client bundle
    └── src/
        ├── App.jsx                    # Root view orchestrator and navigation
        ├── index.css                  # Tailwind CSS styling and theme setup
        ├── main.jsx                   # React DOM entrypoint
        ├── context/
        │   ├── AuthContext.jsx        # RBAC and 1-Click Demo persona switcher
        │   └── ThemeContext.jsx       # Dark/Light theme provider and persistence
        ├── services/
        │   └── api.js                 # Centralized REST API client
        ├── utils/
        │   └── exportUtils.js         # jsPDF autotable and CSV export engine
        └── components/
            ├── Navbar.jsx             # Top bar with role badge, theme toggle & telemetry pill
            ├── admin/
            │   ├── AdminDashboard.jsx            # 5 Core KPI cards, dual-axis telemetry chart
            │   ├── ElectricityManagement.jsx     # Load curve, peak hours, block/floor/room audit
            │   ├── WaterManagement.jsx           # Per-student L/day, night leakage detection
            │   ├── AnomalyDetection.jsx          # Friday spike benchmark, root causes, tickets
            │   ├── CostOptimization.jsx          # Peak shaving, savings sandbox, recommendations
            │   ├── PredictiveManagement.jsx      # Leave correlation, 7-day demand forecast
            │   ├── MaintenanceManagement.jsx     # Technician dispatch, status workflow, SLA
            │   ├── AnnouncementsManagement.jsx   # 1-Click notice presets and broadcast feed
            │   └── ReportsExport.jsx             # 6 audit reports with PDF and CSV export
            └── student/
                ├── StudentDashboard.jsx          # Profile, utility overview, quick actions
                ├── StudentElectricity.jsx        # Room 204 power, appliance breakdown, trend
                ├── StudentWater.jsx              # Personal water usage, conservation tips
                ├── StudentComplaintForm.jsx      # Ticket filing matching exact prompt spec
                ├── StudentComplaintTracker.jsx   # Visual stepper: Submitted -> Assigned -> In Progress -> Resolved
                ├── StudentAnnouncements.jsx      # Official notices feed
                ├── StudentGreenScore.jsx         # 84/100 Eco score, prompt recommendations
                ├── StudentLeaveOuting.jsx        # Gatepass check-in/out synced to predictive engine
                └── StudentFeedback.jsx           # 7-category star rating and comments
```

---

## 🎓 S5 Mini Project Evaluation Notes
- **Predictive Resource Management**: Demonstrates how non-academic variables (weekend outings, student leaves) are mathematically correlated with hostel utility demand, allowing dynamic load de-rating.
- **AI Anomaly Detection**: Highlights automated detection of Friday peak spikes (+78%) and night-time hydraulic leakage (180 L/hr), bridging the gap between detection and automated maintenance ticketing.
- **Role-Based Access Control**: Strict segregation between Admin/Warden privileged actions and Student personal utilities.
