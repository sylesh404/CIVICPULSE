import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Layers, 
  MapPin, 
  ArrowUpRight, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { Complaint, Category, Severity } from '../types';

export const ComplaintsDirectoryPage: React.FC = () => {
  const { complaints, setSelectedComplaint, setActiveTab, updateStatus } = useCivic();
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');

  const filtered = complaints.filter((c) => {
    if (filterCategory !== 'ALL' && c.category !== filterCategory) return false;
    if (filterSeverity !== 'ALL' && c.severity !== filterSeverity) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.location.address.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header - Editorial Style */}
        <div className="border-2 border-[#050505] bg-white p-6 shadow-[6px_6px_0px_#050505]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#050505] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
                <span className="bg-[#050505] text-[#DFFF00] px-2 py-0.5 text-xs font-mono font-black uppercase tracking-widest">
                  MUNICIPAL MASTER INCIDENT LOG • DESK 04
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-[#050505] tracking-tight uppercase">
                COMPLAINTS & WORK ORDERS.
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-600 mt-1">
                COMPREHENSIVE AUDIT LOG OF ALL AI-CLASSIFIED CIVIC HAZARDS & WORK ORDERS
              </p>
            </div>

            <div className="text-xs font-mono font-black bg-[#DFFF00] text-[#050505] px-3 py-1.5 border-2 border-[#050505] shadow-[2px_2px_0px_#050505]">
              MATCHES: {filtered.length} INCIDENTS
            </div>
          </div>

          {/* Filter Toolbar (Neo-Brutalist) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-2">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by keyword, #Case ID, or street..."
                className="w-full bg-[#F9F8F3] border-2 border-[#050505] pl-10 pr-4 py-2 text-xs font-mono font-bold text-[#050505] placeholder-slate-400 focus:outline-none focus:bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-white border-2 border-[#050505] px-3 py-2 text-xs font-mono font-bold text-[#050505] outline-none"
              >
                <option value="ALL">ALL CATEGORIES</option>
                <option value="POTHOLE">POTHOLES & ROADS</option>
                <option value="WATER">WATER SUPPLY</option>
                <option value="GARBAGE">SANITATION</option>
                <option value="LIGHTING">STREET LIGHTING</option>
                <option value="DRAINAGE">DRAINAGE</option>
                <option value="PUBLIC_SAFETY">PUBLIC SAFETY</option>
              </select>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="bg-white border-2 border-[#050505] px-3 py-2 text-xs font-mono font-bold text-[#050505] outline-none"
              >
                <option value="ALL">ALL SEVERITIES</option>
                <option value="CRITICAL">CRITICAL ONLY</option>
                <option value="HIGH">HIGH SEVERITY</option>
                <option value="MEDIUM">MEDIUM SEVERITY</option>
                <option value="LOW">LOW SEVERITY</option>
              </select>
            </div>
          </div>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedComplaint(item);
                setActiveTab('map');
              }}
              className="p-4 bg-white border-2 border-[#050505] shadow-[4px_4px_0px_#050505] space-y-3 cursor-pointer hover:bg-[#DFFF00] transition-colors touch-manipulation font-mono"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-black text-[#050505]">#{item.id}</span>
                  <h4 className="font-display font-black text-sm uppercase text-[#050505] mt-0.5 leading-tight">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-600 uppercase block mt-0.5">
                    {item.category} · {item.location.address}
                  </span>
                </div>
                <span className={`px-2 py-0.5 text-[10px] font-black uppercase border border-[#050505] flex-shrink-0 ${
                  item.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-white text-[#050505]'
                }`}>
                  {item.severity}
                </span>
              </div>

              <div className="pt-2 border-t border-[#050505] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">DEPT</span>
                  <span className="font-bold text-[#050505] text-[11px] truncate max-w-[120px] block">{item.department}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">PRIORITY</span>
                  <span className="font-black text-sm text-[#050505]">{item.priorityScore}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">STATUS</span>
                  <span className="font-bold text-[10px] uppercase text-[#050505]">{item.status.replace('_', ' ')}</span>
                </div>
                <span className="px-2.5 py-1 bg-[#050505] text-white text-[10px] font-black uppercase">
                  VIEW →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Editorial Table (Section 25) */}
        <div className="hidden md:block bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505] overflow-x-auto">
          <table className="w-full text-left text-xs font-mono border-collapse">
            <thead>
              <tr className="border-b-2 border-[#050505] bg-[#F9F8F3] text-[11px] uppercase">
                <th className="py-3 px-4 font-black text-[#050505]">CASE</th>
                <th className="py-3 px-4 font-black text-[#050505]">ISSUE</th>
                <th className="py-3 px-4 font-black text-[#050505]">LOCATION</th>
                <th className="py-3 px-4 font-black text-[#050505]">PRIORITY</th>
                <th className="py-3 px-4 font-black text-[#050505]">DEPARTMENT</th>
                <th className="py-3 px-4 font-black text-[#050505]">STATUS</th>
                <th className="py-3 px-4 font-black text-[#050505] text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[#050505] hover:bg-[#DFFF00] transition-colors cursor-pointer group"
                  onClick={() => {
                    setSelectedComplaint(item);
                    setActiveTab('map');
                  }}
                >
                  <td className="py-3 px-4 font-black text-[#050505] whitespace-nowrap">
                    #{item.id}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-black text-[#050505] uppercase block truncate max-w-[200px]">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-slate-600 block uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-700 font-bold truncate max-w-[220px]">
                    {item.location.address}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-black text-sm text-[#050505]">{item.priorityScore}</span>
                    <span className={`ml-2 px-1.5 py-0.5 text-[9px] font-black uppercase border border-[#050505] ${
                      item.severity === 'CRITICAL' ? 'bg-red-600 text-white' : 'bg-white text-[#050505]'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#050505] truncate max-w-[160px]">
                    {item.department}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 text-[10px] font-black uppercase border border-[#050505] ${
                      item.status === 'RESOLVED'
                        ? 'bg-emerald-600 text-white'
                        : item.status === 'IN_PROGRESS'
                        ? 'bg-[#050505] text-white'
                        : 'bg-white text-[#050505]'
                    }`}>
                      {item.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedComplaint(item);
                          setActiveTab('map');
                        }}
                        className="px-2.5 py-1 bg-white hover:bg-[#050505] text-[#050505] hover:text-white border border-[#050505] font-black text-[10px] uppercase transition-colors"
                      >
                        MAP ↗
                      </button>
                      {item.status !== 'RESOLVED' ? (
                        <button
                          onClick={() => updateStatus(item.id, 'RESOLVED')}
                          className="px-2.5 py-1 bg-[#050505] hover:bg-emerald-600 text-white border border-[#050505] font-black text-[10px] uppercase transition-colors"
                        >
                          RESOLVE
                        </button>
                      ) : (
                        <span className="px-2 py-1 bg-white text-emerald-700 border border-[#050505] text-[10px] font-black">
                          DONE
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
