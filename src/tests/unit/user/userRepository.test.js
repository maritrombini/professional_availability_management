import User from '../../../models/User.js';
import { createUser, findUserByEmail, findUserById } from '../../../repositories/userRepository.js';

jest.mock('../../../models/User.js');

describe('User Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userData = {
    name: "Anne Rice",
    email: "anne@example.com",
    password: "password123"
  };

  it('should create a user successfully', async () => {
    const user = { id: "f4b9fb4c-6159-417c-a1b2-d3f7bc42963c", ...userData };
    User.create.mockResolvedValue(user);

    const result = await createUser(userData.name, userData.email, userData.password);

    expect(result).toEqual(user);
    expect(User.create).toHaveBeenCalledWith(userData);
  });

  it('should find user by ID successfully', async () => {
    const user = { id: "f4b9fb4c-6159-417c-a1b2-d3f7bc42963c", ...userData };
    User.findByPk.mockResolvedValue(user);

    const result = await findUserById("f4b9fb4c-6159-417c-a1b2-d3f7bc42963c");

    expect(result).toEqual(user);
    expect(User.findByPk).toHaveBeenCalledWith("f4b9fb4c-6159-417c-a1b2-d3f7bc42963c");
  });

  it('should return null if user is not found by ID', async () => {
    User.findByPk.mockResolvedValue(null);

    const result = await findUserById("f4b9fb4c-6159-417c-a1b2-d3f7bc42963c");

    expect(result).toBeNull();
    expect(User.findByPk).toHaveBeenCalledWith("f4b9fb4c-6159-417c-a1b2-d3f7bc42963c");
  });

  it('should find user by email successfully', async () => {
    const user = { id: "f4b9fb4c-6159-417c-a1b2-d3f7bc42963c", ...userData };
    User.findOne.mockResolvedValue(user);

    const result = await findUserByEmail(userData.email);

    expect(result).toEqual(user);
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
  });

  it('should return null if user is not found by email', async () => {
    User.findOne.mockResolvedValue(null);

    const result = await findUserByEmail(userData.email);

    expect(result).toBeNull();
    expect(User.findOne).toHaveBeenCalledWith({ where: { email: userData.email } });
  });
});
