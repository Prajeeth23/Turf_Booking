/**
 * Generates dynamic booking ID in format: FT-YYYYMMDD-XXXX
 * E.g., FT-20260907-8842
 */
export function generateBookingId(dateStr?: string): string {
  const d = dateStr ? new Date(dateStr) : new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  // 4 digit random number between 1000 and 9999
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  
  return `FT-${year}${month}${day}-${randomSuffix}`;
}

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}
