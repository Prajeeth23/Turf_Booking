import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BookingPage } from './pages/BookingPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { MyBookingPage } from './pages/MyBookingPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { bookingService } from './services/bookingService';
import { MessageCircle, Phone } from 'lucide-react';
import { generateDirectContactWhatsAppLink } from './utils/whatsapp';
import { BUSINESS_INFO } from './data/mockData';

// Scroll to top automatically on route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const App: React.FC = () => {
  // Initialize mock data on first mount
  useEffect(() => {
    bookingService.init();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="relative flex flex-col min-h-screen bg-[#050b08] text-white selection:bg-brand-green selection:text-black">
        {/* Global ambient background layer with Friends Turf stadium photo */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src="/images/friends-turf-bg.jpg"
            alt="Friends Turf Stadium Backdrop"
            className="w-full h-full object-cover object-center opacity-45 filter brightness-105 contrast-110 saturate-125 scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050b08]/60 via-[#050b08]/80 to-[#050b08]/95"></div>
          {/* Subtle neon stadium light pings */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-brand-green/15 rounded-full blur-[140px]"></div>
          <div className="absolute bottom-1/3 left-10 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book" element={<BookingPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/facilities" element={<FacilitiesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/my-booking" element={<MyBookingPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
            </Routes>
          </main>

          <Footer />
        </div>

        {/* Floating Quick Action Buttons (Bottom Right) */}
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 no-print">
          <a
            href={generateDirectContactWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group font-black text-sm uppercase tracking-wider glow-btn"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 fill-current" />
            <span className="hidden sm:inline">WhatsApp Booking</span>
          </a>

          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 px-5 py-3.5 rounded-full bg-[#0a1810] hover:bg-[#0f2418] text-brand-electric border-2 border-emerald-500/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group font-black text-sm uppercase tracking-wider"
            title="Call Friends Turf"
          >
            <Phone className="w-5 h-5 text-brand-green" />
            <span className="hidden sm:inline">Call Ground Desk</span>
          </a>
        </div>
      </div>
    </Router>
  );
};

export default App;
