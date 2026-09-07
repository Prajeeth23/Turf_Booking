import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Clock, MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { generateDirectContactWhatsAppLink } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#040806] text-slate-300 pt-16 pb-12 border-t border-pitch-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-pitch-border">
          {/* Col 1: Brand & Official Sports Badge */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/friends-turf-logo.png"
                alt="Friends Turf Logo"
                className="w-14 h-14 object-contain rounded-2xl bg-white p-1 border-2 border-brand-green shadow-glow"
              />
              <div>
                <span className="font-sporty text-3xl font-black text-white leading-none block uppercase">
                  Friends <span className="text-brand-electric">Turf</span>
                </span>
                <span className="text-[10px] text-brand-electric font-extrabold uppercase tracking-widest block mt-0.5">
                  Sports Arena • Tiruppur
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
              Tiruppur’s premier multi-sport destination for Football, Box Cricket, and Shuttle under high-mast shadowless floodlights.
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 text-brand-electric text-xs font-black border border-emerald-500/30 shadow-glow">
                <Clock className="w-3.5 h-3.5 text-brand-green" />
                Open 24 Hours
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30">
                ★ 4.9 (17 Reviews)
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="font-sporty text-white text-xl font-black uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm font-bold uppercase">
              <li>
                <Link to="/" className="text-slate-400 hover:text-brand-electric transition-colors">Home Ground</Link>
              </li>
              <li>
                <Link to="/book" className="text-slate-400 hover:text-brand-electric transition-colors flex items-center gap-2">
                  <span>Book Turf</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-brand-green text-black font-black uppercase shadow-glow">Instant</span>
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="text-slate-400 hover:text-brand-electric transition-colors">Arena Facilities</Link>
              </li>
              <li>
                <Link to="/gallery" className="text-slate-400 hover:text-brand-electric transition-colors">Match Photo Gallery</Link>
              </li>
              <li>
                <Link to="/reviews" className="text-slate-400 hover:text-brand-electric transition-colors">Athlete Reviews</Link>
              </li>
              <li>
                <Link to="/my-booking" className="text-slate-400 hover:text-brand-electric transition-colors">Track Match Booking</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div>
            <h3 className="font-sporty text-white text-xl font-black uppercase tracking-wider mb-4">
              Ground & Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-green mt-0.5 flex-shrink-0" />
                <span className="text-slate-300 font-medium">
                  {BUSINESS_INFO.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-brand-green flex-shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-brand-electric font-sporty font-black text-white text-xl uppercase">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-brand-green flex-shrink-0" />
                <span className="text-slate-300 font-bold uppercase text-xs">24 Hours / 7 Days a Week</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Fast Connect */}
          <div>
            <h3 className="font-sporty text-white text-xl font-black uppercase tracking-wider mb-4">
              Instant Booking
            </h3>
            <p className="text-sm text-slate-400 mb-4 font-normal">
              Direct coordinator on WhatsApp for instant match bookings & tournament setups.
            </p>
            <a
              href={generateDirectContactWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 px-4 rounded-xl bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all duration-200 hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Ground Desk</span>
            </a>
            <div className="mt-4 pt-4 border-t border-pitch-border">
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-electric transition-colors font-bold uppercase tracking-wider"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-green" />
                <span>Turf Staff Portal</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <p>© {new Date().getFullYear()} Friends Turf Tiruppur. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-brand-green fill-brand-green" />
            <span>for football, cricket & badminton athletes in Tiruppur</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
