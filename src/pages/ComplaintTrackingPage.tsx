import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Layers, 
  Sparkles, 
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { Complaint } from '../types';

export const ComplaintTrackingPage: React.FC = () => {
  const { complaints, selectedComplaint, setSelectedComplaint, setActiveTab } = useCivic();

  // Selected case to track (Defaults to #CP-48291 if none selected)
  const activeCase = selectedComplaint || complaints.find((c) => c.id === 'CP-48291') || complaints[0];

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header - Editorial Style */}
        <div className="border-2 border-[#050505] bg-white p-6 shadow-[6px_6px_0px_#050505]">
          <div className="border-b-2 border-[#050505] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
                <span className="bg-[#050505] text-[#DFFF00] px-2 py-0.5 text-xs font-mono font-black uppercase tracking-widest">
                  AUDIT LIFECYCLE • VERIFIED WORK ORDERS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-[#050505] uppercase tracking-tight">
                COMPLAINT TRACKING.
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-600 mt-1">
                PUBLIC PROOF-OF-WORK AUDIT TRAIL • INTAKE TO FIELD RESOLUTION
              </p>
            </div>

            <button
              onClick={() => setActiveTab('report')}
              className="px-5 py-3 bg-[#DFFF00] hover:bg-[#050505] text-[#050505] hover:text-[#DFFF00] border-2 border-[#050505] font-black text-xs font-mono uppercase tracking-wider shadow-[3px_3px_0px_#050505] active:translate-y-0.5 flex items-center gap-2 self-start md:self-auto transition-all"
            >
              <span>+ REPORT NEW HAZARD ↗</span>
            </button>
          </div>

          {/* HORIZONTAL TIMELINE (Section 20) */}
          <div className="mt-6 pt-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-black text-[#050505] uppercase tracking-widest bg-[#DFFF00] px-2 py-0.5 border border-[#050505]">
                HORIZONTAL LIFECYCLE: CASE #{activeCase.id}
              </span>
              <span className="text-xs font-mono font-bold text-slate-600 uppercase">
                STATUS: {activeCase.status.replace('_', ' ')}
              </span>
            </div>

            {/* Mobile Vertical Compact Timeline (Section 23) */}
            <div className="md:hidden space-y-2 relative pl-4 border-l-2 border-[#050505] ml-2 my-2 font-mono">
              {activeCase.timeline.map((step, idx) => (
                <div key={idx} className="relative py-1.5">
                  <span className={`absolute -left-[23px] top-2.5 w-3.5 h-3.5 border-2 border-[#050505] flex items-center justify-center text-[8px] ${
                    step.completed ? 'bg-[#DFFF00] text-[#050505]' : 'bg-white text-slate-400'
                  }`}>
                    {step.completed ? '●' : '○'}
                  </span>
                  <div className={`p-2.5 border-2 border-[#050505] text-xs ${
                    step.completed ? 'bg-[#050505] text-white shadow-[2px_2px_0px_#050505]' : 'bg-white text-slate-600'
                  }`}>
                    <div className="flex items-center justify-between font-black uppercase">
                      <span>{step.label}</span>
                      <span className="text-[10px] font-normal opacity-80">{step.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Thick Horizontal Timeline Bar */}
            <div className="hidden md:grid grid-cols-5 gap-2 relative">
              {activeCase.timeline.map((step, idx) => {
                return (
                  <div
                    key={idx}
                    className={`p-3 border-2 border-[#050505] relative transition-all ${
                      step.completed
                        ? 'bg-[#050505] text-white shadow-[2px_2px_0px_#050505]'
                        : 'bg-[#F9F8F3] text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs mb-1">
                      <span className="font-bold">0{idx + 1}</span>
                      <span className={`text-sm ${step.completed ? 'text-[#DFFF00]' : 'text-slate-400'}`}>
                        {step.completed ? '●' : '○'}
                      </span>
                    </div>
                    <div className={`text-xs font-black font-mono uppercase ${step.completed ? 'text-white' : 'text-slate-500'}`}>
                      {step.label}
                    </div>
                    <div className="text-[10px] font-mono mt-1 opacity-70">
                      {step.timestamp}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Case Inspection Card */}
          <div className="lg:col-span-7 bg-white border-2 border-[#050505] p-6 sm:p-8 shadow-[6px_6px_0px_#050505] space-y-6">
            {/* Top Badge & Case ID */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#050505] pb-4">
              <div>
                <span className="text-xs font-mono font-black bg-[#DFFF00] text-[#050505] px-2 py-0.5 border border-[#050505] uppercase">
                  CASE #{activeCase.id}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-display text-[#050505] mt-2 uppercase tracking-tight">
                  {activeCase.title}
                </h2>
              </div>
              <span
                className={`text-xs font-mono px-3 py-1 font-black uppercase border-2 border-[#050505] ${
                  activeCase.severity === 'CRITICAL'
                    ? 'bg-red-600 text-white'
                    : 'bg-[#DFFF00] text-[#050505]'
                }`}
              >
                {activeCase.severity} SEVERITY
              </span>
            </div>

            {/* Geolocation & Department info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="p-3 bg-[#F9F8F3] border border-[#050505]">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">LOCATION</span>
                <span className="font-bold text-[#050505] block truncate mt-0.5">{activeCase.location.address}</span>
              </div>
              <div className="p-3 bg-[#F9F8F3] border border-[#050505]">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">DEPARTMENT</span>
                <span className="font-bold text-[#050505] block truncate mt-0.5">{activeCase.department}</span>
              </div>
              <div className="p-3 bg-[#F9F8F3] border border-[#050505]">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">CITIZEN BACKING</span>
                <span className="font-black text-[#050505] block mt-0.5">{activeCase.reportsCount} Endorsements</span>
              </div>
            </div>

            {/* Photographic Image if available */}
            {activeCase.imageUrl && (
              <div className="relative border-2 border-[#050505] max-h-60 overflow-hidden shadow-[4px_4px_0px_#050505]">
                <img
                  src={activeCase.imageUrl}
                  alt={activeCase.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-3 py-1 bg-[#050505] text-[#DFFF00] text-[10px] font-mono font-bold uppercase border border-white">
                  GEOTAGGED PHOTOGRAPHIC EVIDENCE VERIFIED
                </div>
              </div>
            )}

            {/* Detailed Stage Description Log */}
            <div className="p-4 bg-[#F9F8F3] border-2 border-[#050505] space-y-2">
              <span className="text-xs font-mono font-black uppercase text-[#050505] block border-b border-[#050505] pb-2">
                WORK ORDER VERIFICATION LOG:
              </span>
              {activeCase.timeline.map((step, idx) => (
                <div key={idx} className="flex items-start justify-between text-xs font-mono pt-1">
                  <div>
                    <span className="font-bold text-[#050505] uppercase">{step.label}: </span>
                    <span className="text-slate-600">{step.description}</span>
                  </div>
                  <span className="font-bold text-[#050505] flex-shrink-0 ml-3">
                    {step.completed ? '[VERIFIED]' : '[PENDING]'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Directory of User Complaints */}
          <div className="lg:col-span-5 bg-white border-2 border-[#050505] p-6 shadow-[6px_6px_0px_#050505] space-y-4">
            <div className="flex items-center justify-between border-b-2 border-[#050505] pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#050505]" />
                <h3 className="text-base font-black font-display text-[#050505] uppercase">
                  ACTIVE CASE DIRECTORY
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-600">
                {complaints.length} REGISTERED
              </span>
            </div>

            <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
              {complaints.slice(0, 10).map((c) => {
                const isSelected = activeCase.id === c.id;

                return (
                  <div
                    key={c.id}
                    onClick={() => setSelectedComplaint(c)}
                    className={`p-4 border-2 border-[#050505] cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#DFFF00] shadow-[4px_4px_0px_#050505]'
                        : 'bg-[#F9F8F3] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="font-black text-[#050505]">#{c.id}</span>
                      <span
                        className={`text-[9px] px-2 py-0.5 border border-[#050505] font-black uppercase ${
                          c.status === 'RESOLVED'
                            ? 'bg-emerald-600 text-white'
                            : c.status === 'IN_PROGRESS'
                            ? 'bg-[#050505] text-white'
                            : 'bg-white text-[#050505]'
                        }`}
                      >
                        {c.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-[#050505] line-clamp-1 uppercase">{c.title}</h4>
                    <p className="text-xs text-slate-600 flex items-center gap-1 mt-1 font-mono">
                      <MapPin className="w-3 h-3 text-[#050505] flex-shrink-0" />
                      <span className="truncate">{c.location.address}</span>
                    </p>

                    <div className="mt-3 pt-2 border-t border-[#050505] flex items-center justify-between text-[11px] font-mono text-slate-600">
                      <span>{c.reportsCount} Endorsements</span>
                      <span className="font-black text-[#050505] flex items-center gap-1">
                        <span>INSPECT →</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
