import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as professionalRepository from '../repositories/professionalRepository.js';
import * as userRepository from '../repositories/userRepository.js';

export const authenticateUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({ id: user.id, email: user.email });
  return token;
};

export const authenticateProfessional = async (email, password) => {
  const professional = await professionalRepository.findProfessionalByEmail(
    email
  );
  if (!professional) {
    throw new Error('Invalid email or password');
  }

  const validPassword = await bcrypt.compare(password, professional.password);
  if (!validPassword) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({
    id: professional.id,
    email: professional.email,
  });
  return token;
};

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};
