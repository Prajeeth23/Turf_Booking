import React from 'react';
import { TimeSlot } from '../types/turfTypes';
import { Lock, ShieldAlert, Check, Moon, Sun } from 'lucide-react';

interface SlotCardProps {
  slot: TimeSlot;
  isSelected: boolean;
  onSelect: (slot: TimeSlot) => void;
}

export const SlotCard: React.FC<SlotCardProps> = ({ slot, isSelected, onSelect }) => {
  const isBooked = slot.state === 'BOOKED';
  const isBlocked = slot.state === 'BLOCKED';
  const isAvailable = slot.state === 'AVAILABLE' && !isBooked && !isBlocked;

  const handleClick = () => {
    if (isAvailable) {
      onSelect(slot);
    }
  };

  if (isBooked) {
    return (
      <div
        className="relative p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/5 text-slate-500 cursor-not-allowed select-none transition-all flex flex-col justify-between min-h-[95px] opacity-60"
        title="This slot is already booked"
      >
        <div className="flex items-center justify-between gap-1 text-xs">
          <span className="font-sporty font-bold text-base text-slate-500 line-through">{slot.displayTime}</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-white/5 px-2 py-0.5 rounded border border-white/5">
            <Lock className="w-3 h-3 text-slate-500" />
            Booked
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
          <span className="font-bold">₹{slot.price}</span>
          <span className="text-[10px] uppercase font-semibold">Unavailable</span>
        </div>
      </div>
    );
  }

  if (isBlocked) {
    return (
      <div
        className="relative p-3.5 sm:p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-amber-300 cursor-not-allowed select-none transition-all flex flex-col justify-between min-h-[95px]"
        title="This slot is reserved or in maintenance"
      >
        <div className="flex items-center justify-between gap-1 text-xs">
          <span className="font-sporty font-bold text-base text-amber-200">{slot.displayTime}</span>
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 uppercase tracking-wider bg-amber-900/40 px-2 py-0.5 rounded border border-amber-500/30">
            <ShieldAlert className="w-3 h-3" />
            Reserved
          </span>
        </div>
        <div className="flex items-center justify-between text-xs text-amber-400/80 mt-2">
          <span className="font-bold">₹{slot.price}</span>
          <span className="text-[10px] font-semibold">Club Blocked</span>
        </div>
      </div>
    );
  }

  if (isSelected) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="relative p-3.5 sm:p-4 rounded-xl bg-brand-green text-black font-semibold border-2 border-brand-electric shadow-glow transform scale-[1.02] transition-all flex flex-col justify-between min-h-[95px] text-left"
      >
        <div className="flex items-center justify-between gap-1 w-full text-xs">
          <span className="font-sporty font-black text-black text-lg uppercase">{slot.displayTime}</span>
          <span className="w-5 h-5 rounded-full bg-black text-brand-green flex items-center justify-center shadow-sm">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </span>
        </div>
        <div className="flex items-center justify-between text-xs font-black text-black mt-2 w-full">
          <span className="text-base font-sporty">₹{slot.price}</span>
          <span className="flex items-center gap-1 text-[10px] uppercase font-black tracking-wider bg-black/15 px-2 py-0.5 rounded-full">
            {slot.isNight ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
            {slot.isNight ? 'Floodlit' : 'Day'}
          </span>
        </div>
      </button>
    );
  }

  // Available state
  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative p-3.5 sm:p-4 rounded-xl glass-dark-card border border-pitch-border hover:border-brand-green text-white transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between min-h-[95px] text-left group shadow-sm hover:shadow-glow"
    >
      <div className="flex items-center justify-between gap-1 w-full text-xs">
        <span className="font-sporty font-black text-white group-hover:text-brand-electric transition-colors text-lg uppercase">
          {slot.displayTime}
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-brand-green group-hover:scale-125 transition-transform shadow-glow"></span>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400 mt-2 w-full">
        <span className="font-bold text-white text-sm">₹{slot.price}</span>
        <span className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
          {slot.isNight ? (
            <>
              <Moon className="w-3.5 h-3.5 text-blue-400" />
              <span>Night</span>
            </>
          ) : (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Day</span>
            </>
          )}
        </span>
      </div>
    </button>
  );
};
