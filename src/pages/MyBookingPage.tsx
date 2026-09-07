import React, { useState } from 'react';
import { Booking } from '../types/turfTypes';
import { bookingService } from '../services/bookingService';
import { BookingTicket } from '../components/BookingTicket';
import { Search, Calendar, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MyBookingPage: React.FC = () => {
  const [bookingId, setBookingId] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [searched, setSearched] = useState<boolean>(false);
  const [result, setResult] = useState<Booking | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);

    const cleanId = bookingId.trim();
    const cleanPhone = phone.trim();

    if (!cleanId) {
      setError('Please enter your Booking ID (e.g., FT-20260907-8842).');
      return;
    }
    if (!cleanPhone) {
      setError('Please enter your 10-digit registered phone number.');
      return;
    }

    const booking = bookingService.findBooking(cleanId, cleanPhone);
    setSearched(true);
    if (booking) {
      setResult(booking);
    }
  };

  // Quick helper to auto-fill sample booking
  const handleFillDemo = () => {
    const all = bookingService.getBookings();
    if (all.length > 0) {
      setBookingId(all[0].id);
      setPhone(all[0].phone);
      setError('');
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050b08] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-brand-electric text-xs font-black uppercase tracking-wider mb-3 shadow-glow">
            <Search className="w-3.5 h-3.5 text-brand-green" />
            <span>Pass Verification & Tracking</span>
          </div>
          <h1 className="font-sporty text-5xl sm:text-7xl font-black text-white uppercase tracking-tight mb-3">
            Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-300">Booking</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Enter your Booking ID and mobile number to view, print, or share your digital match ticket.
          </p>
        </div>

        {/* Lookup Card */}
        <div className="max-w-xl mx-auto p-6 sm:p-8 rounded-3xl glass-dark-panel border-2 border-emerald-500/25 shadow-2xl mb-12">
          <form onSubmit={handleSearch} className="space-y-4">
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500 text-rose-300 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                Booking ID
              </label>
              <input
                type="text"
                placeholder="FT-20260907-XXXX"
                value={bookingId}
                onChange={(e) => setBookingId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-pitch-border focus:border-brand-green text-white text-sm uppercase tracking-wider font-mono focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-sm text-slate-400 font-bold">+91</span>
                <input
                  type="tel"
                  maxLength={10}
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border border-pitch-border focus:border-brand-green text-white text-sm font-mono focus:outline-none transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all hover:scale-[1.02] active:scale-95"
            >
              Retrieve Ticket
            </button>

            {/* Quick demo autofill helper */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleFillDemo}
                className="text-xs text-brand-electric hover:text-white inline-flex items-center gap-1.5 font-bold transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                <span>Fill with demo booking for quick test</span>
              </button>
            </div>
          </form>
        </div>

        {/* Results Area */}
        {searched && (
          <div>
            {result ? (
              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-electric bg-emerald-950/80 px-3.5 py-1 rounded-full border border-emerald-500/30 shadow-glow">
                    Match Found
                  </span>
                </div>
                <BookingTicket booking={result} />
              </div>
            ) : (
              <div className="max-w-md mx-auto p-8 rounded-3xl glass-dark-panel border-2 border-emerald-500/25 shadow-2xl text-center">
                <div className="w-14 h-14 rounded-2xl bg-pitch-card border border-pitch-border flex items-center justify-center text-slate-400 mx-auto mb-4">
                  <Calendar className="w-7 h-7" />
                </div>
                <h3 className="font-sporty text-2xl font-black text-white uppercase mb-2">
                  No Booking Found
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                  We couldn't find an active reservation matching ID <strong>{bookingId}</strong> and phone <strong>{phone}</strong>. Please verify your inputs or reserve a slot.
                </p>
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow hover:scale-105 transition-all"
                >
                  <span>Book a Slot Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
