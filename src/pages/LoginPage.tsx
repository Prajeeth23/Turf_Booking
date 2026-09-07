import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookingService } from '../services/bookingService';
import { Shield, Lock, User, AlertCircle, Sparkles, ArrowRight } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo check
    if (username.trim().toLowerCase() === 'admin' && password === 'admin123') {
      bookingService.setAdminSession(true);
      navigate('/admin');
    } else {
      setError('Invalid credentials. Use Username: admin and Password: admin123');
    }
  };

  const handleQuickDemoLogin = () => {
    bookingService.setAdminSession(true);
    navigate('/admin');
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050b08] text-white flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="p-8 sm:p-10 rounded-3xl glass-dark-panel border-2 border-emerald-500/25 shadow-2xl relative overflow-hidden">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-pitch-card border border-pitch-border text-brand-green flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Shield className="w-7 h-7" />
            </div>
            <h1 className="font-sporty text-3xl sm:text-4xl font-black text-white uppercase">
              Turf Staff Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Admin Login & Match Management
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-rose-950/40 border border-rose-500 text-rose-300 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-pitch-border focus:border-brand-green text-white text-sm font-semibold focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-slate-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/50 border border-pitch-border focus:border-brand-green text-white text-sm font-semibold focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Demo Credentials Callout */}
            <div className="p-3 rounded-xl bg-black/40 border border-pitch-border text-xs text-slate-400 flex items-center justify-between">
              <div>
                <span>Demo User: <strong className="text-white">admin</strong></span>
                <span className="mx-2">•</span>
                <span>Pass: <strong className="text-white">admin123</strong></span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-brand-green hover:bg-brand-electric text-black font-black text-sm uppercase tracking-wider shadow-glow transition-all hover:scale-[1.02] active:scale-95"
            >
              Sign In to Dashboard
            </button>

            {/* Quick 1-click test button */}
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="w-full py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/30 text-xs text-brand-electric font-extrabold flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-green" />
              <span>One-Click Demo Admin Login</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </form>

          <p className="mt-6 text-center text-[11px] text-slate-500">
            Frontend demonstration only. No sensitive backend data transmitted.
          </p>
        </div>
      </div>
    </div>
  );
};
