import Professional from '../models/Professional.js';

export const createProfessional = async (name, email, password) => {
  return await Professional.create({ name, email, password });
};

export const findProfessionalByEmail = async (email) => {
  return await Professional.findOne({ where: { email } });
};
