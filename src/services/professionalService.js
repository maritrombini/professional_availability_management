import bcrypt from 'bcrypt';
import * as professionalRepository from '../repositories/professionalRepository.js';

export const createProfessional = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const professional = await professionalRepository.createProfessional(
      data.name,
      data.email,
      hashedPassword
    );
    return professional;
  } catch (error) {
    throw new Error(`Failed to create professional: ${error.message}`);
  }
};


export const getByEmail = async (email) => {
  const result = await professionalRepository.findProfessionalByEmail(email)

  return result
}
