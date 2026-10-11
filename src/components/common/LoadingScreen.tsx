import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen: React.FC<{ onLoaded: () => void }> = ({ onLoaded }) => {
  const [percent, setPercent] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoaded, 200);
          return 100;
        }
        return prev + 17;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onLoaded]);

  // Construct block character loading bar
  const totalBlocks = 16;
  const filledBlocks = Math.round((Math.min(percent, 100) / 100) * totalBlocks);
  const barString = '█'.repeat(filledBlocks) + '░'.repeat(Math.max(0, totalBlocks - filledBlocks));

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F3F2EC] text-[#050505] p-6 select-none font-mono"
    >
      <div className="border-2 border-[#050505] bg-[#FFFFFF] p-8 max-w-sm w-full shadow-[6px_6px_0px_#050505]">
        <div className="flex items-center justify-between border-b-2 border-[#050505] pb-3 mb-6">
          <span className="font-display font-black text-2xl tracking-tighter text-[#050505]">
            CIVICPULSE
          </span>
          <span className="bg-[#DFFF00] text-[#050505] text-[10px] font-bold px-2 py-0.5 border border-[#050505]">
            v2.4
          </span>
        </div>

        <p className="text-xs uppercase tracking-wider text-[#666666] mb-3">
          LOADING CITY DATA...
        </p>

        <div className="text-sm font-bold tracking-widest text-[#050505] mb-4">
          [{barString}]
        </div>

        <div className="flex justify-between text-xs text-[#050505] font-bold border-t border-[#050505] pt-3">
          <span>INITIALIZING</span>
          <span>{Math.min(percent, 100)}%</span>
        </div>
      </div>
    </motion.div>
  );
};
