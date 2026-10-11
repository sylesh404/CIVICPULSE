import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Building2, 
  Cpu, 
  Radio, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Flame, 
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Layers,
  Zap,
  Users
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { Complaint, DepartmentInfo } from '../types';
import { MiniCityMap } from '../components/map/MiniCityMap';

export const CommandCenterPage: React.FC = () => {
  const { stats, complaints, departments, setSelectedComplaint, setActiveTab, demoMode, latestLiveEvent } = useCivic();
  const [selectedDept, setSelectedDept] = useState<DepartmentInfo | null>(departments[0]);
  const [expandedPriority, setExpandedPriority] = useState(false);

  // Focus complaint for Priority Engine showcase
  const focusCase = complaints.find((c) => c.id === 'CP-48291') || complaints[0];

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header - Editorial City Control */}
        <div className="border-2 border-[#050505] bg-white p-6 shadow-[6px_6px_0px_#050505]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#050505] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
                <span className="bg-[#050505] text-[#DFFF00] px-2 py-0.5 text-xs font-mono font-black uppercase tracking-widest">
                  CIVICPULSE CITY CONTROL • PROTOCOL V4.2
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-[#050505] tracking-tight uppercase">
                CITY OPERATIONS LIVE.
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-600 mt-1">
                AUTONOMOUS MUNICIPAL TRIAGE & DISPATCH COMMAND • REAL-TIME CITY INTELLIGENCE
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-[#F9F8F3] border-2 border-[#050505] flex items-center gap-2 text-xs font-mono font-bold">
                <span className="w-2 h-2 bg-emerald-600 border border-black" />
                <span>GRID HEALTH: 87 / 100</span>
              </div>
              <button
                onClick={() => setActiveTab('map')}
                className="px-4 py-2 bg-[#DFFF00] hover:bg-[#050505] text-[#050505] hover:text-[#DFFF00] border-2 border-[#050505] font-black text-xs font-mono tracking-wider uppercase shadow-[3px_3px_0px_#050505] active:translate-y-0.5 flex items-center gap-1.5 transition-all"
              >
                <MapPin className="w-4 h-4" />
                <span>OPEN FULL MAP ↗</span>
              </button>
            </div>
          </div>

          {/* Top KPI Blocks (Section 24 & 25) */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
            {[
              { label: 'TOTAL REPORTS', value: stats.totalReports.toLocaleString(), subtitle: 'All wards', bg: 'bg-white', text: 'text-[#050505]', span: '' },
              { label: 'ACTIVE QUEUE', value: stats.activeReports.toLocaleString(), subtitle: 'Assigned to field', bg: 'bg-white', text: 'text-[#050505]', span: '' },
              { label: 'CRITICAL', value: stats.criticalReports.toLocaleString(), subtitle: 'Urgent intervention', bg: 'bg-[#050505]', text: 'text-[#DFFF00]', span: '' },
              { label: 'RESOLVED', value: stats.resolvedReports.toLocaleString(), subtitle: '89.4% SLA adherence', bg: 'bg-white', text: 'text-[#050505]', span: '' },
              { label: 'CITY HEALTH', value: '87 / 100', subtitle: 'Normal baseline index', bg: 'bg-[#DFFF00]', text: 'text-[#050505]', span: 'col-span-2 md:col-span-1' },
            ].map((kpi, index) => (
              <div
                key={index}
                className={`p-3.5 sm:p-4 border-2 border-[#050505] ${kpi.bg} shadow-[3px_3px_0px_#050505] ${kpi.span}`}
              >
                <span className={`text-[10px] font-mono font-black uppercase tracking-wider block ${kpi.bg === 'bg-[#050505]' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {kpi.label}
                </span>
                <div className={`mt-1 text-2xl sm:text-3xl font-black font-display tracking-tight ${kpi.text}`}>
                  {kpi.value}
                </div>
                <span className={`mt-1 text-[10px] sm:text-[11px] font-mono block truncate ${kpi.bg === 'bg-[#050505]' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {kpi.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid: Interactive Map Intelligence (60%) + Smart Priority Engine (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Large Map Overlay (7 cols) */}
          <div className="lg:col-span-7 bg-white border-2 border-[#050505] p-5 shadow-[6px_6px_0px_#050505]">
            <div className="flex items-center justify-between border-b-2 border-[#050505] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-[#050505]" />
                <h3 className="text-xs font-mono font-black tracking-wider text-[#050505] uppercase">
                  SPATIAL INCIDENT TELEMETRY
                </h3>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold">
                <span className="px-2 py-0.5 bg-[#DFFF00] text-[#050505] border border-[#050505]">
                  LIVE SENSOR STREAM
                </span>
              </div>
            </div>

            {/* Real Interactive Incident Telemetry Map */}
            <div className="relative h-[420px] bg-[#EAE8DD] border-2 border-[#050505] overflow-hidden">
              <MiniCityMap className="h-full" />

              {/* Bottom Live Activity Feed Overlay */}
              <div className="absolute bottom-3 inset-x-3 p-3 bg-white border-2 border-[#050505] flex items-center justify-between text-xs font-mono shadow-[2px_2px_0px_#050505] z-10">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 bg-[#DFFF00] border border-black flex-shrink-0" />
                  <span className="font-bold text-[#050505] truncate">
                    {latestLiveEvent || 'Autonomous dispatch active: 8 Rapid Response vehicles in field'}
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('map')}
                  className="text-[#050505] hover:bg-[#DFFF00] px-2 py-1 border border-[#050505] flex items-center gap-1 font-bold flex-shrink-0 ml-2 transition-colors"
                >
                  <span>FULL MAP ↗</span>
                </button>
              </div>
            </div>
          </div>

          {/* SMART PRIORITY ENGINE (5 cols) */}
          <div className="lg:col-span-5 bg-white border-2 border-[#050505] p-6 shadow-[6px_6px_0px_#050505] space-y-5">
            <div className="flex items-center justify-between border-b-2 border-[#050505] pb-3">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#050505]" />
                <h3 className="text-base font-black font-display text-[#050505] tracking-wide uppercase">
                  SMART PRIORITY ENGINE
                </h3>
              </div>
              <span className="text-xs font-mono font-black bg-[#DFFF00] text-[#050505] px-2 py-0.5 border border-[#050505]">
                FORMULA V3.1
              </span>
            </div>

            {/* Formula Pill Banner */}
            <div className="p-3 bg-[#F9F8F3] border-2 border-[#050505] text-[11px] font-mono text-[#050505] leading-relaxed">
              <span className="font-black block mb-1 uppercase">PRIORITY DETERMINATION FORMULA:</span>
              Priority = Severity × Public Impact × Frequency × Location Risk × Time
            </div>

            {/* Visual Priority Score Box */}
            <div className="p-5 bg-[#050505] text-white border-2 border-[#050505] flex items-center justify-between shadow-[4px_4px_0px_#050505]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#DFFF00] uppercase block">PRIORITY SCORE</span>
                <div className="text-4xl font-black font-display text-[#DFFF00] mt-0.5">
                  92 <span className="text-sm text-slate-300 font-normal">/ 100</span>
                </div>
                <div className="inline-block mt-2 px-2 py-0.5 bg-red-600 text-white text-[10px] font-mono font-black uppercase tracking-wider border border-white">
                  CRITICAL INTERVENTION
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-400 block uppercase">DISPATCH SLA</span>
                <span className="text-xl font-black text-white">&lt; 12 HOURS</span>
                <span className="text-[10px] text-[#DFFF00] block mt-1">RAPID SQUAD 4</span>
              </div>
            </div>

            {/* Expandable Formula Weights Breakdown */}
            <div className="border-2 border-[#050505] bg-[#F9F8F3]">
              <button
                onClick={() => setExpandedPriority(!expandedPriority)}
                className="w-full p-3 flex items-center justify-between text-xs font-mono font-black uppercase text-[#050505] hover:bg-[#DFFF00] transition-colors"
              >
                <span>SCORE CALCULATION WEIGHTS</span>
                {expandedPriority ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence>
                {expandedPriority && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="p-3 space-y-2.5 text-xs border-t-2 border-[#050505] bg-white font-mono"
                  >
                    {[
                      { factor: 'Base Severity (Depth & Fracture)', weight: '25 / 25', bar: 100 },
                      { factor: 'Public Impact (Major Arterial)', weight: '24 / 25', bar: 96 },
                      { factor: 'Complaint Frequency (37 Endorsements)', weight: '22 / 25', bar: 88 },
                      { factor: 'Location Risk (3 Schools, 2 Hospitals)', weight: '12 / 15', bar: 80 },
                      { factor: 'Time Unresolved (Peak Rush Approaching)', weight: '9 / 10', bar: 90 },
                    ].map((row, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-[11px] mb-1 font-bold">
                          <span className="text-slate-600">{row.factor}</span>
                          <span className="text-[#050505]">{row.weight}</span>
                        </div>
                        <div className="h-2 w-full bg-[#E5E4DC] border border-[#050505] overflow-hidden">
                          <div
                            className="h-full bg-[#050505]"
                            style={{ width: `${row.bar}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* AI TRIAGE SECTION (Section 26) */}
        <div className="bg-white border-2 border-[#050505] p-6 shadow-[6px_6px_0px_#050505]">
          <div className="flex items-center justify-between border-b-2 border-[#050505] pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#DFFF00] border border-[#050505]" />
                <h3 className="text-xl font-black font-display text-[#050505] uppercase">
                  AI TRIAGE — 37 CASES NEED REVIEW
                </h3>
              </div>
              <p className="text-xs font-mono text-slate-600 mt-0.5">
                AUTOMATED SEVERITY SYNTHESIS • CONFIDENCE RATINGS • RAPID ACTION DISPATCH
              </p>
            </div>
            <button
              onClick={() => setActiveTab('complaints')}
              className="px-3 py-1.5 bg-white hover:bg-[#DFFF00] border-2 border-[#050505] text-xs font-mono font-bold uppercase transition-colors"
            >
              VIEW ALL CASES ↗
            </button>
          </div>

          {/* Mobile View: Compact Complaint Rows (Section 27) */}
          <div className="md:hidden space-y-3">
            {complaints.slice(0, 5).map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedComplaint(c);
                  setActiveTab('map');
                }}
                className="p-3.5 border-2 border-[#050505] bg-[#F9F8F3] hover:bg-[#DFFF00] transition-colors cursor-pointer shadow-[3px_3px_0px_#050505] touch-manipulation"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono text-xs font-black text-[#050505]">#{c.id}</span>
                    <h4 className="font-display font-black text-sm uppercase text-[#050505] mt-0.5 leading-tight">
                      {c.category} · {c.location.address}
                    </h4>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] font-mono font-black uppercase border border-[#050505] flex-shrink-0 ${
                    c.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-white text-[#050505]'
                  }`}>
                    {c.severity}
                  </span>
                </div>

                <div className="mt-2.5 pt-2 border-t border-[#050505] flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">STATUS</span>
                    <span className="font-bold text-[#050505] text-[11px]">{c.status.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase block font-bold">PRIORITY</span>
                    <span className="font-black text-sm text-[#050505]">{c.priorityScore}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#050505] text-white text-[10px] font-black uppercase">
                    VIEW →
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b-2 border-[#050505] bg-[#F9F8F3] text-[11px] uppercase">
                  <th className="py-2.5 px-3 font-black text-[#050505]">CASE ID</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">ISSUE</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">LOCATION</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">CONFIDENCE</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">SEVERITY</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">DEPT</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">PRIORITY</th>
                  <th className="py-2.5 px-3 font-black text-[#050505] text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {complaints.slice(0, 5).map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[#050505] hover:bg-[#DFFF00] transition-colors group cursor-pointer"
                    onClick={() => {
                      setSelectedComplaint(c);
                      setActiveTab('map');
                    }}
                  >
                    <td className="py-3 px-3 font-black text-[#050505]">{c.id}</td>
                    <td className="py-3 px-3 font-bold text-[#050505] uppercase">{c.category}</td>
                    <td className="py-3 px-3 text-slate-700 font-medium truncate max-w-[180px]">{c.location.address}</td>
                    <td className="py-3 px-3 font-black text-[#050505]">
                      {Math.round((c.confidence || 0.94) * 100)}%
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase border border-[#050505] ${
                        c.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-white text-[#050505]'
                      }`}>
                        {c.severity}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-[#050505] truncate max-w-[140px]">{c.department}</td>
                    <td className="py-3 px-3 font-black text-sm">{c.priorityScore}</td>
                    <td className="py-3 px-3 text-right">
                      <span className="inline-block px-3 py-1 bg-[#050505] group-hover:bg-white text-white group-hover:text-[#050505] border border-[#050505] font-black text-[10px] tracking-wider uppercase transition-colors">
                        ACTION →
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* DEPARTMENT GRID (Section 27) */}
        <div>
          <div className="border-b-2 border-[#050505] pb-3 mb-4">
            <h3 className="text-2xl font-black font-display text-[#050505] uppercase">
              DEPARTMENT CAPACITY & WORKLOAD.
            </h3>
            <p className="text-xs font-mono text-slate-600">
              FIELD RESOURCE UTILIZATION • SLA PERFORMANCE • SQUAD DISPATCH
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept, index) => {
              const isSelected = selectedDept?.id === dept.id;
              // Alternate background styling: off-white, black, acid-yellow, white
              const bgStyle = index === 0 ? 'bg-[#DFFF00]' : index === 1 ? 'bg-[#050505] text-white' : index === 2 ? 'bg-white' : 'bg-[#EAE8DD]';

              return (
                <div
                  key={dept.id}
                  onClick={() => setSelectedDept(dept)}
                  className={`p-5 border-2 border-[#050505] shadow-[4px_4px_0px_#050505] cursor-pointer transition-all ${bgStyle}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`text-[10px] font-mono font-black uppercase block ${dept.id === 'dept-san' ? 'text-[#DFFF00]' : 'text-slate-600'}`}>
                        {dept.code}
                      </span>
                      <h4 className="text-lg font-black font-display mt-0.5 uppercase tracking-tight">{dept.name}</h4>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t-2 border-[#050505]">
                    <div className="text-3xl font-black font-mono">
                      {dept.activeCases} <span className="text-xs font-normal">ACTIVE</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono font-bold mt-2">
                      <span>CRITICAL: {dept.criticalCases}</span>
                      <span>SLA: {dept.slaRate}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
