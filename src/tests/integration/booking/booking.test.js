import bodyParser from 'body-parser';
import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import bookingRoutes from '../../../routes/bookingRoutes.js';
import * as bookingService from '../../../services/bookingService.js';

jest.mock('../../../services/bookingService.js');

const app = express();
app.use(bodyParser.json());
app.use('/booking', bookingRoutes);

const generateToken = () => {
  return jwt.sign(
    { id: 'a9d328d3-e7a5-43b7-b208-fb4d8a53e9de', role: 'user' },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
};

describe('Booking Integration Tests', () => {
  let token;

  beforeAll(() => {
    token = generateToken();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const bookingPayload = {
    slotId: 'ca72b3d3-b847-4d94-9a17-91967a907e16',
  };

  const bookingResponse = {
    booking: {
      id: 'fe2304d6-954a-4609-8a32-8d352d653815',
      userId: 'a9d328d3-e7a5-43b7-b208-fb4d8a53e9de',
      slotId: 'ca72b3d3-b847-4d94-9a17-91967a907e16',
      updatedAt: '2024-05-23T00:10:19.091Z',
      createdAt: '2024-05-23T00:10:19.091Z',
    },
    user: {
      id: 'a9d328d3-e7a5-43b7-b208-fb4d8a53e9de',
      name: 'Anne',
      email: 'annerice@mail.com',
      createdAt: '2024-05-22T23:46:33.882Z',
      updatedAt: '2024-05-22T23:46:33.882Z',
    },
  };

  it('should create booking and return 200', async () => {
    bookingService.bookSession.mockResolvedValue(bookingResponse);

    const response = await request(app)
      .post('/booking')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingPayload);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(bookingResponse);
  });

  it('should return 409 if slot is already booked', async () => {
    bookingService.bookSession.mockRejectedValue(
      new Error('Slot already booked')
    );

    const response = await request(app)
      .post('/booking')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingPayload);

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ error: 'Slot already booked' });
  });

  it('should return 400 if booking payload is invalid', async () => {
    const invalidPayload = {
      slotId: 'invalid-uuid',
    };

    const response = await request(app)
      .post('/booking')
      .set('Authorization', `Bearer ${token}`)
      .send(invalidPayload);

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app).post('/booking').send(bookingPayload);

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Access denied, no token provided.');
  });

  it('should return 500 if there is a server error on booking', async () => {
    bookingService.bookSession.mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .post('/booking')
      .set('Authorization', `Bearer ${token}`)
      .send(bookingPayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Server error' });
  });
});
