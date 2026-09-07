export const FRIENDS_TURF_PHONE = '093619 89494';
export const FRIENDS_TURF_WHATSAPP_NUMBER = '919361989494';

export interface WhatsAppBookingParams {
  name: string;
  date: string;
  time: string;
  players: number | string;
  bookingId?: string;
  specialRequest?: string;
}

/**
 * Generates direct wa.me link with pre-filled message
 */
export function generateWhatsAppBookingLink(params: WhatsAppBookingParams): string {
  let message = `Hi Friends Turf, I would like to book a turf.\n\n` +
    `Name: ${params.name}\n` +
    `Date: ${params.date}\n` +
    `Time: ${params.time}\n` +
    `Players: ${params.players}\n`;

  if (params.bookingId) {
    message += `\nBooking ID: ${params.bookingId}\n`;
  }

  if (params.specialRequest && params.specialRequest.trim()) {
    message += `Special Request: ${params.specialRequest.trim()}\n`;
  }

  message += `\nPlease confirm my booking.`;

  return `https://wa.me/${FRIENDS_TURF_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function generateDirectContactWhatsAppLink(customMessage?: string): string {
  const msg = customMessage || "Hi Friends Turf, I have an inquiry regarding turf booking at Sirupooluvapatti, Tiruppur.";
  return `https://wa.me/${FRIENDS_TURF_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
