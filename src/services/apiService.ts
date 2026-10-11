import { Complaint, DepartmentInfo, CityStats, UserProfile, NotificationItem } from '../types';
import { getAllComplaints, MOCK_DEPARTMENTS, INITIAL_CITY_STATS, MOCK_USER, INITIAL_NOTIFICATIONS } from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

/**
 * FastAPI-ready and MongoDB-ready client abstraction.
 * Easily binds to FastAPI endpoints (e.g., POST /api/v1/complaints, GET /api/v1/analytics).
 */
export const apiService = {
  // Local reactive cache fallback
  _complaints: getAllComplaints(),
  _stats: { ...INITIAL_CITY_STATS },
  _notifications: [...INITIAL_NOTIFICATIONS],

  async getComplaints(): Promise<Complaint[]> {
    if (import.meta.env.VITE_USE_REAL_BACKEND === 'true') {
      const res = await fetch(`${API_BASE_URL}/complaints`);
      return res.json();
    }
    return [...this._complaints];
  },

  async getComplaintById(id: string): Promise<Complaint | undefined> {
    return this._complaints.find((c) => c.id === id);
  },

  async createComplaint(newComplaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>): Promise<Complaint> {
    const created: Complaint = {
      ...newComplaint,
      id: `CP-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: 'Just now',
      updatedAt: 'Just now',
    };

    this._complaints.unshift(created);
    this._stats.totalReports += 1;
    this._stats.activeReports += 1;
    if (created.severity === 'CRITICAL') {
      this._stats.criticalReports += 1;
    }

    return created;
  },

  async joinComplaint(caseId: string): Promise<Complaint | undefined> {
    const complaint = this._complaints.find((c) => c.id === caseId);
    if (complaint) {
      complaint.reportsCount += 1;
      complaint.priorityScore = Math.min(100, complaint.priorityScore + 2);
      this._stats.citizensHelped += 1;
    }
    return complaint;
  },

  async getNearbyComplaints(latitude: number, longitude: number, maxRadiusKm: number = 5): Promise<Complaint[]> {
    const toRad = (x: number) => (x * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    return this._complaints.filter((c) => {
      const dLat = toRad(c.location.lat - latitude);
      const dLon = toRad(c.location.lng - longitude);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(latitude)) * Math.cos(toRad(c.location.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const cDist = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distKm = R * cDist;
      return distKm <= maxRadiusKm;
    });
  },

  async updateComplaint(id: string, updates: Partial<Complaint>): Promise<Complaint | undefined> {
    const complaint = this._complaints.find((c) => c.id === id);
    if (complaint) {
      Object.assign(complaint, updates, { updatedAt: 'Just now' });
    }
    return complaint;
  },

  async updateComplaintStatus(id: string, status: Complaint['status']): Promise<Complaint | undefined> {
    return this.updateComplaint(id, { status });
  },

  async getDepartments(): Promise<DepartmentInfo[]> {
    return MOCK_DEPARTMENTS;
  },

  async getCityStats(): Promise<CityStats> {
    return { ...this._stats };
  },

  async getUserProfile(): Promise<UserProfile> {
    return MOCK_USER;
  },

  async getNotifications(): Promise<NotificationItem[]> {
    return [...this._notifications];
  },

  async markNotificationRead(id: string): Promise<void> {
    const item = this._notifications.find((n) => n.id === id);
    if (item) item.read = true;
  }
};
