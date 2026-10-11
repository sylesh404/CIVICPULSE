import { Complaint, DepartmentInfo, CityStats, UserProfile, NotificationItem } from '../types';

export const INITIAL_CITY_STATS: CityStats = {
  totalReports: 12480,
  activeReports: 2140,
  criticalReports: 326,
  resolvedReports: 8920,
  citizensHelped: 42800,
  avgResolutionHours: 18.4,
  aiAccuracy: 94,
  cityHealthScore: 87,
};

export const MOCK_DEPARTMENTS: DepartmentInfo[] = [
  {
    id: 'road-maint',
    name: 'Road Maintenance',
    code: 'PWD-RD',
    activeCases: 42,
    criticalCases: 14,
    resolvedCases: 2840,
    slaRate: 94.8,
    avgResolutionTime: '12.4h',
    workloadPercentage: 82,
    headOfficer: 'Eng. Rajesh Verma',
    contactChannel: 'ops-roads@civicpulse.city',
  },
  {
    id: 'water-supply',
    name: 'Water Supply & Sewage',
    code: 'BWSSB',
    activeCases: 31,
    criticalCases: 9,
    resolvedCases: 1950,
    slaRate: 91.5,
    avgResolutionTime: '16.8h',
    workloadPercentage: 74,
    headOfficer: 'Dr. Anita Desai',
    contactChannel: 'ops-water@civicpulse.city',
  },
  {
    id: 'sanitation',
    name: 'Sanitation & Solid Waste',
    code: 'BBMP-SWM',
    activeCases: 67,
    criticalCases: 18,
    resolvedCases: 3120,
    slaRate: 96.2,
    avgResolutionTime: '8.2h',
    workloadPercentage: 91,
    headOfficer: 'K. S. Narayanan',
    contactChannel: 'ops-waste@civicpulse.city',
  },
  {
    id: 'electrical',
    name: 'Electrical & Street Lighting',
    code: 'BESCOM',
    activeCases: 18,
    criticalCases: 3,
    resolvedCases: 1240,
    slaRate: 98.1,
    avgResolutionTime: '6.5h',
    workloadPercentage: 48,
    headOfficer: 'Priya Sundaram',
    contactChannel: 'ops-power@civicpulse.city',
  },
  {
    id: 'public-safety',
    name: 'Public Safety & Hazards',
    code: 'CP-SAFETY',
    activeCases: 12,
    criticalCases: 4,
    resolvedCases: 890,
    slaRate: 97.4,
    avgResolutionTime: '4.1h',
    workloadPercentage: 38,
    headOfficer: 'Capt. Arjun Menon',
    contactChannel: 'ops-safety@civicpulse.city',
  },
  {
    id: 'drainage',
    name: 'Stormwater & Drainage',
    code: 'SWD-ENG',
    activeCases: 29,
    criticalCases: 8,
    resolvedCases: 980,
    slaRate: 88.9,
    avgResolutionTime: '22.0h',
    workloadPercentage: 68,
    headOfficer: 'M. Venkatesh',
    contactChannel: 'ops-drain@civicpulse.city',
  }
];

export const MOCK_USER: UserProfile = {
  name: 'Vikramaditya Roy',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  email: 'vikram.roy@civicpulse.in',
  civicScore: 840,
  rank: 14,
  reportsFiled: 19,
  resolvedContributed: 16,
  badges: [
    {
      id: 'city-watcher',
      name: 'City Watcher',
      description: 'First 10 verified community hazard reports logged',
      icon: 'Eye',
      unlockedAt: '2025-08-14'
    },
    {
      id: 'community-hero',
      name: 'Community Hero',
      description: 'Helped resolve issues affecting over 500 citizens',
      icon: 'Shield',
      unlockedAt: '2025-09-02'
    },
    {
      id: 'problem-solver',
      name: 'Problem Solver',
      description: 'Submitted 5 high-accuracy multimodal incident reports',
      icon: 'Zap',
      unlockedAt: '2025-10-10'
    },
    {
      id: 'civic-champion',
      name: 'Civic Champion',
      description: 'Ranked in the top 1% civic contributors of Bengaluru',
      icon: 'Award',
      unlockedAt: '2025-11-20'
    }
  ]
};

