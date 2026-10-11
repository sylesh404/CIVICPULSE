import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Plus, 
  Navigation, 
  Search, 
  MapPin, 
  Filter, 
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Flame,
  Grid,
  Radio,
  AlertCircle,
  WifiOff
} from 'lucide-react';
import L from 'leaflet';
import { useCivic } from '../context/CivicContext';
import { mapService } from '../services/mapService';
import { geocodingService } from '../services/geocodingService';
import { Complaint, Severity, Category, ComplaintStatus } from '../types';
import { MapIssuePanel } from '../components/map/MapIssuePanel';
import { LocationPermissionCard } from '../components/map/LocationPermissionCard';
import { MapReportChoiceModal } from '../components/map/MapReportChoiceModal';
import { MapDropPinBar } from '../components/map/MapDropPinBar';
import { NearbyIssuesPanel } from '../components/map/NearbyIssuesPanel';

type ViewMode = 'MAP' | 'HEATMAP' | 'CLUSTERS';

// Default Demo City: Bengaluru, Karnataka, India
const DEFAULT_CITY = {
  name: 'Bengaluru, Karnataka',
  lat: 12.9716,
  lng: 77.5946,
  zoom: 14,
};

export const LiveCityMapPage: React.FC = () => {
  const { 
    complaints, 
    stats, 
    selectedComplaint, 
    setSelectedComplaint, 
    categoryFilter, 
    setCategoryFilter, 
    severityFilter, 
    setSeverityFilter,
    userLocation,
    locationPermission,
    locationStatusText,
    requestLocation,
    hasCenteredOnce,
    setHasCenteredOnce,
    isPinningMode,
    setIsPinningMode,
    draftPinLocation,
    setDraftPinLocation,
    setReportChoiceModalOpen,
  } = useCivic();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  
  // Layer groups
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const heatmapLayerRef = useRef<L.LayerGroup | null>(null);
  const clustersLayerRef = useRef<L.LayerGroup | null>(null);
  const userLocationLayerRef = useRef<L.LayerGroup | null>(null);
  const dropPinLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>('MAP');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [permissionCardDismissed, setPermissionCardDismissed] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isTilesLoading, setIsTilesLoading] = useState(true);
  const [isTilesError, setIsTilesError] = useState(false);

  const categories = [
    { id: 'ALL', label: 'ALL' },
    { id: 'POTHOLE', label: 'POTHOLES' },
    { id: 'GARBAGE', label: 'GARBAGE' },
    { id: 'WATER', label: 'WATER' },
    { id: 'LIGHTING', label: 'LIGHTING' },
    { id: 'ROADS', label: 'ROAD DAMAGE' },
    { id: 'DRAINAGE', label: 'DRAINAGE' },
    { id: 'TRAFFIC', label: 'TRAFFIC' },
  ];

  const severities = ['ALL', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
  const statuses = ['ALL', 'REPORTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'];

  // Filter complaints based on municipal filters and search query
  const filteredComplaints = complaints.filter((c) => {
    if (categoryFilter !== 'ALL' && c.category !== categoryFilter) return false;
    if (severityFilter !== 'ALL' && c.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.location.address.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Request location on initial mount
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  // Initialize Real Geographic Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Default center is Bengaluru
      const initialLat = userLocation?.latitude || DEFAULT_CITY.lat;
      const initialLng = userLocation?.longitude || DEFAULT_CITY.lng;

      const map = L.map(mapContainerRef.current, {
        center: [initialLat, initialLng],
        zoom: DEFAULT_CITY.zoom,
        zoomControl: false,
        attributionControl: true,
      });

      // Real OpenStreetMap Tile Layer (Section 1 & 2)
      // Displays authentic roads, streets, neighborhoods, water bodies, and landmarks
      const osmTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      });

      // Track tile loading events
      osmTileLayer.on('loading', () => {
        setIsTilesLoading(true);
      });

      osmTileLayer.on('load', () => {
        setIsTilesLoading(false);
        setIsTilesError(false);
      });

      osmTileLayer.on('tileerror', () => {
        setIsTilesError(true);
      });

      osmTileLayer.addTo(map);

      // Real Zoom Control at bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      // Layer groups
      const markersLayer = L.layerGroup().addTo(map);
      const heatmapLayer = L.layerGroup().addTo(map);
      const clustersLayer = L.layerGroup().addTo(map);
      const userLayer = L.layerGroup().addTo(map);
      const dropPinLayer = L.layerGroup().addTo(map);

      markersLayerRef.current = markersLayer;
      heatmapLayerRef.current = heatmapLayer;
      clustersLayerRef.current = clustersLayer;
      userLocationLayerRef.current = userLayer;
      dropPinLayerRef.current = dropPinLayer;
      mapInstanceRef.current = map;

      // Handle map clicks in Drop Pin Mode (Section 19)
      map.on('click', async (e: L.LeafletMouseEvent) => {
        const container = mapContainerRef.current;
        if (container && container.getAttribute('data-pinning') === 'true') {
          const lat = e.latlng.lat;
          const lng = e.latlng.lng;
          // Reverse geocode clicked coordinate via dedicated service
          const address = await geocodingService.reverseGeocode(lat, lng);
          setDraftPinLocation({ lat, lng, address });
        }
      });
    }

    return () => {
      // Cleanup on unmount if hot-reloaded
    };
  }, []);

  // Update pinning mode attribute on map container
  useEffect(() => {
    if (mapContainerRef.current) {
      mapContainerRef.current.setAttribute('data-pinning', isPinningMode ? 'true' : 'false');
    }
  }, [isPinningMode]);

  // Recenter automatically only ONCE when GPS location is first acquired
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && userLocation && !hasCenteredOnce) {
      map.flyTo([userLocation.latitude, userLocation.longitude], 17, { duration: 1.2 });
      setHasCenteredOnce(true);
    }
  }, [userLocation, hasCenteredOnce, setHasCenteredOnce]);

  // Fly to selected complaint when opened
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (map && selectedComplaint) {
      map.flyTo([selectedComplaint.location.lat, selectedComplaint.location.lng], 17, {
        duration: 0.8,
      });
    }
  }, [selectedComplaint]);

  // Render Real User Location & Accuracy Circle (Section 6, 7, 8)
  useEffect(() => {
    const userLayer = userLocationLayerRef.current;
    if (!userLayer) return;

    userLayer.clearLayers();

    if (userLocation) {
      const lat = userLocation.latitude;
      const lng = userLocation.longitude;
      const accuracy = userLocation.accuracy;

      // Real GPS Accuracy circle (Section 8)
      L.circle([lat, lng], {
        radius: Math.max(accuracy, 12),
        color: '#050505',
        weight: 1.5,
        fillColor: '#DFFF00',
        fillOpacity: 0.18,
      }).addTo(userLayer);

      // Custom CivicPulse user marker (Section 7)
      const userIcon = mapService.createUserLocationMarker();
      const marker = L.marker([lat, lng], {
        icon: userIcon,
        zIndexOffset: 1000,
      }).addTo(userLayer);

      userMarkerRef.current = marker;

      const popupContent = `
        <div style="background: #FFFFFF; border: 2px solid #050505; padding: 12px; color: #050505; font-family: monospace; min-width: 190px; box-shadow: 4px 4px 0px #050505;">
          <div style="border-bottom: 2px solid #050505; padding-bottom: 4px; margin-bottom: 6px; font-weight: 900; font-size: 11px; display: flex; align-items: center; justify-content: space-between;">
            <span>YOU ARE HERE</span>
            <span style="background: #DFFF00; padding: 1px 4px; border: 1px solid #050505; font-size: 9px;">GPS LIVE</span>
          </div>
          <div style="font-size: 11px; line-height: 1.6;">
            <div>LAT: <b>${lat.toFixed(6)}</b></div>
            <div>LNG: <b>${lng.toFixed(6)}</b></div>
            <div>ACCURACY: <b>±${Math.round(accuracy)}m</b></div>
            <div style="color: #666; font-size: 9px; margin-top: 4px;">Updated: ${new Date(userLocation.timestamp).toLocaleTimeString()}</div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'civic-editorial-popup',
        closeButton: false,
      });
    }
  }, [userLocation]);

  // Render Draggable Report Pin in Drop Pin Mode (Section 19 & 20)
  useEffect(() => {
    const dropPinLayer = dropPinLayerRef.current;
    const map = mapInstanceRef.current;
    if (!dropPinLayer || !map) return;

    dropPinLayer.clearLayers();

    if (isPinningMode) {
      const center = map.getCenter();
      const targetLat = draftPinLocation ? draftPinLocation.lat : center.lat;
      const targetLng = draftPinLocation ? draftPinLocation.lng : center.lng;

      if (!draftPinLocation) {
        geocodingService.reverseGeocode(targetLat, targetLng).then((addr) => {
          setDraftPinLocation({ lat: targetLat, lng: targetLng, address: addr });
        });
      }

      const reportIcon = mapService.createDraggableReportMarker();
      const marker = L.marker([targetLat, targetLng], {
        icon: reportIcon,
        draggable: true,
        zIndexOffset: 1500,
      }).addTo(dropPinLayer);

      marker.on('drag', (e) => {
        const pos = e.target.getLatLng();
        setDraftPinLocation({
          lat: pos.lat,
          lng: pos.lng,
          address: `${pos.lat.toFixed(5)}, ${pos.lng.toFixed(5)}`,
        });
      });

      marker.on('dragend', async (e) => {
        const pos = e.target.getLatLng();
        const address = await geocodingService.reverseGeocode(pos.lat, pos.lng);
        setDraftPinLocation({ lat: pos.lat, lng: pos.lng, address });
      });
    }
  }, [isPinningMode, draftPinLocation?.lat, draftPinLocation?.lng]);

  // Render Issue Markers, Heatmap, or Clusters (Section 10, 11, 12, 22, 23)
  useEffect(() => {
    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    const heatmapLayer = heatmapLayerRef.current;
    const clustersLayer = clustersLayerRef.current;

    if (!map || !markersLayer || !heatmapLayer || !clustersLayer) return;

    markersLayer.clearLayers();
    heatmapLayer.clearLayers();
    clustersLayer.clearLayers();

    if (viewMode === 'MAP') {
      // Standard individual issue markers with category icons
      filteredComplaints.forEach((c) => {
        const isSelected = selectedComplaint?.id === c.id;
        const icon = mapService.createIssueMarker(c, isSelected);

        const marker = L.marker([c.location.lat, c.location.lng], { icon });

        marker.on('click', () => {
          setSelectedComplaint(c);
          map.panTo([c.location.lat, c.location.lng], { animate: true });
        });

        marker.addTo(markersLayer);
      });
    } else if (viewMode === 'HEATMAP') {
      // Real geographic weighted heatmap circles (Section 23)
      // Critical = 5, High = 4, Medium = 2, Low = 1
      filteredComplaints.forEach((c) => {
        const weight = c.severity === 'CRITICAL' ? 5 : c.severity === 'HIGH' ? 4 : c.severity === 'MEDIUM' ? 2 : 1;
        const radius = weight * 80;
        const fillColor = c.severity === 'CRITICAL' ? '#E53935' : c.severity === 'HIGH' ? '#FFB300' : '#DFFF00';

        L.circle([c.location.lat, c.location.lng], {
          radius,
          color: '#050505',
          weight: 1.5,
          fillColor,
          fillOpacity: 0.3,
        })
          .on('click', () => setSelectedComplaint(c))
          .addTo(heatmapLayer);

        // Center dot
        L.circleMarker([c.location.lat, c.location.lng], {
          radius: 4,
          color: '#050505',
          fillColor: '#FFFFFF',
          fillOpacity: 1,
          weight: 2,
        })
          .on('click', () => setSelectedComplaint(c))
          .addTo(heatmapLayer);
      });
    } else if (viewMode === 'CLUSTERS') {
      // Dynamic marker clustering (Section 12)
      const currentZoom = map.getZoom();
      const clusterDistanceThreshold = currentZoom >= 16 ? 0.004 : currentZoom >= 14 ? 0.015 : 0.045;

      const clusters: {
        centerLat: number;
        centerLng: number;
        items: Complaint[];
        hasCritical: boolean;
      }[] = [];

      filteredComplaints.forEach((item) => {
        let assigned = false;
        for (const cluster of clusters) {
          const dLat = Math.abs(cluster.centerLat - item.location.lat);
          const dLng = Math.abs(cluster.centerLng - item.location.lng);
          if (dLat < clusterDistanceThreshold && dLng < clusterDistanceThreshold) {
            cluster.items.push(item);
            if (item.severity === 'CRITICAL') cluster.hasCritical = true;
            assigned = true;
            break;
          }
        }

        if (!assigned) {
          clusters.push({
            centerLat: item.location.lat,
            centerLng: item.location.lng,
            items: [item],
            hasCritical: item.severity === 'CRITICAL',
          });
        }
      });

      clusters.forEach((cl) => {
        if (cl.items.length === 1) {
          const item = cl.items[0];
          const icon = mapService.createIssueMarker(item, selectedComplaint?.id === item.id);
          L.marker([item.location.lat, item.location.lng], { icon })
            .on('click', () => setSelectedComplaint(item))
            .addTo(clustersLayer);
        } else {
          const clusterIcon = mapService.createClusterMarker(cl.items.length, cl.hasCritical);
          L.marker([cl.centerLat, cl.centerLng], { icon: clusterIcon })
            .on('click', () => {
              map.flyTo([cl.centerLat, cl.centerLng], currentZoom + 2, { duration: 0.6 });
            })
            .addTo(clustersLayer);
        }
      });
    }
  }, [filteredComplaints, viewMode, selectedComplaint]);

  // Recenter on user when LOCATE ME is clicked (Section 9)
  const handleRecenterOnUser = useCallback(() => {
    if (!userLocation) {
      requestLocation();
      return;
    }
    const map = mapInstanceRef.current;
    if (map) {
      map.flyTo([userLocation.latitude, userLocation.longitude], 17, { duration: 0.8 });
      if (userMarkerRef.current) {
        userMarkerRef.current.openPopup();
      }
    }
  }, [userLocation, requestLocation]);

  const handleSelectNearbyIssue = (issue: Complaint) => {
    setSelectedComplaint(issue);
    mapInstanceRef.current?.flyTo([issue.location.lat, issue.location.lng], 16, { duration: 0.8 });
  };

  return (
    <div className="relative w-full h-[calc(100vh-120px)] md:h-[calc(100vh-64px)] mt-14 sm:mt-16 bg-[#F3F2EC] overflow-hidden select-none">
      {/* Real Map DOM Element */}
      <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full" />

      {/* Editorial Tile Loading State (Section 28) */}
      {isTilesLoading && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 border-2 border-[#050505] bg-[#FFFFFF] px-4 py-2 shadow-[4px_4px_0px_#050505] flex items-center gap-3 font-mono">
          <div className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505] animate-pulse" />
          <div className="text-[11px] font-black uppercase text-[#050505]">
            CITY MAP LOADING...
          </div>
        </div>
      )}

      {/* Tile Error / Offline State (Section 29) */}
      {isTilesError && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-10 border-2 border-[#050505] bg-[#FFFFFF] px-4 py-3 shadow-[6px_6px_0px_#050505] flex items-center gap-3 font-mono max-w-md">
          <WifiOff className="w-5 h-5 text-red-600 shrink-0" />
          <div>
            <div className="text-xs font-black uppercase text-red-600">MAP DATA UNAVAILABLE</div>
            <div className="text-[10px] text-[#444444]">Check your internet connection. Interface remains operational.</div>
          </div>
        </div>
      )}

      {/* Top Left: City Header + Demo Mode Badge + Live GPS Status (Section 5, 6, 33) */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="border-2 border-[#050505] bg-[#FFFFFF] px-3 py-1.5 sm:px-4 sm:py-2 shadow-[3px_3px_0px_#050505] sm:shadow-[4px_4px_0px_#050505] flex items-center gap-2 sm:gap-3">
          <span className="font-display font-black text-xs sm:text-sm uppercase text-[#050505]">
            BENGALURU CITY
          </span>
          <span className="h-3 sm:h-4 w-0.5 bg-[#050505]" />
          <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold">
            <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 border border-[#050505] ${locationPermission === 'granted' ? 'bg-[#DFFF00]' : 'bg-red-500'}`} />
            <span className="truncate max-w-[120px] sm:max-w-none">{locationStatusText}</span>
          </div>
        </div>

        {/* Clear Demo Mode Indicator (Section 10 & 33) */}
        <div className="border-2 border-[#050505] bg-[#DFFF00] px-2.5 py-1 sm:px-3 sm:py-1.5 shadow-[3px_3px_0px_#050505] flex items-center gap-1.5 font-mono text-[10px] sm:text-xs font-black uppercase text-[#050505]">
          <span className="w-1.5 h-1.5 bg-[#050505]" />
          <span>DEMO MODE</span>
        </div>
      </div>

      {/* Top Right: View Mode Toggle (MAP | HEATMAP | CLUSTERS) & Search (Section 22) */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 sm:gap-2">
        {/* Search */}
        <div className="hidden sm:flex border-2 border-[#050505] bg-[#FFFFFF] px-3 py-1.5 shadow-[4px_4px_0px_#050505] items-center gap-2 w-44 sm:w-56 font-mono text-xs">
          <Search className="w-3.5 h-3.5 text-[#050505]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search #ID or street..."
            className="bg-transparent outline-none w-full text-[#050505] placeholder-[#888888] font-bold"
          />
        </div>

        {/* View Mode Toggle: MAP | HEATMAP | CLUSTERS (Section 22) */}
        <div className="border-2 border-[#050505] bg-[#FFFFFF] p-0.5 sm:p-1 shadow-[3px_3px_0px_#050505] sm:shadow-[4px_4px_0px_#050505] flex items-center font-mono text-[10px] sm:text-xs font-black">
          {(['MAP', 'HEATMAP', 'CLUSTERS'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-2 sm:px-3 py-1 transition-colors touch-manipulation uppercase ${
                viewMode === mode
                  ? 'bg-[#050505] text-[#DFFF00]'
                  : 'text-[#050505] hover:bg-[#DFFF00]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Location Permission Card */}
      {!permissionCardDismissed && locationPermission !== 'granted' && (
        <LocationPermissionCard onClose={() => setPermissionCardDismissed(true)} />
      )}

      {/* Drop Pin Mode Active Banner (Section 19 & 20) */}
      <MapDropPinBar />

      {/* Left Panel: Municipal Filters (Section 14 & 15) */}
      <div className="hidden md:flex absolute top-20 left-4 z-20 w-80 bg-[#FFFFFF] border-2 border-[#050505] shadow-[6px_6px_0px_#050505] flex-col max-h-[calc(100vh-340px)] overflow-hidden font-mono">
        <div className="p-3 border-b-2 border-[#050505] bg-[#F3F2EC] flex items-center justify-between">
          <span className="text-xs font-black uppercase text-[#050505]">
            MUNICIPAL FILTERS
          </span>
          <span className="text-[10px] text-[#050505] font-black bg-[#DFFF00] px-1.5 py-0.5 border border-[#050505]">
            {filteredComplaints.length} MATCHES
          </span>
        </div>

        <div className="p-3.5 space-y-3 overflow-y-auto">
          {/* Category Chips */}
          <div>
            <span className="text-[10px] uppercase font-bold text-[#666666] block mb-1.5">
              CATEGORY:
            </span>
            <div className="flex flex-wrap gap-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-2 py-0.5 text-[10px] border border-[#050505] font-bold transition-all ${
                    categoryFilter === cat.id
                      ? 'bg-[#DFFF00] text-[#050505]'
                      : 'bg-[#FFFFFF] text-[#050505] hover:bg-[#F3F2EC]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Severity Chips */}
          <div>
            <span className="text-[10px] uppercase font-bold text-[#666666] block mb-1.5">
              SEVERITY:
            </span>
            <div className="flex flex-wrap gap-1">
              {severities.map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2 py-0.5 text-[10px] border border-[#050505] font-bold transition-all ${
                    severityFilter === sev
                      ? sev === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-[#050505] text-[#DFFF00]'
                      : 'bg-[#FFFFFF] text-[#050505] hover:bg-[#F3F2EC]'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* Status Chips */}
          <div>
            <span className="text-[10px] uppercase font-bold text-[#666666] block mb-1.5">
              STATUS:
            </span>
            <div className="flex flex-wrap gap-1">
              {statuses.map((stat) => (
                <button
                  key={stat}
                  onClick={() => setStatusFilter(stat)}
                  className={`px-2 py-0.5 text-[10px] border border-[#050505] font-bold transition-all ${
                    statusFilter === stat
                      ? 'bg-[#050505] text-[#FFFFFF]'
                      : 'bg-[#FFFFFF] text-[#050505] hover:bg-[#F3F2EC]'
                  }`}
                >
                  {stat.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Left-Bottom: Nearby Civic Issues Panel (Section 16 & 17) */}
      <NearbyIssuesPanel onSelectIssue={handleSelectNearbyIssue} />

      {/* Floating Action Buttons on Bottom Right (Section 9 & 18) */}
      <div className="absolute bottom-4 md:bottom-6 right-3 sm:right-6 z-20 flex flex-col items-end gap-2.5 font-mono">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setMobileFilterOpen(true)}
          className="md:hidden min-h-[44px] px-3.5 py-2.5 bg-[#FFFFFF] hover:bg-[#F3F2EC] text-[#050505] border-2 border-[#050505] shadow-[3px_3px_0px_#050505] text-xs font-black uppercase flex items-center gap-2 transition-all touch-manipulation"
        >
          <Filter className="w-4 h-4 text-[#050505]" />
          <span>FILTER ({filteredComplaints.length})</span>
        </button>

        {/* ◎ LOCATE ME Button (Section 9) */}
        <button
          onClick={handleRecenterOnUser}
          className="min-h-[44px] px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#FFFFFF] hover:bg-[#F3F2EC] text-[#050505] border-2 border-[#050505] shadow-[3px_3px_0px_#050505] sm:shadow-[4px_4px_0px_#050505] text-xs font-black uppercase flex items-center gap-2 transition-all active:scale-95 touch-manipulation"
          title="Center map on your real GPS location"
        >
          <Navigation className="w-4 h-4 text-[#050505]" />
          <span>◎ LOCATE ME</span>
        </button>

        {/* + REPORT ISSUE Button (Section 18) */}
        <button
          onClick={() => setReportChoiceModalOpen(true)}
          className="btn-editorial-yellow min-h-[48px] px-5 py-3 sm:px-6 sm:py-4 text-xs font-black tracking-wider uppercase shadow-[4px_4px_0px_#050505] sm:shadow-[6px_6px_0px_#050505] flex items-center gap-2 touch-manipulation"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>+ REPORT ISSUE</span>
        </button>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="md:hidden fixed inset-x-0 bottom-16 z-50 bg-white border-t-2 border-[#050505] shadow-[0px_-6px_0px_#050505] max-h-[75vh] flex flex-col font-mono">
          <div className="flex justify-center py-1.5 bg-[#EAE8DD] border-b border-[#050505]">
            <div className="w-12 h-1 bg-[#050505]" />
          </div>

          <div className="p-4 border-b-2 border-[#050505] bg-[#F3F2EC] flex items-center justify-between">
            <div>
              <span className="font-display font-black text-sm uppercase text-[#050505]">FILTER ISSUES</span>
              <span className="text-[10px] text-slate-600 block">{filteredComplaints.length} MATCHES RECORDED</span>
            </div>
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="p-1.5 border-2 border-[#050505] bg-white hover:bg-[#DFFF00]"
            >
              <Filter className="w-4 h-4 text-[#050505]" />
            </button>
          </div>

          <div className="p-4 space-y-4 overflow-y-auto max-h-[50vh]">
            {/* Category */}
            <div>
              <span className="text-[10px] font-black uppercase text-slate-600 block mb-2">CATEGORY:</span>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCategoryFilter(cat.id)}
                    className={`min-h-[36px] px-3 py-1 text-xs border-2 border-[#050505] font-black ${
                      categoryFilter === cat.id
                        ? 'bg-[#DFFF00] text-[#050505] shadow-[2px_2px_0px_#050505]'
                        : 'bg-white text-[#050505]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity */}
            <div>
              <span className="text-[10px] font-black uppercase text-slate-600 block mb-2">SEVERITY:</span>
              <div className="flex flex-wrap gap-1.5">
                {severities.map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSeverityFilter(sev)}
                    className={`min-h-[36px] px-3 py-1 text-xs border-2 border-[#050505] font-black ${
                      severityFilter === sev
                        ? sev === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-[#050505] text-[#DFFF00]'
                        : 'bg-white text-[#050505]'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 border-t-2 border-[#050505] bg-[#F3F2EC]">
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full min-h-[48px] bg-[#050505] text-[#DFFF00] border-2 border-[#050505] font-black text-xs uppercase tracking-wider shadow-[3px_3px_0px_#050505]"
            >
              APPLY FILTER ({filteredComplaints.length} MATCHES) →
            </button>
          </div>
        </div>
      )}

      {/* Slide-out Rectangular Issue Panel: Selected Case Details (Section 13 & 14) */}
      <MapIssuePanel
        complaint={selectedComplaint}
        onClose={() => setSelectedComplaint(null)}
      />

      {/* Modal: Report Choice (Use My Location or Drop Pin) */}
      <MapReportChoiceModal />
    </div>
  );
};
