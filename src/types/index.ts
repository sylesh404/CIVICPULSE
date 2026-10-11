export type Severity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type Category = 
  | 'POTHOLE' 
  | 'GARBAGE' 
  | 'WATER' 
  | 'LIGHTING' 
  | 'ROADS' 
  | 'DRAINAGE' 
  | 'PUBLIC_SAFETY' 
  | 'TRAFFIC';

export type ComplaintStatus = 
  | 'REPORTED' 
  | 'AI_ANALYZED' 
  | 'ASSIGNED' 
  | 'IN_PROGRESS' 
  | 'RESOLVED';

export interface LocationInfo {
  lat: number;
  lng: number;
  address: string;
  landmark?: string;
  zone: string;
  city: string;
}

export interface NearbyFacilities {
  schools: number;
  hospitals: number;
  busStops: number;
}

export interface TimelineEvent {
  stage: string;
  label: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface PriorityBreakdown {
  baseSeverity: number;
  publicImpact: number;
  complaintFrequency: number;
  locationRisk: number;
  timeUnresolved: number;
  totalScore: number;
}

export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: Category;
  severity: Severity;
  status: ComplaintStatus;
  location: LocationInfo;
  reportsCount: number;
  priorityScore: number;
  priorityBreakdown: PriorityBreakdown;
  department: string;
  confidence: number;
  estimatedImpact: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  aiSummary: string;
  impactRadius: number; // in meters
  nearbyFacilities: NearbyFacilities;
  imageUrl?: string;
  audioDuration?: string;
  createdAt: string;
  updatedAt: string;
  assignedTeam?: string;
  isDuplicate?: boolean;
  duplicateOf?: string;
  similarityScore?: number;
  timeline: TimelineEvent[];
}

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  activeCases: number;
  criticalCases: number;
  resolvedCases: number;
  slaRate: number; // e.g. 94.2%
  avgResolutionTime: string; // e.g. "14.2h"
  workloadPercentage: number;
  headOfficer: string;
  contactChannel: string;
}

export interface CityStats {
  totalReports: number;
  activeReports: number;
  criticalReports: number;
  resolvedReports: number;
  citizensHelped: number;
  avgResolutionHours: number;
  aiAccuracy: number;
  cityHealthScore: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  email: string;
  civicScore: number;
  rank: number;
  reportsFiled: number;
  resolvedContributed: number;
  badges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: string;
  }[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  timestamp: string;
  read: boolean;
  caseId?: string;
}

export interface AiChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  dataCard?: {
    title: string;
    hotspotsCount?: number;
    affectedCitizens?: number;
    recommendedAction?: string;
    focusZone?: string;
    stats?: { label: string; value: string | number }[];
    coordinates?: [number, number];
  };
}
