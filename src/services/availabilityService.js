import * as availabilityRepository from '../repositories/availabilityRepository.js';
import * as professionalRepository from '../repositories/professionalRepository.js';
import { generateSlots, isValidTimeSlot } from '../utils/timeUtils.js';

export const createAvailability = async (data, professionalId) => {
  try {
    const dayOfWeekUpperCase = data.dayOfWeek.toUpperCase();

    const getProfessional =
      await professionalRepository.findProfessionalByEmail(professionalId);

    if (!getProfessional) {
      throw new Error('Unauthorized to update this availability');
    }

    if (!isValidTimeSlot(data.startTime) || !isValidTimeSlot(data.endTime)) {
      throw new Error(
        'Start time and end time must be in 30 minutes intervals.'
      );
    }

    const slots = generateSlots(
      dayOfWeekUpperCase,
      data.startTime,
      data.endTime
    );

    if (slots.length === 0) {
      throw new Error('No slots generated');
    }

    const existingSlots = await availabilityRepository.findAvailabilitiesByTime(
      data.professionalId,
      dayOfWeekUpperCase,
      data.startTime,
      data.endTime
    );

    if (existingSlots.length > 0) {
      throw new Error('Conflicting slots already exist');
    }

    const createdSlots = await availabilityRepository.saveAvailability(
      data.professionalId,
      slots
    );
    return createdSlots;
  } catch (error) {
    throw new Error(`Failed to create availability: ${error.message}`);
  }
};

export const listAllAvailabilities = async (filters) => {
  return await availabilityRepository.findAllAvailabilities(filters);
};

export const getAvailabilityById = async (slotId) => {
  return await availabilityRepository.findSlot(slotId);
};

export const getAvailabilitiesByProfessionalId = async (professionalId) => {
  return await availabilityRepository.findAvailabilitiesByProfessionalId(
    professionalId
  );
};

export const updateAvailability = async (
  availabilityId,
  dayOfWeek,
  professionalId
) => {
  try {
    const availability = await availabilityRepository.findAvailabilityById(
      availabilityId
    );

    if (!availability) {
      throw new Error('Availability not found');
    }

    if (availability.professionalId !== professionalId) {
      throw new Error('Unauthorized to update this availability');
    }

    if (availability.isBooked) {
      throw new Error('Cannot update a booked slot');
    }

    const updates = { dayOfWeek };

    return await availabilityRepository.updateAvailability(
      availabilityId,
      updates
    );
  } catch (error) {
    throw new Error(`Failed to update availability: ${error.message}`);
  }
};

export const deleteAvailability = async (slotId, professionalId) => {
  try {
    const availability = await availabilityRepository.findAvailabilityById(
      slotId
    );
  
    if (!availability) {
      throw new Error('Availability not found');
    }
  
    if (availability.professionalId !== professionalId) {
      throw new Error('Unauthorized to delete this availability');
    }
  
    const result = await availabilityRepository.deleteAvailability(slotId);
    return result === 1 ? 'Availability deleted successfully' : null;
  } catch (error) {
    throw new Error(`Failed to delete availability: ${error.message}`);
  }
};
