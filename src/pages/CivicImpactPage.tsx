import React from 'react';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Award, 
  CheckCircle2, 
  Shield, 
  Zap, 
  Eye, 
  Flame, 
  Users, 
  Clock, 
  Sparkles,
  Trophy,
  ArrowUpRight
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { LEADERBOARD } from '../data/mockData';

export const CivicImpactPage: React.FC = () => {
  const { stats, user } = useCivic();

  const badgeIcons: Record<string, React.ReactNode> = {
    Eye: <Eye className="w-5 h-5 text-[#050505]" />,
    Shield: <Shield className="w-5 h-5 text-[#050505]" />,
    Zap: <Zap className="w-5 h-5 text-[#050505]" />,
    Award: <Award className="w-5 h-5 text-[#050505]" />,
  };

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-24 pb-24 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header - Editorial Poster Header */}
        <div className="border-2 border-[#050505] bg-white p-6 shadow-[6px_6px_0px_#050505]">
          <div className="border-b-2 border-[#050505] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
                <span className="bg-[#050505] text-[#DFFF00] px-2 py-0.5 text-xs font-mono font-black uppercase tracking-widest">
                  COMMUNITY IMPACT METRICS • CITY INDEX
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-black font-display text-[#050505] tracking-tight uppercase">
                CIVIC IMPACT & HEALTH.
              </h1>
              <p className="text-xs sm:text-sm font-mono text-slate-600 mt-1">
                MEASURING INFRASTRUCTURE UPTIME, CITIZEN PARTICIPATION & RESOLUTION VELOCITY
              </p>
            </div>

            <div className="px-4 py-2 bg-[#DFFF00] border-2 border-[#050505] text-xs font-mono font-black uppercase shadow-[2px_2px_0px_#050505]">
              METRICS AUDITED: REAL-TIME
            </div>
          </div>

          {/* OVERSIZED EDITORIAL NUMBERS (Section 21) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 pt-2">
            <div className="border-b-2 sm:border-b-0 sm:border-r-2 border-[#050505] pb-3 sm:pb-0 pr-2 sm:pr-4">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#050505] tracking-tight">
                {stats.totalReports.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-black text-slate-600 uppercase tracking-widest mt-1">
                PROBLEMS REPORTED
              </div>
            </div>

            <div className="border-b-2 sm:border-b-0 sm:border-r-2 border-[#050505] pb-3 sm:pb-0 pr-2 sm:pr-4">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#050505] tracking-tight">
                {stats.resolvedReports.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-black text-slate-600 uppercase tracking-widest mt-1">
                PROBLEMS RESOLVED
              </div>
            </div>

            <div className="border-b-2 sm:border-b-0 sm:border-r-2 border-[#050505] pb-3 sm:pb-0 pr-2 sm:pr-4">
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#050505] tracking-tight">
                {stats.citizensHelped.toLocaleString()}
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-black text-slate-600 uppercase tracking-widest mt-1">
                CITIZENS HELPED
              </div>
            </div>

            <div>
              <div className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#050505] tracking-tight">
                {stats.avgResolutionHours} H
              </div>
              <div className="text-[10px] sm:text-xs font-mono font-black text-slate-600 uppercase tracking-widest mt-1">
                AVERAGE RESOLUTION
              </div>
            </div>
          </div>
        </div>

        {/* CITY HEALTH SCORE & IMPACT MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* City Health Score Block */}
          <div className="lg:col-span-4 p-8 bg-[#DFFF00] border-2 border-[#050505] shadow-[6px_6px_0px_#050505] flex flex-col items-center justify-center text-center">
            <span className="text-xs font-mono font-black tracking-widest bg-[#050505] text-white px-2 py-0.5 uppercase mb-4">
              URBAN VITALITY INDEX
            </span>

            <div className="my-4">
              <span className="text-7xl font-black text-[#050505] font-display tracking-tight">
                {stats.cityHealthScore}
              </span>
              <span className="text-base font-mono font-black text-[#050505] block mt-1">
                / 100 HEALTH INDEX
              </span>
            </div>

            <h3 className="text-xl font-black text-[#050505] font-display uppercase mt-2">
              CITY HEALTH SCORE
            </h3>
            <p className="text-xs font-mono text-[#050505] mt-2 max-w-xs leading-relaxed font-bold">
              Derived from rapid pothole patching velocity, high-voltage line containment, and storm drainage uptime.
            </p>
          </div>

          {/* Citizen Profile & Earned Badges */}
          <div className="lg:col-span-8 bg-white border-2 border-[#050505] p-6 sm:p-8 shadow-[6px_6px_0px_#050505] space-y-6">
            <div className="flex items-center justify-between border-b-2 border-[#050505] pb-4">
              <div className="flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 object-cover border-2 border-[#050505] shadow-[3px_3px_0px_#050505]"
                />
                <div>
                  <h3 className="text-2xl font-black text-[#050505] font-display uppercase">{user.name}</h3>
                  <p className="text-xs text-slate-600 font-mono font-bold">{user.email}</p>
                </div>
              </div>

              <div className="text-right font-mono">
                <span className="text-[10px] text-slate-500 uppercase font-black block">CIVIC MERIT SCORE</span>
                <span className="text-4xl font-black text-[#050505]">{user.civicScore} PTS</span>
              </div>
            </div>

            {/* Badges Grid */}
            <div>
              <span className="text-xs font-mono font-black tracking-widest text-[#050505] uppercase block mb-3">
                CIVIC MERIT BADGES UNLOCKED
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user.badges.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 bg-[#F9F8F3] border-2 border-[#050505] flex items-start gap-3 shadow-[2px_2px_0px_#050505]"
                  >
                    <div className="p-2 bg-white border border-[#050505] flex-shrink-0">
                      {badgeIcons[badge.icon] || <Award className="w-5 h-5 text-[#050505]" />}
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-[#050505] uppercase font-display">{badge.name}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 font-mono">{badge.description}</p>
                      <span className="text-[10px] font-mono font-bold text-slate-500 mt-2 block uppercase">
                        Unlocked {badge.unlockedAt}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Civic Contributors Leaderboard */}
        <div className="bg-white border-2 border-[#050505] p-6 sm:p-8 shadow-[6px_6px_0px_#050505]">
          <div className="flex items-center justify-between border-b-2 border-[#050505] pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-[#050505]" />
              <h3 className="text-2xl font-black font-display text-[#050505] uppercase">
                TOP CIVIC CONTRIBUTORS — METRO LEADERBOARD
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-600 uppercase">
              BENGALURU CENTRAL DISTRICT
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b-2 border-[#050505] bg-[#F9F8F3] text-[11px] uppercase">
                  <th className="py-2.5 px-3 font-black text-[#050505]">RANK</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">CITIZEN</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">WARD / LOCALITY</th>
                  <th className="py-2.5 px-3 font-black text-[#050505]">VERIFIED INCIDENTS</th>
                  <th className="py-2.5 px-3 font-black text-[#050505] text-right">COMMUNITY POINTS</th>
                </tr>
              </thead>
              <tbody>
                {LEADERBOARD.map((item) => (
                  <tr
                    key={item.rank}
                    className="border-b border-[#050505] hover:bg-[#DFFF00] transition-colors"
                  >
                    <td className="py-3 px-3 font-black text-sm text-[#050505]">#{item.rank}</td>
                    <td className="py-3 px-3 font-bold text-[#050505] uppercase flex items-center gap-2">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-6 h-6 border border-[#050505] object-cover"
                      />
                      <span>{item.name}</span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 font-medium uppercase">{item.area}</td>
                    <td className="py-3 px-3 font-bold text-[#050505]">{item.verified} verified</td>
                    <td className="py-3 px-3 text-right font-black text-sm text-[#050505]">{item.score} PTS</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
