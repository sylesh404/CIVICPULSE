import React from 'react';
import { X, Navigation, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';
import { geocodingService } from '../../services/geocodingService';
import { locationService } from '../../services/locationService';

export const MapReportChoiceModal: React.FC = () => {
  const { 
    reportChoiceModalOpen, 
    setReportChoiceModalOpen, 
    userLocation, 
    requestLocation, 
    setIsPinningMode, 
    setDraftPinLocation,
    setActiveTab 
  } = useCivic();

  if (!reportChoiceModalOpen) return null;

  const handleUseMyLocation = async () => {
    setReportChoiceModalOpen(false);

    try {
      let loc = userLocation;
      if (!loc) {
        loc = await locationService.getCurrentLocation();
        await requestLocation();
      }
      if (loc) {
        const address = await geocodingService.reverseGeocode(loc.latitude, loc.longitude);
        setDraftPinLocation({
          lat: loc.latitude,
          lng: loc.longitude,
          address,
        });
      }
    } catch {
      // Fallback
    }
    setActiveTab('report');
  };

  const handlePinLocationOnMap = () => {
    setReportChoiceModalOpen(false);
    setIsPinningMode(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-lg border-2 border-[#050505] bg-[#FFFFFF] shadow-[8px_8px_0px_#050505] p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-[#050505] pb-4">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#666666] block mb-1">
              REPORT CIVIC ISSUE
            </span>
            <h2 className="text-2xl font-display font-black text-[#050505] uppercase">
              SELECT LOCATION METHOD
            </h2>
          </div>

          <button
            onClick={() => setReportChoiceModalOpen(false)}
            className="p-1.5 border border-[#050505] hover:bg-[#DFFF00]"
          >
            <X className="w-5 h-5 text-[#050505]" />
          </button>
        </div>

        {/* 2 Sharp Choice Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
          {/* Option 1: Use My Location */}
          <button
            onClick={handleUseMyLocation}
            className="p-5 border-2 border-[#050505] bg-[#F3F2EC] hover:bg-[#DFFF00] transition-colors flex flex-col justify-between text-left group shadow-[3px_3px_0px_#050505]"
          >
            <div>
              <div className="w-10 h-10 border-2 border-[#050505] bg-[#FFFFFF] flex items-center justify-center text-[#050505] mb-3">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-sm uppercase text-[#050505]">
                USE MY LOCATION
              </h3>
              <p className="font-sans text-xs text-[#444444] mt-1 leading-snug">
                Bind immediately to your live GPS coordinates.
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-[#050505] flex items-center justify-between text-xs font-bold text-[#050505]">
              <span>SELECT GPS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>

          {/* Option 2: Pin Location On Map */}
          <button
            onClick={handlePinLocationOnMap}
            className="p-5 border-2 border-[#050505] bg-[#FFFFFF] hover:bg-[#050505] hover:text-[#DFFF00] transition-colors flex flex-col justify-between text-left group shadow-[3px_3px_0px_#050505]"
          >
            <div>
              <div className="w-10 h-10 border-2 border-[#050505] bg-[#F3F2EC] group-hover:bg-[#050505] flex items-center justify-center text-[#050505] group-hover:text-[#DFFF00] mb-3">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-display font-black text-sm uppercase">
                PIN ON MAP
              </h3>
              <p className="font-sans text-xs text-[#444444] group-hover:text-[#B9B9B2] mt-1 leading-snug">
                Click anywhere on the map or drag a pin to report elsewhere.
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-[#050505] flex items-center justify-between text-xs font-bold">
              <span>DROP PIN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        <div className="pt-2 border-t border-[#050505] flex items-center justify-between text-[11px] text-[#666666] font-mono">
          <span>PRIVACY: Encrypted and dispatched only on submission.</span>
        </div>
      </div>
    </div>
  );
};
