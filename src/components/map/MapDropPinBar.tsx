import React from 'react';
import { MapPin, Navigation, Crosshair, Check, X } from 'lucide-react';
import { useCivic } from '../../context/CivicContext';

export const MapDropPinBar: React.FC = () => {
  const { isPinningMode, setIsPinningMode, draftPinLocation, setDraftPinLocation, setActiveTab } = useCivic();

  if (!isPinningMode) return null;

  const handleConfirm = () => {
    setIsPinningMode(false);
    setActiveTab('report');
  };

  const handleChangeLocation = () => {
    // Clear draft pin to allow clicking a new spot or dragging
    setDraftPinLocation(null);
  };

  const handleCancel = () => {
    setIsPinningMode(false);
    setDraftPinLocation(null);
  };

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-2xl px-4 pointer-events-auto">
      <div className="p-4 border-2 border-[#050505] bg-[#FFFFFF] shadow-[6px_6px_0px_#050505] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#DFFF00] border-2 border-[#050505] flex items-center justify-center text-[#050505] shadow-[2px_2px_0px_#050505] shrink-0">
            <Crosshair className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase text-[#050505] bg-[#DFFF00] px-1.5 py-0.5 border border-[#050505]">
                REPORT HERE
              </span>
              <span className="text-[10px] font-bold text-[#666666]">
                {draftPinLocation ? 'DRAG PIN OR CLICK MAP' : 'CLICK ON CITY MAP'}
              </span>
            </div>

            {draftPinLocation ? (
              <div className="mt-1 space-y-0.5">
                <div className="text-xs font-black text-[#050505] truncate max-w-md">
                  {draftPinLocation.address}
                </div>
                <div className="text-[10px] text-[#444444] font-bold flex gap-3">
                  <span>LAT: <b>{draftPinLocation.lat.toFixed(5)}</b></span>
                  <span>LNG: <b>{draftPinLocation.lng.toFixed(5)}</b></span>
                </div>
              </div>
            ) : (
              <div className="text-xs font-bold text-[#666666] mt-1">
                Click anywhere on the geographic map to drop pin...
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#050505]">
          <button
            onClick={handleCancel}
            className="px-2.5 py-1.5 border border-[#050505] hover:bg-[#F3F2EC] text-[11px] font-bold text-[#050505]"
          >
            Cancel
          </button>

          {draftPinLocation && (
            <button
              onClick={handleChangeLocation}
              className="px-2.5 py-1.5 border-2 border-[#050505] bg-white hover:bg-[#F3F2EC] text-[11px] font-black text-[#050505] uppercase"
            >
              CHANGE LOCATION
            </button>
          )}

          <button
            onClick={handleConfirm}
            disabled={!draftPinLocation}
            className={`px-3 py-1.5 border-2 border-[#050505] text-[11px] font-black uppercase transition-all shadow-[2px_2px_0px_#050505] ${
              draftPinLocation
                ? 'bg-[#DFFF00] hover:bg-[#050505] hover:text-[#DFFF00] text-[#050505]'
                : 'bg-[#EAE8DE] text-[#888888] cursor-not-allowed'
            }`}
          >
            CONFIRM LOCATION ↗
          </button>
        </div>
      </div>
    </div>
  );
};
