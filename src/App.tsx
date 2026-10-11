import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CivicProvider, useCivic } from './context/CivicContext';
import { CustomCursor } from './components/common/CustomCursor';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CitizenReportPage } from './pages/CitizenReportPage';
import { LiveCityMapPage } from './pages/LiveCityMapPage';
import { ComplaintTrackingPage } from './pages/ComplaintTrackingPage';
import { CivicImpactPage } from './pages/CivicImpactPage';
import { CommandCenterPage } from './pages/CommandCenterPage';
import { ComplaintsDirectoryPage } from './pages/ComplaintsDirectoryPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AiAssistantPage } from './pages/AiAssistantPage';

const AppContent: React.FC = () => {
  const { activeTab, role } = useCivic();
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-[#F3F2EC] text-[#050505] flex flex-col font-sans selection:bg-[#DFFF00] selection:text-[#050505] overflow-x-hidden">
      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Loading Sequence */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onLoaded={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Floating Navbar */}
      <Navbar />

      {/* Page Routing Container */}
      <main className="flex-1 pb-16 md:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${role}-${activeTab}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full"
          >
            {/* Citizen View Routes */}
            {activeTab === 'overview' && <LandingPage />}
            {activeTab === 'report' && <CitizenReportPage />}
            {activeTab === 'map' && <LiveCityMapPage />}
            {activeTab === 'my-complaints' && <ComplaintTrackingPage />}
            {activeTab === 'impact' && <CivicImpactPage />}

            {/* Authority View Routes */}
            {activeTab === 'command-center' && <CommandCenterPage />}
            {activeTab === 'complaints' && <ComplaintsDirectoryPage />}
            {activeTab === 'departments' && <DepartmentsPage />}
            {activeTab === 'analytics' && <AnalyticsPage />}
            {activeTab === 'ai-assistant' && <AiAssistantPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />

      {/* Editorial Footer (hide on full-screen map) */}
      {activeTab !== 'map' && (
        <footer className="border-t-2 border-[#050505] bg-white py-8 px-4 sm:px-8 text-xs font-mono text-[#050505] mb-16 md:mb-0">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#DFFF00] border border-[#050505]" />
              <span className="font-black tracking-wider uppercase">CIVICPULSE</span>
              <span className="text-slate-600">— THE CITY, EDITED BY AI</span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold">
              <span>MUNICIPAL NEURAL ENGINE</span>
              <span>12,480 VERIFIED CASES</span>
              <span className="bg-[#DFFF00] px-2 py-0.5 border border-[#050505]">SYSTEM ONLINE</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export function App() {
  return (
    <CivicProvider>
      <AppContent />
    </CivicProvider>
  );
}

export default App;
