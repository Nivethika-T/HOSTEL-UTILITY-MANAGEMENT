const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database with Comprehensive Seed Data
const DB = {
  // Institutional Stats
  institution: {
    name: "Apex International Institute of Technology - Hostel Complex",
    totalStudents: 850,
    totalRooms: 300,
    occupiedRooms: 284,
    electricityTariffNormal: 8.0, // ₹ per kWh
    electricityTariffPeak: 11.5,  // ₹ per kWh (Peak hours: 14:00-17:00, 20:00-23:00)
    waterTariff: 0.045,           // ₹ per Liter (₹45 / 1,000L)
    greenScoreThreshold: 75
  },

  // Users (Admin and Students)
  users: [
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
  ],

  // Technicians Roster
  technicians: [
    { id: "tech-1", name: "Ramesh Kumar", specialty: "Electrical & Appliances", phone: "+91 94441 12345" },
    { id: "tech-2", name: "Suresh Patil", specialty: "Plumbing & Water Systems", phone: "+91 94442 23456" },
    { id: "tech-3", name: "Manish Verma", specialty: "Carpentry & Furniture", phone: "+91 94443 34567" },
    { id: "tech-4", name: "Amitabh Sen", specialty: "Network & IT Support", phone: "+91 94444 45678" },
    { id: "tech-5", name: "Gopal Rao", specialty: "General Facility & Cleaning", phone: "+91 94445 56789" }
  ],

  // Complaints
  complaints: [
    {
      id: "CMP-1024",
      studentId: "usr-std-1",
      studentName: "Rahul Sharma",
      block: "Block A",
      roomNo: "204",
      category: "Water Leakage",
      title: "Bathroom tap continuously leaking",
      description: "Water is continuously leaking from the bathroom tap. Dripping at approx 1 drop every 2 seconds, worsening daily.",
      priority: "High",
      status: "In Progress",
      assignedTechnician: "Suresh Patil",
      remarks: "Inspected washer defect; replacement brass valve ordered from central store.",
      createdAt: "2026-09-25T10:30:00Z",
      updatedAt: "2026-09-26T14:15:00Z",
      slaHours: 24
    },
    {
      id: "CMP-1025",
      studentId: "usr-std-3",
      studentName: "Vikram Singhania",
      block: "Block C",
      roomNo: "305",
      category: "Electrical",
      title: "Ceiling fan making squeaking noise and sparking",
      description: "Ceiling fan regulator sparks intermittently and wobbles on speed 4.",
      priority: "Critical",
      status: "Assigned",
      assignedTechnician: "Ramesh Kumar",
      remarks: "Technician dispatched for immediate capacitor inspection.",
      createdAt: "2026-09-27T08:15:00Z",
      updatedAt: "2026-09-27T09:00:00Z",
      slaHours: 12
    },
    {
      id: "CMP-1021",
      studentId: "usr-std-2",
      studentName: "Priya Patel",
      block: "Block B",
      roomNo: "112",
      category: "Internet",
      title: "Wi-Fi access point dropping signal",
      description: "Ethernet wall socket loose and Wi-Fi signal drops to 1 bar in the corner desk.",
      priority: "Medium",
      status: "Resolved",
      assignedTechnician: "Amitabh Sen",
      remarks: "Replaced RJ-45 wall faceplate and re-aligned corridor AP-24 antenna.",
      createdAt: "2026-09-22T11:00:00Z",
      updatedAt: "2026-09-23T16:45:00Z",
      slaHours: 48
    },
    {
      id: "CMP-1026",
      studentId: "usr-std-1",
      studentName: "Rahul Sharma",
      block: "Block A",
      roomNo: "204",
      category: "Furniture",
      title: "Study chair caster wheel broken",
      description: "Left wheel snapped off study desk chair. Currently unbalanced.",
      priority: "Low",
      status: "Submitted",
      assignedTechnician: null,
      remarks: "Awaiting technician schedule.",
      createdAt: "2026-09-27T18:00:00Z",
      updatedAt: "2026-09-27T18:00:00Z",
      slaHours: 72
    }
  ],

  // Announcements
  announcements: [
    {
      id: "ANN-01",
      title: "⚡ Scheduled Power Maintenance Tomorrow",
      content: "Power maintenance scheduled tomorrow 10:00 AM – 12:00 PM for DG set synchronization and transformer inspection in Block A and Block B.",
      category: "Electricity",
      priority: "High",
      author: "Chief Warden",
      date: "2026-09-28T04:30:00Z",
      active: true
    },
    {
      id: "ANN-02",
      title: "💧 Intermittent Water Supply Notice",
      content: "Water supply will be interrupted from 2:00 PM – 4:00 PM due to underground pipeline cleaning and automated chlorination sensor calibration.",
      category: "Water",
      priority: "Medium",
      author: "Hostel Maintenance Team",
      date: "2026-09-27T12:00:00Z",
      active: true
    },
    {
      id: "ANN-03",
      title: "🧹 Annual Green Energy & Room Inspection",
      content: "Quarterly electrical safety and energy star compliance inspection scheduled for Friday 3:00 PM onwards. Please ensure room wiring complies with hostel guidelines.",
      category: "Inspection",
      priority: "Normal",
      author: "Hostel Committee",
      date: "2026-09-26T09:00:00Z",
      active: true
    }
  ],

  // Student Leaves & Outings
  leaves: [
    {
      id: "LV-801",
      studentId: "usr-std-1",
      studentName: "Rahul Sharma",
      roomNo: "204",
      block: "Block A",
      type: "Weekend Outing",
      departureDate: "2026-09-28T14:00:00Z",
      returnDate: "2026-09-29T21:00:00Z",
      reason: "Visiting local guardian in Tech Hub City",
      emergencyContact: "+91 98765 00112",
      status: "Approved",
      checkedOut: false
    },
    {
      id: "LV-802",
      studentId: "usr-std-3",
      studentName: "Vikram Singhania",
      roomNo: "305",
      block: "Block C",
      type: "Home Leave",
      departureDate: "2026-09-29T08:00:00Z",
      returnDate: "2026-10-03T20:00:00Z",
      reason: "Family wedding ceremony",
      emergencyContact: "+91 97222 99887",
      status: "Approved",
      checkedOut: false
    },
    {
      id: "LV-803",
      studentId: "usr-std-2",
      studentName: "Priya Patel",
      roomNo: "112",
      block: "Block B",
      type: "Day Outing",
      departureDate: "2026-09-27T15:00:00Z",
      returnDate: "2026-09-27T20:30:00Z",
      reason: "Library research & project supplies procurement",
      emergencyContact: "+91 98111 88990",
      status: "Checked In",
      checkedOut: true
    }
  ],

  // Student Feedback Records
  feedback: [
    {
      id: "FB-01",
      studentId: "usr-std-1",
      studentName: "Rahul Sharma",
      category: "Water",
      rating: 4,
      comment: "Water pressure on 2nd floor has improved significantly after the sensor booster install.",
      date: "2026-09-26T16:00:00Z"
    },
    {
      id: "FB-02",
      studentId: "usr-std-2",
      studentName: "Priya Patel",
      category: "Electricity",
      rating: 5,
      comment: "Corridor solar lighting transition is fantastic! Zero flickering during evening study hours.",
      date: "2026-09-25T11:20:00Z"
    },
    {
      id: "FB-03",
      studentId: "usr-std-3",
      studentName: "Vikram Singhania",
      category: "Maintenance",
      rating: 3,
      comment: "Complaint response time is good, but spare parts procurement for fans took 2 days.",
      date: "2026-09-24T09:40:00Z"
    }
  ]
};

