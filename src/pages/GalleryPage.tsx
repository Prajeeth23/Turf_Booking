import React, { useState } from 'react';
import { INITIAL_GALLERY } from '../data/mockData';
import { Lightbox } from '../components/Lightbox';
import { GalleryItem } from '../types/turfTypes';
import { Camera, ZoomIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const categories = ['All', 'Turf', 'Night Matches', 'Players', 'Facilities'];

  const filteredItems = activeCategory === 'All'
    ? INITIAL_GALLERY
    : INITIAL_GALLERY.filter((item) => item.category === activeCategory);

  const handleImageClick = (item: GalleryItem) => {
    const idx = filteredItems.findIndex(i => i.id === item.id);
    if (idx !== -1) {
      setCurrentIndex(idx);
      setLightboxOpen(true);
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050b08] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-brand-electric text-xs font-black uppercase tracking-wider mb-3 shadow-glow">
            <Camera className="w-3.5 h-3.5 text-brand-green" />
            <span>Match Visuals & Arena Life</span>
          </div>
          <h1 className="font-sporty text-5xl sm:text-7xl font-black text-white uppercase tracking-tight mb-4">
            Turf <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-300">Gallery</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Take a visual tour of Friends Turf in Tiruppur. From evening friendly games to electric late-night floodlit tournaments.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-brand-green text-black shadow-glow font-black scale-105'
                  : 'glass-dark-card text-slate-300 hover:text-white border border-pitch-border hover:border-brand-green/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleImageClick(item)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border border-pitch-border hover:border-brand-green shadow-card-dark transition-all duration-300 hover:-translate-y-1 ${
                item.featured ? 'sm:col-span-2 sm:row-span-2 h-[420px]' : 'h-64'
              }`}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-brand-green opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 shadow-glow">
                <ZoomIn className="w-4 h-4" />
              </div>

              {/* Content text */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-950/90 border border-brand-green/40 text-brand-electric text-[10px] font-black uppercase tracking-wider mb-1.5">
                  {item.category}
                </span>
                <h3 className="font-sporty text-xl sm:text-2xl font-black text-white leading-tight mb-1 uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 font-normal">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-8 rounded-3xl glass-dark-panel border-2 border-emerald-500/25 shadow-2xl max-w-xl mx-auto">
          <h3 className="font-sporty text-3xl font-black text-white uppercase mb-2">
            Ready to Play Under These Lights?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mb-6">
            Reserve your squad's slot in under 60 seconds with instant WhatsApp confirmation.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all hover:scale-105"
          >
            Book a Slot Now
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        items={filteredItems}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1))}
        onNext={() => setCurrentIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0))}
      />
    </div>
  );
};
