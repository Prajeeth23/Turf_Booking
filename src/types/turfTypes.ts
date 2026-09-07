export type BookingStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  players: number;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "6:00 AM" or "18:00"
  endTime: string; // e.g. "7:00 AM" or "19:00"
  amount: number;
  specialRequest?: string;
  status: BookingStatus;
  createdAt: string;
}

export type SlotState = 'AVAILABLE' | 'SELECTED' | 'BOOKED' | 'BLOCKED';

export interface TimeSlot {
  id: string; // e.g. "06:00-07:00"
  startTime: string;
  endTime: string;
  displayTime: string; // "6:00 AM - 7:00 AM"
  isNight: boolean;
  price: number;
  state: SlotState;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  source: 'Google Review' | 'Verified Player';
  avatarInitials: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Turf' | 'Night Matches' | 'Players' | 'Facilities';
  imageUrl: string;
  caption: string;
  featured?: boolean;
}

export interface TurfFacility {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight: string;
}

export interface AdminStats {
  todayBookingsCount: number;
  upcomingBookingsCount: number;
  availableSlotsCount: number;
  totalRevenue: number;
}