// ==========================================
// 1. AUTHENTICATION & PROFILE ENDPOINTS
// ==========================================
app.get('/api/auth/users', (req, res) => {
  res.json({ success: true, users: DB.users });
});

app.post('/api/auth/login', (req, res) => {
  const { email, role } = req.body;
  const user = DB.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase() || (role && u.role === role));
  if (user) {
    return res.json({ success: true, user });
  }
  // Fallback demo user
  res.status(401).json({ success: false, message: 'Invalid credentials. Please select a demo account.' });
});

// ==========================================
// 2. ADMIN STATS & INSTITUTIONAL OVERVIEW
// ==========================================
app.get('/api/stats/overview', (req, res) => {
  const totalStudents = DB.institution.totalStudents;
  const totalRooms = DB.institution.totalRooms;
  const occupiedRooms = DB.institution.occupiedRooms;
  const occupancyRate = ((occupiedRooms / totalRooms) * 100).toFixed(1);

  // Today's Aggregate Consumption
  const todayElectricity = 2420; // kWh
  const todayWater = 38500;      // Liters

  // Cost estimates for today
  const normalKwh = todayElectricity * 0.72;
  const peakKwh = todayElectricity * 0.28;
  const electricityCostToday = Math.round((normalKwh * DB.institution.electricityTariffNormal) + (peakKwh * DB.institution.electricityTariffPeak));
  const waterCostToday = Math.round(todayWater * DB.institution.waterTariff);

  const activeLeavesCount = DB.leaves.filter(l => l.status === 'Approved' || l.status === 'Checked Out').length;
  const openComplaintsCount = DB.complaints.filter(c => c.status !== 'Resolved').length;

  res.json({
    success: true,
    data: {
      totalStudents,
      totalRooms,
      occupiedRooms,
      occupancyRate: Number(occupancyRate),
      todayElectricity: {
        value: todayElectricity,
        unit: 'kWh',
        cost: electricityCostToday,
        currency: '₹',
        trendPercent: +4.2 // compared to yesterday
      },
      todayWater: {
        value: todayWater,
        unit: 'Liters',
        cost: waterCostToday,
        currency: '₹',
        trendPercent: -2.1
      },
      activeLeavesCount,
      openComplaintsCount,
      institution: DB.institution
    }
  });
});

