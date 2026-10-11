import React from 'react';
import { X, ArrowUpRight, Check, AlertTriangle, Users } from 'lucide-react';
import { Complaint } from '../../types';
import { useCivic } from '../../context/CivicContext';

interface MapIssuePanelProps {
  complaint: Complaint | null;
  onClose: () => void;
}

export const MapIssuePanel: React.FC<MapIssuePanelProps> = ({ complaint, onClose }) => {
  const { setActiveTab, setSelectedComplaint, joinExistingComplaint } = useCivic();

  if (!complaint) return null;

  const isCritical = complaint.severity === 'CRITICAL';

  return (
    <div className="fixed md:top-16 md:right-0 md:bottom-0 md:w-96 md:max-w-md md:border-l-2 md:border-t-0 inset-x-0 bottom-16 md:bottom-0 max-h-[74vh] md:max-h-none z-40 bg-[#FFFFFF] border-t-2 md:border-t-0 border-[#050505] shadow-[0px_-6px_0px_#050505] md:shadow-[-6px_0px_0px_rgba(5,5,5,0.08)] flex flex-col justify-between overflow-y-auto">
      {/* Mobile drag handle */}
      <div className="md:hidden flex justify-center py-1.5 bg-[#EAE8DD] border-b border-[#050505] select-none">
        <div className="w-12 h-1 bg-[#050505]" />
      </div>

      {/* Top Header */}
      <div>
        <div className="p-4 sm:p-5 border-b-2 border-[#050505] bg-[#F3F2EC] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs font-black">
              <span className={`px-2 py-0.5 border border-[#050505] uppercase ${isCritical ? 'bg-red-600 text-white' : 'bg-[#050505] text-[#DFFF00]'}`}>
                {complaint.severity}
              </span>
              <span className="text-[#050505]">
                CASE #{complaint.id}
              </span>
            </div>

            <h3 className="font-display font-black text-xl sm:text-2xl text-[#050505] leading-none uppercase">
              {complaint.title}
            </h3>

            <div className="font-mono text-xs text-[#444444] mt-2 font-bold">
              📍 {complaint.location.address}
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 border-2 border-[#050505] hover:bg-[#DFFF00] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center touch-manipulation"
            aria-label="Close Issue Sheet"
          >
            <X className="w-4 h-4 text-[#050505] stroke-[2.5]" />
          </button>
        </div>

        {/* Content Rows */}
        <div className="p-5 space-y-4 font-mono text-xs">
          {/* Key Stat Blocks */}
          <div className="grid grid-cols-2 divide-x-2 border-2 border-[#050505] bg-[#F3F2EC]">
            <div className="p-3">
              <span className="text-[10px] text-[#666666] uppercase block">REPORTS</span>
              <span className="font-display font-black text-2xl text-[#050505] block mt-0.5">
                {complaint.reportsCount} CITIZENS
              </span>
            </div>
            <div className="p-3 bg-[#DFFF00]">
              <span className="text-[10px] text-[#050505] uppercase block font-bold">PRIORITY SCORE</span>
              <span className="font-display font-black text-2xl text-[#050505] block mt-0.5">
                {complaint.priorityScore} / 100
              </span>
            </div>
          </div>

          {/* Department & Status */}
          <div className="border border-[#050505] p-3 space-y-2 bg-[#FFFFFF]">
            <div className="flex justify-between border-b border-[#050505] pb-1.5">
              <span className="text-[#666666]">DEPARTMENT:</span>
              <span className="font-bold text-[#050505] uppercase">{complaint.department}</span>
            </div>
            <div className="flex justify-between border-b border-[#050505] pb-1.5">
              <span className="text-[#666666]">STATUS:</span>
              <span className="font-bold text-[#050505] uppercase">{complaint.status.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">REPORTED:</span>
              <span className="text-[#050505]">{complaint.createdAt}</span>
            </div>
          </div>

          {/* AI Summary Block */}
          <div className="border-2 border-[#050505] bg-[#F3F2EC] p-3.5">
            <span className="text-[10px] text-[#050505] font-black uppercase tracking-wider block mb-1">
              AI SUMMARY:
            </span>
            <p className="font-sans text-xs text-[#222222] leading-relaxed">
              {complaint.aiSummary}
            </p>
          </div>

          {/* Impact Facilities */}
          <div className="border border-[#050505] p-3 flex justify-between text-center">
            <div>
              <span className="text-[10px] text-[#666666] block">SCHOOLS</span>
              <span className="font-bold text-sm">{complaint.nearbyFacilities.schools}</span>
            </div>
            <div className="border-x border-[#050505] px-4">
              <span className="text-[10px] text-[#666666] block">HOSPITALS</span>
              <span className="font-bold text-sm">{complaint.nearbyFacilities.hospitals}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#666666] block">TRANSIT</span>
              <span className="font-bold text-sm">{complaint.nearbyFacilities.busStops}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons */}
      <div className="p-4 border-t-2 border-[#050505] bg-[#F3F2EC] flex gap-2 font-mono">
        <button
          onClick={() => joinExistingComplaint(complaint.id)}
          className="flex-1 py-3 px-2 bg-[#FFFFFF] hover:bg-[#DFFF00] text-[#050505] border-2 border-[#050505] text-xs font-bold uppercase transition-colors"
        >
          +1 JOIN CASE
        </button>

        <button
          onClick={() => {
            setSelectedComplaint(complaint);
            setActiveTab('my-complaints');
          }}
          className="flex-1 py-3 px-2 btn-editorial-black text-xs font-bold uppercase flex items-center justify-center gap-1"
        >
          <span>VIEW CASE ↗</span>
        </button>
      </div>
    </div>
  );
};
