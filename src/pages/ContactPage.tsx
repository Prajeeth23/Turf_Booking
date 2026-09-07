import React, { useState } from 'react';
import { BUSINESS_INFO } from '../data/mockData';
import { Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, Navigation } from 'lucide-react';
import { generateDirectContactWhatsAppLink } from '../utils/whatsapp';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050b08] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-brand-electric text-xs font-black uppercase tracking-wider mb-3 shadow-glow">
            <Phone className="w-3.5 h-3.5 text-brand-green" />
            <span>We are Available 24/7</span>
          </div>
          <h1 className="font-sporty text-5xl sm:text-7xl font-black text-white uppercase tracking-tight mb-4">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-300">Friends Turf</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Need directions, custom tournament bookings, or instant slot confirmation? Get in touch with our Tiruppur ground desk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Card */}
            <div className="p-6 rounded-3xl glass-dark-card border border-pitch-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pitch-card border border-pitch-border flex items-center justify-center text-brand-green flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sporty text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Direct Phone Desk
                </h3>
                <a
                  href={`tel:${BUSINESS_INFO.phone.replace(/\s+/g, '')}`}
                  className="font-sporty text-2xl sm:text-3xl font-black text-white hover:text-brand-electric transition-colors block mb-1 uppercase"
                >
                  {BUSINESS_INFO.phone}
                </a>
                <p className="text-xs text-slate-400">
                  Instant response • Call anytime 24/7
                </p>
              </div>
            </div>

            {/* Address Card */}
            <div className="p-6 rounded-3xl glass-dark-card border border-pitch-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pitch-card border border-pitch-border flex items-center justify-center text-emerald-400 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sporty text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Ground Location
                </h3>
                <p className="font-sporty text-xl font-black text-white mb-1 uppercase">
                  {BUSINESS_INFO.address}
                </p>
                <p className="text-xs text-slate-400 mb-3">
                  Near Sirupooluvapatti Junction, Tiruppur, Tamil Nadu 641603
                </p>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-brand-electric hover:underline uppercase"
                >
                  <Navigation className="w-3.5 h-3.5 text-brand-green" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-6 rounded-3xl glass-dark-card border border-pitch-border flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-pitch-card border border-pitch-border flex items-center justify-center text-blue-400 flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-sporty text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Operating Hours
                </h3>
                <p className="font-sporty text-2xl font-black text-white mb-1 uppercase">
                  Open 24 Hours / 7 Days
                </p>
                <p className="text-xs text-slate-400">
                  Morning, evening & midnight floodlit matches
                </p>
              </div>
            </div>

            {/* WhatsApp Direct CTA Card */}
            <div className="p-6 rounded-3xl glass-dark-panel border-2 border-emerald-500/40 text-white shadow-glow">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-pitch-card border border-pitch-border flex items-center justify-center text-brand-green">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="font-sporty text-2xl font-black uppercase">
                  Instant WhatsApp Booking
                </h3>
              </div>
              <p className="text-xs text-slate-300 mb-4 font-normal">
                Chat directly with our turf ground coordinator for immediate availability and queries.
              </p>
              <a
                href={generateDirectContactWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all duration-200 hover:scale-[1.02]"
              >
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact Inquiry Form & Google Map */}
          <div className="lg:col-span-7 space-y-8">
            {/* Inquiry Form */}
            <div className="p-8 rounded-3xl glass-dark-panel border-2 border-emerald-500/25 shadow-2xl">
              <h2 className="font-sporty text-3xl sm:text-4xl font-black text-white mb-2 uppercase">
                Send Ground Inquiry
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Fill out the form below and our arena desk will get back to you promptly.
              </p>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border-2 border-brand-green text-white text-center shadow-glow">
                  <CheckCircle2 className="w-10 h-10 mx-auto text-brand-green mb-2" />
                  <h4 className="font-sporty font-black text-2xl uppercase">Inquiry Sent Successfully!</h4>
                  <p className="text-xs text-slate-300 mt-1">
                    We will call or WhatsApp you back shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senthil Nathan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-pitch-border text-white text-sm focus:border-brand-green focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-4 py-3 rounded-xl bg-black/50 border border-pitch-border text-white text-sm focus:border-brand-green focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Message / Requirement *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="e.g. Looking for regular weekend corporate slot bookings..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-black/50 border border-pitch-border text-white text-sm focus:border-brand-green focus:outline-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all duration-200 hover:scale-[1.01]"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </div>
                  </button>
                </form>
              )}
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl overflow-hidden glass-dark-panel border-2 border-emerald-500/25 shadow-2xl">
              <div className="p-4 bg-black/40 border-b border-pitch-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-green" />
                  <span className="font-sporty text-base font-black text-white uppercase">
                    Friends Turf Tiruppur Map
                  </span>
                </div>
                <a
                  href={BUSINESS_INFO.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-black text-brand-electric hover:underline uppercase"
                >
                  Get Directions →
                </a>
              </div>
              <div className="h-[280px] w-full">
                <iframe
                  title="Friends Turf Location"
                  src={BUSINESS_INFO.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
