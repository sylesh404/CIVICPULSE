import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  RadialBarChart, 
  RadialBar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { BarChart3, TrendingUp, PieChart as PieIcon, Activity, Clock, ShieldCheck } from 'lucide-react';
import { TIME_SERIES_ANALYTICS, CATEGORY_DISTRIBUTION, SEVERITY_DISTRIBUTION } from '../data/mockData';
import { useCivic } from '../context/CivicContext';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 bg-white border-2 border-[#050505] shadow-[4px_4px_0px_#050505] text-xs font-mono">
        <p className="font-black text-[#050505] mb-1 uppercase">{label}</p>
        {payload.map((item: any, index: number) => (
          <p key={index} className="flex justify-between gap-4 font-bold text-[#050505]">
            <span className="uppercase">{item.name}:</span>
            <span>{item.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const AnalyticsPage: React.FC = () => {
  const { stats, departments } = useCivic();

  const deptWorkloadData = departments.map((d) => ({
    name: d.name.replace(' & ', ' '),
    workload: d.workloadPercentage,
    active: d.activeCases,
    critical: d.criticalCases,
  }));

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-16 sm:pt-24 pb-20 sm:pb-24 px-3 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Header - Editorial Poster Header */}
        <div className="border-2 border-[#050505] bg-white p-6 shadow-[6px_6px_0px_#050505]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b-2 border-[#050505] pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
                <span className="bg-[#050505] text-[#DFFF00] px-2 py-0.5 text-xs font-mono font-black uppercase tracking-widest">
                  EDITORIAL DATA VISUALIZATION • DESK 07
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-[#050505] tracking-tight uppercase">
                CITY METRICS & RESOLUTION.
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-600 mt-1">
                SYSTEM TELEMETRY • PREDICTIVE BACKLOG DISTRIBUTION • DEPARTMENTAL SLA VELOCITY
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-[#F9F8F3] border-2 border-[#050505] text-xs font-mono font-bold">
                WINDOW: <span className="bg-[#DFFF00] px-1 text-[#050505]">LAST 7 DAYS</span>
              </div>
            </div>
          </div>

          {/* Top 3 Analytical Metric Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
            <div className="p-4 border-2 border-[#050505] bg-[#F9F8F3] shadow-[3px_3px_0px_#050505]">
              <div className="flex items-center justify-between text-xs font-mono font-black uppercase text-slate-600">
                <span>RESOLUTION VELOCITY</span>
                <Activity className="w-4 h-4 text-[#050505]" />
              </div>
              <div className="mt-2 text-4xl font-black text-[#050505] font-display">
                {stats.avgResolutionHours}H
              </div>
              <p className="mt-1 text-xs font-mono text-slate-600">
                Median time from citizen intake to verified field signoff
              </p>
            </div>

            <div className="p-4 border-2 border-[#050505] bg-[#DFFF00] shadow-[3px_3px_0px_#050505]">
              <div className="flex items-center justify-between text-xs font-mono font-black uppercase text-[#050505]">
                <span>AI TRIAGE ACCURACY</span>
                <ShieldCheck className="w-4 h-4 text-[#050505]" />
              </div>
              <div className="mt-2 text-4xl font-black text-[#050505] font-display">
                {stats.aiAccuracy}%
              </div>
              <p className="mt-1 text-xs font-mono text-[#050505]">
                Zero manual re-routing across 12,000+ incident classifications
              </p>
            </div>

            <div className="p-4 border-2 border-[#050505] bg-[#050505] text-white shadow-[3px_3px_0px_#050505]">
              <div className="flex items-center justify-between text-xs font-mono font-black uppercase text-slate-400">
                <span>OVERALL RESOLUTION RATE</span>
                <TrendingUp className="w-4 h-4 text-[#DFFF00]" />
              </div>
              <div className="mt-2 text-4xl font-black text-[#DFFF00] font-display">
                89.4%
              </div>
              <p className="mt-1 text-xs font-mono text-slate-300">
                8,920 cases closed strictly within municipal SLA targets
              </p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Complaints & Resolutions Over Time */}
          <div className="lg:col-span-8 p-6 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#050505] pb-4 mb-6">
              <div>
                <h3 className="text-xl font-black font-display text-[#050505] uppercase">
                  COMPLAINT INTAKE VS. RESOLUTIONS
                </h3>
                <p className="text-xs font-mono text-slate-600">
                  Daily incoming citizens filings vs. rapid municipal work tickets closed
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono font-black uppercase">
                <span className="flex items-center gap-1.5 bg-[#050505] text-white px-2 py-0.5">
                  <span className="w-2 h-2 bg-white" /> REPORTED
                </span>
                <span className="flex items-center gap-1.5 bg-[#DFFF00] text-[#050505] border border-[#050505] px-2 py-0.5">
                  <span className="w-2 h-2 bg-[#050505]" /> RESOLVED
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TIME_SERIES_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="#E5E4DC" vertical={false} />
                  <XAxis dataKey="day" stroke="#050505" tick={{ fill: '#050505', fontSize: 11, fontWeight: 'bold' }} />
                  <YAxis stroke="#050505" tick={{ fill: '#050505', fontSize: 11, fontWeight: 'bold' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="reported" stroke="#050505" strokeWidth={2.5} fill="#D0CEBF" fillOpacity={0.6} name="Reported" />
                  <Area type="monotone" dataKey="resolved" stroke="#050505" strokeWidth={2.5} fill="#DFFF00" fillOpacity={0.9} name="Resolved" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Issue Severity Distribution (Donut Chart) */}
          <div className="lg:col-span-4 p-6 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505] flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black font-display text-[#050505] uppercase border-b-2 border-[#050505] pb-2">
                SEVERITY MATRIX
              </h3>
              <p className="text-xs font-mono text-slate-600 mt-2">
                PROPORTION OF CRITICAL DANGER VS. ROUTINE CITY ISSUES
              </p>
            </div>

            <div className="h-56 w-full flex items-center justify-center relative my-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SEVERITY_DISTRIBUTION}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="#050505"
                    strokeWidth={2}
                  >
                    <Cell fill="#ef4444" />
                    <Cell fill="#050505" />
                    <Cell fill="#DFFF00" />
                    <Cell fill="#B9B9B2" />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute text-center pointer-events-none">
                <span className="text-2xl font-black text-[#050505] font-display">2,140</span>
                <span className="block text-[10px] font-mono font-bold text-slate-600 uppercase">ACTIVE CASES</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t-2 border-[#050505]">
              {SEVERITY_DISTRIBUTION.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-2 border border-[#050505] bg-[#F9F8F3]">
                  <span className="font-bold text-[#050505] text-[10px] uppercase truncate">
                    {item.name}
                  </span>
                  <span className="font-black text-[#050505]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 3: Department Workload & Backlog (Bar Chart) */}
          <div className="lg:col-span-7 p-6 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505]">
            <div className="border-b-2 border-[#050505] pb-3 mb-6">
              <h3 className="text-xl font-black font-display text-[#050505] uppercase">
                DEPARTMENT WORKLOAD & QUEUE CAPACITY
              </h3>
              <p className="text-xs font-mono text-slate-600">
                CREW UTILIZATION RATIOS BY MUNICIPAL OPERATIONAL DIVISION
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={deptWorkloadData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                  <CartesianGrid stroke="#E5E4DC" vertical={false} />
                  <XAxis dataKey="name" stroke="#050505" tick={{ fill: '#050505', fontSize: 10, fontWeight: 'bold' }} angle={-15} textAnchor="end" />
                  <YAxis stroke="#050505" tick={{ fill: '#050505', fontSize: 11, fontWeight: 'bold' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="workload" fill="#050505" stroke="#050505" strokeWidth={1} name="Workload %" />
                  <Bar dataKey="critical" fill="#DFFF00" stroke="#050505" strokeWidth={1} name="Critical Cases" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Category Distribution Breakdown */}
          <div className="lg:col-span-5 p-6 bg-white border-2 border-[#050505] shadow-[6px_6px_0px_#050505]">
            <h3 className="text-xl font-black font-display text-[#050505] uppercase border-b-2 border-[#050505] pb-2 mb-1">
              ISSUE CATEGORY BREAKDOWN
            </h3>
            <p className="text-xs font-mono text-slate-600 mb-4">
              HISTORICAL REPORTING CONCENTRATION BY URBAN INFRASTRUCTURE SYSTEM
            </p>

            <div className="space-y-3 font-mono">
              {CATEGORY_DISTRIBUTION.map((cat, i) => (
                <div key={i} className="p-2 bg-[#F9F8F3] border border-[#050505]">
                  <div className="flex justify-between text-xs mb-1 font-bold">
                    <span className="text-[#050505] uppercase">{cat.name}</span>
                    <span className="text-[#050505] font-black">{cat.count.toLocaleString()} ({cat.value}%)</span>
                  </div>
                  <div className="h-2 w-full bg-[#E5E4DC] border border-[#050505] overflow-hidden">
                    <div
                      className="h-full bg-[#050505]"
                      style={{ width: `${cat.value * 2}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
