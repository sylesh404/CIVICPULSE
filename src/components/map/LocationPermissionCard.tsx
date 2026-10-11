import React from 'react';
import { Navigation, ShieldAlert, RotateCcw, X, MapPin } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';

export const LocationPermissionCard: React.FC<{ onClose?: () => void }> = ({ onClose }) => {
  const { locationPermission, requestLocation } = useCivic();

  if (locationPermission === 'granted') {
    return null;
  }

  const isDenied = locationPermission === 'denied';

  return (
    <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
      <div className="p-5 border-2 border-[#050505] bg-[#FFFFFF] shadow-[6px_6px_0px_#050505]">
        <div className="flex items-start justify-between gap-3 border-b-2 border-[#050505] pb-3 mb-3">
          <div>
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block ${isDenied ? 'text-red-600' : 'text-[#050505]'}`}>
              {isDenied ? 'LOCATION ACCESS DENIED' : 'GPS POSITIONING REQUIRED'}
            </span>
            <h3 className="text-xl font-display font-black text-[#050505] uppercase">
              {isDenied ? 'PERMISSION NEEDED' : 'ENABLE LIVE LOCATION'}
            </h3>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1 border border-[#050505] hover:bg-[#DFFF00]"
            >
              <X className="w-4 h-4 text-[#050505]" />
            </button>
          )}
        </div>

        <p className="text-xs font-sans text-[#222222] leading-relaxed mb-4">
          {isDenied
            ? 'Enable location access from your browser settings to automatically view nearby problems and pinpoint reports with GPS accuracy.'
            : 'Allow CivicPulse to access your location to show nearby civic issues and help you report problems accurately.'}
        </p>

        <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#050505]">
          <span className="text-[10px] font-mono text-[#666666]">
            Used only for report placement.
          </span>

          <button
            onClick={() => requestLocation()}
            className={`px-4 py-2 border-2 border-[#050505] text-xs font-mono font-bold uppercase transition-all shadow-[2px_2px_0px_#050505] ${
              isDenied
                ? 'bg-[#FFFFFF] hover:bg-[#F3F2EC] text-[#050505]'
                : 'bg-[#DFFF00] hover:bg-[#050505] hover:text-[#DFFF00] text-[#050505]'
            }`}
          >
            {isDenied ? 'TRY AGAIN ↗' : 'ALLOW LOCATION ↗'}
          </button>
        </div>
      </div>
    </div>
  );
};