// ==========================================
// 3. ELECTRICITY MANAGEMENT & ANALYTICS
// ==========================================
app.get('/api/analytics/electricity', (req, res) => {
  // 7-Day Trend (Mon to Sun with realistic Friday spike anomaly matching user's spec)
  const weeklyTrend = [
    { day: "Mon", date: "2026-09-21", consumptionKwh: 800, baseline: 810, cost: 6720 },
    { day: "Tue", date: "2026-09-22", consumptionKwh: 820, baseline: 810, cost: 6888 },
    { day: "Wed", date: "2026-09-23", consumptionKwh: 810, baseline: 810, cost: 6804 },
    { day: "Thu", date: "2026-09-24", consumptionKwh: 815, baseline: 810, cost: 6846 },
    { day: "Fri", date: "2026-09-25", consumptionKwh: 1450, baseline: 820, cost: 12470, anomaly: true, anomalyReason: "Block C server lab & common AC left ON continuously overnight" },
    { day: "Sat", date: "2026-09-26", consumptionKwh: 890, baseline: 850, cost: 7476 },
    { day: "Sun", date: "2026-09-27", consumptionKwh: 840, baseline: 830, cost: 7056 }
  ];

  // Block-wise breakdown
  const blockWise = [
    { block: "Block A", students: 240, rooms: 80, todayKwh: 680, weeklyKwh: 4890, avgWeeklyKwh: 4140, changePercent: +18.1, alert: "Block A consumed 18% more electricity than its average this week." },
    { block: "Block B", students: 220, rooms: 75, todayKwh: 520, weeklyKwh: 3620, avgWeeklyKwh: 3700, changePercent: -2.2, alert: null },
    { block: "Block C", students: 210, rooms: 75, todayKwh: 760, weeklyKwh: 5410, avgWeeklyKwh: 4300, changePercent: +25.8, alert: "Unusual peak consumption in Block C due to multiple heavy appliances." },
    { block: "Block D", students: 180, rooms: 70, todayKwh: 460, weeklyKwh: 3220, avgWeeklyKwh: 3310, changePercent: -2.7, alert: null }
  ];

  // Floor-wise breakdown
  const floorWise = [
    { floor: "Floor 1 (Ground)", blockA: 175, blockB: 125, blockC: 180, blockD: 110, total: 590 },
    { floor: "Floor 2", blockA: 195, blockB: 135, blockC: 210, blockD: 120, total: 660 },
    { floor: "Floor 3", blockA: 160, blockB: 130, blockC: 190, blockD: 115, total: 595 },
    { floor: "Floor 4 (Top)", blockA: 150, blockB: 130, blockC: 180, blockD: 115, total: 575 }
  ];

  // 24-Hour Load Curve with Peak Detection
  const hourlyCurve = [
    { hour: "00:00", kwh: 42, isPeak: false },
    { hour: "02:00", kwh: 35, isPeak: false },
    { hour: "04:00", kwh: 32, isPeak: false },
    { hour: "06:00", kwh: 58, isPeak: false },
    { hour: "08:00", kwh: 125, isPeak: false },
    { hour: "10:00", kwh: 98, isPeak: false },
    { hour: "12:00", kwh: 112, isPeak: false },
    { hour: "14:00", kwh: 168, isPeak: true },  // Peak 2 PM - 5 PM
    { hour: "15:00", kwh: 182, isPeak: true },
    { hour: "16:00", kwh: 176, isPeak: true },
    { hour: "17:00", kwh: 140, isPeak: false },
    { hour: "18:00", kwh: 130, isPeak: false },
    { hour: "20:00", kwh: 195, isPeak: true },  // Peak 8 PM - 11 PM
    { hour: "21:00", kwh: 210, isPeak: true },
    { hour: "22:00", kwh: 188, isPeak: true },
    { hour: "23:00", kwh: 95, isPeak: false }
  ];

  // Room-wise Top High Consumers (for Admin Room Audit)
  const roomWise = [
    { roomNo: "204", block: "Block A", floor: "Floor 2", occupants: 3, todayKwh: 14.8, weeklyKwh: 104.2, status: "Warning", changeVsAvg: "+22%", students: "Rahul Sharma, Arjun Nair, Siddharth V" },
    { roomNo: "305", block: "Block C", floor: "Floor 3", occupants: 2, todayKwh: 18.2, weeklyKwh: 128.5, status: "Critical", changeVsAvg: "+45%", students: "Vikram S, Karthik R" },
    { roomNo: "112", block: "Block B", floor: "Floor 1", occupants: 2, todayKwh: 7.9, weeklyKwh: 54.1, status: "Optimal", changeVsAvg: "-12%", students: "Priya Patel, Ananya Das" },
    { roomNo: "410", block: "Block C", floor: "Floor 4", occupants: 3, todayKwh: 16.5, weeklyKwh: 116.0, status: "Warning", changeVsAvg: "+31%", students: "Nikhil T, Rakesh B, Harish K" },
    { roomNo: "108", block: "Block A", floor: "Floor 1", occupants: 2, todayKwh: 8.4, weeklyKwh: 59.8, status: "Optimal", changeVsAvg: "-8%", students: "Aditya S, Varun M" },
    { roomNo: "220", block: "Block D", floor: "Floor 2", occupants: 3, todayKwh: 15.1, weeklyKwh: 106.4, status: "Warning", changeVsAvg: "+24%", students: "Deepak G, Rohit M, Manish K" },
    { roomNo: "318", block: "Block B", floor: "Floor 3", occupants: 2, todayKwh: 9.1, weeklyKwh: 63.5, status: "Optimal", changeVsAvg: "-3%", students: "Sameer N, Alok P" },
    { roomNo: "101", block: "Block C", floor: "Floor 1", occupants: 3, todayKwh: 17.8, weeklyKwh: 122.9, status: "Critical", changeVsAvg: "+41%", students: "Abhinav J, Tarun B, Sumit K" }
  ];

  // Monthly comparison
  const monthlySummary = {
    currentMonthKwh: 68400,
    prevMonthKwh: 72100,
    differencePercent: -5.1,
    costCurrentMonth: 615600,
    costPrevMonth: 648900,
    costSaved: 33300
  };

  res.json({
    success: true,
    data: {
      weeklyTrend,
      blockWise,
      floorWise,
      hourlyCurve,
      roomWise,
      monthlySummary,
      smartInsight: "Block A consumed 18% more electricity than its average this week. Reducing AC/Cooler usage during 2 PM–5 PM could save approximately ₹14,250 this month."
    }
  });
});