export const LEADERBOARD = [
  { rank: 1, name: 'Ananya Sharma', area: 'Indiranagar', score: 1420, verified: 48, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150' },
  { rank: 2, name: 'Siddharth Rao', area: 'Koramangala', score: 1290, verified: 41, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150' },
  { rank: 3, name: 'Meera Krishnan', area: 'HSR Layout', score: 1180, verified: 39, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150' },
  { rank: 4, name: 'Vikramaditya Roy (You)', area: 'MG Road / CBD', score: 840, verified: 19, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150' },
  { rank: 5, name: 'Rohan Deshmukh', area: 'Whitefield', score: 810, verified: 26, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150' },
  { rank: 6, name: 'Tanvi Hegde', area: 'Malleshwaram', score: 760, verified: 22, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150' }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Assignment Dispatched',
    message: 'Your pothole complaint #CP-48291 on MG Road has been assigned to Rapid Response Unit 4.',
    type: 'info',
    timestamp: '12m ago',
    read: false,
    caseId: 'CP-48291'
  },
  {
    id: 'notif-2',
    title: 'Citizens Joined Issue',
    message: '37 citizens confirmed your reported road fracture. Priority auto-escalated to CRITICAL.',
    type: 'alert',
    timestamp: '28m ago',
    read: false,
    caseId: 'CP-48291'
  },
  {
    id: 'notif-3',
    title: 'Field Team On-Site',
    message: 'Road maintenance crew is currently patching the surface near Brigade Junction.',
    type: 'info',
    timestamp: '1h ago',
    read: true,
    caseId: 'CP-48291'
  },
  {
    id: 'notif-4',
    title: 'Complaint Resolved',
    message: 'Hazardous open transformer casing at 100ft Road Indiranagar (#CP-41002) is verified safe.',
    type: 'success',
    timestamp: '3h ago',
    read: true,
    caseId: 'CP-41002'
  }
];

// 52 rich realistic complaints in the Bengaluru smart-city grid
export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'CP-48291',
    title: 'Severe Structural Road Cavity & Exposed Rebar',
    description: 'Deep road sinkhole forming right after metro pillar 142. Heavy two-wheeler hazard during rush hour.',
    category: 'POTHOLE',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'MG Road, near Metro Pillar 142',
      landmark: 'Trinity Circle Intersection',
      zone: 'CBD / East Zone',
      city: 'Bengaluru'
    },
    reportsCount: 37,
    priorityScore: 92,
    priorityBreakdown: {
      baseSeverity: 25,
      publicImpact: 24,
      complaintFrequency: 22,
      locationRisk: 12,
      timeUnresolved: 9,
      totalScore: 92
    },
    department: 'Road Maintenance',
    confidence: 0.94,
    estimatedImpact: 'HIGH',
    aiSummary: 'Large road surface damage detected in a high-traffic corridor. 37 similar citizen reports aggregated within a 250m radius. Rapid asphalt stabilization team recommended.',
    impactRadius: 250,
    nearbyFacilities: {
      schools: 3,
      hospitals: 2,
      busStops: 7
    },
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600',
    audioDuration: '0:24',
    createdAt: '14 minutes ago',
    updatedAt: '2 minutes ago',
    assignedTeam: 'East Zone Road Squad 4',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '10:14 AM', description: 'Citizen captured geotagged photo with voice transcript', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '10:15 AM', description: 'Vision model tagged deep asphalt cavity (94% confidence)', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '10:20 AM', description: 'Auto-routed to BBMP Road Squad 4 with high urgency', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: '10:28 AM', description: 'Crew dispatched with cold-mix asphalt supply', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending Verification', description: 'Post-repair photographic audit required', completed: false }
    ]
  },
  {
    id: 'CP-48288',
    title: 'Ruptured Water Main Flooding Street',
    description: 'High-pressure clean water pipeline burst. Water gushing onto vehicular lane causing severe traffic slowdown.',
    category: 'WATER',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    location: {
      lat: 12.9783,
      lng: 77.6408,
      address: '100 Feet Rd, Indiranagar',
      landmark: 'Opposite Toit Brewpub',
      zone: 'Indiranagar Zone',
      city: 'Bengaluru'
    },
    reportsCount: 29,
    priorityScore: 89,
    priorityBreakdown: {
      baseSeverity: 24,
      publicImpact: 23,
      complaintFrequency: 20,
      locationRisk: 13,
      timeUnresolved: 9,
      totalScore: 89
    },
    department: 'Water Supply & Sewage',
    confidence: 0.96,
    estimatedImpact: 'HIGH',
    aiSummary: 'Acoustic and visual patterns match pressurized main burst. Estimated loss 400L/min. Automatic valve isolation order generated.',
    impactRadius: 180,
    nearbyFacilities: { schools: 1, hospitals: 1, busStops: 4 },
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&q=80&w=600',
    createdAt: '38 minutes ago',
    updatedAt: '12 minutes ago',
    assignedTeam: 'BWSSB Rapid Valve Unit 2',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '09:50 AM', description: 'Reported by local merchant', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '09:51 AM', description: 'Acoustic leak signature confirmed', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '09:58 AM', description: 'Emergency valve team notified', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: '10:05 AM', description: 'Upstream gate valve throttled to 20%', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Pipeline section replacement in transit', completed: false }
    ]
  },
  {
    id: 'CP-48270',
    title: 'Hazardous Commercial Garbage Dump Overflow',
    description: 'Unregulated dumping site overflowing onto pedestrian pavement. Attracting stray dogs and emitting toxic odor.',
    category: 'GARBAGE',
    severity: 'HIGH',
    status: 'ASSIGNED',
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: '5th Block, Koramangala',
      landmark: 'Koramangala Club Back Alley',
      zone: 'South East Zone',
      city: 'Bengaluru'
    },
    reportsCount: 18,
    priorityScore: 78,
    priorityBreakdown: {
      baseSeverity: 19,
      publicImpact: 20,
      complaintFrequency: 18,
      locationRisk: 11,
      timeUnresolved: 10,
      totalScore: 78
    },
    department: 'Sanitation & Solid Waste',
    confidence: 0.91,
    estimatedImpact: 'MEDIUM',
    aiSummary: 'Bio-waste overflow detected blocking primary pedestrian path. Compact truck and disinfectant wash requested.',
    impactRadius: 120,
    nearbyFacilities: { schools: 2, hospitals: 0, busStops: 3 },
    createdAt: '1 hour ago',
    updatedAt: '30 minutes ago',
    assignedTeam: 'Koramangala Compactor Crew 1',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '09:20 AM', description: 'Logged via mobile app', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '09:22 AM', description: 'Waste density rated at 4.2 cubic meters', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '09:40 AM', description: 'Scheduled for immediate pickup shift', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Compactor truck en route', completed: false },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Site sterilization verification', completed: false }
    ]
  },
  {
    id: 'CP-48265',
    title: 'Fallen High-Voltage Transformer Cable',
    description: 'Overhead cable snapped and resting near pedestrian walkway after storm. Sparks reported.',
    category: 'PUBLIC_SAFETY',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    location: {
      lat: 12.9121,
      lng: 77.6446,
      address: '27th Main, Sector 1, HSR Layout',
      landmark: 'Near Agara Lake Junction',
      zone: 'Bommanahalli Zone',
      city: 'Bengaluru'
    },
    reportsCount: 42,
    priorityScore: 97,
    priorityBreakdown: {
      baseSeverity: 25,
      publicImpact: 25,
      complaintFrequency: 24,
      locationRisk: 14,
      timeUnresolved: 9,
      totalScore: 97
    },
    department: 'Electrical & Street Lighting',
    confidence: 0.98,
    estimatedImpact: 'CRITICAL',
    aiSummary: 'Critical electrocution hazard identified. Line de-energized remotely via SCADA feeder grid. Perimeter safety unit deployed.',
    impactRadius: 300,
    nearbyFacilities: { schools: 2, hospitals: 1, busStops: 5 },
    createdAt: '2 hours ago',
    updatedAt: '15 minutes ago',
    assignedTeam: 'BESCOM Emergency Line Crew #9',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '08:15 AM', description: 'Urgent SOS report logged', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '08:15 AM', description: 'High-voltage risk confirmed, SCADA alert triggered', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '08:18 AM', description: 'BESCOM grid dispatched lineman team', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: '08:30 AM', description: 'Circuit isolated, cordon tape erected', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Conductor replacement ongoing', completed: false }
    ]
  },
  {
    id: 'CP-48240',
    title: 'Uncovered Open Storm Drainage Pit',
    description: 'Concrete manhole slab broken and missing. Dark unlit section during evenings poses grave foot hazard.',
    category: 'DRAINAGE',
    severity: 'HIGH',
    status: 'AI_ANALYZED',
    location: {
      lat: 12.9856,
      lng: 77.7289,
      address: 'ITPL Main Road, Whitefield',
      landmark: 'Near Pattandur Agrahara Metro',
      zone: 'Mahadevapura Zone',
      city: 'Bengaluru'
    },
    reportsCount: 14,
    priorityScore: 81,
    priorityBreakdown: {
      baseSeverity: 22,
      publicImpact: 20,
      complaintFrequency: 16,
      locationRisk: 13,
      timeUnresolved: 10,
      totalScore: 81
    },
    department: 'Stormwater & Drainage',
    confidence: 0.93,
    estimatedImpact: 'HIGH',
    aiSummary: 'Slab structural collapse over open culvert. Barricading beacon and prefabricated slab dispatch scheduled.',
    impactRadius: 100,
    nearbyFacilities: { schools: 1, hospitals: 0, busStops: 6 },
    createdAt: '3 hours ago',
    updatedAt: '2 hours ago',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '07:30 AM', description: 'Morning commuter reported via photo', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '07:32 AM', description: 'Deep cavity hazard identified', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: 'Pending', description: 'Queued for Mahadevapura SWD division', completed: false },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Awaiting crew arrival', completed: false },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Concrete replacement pending', completed: false }
    ]
  },
  {
    id: 'CP-48212',
    title: 'Cluster of 8 Broken LED Streetlamps',
    description: 'Complete stretch of ring road in pitch black darkness for past 3 days. Elevated security risk.',
    category: 'LIGHTING',
    severity: 'MEDIUM',
    status: 'REPORTED',
    location: {
      lat: 13.0068,
      lng: 77.5713,
      address: 'Margosa Road, Malleshwaram',
      landmark: 'Between 15th and 18th Cross',
      zone: 'West Zone',
      city: 'Bengaluru'
    },
    reportsCount: 9,
    priorityScore: 64,
    priorityBreakdown: {
      baseSeverity: 14,
      publicImpact: 18,
      complaintFrequency: 14,
      locationRisk: 9,
      timeUnresolved: 9,
      totalScore: 64
    },
    department: 'Electrical & Street Lighting',
    confidence: 0.89,
    estimatedImpact: 'MEDIUM',
    aiSummary: 'Substation circuit breaker tripped on lighting branch 04. Remote reset failed; technician dispatch required.',
    impactRadius: 400,
    nearbyFacilities: { schools: 4, hospitals: 1, busStops: 3 },
    createdAt: '4 hours ago',
    updatedAt: '4 hours ago',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '06:10 AM', description: 'Multiple residents reported dark corridor', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: 'Pending', description: 'Cluster analysis in progress', completed: false },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: 'Pending', description: 'West zone lighting department', completed: false },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Testing relay switch', completed: false },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Luminaires operational', completed: false }
    ]
  },
  {
    id: 'CP-48190',
    title: 'Non-Functional Traffic Signal at Congested Junction',
    description: 'Traffic signals flashing amber randomly. Heavy jam building up back to flyover ramp.',
    category: 'TRAFFIC',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    location: {
      lat: 12.9177,
      lng: 77.6238,
      address: 'Silk Board Junction Underpass',
      landmark: 'Near Hosur Road Merge',
      zone: 'South Zone',
      city: 'Bengaluru'
    },
    reportsCount: 65,
    priorityScore: 95,
    priorityBreakdown: {
      baseSeverity: 24,
      publicImpact: 25,
      complaintFrequency: 24,
      locationRisk: 13,
      timeUnresolved: 9,
      totalScore: 95
    },
    department: 'Public Safety & Hazards',
    confidence: 0.97,
    estimatedImpact: 'CRITICAL',
    aiSummary: 'Major arterial junction signal control processor frozen. Traffic Police patrol unit deployed for manual signaling.',
    impactRadius: 500,
    nearbyFacilities: { schools: 0, hospitals: 2, busStops: 12 },
    createdAt: '5 hours ago',
    updatedAt: '20 minutes ago',
    assignedTeam: 'BTP Traffic Signal Rapid Cell',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '05:40 AM', description: 'Automated sensor anomaly + citizen report', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '05:42 AM', description: 'Congestion spike detected via traffic feeds', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '05:45 AM', description: 'Traffic warden and signal tech dispatched', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: '06:00 AM', description: 'Manual signal override activated', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Microcontroller reflash undergoing test', completed: false }
    ]
  },
  {
    id: 'CP-41002',
    title: 'Exposed Electrical Transformer Casing Fixed',
    description: 'High voltage unit enclosure latch had rusted off. Replaced with weatherproof IP67 enclosure.',
    category: 'PUBLIC_SAFETY',
    severity: 'HIGH',
    status: 'RESOLVED',
    location: {
      lat: 12.9698,
      lng: 77.6499,
      address: 'Domlur Flyover Service Rd',
      landmark: 'Near Dell Campus',
      zone: 'East Zone',
      city: 'Bengaluru'
    },
    reportsCount: 22,
    priorityScore: 82,
    priorityBreakdown: {
      baseSeverity: 20,
      publicImpact: 22,
      complaintFrequency: 20,
      locationRisk: 11,
      timeUnresolved: 9,
      totalScore: 82
    },
    department: 'Electrical & Street Lighting',
    confidence: 0.95,
    estimatedImpact: 'HIGH',
    aiSummary: 'Resolved: Ground enclosure replaced and tamper-proof locked. Certified zero voltage leak to ground.',
    impactRadius: 150,
    nearbyFacilities: { schools: 1, hospitals: 1, busStops: 4 },
    createdAt: 'Yesterday, 02:15 PM',
    updatedAt: '3 hours ago',
    assignedTeam: 'BESCOM Fast Response Unit 7',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: 'Yesterday 02:15 PM', description: 'Citizen verified report', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: 'Yesterday 02:18 PM', description: 'Enclosure structural breach verified', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: 'Yesterday 02:30 PM', description: 'Team dispatched with hardware', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Yesterday 03:15 PM', description: 'Installed heavy gauge lockbox', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Today 08:30 AM', description: 'Supervisor photographic verification passed', completed: true }
    ]
  },
  // Additional points spread geographically around Bengaluru coordinates
  {
    id: 'CP-48175',
    title: 'Clogged Stormwater Inlets causing Backwater',
    description: 'Debris from recent construction has fully chocked 3 road inlets. Water pooling 6 inches high.',
    category: 'DRAINAGE',
    severity: 'HIGH',
    status: 'IN_PROGRESS',
    location: { lat: 13.0358, lng: 77.5970, address: 'Bellary Road, Hebbal', landmark: 'Near Hebbal Lake Promenade', zone: 'North Zone', city: 'Bengaluru' },
    reportsCount: 16,
    priorityScore: 79,
    priorityBreakdown: { baseSeverity: 20, publicImpact: 21, complaintFrequency: 16, locationRisk: 12, timeUnresolved: 10, totalScore: 79 },
    department: 'Stormwater & Drainage',
    confidence: 0.92,
    estimatedImpact: 'MEDIUM',
    aiSummary: 'Runoff blockage creates hydroplaning hazard on airport corridor. Super-sucker jet machine dispatched.',
    impactRadius: 200,
    nearbyFacilities: { schools: 1, hospitals: 1, busStops: 5 },
    createdAt: '6 hours ago',
    updatedAt: '1 hour ago',
    assignedTeam: 'North Drain De-silting Squad',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '04:20 AM', description: 'Driver report', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '04:22 AM', description: 'Drainage coefficient alert', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '04:45 AM', description: 'Suction jet dispatched', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: '05:30 AM', description: 'Jet clearing underway', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Post-clear flush check', completed: false }
    ]
  },
  {
    id: 'CP-48160',
    title: 'Crumbling Pedestrian Footpath Pavers',
    description: 'Uneven broken stone slabs with deep gaps. Senior citizens at risk of tripping.',
    category: 'ROADS',
    severity: 'MEDIUM',
    status: 'ASSIGNED',
    location: { lat: 12.9299, lng: 77.5833, address: '11th Main, Jayanagar 4th Block', landmark: 'Opposite Jayanagar Shopping Complex', zone: 'South Zone', city: 'Bengaluru' },
    reportsCount: 12,
    priorityScore: 61,
    priorityBreakdown: { baseSeverity: 12, publicImpact: 17, complaintFrequency: 14, locationRisk: 9, timeUnresolved: 9, totalScore: 61 },
    department: 'Road Maintenance',
    confidence: 0.88,
    estimatedImpact: 'LOW',
    aiSummary: 'Pedestrian pavement trip hazards across 60m span. Masonry restoration task order generated.',
    impactRadius: 80,
    nearbyFacilities: { schools: 3, hospitals: 2, busStops: 4 },
    createdAt: '7 hours ago',
    updatedAt: '3 hours ago',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '03:10 AM', description: 'Resident association filing', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '03:12 AM', description: 'Paver displacement identified', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '04:00 AM', description: 'Ward civil contractor designated', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Material delivery pending', completed: false },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Re-paving validation', completed: false }
    ]
  },
  {
    id: 'CP-48151',
    title: 'Illegal Chemical Effluent Dump near Storm Canal',
    description: 'Strong acrid fumes and colored runoff entering rainwater drain.',
    category: 'PUBLIC_SAFETY',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    location: { lat: 12.8399, lng: 77.6770, address: 'Electronic City Phase 1, NeoTown Rd', landmark: 'Behind Industrial Cluster 4', zone: 'South Outer Zone', city: 'Bengaluru' },
    reportsCount: 31,
    priorityScore: 94,
    priorityBreakdown: { baseSeverity: 25, publicImpact: 23, complaintFrequency: 22, locationRisk: 14, timeUnresolved: 10, totalScore: 94 },
    department: 'Public Safety & Hazards',
    confidence: 0.95,
    estimatedImpact: 'CRITICAL',
    aiSummary: 'Toxic vapor signature detected. Pollution control emergency cell and fire hazmat units mobilized.',
    impactRadius: 400,
    nearbyFacilities: { schools: 1, hospitals: 1, busStops: 2 },
    createdAt: '8 hours ago',
    updatedAt: '45 minutes ago',
    assignedTeam: 'KSPCB Enforcement & Hazmat Squad',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '02:00 AM', description: 'Security patrol alert', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '02:02 AM', description: 'Chemical vapor hazard level 4', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '02:15 AM', description: 'Hazmat containment unit dispatched', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: '02:40 AM', description: 'Booms deployed, runoff contained', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Sample laboratory toxic assay', completed: false }
    ]
  },
  {
    id: 'CP-48142',
    title: 'Burst Sewage Line Seeping into Storm Drain',
    description: 'Foul blackwater overflow covering half road width. Odor unbearable in 100m perimeter.',
    category: 'WATER',
    severity: 'HIGH',
    status: 'ASSIGNED',
    location: { lat: 12.9912, lng: 77.5534, address: 'Rajajinagar 1st Block, Chord Road', landmark: 'Near ISKCON Temple Approach', zone: 'West Zone', city: 'Bengaluru' },
    reportsCount: 21,
    priorityScore: 84,
    priorityBreakdown: { baseSeverity: 21, publicImpact: 22, complaintFrequency: 19, locationRisk: 12, timeUnresolved: 10, totalScore: 84 },
    department: 'Water Supply & Sewage',
    confidence: 0.94,
    estimatedImpact: 'HIGH',
    aiSummary: 'Underground sewer collapse with surface breakout. Vacuum tanker and bypass suction line dispatched.',
    impactRadius: 150,
    nearbyFacilities: { schools: 2, hospitals: 1, busStops: 3 },
    createdAt: '9 hours ago',
    updatedAt: '2 hours ago',
    assignedTeam: 'BWSSB West Sanitation Crew',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '01:00 AM', description: 'Resident complaint', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '01:05 AM', description: 'Biological risk flagged', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '01:30 AM', description: 'Sanitation engineer allocated', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Excavation machine en route', completed: false },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Sewer conduit repair check', completed: false }
    ]
  },
  {
    id: 'CP-48120',
    title: 'Multiple Potholes at Sarjapur Outer Ring Road Flyover',
    description: 'Series of 4 sharp rim-bending asphalt craters on flyover descent. Causing sudden braking.',
    category: 'POTHOLE',
    severity: 'CRITICAL',
    status: 'IN_PROGRESS',
    location: { lat: 12.9248, lng: 77.6749, address: 'Outer Ring Road, Bellandur Flyover', landmark: 'Opposite Ecospace Tech Park', zone: 'Mahadevapura Zone', city: 'Bengaluru' },
    reportsCount: 44,
    priorityScore: 93,
    priorityBreakdown: { baseSeverity: 24, publicImpact: 25, complaintFrequency: 24, locationRisk: 12, timeUnresolved: 8, totalScore: 93 },
    department: 'Road Maintenance',
    confidence: 0.96,
    estimatedImpact: 'CRITICAL',
    aiSummary: 'High-speed flyover surface defect cluster. Dynamic speed warning broadcasted to navigation apps; hot-mix crew deployed.',
    impactRadius: 350,
    nearbyFacilities: { schools: 0, hospitals: 1, busStops: 8 },
    createdAt: '10 hours ago',
    updatedAt: '35 minutes ago',
    assignedTeam: 'ORR Fast Track Paving Unit',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '12:15 AM', description: 'Multiple cab driver alerts', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '12:18 AM', description: 'Multiple duplicate telemetry cluster merged', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '12:30 AM', description: 'Highway maintenance squad assigned', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: '01:10 AM', description: 'Flyover lane 1 barricaded, milling machine active', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Final rolling pass needed', completed: false }
    ]
  },
  {
    id: 'CP-48090',
    title: 'Dead Tree Branch Hanging Dangerously over Powerlines',
    description: 'Heavy cracked bough resting on overhead 11kV conductor. Swaying in heavy winds.',
    category: 'PUBLIC_SAFETY',
    severity: 'HIGH',
    status: 'ASSIGNED',
    location: { lat: 12.9602, lng: 77.6010, address: 'Richmond Road, Shantala Nagar', landmark: 'Near Baldwin Boys High School', zone: 'CBD Zone', city: 'Bengaluru' },
    reportsCount: 15,
    priorityScore: 83,
    priorityBreakdown: { baseSeverity: 22, publicImpact: 22, complaintFrequency: 16, locationRisk: 14, timeUnresolved: 9, totalScore: 83 },
    department: 'Public Safety & Hazards',
    confidence: 0.92,
    estimatedImpact: 'HIGH',
    aiSummary: 'Tree limb proximity to energized conductor creates imminent arc flash and structural drop hazard. Tree trimming hydraulic bucket requested.',
    impactRadius: 100,
    nearbyFacilities: { schools: 3, hospitals: 1, busStops: 2 },
    createdAt: '11 hours ago',
    updatedAt: '4 hours ago',
    assignedTeam: 'Forestry & BESCOM Joint Unit',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '11:00 PM yesterday', description: 'School security notice', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '11:02 PM yesterday', description: 'Vegetation arc hazard confirmed', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: '11:30 PM yesterday', description: 'Hydraulic boom truck scheduled', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Waiting for traffic window', completed: false },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Limb lopped and cleared', completed: false }
    ]
  },
  {
    id: 'CP-48060',
    title: 'Accumulated Plastic Waste in Storm Drain Culvert',
    description: 'Hundreds of plastic bottles and bags choking inlet grating before upcoming monsoon showers.',
    category: 'GARBAGE',
    severity: 'MEDIUM',
    status: 'AI_ANALYZED',
    location: { lat: 12.9800, lng: 77.6000, address: 'Cubbon Park Perimeter, Kasturba Rd', landmark: 'Near High Court Gate 3', zone: 'CBD Zone', city: 'Bengaluru' },
    reportsCount: 11,
    priorityScore: 66,
    priorityBreakdown: { baseSeverity: 15, publicImpact: 19, complaintFrequency: 13, locationRisk: 10, timeUnresolved: 9, totalScore: 66 },
    department: 'Sanitation & Solid Waste',
    confidence: 0.90,
    estimatedImpact: 'MEDIUM',
    aiSummary: 'High solid waste accumulation in primary water inlet. Manual cleaning and grate mesh reinforcement required.',
    impactRadius: 75,
    nearbyFacilities: { schools: 1, hospitals: 0, busStops: 4 },
    createdAt: '12 hours ago',
    updatedAt: '6 hours ago',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '10:00 PM yesterday', description: 'Citizen runner photo', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '10:05 PM yesterday', description: 'Grate blockage assessed at 75%', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: 'Pending', description: 'Sanitation zone squad', completed: false },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Pending', description: 'Trash clearing underway', completed: false },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Pending', description: 'Inlet free flow confirmed', completed: false }
    ]
  },
  {
    id: 'CP-48010',
    title: 'Extensive Road Resurfacing Completed Successfully',
    description: '300m stretch of damaged asphalt milled, releveled and resurfaced with high friction mastic asphalt.',
    category: 'ROADS',
    severity: 'HIGH',
    status: 'RESOLVED',
    location: { lat: 12.9340, lng: 77.6101, address: 'Adugodi Main Rd, Dairy Circle', landmark: 'Near Bosch Tech Campus', zone: 'South Zone', city: 'Bengaluru' },
    reportsCount: 27,
    priorityScore: 85,
    priorityBreakdown: { baseSeverity: 22, publicImpact: 22, complaintFrequency: 22, locationRisk: 10, timeUnresolved: 9, totalScore: 85 },
    department: 'Road Maintenance',
    confidence: 0.97,
    estimatedImpact: 'HIGH',
    aiSummary: 'Case closed: Completed milling, bitumen overlay, thermoplastic lane markings. Quality index verified.',
    impactRadius: 300,
    nearbyFacilities: { schools: 2, hospitals: 2, busStops: 6 },
    createdAt: '2 days ago',
    updatedAt: '5 hours ago',
    assignedTeam: 'South Paving Taskforce',
    timeline: [
      { stage: 'REPORTED', label: 'Reported', timestamp: '2 days ago', description: 'Initial severe complaint logged', completed: true },
      { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: '2 days ago', description: 'Roughness index score failed', completed: true },
      { stage: 'ASSIGNED', label: 'Assigned', timestamp: 'Yesterday 08:00 AM', description: 'Resurfacing order issued', completed: true },
      { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Yesterday 09:00 PM', description: 'Night paving operation executed', completed: true },
      { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Today 07:00 AM', description: 'Laser profilometer audit passed', completed: true }
    ]
  }
];

// Helper to generate up to 50+ total complaints smoothly across coordinate clusters
export function getAllComplaints(): Complaint[] {
  const base = [...MOCK_COMPLAINTS];
  const categories: Array<Complaint['category']> = ['POTHOLE', 'GARBAGE', 'WATER', 'LIGHTING', 'ROADS', 'DRAINAGE', 'PUBLIC_SAFETY', 'TRAFFIC'];
  const severities: Array<Complaint['severity']> = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const statuses: Array<Complaint['status']> = ['REPORTED', 'AI_ANALYZED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];
  const departments = ['Road Maintenance', 'Water Supply & Sewage', 'Sanitation & Solid Waste', 'Electrical & Street Lighting', 'Public Safety & Hazards', 'Stormwater & Drainage'];

  // Add 36 procedurally generated realistic points around Bengaluru central & outer clusters
  const areas = [
    { name: 'Koramangala 6th Block', lat: 12.9344, lng: 77.6201, zone: 'South East' },
    { name: 'HSR Layout Sector 4', lat: 12.9081, lng: 77.6512, zone: 'Bommanahalli' },
    { name: 'Indiranagar 12th Main', lat: 12.9719, lng: 77.6410, zone: 'East' },
    { name: 'Whitefield Borewell Rd', lat: 12.9698, lng: 77.7499, zone: 'Mahadevapura' },
    { name: 'Basavanagudi Gandhi Bazaar', lat: 12.9421, lng: 77.5744, zone: 'South' },
    { name: 'Malleshwaram 8th Cross', lat: 13.0031, lng: 77.5689, zone: 'West' },
    { name: 'Rajajinagar Industrial Area', lat: 12.9980, lng: 77.5450, zone: 'West' },
    { name: 'BTM Layout 2nd Stage', lat: 12.9165, lng: 77.6101, zone: 'South' },
    { name: 'JP Nagar 6th Phase', lat: 12.9056, lng: 77.5855, zone: 'South' },
    { name: 'Marathahalli Bridge', lat: 12.9560, lng: 77.7011, zone: 'East Outer' },
    { name: 'Kalyan Nagar HRBR Layout', lat: 13.0163, lng: 77.6432, zone: 'North East' },
    { name: 'Bannerghatta Road Arekere', lat: 12.8890, lng: 77.5978, zone: 'South' },
  ];

  for (let i = 0; i < 36; i++) {
    const area = areas[i % areas.length];
    const cat = categories[i % categories.length];
    const sev = severities[(i + 1) % severities.length];
    const stat = statuses[(i + 2) % statuses.length];
    const dep = departments[i % departments.length];
    const caseId = `CP-${47000 + i}`;
    
    // slight jitter in coordinates
    const lat = area.lat + (Math.sin(i * 1.7) * 0.012);
    const lng = area.lng + (Math.cos(i * 2.3) * 0.012);

    const reportsCount = Math.floor(Math.random() * 25) + 3;
    const priority = Math.min(98, Math.max(35, Math.floor(reportsCount * 1.5 + (sev === 'CRITICAL' ? 50 : sev === 'HIGH' ? 35 : 15))));

    base.push({
      id: caseId,
      title: `${sev} ${cat.replace('_', ' ')} incident reported near ${area.name}`,
      description: `Civic issue detected requiring municipal intervention. Citizen community alerts logged and verified.`,
      category: cat,
      severity: sev,
      status: stat,
      location: {
        lat,
        lng,
        address: `${area.name}, Main Link Road`,
        landmark: `Near Landmark Pole #${100 + i}`,
        zone: area.zone,
        city: 'Bengaluru'
      },
      reportsCount,
      priorityScore: priority,
      priorityBreakdown: {
        baseSeverity: sev === 'CRITICAL' ? 25 : sev === 'HIGH' ? 20 : 14,
        publicImpact: Math.min(25, Math.floor(priority * 0.28)),
        complaintFrequency: Math.min(25, Math.floor(reportsCount * 0.8)),
        locationRisk: Math.floor(Math.random() * 6) + 9,
        timeUnresolved: Math.floor(Math.random() * 5) + 6,
        totalScore: priority
      },
      department: dep,
      confidence: +(0.85 + Math.random() * 0.13).toFixed(2),
      estimatedImpact: sev,
      aiSummary: `AI classification confidence high. Geotag verified within active municipal service boundary. Assigned to ${dep}.`,
      impactRadius: Math.floor(Math.random() * 200) + 100,
      nearbyFacilities: {
        schools: Math.floor(Math.random() * 3),
        hospitals: Math.floor(Math.random() * 2),
        busStops: Math.floor(Math.random() * 5) + 1
      },
      createdAt: `${i + 1} hours ago`,
      updatedAt: `${Math.floor(i / 2) + 1} hours ago`,
      timeline: [
        { stage: 'REPORTED', label: 'Reported', timestamp: 'Today', description: 'Citizen entry captured', completed: true },
        { stage: 'AI_ANALYZED', label: 'AI Analyzed', timestamp: 'Today', description: 'Issue categorized by CivicPulse AI', completed: true },
        { stage: 'ASSIGNED', label: 'Assigned', timestamp: 'Today', description: `Assigned to ${dep}`, completed: stat !== 'REPORTED' },
        { stage: 'IN_PROGRESS', label: 'In Progress', timestamp: 'Today', description: 'Work crew active', completed: stat === 'IN_PROGRESS' || stat === 'RESOLVED' },
        { stage: 'RESOLVED', label: 'Resolved', timestamp: 'Today', description: 'Audit complete', completed: stat === 'RESOLVED' }
      ]
    });
  }

  return base;
}

export const TIME_SERIES_ANALYTICS = [
  { day: 'Mon', reported: 142, resolved: 120, critical: 18 },
  { day: 'Tue', reported: 189, resolved: 165, critical: 24 },
  { day: 'Wed', reported: 230, resolved: 210, critical: 32 },
  { day: 'Thu', reported: 198, resolved: 180, critical: 21 },
  { day: 'Fri', reported: 285, resolved: 245, critical: 39 },
  { day: 'Sat', reported: 160, resolved: 172, critical: 15 },
  { day: 'Sun', reported: 120, resolved: 140, critical: 11 },
];

export const CATEGORY_DISTRIBUTION = [
  { name: 'Roads & Potholes', value: 38, count: 4742, color: '#22d3ee' },
  { name: 'Sanitation & Waste', value: 24, count: 2995, color: '#10b981' },
  { name: 'Water & Sewage', value: 16, count: 1996, color: '#3b82f6' },
  { name: 'Storm Drainage', value: 11, count: 1372, color: '#f59e0b' },
  { name: 'Electrical & Lights', value: 7, count: 873, color: '#8b5cf6' },
  { name: 'Public Safety', value: 4, count: 502, color: '#ef4444' },
];

export const SEVERITY_DISTRIBUTION = [
  { name: 'Critical', value: 15, count: 326, color: '#ef4444' },
  { name: 'High', value: 35, count: 749, color: '#f59e0b' },
  { name: 'Medium', value: 38, count: 813, color: '#3b82f6' },
  { name: 'Low', value: 12, count: 252, color: '#10b981' },
];
