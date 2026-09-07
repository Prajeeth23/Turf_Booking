import React, { useEffect, useState } from 'react';
import { useSearchParams, useLocation, Link } from 'react-router-dom';
import { Booking } from '../types/turfTypes';
import { bookingService } from '../services/bookingService';
import { BookingTicket } from '../components/BookingTicket';
import { CheckCircle2, ArrowLeft, Search } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ConfirmationPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const bookingIdFromUrl = searchParams.get('id');
  const bookingFromState = (location.state as { booking?: Booking })?.booking;

  const [booking, setBooking] = useState<Booking | null>(bookingFromState || null);
  const [loading, setLoading] = useState<boolean>(!bookingFromState);

  useEffect(() => {
    if (!booking && bookingIdFromUrl) {
      const found = bookingService.getBookingById(bookingIdFromUrl);
      setBooking(found);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [bookingIdFromUrl, booking]);

  // Trigger celebration confetti on arrival
  useEffect(() => {
    if (booking) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#22c55e', '#4ade80', '#10b981', '#38bdf8']
        });
      } catch {
        // Safe fallback
      }
    }
  }, [booking]);

  if (loading) {
    return (
      <div className="pt-40 pb-20 min-h-screen bg-[#050b08] text-white flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-brand-green animate-spin"></div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="pt-36 pb-20 min-h-screen bg-[#050b08] text-white">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-pitch-card border border-pitch-border flex items-center justify-center text-slate-400 mx-auto mb-5 shadow-glow">
            <Search className="w-8 h-8 text-brand-green" />
          </div>
          <h2 className="font-sporty text-3xl font-black text-white uppercase mb-2">
            Booking Not Found
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            We couldn't locate this booking ticket. It might have been cleared or the ID is incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/my-booking"
              className="flex-1 py-3 rounded-xl bg-pitch-card border border-pitch-border text-white text-sm font-bold hover:border-brand-green shadow-sm transition-all"
            >
              Search My Booking
            </Link>
            <Link
              to="/book"
              className="flex-1 py-3 rounded-xl bg-brand-green hover:bg-brand-electric text-black text-sm font-black uppercase tracking-wider shadow-glow"
            >
              Book a New Slot
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050b08] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Banner */}
        <div className="text-center mb-8 no-print">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-950/80 text-brand-green mb-4 shadow-glow border border-emerald-500/40">
            <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
          </div>
          <h1 className="font-sporty text-5xl sm:text-7xl font-black text-white uppercase tracking-tight mb-2">
            Booking Confirmed 🎉
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
            Your match is locked in at <strong className="text-brand-electric font-black">Friends Turf Tiruppur</strong>. 
            A digital match receipt has been generated below.
          </p>
        </div>

        {/* Digital Ticket Pass Component */}
        <BookingTicket booking={booking} />

        {/* Navigation back to home */}
        <div className="mt-10 text-center no-print">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-brand-electric transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
