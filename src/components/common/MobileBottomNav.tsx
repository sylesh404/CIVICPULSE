import React from 'react';
import { 
  Home, 
  PlusCircle, 
  MapPin, 
  Clock, 
  Shield, 
  FileText, 
  Bot, 
  BarChart3,
  Layers
} from 'lucide-react';
import { useCivic, ActiveTab } from '../../context/CivicContext';

export const MobileBottomNav: React.FC = () => {
  const { role, activeTab, setActiveTab } = useCivic();

  const citizenTabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'HOME', icon: <Home className="w-5 h-5" /> },
    { id: 'report', label: 'REPORT', icon: <PlusCircle className="w-5 h-5" /> },
    { id: 'map', label: 'MAP', icon: <MapPin className="w-5 h-5" /> },
    { id: 'my-complaints', label: 'TRACK', icon: <Clock className="w-5 h-5" /> },
    { id: 'impact', label: 'IMPACT', icon: <Layers className="w-5 h-5" /> },
  ];

  const authorityTabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'command-center', label: 'COMMAND', icon: <Shield className="w-5 h-5" /> },
    { id: 'complaints', label: 'ORDERS', icon: <FileText className="w-5 h-5" /> },
    { id: 'map', label: 'MAP', icon: <MapPin className="w-5 h-5" /> },
    { id: 'ai-assistant', label: 'AI INTEL', icon: <Bot className="w-5 h-5" /> },
    { id: 'analytics', label: 'METRICS', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  const currentTabs = role === 'citizen' ? citizenTabs : authorityTabs;

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F3F2EC] border-t-2 border-[#050505] shadow-[0px_-4px_0px_rgba(5,5,5,0.06)] pb-[env(safe-area-inset-bottom,0px)]"
    >
      <div className="grid grid-cols-5 h-16 divide-x border-[#050505]">
        {currentTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-0.5 transition-colors touch-manipulation select-none ${
                isActive
                  ? 'bg-[#050505] text-[#DFFF00]'
                  : 'text-[#050505] hover:bg-[#DFFF00] active:bg-[#050505] active:text-[#DFFF00]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                {tab.icon}
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#DFFF00] rounded-none" />
                )}
              </div>
              <span className={`text-[10px] font-mono font-black uppercase tracking-tight mt-1 truncate max-w-full px-0.5 ${
                isActive ? 'text-[#DFFF00]' : 'text-[#050505]'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
