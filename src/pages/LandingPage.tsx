import React from 'react';
import { 
  ArrowUpRight, 
  ArrowRight, 
  MapPin, 
  Check, 
  Layers, 
  Shield, 
  AlertTriangle,
  Flame
} from 'lucide-react';
import { useCivic } from '../context/CivicContext';
import { HeroCityCanvas } from '../components/landing/HeroCityCanvas';

export const LandingPage: React.FC = () => {
  const { setActiveTab, stats, setRole, complaints, setSelectedComplaint } = useCivic();

  const handleReportCTA = () => {
    setActiveTab('report');
  };

  const handleExploreMapCTA = () => {
    setActiveTab('map');
  };

  const handleInspectCase = () => {
    const flagship = complaints.find((c) => c.id === 'CP-48291');
    if (flagship) setSelectedComplaint(flagship);
    setActiveTab('map');
  };

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] pt-14 sm:pt-16 pb-20">
      {/* 1. HERO SECTION (Section 9) */}
      <section className="border-b-2 border-[#050505] bg-[#F3F2EC]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-12">
          {/* Eyebrow Label */}
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#050505]">
              CIVIC INTELLIGENCE OPERATING SYSTEM • v2.4
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left: Oversized multi-line Headline with clamp() (Section 6) */}
            <div className="lg:col-span-8">
              <h1 className="font-display font-black text-[clamp(36px,10vw,92px)] leading-[0.92] text-[#050505] uppercase tracking-tight break-normal overflow-wrap-normal">
                AI THAT<br />
                PRIORITIZES<br />
                CITY PROBLEMS.
              </h1>
            </div>

            {/* Right: Confident Subcopy & Buttons */}
            <div className="lg:col-span-4 space-y-6 pb-2">
              <p className="font-sans text-base sm:text-lg text-[#222222] leading-snug font-medium">
                Report what matters. CivicPulse understands the problem, prioritizes it, and gets it moving.
              </p>

              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 pt-2">
                <button
                  onClick={handleReportCTA}
                  className="w-full sm:w-auto min-h-[48px] btn-editorial-yellow px-6 py-3.5 text-xs tracking-wider flex items-center justify-between sm:justify-center gap-3 shadow-[4px_4px_0px_#050505] touch-manipulation"
                >
                  <span>REPORT A PROBLEM</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                </button>

                <button
                  onClick={handleExploreMapCTA}
                  className="w-full sm:w-auto min-h-[48px] btn-editorial-black px-6 py-3.5 text-xs tracking-wider flex items-center justify-between sm:justify-center gap-3 shadow-[4px_4px_0px_#DFFF00] touch-manipulation"
                >
                  <span>EXPLORE CITY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LIVE CITY DATA STRIP (Section 9 & 11) */}
      <section className="border-b-2 border-[#050505] bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto">
          {/* Mobile stream header */}
          <div className="md:hidden px-4 py-2 bg-[#050505] text-[#DFFF00] flex items-center justify-between text-xs font-mono font-bold border-b border-[#050505]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-[#DFFF00] animate-pulse" />
              <span>LIVE MUNICIPAL DATA STREAM</span>
            </div>
            <span className="bg-[#DFFF00] text-[#050505] px-1.5 py-0.2 text-[10px] font-black">ACTIVE</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 divide-x-2 divide-y-2 md:divide-y-0 divide-[#050505] text-center font-mono">
            <div className="hidden md:flex p-4 bg-[#050505] text-[#DFFF00] flex-col justify-center items-center">
              <span className="text-[10px] uppercase font-bold tracking-widest">LIVE STREAM</span>
              <span className="font-display font-black text-sm uppercase mt-0.5">CITY DATA</span>
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col justify-center">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#050505]">
                {stats.totalReports.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#666666] uppercase mt-0.5">REPORTS</span>
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col justify-center">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#050505]">
                {stats.activeReports.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#666666] uppercase mt-0.5">ACTIVE</span>
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col justify-center bg-[#F3F2EC]">
              <span className="font-display font-black text-2xl sm:text-3xl text-red-600">
                {stats.criticalReports.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-red-600 uppercase mt-0.5">CRITICAL</span>
            </div>

            <div className="p-3.5 sm:p-4 flex flex-col justify-center">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#050505]">
                {stats.resolvedReports.toLocaleString()}
              </span>
              <span className="text-[10px] sm:text-xs font-bold text-[#666666] uppercase mt-0.5">RESOLVED</span>
            </div>

            <div className="p-3.5 sm:p-4 col-span-2 md:col-span-1 flex flex-col justify-center bg-[#DFFF00]">
              <span className="font-display font-black text-2xl sm:text-3xl text-[#050505]">
                {stats.cityHealthScore} / 100
              </span>
              <span className="text-[10px] sm:text-xs text-[#050505] uppercase font-bold mt-0.5">CITY HEALTH</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HERO GEOMETRIC CITY INFOGRAPHIC (Section 10) */}
      <section className="border-b-2 border-[#050505] bg-[#F3F2EC] py-10 sm:py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <HeroCityCanvas onSelectHotspot={() => handleExploreMapCTA()} />
        </div>
      </section>

      {/* 4. "HOW CIVICPULSE WORKS" — 4-COLUMN EDITORIAL SECTION (Section 12) */}
      <section className="border-b-2 border-[#050505] bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#050505]">
            <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between border-b border-[#050505] pb-2 mb-4 font-mono text-xs font-black">
                  <span>01</span>
                  <span>INTAKE</span>
                </div>
                <h3 className="font-display font-black text-2xl text-[#050505] mb-2">REPORT</h3>
                <p className="font-sans text-xs text-[#444444] leading-relaxed">
                  Citizen reports a problem via camera photo, audio memo, or manual pin on map.
                </p>
              </div>
              <div className="font-mono text-[10px] text-[#888888] pt-4">MULTIMODAL INGESTION</div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between border-b border-[#050505] pb-2 mb-4 font-mono text-xs font-black">
                  <span>02</span>
                  <span>VISION</span>
                </div>
                <h3 className="font-display font-black text-2xl text-[#050505] mb-2">UNDERSTAND</h3>
                <p className="font-sans text-xs text-[#444444] leading-relaxed">
                  AI neural vision identifies the defect type, verifies depth, and removes spam.
                </p>
              </div>
              <div className="font-mono text-[10px] text-[#888888] pt-4">AUTONOMOUS TRIAGE</div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[220px] bg-[#DFFF00]">
              <div>
                <div className="flex items-center justify-between border-b border-[#050505] pb-2 mb-4 font-mono text-xs font-black">
                  <span>03</span>
                  <span>ALGORITHM</span>
                </div>
                <h3 className="font-display font-black text-2xl text-[#050505] mb-2">PRIORITIZE</h3>
                <p className="font-sans text-xs text-[#050505] leading-relaxed font-medium">
                  Dynamic formula weights pedestrian risk, hospital proximity, and duplicate reports.
                </p>
              </div>
              <div className="font-mono text-[10px] text-[#050505] font-bold pt-4">IMPACT SCORING</div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="flex items-center justify-between border-b border-[#050505] pb-2 mb-4 font-mono text-xs font-black">
                  <span>04</span>
                  <span>DISPATCH</span>
                </div>
                <h3 className="font-display font-black text-2xl text-[#050505] mb-2">ROUTE</h3>
                <p className="font-sans text-xs text-[#444444] leading-relaxed">
                  The designated municipal agency receives an immediate work order with SLA timers.
                </p>
              </div>
              <div className="font-mono text-[10px] text-[#888888] pt-4">DIRECT AGENCY API</div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. AI ANALYSIS SECTION — SPLIT SCREEN (Section 13) */}
      <section className="border-b-2 border-[#050505] bg-[#F3F2EC]">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-[#050505]">
            {/* Left: Huge Editorial Heading */}
            <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between bg-[#F3F2EC]">
              <div>
                <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#666666] mb-3">
                  DEFECT DETECTION SYSTEM
                </div>
                <h2 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl leading-[0.9] text-[#050505] tracking-tighter uppercase">
                  YOUR CITY<br />
                  HAS A<br />
                  SIGNAL.
                </h2>
                <p className="font-sans text-sm text-[#222222] mt-6 leading-relaxed">
                  Instead of chaotic 311 voice queues, CivicPulse segments raw smartphone photography into structured municipal engineering tickets.
                </p>
              </div>

              <div className="pt-8">
                <button
                  onClick={handleInspectCase}
                  className="btn-editorial-black px-6 py-3.5 text-xs tracking-wider flex items-center gap-2"
                >
                  <span>INSPECT CASE #CP-48291</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Realistic Civic Complaint Rectangular Blocks (No glowing AI effects) */}
            <div className="lg:col-span-7 p-6 sm:p-10 bg-[#FFFFFF]">
              <div className="border-2 border-[#050505] bg-[#FFFFFF] shadow-[6px_6px_0px_#050505]">
                {/* Photo & Label Header */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#050505] border-b-2 border-[#050505]">
                  <div className="relative h-56 bg-[#050505] overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600"
                      alt="Pothole defect"
                      className="w-full h-full object-cover grayscale contrast-125"
                    />
                    <div className="absolute top-2 left-2 bg-[#DFFF00] text-[#050505] border border-[#050505] font-mono text-[10px] font-bold px-2 py-0.5">
                      RAW SENSOR FRAME
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[10px] text-[#666666] uppercase mb-1">
                        NEURAL CLASSIFICATION
                      </div>
                      <div className="font-display font-black text-2xl text-[#050505]">
                        POTHOLE DETECTED
                      </div>
                      <div className="font-mono text-xs text-[#050505] font-bold mt-1">
                        CONFIDENCE: 94.2%
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#050505] flex justify-between items-center text-xs font-mono">
                      <span>LOCATION</span>
                      <span className="font-bold">MG ROAD • PILLAR 142</span>
                    </div>
                  </div>
                </div>

                {/* Metric Strips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x-2 divide-y-2 sm:divide-y-0 divide-[#050505] font-mono text-center">
                  <div className="p-3.5 bg-[#FFFFFF]">
                    <span className="text-[9px] text-[#666666] uppercase block">SEVERITY</span>
                    <span className="font-display font-black text-lg text-red-600 block mt-0.5">CRITICAL</span>
                  </div>

                  <div className="p-3.5 bg-[#FFFFFF]">
                    <span className="text-[9px] text-[#666666] uppercase block">DEPARTMENT</span>
                    <span className="font-display font-black text-sm text-[#050505] block mt-0.5 truncate">ROAD MAINT.</span>
                  </div>

                  <div className="p-3.5 bg-[#FFFFFF]">
                    <span className="text-[9px] text-[#666666] uppercase block">DUPLICATES</span>
                    <span className="font-display font-black text-lg text-[#050505] block mt-0.5">37 CITIZENS</span>
                  </div>

                  <div className="p-3.5 bg-[#DFFF00]">
                    <span className="text-[9px] text-[#050505] uppercase block font-bold">PRIORITY</span>
                    <span className="font-display font-black text-xl text-[#050505] block mt-0.5">92 / 100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CITY PROBLEM GRID — TILED COMPOSITION (Section 18) */}
      <section className="border-b-2 border-[#050505] bg-[#FFFFFF]">
        <div className="max-w-[1440px] mx-auto">
          <div className="p-4 sm:p-6 border-b-2 border-[#050505] bg-[#F3F2EC] flex items-center justify-between">
            <h2 className="font-display font-black text-xl sm:text-2xl text-[#050505] tracking-tight uppercase">
              CITY ISSUE DISTRIBUTION
            </h2>
            <span className="font-mono text-xs font-bold text-[#666666]">
              REAL-TIME REGISTER
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#050505]">
            {/* Tile 1: Road (Black block) */}
            <div className="p-8 bg-[#050505] text-[#FFFFFF] flex flex-col justify-between min-h-[200px]">
              <div className="flex justify-between items-start font-mono text-xs">
                <span className="text-[#DFFF00] font-bold">01 // ARTERIALS</span>
                <span>42% OF BACKLOG</span>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-[#FFFFFF]">ROADS</div>
                <div className="font-mono text-3xl font-black text-[#DFFF00] mt-1">2,840</div>
              </div>
            </div>

            {/* Tile 2: Water (Off-white block) */}
            <div className="p-8 bg-[#F3F2EC] text-[#050505] flex flex-col justify-between min-h-[200px]">
              <div className="flex justify-between items-start font-mono text-xs text-[#666666]">
                <span className="text-[#050505] font-bold">02 // UTILITIES</span>
                <span>PRESSURIZED MAINS</span>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-[#050505]">WATER</div>
                <div className="font-mono text-3xl font-black text-[#050505] mt-1">1,240</div>
              </div>
            </div>

            {/* Tile 3: Garbage (Acid Yellow block) */}
            <div className="p-8 bg-[#DFFF00] text-[#050505] flex flex-col justify-between min-h-[200px]">
              <div className="flex justify-between items-start font-mono text-xs font-bold">
                <span>03 // SANITATION</span>
                <span>COMMERCIAL SPILLS</span>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-[#050505]">GARBAGE</div>
                <div className="font-mono text-3xl font-black text-[#050505] mt-1">3,920</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-[#050505] border-t-2 border-[#050505]">
            {/* Tile 4: Lighting */}
            <div className="p-8 bg-[#FFFFFF] text-[#050505] flex flex-col justify-between min-h-[200px]">
              <div className="flex justify-between items-start font-mono text-xs text-[#666666]">
                <span>04 // ELECTRICAL</span>
                <span>GRID FEEDS</span>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-[#050505]">LIGHTING</div>
                <div className="font-mono text-3xl font-black text-[#050505] mt-1">940</div>
              </div>
            </div>

            {/* Tile 5: Drainage (Black block) */}
            <div className="p-8 bg-[#050505] text-[#FFFFFF] flex flex-col justify-between min-h-[200px]">
              <div className="flex justify-between items-start font-mono text-xs">
                <span className="text-[#DFFF00] font-bold">05 // CULVERTS</span>
                <span>MONSOON PREP</span>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-[#FFFFFF]">DRAINAGE</div>
                <div className="font-mono text-3xl font-black text-[#DFFF00] mt-1">1,830</div>
              </div>
            </div>

            {/* Tile 6: Other */}
            <div className="p-8 bg-[#F3F2EC] text-[#050505] flex flex-col justify-between min-h-[200px]">
              <div className="flex justify-between items-start font-mono text-xs text-[#666666]">
                <span>06 // TRAFFIC & HAZARDS</span>
                <span>SAFETY SIGNALS</span>
              </div>
              <div>
                <div className="font-display font-black text-3xl sm:text-4xl text-[#050505]">OTHER</div>
                <div className="font-mono text-3xl font-black text-[#050505] mt-1">710</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CRITICAL HOTSPOT SECTION — HUGE ACID YELLOW BLOCK (Section 19) */}
      <section className="border-b-2 border-[#050505] bg-[#DFFF00] py-14 sm:py-20 text-[#050505]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="border-4 border-[#050505] bg-[#FFFFFF] p-6 sm:p-12 shadow-[8px_8px_0px_#050505]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="inline-block bg-[#050505] text-[#DFFF00] font-mono font-bold text-xs px-2.5 py-1 mb-4">
                  CRITICAL HOTSPOT WARNING
                </div>
                <h2 className="font-display font-black text-4xl sm:text-6xl text-[#050505] uppercase tracking-tighter leading-none">
                  MG ROAD CORRIDOR
                </h2>
                <div className="mt-4 font-mono font-bold text-base sm:text-lg text-[#050505]">
                  37 REPORTS • 12 CRITICAL FRACTURES
                </div>
                <p className="mt-3 font-sans text-sm text-[#444444] max-w-lg leading-relaxed">
                  Asphalt cavity near metro pillar 142 poses high collision hazard during rush hours. Automated triage has routed rapid hot-mix crews.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      const c = complaints.find((x) => x.id === 'CP-48291');
                      if (c) setSelectedComplaint(c);
                      setActiveTab('map');
                    }}
                    className="btn-editorial-yellow px-6 py-3.5 text-xs font-bold"
                  >
                    VIEW HOTSPOT ON MAP ↗
                  </button>
                  <button
                    onClick={() => setActiveTab('report')}
                    className="btn-editorial-outline px-6 py-3.5 text-xs font-bold"
                  >
                    ADD CITIZEN REPORT
                  </button>
                </div>
              </div>

              {/* Schematic Map Graphic */}
              <div className="lg:col-span-5 border-2 border-[#050505] bg-[#F3F2EC] p-6 font-mono text-xs">
                <div className="border-b border-[#050505] pb-2 mb-3 flex justify-between font-bold">
                  <span>SCHEMATIC RADIUS</span>
                  <span>250 METERS</span>
                </div>
                <div className="h-40 border border-[#050505] bg-[#FFFFFF] relative flex items-center justify-center grid-paper">
                  <div className="w-16 h-16 border-2 border-[#050505] bg-[#DFFF00] flex items-center justify-center font-black">
                    CP-48291
                  </div>
                  <div className="absolute top-2 right-2 text-[10px] text-[#666666]">GRID 04-A</div>
                </div>
                <div className="mt-3 flex justify-between text-[11px] font-bold">
                  <span>NEARBY SCHOOLS: 3</span>
                  <span>HOSPITALS: 2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CIVIC IMPACT — OVERSIZED NUMBERS (Section 21) */}
      <section className="bg-[#F3F2EC] py-14 sm:py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="border-b-2 border-[#050505] pb-4 mb-8">
            <span className="font-mono text-xs font-bold uppercase text-[#666666] block mb-1">
              PROVEN RESULTS
            </span>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#050505] uppercase">
              CIVIC IMPACT METRICS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border-2 border-[#050505] bg-[#FFFFFF] shadow-[4px_4px_0px_#050505]">
              <div className="font-display font-black text-4xl sm:text-5xl text-[#050505]">12,480</div>
              <div className="font-mono text-xs font-bold text-[#666666] uppercase mt-2">
                PROBLEMS REPORTED
              </div>
            </div>

            <div className="p-6 border-2 border-[#050505] bg-[#FFFFFF] shadow-[4px_4px_0px_#050505]">
              <div className="font-display font-black text-4xl sm:text-5xl text-[#050505]">8,920</div>
              <div className="font-mono text-xs font-bold text-[#666666] uppercase mt-2">
                PROBLEMS RESOLVED
              </div>
            </div>

            <div className="p-6 border-2 border-[#050505] bg-[#DFFF00] shadow-[4px_4px_0px_#050505]">
              <div className="font-display font-black text-4xl sm:text-5xl text-[#050505]">42,800</div>
              <div className="font-mono text-xs font-bold text-[#050505] uppercase mt-2">
                CITIZENS HELPED
              </div>
            </div>

            <div className="p-6 border-2 border-[#050505] bg-[#FFFFFF] shadow-[4px_4px_0px_#050505]">
              <div className="font-display font-black text-4xl sm:text-5xl text-[#050505]">18.4 H</div>
              <div className="font-mono text-xs font-bold text-[#666666] uppercase mt-2">
                AVERAGE RESOLUTION
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
