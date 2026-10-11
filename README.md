# CIVICPULSE — THE CITY, PRIORITIZED BY AI

> **Next-Generation Autonomous Civic Intelligence & Spatial Operations Platform**  
> Built for smart city administrations, rapid civic response teams, and engaged citizens.

---

## 🏛️ Executive Summary

**CivicPulse** is an AI-powered municipal dispatch and civic intelligence platform designed to replace legacy 311 systems. It transforms raw citizen grievance submissions into verified, prioritized, and geocoded civic operations cases. 

Featuring an **Editorial Neo-Brutalist** aesthetic (Black, Off-White, Acid Yellow), CivicPulse combines real geographic maps, live browser GPS telemetry, AI triage via Groq LLMs, and multi-variable priority scoring into a high-density, real-time command center.

---

## ⚡ Core Capabilities

### 1. 🗺️ Real Interactive Geographic Map
- **Authentic Cartography**: Powered by **Leaflet** and official **OpenStreetMap** raster tiles (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`). No static screenshots or artificial grid placeholders.
- **Default City**: Bengaluru, Karnataka, India (`12.9716, 77.5946`). Transparently labeled in **DEMO MODE**.
- **Live Geolocation Tracking**: Uses `navigator.geolocation.watchPosition()` with a custom neo-brutalist user location marker (black ring, yellow pulse, `YOU ARE HERE` badge) and real-time GPS accuracy radius circle.
- **`◎ LOCATE ME`**: Smooth animated fly-to centering on user coordinates with zoom level 17.
- **Dynamic Layer Modes**:
  - `MAP`: Individual category markers (potholes, garbage, water leaks, lighting, drainage, traffic) with red critical pip badges.
  - `HEATMAP`: Real weighted geographic heatmap circles based on issue severity (`Critical = 5`, `High = 4`, `Medium = 2`, `Low = 1`).
  - `CLUSTERS`: Zoom-responsive spatial marker clustering (`37` → `18` → individual).
- **Interactive Drop Pin**: Users can drop a draggable pin anywhere on the city map. Live latitude/longitude updates and reverse geocoding via OpenStreetMap Nominatim with memory cache.
- **Nearby Issues Telemetry**: Real Haversine geodesic distance calculation displaying live counts within `< 500M`, `< 1KM`, and `< 2KM` with multi-mode sorting (`Nearest`, `Priority`, `Reports`).

### 2. 🤖 AI Citizen Assistant (Groq LLM)
- Natural language civic reporting assistant powered by **Groq** high-speed inference.
- Autonomous extraction of civic category, severity assessment, urgency score, and department routing.
- Context-aware dialogue guiding citizens to report issues with precision.

### 3. ⚖️ AI Priority Scoring Engine (0–100)
- Multi-factor algorithmic ranking:
  - **Category Weight** (structural road damage, water contamination, live electric wires).
  - **Citizen Duplicate Volume** (crowd-sourced confirmation).
  - **Proximity to Critical Infrastructure** (schools, hospitals, transit hubs).
  - **Temporal Escalation** (aging unassigned tickets).

### 4. 🎛️ City Operations Command Center
- **Live Spatial Incident Telemetry**: Real mini Leaflet map of Bengaluru embedded directly in the admin dashboard.
- **Departmental Load Distribution**: Real-time SLA tracking across Road Maintenance, Waste Management, Water Supply, and Electrical divisions.
- **Automated Rapid Response Dispatch**: Case status workflows from `REPORTED` → `ASSIGNED` → `IN_PROGRESS` → `RESOLVED`.

### 5. 📱 Mobile-First Neo-Brutalist Design
- Full responsiveness across 320px mobile viewports through 4K displays.
- Touch-friendly 44px+ tap targets, slide-out bottom sheets for case details and filters, and high-contrast typography.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Styling & Design** | Tailwind CSS, Custom Neo-Brutalist Design System, Lucide Icons |
| **Geospatial & Maps** | Leaflet, OpenStreetMap Tiles, Nominatim Reverse Geocoding |
| **AI Inference** | Groq SDK (`llama-3.3-70b-versatile`, `mixtral-8x7b-32768`) |
| **Animations** | Framer Motion |
| **Architecture** | Component-Driven Architecture, React Context (`CivicContext`), Service Layer Pattern |

---

## 🚀 Quickstart & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` or `yarn`

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone <repo-url>
cd PRO
npm install
```

### 2. Environment Variables
Create a `.env` file in the project root:
```env
# Groq AI API Key for Live Assistant
VITE_GROQ_API_KEY=your_groq_api_key_here

# Backend Integration (Optional)
VITE_USE_REAL_BACKEND=false
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

### 3. Start Development Server
```bash
npm run dev -- --host
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Production Build
```bash
npm run build
```
Generates production-optimized bundle in the `dist/` directory.

---

## 📂 Project Architecture

```
PRO/
├── public/                 # Static public assets
├── src/
│   ├── components/
│   │   ├── common/         # Navbar, NotificationDrawer, MobileNav
│   │   ├── landing/        # Hero canvas, KPI counters, Civic impact
│   │   └── map/            # Leaflet map components
│   │       ├── LiveCityMapPage.tsx       # Main 3-panel real map interface
│   │       ├── MiniCityMap.tsx           # Command center embedded Leaflet map
│   │       ├── MapIssuePanel.tsx         # Neo-brutalist case detail inspector
│   │       ├── NearbyIssuesPanel.tsx     # Haversine distance radius buckets
│   │       ├── MapDropPinBar.tsx         # Draggable report pin confirmation bar
│   │       ├── MapReportChoiceModal.tsx  # GPS vs Pin selection modal
│   │       └── LocationPermissionCard.tsx# Browser GPS permission dialog
│   ├── context/
│   │   └── CivicContext.tsx# Reactive municipal state & GPS watch loop
│   ├── data/
│   │   └── mockData.ts     # Realistic Bengaluru civic complaints dataset
│   ├── pages/
│   │   ├── LandingPage.tsx
│   │   ├── LiveCityMapPage.tsx
│   │   ├── CitizenReportPage.tsx
│   │   ├── CommandCenterPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   ├── AiAssistantPage.tsx
│   │   ├── ComplaintTrackingPage.tsx
│   │   ├── ComplaintsDirectoryPage.tsx
│   │   ├── DepartmentsPage.tsx
│   │   └── CivicImpactPage.tsx
│   ├── services/
│   │   ├── apiService.ts       # Backend client (getComplaints, updateComplaint, etc.)
│   │   ├── geocodingService.ts # Nominatim reverse geocoding with caching
│   │   ├── mapService.ts       # Leaflet divIcon SVG generators & styling
│   │   ├── complaintService.ts # Haversine distance & sorting routines
│   │   ├── groqService.ts      # LLM inference & autonomous complaint parser
│   │   └── locationService.ts  # Browser Geolocation API wrapper
│   ├── types/                  # TypeScript interfaces (Complaint, Status, Severity)
│   ├── App.tsx                 # Route coordinator & tab dispatcher
│   ├── main.tsx                # React root mount
│   └── index.css               # Neo-brutalist design tokens & map styling
└── package.json
```

---

## 🔒 Privacy & Permissions

- **Geolocation**: Browser location coordinates are processed strictly client-side to display the user marker and compute distances to municipal complaints.
- **Location Fallback**: If permission is denied or pending, the map defaults smoothly to Bengaluru city center (`12.9716, 77.5946`) without interrupting application features.

---

## 📜 License

MIT License. Designed and developed for the CivicPulse Smart City initiative.
