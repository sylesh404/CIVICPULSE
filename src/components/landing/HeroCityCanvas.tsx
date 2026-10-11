import React, { useState } from 'react';
import { ArrowUpRight, MapPin, AlertTriangle, Layers, Droplet, Flame } from 'lucide-react';

interface CityHotspot {
  id: string;
  name: string;
  category: string;
  reports: number;
  criticalCount: number;
  status: string;
  gridZone: string;
}

const HOTSPOTS: CityHotspot[] = [
  { id: '1', name: 'MG ROAD • SECTOR 1', category: 'ROAD FRACTURE', reports: 37, criticalCount: 12, status: 'IN PROGRESS', gridZone: 'GRID 04-A' },
  { id: '2', name: 'INDIRANAGAR 100FT', category: 'WATER MAIN LEAK', reports: 29, criticalCount: 6, status: 'ASSIGNED', gridZone: 'GRID 08-B' },
  { id: '3', name: 'HSR LAYOUT SEC 1', category: 'OVERHEAD HAZARD', reports: 42, criticalCount: 18, status: 'CRITICAL', gridZone: 'GRID 11-C' },
  { id: '4', name: 'SILK BOARD JUNCTION', category: 'TRAFFIC SIGNAL', reports: 65, criticalCount: 24, status: 'DISPATCHED', gridZone: 'GRID 14-D' },
];