// ==========================================
// 4. WATER MANAGEMENT & LEAKAGE DETECTION
// ==========================================
app.get('/api/analytics/water', (req, res) => {
  const totalWaterToday = 38500; // Liters
  const totalStudents = DB.institution.totalStudents;
  const perStudentUsage = Math.round(totalWaterToday / totalStudents); // 45 Liters/student/day
  const benchmarkPerStudent = 135; // National institutional standard L/day

  const weeklyTrend = [
    { day: "Mon", liters: 37200, cost: 1674 },
    { day: "Tue", liters: 38100, cost: 1714 },
    { day: "Wed", liters: 36900, cost: 1660 },
    { day: "Thu", liters: 37800, cost: 1701 },
    { day: "Fri", liters: 44200, cost: 1989, anomaly: true, leakSuspected: true },
    { day: "Sat", liters: 39500, cost: 1777 },
    { day: "Sun", liters: 38500, cost: 1732 }
  ];

  const blockWise = [
    { block: "Block A", totalLiters: 11400, perStudent: 47.5, tankLevelPercent: 78, leakAlert: "Leak detected on Floor 2 washroom pipeline (180 L/hr night flow)" },
    { block: "Block B", totalLiters: 9200, perStudent: 41.8, tankLevelPercent: 84, leakAlert: null },
    { block: "Block C", totalLiters: 10100, perStudent: 48.0, tankLevelPercent: 72, leakAlert: null },
    { block: "Block D", totalLiters: 7800, perStudent: 43.3, tankLevelPercent: 90, leakAlert: null }
  ];

  const floorWise = [
    { floor: "Floor 1", blockA: 2600, blockB: 2200, blockC: 2400, blockD: 1900 },
    { floor: "Floor 2", blockA: 3800, blockB: 2300, blockC: 2600, blockD: 1950, anomalyFlag: "Block A Floor 2 excess night flow" },
    { floor: "Floor 3", blockA: 2500, blockB: 2400, blockC: 2550, blockD: 2000 },
    { floor: "Floor 4", blockA: 2500, blockB: 2300, blockC: 2550, blockD: 1950 }
  ];

  // Nighttime Flow vs Day Flow (Standard Leakage Detection Signature)
  const hourlyFlow = [
    { hour: "00:00", liters: 240, status: "Normal" },
    { hour: "01:00", liters: 190, status: "Normal" },
    { hour: "02:00", liters: 480, status: "Abnormal", leakSignature: true }, // Night spike!
    { hour: "03:00", liters: 460, status: "Abnormal", leakSignature: true },
    { hour: "04:00", liters: 490, status: "Abnormal", leakSignature: true },
    { hour: "05:00", liters: 650, status: "Normal" },
    { hour: "06:00", liters: 2100, status: "Normal" }, // Morning rush
    { hour: "07:00", liters: 3800, status: "Peak" },
    { hour: "08:00", liters: 4200, status: "Peak" },
    { hour: "09:00", liters: 2800, status: "Normal" },
    { hour: "12:00", liters: 1900, status: "Normal" },
    { hour: "15:00", liters: 1600, status: "Normal" },
    { hour: "18:00", liters: 2900, status: "Peak" },
    { hour: "21:00", liters: 3200, status: "Peak" }
  ];

  res.json({
    success: true,
    data: {
      totalWaterToday,
      perStudentUsage,
      benchmarkPerStudent,
      waterCostToday: Math.round(totalWaterToday * DB.institution.waterTariff),
      weeklyTrend,
      blockWise,
      floorWise,
      hourlyFlow,
      leakageDetection: {
        activeLeaks: 1,
        severity: "Medium",
        location: "Block A - Floor 2 Washroom Wing",
        estimatedWastage: "180 Liters / hour (approx 4,320 L / day)",
        estimatedFinancialLoss: "₹194.40 / day",
        reasons: [
          "Continuous flush valve unseated in common restroom 2B",
          "Tap leakage reported in Room 204",
          "Overhead feeder line joint pressure seepage"
        ]
      }
    }
  });
});

// ==========================================
// 5. AI-BASED ANOMALY DETECTION ENGINE
// ==========================================
app.get('/api/analytics/anomalies', (req, res) => {
  const anomalies = [
    {
      id: "ANOM-EL-01",
      metric: "Electricity",
      severity: "Critical",
      title: "🚨 Unusual electricity consumption detected in Block C",
      location: "Block C - Wing B",
      detectedAt: "2026-09-25T17:30:00Z",
      normalConsumption: "810 - 820 kWh",
      observedConsumption: "1,450 kWh (+78% Spike)",
      status: "Active Alert",
      possibleReasons: [
        "Electrical equipment left ON continuously",
        "Faulty high-tonnage appliance / AC compressor short-cycling",
        "Electrical leakage / grounding defect in server & media room",
        "Sudden increase in unauthorized high-wattage appliance usage (heaters/kettles)"
      ],
      recommendedAction: "Dispatch technician Ramesh Kumar to inspect floor sub-meter 3C and check heavy appliance breakers."
    },
    {
      id: "ANOM-WT-02",
      metric: "Water",
      severity: "Warning",
      title: "⚠️ Unexplained Night Flow & Baseline Elevation in Block A",
      location: "Block A - Floor 2",
      detectedAt: "2026-09-27T03:15:00Z",
      normalConsumption: "30 - 50 L/hr (Night Baseline)",
      observedConsumption: "480 L/hr (Persistent flow 02:00 - 05:00 AM)",
      status: "Investigating",
      possibleReasons: [
        "Plumbing tap leakage in bathroom taps (e.g. Room 204 complaint filed)",
        "Overhead cistern continuous overflow",
        "Underground pipeline flange joint rupture"
      ],
      recommendedAction: "Isolate Floor 2 main feeder valve between 01:00 - 04:00 AM or repair leaking tap fixtures immediately."
    },
    {
      id: "ANOM-RM-03",
      metric: "Electricity",
      severity: "Information",
      title: "⚡ High Consumption Room Pattern Alert",
      location: "Block A - Room 204",
      detectedAt: "2026-09-26T20:00:00Z",
      normalConsumption: "11.2 kWh / day",
      observedConsumption: "14.8 kWh / day (+22% above hostel room average)",
      status: "Logged",
      possibleReasons: [
        "Gaming laptops / monitors operating without sleep mode",
        "Personal electric cooler operating 24 hours",
        "Room lights kept on while occupants away"
      ],
      recommendedAction: "Send targeted smart recommendation to Room 204 student dashboard."
    }
  ];

  // The User's Exact Benchmark Table
  const comparisonWeekly = [
    { day: "Monday", consumption: "800 kWh", status: "Normal" },
    { day: "Tuesday", consumption: "820 kWh", status: "Normal" },
    { day: "Wednesday", consumption: "810 kWh", status: "Normal" },
    { day: "Thursday", consumption: "815 kWh", status: "Normal" },
    { day: "Friday", consumption: "1,450 kWh", status: "⚠️ Anomaly Detected (Critical Spike)" }
  ];

  res.json({
    success: true,
    data: {
      anomalies,
      comparisonWeekly,
      totalActiveAnomalies: anomalies.length
    }
  });
});

