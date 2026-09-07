import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { TimeSlot } from '../types/turfTypes';
import { bookingService } from '../services/bookingService';
import { SlotCard } from '../components/SlotCard';
import { getTodayDateString } from '../data/mockData';
import { generateWhatsAppBookingLink } from '../utils/whatsapp';
import { 
  Calendar, 
  Check, 
  Sparkles, 
  MessageSquare, 
  AlertCircle,
  Zap,
  Info
} from 'lucide-react';

export const BookingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected date from search param or default today
  const initialDate = searchParams.get('date') || getTodayDateString(0);
  const [selectedDate, setSelectedDate] = useState<string>(initialDate);

  // Slots for the selected date
  const [slots, setSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);

  // Form inputs
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [players, setPlayers] = useState<number>(Number(searchParams.get('players')) || 10);
  const [specialRequest, setSpecialRequest] = useState<string>('');

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Reload slots when selectedDate changes or when storage changes
  const reloadSlots = () => {
    const computedSlots = bookingService.getSlotsForDate(selectedDate);
    setSlots(computedSlots);

    // If currently selected slot is now booked or blocked on this date, reset selection
    if (selectedSlot) {
      const refreshed = computedSlots.find(s => s.id === selectedSlot.id);
      if (!refreshed || refreshed.state !== 'AVAILABLE') {
        setSelectedSlot(null);
      }
    }
  };

  useEffect(() => {
    reloadSlots();
  }, [selectedDate]);

  // Listen to cross-tab updates or admin updates
  useEffect(() => {
    const handleUpdate = () => reloadSlots();
    window.addEventListener('turf_booking_updated', handleUpdate);
    window.addEventListener('turf_slot_blocked_updated', handleUpdate);
    return () => {
      window.removeEventListener('turf_booking_updated', handleUpdate);
      window.removeEventListener('turf_slot_blocked_updated', handleUpdate);
    };
  }, [selectedDate]);

  // Date Quick Chips calculation
  const quickDateChips = useMemo(() => {
    const today = new Date();
    const chips = [];

    // 1. Today
    chips.push({
      label: 'Today',
      date: getTodayDateString(0),
      subtitle: today.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
    });

    // 2. Tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    chips.push({
      label: 'Tomorrow',
      date: getTodayDateString(1),
      subtitle: tomorrow.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
    });

    // 3. Coming Saturday
    const sat = new Date();
    const daysUntilSat = (6 - sat.getDay() + 7) % 7 || 7;
    sat.setDate(sat.getDate() + daysUntilSat);
    const satStr = `${sat.getFullYear()}-${String(sat.getMonth() + 1).padStart(2, '0')}-${String(sat.getDate()).padStart(2, '0')}`;
    chips.push({
      label: 'Saturday',
      date: satStr,
      subtitle: sat.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
    });

    // 4. Coming Sunday
    const sun = new Date();
    const daysUntilSun = (7 - sun.getDay() + 7) % 7 || 7;
    sun.setDate(sun.getDate() + daysUntilSun);
    const sunStr = `${sun.getFullYear()}-${String(sun.getMonth() + 1).padStart(2, '0')}-${String(sun.getDate()).padStart(2, '0')}`;
    chips.push({
      label: 'Sunday',
      date: sunStr,
      subtitle: sun.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
    });

    return chips;
  }, []);

  // Validation
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!customerName.trim()) {
      newErrors.customerName = 'Full Name is required.';
    } else if (customerName.trim().length < 3) {
      newErrors.customerName = 'Name must be at least 3 characters.';
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Phone number is required.';
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (!selectedSlot) {
      newErrors.slot = 'Please select an available time slot.';
    }

    if (players < 2 || players > 20) {
      newErrors.players = 'Player squad must be between 2 and 20 players.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Confirm booking handler
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !selectedSlot) return;

    setIsSubmitting(true);

    // Call service
    const result = bookingService.createBooking({
      customerName,
      phone,
      players,
      date: selectedDate,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
      amount: selectedSlot.price,
      specialRequest,
    });

    if (!result.success || !result.booking) {
      setIsSubmitting(false);
      setErrors({ form: result.error || 'Failed to complete booking. Slot may have been taken.' });
      return;
    }

    // Trigger victory confetti
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#4ade80', '#10b981', '#ffffff']
      });
    } catch {
      // Ignore if confetti fails in some environments
    }

    // Navigate to confirmation ticket page
    navigate(`/confirmation?id=${result.booking.id}`, { state: { booking: result.booking } });
  };

  // Fast WhatsApp booking helper
  const handleWhatsAppBooking = () => {
    if (!customerName.trim()) {
      setErrors((prev) => ({ ...prev, customerName: 'Please enter your name for the WhatsApp message' }));
      return;
    }
    if (!selectedSlot) {
      setErrors((prev) => ({ ...prev, slot: 'Please select a time slot for your WhatsApp booking' }));
      return;
    }

    const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const link = generateWhatsAppBookingLink({
      name: customerName,
      date: formattedDate,
      time: selectedSlot.displayTime,
      players,
      specialRequest,
    });

    window.open(link, '_blank');
  };

  const calculatedAmount = selectedSlot ? selectedSlot.price : 1000;

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#050b08] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-brand-electric text-xs font-black uppercase tracking-wider mb-3 shadow-glow">
            <Zap className="w-3.5 h-3.5 text-brand-green" />
            <span>Fast Instant Booking</span>
          </div>
          <h1 className="font-sporty text-5xl sm:text-7xl font-black text-white uppercase tracking-tight mb-3">
            Reserve Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-300">Turf Slot</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Select your match date and preferred time slot. No advance payment required for reservation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ============================================================ */}
          {/* LEFT: STEP 1 (Date) & STEP 2 (Slot Picker)                  */}
          {/* ============================================================ */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            {/* STEP 1: DATE PICKER */}
            <div className="p-6 sm:p-8 rounded-3xl glass-dark-panel border-2 border-emerald-500/20 shadow-2xl">
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-green text-black font-black text-sm flex items-center justify-center shadow-glow">
                    1
                  </div>
                  <h2 className="font-sporty text-2xl sm:text-3xl font-black text-white uppercase">
                    Select Date
                  </h2>
                </div>
                <span className="text-xs text-brand-electric font-extrabold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider">Step 1 of 3</span>
              </div>

              {/* Quick Date Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {quickDateChips.map((chip) => {
                  const isCurrent = selectedDate === chip.date;
                  return (
                    <button
                      key={chip.label}
                      type="button"
                      onClick={() => setSelectedDate(chip.date)}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        isCurrent
                          ? 'bg-brand-green text-black border-brand-electric shadow-glow font-black scale-[1.02]'
                          : 'glass-dark-card hover:bg-[#0d2015] text-slate-300 border-pitch-border hover:border-brand-green/40'
                      }`}
                    >
                      <span className={`text-xs uppercase tracking-wider block font-black ${isCurrent ? 'text-black' : 'text-brand-electric'}`}>
                        {chip.label}
                      </span>
                      <span className={`text-sm font-bold block ${isCurrent ? 'text-black' : 'text-white'}`}>
                        {chip.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Date Input */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-black/40 border border-pitch-border">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-5 h-5 text-brand-green" />
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Need another match date?</span>
                    <span className="text-sm font-bold text-white">Choose custom calendar date</span>
                  </div>
                </div>
                <input
                  type="date"
                  value={selectedDate}
                  min={getTodayDateString(0)}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 rounded-xl bg-black/60 border border-pitch-border text-white text-sm font-bold focus:border-brand-green focus:outline-none shadow-sm cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            {/* STEP 2: TIME SLOTS */}
            <div className="p-6 sm:p-8 rounded-3xl glass-dark-panel border-2 border-emerald-500/20 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-green text-black font-black text-sm flex items-center justify-center shadow-glow">
                    2
                  </div>
                  <div>
                    <h2 className="font-sporty text-2xl sm:text-3xl font-black text-white uppercase">
                      Select Time Slot
                    </h2>
                    <p className="text-xs text-slate-400 font-medium">
                      Day: ₹800/hr (6 AM–4:59 PM) • Night: ₹1000/hr (5 PM–10 PM)
                    </p>
                  </div>
                </div>

                {/* State Legend */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full border border-brand-green bg-pitch-card"></span>
                    Available
                  </span>
                  <span className="flex items-center gap-1.5 text-brand-electric">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-glow"></span>
                    Selected
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700"></span>
                    Booked
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Blocked
                  </span>
                </div>
              </div>

              {/* Slot Validation Warning */}
              {errors.slot && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500 text-rose-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                  <span>{errors.slot}</span>
                </div>
              )}

              {/* Time Slots Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {slots.map((slot) => (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedSlot?.id === slot.id}
                    onSelect={(s) => {
                      setSelectedSlot(s);
                      setErrors((prev) => ({ ...prev, slot: '' }));
                    }}
                  />
                ))}
              </div>

              {/* Selected Slot Summary Callout */}
              {selectedSlot ? (
                <div className="mt-6 p-4 rounded-2xl glass-dark-card border-2 border-brand-green flex items-center justify-between gap-4 shadow-glow">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-green text-black flex items-center justify-center font-bold">
                      <Check className="w-5 h-5 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-xs text-brand-electric font-black uppercase tracking-wider block">
                        Selected Slot
                      </span>
                      <span className="font-sporty text-xl sm:text-2xl font-black text-white uppercase">
                        {selectedSlot.displayTime}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block font-semibold uppercase">Rate</span>
                    <span className="font-sporty text-2xl font-black text-brand-electric">
                      ₹{selectedSlot.price}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-pitch-border flex items-center gap-3 text-slate-400 text-xs font-medium">
                  <Info className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span>Click on any available slot above to proceed with your booking.</span>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT: STEP 3 (Customer Form & Price Breakdown)             */}
          {/* ============================================================ */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            <form onSubmit={handleConfirmBooking} className="p-6 sm:p-7 rounded-3xl glass-dark-panel border-2 border-emerald-500/25 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-brand-green text-black font-black text-sm flex items-center justify-center shadow-glow">
                  3
                </div>
                <h2 className="font-sporty text-2xl sm:text-3xl font-black text-white uppercase">
                  Player Details
                </h2>
              </div>

              {errors.form && (
                <div className="mb-4 p-3 rounded-xl bg-rose-950/40 border border-rose-500 text-rose-300 text-xs font-bold">
                  {errors.form}
                </div>
              )}

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Karthikeyan"
                    value={customerName}
                    onChange={(e) => {
                      setCustomerName(e.target.value);
                      if (errors.customerName) setErrors((prev) => ({ ...prev, customerName: '' }));
                    }}
                    className={`w-full px-4 py-3 rounded-xl bg-black/50 border ${
                      errors.customerName ? 'border-rose-500' : 'border-pitch-border focus:border-brand-green'
                    } text-white text-sm font-semibold focus:outline-none transition-colors`}
                  />
                  {errors.customerName && (
                    <p className="mt-1 text-xs text-rose-400 font-bold">{errors.customerName}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Phone Number (10 Digits) *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 text-sm text-slate-400 font-bold">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setPhone(val);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl bg-black/50 border ${
                        errors.phone ? 'border-rose-500' : 'border-pitch-border focus:border-brand-green'
                      } text-white text-sm font-bold focus:outline-none transition-colors font-mono`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-xs text-rose-400 font-bold">{errors.phone}</p>
                  )}
                </div>

                {/* Number of Players */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Squad Size
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[6, 10, 12, 14].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setPlayers(num)}
                        className={`py-2 rounded-xl text-xs font-black border transition-all ${
                          players === num
                            ? 'bg-brand-green text-black border-brand-electric shadow-glow'
                            : 'glass-dark-card text-slate-300 border-pitch-border hover:border-brand-green/40'
                        }`}
                      >
                        {num} Players
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                    Special Request (Optional)
                  </label>
                  <select
                    value={specialRequest}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-pitch-border text-slate-200 text-xs sm:text-sm font-semibold focus:border-brand-green focus:outline-none mb-2 [color-scheme:dark]"
                  >
                    <option value="" className="bg-[#080e14] text-white">No special request</option>
                    <option value="Need Football (Size 5)" className="bg-[#080e14] text-white">Football (Size 5)</option>
                    <option value="Need 2 Sets of Colored Bibs" className="bg-[#080e14] text-white">Team Bibs (2 colors)</option>
                    <option value="Box Cricket Bat & Balls" className="bg-[#080e14] text-white">Box Cricket Kit</option>
                    <option value="Tournament Setup / Match Recording" className="bg-[#080e14] text-white">Tournament Setup</option>
                    <option value="Birthday Game / Celebration" className="bg-[#080e14] text-white">Birthday Game</option>
                    <option value="Corporate Friendly Match" className="bg-[#080e14] text-white">Corporate Match</option>
                  </select>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 pt-5 border-t border-pitch-border space-y-2.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Base Price ({selectedSlot?.isNight ? 'Night / Floodlit' : 'Day Session'})</span>
                  <span className="font-bold text-white">₹{calculatedAmount}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Advance Required</span>
                  <span className="font-bold text-brand-electric">₹0 (Pay at ground)</span>
                </div>
                <div className="pt-2 border-t border-pitch-border flex items-center justify-between text-sm sm:text-base font-bold text-white">
                  <span>Total Amount</span>
                  <span className="font-sporty text-3xl text-brand-electric font-black">
                    ₹{calculatedAmount}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-center text-[11px] text-brand-electric font-bold flex items-center justify-center gap-1.5 shadow-glow">
                  <Sparkles className="w-3.5 h-3.5 text-brand-green" />
                  <span>Instant Confirmation & WhatsApp Pass</span>
                </div>
              </div>

              {/* Confirm Booking CTA */}
              <div className="mt-6 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                </button>

                {/* Direct WhatsApp Booking button */}
                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  className="w-full py-3 rounded-2xl bg-black/40 hover:bg-[#0d2015] border border-emerald-500/40 text-emerald-300 font-extrabold text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-wider"
                >
                  <MessageSquare className="w-4 h-4 text-brand-green" />
                  <span>Book via WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
