import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Shield, Phone, Mail, Clock, CheckCircle, Users } from 'lucide-react';
import { useCivic } from '../context/CivicContext';

export const DepartmentsPage: React.FC = () => {
  const { departments, setActiveTab } = useCivic();

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-16 sm:pt-24 pb-20 sm:pb-24 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header - Editorial Style */}
        <div className="border-2 border-[#050505] bg-white p-6 shadow-[6px_6px_0px_#050505]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#050505] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
                <span className="bg-[#050505] text-[#DFFF00] px-2 py-0.5 text-xs font-mono font-black uppercase tracking-widest">
                  MUNICIPAL AGENCY ROSTER • FIELD OPERATIONS
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-[#050505] uppercase tracking-tight">
                MUNICIPAL DEPARTMENTS & SLA.
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-600 mt-1">
                RESOURCE ALLOCATIONS • DIVISION CAPACITIES • ESCALATION CHANNELS
              </p>
            </div>

            <div className="px-4 py-2 bg-[#DFFF00] border-2 border-[#050505] text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#050505]">
              AGENCIES ACTIVE: {departments.length}
            </div>
          </div>
        </div>

        {/* Department Tiled Grid (Section 27) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept, index) => {
            const isYellow = index % 3 === 0;
            const isBlack = index % 3 === 1;
            const bgClass = isYellow ? 'bg-[#DFFF00]' : isBlack ? 'bg-[#050505] text-white' : 'bg-white';

            return (
              <div
                key={dept.id}
                className={`p-6 border-2 border-[#050505] shadow-[6px_6px_0px_#050505] space-y-4 flex flex-col justify-between ${bgClass}`}
              >
                <div>
                  <div className="flex items-start justify-between border-b-2 border-[#050505] pb-3">
                    <span className={`text-xs font-mono font-black uppercase ${isBlack ? 'text-[#DFFF00]' : 'text-slate-600'}`}>
                      {dept.code}
                    </span>
                    <span className="px-2 py-0.5 bg-white text-[#050505] border border-[#050505] text-[10px] font-mono font-black uppercase">
                      {dept.workloadPercentage}% LOAD
                    </span>
                  </div>

                  <h3 className="text-xl font-black font-display mt-3 uppercase tracking-tight">{dept.name}</h3>
                  <p className={`text-xs font-mono mt-0.5 ${isBlack ? 'text-slate-300' : 'text-slate-600'}`}>
                    Officer: {dept.headOfficer}
                  </p>

                  {/* Metrics */}
                  <div className="mt-5 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                    <div className="p-2 bg-[#F9F8F3] border border-[#050505] text-[#050505]">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">ACTIVE</span>
                      <span className="text-base font-black mt-0.5 block">{dept.activeCases}</span>
                    </div>
                    <div className="p-2 bg-[#F9F8F3] border border-[#050505] text-[#050505]">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">CRITICAL</span>
                      <span className="text-base font-black text-red-600 mt-0.5 block">{dept.criticalCases}</span>
                    </div>
                    <div className="p-2 bg-[#F9F8F3] border border-[#050505] text-[#050505]">
                      <span className="text-[9px] text-slate-500 block uppercase font-bold">SLA</span>
                      <span className="text-base font-black mt-0.5 block">{dept.slaRate}%</span>
                    </div>
                  </div>

                  {/* SLA Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-[11px] font-mono font-bold mb-1">
                      <span>Crew SLA Adherence</span>
                      <span>Target: 95%</span>
                    </div>
                    <div className="h-2 w-full bg-[#E5E4DC] border border-[#050505] overflow-hidden">
                      <div
                        className="h-full bg-[#050505]"
                        style={{ width: `${dept.slaRate}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className={`pt-4 border-t-2 border-[#050505] flex items-center justify-between text-xs font-mono font-bold ${isBlack ? 'text-slate-300' : 'text-slate-600'}`}>
                  <span>{dept.contactChannel}</span>
                  <span className={isBlack ? 'text-[#DFFF00]' : 'text-[#050505]'}>Avg {dept.avgResolutionTime}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
