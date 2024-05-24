import bodyParser from 'body-parser';
import express from 'express';
import request from 'supertest';
import userRoutes from '../../../routes/userRoutes.js';
import * as userService from '../../../services/userService.js';

jest.mock('../../../services/userService.js');

const app = express();
app.use(bodyParser.json());
app.use('/users', userRoutes);

describe('User Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userPayload = {
    name: 'Anne Rice',
    email: 'anne@example.com',
    password: 'password123',
  };

  const createdUserResponse = {
    id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
    name: 'Anne Rice',
    email: 'anne@example.com',
  };

  it('should create user and return 201', async () => {
    userService.createUser.mockResolvedValue({
      dataValues: createdUserResponse,
    });
    userService.getByEmail.mockResolvedValue(null);

    const response = await request(app).post('/users').send(userPayload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(createdUserResponse);
    expect(userService.createUser).toHaveBeenCalledWith(userPayload);
    expect(userService.getByEmail).toHaveBeenCalledWith(userPayload.email);
  });

  it('should return 400 if validation fails', async () => {
    const invalidUserPayload = { ...userPayload, email: 'invalid-email' };

    const response = await request(app).post('/users').send(invalidUserPayload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should return 409 if user already exists', async () => {
    userService.getByEmail.mockResolvedValue(createdUserResponse);

    const response = await request(app).post('/users').send(userPayload);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ message: 'User already exists' });
  });

  it('should return 500 if user creation fails', async () => {
    userService.createUser.mockRejectedValue(new Error('Server error'));
    userService.getByEmail.mockResolvedValue(null);

    const response = await request(app).post('/users').send(userPayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Server error' });
  });
});
