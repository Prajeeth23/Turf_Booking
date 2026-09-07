import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Booking, BookingStatus, TimeSlot } from '../types/turfTypes';
import { bookingService } from '../services/bookingService';
import { StatusBadge } from '../components/StatusBadge';
import { getTodayDateString, INITIAL_REVIEWS, INITIAL_GALLERY } from '../data/mockData';
import {
  LayoutDashboard,
  CalendarDays,
  Clock,
  Search,
  CheckCircle2,
  XCircle,
  CheckCheck,
  Trash2,
  Lock,
  Unlock,
  LogOut,
  RotateCcw,
  Users,
  IndianRupee,
  Calendar,
  Menu,
  X,
  Star,
  Image as ImageIcon,
  Sliders,
  ShieldAlert
} from 'lucide-react';

type Tab = 'dashboard' | 'bookings' | 'slots' | 'reviews' | 'gallery' | 'settings';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  // Admin authentication check
  useEffect(() => {
    if (!bookingService.isAdminLoggedIn()) {
      navigate('/login');
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Bookings state
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [dateFilter, setDateFilter] = useState<string>('All');

  // Slot management state
  const [slotDate, setSlotDate] = useState<string>(getTodayDateString(0));
  const [dateSlots, setDateSlots] = useState<TimeSlot[]>([]);

  // Feedback notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = () => {
    setBookings(bookingService.getBookings());
    setDateSlots(bookingService.getSlotsForDate(slotDate));
  };

  useEffect(() => {
    loadData();
  }, [slotDate]);

  // Listen to external updates
  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener('turf_booking_updated', handleUpdate);
    window.addEventListener('turf_slot_blocked_updated', handleUpdate);
    return () => {
      window.removeEventListener('turf_booking_updated', handleUpdate);
      window.removeEventListener('turf_slot_blocked_updated', handleUpdate);
    };
  }, [slotDate]);

  // Logout
  const handleLogout = () => {
    bookingService.setAdminSession(false);
    navigate('/login');
  };

  // Status changes
  const handleStatusChange = (bookingId: string, newStatus: BookingStatus) => {
    const success = bookingService.updateBookingStatus(bookingId, newStatus);
    if (success) {
      loadData();
      showToast(`Booking ${bookingId} status updated to ${newStatus}`);
    }
  };

  // Delete booking with confirmation
  const handleDeleteBooking = (bookingId: string) => {
    if (window.confirm(`Are you sure you want to permanently delete booking ${bookingId}?`)) {
      const success = bookingService.deleteBooking(bookingId);
      if (success) {
        loadData();
        showToast(`Booking ${bookingId} deleted successfully.`);
      }
    }
  };

  // Toggle slot block for the chosen date
  const handleToggleBlock = (slotId: string, displayTime: string) => {
    const isNowBlocked = bookingService.toggleSlotBlock(slotDate, slotId);
    loadData();
    showToast(
      isNowBlocked
        ? `Slot ${displayTime} on ${slotDate} is now BLOCKED on public booking page.`
        : `Slot ${displayTime} on ${slotDate} has been UNBLOCKED.`
    );
  };

  // Reset demo data
  const handleResetData = () => {
    if (window.confirm('Reset all bookings and slots to initial demo dataset?')) {
      bookingService.resetToInitialData();
      loadData();
      showToast('Data reset to default demo records.');
    }
  };

  // Calculate dynamic stats
  const stats = useMemo(() => bookingService.getStats(), [bookings]);

  // Filtered bookings
  const filteredBookings = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return bookings.filter((b) => {
      // Search by Customer, Phone, or Booking ID
      const matchesSearch =
        !q ||
        b.customerName.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.id.toLowerCase().includes(q);

      // Status filter
      const matchesStatus = statusFilter === 'All' || b.status === statusFilter;

      // Date filter
      const today = getTodayDateString(0);
      let matchesDate = true;
      if (dateFilter === 'Today') {
        matchesDate = b.date === today;
      } else if (dateFilter === 'Upcoming') {
        matchesDate = b.date >= today;
      } else if (dateFilter === 'Past') {
        matchesDate = b.date < today;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [bookings, searchQuery, statusFilter, dateFilter]);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: CalendarDays },
    { id: 'slots', label: 'Slot Control', icon: Clock },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: Sliders },
  ];

  return (
    <div className="pt-20 pb-20 min-h-screen bg-[#050b08] text-white flex">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-brand-green text-black font-black text-xs sm:text-sm shadow-glow flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ============================================================ */}
      {/* ADMIN SIDEBAR (Desktop)                                      */}
      {/* ============================================================ */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-pitch-border bg-[#08120c] p-5 shrink-0 min-h-[calc(100vh-5rem)] shadow-2xl">
        {/* Admin Header */}
        <div className="p-3.5 mb-6 rounded-2xl bg-black/40 border border-pitch-border flex items-center gap-3">
          <img src="/images/friends-turf-logo.png" alt="Friends Turf Logo" className="w-9 h-9 object-contain rounded-lg bg-white p-0.5" />
          <div>
            <h4 className="font-sporty font-black text-white text-base uppercase">Arena Desk</h4>
            <span className="text-[10px] text-brand-electric font-extrabold uppercase tracking-wider block">
              Friends Turf Tiruppur
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id as Tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all ${
                  active
                    ? 'bg-brand-green text-black shadow-glow font-black'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-black' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Reset Demo button */}
        <div className="pt-4 border-t border-pitch-border space-y-2">
          <button
            type="button"
            onClick={handleResetData}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-black/40 hover:bg-white/5 text-xs text-slate-300 font-bold transition-all border border-pitch-border"
            title="Reload default seed data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/40 text-xs text-rose-300 font-black transition-all uppercase tracking-wider"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ============================================================ */}
      {/* MAIN CONTENT AREA                                            */}
      {/* ============================================================ */}
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 max-w-7xl w-full">
        {/* Top Mobile Bar */}
        <div className="lg:hidden flex items-center justify-between mb-6 p-4 rounded-2xl glass-dark-panel border border-pitch-border shadow-sm">
          <div className="flex items-center gap-2">
            <img src="/images/friends-turf-logo.png" alt="Logo" className="w-6 h-6 object-contain rounded bg-white p-0.5" />
            <span className="font-sporty font-black text-white text-lg uppercase">Arena Admin</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-black/40 text-white border border-pitch-border"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu dropdown */}
        {mobileSidebarOpen && (
          <div className="lg:hidden mb-6 p-4 rounded-2xl glass-dark-panel border border-pitch-border space-y-2 shadow-2xl">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as Tab);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider ${
                  activeTab === item.id ? 'bg-brand-green text-black font-black' : 'text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-rose-400"
            >
              Sign Out
            </button>
          </div>
        )}

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div>
              <h1 className="font-sporty text-4xl sm:text-5xl font-black text-white uppercase">
                Dashboard Overview
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Live metrics and booking volume for Friends Turf Arena Tiruppur.
              </p>
            </div>

            {/* KPI CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Today's Bookings */}
              <div className="p-5 sm:p-6 rounded-3xl glass-dark-card border border-pitch-border flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Today's Matches
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-pitch-card border border-pitch-border text-brand-green flex items-center justify-center">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="font-sporty text-4xl sm:text-5xl font-black text-white">
                    {stats.todayBookingsCount}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1 font-medium">Matches scheduled today</span>
                </div>
              </div>

              {/* Upcoming Bookings */}
              <div className="p-5 sm:p-6 rounded-3xl glass-dark-card border border-pitch-border flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Upcoming Matches
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-pitch-card border border-pitch-border text-emerald-400 flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="font-sporty text-4xl sm:text-5xl font-black text-white">
                    {stats.upcomingBookingsCount}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1 font-medium">Confirmed forward slots</span>
                </div>
              </div>

              {/* Available Slots Today */}
              <div className="p-5 sm:p-6 rounded-3xl glass-dark-card border border-pitch-border flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                    Available Slots
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-pitch-card border border-pitch-border text-blue-400 flex items-center justify-center">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="font-sporty text-4xl sm:text-5xl font-black text-white">
                    {stats.availableSlotsCount}
                  </span>
                  <span className="text-xs text-slate-400 block mt-1 font-medium">Free today out of 12</span>
                </div>
              </div>

              {/* Total Revenue */}
              <div className="p-5 sm:p-6 rounded-3xl glass-dark-panel border-2 border-emerald-500/30 flex flex-col justify-between shadow-glow">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-electric">
                    Total Revenue
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-brand-green text-black flex items-center justify-center shadow-sm">
                    <IndianRupee className="w-5 h-5 stroke-[2.5]" />
                  </div>
                </div>
                <div>
                  <span className="font-sporty text-4xl sm:text-5xl font-black text-white">
                    ₹{stats.totalRevenue.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-brand-electric font-bold block mt-1">From active & completed matches</span>
                </div>
              </div>
            </div>

            {/* Quick Actions & Recent Bookings Preview */}
            <div className="p-6 sm:p-8 rounded-3xl glass-dark-panel border-2 border-emerald-500/20 shadow-2xl">
              <div className="flex items-center justify-between gap-2 mb-6">
                <div>
                  <h2 className="font-sporty text-2xl sm:text-3xl font-black text-white uppercase">
                    Recent Bookings Activity
                  </h2>
                  <p className="text-xs text-slate-400 font-medium">Latest reservations made by local players</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className="text-xs font-black text-brand-electric hover:underline uppercase"
                >
                  Manage All →
                </button>
              </div>

              <div className="space-y-3">
                {bookings.slice(0, 5).map((b) => (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl bg-black/40 border border-pitch-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-sporty font-black text-white text-lg uppercase">{b.customerName}</span>
                        <StatusBadge status={b.status} size="sm" />
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-semibold">
                        <span>{b.date}</span>
                        <span>•</span>
                        <span className="text-brand-electric font-bold">{b.startTime} - {b.endTime}</span>
                        <span>•</span>
                        <span>{b.players} Players</span>
                        <span>•</span>
                        <span className="font-mono text-slate-500">{b.id}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <span className="font-sporty text-2xl font-black text-white">₹{b.amount}</span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('bookings')}
                        className="px-3 py-1.5 rounded-lg bg-pitch-card border border-pitch-border text-xs font-black uppercase text-slate-300 hover:text-white hover:border-brand-green"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKING MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-sporty text-4xl sm:text-5xl font-black text-white uppercase">
                  Booking Management
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  Search, filter, approve, cancel, or complete match bookings.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-400">
                Total: <strong className="text-brand-electric font-black">{filteredBookings.length}</strong> bookings shown
              </span>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 rounded-2xl glass-dark-panel border border-pitch-border flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search athlete, phone, or booking ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/50 border border-pitch-border text-white text-xs sm:text-sm focus:border-brand-green focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
                {['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all ${
                      statusFilter === st
                        ? 'bg-brand-green text-black font-black'
                        : 'glass-dark-card text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Date Filter */}
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-3 py-2 rounded-xl bg-black/50 border border-pitch-border text-white text-xs font-bold focus:outline-none cursor-pointer [color-scheme:dark]"
              >
                <option value="All" className="bg-[#080e14] text-white">All Dates</option>
                <option value="Today" className="bg-[#080e14] text-white">Today Only</option>
                <option value="Upcoming" className="bg-[#080e14] text-white">Upcoming Only</option>
                <option value="Past" className="bg-[#080e14] text-white">Past Dates</option>
              </select>
            </div>

            {/* Bookings Table */}
            {filteredBookings.length === 0 ? (
              <div className="p-12 text-center rounded-3xl glass-dark-panel border border-pitch-border">
                <Calendar className="w-10 h-10 text-slate-500 mx-auto mb-3" />
                <h4 className="font-sporty text-2xl font-black text-white uppercase">No Bookings Found</h4>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your search query or filters.</p>
              </div>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-hidden rounded-3xl glass-dark-panel border-2 border-emerald-500/20 shadow-2xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-black/60 text-slate-400 uppercase tracking-wider font-black border-b border-pitch-border">
                        <tr>
                          <th className="py-3.5 px-4">Booking ID</th>
                          <th className="py-3.5 px-4">Customer</th>
                          <th className="py-3.5 px-4">Phone</th>
                          <th className="py-3.5 px-4">Date</th>
                          <th className="py-3.5 px-4">Time Slot</th>
                          <th className="py-3.5 px-4">Squad</th>
                          <th className="py-3.5 px-4">Amount</th>
                          <th className="py-3.5 px-4">Status</th>
                          <th className="py-3.5 px-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-pitch-border text-slate-300 font-semibold">
                        {filteredBookings.map((b) => (
                          <tr key={b.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-mono font-bold text-brand-electric">
                              {b.id}
                            </td>
                            <td className="py-4 px-4 font-sporty font-black text-white text-base uppercase">
                              {b.customerName}
                              {b.specialRequest && (
                                <span className="block text-[10px] text-amber-400 font-sans font-normal truncate max-w-[150px]">
                                  Note: {b.specialRequest}
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4 font-mono">{b.phone}</td>
                            <td className="py-4 px-4 whitespace-nowrap">{b.date}</td>
                            <td className="py-4 px-4 font-black text-brand-electric whitespace-nowrap">
                              {b.startTime} - {b.endTime}
                            </td>
                            <td className="py-4 px-4">{b.players}</td>
                            <td className="py-4 px-4 font-sporty font-black text-white text-base">₹{b.amount}</td>
                            <td className="py-4 px-4">
                              <StatusBadge status={b.status} size="sm" />
                            </td>
                            <td className="py-4 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                {b.status !== 'Confirmed' && (
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(b.id, 'Confirmed')}
                                    className="p-1.5 rounded-lg bg-emerald-950/80 text-brand-electric hover:bg-emerald-900 border border-emerald-500/40"
                                    title="Confirm Booking"
                                  >
                                    <CheckCircle2 className="w-4 h-4" />
                                  </button>
                                )}
                                {b.status !== 'Completed' && (
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(b.id, 'Completed')}
                                    className="p-1.5 rounded-lg bg-blue-950/80 text-blue-300 hover:bg-blue-900 border border-blue-500/40"
                                    title="Mark Completed"
                                  >
                                    <CheckCheck className="w-4 h-4" />
                                  </button>
                                )}
                                {b.status !== 'Cancelled' && (
                                  <button
                                    type="button"
                                    onClick={() => handleStatusChange(b.id, 'Cancelled')}
                                    className="p-1.5 rounded-lg bg-amber-950/80 text-amber-300 hover:bg-amber-900 border border-amber-500/40"
                                    title="Cancel Booking"
                                  >
                                    <XCircle className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleDeleteBooking(b.id)}
                                  className="p-1.5 rounded-lg bg-rose-950/80 text-rose-300 hover:bg-rose-900 border border-rose-500/40"
                                  title="Delete Booking"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* TAB 3: SLOT MANAGEMENT & BLOCKING */}
        {activeTab === 'slots' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-sporty text-4xl sm:text-5xl font-black text-white uppercase">
                  Slot Control & Pitch Blocker
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 font-medium">
                  Block specific hours for arena maintenance or private tournaments.
                </p>
              </div>

              {/* Date selector */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Date:</span>
                <input
                  type="date"
                  value={slotDate}
                  min={getTodayDateString(0)}
                  onChange={(e) => setSlotDate(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-black/60 border border-pitch-border text-white text-xs font-bold focus:outline-none shadow-sm cursor-pointer [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Legend info callout */}
            <div className="p-4 rounded-2xl glass-dark-panel border border-pitch-border flex flex-wrap items-center justify-between gap-4 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-slate-300 font-medium">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Click <strong>Block</strong> or <strong>Unblock</strong> to immediately toggle slot availability.</span>
              </div>
              <div className="flex items-center gap-3 font-bold">
                <span className="text-brand-electric">● Available</span>
                <span className="text-amber-400">● Blocked</span>
                <span className="text-slate-500">● Booked</span>
              </div>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dateSlots.map((slot) => {
                const isBlocked = slot.state === 'BLOCKED';
                const isBooked = slot.state === 'BOOKED';

                return (
                  <div
                    key={slot.id}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between min-h-[120px] ${
                      isBlocked
                        ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                        : isBooked
                        ? 'bg-black/40 border-pitch-border text-slate-500 opacity-70'
                        : 'glass-dark-card border-pitch-border hover:border-brand-green text-white shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-sporty font-black text-xl uppercase">{slot.displayTime}</span>
                        <span className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full ${
                          isBlocked
                            ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                            : isBooked
                            ? 'bg-black/60 text-slate-400'
                            : 'bg-emerald-950/80 text-brand-electric border border-emerald-500/30'
                        }`}>
                          {slot.state}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-4">
                        <span>Rate: ₹{slot.price}</span>
                        <span>{slot.isNight ? 'Floodlit Night' : 'Day Session'}</span>
                      </div>
                    </div>

                    {/* Action toggle button */}
                    <div>
                      {isBooked ? (
                        <div className="text-xs text-slate-500 italic flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5" />
                          <span>Booked by athlete</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleToggleBlock(slot.id, slot.displayTime)}
                          className={`w-full py-2 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                            isBlocked
                              ? 'bg-brand-green hover:bg-brand-electric text-black shadow-glow'
                              : 'bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 border border-amber-500/40'
                          }`}
                        >
                          {isBlocked ? (
                            <>
                              <Unlock className="w-3.5 h-3.5" />
                              <span>Unblock Slot</span>
                            </>
                          ) : (
                            <>
                              <Lock className="w-3.5 h-3.5" />
                              <span>Block Slot</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: REVIEWS */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-sporty text-4xl sm:text-5xl font-black text-white uppercase">
                Google Reviews ({INITIAL_REVIEWS.length})
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Verified customer testimonials synced with Google Business Profile.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INITIAL_REVIEWS.map((rev) => (
                <div key={rev.id} className="p-5 rounded-2xl glass-dark-card border border-pitch-border space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-pitch-card border border-pitch-border text-brand-electric font-black text-xs flex items-center justify-center">
                        {rev.avatarInitials}
                      </div>
                      <span className="font-sporty font-black text-white text-base uppercase">{rev.author}</span>
                    </div>
                    <span className="text-xs text-amber-400 font-bold">★ {rev.rating}</span>
                  </div>
                  <p className="text-xs text-slate-300 italic font-normal">"{rev.comment}"</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-pitch-border">
                    <span>{rev.date}</span>
                    <span className="text-brand-electric font-bold">Google Verified</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div>
              <h1 className="font-sporty text-4xl sm:text-5xl font-black text-white uppercase">
                Gallery Assets ({INITIAL_GALLERY.length})
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Media library showing synthetic turf and night tournament shots.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {INITIAL_GALLERY.map((img) => (
                <div key={img.id} className="rounded-2xl overflow-hidden glass-dark-card border border-pitch-border shadow-sm group">
                  <div className="h-32 overflow-hidden relative">
                    <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-brand-electric font-black uppercase">
                      {img.category}
                    </span>
                  </div>
                  <div className="p-3">
                    <h5 className="font-sporty font-black text-white text-sm uppercase truncate">{img.title}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-xl space-y-6">
            <div>
              <h1 className="font-sporty text-4xl sm:text-5xl font-black text-white uppercase">
                System & Demo Settings
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Manage local mock data and demo options for testing.
              </p>
            </div>

            <div className="p-6 rounded-3xl glass-dark-panel border-2 border-emerald-500/20 shadow-2xl space-y-6">
              <div className="space-y-2">
                <h4 className="font-sporty font-black text-white text-xl uppercase">Reset Demo Data</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Restores the realistic initial booking list and sample blocked tournament slot.
                </p>
                <button
                  type="button"
                  onClick={handleResetData}
                  className="px-5 py-2.5 rounded-xl bg-brand-green hover:bg-brand-electric text-black font-black text-xs uppercase tracking-wider shadow-glow"
                >
                  Reset to Default Demo Data
                </button>
              </div>

              <div className="pt-4 border-t border-pitch-border space-y-2">
                <h4 className="font-sporty font-black text-rose-400 text-xl uppercase">Clear All Storage</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Removes all bookings and blocked slots stored in your browser's localStorage.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Wipe all local storage bookings?')) {
                      bookingService.clearDemoData();
                      loadData();
                      showToast('Local storage cleared.');
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-rose-950/60 text-rose-300 border border-rose-500/40 font-black text-xs uppercase tracking-wider hover:bg-rose-900"
                >
                  Wipe Local Data
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
