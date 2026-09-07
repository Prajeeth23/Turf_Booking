import { Booking, BookingStatus, TimeSlot, AdminStats } from '../types/turfTypes';
import { BASE_SLOTS_CONFIG, INITIAL_BOOKINGS, getTodayDateString } from '../data/mockData';
import { generateBookingId } from '../utils/bookingId';

const STORAGE_KEYS = {
  BOOKINGS: 'friends_turf_bookings',
  BLOCKED_SLOTS: 'friends_turf_blocked_slots',
  ADMIN_SESSION: 'friends_turf_admin_session',
};

// Blocked slots format: { [date: string]: string[] } -> maps YYYY-MM-DD to array of slotIds (e.g. ['19-20'])
type BlockedSlotsMap = Record<string, string[]>;

export const bookingService = {
  // Initialize seed data if not present
  init(): void {
    if (!localStorage.getItem(STORAGE_KEYS.BOOKINGS)) {
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.BLOCKED_SLOTS)) {
      // Seed a sample blocked slot for tomorrow evening tournament prep
      const sampleBlocked: BlockedSlotsMap = {
        [getTodayDateString(1)]: ['21-22'], // 9 PM - 10 PM blocked tomorrow
      };
      localStorage.setItem(STORAGE_KEYS.BLOCKED_SLOTS, JSON.stringify(sampleBlocked));
    }
  },

  // Get all bookings
  getBookings(): Booking[] {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return INITIAL_BOOKINGS;
    }
  },

  // Get a single booking by ID
  getBookingById(id: string): Booking | null {
    const bookings = this.getBookings();
    return bookings.find(b => b.id.trim().toUpperCase() === id.trim().toUpperCase()) || null;
  },

  // Find booking by ID and Phone number (for My Booking page)
  findBooking(bookingId: string, phone: string): Booking | null {
    const cleanId = bookingId.trim().toUpperCase();
    const cleanPhone = phone.trim().replace(/\D/g, '');
    const bookings = this.getBookings();

    return bookings.find(b => {
      const bPhone = b.phone.replace(/\D/g, '');
      return b.id.toUpperCase() === cleanId && bPhone.endsWith(cleanPhone.slice(-10));
    }) || null;
  },

  // Get blocked slots map
  getBlockedSlotsMap(): BlockedSlotsMap {
    this.init();
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BLOCKED_SLOTS);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  },

  // Get computed slots for a specific date
  getSlotsForDate(date: string): TimeSlot[] {
    const bookings = this.getBookings();
    const blockedMap = this.getBlockedSlotsMap();
    const blockedForDate = blockedMap[date] || [];

    // Filter active bookings on that date
    const dateBookings = bookings.filter(
      b => b.date === date && (b.status === 'Confirmed' || b.status === 'Pending')
    );

    return BASE_SLOTS_CONFIG.map(slot => {
      const isBlocked = blockedForDate.includes(slot.id);
      const isBooked = dateBookings.some(b => {
        // Match either slot id or matching start time
        return b.startTime === slot.startTime;
      });

      let state: TimeSlot['state'] = 'AVAILABLE';
      if (isBlocked) {
        state = 'BLOCKED';
      } else if (isBooked) {
        state = 'BOOKED';
      }

      return {
        ...slot,
        state,
      };
    });
  },

  // Create a new booking
  createBooking(params: {
    customerName: string;
    phone: string;
    players: number;
    date: string;
    startTime: string;
    endTime: string;
    amount: number;
    specialRequest?: string;
  }): { success: boolean; booking?: Booking; error?: string } {
    const bookings = this.getBookings();

    // Prevent double booking
    const slots = this.getSlotsForDate(params.date);
    const targetSlot = slots.find(s => s.startTime === params.startTime);

    if (targetSlot && targetSlot.state === 'BOOKED') {
      return { success: false, error: 'This time slot is already booked. Please choose another slot.' };
    }
    if (targetSlot && targetSlot.state === 'BLOCKED') {
      return { success: false, error: 'This time slot is blocked for maintenance or private event.' };
    }

    const newBooking: Booking = {
      id: generateBookingId(params.date),
      customerName: params.customerName.trim(),
      phone: params.phone.trim(),
      players: Number(params.players),
      date: params.date,
      startTime: params.startTime,
      endTime: params.endTime,
      amount: params.amount,
      specialRequest: params.specialRequest?.trim(),
      status: 'Confirmed', // Confirmed on booking
      createdAt: new Date().toISOString(),
    };

    bookings.unshift(newBooking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));

    // Dispatch a storage update event for live UI reactivity across tabs
    window.dispatchEvent(new Event('turf_booking_updated'));

    return { success: true, booking: newBooking };
  },

  // Update booking status
  updateBookingStatus(id: string, status: BookingStatus): boolean {
    const bookings = this.getBookings();
    const index = bookings.findIndex(b => b.id === id);
    if (index === -1) return false;

    bookings[index].status = status;
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    window.dispatchEvent(new Event('turf_booking_updated'));
    return true;
  },

  // Delete booking (Admin action with confirmation)
  deleteBooking(id: string): boolean {
    const bookings = this.getBookings();
    const updated = bookings.filter(b => b.id !== id);
    if (updated.length === bookings.length) return false;

    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    window.dispatchEvent(new Event('turf_booking_updated'));
    return true;
  },

  // Toggle slot block (Admin action)
  toggleSlotBlock(date: string, slotId: string): boolean {
    const blockedMap = this.getBlockedSlotsMap();
    const currentList = blockedMap[date] || [];

    let isNowBlocked = false;
    if (currentList.includes(slotId)) {
      blockedMap[date] = currentList.filter(id => id !== slotId);
      isNowBlocked = false;
    } else {
      blockedMap[date] = [...currentList, slotId];
      isNowBlocked = true;
    }

    localStorage.setItem(STORAGE_KEYS.BLOCKED_SLOTS, JSON.stringify(blockedMap));
    window.dispatchEvent(new Event('turf_slot_blocked_updated'));
    return isNowBlocked;
  },

  // Get Admin statistics
  getStats(): AdminStats {
    const bookings = this.getBookings();
    const today = getTodayDateString(0);

    const todayBookings = bookings.filter(b => b.date === today && b.status !== 'Cancelled');
    const upcomingBookings = bookings.filter(b => b.date >= today && b.status === 'Confirmed');
    
    // Total revenue from confirmed and completed bookings
    const totalRevenue = bookings
      .filter(b => b.status === 'Confirmed' || b.status === 'Completed')
      .reduce((sum, b) => sum + b.amount, 0);

    // Available slots for today
    const todaySlots = this.getSlotsForDate(today);
    const availableToday = todaySlots.filter(s => s.state === 'AVAILABLE').length;

    return {
      todayBookingsCount: todayBookings.length,
      upcomingBookingsCount: upcomingBookings.length,
      availableSlotsCount: availableToday,
      totalRevenue,
    };
  },

  // Admin authentication (Demo only)
  isAdminLoggedIn(): boolean {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === 'true';
  },

  setAdminSession(loggedIn: boolean): void {
    if (loggedIn) {
      localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    }
  },

  // Reset demo data to defaults
  resetToInitialData(): void {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_BOOKINGS));
    const sampleBlocked: BlockedSlotsMap = {
      [getTodayDateString(1)]: ['21-22'],
    };
    localStorage.setItem(STORAGE_KEYS.BLOCKED_SLOTS, JSON.stringify(sampleBlocked));
    window.dispatchEvent(new Event('turf_booking_updated'));
  },

  // Clear demo data
  clearDemoData(): void {
    localStorage.removeItem(STORAGE_KEYS.BOOKINGS);
    localStorage.removeItem(STORAGE_KEYS.BLOCKED_SLOTS);
    window.dispatchEvent(new Event('turf_booking_updated'));
  }
};
