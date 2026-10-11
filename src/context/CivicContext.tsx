import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { Complaint, DepartmentInfo, CityStats, UserProfile, NotificationItem } from '../types';
import { apiService } from '../services/apiService';
import { locationService, UserLocation, LocationPermissionState } from '../services/locationService';
import { MOCK_USER, MOCK_DEPARTMENTS, INITIAL_CITY_STATS } from '../data/mockData';

export type UserRole = 'citizen' | 'authority';
export type ActiveTab = 
  // Citizen tabs
  | 'overview' 
  | 'report' 
  | 'map' 
  | 'my-complaints' 
  | 'impact'
  // Authority tabs
  | 'command-center' 
  | 'complaints' 
  | 'departments' 
  | 'analytics' 
  | 'ai-assistant';

export interface DraftPinLocation {
  lat: number;
  lng: number;
  address: string;
}

interface CivicContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  complaints: Complaint[];
  selectedComplaint: Complaint | null;
  setSelectedComplaint: (complaint: Complaint | null) => void;
  departments: DepartmentInfo[];
  stats: CityStats;
  user: UserProfile;
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
  addNewComplaint: (complaint: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Complaint>;
  joinExistingComplaint: (caseId: string) => Promise<void>;
  updateStatus: (caseId: string, status: Complaint['status']) => Promise<void>;
  // Demo Mode
  demoMode: boolean;
  toggleDemoMode: () => void;
  latestLiveEvent: string | null;
  // Filters for Map & Directory
  categoryFilter: string;
  setCategoryFilter: (cat: string) => void;
  severityFilter: string;
  setSeverityFilter: (sev: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  // REAL GEOLOCATION STATE
  userLocation: UserLocation | null;
  locationPermission: LocationPermissionState;
  locationStatusText: string;
  requestLocation: () => Promise<void>;
  hasCenteredOnce: boolean;
  setHasCenteredOnce: (val: boolean) => void;
  // PINNING & REPORTING WORKFLOW FROM MAP
  draftPinLocation: DraftPinLocation | null;
  setDraftPinLocation: (loc: DraftPinLocation | null) => void;
  isPinningMode: boolean;
  setIsPinningMode: (val: boolean) => void;
  reportChoiceModalOpen: boolean;
  setReportChoiceModalOpen: (val: boolean) => void;
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export const CivicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('citizen');
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [departments, setDepartments] = useState<DepartmentInfo[]>(MOCK_DEPARTMENTS);
  const [stats, setStats] = useState<CityStats>(INITIAL_CITY_STATS);
  const [user, setUser] = useState<UserProfile>(MOCK_USER);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [demoMode, setDemoMode] = useState<boolean>(false);
  const [latestLiveEvent, setLatestLiveEvent] = useState<string | null>(null);

  // Global filters
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Real Geolocation state
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationPermission, setLocationPermission] = useState<LocationPermissionState>('prompt');
  const [locationStatusText, setLocationStatusText] = useState<string>('LOCATION UNAVAILABLE');
  const [hasCenteredOnce, setHasCenteredOnce] = useState<boolean>(false);
  const watchIdRef = useRef<number | null>(null);

  // Pinning and report state
  const [draftPinLocation, setDraftPinLocation] = useState<DraftPinLocation | null>(null);
  const [isPinningMode, setIsPinningMode] = useState<boolean>(false);
  const [reportChoiceModalOpen, setReportChoiceModalOpen] = useState<boolean>(false);

  // Initial data load
  useEffect(() => {
    async function loadData() {
      const initialComplaints = await apiService.getComplaints();
      const initialStats = await apiService.getCityStats();
      const initialNotifs = await apiService.getNotifications();
      setComplaints(initialComplaints);
      setStats(initialStats);
      setNotifications(initialNotifs);
      const flagship = initialComplaints.find((c) => c.id === 'CP-48291');
      if (flagship) setSelectedComplaint(flagship);
    }
    loadData();
  }, []);

  // Request & Watch Real Location (navigator.geolocation.watchPosition)
  const requestLocation = useCallback(async () => {
    if (!locationService.isSupported()) {
      setLocationPermission('unavailable');
      setLocationStatusText('LOCATION UNAVAILABLE');
      return;
    }

    setLocationStatusText('ACQUIRING GPS LOCK...');

    // Clear any previous watcher
    if (watchIdRef.current !== null) {
      locationService.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }

    try {
      // First attempt to get one-time location
      const initialLoc = await locationService.getCurrentLocation();
      setUserLocation(initialLoc);
      setLocationPermission('granted');
      setLocationStatusText('LIVE LOCATION');

      // Now set up continuous watch
      const id = locationService.watchUserLocation(
        (loc) => {
          setUserLocation(loc);
          setLocationPermission('granted');
          setLocationStatusText('LOCATION UPDATED');
          // Reset text back to LIVE LOCATION after 2 seconds
          setTimeout(() => {
            setLocationStatusText('LIVE LOCATION');
          }, 2000);
        },
        (err) => {
          if (err.code === err.PERMISSION_DENIED) {
            setLocationPermission('denied');
            setLocationStatusText('LOCATION ACCESS DENIED');
          } else {
            setLocationStatusText('LOCATION UNAVAILABLE');
          }
        }
      );
      watchIdRef.current = id;
    } catch (err: any) {
      if (err.code === 1) { // PERMISSION_DENIED
        setLocationPermission('denied');
        setLocationStatusText('LOCATION ACCESS DENIED');
      } else {
        setLocationPermission('unavailable');
        setLocationStatusText('LOCATION UNAVAILABLE');
      }
    }
  }, []);

  // Clean up watcher on unmount
  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        locationService.clearWatch(watchIdRef.current);
      }
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback(async (id: string) => {
    await apiService.markNotificationRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const addNotification = useCallback((notif: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newItem, ...prev]);
  }, []);

  const addNewComplaint = useCallback(async (newC: Omit<Complaint, 'id' | 'createdAt' | 'updatedAt'>) => {
    const created = await apiService.createComplaint(newC);
    setComplaints((prev) => [created, ...prev]);
    const updatedStats = await apiService.getCityStats();
    setStats(updatedStats);
    addNotification({
      title: 'Incident Registered',
      message: `Your complaint #${created.id} was processed and added to the city map.`,
      type: 'info',
      caseId: created.id,
    });
    return created;
  }, [addNotification]);

  const joinExistingComplaint = useCallback(async (caseId: string) => {
    await apiService.joinComplaint(caseId);
    setComplaints((prev) =>
      prev.map((c) =>
        c.id === caseId
          ? { ...c, reportsCount: c.reportsCount + 1, priorityScore: Math.min(100, c.priorityScore + 2) }
          : c
      )
    );
    const updatedStats = await apiService.getCityStats();
    setStats(updatedStats);
    addNotification({
      title: 'Joined Existing Case',
      message: `You endorsed Case #${caseId}. Municipal priority escalated!`,
      type: 'success',
      caseId,
    });
  }, [addNotification]);

  const updateStatus = useCallback(async (caseId: string, status: Complaint['status']) => {
    await apiService.updateComplaintStatus(caseId, status);
    setComplaints((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          const updatedTimeline = c.timeline.map((step) => {
            if (step.stage === status) return { ...step, completed: true, timestamp: 'Just now' };
            return step;
          });
          return { ...c, status, timeline: updatedTimeline };
        }
        return c;
      })
    );
    const updatedStats = await apiService.getCityStats();
    setStats(updatedStats);
  }, []);

  // Demo mode ticker & simulation
  useEffect(() => {
    if (!demoMode) return;

    const interval = setInterval(() => {
      // Simulate live incoming problem near current view or user location
      const catList: Complaint['category'][] = ['POTHOLE', 'GARBAGE', 'WATER', 'LIGHTING', 'DRAINAGE', 'PUBLIC_SAFETY'];
      const randomCat = catList[Math.floor(Math.random() * catList.length)];
      const baseLat = userLocation?.latitude || 12.9716;
      const baseLng = userLocation?.longitude || 77.5946;
      const jitterLat = baseLat + (Math.random() - 0.5) * 0.02;
      const jitterLng = baseLng + (Math.random() - 0.5) * 0.02;
      const id = `CP-${Math.floor(49000 + Math.random() * 999)}`;

      const newIssue: Complaint = {
        id,
        title: `Live detected: High severity ${randomCat.toLowerCase().replace('_', ' ')} incident`,
        description: 'Auto-ingested from citizen mobile sensor array. Immediate municipal triage assigned.',
        category: randomCat,
        severity: Math.random() > 0.5 ? 'CRITICAL' : 'HIGH',
        status: 'AI_ANALYZED',
        location: {
          lat: jitterLat,
          lng: jitterLng,
          address: `Near Sector Grid Node #${Math.floor(100 + Math.random() * 900)}`,
          zone: 'Active Urban Ward',
          city: 'Bengaluru',
        },
        reportsCount: Math.floor(Math.random() * 8) + 1,
        priorityScore: Math.floor(Math.random() * 20) + 75,
        priorityBreakdown: {
          baseSeverity: 22,
          publicImpact: 20,
          complaintFrequency: 18,
          locationRisk: 12,
          timeUnresolved: 8,
          totalScore: 80,
        },
        department: randomCat === 'WATER' ? 'Water Supply & Sewage' : randomCat === 'GARBAGE' ? 'Sanitation & Solid Waste' : 'Road Maintenance',
        confidence: 0.94,
        estimatedImpact: 'HIGH',
        aiSummary: 'Autonomous real-time camera ingestion. Dispatched to regional rapid responder.',
        impactRadius: 200,
        nearbyFacilities: { schools: 1, hospitals: 1, busStops: 3 },
        createdAt: 'Just now',
        updatedAt: 'Just now',
        timeline: [
          { stage: 'REPORTED', label: 'Reported', timestamp: 'Just now', description: 'Telemetry detected', completed: true },
          { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: 'Just now', description: 'Severity estimated', completed: true },
          { stage: 'ASSIGNED', label: 'Assigned', timestamp: 'Pending', description: 'Auto-routing', completed: false },
          { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Field crew', completed: false },
          { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Audit', completed: false },
        ],
      };

      setComplaints((prev) => [newIssue, ...prev]);
      setLatestLiveEvent(`🚨 Live Issue Detected: #${id} (${randomCat}) auto-routed to dispatch`);
      addNotification({
        title: 'New Nearby Issue Detected',
        message: `Case #${id} (${randomCat}) detected via sensor feed. Added to Live Map.`,
        type: 'alert',
        caseId: id,
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [demoMode, userLocation, addNotification]);

  const toggleDemoMode = () => {
    setDemoMode((prev) => {
      const next = !prev;
      if (next) {
        setLatestLiveEvent('🔥 DEMO MODE ACTIVE: Simulating live telemetry & streaming issues');
      } else {
        setLatestLiveEvent(null);
      }
      return next;
    });
  };

  return (
    <CivicContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        complaints,
        selectedComplaint,
        setSelectedComplaint,
        departments,
        stats,
        user,
        notifications,
        unreadCount,
        markAsRead,
        addNotification,
        addNewComplaint,
        joinExistingComplaint,
        updateStatus,
        demoMode,
        toggleDemoMode,
        latestLiveEvent,
        categoryFilter,
        setCategoryFilter,
        severityFilter,
        setSeverityFilter,
        searchQuery,
        setSearchQuery,
        userLocation,
        locationPermission,
        locationStatusText,
        requestLocation,
        hasCenteredOnce,
        setHasCenteredOnce,
        draftPinLocation,
        setDraftPinLocation,
        isPinningMode,
        setIsPinningMode,
        reportChoiceModalOpen,
        setReportChoiceModalOpen,
      }}
    >
      {children}
    </CivicContext.Provider>
  );
};

export const useCivic = () => {
  const context = useContext(CivicContext);
  if (!context) throw new Error('useCivic must be used within a CivicProvider');
  return context;
};
