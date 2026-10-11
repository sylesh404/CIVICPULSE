import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { useCivic } from '../../context/CivicContext';
import { Complaint } from '../../types';

interface MiniCityMapProps {
  onSelectComplaint?: (c: Complaint) => void;
  className?: string;
}

export const MiniCityMap: React.FC<MiniCityMapProps> = ({ onSelectComplaint, className = 'h-[420px]' }) => {
  const { complaints, setSelectedComplaint, setActiveTab } = useCivic();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [12.9716, 77.5946],
        zoom: 12,
        zoomControl: false,
        attributionControl: true,
      });

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const markersLayer = L.layerGroup().addTo(map);
      markersLayerRef.current = markersLayer;
      mapInstanceRef.current = map;
    }

    return () => {
      // Map cleanup if needed
    };
  }, []);

  useEffect(() => {
    const markersLayer = markersLayerRef.current;
    if (!markersLayer) return;

    markersLayer.clearLayers();

    complaints.forEach((c) => {
      const isCritical = c.severity === 'CRITICAL';
      const isHigh = c.severity === 'HIGH';
      const bgColor = isCritical ? '#DFFF00' : isHigh ? '#FFFFFF' : '#F3F2EC';
      const dotColor = isCritical ? '#E53935' : '#050505';

      const customHtml = `
        <div style="cursor: pointer; display: flex; flex-direction: column; align-items: center;">
          <div style="background: ${bgColor}; border: 2px solid #050505; box-shadow: 2px 2px 0px #050505; padding: 2px 6px; font-family: monospace; font-size: 9px; font-weight: 800; color: #050505; white-space: nowrap; display: flex; align-items: center; gap: 4px;">
            <span style="width: 6px; height: 6px; background: ${dotColor}; border-radius: 9999px;"></span>
            <span>${c.reportsCount} REPS</span>
          </div>
          <div style="width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid #050505;"></div>
        </div>
      `;

      const icon = L.divIcon({
        html: customHtml,
        className: 'civic-mini-marker',
        iconSize: [60, 24],
        iconAnchor: [30, 24],
      });

      const marker = L.marker([c.location.lat, c.location.lng], { icon });

      marker.on('click', () => {
        setSelectedComplaint(c);
        if (onSelectComplaint) {
          onSelectComplaint(c);
        } else {
          setActiveTab('map');
        }
      });

      marker.addTo(markersLayer);
    });
  }, [complaints, onSelectComplaint, setSelectedComplaint, setActiveTab]);

  return (
    <div className={`relative w-full ${className} border-2 border-[#050505] overflow-hidden`}>
      <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full" />
    </div>
  );
};