// ==========================================
// 6. COST OPTIMIZATION & PREDICTIVE RESOURCE ENGINE
// ==========================================
app.get('/api/optimization/recommendations', (req, res) => {
  const recommendations = [
    {
      id: "OPT-01",
      category: "Peak Hour Shaving",
      title: "Reduce Electricity Usage During Peak Hours (2 PM – 5 PM)",
      impact: "High",
      potentialSavingsMonthly: 18500,
      description: "Electricity consumption is 15% higher than normal. Reducing common area AC and heavy pump usage during 2 PM–5 PM (peak tariff ₹11.50/kWh) could save approximately ₹18,500/month.",
      actionSteps: [
        "Pre-cool common study halls at 1:00 PM and set thermostats to 24°C instead of 20°C.",
        "Shift laundry drying cycles to morning off-peak window (07:00 AM - 11:00 AM).",
        "Stagger water pumping schedules to run at 11:00 PM."
      ]
    },
    {
      id: "OPT-02",
      category: "Room Audits",
      title: "Identify & Audit High-Consumption Rooms (Top 5%)",
      impact: "Medium",
      potentialSavingsMonthly: 9200,
      description: "The top 8 rooms consume 29% of Block C's electricity. Sending nudge notifications and conducting routine appliance audits yields immediate reductions.",
      actionSteps: [
        "Trigger automated Green Score nudges to rooms exceeding 14 kWh/day.",
        "Inspect high-draw unauthorized heating coils or faulty surge protectors."
      ]
    },
    {
      id: "OPT-03",
      category: "Preventative Maintenance",
      title: "Water Pump & Motor Efficiency Servicing",
      impact: "Medium",
      potentialSavingsMonthly: 6400,
      description: "Main Borewell Pump 2 shows a power factor drop to 0.74, causing 12% excessive electrical draw for equivalent water output.",
      actionSteps: [
        "Replace run capacitor on Pump 2 motor.",
        "Clear impeller mineral scale buildup before monthly peak."
      ]
    },
    {
      id: "OPT-04",
      category: "Lighting Automation",
      title: "Reduce Unnecessary Corridor & Common Area Lighting",
      impact: "Low",
      potentialSavingsMonthly: 4100,
      description: "Floors 3 and 4 corridors have ambient daylight exceeding 450 lux during 09:00 - 16:00, yet lights remain ON.",
      actionSteps: [
        "Activate PIR motion sensors and daylight photocells in Block A & B corridors.",
        "Dim exterior perimeter floodlights to 50% between 01:00 AM - 05:00 AM."
      ]
    }
  ];

  const totalPotentialSavings = recommendations.reduce((acc, r) => acc + r.potentialSavingsMonthly, 0);

  res.json({
    success: true,
    data: {
      recommendations,
      totalPotentialSavingsMonthly: totalPotentialSavings,
      currency: "₹"
    }
  });
});

