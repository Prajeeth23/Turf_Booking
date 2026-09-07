import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Menu, X, Shield, CalendarCheck, CircleUser } from 'lucide-react';
import { BUSINESS_INFO } from '../data/mockData';
import { bookingService } from '../services/bookingService';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = bookingService.isAdminLoggedIn();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Book Turf', path: '/book' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Reviews', path: '/reviews' },
    { label: 'Contact', path: '/contact' },
    { label: 'My Booking', path: '/my-booking' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav-dark py-2.5 shadow-2xl'
          : 'bg-[#050b08]/85 backdrop-blur-md py-3.5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo with Official Sports Badge */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img
              src="/images/friends-turf-logo.png"
              alt="Friends Turf Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain rounded-2xl p-1 bg-white border-2 border-brand-green shadow-glow group-hover:scale-105 transition-all duration-300"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-brand-green border-2 border-[#050b08] animate-pulse"></span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-sporty text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
                Friends <span className="text-brand-electric">Turf</span>
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest hidden sm:block">
              Football • Cricket • Shuttle • Open 24H
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                isActive(link.path)
                  ? 'text-brand-electric bg-[#0d2317] border border-emerald-500/40 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Direct Phone Dial */}
          <a
            href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0a1810] border border-pitch-border text-xs font-bold text-slate-200 hover:text-brand-electric transition-colors"
            title="Call Friends Turf"
          >
            <div className="w-6 h-6 rounded-full bg-pitch-card flex items-center justify-center text-brand-green">
              <Phone className="w-3 h-3" />
            </div>
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          {/* Primary Book Now CTA */}
          <Link
            to="/book"
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-brand-green hover:bg-brand-electric text-black font-black text-xs uppercase tracking-wider shadow-glow transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <CalendarCheck className="w-4 h-4 stroke-[2.5]" />
            <span>Book Turf</span>
          </Link>

          {/* Admin / Login Icon */}
          <Link
            to={isAdmin ? '/admin' : '/login'}
            className="p-2.5 rounded-full bg-[#0a1810] hover:bg-pitch-card border border-pitch-border text-slate-300 hover:text-brand-green transition-all"
            title={isAdmin ? 'Admin Dashboard' : 'Admin Login'}
          >
            {isAdmin ? <Shield className="w-4 h-4 text-brand-green" /> : <CircleUser className="w-4 h-4" />}
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <Link
            to="/book"
            className="px-3.5 py-1.5 rounded-full bg-brand-green text-black font-black text-xs uppercase shadow-glow"
          >
            Book
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#0d2015] border border-pitch-border text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed inset-x-0 top-[65px] bg-[#07130b]/98 backdrop-blur-2xl border-b border-pitch-border p-5 shadow-2xl transition-all duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-3 rounded-xl text-base font-black uppercase flex items-center justify-between transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#0e2719] text-brand-electric border border-emerald-500/30'
                    : 'text-slate-200 hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
                {isActive(link.path) && <span className="w-2 h-2 rounded-full bg-brand-green"></span>}
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-pitch-border flex flex-col gap-3">
              <a
                href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#0d2015] border border-pitch-border text-white text-sm font-bold"
              >
                <Phone className="w-4 h-4 text-brand-green" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>

              <Link
                to={isAdmin ? '/admin' : '/login'}
                className="flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-slate-400 hover:text-brand-green"
              >
                {isAdmin ? <Shield className="w-4 h-4 text-brand-green" /> : <CircleUser className="w-4 h-4" />}
                <span>{isAdmin ? 'Admin Dashboard' : 'Admin Login'}</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
