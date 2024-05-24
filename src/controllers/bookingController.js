import Joi from 'joi';
import * as bookingService from '../services/bookingService.js';

const bookingSchema = Joi.object({
  slotId: Joi.string().uuid().required(),
});

export const bookSession = async (req, res) => {
  const userId = req.user.id;

  const { error } = bookingSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const { booking, user } = await bookingService.bookSession(
      req.body.slotId,
      userId
    );
    const userData = user.toJSON ? user.toJSON() : user;
    const { password, ...sanitizedUser } = userData;

    res.status(200).json({ booking, user: sanitizedUser });
  } catch (error) {
    if (error.message.includes('Unauthorized to create booking')) {
      return res.status(403).json({ error: error.message });
    }

    if (error.message.includes('Slot not found.')) {
      return res.status(404).json({ error: error.message });
    }

    if (error.message.includes('Slot already booked')) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};