// Predictive Module: Correlate Student Outings/Leaves with Expected Consumption
app.get('/api/prediction/resource-forecast', (req, res) => {
  // Current active approved leaves and upcoming outings
  const approvedLeavesCount = 142; // Out of 850 students
  const percentAway = ((approvedLeavesCount / DB.institution.totalStudents) * 100).toFixed(1);

  // Normal expected baseline
  const normalBaselineElectricityKwh = 2450;
  const normalBaselineWaterLiters = 39000;

  // Predictive calculations:
  // Each student away reduces electricity by ~2.4 kWh/day and water by ~45 L/day
  const predictedElecReductionKwh = Math.round(approvedLeavesCount * 2.4);
  const predictedWaterReductionLiters = Math.round(approvedLeavesCount * 44);

  const predictedElectricityTomorrow = normalBaselineElectricityKwh - predictedElecReductionKwh;
  const predictedWaterTomorrow = normalBaselineWaterLiters - predictedWaterReductionLiters;

  const next7DaysForecast = [
    { day: "Tomorrow (Mon)", studentsAway: 142, predictedElecKwh: predictedElectricityTomorrow, baselineElecKwh: 2450, predictedWaterL: predictedWaterTomorrow, baselineWaterL: 39000 },
    { day: "Tue", studentsAway: 110, predictedElecKwh: 2210, baselineElecKwh: 2450, predictedWaterL: 34500, baselineWaterL: 39000 },
    { day: "Wed", studentsAway: 45, predictedElecKwh: 2360, baselineElecKwh: 2450, predictedWaterL: 37200, baselineWaterL: 39000 },
    { day: "Thu", studentsAway: 30, predictedElecKwh: 2410, baselineElecKwh: 2450, predictedWaterL: 38100, baselineWaterL: 39000 },
    { day: "Fri", studentsAway: 65, predictedElecKwh: 2320, baselineElecKwh: 2450, predictedWaterL: 36500, baselineWaterL: 39000 },
    { day: "Sat (Weekend Outings)", studentsAway: 215, predictedElecKwh: 1980, baselineElecKwh: 2450, predictedWaterL: 29800, baselineWaterL: 39000 },
    { day: "Sun (Weekend)", studentsAway: 230, predictedElecKwh: 1940, baselineElecKwh: 2450, predictedWaterL: 29100, baselineWaterL: 39000 }
  ];

  res.json({
    success: true,
    data: {
      studentsAwayTomorrow: approvedLeavesCount,
      percentAway: Number(percentAway),
      normalBaselineElectricityKwh,
      predictedElectricityTomorrow,
      electricitySavingsPercent: -((predictedElecReductionKwh / normalBaselineElectricityKwh) * 100).toFixed(1),
      normalBaselineWaterLiters,
      predictedWaterTomorrow,
      waterSavingsPercent: -((predictedWaterReductionLiters / normalBaselineWaterLiters) * 100).toFixed(1),
      predictedCostSavingsTomorrow: Math.round((predictedElecReductionKwh * 8.5) + (predictedWaterReductionLiters * 0.045)),
      optimalAction: "With 142 students on approved leave tomorrow: De-rate auxiliary water booster pump to 65% capacity and defer 3 floor chillers during 10 AM - 4 PM.",
      next7DaysForecast
    }
  });
});

// ==========================================
// 7. COMPLAINTS & MAINTENANCE MANAGEMENT
// ==========================================
app.get('/api/complaints', (req, res) => {
  const { studentId, status, category, priority } = req.query;
  let list = [...DB.complaints];

  if (studentId) {
    list = list.filter(c => c.studentId === studentId);
  }
  if (status && status !== 'All') {
    list = list.filter(c => c.status.toLowerCase() === status.toLowerCase());
  }
  if (category && category !== 'All') {
    list = list.filter(c => c.category.toLowerCase() === category.toLowerCase());
  }
  if (priority && priority !== 'All') {
    list = list.filter(c => c.priority.toLowerCase() === priority.toLowerCase());
  }

  res.json({ success: true, count: list.length, complaints: list });
});

app.post('/api/complaints', (req, res) => {
  const { studentId, studentName, roomNo, block, category, title, description, priority } = req.body;
  if (!studentId || !description || !category) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const newTicketNo = `CMP-${1027 + DB.complaints.length}`;
  const newComplaint = {
    id: newTicketNo,
    studentId,
    studentName: studentName || "Student",
    roomNo: roomNo || "204",
    block: block || "Block A",
    category,
    title: title || `${category} issue in ${block} - Room ${roomNo}`,
    description,
    priority: priority || "Medium",
    status: "Submitted",
    assignedTechnician: null,
    remarks: "Ticket created. Awaiting technician assignment by Warden.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slaHours: priority === 'Critical' ? 12 : (priority === 'High' ? 24 : 48)
  };

  DB.complaints.unshift(newComplaint);
  res.status(201).json({ success: true, complaint: newComplaint });
});

app.patch('/api/complaints/:id', (req, res) => {
  const { id } = req.params;
  const { status, assignedTechnician, remarks, priority } = req.body;

  const complaint = DB.complaints.find(c => c.id === id);
  if (!complaint) {
    return res.status(404).json({ success: false, message: 'Complaint not found' });
  }

  if (status) complaint.status = status;
  if (assignedTechnician !== undefined) complaint.assignedTechnician = assignedTechnician;
  if (remarks !== undefined) complaint.remarks = remarks;
  if (priority) complaint.priority = priority;
  complaint.updatedAt = new Date().toISOString();

  res.json({ success: true, complaint });
});

// ==========================================
// 8. ANNOUNCEMENTS
// ==========================================
app.get('/api/announcements', (req, res) => {
  res.json({ success: true, announcements: DB.announcements });
});

app.post('/api/announcements', (req, res) => {
  const { title, content, category, priority } = req.body;
  if (!title || !content) {
    return res.status(400).json({ success: false, message: 'Title and content are required' });
  }

  const newAnnouncement = {
    id: `ANN-${Date.now().toString().slice(-4)}`,
    title,
    content,
    category: category || "General",
    priority: priority || "Normal",
    author: "Chief Warden",
    date: new Date().toISOString(),
    active: true
  };

  DB.announcements.unshift(newAnnouncement);
  res.status(201).json({ success: true, announcement: newAnnouncement });
});

app.delete('/api/announcements/:id', (req, res) => {
  const { id } = req.params;
  const idx = DB.announcements.findIndex(a => a.id === id);
  if (idx !== -1) {
    DB.announcements.splice(idx, 1);
    return res.json({ success: true, message: 'Announcement deleted' });
  }
  res.status(404).json({ success: false, message: 'Announcement not found' });
});

// ==========================================
// 9. LEAVES & OUTINGS
// ==========================================
app.get('/api/leaves', (req, res) => {
  const { studentId } = req.query;
  let list = [...DB.leaves];
  if (studentId) {
    list = list.filter(l => l.studentId === studentId);
  }
  res.json({ success: true, leaves: list });
});

