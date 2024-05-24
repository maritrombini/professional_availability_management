import User from '../models/User.js';

export const createUser = async (name, email, password) => {
  return await User.create({ name, email, password });
};

export const findUserById = async (userId) => {
  return await User.findByPk(userId);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

