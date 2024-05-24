import Joi from 'joi';
import * as userService from '../services/userService.js';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const hasEmail = await userService.getByEmail(req.body.email)
    if(hasEmail) {
      return res.status(409).json({message: 'User already exists'})
    }

    const result = await userService.createUser(req.body);
    const { password, ...userWithoutPassword } = result.dataValues;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