app.post('/api/leaves', (req, res) => {
  const { studentId, studentName, roomNo, block, type, departureDate, returnDate, reason, emergencyContact } = req.body;
  if (!studentId || !departureDate || !returnDate || !reason) {
    return res.status(400).json({ success: false, message: 'Please fill all required leave details' });
  }

  const newLeave = {
    id: `LV-${804 + DB.leaves.length}`,
    studentId,
    studentName: studentName || "Student",
    roomNo: roomNo || "204",
    block: block || "Block A",
    type: type || "Weekend Outing",
    departureDate,
    returnDate,
    reason,
    emergencyContact: emergencyContact || "+91 99999 88888",
    status: "Pending",
    checkedOut: false
  };

  DB.leaves.unshift(newLeave);
  res.status(201).json({ success: true, leave: newLeave });
});

app.patch('/api/leaves/:id', (req, res) => {
  const { id } = req.params;
  const { status, checkedOut } = req.body;
  const leave = DB.leaves.find(l => l.id === id);
  if (!leave) {
    return res.status(404).json({ success: false, message: 'Leave record not found' });
  }

  if (status) leave.status = status;
  if (checkedOut !== undefined) leave.checkedOut = checkedOut;

  res.json({ success: true, leave });
});

// ==========================================
// 10. FEEDBACK
// ==========================================
app.get('/api/feedback', (req, res) => {
  const ratings = DB.feedback.map(f => f.rating);
  const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : 4.5;
  res.json({
    success: true,
    feedback: DB.feedback,
    stats: {
      averageRating: Number(avgRating),
      totalSubmissions: DB.feedback.length,
      categories: ["Hostel facilities", "Water", "Electricity", "Mess", "Cleaning", "Maintenance", "Overall hostel"]
    }
  });
});

app.post('/api/feedback', (req, res) => {
  const { studentId, studentName, category, rating, comment } = req.body;
  if (!category || !rating) {
    return res.status(400).json({ success: false, message: 'Category and rating are required' });
  }

  const newFeedback = {
    id: `FB-${Date.now().toString().slice(-4)}`,
    studentId: studentId || "usr-std-1",
    studentName: studentName || "Anonymous Student",
    category,
    rating: Number(rating),
    comment: comment || "",
    date: new Date().toISOString()
  };

  DB.feedback.unshift(newFeedback);
  res.status(201).json({ success: true, feedback: newFeedback });
});

// ==========================================
// 11. STUDENT PERSONAL USAGE & SMART NUDGES
// ==========================================
app.get('/api/student/:id/stats', (req, res) => {
  const { id } = req.params;
  const student = DB.users.find(u => u.id === id) || DB.users[1]; // default Rahul Sharma

  // Room Personal Electricity Data
  const electricity = {
    todayKwh: 14.8,
    todayCost: Math.round(14.8 * 8.5),
    weeklyKwh: 104.2,
    prevWeekKwh: 96.5,
    weeklyChangePercent: +8.0, // "Your room consumed 8% more electricity this week than last week."
    monthlyKwh: 412.0,
    prevMonthKwh: 448.0,
    monthlyChangePercent: -8.0,
    estimatedMonthlyCost: Math.round(412.0 * 8.5),
    applianceBreakdown: [
      { name: "Ceiling Fans & Exhaust", percent: 34, kwh: 5.0 },
      { name: "Laptops & Charging", percent: 28, kwh: 4.1 },
      { name: "Room Lighting", percent: 18, kwh: 2.7 },
      { name: "Room Cooler / Other", percent: 20, kwh: 3.0 }
    ],
    dailyTrend7Days: [
      { day: "Mon", kwh: 13.5 },
      { day: "Tue", kwh: 14.0 },
      { day: "Wed", kwh: 13.8 },
      { day: "Thu", kwh: 14.2 },
      { day: "Fri", kwh: 16.5 },
      { day: "Sat", kwh: 17.4 },
      { day: "Sun", kwh: 14.8 }
    ]
  };

  // Room Personal Water Data
  const water = {
    todayLiters: 165, // for 3 room occupants ~55 L/person
    weeklyLiters: 1180,
    prevWeekLiters: 1072,
    weeklyChangePercent: +10.1, // "Your water consumption increased by 10% this week."
    monthlyLiters: 4850,
    hostelAveragePerRoom: 140, // Liters/day
    dailyTrend7Days: [
      { day: "Mon", liters: 155 },
      { day: "Tue", liters: 160 },
      { day: "Wed", liters: 150 },
      { day: "Thu", liters: 158 },
      { day: "Fri", liters: 175 },
      { day: "Sat", liters: 180 },
      { day: "Sun", liters: 165 }
    ]
  };

  // Smart Recommendations tailored to Student
  const smartRecommendations = [
    {
      id: "REC-1",
      icon: "Lightbulb",
      color: "amber",
      text: "Turn off your fan and study lamp when leaving the room for lectures."
    },
    {
      id: "REC-2",
      icon: "Droplets",
      color: "blue",
      text: "Your room's water usage is 10% higher than the hostel average this week. Ensure tap valves are tightened completely."
    },
    {
      id: "REC-3",
      icon: "Leaf",
      color: "emerald",
      text: "You could improve your Green Score to 90+ by unplugging heavy chargers during peak hours (2 PM – 5 PM)."
    }
  ];

  // Green Score Details
  const greenScore = {
    score: student.greenScore || 84,
    badge: "Eco Champion 🌿",
    breakdown: {
      energyConservation: 82,
      waterPrudence: 80,
      reportingResponsiveness: 90
    },
    percentileRank: "Top 15% in Block A"
  };

  // Active Complaints for this student
  const studentComplaints = DB.complaints.filter(c => c.studentId === student.id);

  res.json({
    success: true,
    data: {
      student,
      electricity,
      water,
      smartRecommendations,
      greenScore,
      complaints: studentComplaints,
      announcements: DB.announcements.slice(0, 3)
    }
  });
});

