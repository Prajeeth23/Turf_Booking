import React, { useState } from 'react';
import { INITIAL_REVIEWS } from '../data/mockData';
import { ReviewCard } from '../components/ReviewCard';
import { Review } from '../types/turfTypes';
import { Star, MessageSquarePlus, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form states
  const [name, setName] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    const initials = name
      .trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'FT';

    const newReview: Review = {
      id: `r-${Date.now()}`,
      author: name.trim(),
      rating: rating,
      date: 'Just now',
      comment: comment.trim(),
      source: 'Google Review',
      avatarInitials: initials,
    };

    setReviews([newReview, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setShowModal(false);
      setSubmitted(false);
      setName('');
      setComment('');
      setRating(5);
    }, 1500);
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#050b08] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-black border border-amber-500/30 mb-3 shadow-glow">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 / 5 Rating on Google ({reviews.length} Verified Reviews)</span>
          </div>
          <h1 className="font-sporty text-5xl sm:text-7xl font-black text-white uppercase tracking-tight mb-4">
            Athlete <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green to-emerald-300">Reviews</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover why passionate football squads, cricket teams, and badminton players love playing at Friends Turf Tiruppur.
          </p>
        </div>

        {/* Aggregate Ratings Overview Card */}
        <div className="max-w-4xl mx-auto p-8 rounded-3xl glass-dark-panel border-2 border-emerald-500/20 shadow-2xl mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Overall Score */}
            <div className="text-center md:border-r md:border-pitch-border md:pr-8">
              <span className="font-sporty text-7xl font-black text-white block">4.9</span>
              <div className="flex items-center justify-center gap-1 my-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-400 font-semibold">Based on {reviews.length} Google Reviews</p>
            </div>

            {/* Highlights summary */}
            <div className="space-y-2.5 md:col-span-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300 w-24">Atmosphere</span>
                <div className="flex-1 h-2.5 rounded-full bg-black/50 overflow-hidden border border-white/5">
                  <div className="h-full bg-brand-green rounded-full w-[98%] shadow-glow"></div>
                </div>
                <span className="text-xs font-bold text-brand-electric">4.9</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300 w-24">Turf Quality</span>
                <div className="flex-1 h-2.5 rounded-full bg-black/50 overflow-hidden border border-white/5">
                  <div className="h-full bg-brand-green rounded-full w-[96%] shadow-glow"></div>
                </div>
                <span className="text-xs font-bold text-brand-electric">4.9</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300 w-24">Floodlights</span>
                <div className="flex-1 h-2.5 rounded-full bg-black/50 overflow-hidden border border-white/5">
                  <div className="h-full bg-brand-green rounded-full w-[99%] shadow-glow"></div>
                </div>
                <span className="text-xs font-bold text-brand-electric">5.0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-300 w-24">Snacks & Drink</span>
                <div className="flex-1 h-2.5 rounded-full bg-black/50 overflow-hidden border border-white/5">
                  <div className="h-full bg-brand-green rounded-full w-[94%] shadow-glow"></div>
                </div>
                <span className="text-xs font-bold text-brand-electric">4.8</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-pitch-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-400 font-medium">Played at Friends Turf recently? Share your review.</span>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="px-6 py-2.5 rounded-full bg-brand-green hover:bg-brand-electric text-black font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-glow transition-all"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* CTA Banner */}
        <div className="text-center p-10 rounded-3xl glass-dark-panel border-2 border-emerald-500/25 shadow-2xl max-w-2xl mx-auto">
          <h3 className="font-sporty text-3xl sm:text-4xl font-black text-white uppercase mb-3">
            Book Your Squad’s Next Match
          </h3>
          <p className="text-sm text-slate-300 mb-6 font-normal">
            Join the 17+ high-energy sports teams playing weekly at Friends Turf Tiruppur.
          </p>
          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all hover:scale-105"
          >
            <span>Book a Slot Now</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Write Review Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-dark-panel border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative text-white">
            <h3 className="font-sporty text-3xl font-black text-white mb-2 uppercase">
              Share Your Experience
            </h3>
            <p className="text-xs text-slate-300 mb-6 font-normal">
              Your review helps other Tiruppur sports squads discover our turf arena.
            </p>

            {submitted ? (
              <div className="text-center py-8 text-brand-electric">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-brand-green animate-bounce" />
                <p className="font-black text-lg font-sporty uppercase">Thank you for your review!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vigneshwaran"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-pitch-border text-white text-sm focus:border-brand-green focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Your Feedback *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us about the turf quality, lighting, parking..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-pitch-border text-white text-sm focus:border-brand-green focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-pitch-border">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-full text-slate-300 hover:bg-white/5 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-brand-green hover:bg-brand-electric text-black text-xs font-black uppercase tracking-wider shadow-glow"
                  >
                    Post Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
