import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BUSINESS_INFO, INITIAL_REVIEWS, INITIAL_GALLERY, BASE_SLOTS_CONFIG, getTodayDateString } from '../data/mockData';
import { Lightbox } from '../components/Lightbox';
import { 
  Users, 
  Star, 
  Clock, 
  Calendar, 
  ArrowRight, 
  Phone, 
  MessageSquare,
  Check,
  Award,
  Zap,
  Shield,
  Car,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { generateDirectContactWhatsAppLink } from '../utils/whatsapp';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Selected sport & booking bar state
  const [selectedSport, setSelectedSport] = useState<string>('Football');
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDateString(0));
  const [selectedTime, setSelectedTime] = useState<string>('18:00');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/book?sport=${selectedSport}&date=${selectedDate}&time=${selectedTime}`);
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#050b08] text-white">
      {/* ============================================================ */}
      {/* 1. LIVE ARENA STATUS TICKER                                  */}
      {/* ============================================================ */}
      <div className="pt-20 bg-[#08170f] border-b border-pitch-border text-xs font-bold uppercase tracking-wider py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-slate-300">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green"></span>
            </span>
            <span className="text-white font-extrabold">PITCH OPEN 24/7</span>
            <span className="text-emerald-500">•</span>
            <span className="text-slate-300 font-medium">Near Sirupooluvapatti, Tiruppur</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.9 / 5 (17 Google Reviews)</span>
            </span>
            <span>•</span>
            <a
              href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
              className="text-brand-electric hover:text-white transition-colors flex items-center gap-1 font-mono"
            >
              <Phone className="w-3 h-3" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. HERO SECTION: BESPOKE STADIUM BILLBOARD                   */}
      {/* ============================================================ */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden border-b border-pitch-border">
        {/* Stadium Photo Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/friends-turf-bg.jpg"
            alt="Friends Turf Sunset Arena"
            className="w-full h-full object-cover object-center scale-100 filter brightness-110 contrast-115 saturate-130"
          />
          {/* Contrast Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050b08]/50 via-[#050b08]/75 to-[#050b08]"></div>
          {/* Subtle floodlight ambient flares */}
          <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="max-w-4xl mx-auto text-center">
            {/* Real Club Badge Tag */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#06140b]/90 border border-emerald-500/40 text-white text-xs sm:text-sm font-bold uppercase tracking-wider mb-6 shadow-glow backdrop-blur-md">
              <img
                src="/images/friends-turf-logo.png"
                alt="Friends Turf Badge"
                className="w-7 h-7 object-contain rounded-md bg-white p-0.5"
              />
              <span className="text-white font-extrabold">Friends Turf Sports Arena</span>
              <span className="text-emerald-500">•</span>
              <span className="text-brand-electric">Tiruppur</span>
            </div>

            {/* Massive Hero Heading (Anton) */}
            <h1 className="font-hero text-6xl sm:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-[0.9] mb-6 drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]">
              PLAY TOGETHER.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-electric to-emerald-300 drop-shadow-[0_0_35px_rgba(34,197,94,0.5)]">
                PLAY LIKE CHAMPIONS.
              </span>
            </h1>

            {/* Ground Description */}
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-200 font-normal leading-relaxed mb-8 drop-shadow">
              Tiruppur's dedicated sports ground for <strong>5-a-side & 7-a-side Football</strong>, <strong>Box Cricket</strong>, and <strong>Shuttle Badminton</strong> under shadowless LED floodlights.
            </p>

            {/* Sport Format Selector Tabs */}
            <div className="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-[#06150c]/90 border border-pitch-border mb-10 gap-1.5 shadow-xl backdrop-blur-md">
              {[
                { label: '⚽ Football 5s / 7s', value: 'Football' },
                { label: '🏏 Box Cricket Pitch', value: 'Cricket' },
                { label: '🏸 Shuttle & Badminton', value: 'Shuttle' },
              ].map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setSelectedSport(s.value)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedSport === s.value
                      ? 'bg-brand-green text-black shadow-glow font-black scale-105'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Direct Booking Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
              <Link
                to="/book"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <span>Book Slot Online</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <a
                href={generateDirectContactWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#0d2215]/90 hover:bg-[#153422] text-white font-bold text-sm border border-emerald-500/40 shadow-xl transition-all duration-200 hover:scale-105"
              >
                <MessageSquare className="w-4 h-4 text-brand-green" />
                <span>WhatsApp Coordinator</span>
              </a>
            </div>
          </div>

          {/* ============================================================ */}
          {/* QUICK INTERACTIVE SLOT RESERVATION STRIP                     */}
          {/* ============================================================ */}
          <div className="max-w-5xl mx-auto rounded-3xl glass-dark-panel p-4 sm:p-5 border border-emerald-500/30 shadow-2xl">
            <form onSubmit={handleQuickBook} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
              {/* Date selection */}
              <div className="p-3 rounded-2xl bg-black/50 border border-pitch-border">
                <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                  Match Date
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <input
                    type="date"
                    value={selectedDate}
                    min={getTodayDateString(0)}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent text-white text-xs sm:text-sm font-bold focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Time Session */}
              <div className="p-3 rounded-2xl bg-black/50 border border-pitch-border">
                <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                  Preferred Time
                </label>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="bg-transparent text-white text-xs sm:text-sm font-bold focus:outline-none w-full cursor-pointer [color-scheme:dark]"
                  >
                    <option value="06:00" className="bg-[#080e14] text-white">6:00 AM (Morning - ₹800)</option>
                    <option value="07:00" className="bg-[#080e14] text-white">7:00 AM (Morning - ₹800)</option>
                    <option value="16:00" className="bg-[#080e14] text-white">4:00 PM (Afternoon - ₹800)</option>
                    <option value="17:00" className="bg-[#080e14] text-white">5:00 PM (Floodlit - ₹1000)</option>
                    <option value="18:00" className="bg-[#080e14] text-white">6:00 PM (Prime - ₹1000)</option>
                    <option value="19:00" className="bg-[#080e14] text-white">7:00 PM (Prime - ₹1000)</option>
                    <option value="20:00" className="bg-[#080e14] text-white">8:00 PM (Night Match - ₹1000)</option>
                    <option value="21:00" className="bg-[#080e14] text-white">9:00 PM (Night Match - ₹1000)</option>
                  </select>
                </div>
              </div>

              {/* Match Fee Indicator */}
              <div className="p-3 rounded-2xl bg-black/50 border border-pitch-border">
                <label className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider mb-1">
                  Standard Rate
                </label>
                <div className="flex items-center justify-between">
                  <span className="font-outfit font-black text-white text-lg">
                    {Number(selectedTime.split(':')[0]) >= 17 ? '₹1,000' : '₹800'}
                    <span className="text-xs font-normal text-slate-400 font-sans"> / hr</span>
                  </span>
                  <span className="text-[10px] font-bold text-brand-electric bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                    Pay at Ground
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  className="w-full py-4 px-4 rounded-2xl bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Check & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. TODAY'S LIVE MATCH SLOTS TIMELINE                         */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-brand-electric uppercase tracking-widest block mb-1">
              Live Hourly Availability
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Today’s Match Slots
            </h2>
          </div>
          <Link
            to="/book"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-electric hover:text-white uppercase tracking-wider"
          >
            <span>Open Full Calendar</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {BASE_SLOTS_CONFIG.slice(0, 6).map((slot) => (
            <Link
              key={slot.id}
              to={`/book?time=${slot.startTime}`}
              className="p-4 rounded-2xl glass-dark-card border border-pitch-border hover:border-brand-green transition-all duration-200 hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between gap-1 mb-2">
                <span className="font-outfit font-black text-lg text-white group-hover:text-brand-electric transition-colors">
                  {slot.startTime}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-glow"></span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-bold text-white">₹{slot.price}</span>
                <span className="text-[10px] font-bold text-brand-electric">Available</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. REAL ARENA HIGHLIGHTS & TECHNICAL SPECS                   */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#07130b] border-y border-pitch-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            {/* Left Column: Authentic Photo Preview */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl">
                <img
                  src="/images/friends-turf-bg.jpg"
                  alt="Friends Turf Real Ground"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 sm:bottom-6 sm:right-6 p-4 rounded-2xl bg-[#050b08]/95 border border-emerald-500/40 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-green text-black flex items-center justify-center font-black">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-outfit font-black text-white text-base block">FIFA-Spec Synthetic Grass</span>
                    <span className="text-xs text-slate-400">Regular rubber infill maintenance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Ground Specifications */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold text-brand-electric uppercase tracking-widest block mb-1">
                  Ground Infrastructure
                </span>
                <h2 className="font-outfit text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                  Built for Fast Tactical Passes & Power Hits
                </h2>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Whether you're playing 5-a-side football, high-stakes box cricket, or fast-paced badminton rallies, Friends Turf delivers a tournament-grade experience with uncompromised pitch grip and zero dark spots.
              </p>

              {/* Spec Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-pitch-border">
                  <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">High-Mast Floodlights</h4>
                    <p className="text-xs text-slate-400">Shadowless lighting across all 4 corners.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-pitch-border">
                  <Shield className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Full Net Enclosure</h4>
                    <p className="text-xs text-slate-400">High-tension top and boundary nets.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-pitch-border">
                  <Car className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Dedicated Parking</h4>
                    <p className="text-xs text-slate-400">Space for 30+ bikes and four-wheelers.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-black/40 border border-pitch-border">
                  <Users className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Dugout & Seating</h4>
                    <p className="text-xs text-slate-400">Resting benches, drinking water & drinks.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/facilities"
                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-electric hover:underline uppercase tracking-wider"
                >
                  <span>Explore All Arena Amenities</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* 5. HONEST TRANSPARENT PRICING GRID                           */}
          {/* ============================================================ */}
          <div className="rounded-3xl glass-dark-panel p-8 border border-emerald-500/30">
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-bold text-brand-electric uppercase tracking-widest block mb-1">
                Transparent Match Rates
              </span>
              <h3 className="font-outfit text-2xl sm:text-4xl font-black text-white uppercase">
                Simple Pricing • No Advance Deposit
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Day Rate */}
              <div className="p-6 rounded-2xl glass-dark-card border border-pitch-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Day Session</span>
                    <Sun className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="mb-4">
                    <span className="font-outfit text-4xl font-black text-white">₹800</span>
                    <span className="text-xs text-slate-400"> / hour</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>6:00 AM to 5:00 PM slots</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>Football & cricket friendly</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>Changing room & water included</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/book?time=07:00"
                  className="mt-6 w-full py-2.5 rounded-xl bg-pitch-card hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider text-center border border-pitch-border hover:border-brand-green transition-all"
                >
                  Book Morning Slot
                </Link>
              </div>

              {/* Prime Floodlit Night */}
              <div className="p-6 rounded-2xl glass-dark-panel border-2 border-brand-green flex flex-col justify-between shadow-glow relative">
                <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-brand-green text-black font-black text-[10px] uppercase tracking-wider">
                  Most Popular
                </div>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-electric">Floodlit Night</span>
                    <Moon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="mb-4">
                    <span className="font-outfit text-4xl font-black text-white">₹1,000</span>
                    <span className="text-xs text-slate-400"> / hour</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-200">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>5:00 PM to 11:00 PM prime hours</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>Full high-mast LED lights ON</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>Bibs & match balls available</span>
                    </li>
                  </ul>
                </div>
                <Link
                  to="/book?time=18:00"
                  className="mt-6 w-full py-3 rounded-xl bg-brand-green hover:bg-brand-electric text-black font-black text-xs uppercase tracking-wider text-center shadow-glow transition-all"
                >
                  Book Prime Night Slot
                </Link>
              </div>

              {/* Midnight / Custom Tournaments */}
              <div className="p-6 rounded-2xl glass-dark-card border border-pitch-border flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Midnight & Tournaments</span>
                    <Award className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="mb-4">
                    <span className="font-outfit text-4xl font-black text-white">₹1,000</span>
                    <span className="text-xs text-slate-400"> / hour (Custom)</span>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>11:00 PM to 2:00 AM games</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>Corporate league package</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-brand-green" />
                      <span>Full venue multi-hour setup</span>
                    </li>
                  </ul>
                </div>
                <a
                  href={generateDirectContactWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 w-full py-2.5 rounded-xl bg-pitch-card hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider text-center border border-pitch-border hover:border-brand-green transition-all"
                >
                  WhatsApp for Custom Slot
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. PHOTO GALLERY PREVIEW                                     */}
      {/* ============================================================ */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-brand-electric uppercase tracking-widest block mb-1">
              Match Photos
            </span>
            <h2 className="font-outfit text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Action at Friends Turf
            </h2>
          </div>
          <Link
            to="/gallery"
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-electric hover:text-white uppercase tracking-wider"
          >
            <span>View All 8 Photos</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_GALLERY.slice(0, 4).map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-pitch-border hover:border-brand-green shadow-card-dark transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold text-brand-electric uppercase tracking-wider block mb-1">
                  {item.category}
                </span>
                <h4 className="font-outfit text-base font-black text-white line-clamp-1 uppercase">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 7. REAL GOOGLE REVIEWS FROM LOCAL ATHLETES                   */}
      {/* ============================================================ */}
      <section className="py-20 bg-[#07130b] border-t border-pitch-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>4.9 / 5 Rating on Google Maps</span>
              </div>
              <h2 className="font-outfit text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Feedback from Tiruppur Players
              </h2>
            </div>
            <Link
              to="/reviews"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-electric hover:text-white uppercase tracking-wider"
            >
              <span>Read All Reviews</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_REVIEWS.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="p-6 rounded-2xl glass-dark-card border border-pitch-border flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 bg-pitch-card px-2.5 py-0.5 rounded-full border border-pitch-border">
                      Google Review
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                    "{review.comment}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-pitch-border">
                  <div className="w-9 h-9 rounded-full bg-pitch-card border border-pitch-border flex items-center justify-center text-brand-electric font-black text-xs">
                    {review.avatarInitials}
                  </div>
                  <div>
                    <h4 className="font-outfit font-black text-white text-sm uppercase">{review.author}</h4>
                    <p className="text-[11px] text-slate-400">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. FAST ARENA CONTACT & DIRECTIONS                           */}
      {/* ============================================================ */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-dark-panel border-2 border-emerald-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-glow">
          <div className="max-w-xl text-center lg:text-left">
            <h3 className="font-outfit text-3xl sm:text-5xl font-black text-white uppercase mb-2">
              Ready to Kick Off?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Prime evening floodlight hours book out fast on weekends. Reserve online in 60 seconds or chat with our desk on WhatsApp.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <Link
              to="/book"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all hover:scale-105 text-center"
            >
              Book Slot Online
            </Link>

            <a
              href={generateDirectContactWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wider shadow-md transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Booking</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        items={INITIAL_GALLERY}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : INITIAL_GALLERY.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < INITIAL_GALLERY.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};
