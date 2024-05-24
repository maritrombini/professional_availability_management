import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository.js';

export const createUser = async (data) => {
  try {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await userRepository.createUser(
      data.name,
      data.email,
      hashedPassword
    );
    return user;
  } catch (error) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
};

export const getByEmail = async (email) => {
  const result = await userRepository.findUserByEmail(email)

  return result
}
