import { Booking, GalleryItem, Review, TurfFacility } from '../types/turfTypes';

export const BUSINESS_INFO = {
  name: 'Friends Turf',
  tagline: 'Play Together. Play Better.',
  subtitle: 'Premium Turf Experience in Tiruppur',
  address: 'Near Sirupooluvapatti, Tiruppur, Tamil Nadu 641603',
  landmark: 'Near Sirupooluvapatti Junction',
  city: 'Tiruppur',
  state: 'Tamil Nadu',
  pincode: '641603',
  phone: '093619 89494',
  cleanPhone: '919361989494',
  rating: 4.9,
  reviewsCount: 17,
  openingHours: 'Open 24 Hours',
  category: 'Playground / Turf',
  instagram: 'Friends Turf Tirupur',
  dayRate: 800,
  nightRate: 1000,
  mapsUrl: 'https://maps.google.com/?q=Sirupooluvapatti,+Tiruppur,+Tamil+Nadu+641603',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15654.556277023168!2d77.336495!3d11.127814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba907ad53e4c4bf%3A0x7d87bc6a836067b5!2sSirupooluvapatti%2C%20Tiruppur%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
};

export const BASE_SLOTS_CONFIG = [
  { id: '06-07', startTime: '6:00 AM', endTime: '7:00 AM', displayTime: '6:00 AM – 7:00 AM', isNight: false, price: 800 },
  { id: '07-08', startTime: '7:00 AM', endTime: '8:00 AM', displayTime: '7:00 AM – 8:00 AM', isNight: false, price: 800 },
  { id: '08-09', startTime: '8:00 AM', endTime: '9:00 AM', displayTime: '8:00 AM – 9:00 AM', isNight: false, price: 800 },
  { id: '09-10', startTime: '9:00 AM', endTime: '10:00 AM', displayTime: '9:00 AM – 10:00 AM', isNight: false, price: 800 },
  { id: '10-11', startTime: '10:00 AM', endTime: '11:00 AM', displayTime: '10:00 AM – 11:00 AM', isNight: false, price: 800 },
  { id: '11-12', startTime: '11:00 AM', endTime: '12:00 PM', displayTime: '11:00 AM – 12:00 PM', isNight: false, price: 800 },
  { id: '16-17', startTime: '4:00 PM', endTime: '5:00 PM', displayTime: '4:00 PM – 5:00 PM', isNight: false, price: 800 },
  { id: '17-18', startTime: '5:00 PM', endTime: '6:00 PM', displayTime: '5:00 PM – 6:00 PM', isNight: true, price: 1000 },
  { id: '18-19', startTime: '6:00 PM', endTime: '7:00 PM', displayTime: '6:00 PM – 7:00 PM', isNight: true, price: 1000 },
  { id: '19-20', startTime: '7:00 PM', endTime: '8:00 PM', displayTime: '7:00 PM – 8:00 PM', isNight: true, price: 1000 },
  { id: '20-21', startTime: '8:00 PM', endTime: '9:00 PM', displayTime: '8:00 PM – 9:00 PM', isNight: true, price: 1000 },
  { id: '21-22', startTime: '9:00 PM', endTime: '10:00 PM', displayTime: '9:00 PM – 10:00 PM', isNight: true, price: 1000 },
];

