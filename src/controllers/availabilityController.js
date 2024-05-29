import Joi from 'joi';
import * as availabilityService from '../services/availabilityService.js';

const availabilitySchema = Joi.object({
  professionalId: Joi.string().uuid().required(),
  dayOfWeek: Joi.string()
    .valid(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    )
    .insensitive()
    .required(),
  startTime: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required(),
  endTime: Joi.string()
    .pattern(/^\d{2}:\d{2}$/)
    .required(),
});

const updateAvailabilitySchema = Joi.object({
  dayOfWeek: Joi.string()
    .valid(
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    )
    .insensitive()
    .required(),
  startTime: Joi.string().pattern(/^\d{2}:\d{2}$/),
  endTime: Joi.string().pattern(/^\d{2}:\d{2}$/),
});

export const createAvailability = async (req, res) => {
  const professionalId = req.user.email;

  const { error } = availabilitySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const result = await availabilityService.createAvailability(
      req.body,
      professionalId
    );

    res.status(201).json(result);
  } catch (error) {
    if (
      error.message.includes(
        'Start time and end time must be in 30 minutes intervals.'
      )
    ) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message.includes('Unauthorized to create this availability')) {
      return res.status(403).json({ error: error.message });
    }

    if (error.message.includes('Conflicting slots already exist')) {
      return res.status(409).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

export const listAllAvailabilities = async (req, res) => {
  try {
    const { startTime, endTime, dayOfWeek, isBooked } = req.query;
    const result = await availabilityService.listAllAvailabilities({
      startTime,
      endTime,
      dayOfWeek,
      isBooked,
    });

    if (!result.length) {
      return res.status(404).json({ error: 'Availability not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailabilityById = async (req, res) => {
  try {
    const result = await availabilityService.getAvailabilityById(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Availability not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAvailabilitiesByProfessionalId = async (req, res) => {
  try {
    const { professionalId } = req.params;
    const result = await availabilityService.getAvailabilitiesByProfessionalId(
      professionalId
    );

    if (!result.length) {
      return res.status(404).json({ error: 'Availabilities not found' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAvailabilityById = async (req, res) => {
  if (!req.body.dayOfWeek) {
    return res.status(400).json({ error: 'dayOfWeek is required' });
  }
  req.body.dayOfWeek = req.body.dayOfWeek.toUpperCase();

  const { dayOfWeek } = req.body;
  const { error } = updateAvailabilitySchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const professionalId = req.user.id;
    await availabilityService.updateAvailability(
      req.params.id,
      dayOfWeek,
      professionalId
    );

    res.status(200).json({ message: 'Availability updated successfully' });
  } catch (error) {
    if (error.message.includes('Cannot update a booked slot')) {
      return res.status(400).json({ error: error.message });
    }

    if (error.message.includes('Unauthorized to update this availability')) {
      return res.status(403).json({ error: error.message });
    }

    if (error.message.includes('Availability not found')) {
      return res.status(404).json({ error: error.message });
    }

    res.status(500).json({ error: error.message });
  }
};

export const deleteAvailability = async (req, res) => {
  try {
    const professionalId = req.user.id;
    const result = await availabilityService.deleteAvailability(
      req.params.id,
      professionalId
    );
    if (!result) {
      return res.status(404).json({ error: 'Availability not found' });
    }
    res.status(200).json({ message: result });
  } catch (error) {
    if (error.message.includes('Unauthorized to delete this availability')) {
      return res.status(403).json({ error: error.message });
    }

    if (error.message.includes('Availability not found')) {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
