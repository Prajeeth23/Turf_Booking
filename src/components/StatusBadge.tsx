import React from 'react';
import { BookingStatus } from '../types/turfTypes';
import { CheckCircle2, Clock, XCircle, CheckCheck } from 'lucide-react';

interface StatusBadgeProps {
  status: BookingStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';
  const baseClasses = `inline-flex items-center gap-1.5 font-semibold rounded-full ${
    isSm ? 'px-2.5 py-0.5 text-xs' : 'px-3.5 py-1 text-sm'
  }`;

  switch (status) {
    case 'Confirmed':
      return (
        <span className={`${baseClasses} bg-emerald-500/15 text-emerald-400 border border-emerald-500/30`}>
          <CheckCircle2 className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
          Confirmed
        </span>
      );
    case 'Pending':
      return (
        <span className={`${baseClasses} bg-amber-500/15 text-amber-400 border border-amber-500/30`}>
          <Clock className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
          Pending
        </span>
      );
    case 'Completed':
      return (
        <span className={`${baseClasses} bg-blue-500/15 text-blue-400 border border-blue-500/30`}>
          <CheckCheck className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
          Completed
        </span>
      );
    case 'Cancelled':
      return (
        <span className={`${baseClasses} bg-rose-500/15 text-rose-400 border border-rose-500/30`}>
          <XCircle className={isSm ? 'w-3 h-3' : 'w-4 h-4'} />
          Cancelled
        </span>
      );
    default:
      return null;
  }
};
