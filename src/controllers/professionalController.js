import Joi from 'joi';
import * as professionalService from '../services/professionalService.js';

const professionalSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const createProfessional = async (req, res) => {
  const { error } = professionalSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const hasEmail = await professionalService.getByEmail(req.body.email)
    if(hasEmail) {
      return res.status(409).json({message:'Professional already exists'})
    }
    const result = await professionalService.createProfessional(req.body);

    const { password, ...professionalWithoutPassword } = result.dataValues;
    res.status(201).json(professionalWithoutPassword);
  } catch (error) {
  
    res.status(500).json({ error: error.message });
  }
};
