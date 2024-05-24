import * as availabilityRepository from '../repositories/availabilityRepository.js';
import * as bookingRepository from '../repositories/bookingRepository.js';
import * as userRepository from '../repositories/userRepository.js';

export const bookSession = async (slotId, userId) => {
  try {
    const getUser = await userRepository.findUserById(userId);

    if (!getUser) {
      throw new Error('Unauthorized to create booking');
    }

    const slots = await availabilityRepository.findAllAvailabilities();

    if (!slots || slots.length === 0) {
      throw new Error('No available slots');
    }

    const slotIndex = slots.findIndex((slot) => slot.id === slotId);
    if (slotIndex === -1) {
      throw new Error('Slot not found.');
    }

    const slot = slots[slotIndex];

    if (slot.isBooked) {
      throw new Error('Slot already booked');
    }

    const booking = await bookingRepository.createBooking(userId, slotId);
    const user = await userRepository.findUserById(userId);

    await availabilityRepository.updateSlotBooking(slot.id, true);
    if (slotIndex < slots.length - 1) {
      await availabilityRepository.updateSlotBooking(
        slots[slotIndex + 1].id,
        true
      );
    }

    return { booking, user };
  } catch (error) {
    throw new Error(`Failed to create booking: ${error.message}`);
  }
};