// ==========================================
// 12. REPORTS & ANALYTICS EXPORT DATA
// ==========================================
app.get('/api/reports/data', (req, res) => {
  const { reportType } = req.query; // electricity, water, occupancy, utilization, maintenance, complaints

  if (reportType === 'electricity') {
    return res.json({
      title: "Hostel Electricity Consumption Report",
      generatedAt: new Date().toISOString(),
      institution: DB.institution.name,
      headers: ["Block", "Total Rooms", "Total Students", "Today (kWh)", "Weekly (kWh)", "Monthly (kWh)", "Cost (INR)", "Status"],
      rows: [
        ["Block A", 80, 240, 680, 4890, 19560, "₹1,66,260", "Warning (+18% Surge)"],
        ["Block B", 75, 220, 520, 3620, 14480, "₹1,23,080", "Optimal"],
        ["Block C", 75, 210, 760, 5410, 21640, "₹1,83,940", "Critical (Peak Anomaly)"],
        ["Block D", 70, 180, 460, 3220, 12880, "₹1,09,480", "Optimal"]
      ],
      summary: {
        totalMonthlyKwh: 68560,
        totalCostINR: 582760,
        peakHoursContribution: "28.4%",
        highestConsumerBlock: "Block C"
      }
    });
  }

  if (reportType === 'water') {
    return res.json({
      title: "Hostel Water Consumption & Leakage Audit Report",
      generatedAt: new Date().toISOString(),
      institution: DB.institution.name,
      headers: ["Block", "Rooms", "Occupants", "Daily Usage (L)", "Weekly Usage (L)", "Per Student/Day (L)", "Overhead Tank Level", "Leak Suspected"],
      rows: [
        ["Block A", 80, 240, "11,400 L", "79,800 L", "47.5 L", "78%", "YES (Floor 2 - 180 L/hr)"],
        ["Block B", 75, 220, "9,200 L", "64,400 L", "41.8 L", "84%", "No"],
        ["Block C", 75, 210, "10,100 L", "70,700 L", "48.0 L", "72%", "No"],
        ["Block D", 70, 180, "7,800 L", "54,600 L", "43.3 L", "90%", "No"]
      ],
      summary: {
        totalDailyWaterL: 38500,
        dailyCostINR: 1732.50,
        avgPerStudentL: 45.3,
        nationalStandardNorm: 135.0,
        activeLeakageLossDaily: "4,320 L (₹194.40)"
      }
    });
  }

  if (reportType === 'occupancy' || reportType === 'utilization') {
    return res.json({
      title: "Hostel Student Occupancy & Room Utilization Audit",
      generatedAt: new Date().toISOString(),
      institution: DB.institution.name,
      headers: ["Block", "Floors", "Total Rooms", "Occupied Rooms", "Capacity", "Present Students", "On Leave/Outing", "Occupancy %"],
      rows: [
        ["Block A", 4, 80, 78, 250, 202, 38, "97.5%"],
        ["Block B", 4, 75, 71, 230, 188, 32, "94.7%"],
        ["Block C", 4, 75, 72, 230, 178, 42, "96.0%"],
        ["Block D", 4, 70, 63, 200, 140, 30, "90.0%"]
      ],
      summary: {
        totalRooms: 300,
        occupiedRooms: 284,
        totalStudentsEnrolled: 850,
        presentInCampus: 708,
        onApprovedLeave: 142,
        netOccupancyRate: "94.7%"
      }
    });
  }

  if (reportType === 'maintenance' || reportType === 'complaints') {
    return res.json({
      title: "Maintenance Performance & Complaint SLA Tracking Report",
      generatedAt: new Date().toISOString(),
      institution: DB.institution.name,
      headers: ["Ticket ID", "Student", "Room", "Category", "Priority", "Status", "Assigned To", "Logged At", "SLA (Hrs)"],
      rows: DB.complaints.map(c => [
        c.id,
        c.studentName,
        `${c.block} - ${c.roomNo}`,
        c.category,
        c.priority,
        c.status,
        c.assignedTechnician || "Unassigned",
        c.createdAt.split('T')[0],
        `${c.slaHours}h`
      ]),
      summary: {
        totalComplaints: DB.complaints.length,
        resolved: DB.complaints.filter(c => c.status === 'Resolved').length,
        inProgress: DB.complaints.filter(c => c.status === 'In Progress').length,
        assigned: DB.complaints.filter(c => c.status === 'Assigned').length,
        submitted: DB.complaints.filter(c => c.status === 'Submitted').length,
        avgResolutionTimeHours: 18.5
      }
    });
  }

  res.json({
    success: true,
    availableReports: ["electricity", "water", "occupancy", "utilization", "maintenance", "complaints"]
  });
});

// Serve frontend static build in production
const clientDist = path.join(__dirname, 'client', 'dist');
app.use(express.static(clientDist));

app.use((req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res.json({
        message: "Smart Hostel Utility Optimization API is running.",
        frontendInfo: "Vite dev server running on client port or run 'npm run build' in client folder."
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`================================================================`);
  console.log(`🚀 Smart Hostel Utility Optimizer Server is running on port ${PORT}`);
  console.log(`   API Endpoint: http://localhost:${PORT}/api/stats/overview`);
  console.log(`================================================================`);
});
