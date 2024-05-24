import bcrypt from 'bcrypt';
import * as userRepository from '../../../repositories/userRepository.js';
import { createUser, getByEmail } from '../../../services/userService.js';

jest.mock('../../../repositories/userRepository.js');
jest.mock('bcrypt');

describe('User Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userData = {
    name: 'Anne Rice',
    email: 'anne@example.com',
    password: 'password123',
  };

  it('should create a user successfully', async () => {
    const hashedPassword = 'hashedPassword123';
    const user = {
      id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      ...userData,
      password: hashedPassword,
    };

    bcrypt.hash.mockResolvedValue(hashedPassword);
    userRepository.createUser.mockResolvedValue(user);

    const result = await createUser(userData);

    expect(result).toEqual(user);
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(userRepository.createUser).toHaveBeenCalledWith(
      userData.name,
      userData.email,
      hashedPassword
    );
  });

  it('should throw an error if user creation fails', async () => {
    bcrypt.hash.mockRejectedValue(new Error('Hash error'));

    await expect(createUser(userData)).rejects.toThrow(
      'Failed to create user: Hash error'
    );
  });

  it('should get user by email successfully', async () => {
    const user = {
      id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      ...userData,
      password: 'hashedPassword123',
    };
    userRepository.findUserByEmail.mockResolvedValue(user);

    const result = await getByEmail(userData.email);

    expect(result).toEqual(user);
    expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
  });

  it('should return null if user is not found by email', async () => {
    userRepository.findUserByEmail.mockResolvedValue(null);

    const result = await getByEmail(userData.email);

    expect(result).toBeNull();
    expect(userRepository.findUserByEmail).toHaveBeenCalledWith(userData.email);
  });
});
