import React, { useEffect } from 'react';
import { GalleryItem } from '../types/turfTypes';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl transition-all">
      {/* Top Header / Actions */}
      <div className="absolute top-0 inset-x-0 p-4 sm:p-6 flex items-center justify-between z-10 bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-brand-green text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
            {currentItem.category}
          </span>
          <span className="text-slate-400 text-sm font-medium">
            {currentIndex + 1} / {items.length}
          </span>
        </div>

        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-105"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-3 sm:left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 active:scale-95"
        aria-label="Previous Image"
      >
        <ChevronLeft className="w-7 h-7" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-3 sm:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all hover:scale-110 active:scale-95"
        aria-label="Next Image"
      >
        <ChevronRight className="w-7 h-7" />
      </button>

      {/* Image Container */}
      <div
        className="max-w-5xl max-h-[80vh] px-4 flex flex-col items-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.imageUrl}
          alt={currentItem.title}
          className="max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl border border-pitch-border"
        />

        {/* Caption */}
        <div className="mt-4 text-center max-w-xl">
          <h3 className="font-outfit text-lg sm:text-xl font-bold text-white mb-1">
            {currentItem.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {currentItem.caption}
          </p>
        </div>
      </div>
    </div>
  );
};
