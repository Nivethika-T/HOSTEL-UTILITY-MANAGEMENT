// API Service with seamless communication and resilient error handling

const API_BASE = '/api';

export const api = {
  // Stats & Overview
  async getOverviewStats() {
    const res = await fetch(`${API_BASE}/stats/overview`);
    if (!res.ok) throw new Error('Failed to fetch overview stats');
    return res.json();
  },

  // Electricity Management
  async getElectricityAnalytics() {
    const res = await fetch(`${API_BASE}/analytics/electricity`);
    if (!res.ok) throw new Error('Failed to fetch electricity analytics');
    return res.json();
  },

  // Water Management
  async getWaterAnalytics() {
    const res = await fetch(`${API_BASE}/analytics/water`);
    if (!res.ok) throw new Error('Failed to fetch water analytics');
    return res.json();
  },

  // Anomaly Detection
  async getAnomalies() {
    const res = await fetch(`${API_BASE}/analytics/anomalies`);
    if (!res.ok) throw new Error('Failed to fetch anomalies');
    return res.json();
  },

  // Cost & Utility Optimization
  async getOptimizationRecommendations() {
    const res = await fetch(`${API_BASE}/optimization/recommendations`);
    if (!res.ok) throw new Error('Failed to fetch optimization recommendations');
    return res.json();
  },

  // Predictive Resource Management
  async getPredictiveForecast() {
    const res = await fetch(`${API_BASE}/prediction/resource-forecast`);
    if (!res.ok) throw new Error('Failed to fetch predictive resource forecast');
    return res.json();
  },

  // Complaints
  async getComplaints(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/complaints?${query}`);
    if (!res.ok) throw new Error('Failed to fetch complaints');
    return res.json();
  },

  async submitComplaint(data) {
    const res = await fetch(`${API_BASE}/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit complaint');
    return res.json();
  },

  async updateComplaint(id, updates) {
    const res = await fetch(`${API_BASE}/complaints/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update complaint');
    return res.json();
  },

  // Announcements
  async getAnnouncements() {
    const res = await fetch(`${API_BASE}/announcements`);
    if (!res.ok) throw new Error('Failed to fetch announcements');
    return res.json();
  },

  async createAnnouncement(data) {
    const res = await fetch(`${API_BASE}/announcements`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to post announcement');
    return res.json();
  },

  async deleteAnnouncement(id) {
    const res = await fetch(`${API_BASE}/announcements/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete announcement');
    return res.json();
  },

  // Leaves & Outings
  async getLeaves(studentId) {
    const url = studentId ? `${API_BASE}/leaves?studentId=${studentId}` : `${API_BASE}/leaves`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch leaves');
    return res.json();
  },

  async applyLeave(data) {
    const res = await fetch(`${API_BASE}/leaves`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit leave application');
    return res.json();
  },

  async updateLeave(id, updates) {
    const res = await fetch(`${API_BASE}/leaves/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update leave');
    return res.json();
  },

  // Feedback
  async getFeedback() {
    const res = await fetch(`${API_BASE}/feedback`);
    if (!res.ok) throw new Error('Failed to fetch feedback');
    return res.json();
  },

  async submitFeedback(data) {
    const res = await fetch(`${API_BASE}/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to submit feedback');
    return res.json();
  },

  // Student Personal Stats
  async getStudentStats(studentId) {
    const res = await fetch(`${API_BASE}/student/${studentId}/stats`);
    if (!res.ok) throw new Error('Failed to fetch student personal stats');
    return res.json();
  },

  // Reports
  async getReportData(reportType) {
    const res = await fetch(`${API_BASE}/reports/data?reportType=${reportType}`);
    if (!res.ok) throw new Error('Failed to fetch report data');
    return res.json();
  }
};