export const INITIAL_FACILITIES: TurfFacility[] = [
  {
    id: 'turf',
    title: 'Football Turf',
    description: 'Premium synthetic football playing surface engineered for excellent ball roll, grip, and reduced joint impact.',
    iconName: 'Goal',
    highlight: 'All-Weather Surface',
  },
  {
    id: 'floodlights',
    title: 'LED Floodlights',
    description: 'High-intensity, shadowless arena floodlights perfect for late-night tournaments and competitive friendly matches.',
    iconName: 'Zap',
    highlight: 'Daylight Visibility at Night',
  },
  {
    id: 'parking',
    title: 'Parking Area',
    description: 'Convenient dedicated parking slots for both two-wheelers and four-wheelers right beside the turf entrance.',
    iconName: 'Car',
    highlight: 'Safe & Spacious',
  },
  {
    id: 'changing',
    title: 'Changing Rooms',
    description: 'Clean changing areas and hygienic restrooms to freshen up before and after your high-intensity game.',
    iconName: 'Shirt',
    highlight: 'Hygienic & Clean',
  },
  {
    id: 'seating',
    title: 'Player Seating',
    description: 'Covered player dugouts and shaded spectator seating benches for substitutes, family, and cheering friends.',
    iconName: 'Armchair',
    highlight: 'Dugout & Spectator Area',
  },
  {
    id: 'refreshments',
    title: 'Refreshments',
    description: 'Chilled energy drinks, clean bottled mineral water, and quality snacks available at very reasonable prices.',
    iconName: 'Coffee',
    highlight: 'Quality Snacks & Drinks',
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Friends Turf Tiruppur – Sunset Floodlit Arena',
    category: 'Turf',
    imageUrl: '/images/friends-turf-bg.jpg',
    caption: 'Crystal-clear night play under our powerful LED floodlights with synthetic grass.',
    featured: true,
  },
  {
    id: 'g2',
    title: 'Synthetic Grass Pitch & Match Ball',
    category: 'Turf',
    imageUrl: '/images/friends-turf-bg.jpg',
    caption: 'High-grade synthetic turf maintained daily for top bounce & traction.',
  },
  {
    id: 'g3',
    title: 'Weekend Squad Championship',
    category: 'Players',
    imageUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    caption: 'Local Tiruppur football teams battling it out during Sunday prime hours.',
  },
  {
    id: 'g4',
    title: 'Shadowless Evening Illumination',
    category: 'Night Matches',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    caption: 'Perfect lighting coverage with zero blind spots across both wings.',
  },
  {
    id: 'g5',
    title: 'Player Dugout & Seating Bench',
    category: 'Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=800&q=80',
    caption: 'Spacious resting area with clean spectator benches and refreshment counter.',
  },
  {
    id: 'g6',
    title: 'Penalty Shootout Thrill',
    category: 'Players',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
    caption: 'Every kick feels pro on our high-cushion rubber infill surface.',
  },
  {
    id: 'g7',
    title: 'Evening Sunset Warmup',
    category: 'Turf',
    imageUrl: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?auto=format&fit=crop&w=800&q=80',
    caption: 'Serene atmosphere near Sirupooluvapatti away from city traffic chaos.',
  },
  {
    id: 'g8',
    title: 'Spacious Parking & Reception',
    category: 'Facilities',
    imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80',
    caption: 'Ample parking for 30+ bikes and cars right at the entrance gate.',
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Karthikeyan M.',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Atmosphere was fantastic, and I really enjoyed my experience there. The turf quality is super smooth and lighting at night is perfect.',
    source: 'Google Review',
    avatarInitials: 'KM'
  },
  {
    id: 'r2',
    author: 'Senthil Nathan',
    rating: 5,
    date: '1 month ago',
    comment: 'Affordable price, neat and clean place. Easily the best turf in the Sirupooluvapatti / Tiruppur belt. We book every weekend!',
    source: 'Google Review',
    avatarInitials: 'SN'
  },
  {
    id: 'r3',
    author: 'Dinesh Kumar',
    rating: 5,
    date: '1 month ago',
    comment: 'Snacks are also there in good quality and good price. Very polite staff and parking is spacious. Highly recommend for 5s and 7s.',
    source: 'Google Review',
    avatarInitials: 'DK'
  },
  {
    id: 'r4',
    author: 'Praveen Raj',
    rating: 5,
    date: '2 months ago',
    comment: 'Great ground maintenance. Night floodlights are really bright, you never miss the ball. Good water and changing room facility.',
    source: 'Google Review',
    avatarInitials: 'PR'
  },
  {
    id: 'r5',
    author: 'Vigneshwaran S.',
    rating: 5,
    date: '2 months ago',
    comment: 'Best turf experience in Tiruppur. Booking process is so easy and straightforward. The turf rubber infill is properly maintained.',
    source: 'Google Review',
    avatarInitials: 'VS'
  },
  {
    id: 'r6',
    author: 'Mohammed Ashik',
    rating: 4.8,
    date: '3 months ago',
    comment: 'Clean facilities and friendly management. We played from 8 PM to 10 PM. Cold drinks and snacks made post-match refreshing.',
    source: 'Google Review',
    avatarInitials: 'MA'
  },
  {
    id: 'r7',
    author: 'Saravanan B.',
    rating: 5,
    date: '3 months ago',
    comment: 'Superb ambiance. Open 24 hours is a huge blessing for night owls and working professionals who want to play late night games.',
    source: 'Google Review',
    avatarInitials: 'SB'
  }
];

export function getTodayDateString(offsetDays = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: `FT-${getTodayDateString().replace(/-/g, '')}-7120`,
    customerName: 'Karthik Raja',
    phone: '9842154321',
    players: 10,
    date: getTodayDateString(0),
    startTime: '6:00 PM',
    endTime: '7:00 PM',
    amount: 1000,
    specialRequest: 'Need 2 sets of team bibs (Red & Blue)',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: `FT-${getTodayDateString().replace(/-/g, '')}-3491`,
    customerName: 'Senthil Velan',
    phone: '9789456123',
    players: 12,
    date: getTodayDateString(0),
    startTime: '7:00 PM',
    endTime: '8:00 PM',
    amount: 1000,
    specialRequest: 'Corporate friendly match',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: `FT-${getTodayDateString().replace(/-/g, '')}-9012`,
    customerName: 'Arvind Swaminathan',
    phone: '9443218765',
    players: 8,
    date: getTodayDateString(0),
    startTime: '8:00 AM',
    endTime: '9:00 AM',
    amount: 800,
    specialRequest: 'Football size 5 required',
    status: 'Completed',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: `FT-${getTodayDateString(1).replace(/-/g, '')}-5543`,
    customerName: 'Vijay Shankar',
    phone: '9944112233',
    players: 10,
    date: getTodayDateString(1),
    startTime: '6:00 PM',
    endTime: '7:00 PM',
    amount: 1000,
    specialRequest: 'Tournament knockout game',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: `FT-${getTodayDateString(1).replace(/-/g, '')}-8819`,
    customerName: 'Deepak Prasanth',
    phone: '9865321470',
    players: 14,
    date: getTodayDateString(1),
    startTime: '8:00 PM',
    endTime: '9:00 PM',
    amount: 1000,
    specialRequest: '',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
  },
  {
    id: `FT-${getTodayDateString(2).replace(/-/g, '')}-2109`,
    customerName: 'Manoj Kumar',
    phone: '9003456789',
    players: 10,
    date: getTodayDateString(2),
    startTime: '7:00 AM',
    endTime: '8:00 AM',
    amount: 800,
    specialRequest: 'Early morning session',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  }
];
