import React from 'react';
import { TurfFacility } from '../types/turfTypes';
import { ShieldCheck, Zap, Car, Shirt, Armchair, Coffee, Award } from 'lucide-react';

interface FacilityCardProps {
  facility: TurfFacility;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility }) => {
  const getIcon = () => {
    switch (facility.id) {
      case 'turf':
        return <Award className="w-6 h-6 text-brand-green" />;
      case 'floodlights':
        return <Zap className="w-6 h-6 text-amber-400" />;
      case 'parking':
        return <Car className="w-6 h-6 text-emerald-400" />;
      case 'changing':
        return <Shirt className="w-6 h-6 text-blue-400" />;
      case 'seating':
        return <Armchair className="w-6 h-6 text-purple-400" />;
      case 'refreshments':
        return <Coffee className="w-6 h-6 text-orange-400" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-brand-green" />;
    }
  };

  return (
    <div className="glass-dark-card p-6 sm:p-7 rounded-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group border border-pitch-border hover:border-brand-green/40 shadow-card-dark">
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="w-12 h-12 rounded-xl bg-pitch-card border border-pitch-border flex items-center justify-center group-hover:scale-110 transition-all duration-200">
            {getIcon()}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-950/80 text-brand-electric border border-emerald-500/30">
            {facility.highlight}
          </span>
        </div>
        <h3 className="font-sporty text-2xl font-black text-white mb-2 uppercase group-hover:text-brand-electric transition-colors">
          {facility.title}
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed font-normal">
          {facility.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-pitch-border flex items-center gap-2 text-xs font-bold text-brand-electric">
        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
        <span>Included with your ground booking</span>
      </div>
    </div>
  );
};