export const HeroCityCanvas: React.FC<{ onSelectHotspot?: (h: CityHotspot) => void }> = ({ onSelectHotspot }) => {
  const [activeSpot, setActiveSpot] = useState<CityHotspot>(HOTSPOTS[0]);

  return (
    <div className="w-full border-2 border-[#050505] bg-[#FFFFFF] shadow-[6px_6px_0px_#050505]">
      {/* Top Header Strip */}
      <div className="flex items-center justify-between border-b-2 border-[#050505] bg-[#F3F2EC] px-4 py-2 text-xs font-mono font-bold">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505] inline-block" />
          <span className="uppercase text-[#050505]">URBAN INCIDENT MATRIX • BENGALURU SECTORS</span>
        </div>
        <div className="text-[11px] text-[#666666]">
          ZONE REF: 12.9716° N / 77.5946° E
        </div>
      </div>

      {/* Editorial Infographic Composition Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 divide-y-2 md:divide-y-0 md:divide-x-2 divide-[#050505]">
        {/* Left Column: Geometric City Map Infographic (7 cols) */}
        <div className="md:col-span-7 p-6 bg-[#FFFFFF] grid-paper relative flex flex-col justify-between min-h-[380px]">
          {/* Schematic City Grid Overlays */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-[#666666]">
              <span>[ SCHEMATIC CITY CORE ]</span>
              <span>SCALE: 1:10,000</span>
            </div>

            {/* Geometric City Blocks */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-2">
              <div 
                onClick={() => setActiveSpot(HOTSPOTS[0])}
                className={`p-2 sm:p-3 border-2 border-[#050505] cursor-pointer transition-all touch-manipulation ${
                  activeSpot.id === '1' ? 'bg-[#DFFF00] shadow-[2px_2px_0px_#050505] sm:shadow-[3px_3px_0px_#050505]' : 'bg-[#FFFFFF] hover:bg-[#F3F2EC]'
                }`}
              >
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold">04-A</span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-[#050505] rounded-full" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm text-[#050505] truncate">MG ROAD</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#222222] mt-0.5 sm:mt-1 truncate">37 REPORTS</div>
              </div>

              <div 
                onClick={() => setActiveSpot(HOTSPOTS[1])}
                className={`p-2 sm:p-3 border-2 border-[#050505] cursor-pointer transition-all touch-manipulation ${
                  activeSpot.id === '2' ? 'bg-[#DFFF00] shadow-[2px_2px_0px_#050505] sm:shadow-[3px_3px_0px_#050505]' : 'bg-[#FFFFFF] hover:bg-[#F3F2EC]'
                }`}
              >
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold">08-B</span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm text-[#050505] truncate">INDIRANAGAR</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#222222] mt-0.5 sm:mt-1 truncate">29 REPORTS</div>
              </div>

              <div 
                onClick={() => setActiveSpot(HOTSPOTS[2])}
                className={`p-2 sm:p-3 border-2 border-[#050505] cursor-pointer transition-all touch-manipulation ${
                  activeSpot.id === '3' ? 'bg-[#DFFF00] shadow-[2px_2px_0px_#050505] sm:shadow-[3px_3px_0px_#050505]' : 'bg-[#FFFFFF] hover:bg-[#F3F2EC]'
                }`}
              >
                <div className="flex justify-between items-start mb-1 sm:mb-2">
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold">11-C</span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-600 rounded-full" />
                </div>
                <div className="font-display font-black text-xs sm:text-sm text-[#050505] truncate">HSR SECTOR</div>
                <div className="font-mono text-[9px] sm:text-[10px] text-[#222222] mt-0.5 sm:mt-1 truncate">42 REPORTS</div>
              </div>
            </div>

            {/* Arterial schematic lines */}
            <div className="my-4 p-4 border border-[#050505] bg-[#F3F2EC] font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#050505] text-[11px] text-[#666666]">
                <span>CORRIDOR ARTERIAL MONITOR</span>
                <span>STATUS: HIGH LOAD</span>
              </div>
              <div className="mt-2 space-y-1.5 text-xs text-[#050505] font-bold">
                <div className="flex justify-between">
                  <span>OUTER RING ROAD • BELLANDUR</span>
                  <span className="bg-[#050505] text-[#DFFF00] px-1.5 py-0.2">CRITICAL × 65</span>
                </div>
                <div className="flex justify-between">
                  <span>METRO LINE 1 • TRINITY PILLARS</span>
                  <span className="border border-[#050505] px-1.5">EVALUATING</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#050505] flex items-center justify-between text-xs font-mono text-[#666666]">
            <span>CLICK TILE TO INSPECT REGIONAL LOAD</span>
            <span className="text-[#050505] font-bold">AUTO-REFRESH: 5s</span>
          </div>
        </div>

        {/* Right Column: Active Hotspot Inspector (5 cols, Solid Black & Acid Yellow block) */}
        <div className="md:col-span-5 bg-[#050505] text-[#FFFFFF] p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#333333] pb-3 mb-4">
              <span className="bg-[#DFFF00] text-[#050505] px-2 py-0.5 font-mono text-xs font-black uppercase">
                ACTIVE FOCUS
              </span>
              <span className="font-mono text-xs text-[#B9B9B2]">
                {activeSpot.gridZone}
              </span>
            </div>

            <div className="text-[11px] font-mono text-[#DFFF00] uppercase tracking-wider mb-1">
              {activeSpot.category}
            </div>

            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#FFFFFF] leading-tight mb-4">
              {activeSpot.name}
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-[#B9B9B2]">VERIFIED REPORTS:</span>
                <span className="text-[#DFFF00] font-bold text-sm">{activeSpot.reports} CITIZENS</span>
              </div>
              <div className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-[#B9B9B2]">CRITICAL SEVERITY:</span>
                <span className="text-red-400 font-bold">{activeSpot.criticalCount} OF {activeSpot.reports}</span>
              </div>
              <div className="flex justify-between border-b border-[#222222] pb-2">
                <span className="text-[#B9B9B2]">CURRENT STATUS:</span>
                <span className="text-white font-bold">{activeSpot.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#B9B9B2]">DEPARTMENT:</span>
                <span className="text-white">ROAD MAINTENANCE</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#333333]">
            <button
              onClick={() => onSelectHotspot && onSelectHotspot(activeSpot)}
              className="w-full py-3 bg-[#DFFF00] text-[#050505] border-2 border-[#050505] font-mono text-xs font-black uppercase tracking-wider hover:bg-[#FFFFFF] transition-colors flex items-center justify-center gap-2"
            >
              <span>INSPECT ON LIVE MAP</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Summary Strip */}
      <div className="border-t-2 border-[#050505] bg-[#F3F2EC] px-4 py-2.5 flex flex-wrap items-center justify-between text-xs font-mono font-bold text-[#050505]">
        <span>TOTAL HOTSPOTS: 326 IDENTIFIED</span>
        <span>SLA COMPLIANCE: 89.4%</span>
        <span>DISPATCH LATENCY: 4.2 MIN</span>
      </div>
    </div>
  );
};
