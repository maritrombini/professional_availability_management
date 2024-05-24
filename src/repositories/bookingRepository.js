import Booking from '../models/Booking.js';

export const createBooking = async (userId, slotId) => {
  try {
    const booking = await Booking.create({ userId, slotId });
    return booking;
  } catch (error) {
    throw new Error('Failed to create booking');
  }
};

