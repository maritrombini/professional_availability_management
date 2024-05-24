import { Op } from 'sequelize';
import Slot from '../models/Slot.js';

export const saveAvailability = async (professionalId, slots) => {
  try {
    const createdSlots = await Slot.bulkCreate(
      slots.map((slot) => ({ ...slot, professionalId })),
      { validate: true }
    );
    return createdSlots;
  } catch (error) {
    throw new Error(
      `Failed to save availability to database: ${error.message}`
    );
  }
};

export const findAllAvailabilities = async (filters = {}) => {
  const { startTime, endTime, dayOfWeek, isBooked } = filters;
  const whereClause = {};

  if (startTime) {
    whereClause.startTime = { [Op.gte]: startTime };
  }

  if (endTime) {
    whereClause.endTime = { [Op.lte]: endTime };
  }

  if (dayOfWeek) {
    const dayOfWeekUpperCase = dayOfWeek.toUpperCase();
    whereClause.dayOfWeek = dayOfWeekUpperCase;
  }

  if (isBooked) {
    whereClause.isBooked = isBooked;
  }

  return await Slot.findAll({
    where: whereClause,
    order: [
      ['dayOfWeek', 'ASC'],
      ['startTime', 'ASC'],
    ],
  });
};

export const findSlot = async (slotId) => {
  return await Slot.findByPk(slotId);
};

export const findAvailabilitiesByProfessionalId = async (professionalId) => {
  return await Slot.findAll({
    where: {
      professionalId,
      isBooked: false,
    },
    order: [
      ['createdAt', 'DESC'],
      ['dayOfWeek', 'ASC'],
      ['startTime', 'ASC'],
    ],
  });
};

export const findAvailabilitiesByTime = async (
  professionalId,
  dayOfWeek,
  startTime,
  endTime
) => {
  return await Slot.findAll({
    where: {
      professionalId,
      dayOfWeek,
      [Op.or]: [
        {
          startTime: {
            [Op.between]: [startTime, endTime],
          },
        },
        {
          endTime: {
            [Op.between]: [startTime, endTime],
          },
        },
        {
          [Op.and]: [
            { startTime: { [Op.lte]: startTime } },
            { endTime: { [Op.gte]: endTime } },
          ],
        },
      ],
    },
  });
};

export const findAvailabilityById = async (availabilityId) => {
  return await Slot.findByPk(availabilityId);
};

export const updateAvailability = async (availabilityId, updates) => {
  try {
    return await Slot.update(updates, { where: { id: availabilityId } });
  } catch (error) {
    throw new Error(
      `Failed to update availability in the database: ${error.message}`
    );
  }
};

export const updateSlotBooking = async (slotId, isBooked) => {
  return await Slot.update({ isBooked }, { where: { id: slotId } });
};

export const deleteAvailability = async (slotId) => {
  const result = await Slot.destroy({ where: { id: slotId } });
  return result;
};
