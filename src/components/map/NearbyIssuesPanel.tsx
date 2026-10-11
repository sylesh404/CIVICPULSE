import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { complaintService, SortMode } from '../../services/complaintService';
import { locationService } from '../../services/locationService';
import { Complaint } from '../../types';

interface NearbyIssuesPanelProps {
  onSelectIssue: (issue: Complaint) => void;
}

export const NearbyIssuesPanel: React.FC<NearbyIssuesPanelProps> = ({ onSelectIssue }) => {
  const { userLocation, complaints, selectedComplaint } = useCivic();
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [sortMode, setSortMode] = useState<SortMode>('NEAREST');

  const refLat = userLocation?.latitude ?? 12.9716;
  const refLng = userLocation?.longitude ?? 77.5946;

  const nearbyStats = complaintService.calculateNearbyStats(
    refLat,
    refLng,
    complaints
  );

  const sortedComplaints = complaintService.sortComplaints(
    complaints,
    sortMode,
    refLat,
    refLng
  );

  return (
    <div className="hidden md:block absolute bottom-6 left-4 z-20 w-80 max-w-[calc(100vw-32px)]">
      <div className="border-2 border-[#050505] bg-[#FFFFFF] shadow-[6px_6px_0px_#050505]">
        {/* Toggle Header */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-3.5 flex items-center justify-between border-b-2 border-[#050505] bg-[#F3F2EC] hover:bg-[#EAE8DE] transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505] inline-block" />
            <h3 className="text-xs font-mono font-bold tracking-wider text-[#050505] uppercase">
              NEARBY CIVIC ISSUES
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-[#050505] font-black bg-[#DFFF00] px-1.5 py-0.5 border border-[#050505]">
              {nearbyStats.within2km} in 2km
            </span>
            {isExpanded ? <ChevronDown className="w-4 h-4 text-[#050505]" /> : <ChevronUp className="w-4 h-4 text-[#050505]" />}
          </div>
        </button>

        {isExpanded && (
          <div className="p-4 space-y-3 font-mono">
            {/* Radius Counters */}
            <div className="grid grid-cols-3 divide-x-2 border-2 border-[#050505] bg-[#FFFFFF] text-center">
              <div className="p-2">
                <span className="text-[8px] text-[#666666] block">&lt; 500M</span>
                <span className="font-display font-black text-lg text-[#050505] block mt-0.5">{nearbyStats.within500m}</span>
              </div>
              <div className="p-2 bg-[#F3F2EC]">
                <span className="text-[8px] text-[#666666] block">&lt; 1KM</span>
                <span className="font-display font-black text-lg text-[#050505] block mt-0.5">{nearbyStats.within1km}</span>
              </div>
              <div className="p-2 bg-[#DFFF00]">
                <span className="text-[8px] text-[#050505] font-bold block">&lt; 2KM</span>
                <span className="font-display font-black text-lg text-[#050505] block mt-0.5">{nearbyStats.within2km}</span>
              </div>
            </div>

            {/* Sort chips */}
            <div className="flex items-center justify-between text-[10px] pt-1 border-t border-[#050505]">
              <span className="text-[#666666] uppercase">SORT:</span>
              <div className="flex gap-1">
                {(['NEAREST', 'HIGHEST_PRIORITY', 'MOST_REPORTED'] as SortMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSortMode(mode)}
                    className={`px-2 py-0.5 border border-[#050505] text-[10px] uppercase font-bold transition-all ${
                      sortMode === mode
                        ? 'bg-[#050505] text-[#DFFF00]'
                        : 'bg-[#FFFFFF] text-[#050505] hover:bg-[#F3F2EC]'
                    }`}
                  >
                    {mode === 'NEAREST' ? 'Nearest' : mode === 'HIGHEST_PRIORITY' ? 'Priority' : 'Reports'}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
              {sortedComplaints.slice(0, 8).map((issue) => {
                const isSelected = selectedComplaint?.id === issue.id;

                return (
                  <div
                    key={issue.id}
                    onClick={() => onSelectIssue(issue)}
                    className={`p-2 border border-[#050505] text-xs cursor-pointer transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-[#DFFF00] font-bold'
                        : 'bg-[#FFFFFF] hover:bg-[#F3F2EC]'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <div className="truncate font-sans font-bold text-xs">{issue.title}</div>
                      <div className="text-[10px] text-[#666666] font-mono mt-0.5 flex gap-1">
                        <span className="font-bold text-[#050505]">
                          {issue.distanceMeters !== undefined ? locationService.formatDistance(issue.distanceMeters) : ''}
                        </span>
                        <span>•</span>
                        <span className="truncate">{issue.location.address}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[8px] font-mono px-1 py-0.5 border border-[#050505] font-black uppercase flex-shrink-0 ${
                        issue.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-[#FFFFFF] text-[#050505]'
                      }`}
                    >
                      {issue.severity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
