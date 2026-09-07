import React from 'react';
import { Review } from '../types/turfTypes';
import { Star, CheckCircle } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="glass-dark-card p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 border border-pitch-border hover:border-brand-green/40 shadow-card-dark">
      <div>
        {/* Top bar: Stars and Google verification */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(review.rating)
                    ? 'text-amber-400 fill-amber-400'
                    : 'text-slate-600'
                }`}
              />
            ))}
            <span className="text-xs font-bold text-amber-400 ml-1.5">{review.rating}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-300 bg-pitch-card px-2.5 py-1 rounded-full border border-pitch-border">
            <span className="font-black text-xs text-blue-400">G</span>
            <span>Google Review</span>
          </div>
        </div>

        {/* Comment quote */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic mb-6">
          "{review.comment}"
        </p>
      </div>

      {/* Author footer */}
      <div className="flex items-center gap-3 pt-4 border-t border-pitch-border">
        <div className="w-10 h-10 rounded-full bg-pitch-card border border-pitch-border flex items-center justify-center text-brand-electric font-black text-sm shadow-sm">
          {review.avatarInitials}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-sporty font-black text-white text-base uppercase">
              {review.author}
            </h4>
            <span title="Verified Athlete">
              <CheckCircle className="w-4 h-4 text-brand-green" />
            </span>
          </div>
          <p className="text-xs text-slate-400">{review.date} • Tiruppur Athlete</p>
        </div>
      </div>
    </div>
  );
};
