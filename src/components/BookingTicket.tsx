import React from 'react';
import { Booking } from '../types/turfTypes';
import { BUSINESS_INFO } from '../data/mockData';
import { StatusBadge } from './StatusBadge';
import { generateWhatsAppBookingLink } from '../utils/whatsapp';
import { 
  Calendar, 
  Clock, 
  Users, 
  MapPin, 
  Phone, 
  Printer, 
  MessageSquare, 
  CheckCircle2, 
  Sparkles,
  QrCode
} from 'lucide-react';

interface BookingTicketProps {
  booking: Booking;
}

export const BookingTicket: React.FC<BookingTicketProps> = ({ booking }) => {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(booking.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const whatsappLink = generateWhatsAppBookingLink({
    name: booking.customerName,
    date: formattedDate,
    time: `${booking.startTime} - ${booking.endTime}`,
    players: booking.players,
    bookingId: booking.id,
    specialRequest: booking.specialRequest,
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Digital Ticket Card */}
      <div className="relative rounded-3xl glass-dark-panel border-2 border-emerald-500/40 shadow-2xl overflow-hidden print-card text-white">
        {/* Top Header Section */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#081f12] via-[#050b08] to-[#0a150e] text-white relative border-b border-pitch-border">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/friends-turf-logo.png"
                alt="Friends Turf Logo"
                className="w-12 h-12 rounded-xl bg-white p-0.5 object-contain shadow-glow"
              />
              <div>
                <h3 className="font-sporty text-3xl font-black text-white leading-tight uppercase">
                  {BUSINESS_INFO.name}
                </h3>
                <p className="text-xs text-brand-electric font-semibold">Tiruppur, Tamil Nadu • 24/7 Ground</p>
              </div>
            </div>
            <StatusBadge status={booking.status} size="md" />
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-black/50 border border-pitch-border">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Booking ID
              </span>
              <span className="font-mono text-lg sm:text-xl font-black text-brand-electric tracking-wide">
                {booking.id}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Match Fee
              </span>
              <span className="font-sporty text-2xl sm:text-3xl font-black text-white">
                ₹{booking.amount}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Notch Cutout Separator */}
        <div className="relative flex items-center justify-between px-2 bg-[#08120c] no-print py-1">
          <div className="w-5 h-8 bg-[#050b08] rounded-r-full -ml-3 border-r-2 border-t-2 border-b-2 border-pitch-border"></div>
          <div className="flex-1 border-b-2 border-dashed border-pitch-border mx-4"></div>
          <div className="w-5 h-8 bg-[#050b08] rounded-l-full -mr-3 border-l-2 border-t-2 border-b-2 border-pitch-border"></div>
        </div>

        {/* Ticket Details Grid */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Customer info */}
            <div className="p-3.5 rounded-xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Athlete Name</span>
              <span className="font-sporty font-black text-white text-xl uppercase block">
                {booking.customerName}
              </span>
            </div>

            {/* Phone */}
            <div className="p-3.5 rounded-xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Contact Phone</span>
              <span className="font-mono font-bold text-white text-sm flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-green" />
                {booking.phone}
              </span>
            </div>

            {/* Date */}
            <div className="p-3.5 rounded-xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Match Date</span>
              <span className="font-sporty font-black text-white text-base flex items-center gap-1.5 uppercase">
                <Calendar className="w-3.5 h-3.5 text-brand-green" />
                {formattedDate}
              </span>
            </div>

            {/* Time Slot */}
            <div className="p-3.5 rounded-xl glass-dark-card border border-emerald-500/30">
              <span className="text-xs text-brand-electric font-bold uppercase tracking-wider block mb-1">Time Slot</span>
              <span className="font-sporty font-black text-brand-electric text-xl flex items-center gap-1.5 uppercase">
                <Clock className="w-3.5 h-3.5 text-brand-green" />
                {booking.startTime} – {booking.endTime}
              </span>
            </div>

            {/* Players */}
            <div className="p-3.5 rounded-xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Squad Size</span>
              <span className="font-sporty font-black text-white text-lg flex items-center gap-1.5 uppercase">
                <Users className="w-3.5 h-3.5 text-brand-green" />
                {booking.players} Players
              </span>
            </div>

            {/* Turf Venue */}
            <div className="p-3.5 rounded-xl glass-dark-card border border-pitch-border">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block mb-1">Turf Location</span>
              <span className="font-sporty font-black text-white text-sm flex items-center gap-1.5 truncate uppercase">
                <MapPin className="w-3.5 h-3.5 text-brand-green flex-shrink-0" />
                Sirupooluvapatti, Tiruppur
              </span>
            </div>
          </div>

          {/* Special Requests */}
          {booking.specialRequest && (
            <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs sm:text-sm">
              <span className="font-black text-brand-electric uppercase tracking-wider block mb-0.5">Special Kit / Note:</span>
              <p className="text-slate-300 font-normal">{booking.specialRequest}</p>
            </div>
          )}

          {/* Ticket Security Verification Box */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-pitch-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-pitch-card border border-pitch-border flex items-center justify-center text-brand-green shadow-glow">
                <QrCode className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-black text-white flex items-center gap-1 uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-green" />
                  Official Match Pass
                </span>
                <p className="text-[11px] text-slate-400">Show this pass at arena reception</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block">PASS CODE</span>
              <span className="font-mono text-xs font-black text-brand-electric">
                #{booking.id.split('-')[2] || '8842'}
              </span>
            </div>
          </div>
        </div>

        {/* Demo Booking Notice */}
        <div className="px-6 sm:px-8 py-3 bg-emerald-950/80 border-t border-emerald-500/20 text-center text-xs text-brand-electric font-black uppercase tracking-wider flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-green" />
          <span>Match Pass Verified — Pay at Ground Desk</span>
        </div>
      </div>

      {/* Action Buttons (Excluded from Print) */}
      <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 no-print">
        {/* WhatsApp Confirmation */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all hover:scale-[1.02] active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>WhatsApp Confirmation</span>
        </a>

        {/* Print / Download Button */}
        <button
          type="button"
          onClick={handlePrint}
          className="flex-1 w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl glass-dark-card hover:bg-white/10 border border-pitch-border text-white font-bold text-sm uppercase tracking-wider transition-all hover:border-brand-green shadow-sm"
        >
          <Printer className="w-4 h-4 text-brand-green" />
          <span>Print / Save Pass</span>
        </button>
      </div>
    </div>
  );
};
