import React from 'react';
import { INITIAL_FACILITIES, BUSINESS_INFO } from '../data/mockData';
import { FacilityCard } from '../components/FacilityCard';
import { Link } from 'react-router-dom';
import { CalendarCheck, Clock } from 'lucide-react';
import { generateDirectContactWhatsAppLink } from '../utils/whatsapp';

export const FacilitiesPage: React.FC = () => {
  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050b08] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-brand-electric text-xs font-black uppercase tracking-wider mb-3 shadow-glow">
            <Clock className="w-3.5 h-3.5 text-brand-green" />
            <span>Open 24 Hours • Sirupooluvapatti, Tiruppur</span>
          </div>
          <h1 className="font-sporty text-5xl sm:text-7xl font-black text-white uppercase tracking-tight mb-4">
            Arena <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-300">Facilities</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Every feature at Friends Turf has been engineered from the ground up to give footballers, cricket squads, and badminton athletes the ultimate floodlit experience.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {INITIAL_FACILITIES.map((facility) => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>

        {/* Technical Arena Specifications */}
        <div className="p-8 sm:p-12 rounded-3xl mb-16 glass-dark-panel border-2 border-emerald-500/20 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black text-brand-green uppercase tracking-widest block mb-2">
              Arena Specifications
            </span>
            <h2 className="font-sporty text-3xl sm:text-5xl font-black text-white uppercase mb-4">
              Built for High-Paced Sports
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              We take ground maintenance seriously. The synthetic turf is brushed and replenished regularly with high-grade rubber infill to ensure consistent ball bounce, player traction, and minimal knee fatigue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Surface</span>
              <span className="font-sporty text-2xl font-black text-white uppercase block">Synthetic Turf</span>
              <p className="text-xs text-slate-400 mt-2 font-normal">Durable all-weather grass with optimal shock absorption.</p>
            </div>

            <div className="p-5 rounded-2xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Game Formats</span>
              <span className="font-sporty text-2xl font-black text-white uppercase block">5s/7s & Cricket</span>
              <p className="text-xs text-slate-400 mt-2 font-normal">Multi-sport pitch with dynamic line markings.</p>
            </div>

            <div className="p-5 rounded-2xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Lighting</span>
              <span className="font-sporty text-2xl font-black text-brand-electric uppercase block">High-Mast LEDs</span>
              <p className="text-xs text-slate-400 mt-2 font-normal">Shadowless floodlights offering daytime brightness.</p>
            </div>

            <div className="p-5 rounded-2xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 uppercase tracking-wider font-bold block mb-1">Operating Hours</span>
              <span className="font-sporty text-2xl font-black text-white uppercase block">24 Hours / 7 Days</span>
              <p className="text-xs text-slate-400 mt-2 font-normal">Play anytime, early morning or midnight matches.</p>
            </div>
          </div>
        </div>

        {/* Bottom Booking Banner */}
        <div className="rounded-3xl glass-dark-panel border-2 border-brand-green/30 text-white p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-glow">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="font-sporty text-3xl sm:text-5xl font-black text-white uppercase mb-2">
              Ready to Kick Off?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Book a slot now or call our arena desk directly at <strong className="text-brand-electric font-black">{BUSINESS_INFO.phone}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <Link
              to="/book"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-green hover:bg-brand-electric text-black font-black text-base uppercase tracking-wider shadow-glow transition-all hover:scale-105"
            >
              <CalendarCheck className="w-5 h-5" />
              <span>Book a Slot Now</span>
            </Link>

            <a
              href={generateDirectContactWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-[#0d2015] hover:bg-[#153422] text-white font-bold text-base border border-emerald-500/40 transition-all"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
