import React, { useState } from 'react';
import { 
  Bell, 
  Flame, 
  Menu, 
  X, 
  ArrowUpRight, 
  Radio
} from 'lucide-react';
import { useCivic, ActiveTab, UserRole } from '../../context/CivicContext';
import { NotificationDrawer } from './NotificationDrawer';

export const Navbar: React.FC = () => {
  const { 
    role, 
    setRole, 
    activeTab, 
    setActiveTab, 
    unreadCount, 
    demoMode, 
    toggleDemoMode,
    latestLiveEvent,
    stats
  } = useCivic();

  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const citizenNavItems: { id: ActiveTab; label: string }[] = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'report', label: 'REPORT' },
    { id: 'map', label: 'LIVE MAP' },
    { id: 'my-complaints', label: 'TRACK' },
    { id: 'impact', label: 'IMPACT' },
  ];

  const authorityNavItems: { id: ActiveTab; label: string }[] = [
    { id: 'command-center', label: 'COMMAND' },
    { id: 'complaints', label: 'WORK ORDERS' },
    { id: 'departments', label: 'DEPARTMENTS' },
    { id: 'analytics', label: 'ANALYTICS' },
    { id: 'ai-assistant', label: 'AI INTEL' },
  ];

  const currentNavItems = role === 'citizen' ? citizenNavItems : authorityNavItems;

  const handleRoleToggle = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === 'authority' && !['command-center', 'complaints', 'departments', 'analytics', 'ai-assistant'].includes(activeTab)) {
      setActiveTab('command-center');
    } else if (newRole === 'citizen' && !['overview', 'report', 'map', 'my-complaints', 'impact'].includes(activeTab)) {
      setActiveTab('overview');
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#F3F2EC] border-b-2 border-[#050505]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6">
          <div className="flex items-stretch justify-between h-14 sm:h-16">
            {/* Logo + Ticker badge */}
            <div className="flex items-center gap-3 pr-4 sm:border-r border-[#050505]">
              <div 
                onClick={() => setActiveTab(role === 'citizen' ? 'overview' : 'command-center')}
                className="cursor-pointer flex items-center gap-2 group select-none"
              >
                <div className="w-5 h-5 bg-[#050505] flex items-center justify-center text-[#DFFF00]">
                  <span className="font-display font-black text-xs leading-none">C</span>
                </div>
                <span className="font-display font-black text-xl tracking-tighter text-[#050505]">
                  CIVICPULSE
                </span>
              </div>

              {/* [ 12K+ REPORTS ] Editorial Badge */}
              <div className="hidden md:inline-flex items-center px-2 py-0.5 bg-[#FFFFFF] border border-[#050505] text-[10px] font-mono font-bold text-[#050505]">
                [ 12K+ REPORTS ]
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-stretch h-full">
              {currentNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`px-5 text-xs font-mono font-bold tracking-wider transition-colors border-r border-[#050505] flex items-center ${
                      isActive 
                        ? 'bg-[#050505] text-[#DFFF00]' 
                        : 'text-[#050505] hover:bg-[#DFFF00] hover:text-[#050505]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Right Tools: Role Switch, Demo Mode, Notifications, Hamburger */}
            <div className="flex items-center pl-1 sm:pl-4 gap-1.5 sm:gap-2">
              {/* Role Toggle Switch - compact on mobile */}
              <button
                onClick={() => handleRoleToggle(role === 'citizen' ? 'authority' : 'citizen')}
                className="h-10 px-2 sm:px-3 bg-[#FFFFFF] border-2 border-[#050505] hover:bg-[#DFFF00] text-[10px] sm:text-[11px] font-mono font-bold text-[#050505] flex items-center gap-1 transition-colors touch-manipulation"
                title="Switch between Citizen and Authority interface"
              >
                <span className="hidden xs:inline">{role === 'citizen' ? 'AUTHORITY →' : 'CITIZEN →'}</span>
                <span className="xs:hidden">{role === 'citizen' ? 'ADMIN' : 'CITIZEN'}</span>
              </button>

              {/* DEMO Simulation Button - hidden on 320px, visible inside drawer */}
              <button
                onClick={toggleDemoMode}
                className={`h-10 px-2 sm:px-2.5 border-2 border-[#050505] text-[10px] font-mono font-bold hidden sm:flex items-center gap-1 transition-colors touch-manipulation ${
                  demoMode
                    ? 'bg-[#DFFF00] text-[#050505]'
                    : 'bg-[#FFFFFF] text-[#050505] hover:bg-[#EAE8DE]'
                }`}
                title="Simulate incoming incidents in real-time"
              >
                <Flame className={`w-3.5 h-3.5 ${demoMode ? 'text-[#050505]' : 'text-[#666666]'}`} />
                <span>{demoMode ? 'LIVE SIM' : 'DEMO'}</span>
              </button>

              {/* Notifications Button with Brutalist Badge */}
              <button
                onClick={() => setNotifOpen(true)}
                className="relative h-10 w-10 min-w-[40px] bg-[#FFFFFF] border-2 border-[#050505] hover:bg-[#EAE8DE] flex items-center justify-center text-[#050505] transition-colors touch-manipulation"
                aria-label="Alerts"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-[#DFFF00] text-[#050505] border border-[#050505] text-[9px] font-mono font-black px-1 leading-none h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden h-10 w-10 min-w-[40px] bg-[#FFFFFF] border-2 border-[#050505] flex items-center justify-center text-[#050505] touch-manipulation"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4 stroke-[2.5]" /> : <Menu className="w-4 h-4 stroke-[2.5]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Simulator Ticker Bar if Demo active */}
        {latestLiveEvent && (
          <div className="bg-[#DFFF00] border-t border-[#050505] px-4 py-1 text-xs font-mono font-bold text-[#050505] flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 bg-[#050505] flex-shrink-0 animate-pulse" />
            <span className="truncate">{latestLiveEvent}</span>
          </div>
        )}

        {/* Mobile Full Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-2 border-[#050505] bg-[#F3F2EC] max-h-[calc(100vh-60px)] overflow-y-auto shadow-xl">
            {/* Mobile Drawer Top Banner */}
            <div className="p-3 bg-[#050505] text-[#DFFF00] text-xs font-mono font-bold flex items-center justify-between">
              <span>SYSTEM MENU • {role.toUpperCase()} MODE</span>
              <span className="bg-[#DFFF00] text-[#050505] px-1.5 py-0.2 text-[10px]">v2.4</span>
            </div>

            {/* Navigation Links */}
            <div className="divide-y border-b-2 border-[#050505]">
              {currentNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full min-h-[48px] py-3.5 px-4 text-xs font-mono font-black tracking-wider text-left transition-colors flex items-center justify-between touch-manipulation ${
                    activeTab === item.id
                      ? 'bg-[#050505] text-[#DFFF00]'
                      : 'text-[#050505] hover:bg-[#DFFF00] bg-white'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] font-normal opacity-70">
                    {activeTab === item.id ? '● ACTIVE' : '→'}
                  </span>
                </button>
              ))}
            </div>

            {/* Mobile Drawer Quick Tools */}
            <div className="p-4 space-y-3 bg-[#EAE8DD]">
              <div className="text-[10px] font-mono font-black text-slate-500 uppercase">
                QUICK CONTROLS:
              </div>

              {/* Role switcher in drawer */}
              <button
                onClick={() => {
                  handleRoleToggle(role === 'citizen' ? 'authority' : 'citizen');
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] py-2.5 px-3 bg-white border-2 border-[#050505] text-xs font-mono font-black flex items-center justify-between shadow-[2px_2px_0px_#050505]"
              >
                <span>SWITCH TO {role === 'citizen' ? 'AUTHORITY COMMAND' : 'CITIZEN PORTAL'}</span>
                <span>⇄</span>
              </button>

              {/* Demo simulator trigger in drawer */}
              <button
                onClick={() => {
                  toggleDemoMode();
                  setMobileMenuOpen(false);
                }}
                className={`w-full min-h-[44px] py-2.5 px-3 border-2 border-[#050505] text-xs font-mono font-black flex items-center justify-between shadow-[2px_2px_0px_#050505] ${
                  demoMode ? 'bg-[#DFFF00] text-[#050505]' : 'bg-white text-[#050505]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-600" />
                  <span>{demoMode ? 'PAUSE LIVE SIMULATION' : 'SIMULATE REAL-TIME INCIDENTS'}</span>
                </span>
                <span className="text-[10px]">{demoMode ? '[RUNNING]' : '[START]'}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Notification Drawer Modal */}
      <NotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};
