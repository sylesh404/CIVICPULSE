import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, AlertTriangle, Info, CheckCircle, ExternalLink } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, setSelectedComplaint, complaints, setActiveTab } = useCivic();

  const handleSelectCase = (caseId?: string) => {
    if (!caseId) return;
    const found = complaints.find((c) => c.id === caseId);
    if (found) {
      setSelectedComplaint(found);
      setActiveTab('map');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50"
          />

          {/* Slide-over Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#F3F2EC] border-l-2 border-[#050505] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-[#050505] bg-[#FFFFFF]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#050505] text-[#DFFF00] flex items-center justify-center font-bold">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-display font-black text-base text-[#050505] uppercase">
                    CIVIC TELEMETRY FEED
                  </h3>
                  <p className="text-[11px] font-mono text-[#666666]">Real-time municipal alerts</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 border border-[#050505] hover:bg-[#DFFF00] text-[#050505] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Notification List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.length === 0 ? (
                <div className="text-center py-12 text-[#666666] font-mono text-xs">
                  NO ACTIVE ALERTS
                </div>
              ) : (
                notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 border-2 border-[#050505] transition-all ${
                      notif.read ? 'bg-[#FFFFFF] text-[#666666]' : 'bg-[#FFFFFF] shadow-[3px_3px_0px_#050505]'
                    }`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[#050505] pb-2 mb-2">
                      <span className="font-mono font-bold text-xs text-[#050505] uppercase flex items-center gap-1.5">
                        {notif.type === 'alert' && <span className="w-2 h-2 bg-red-600 inline-block" />}
                        {notif.type === 'success' && <span className="w-2 h-2 bg-emerald-600 inline-block" />}
                        {notif.type === 'info' && <span className="w-2 h-2 bg-[#DFFF00] inline-block border border-[#050505]" />}
                        <span>{notif.title}</span>
                      </span>
                      <span className="text-[10px] font-mono text-[#666666]">{notif.timestamp}</span>
                    </div>

                    <p className="text-xs text-[#222222] font-sans leading-relaxed">
                      {notif.message}
                    </p>

                    <div className="mt-3 pt-2 border-t border-dashed border-[#D2D2CA] flex items-center justify-between">
                      {notif.caseId ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectCase(notif.caseId);
                          }}
                          className="text-xs font-mono font-bold text-[#050505] hover:bg-[#DFFF00] px-1.5 py-0.5 border border-[#050505] flex items-center gap-1"
                        >
                          <span>Inspect #{notif.caseId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      ) : <span />}

                      {!notif.read && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            markAsRead(notif.id);
                          }}
                          className="text-[10px] font-mono text-[#666666] hover:text-[#050505]"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t-2 border-[#050505] bg-[#FFFFFF] flex items-center justify-between text-xs font-mono text-[#050505]">
              <span className="font-bold">● WEBSOCKET SYNCED</span>
              <span>AES-256</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
