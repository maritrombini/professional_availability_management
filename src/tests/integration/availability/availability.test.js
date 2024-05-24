import express from 'express';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import availabilityRoutes from '../../../routes/availabilityRoutes.js';
import * as availabilityService from '../../../services/availabilityService.js';

jest.mock('../../../services/availabilityService.js');

const app = express();
app.use(express.json());
app.use('/availability', availabilityRoutes);

const generateToken = () => {
  return jwt.sign({ id: 1, role: 'user' }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

describe('Availability Integration Tests', () => {
  let token;

  beforeAll(() => {
    token = generateToken();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const availabilityPayload = {
    professionalId: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
    dayOfWeek: 'Tuesday',
    startTime: '07:00',
    endTime: '12:00',
  };

  const availabilityResponse = {
    id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
    professionalId: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
    dayOfWeek: 'Tuesday',
    startTime: '07:00',
    endTime: '12:00',
    isBooked: false,
    createdAt: '2024-05-22T00:02:52.554Z',
    updatedAt: '2024-05-22T00:02:52.554Z',
  };

  it('should create availability and return 201', async () => {
    availabilityService.createAvailability.mockResolvedValue(
      availabilityResponse
    );

    const response = await request(app)
      .post('/availability')
      .set('Authorization', `Bearer ${token}`)
      .send(availabilityPayload);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(availabilityResponse);
  });

  it('should return 500 if there is a server error on create', async () => {
    availabilityService.createAvailability.mockRejectedValue(
      new Error('Server error')
    );

    const response = await request(app)
      .post('/availability')
      .set('Authorization', `Bearer ${token}`)
      .send(availabilityPayload);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Server error' });
  });

  it('should return list of availabilities', async () => {
    availabilityService.listAllAvailabilities.mockResolvedValue([
      availabilityResponse,
    ]);

    const response = await request(app)
      .get('/availability')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([availabilityResponse]);
  });

  it('should return availability by ID', async () => {
    availabilityService.getAvailabilityById.mockResolvedValue(
      availabilityResponse
    );

    const response = await request(app)
      .get('/availability/ecc616c5-0102-490e-8583-b74c7b0a7f01')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(availabilityResponse);
  });

  it('should return 404 if availability is not found by ID', async () => {
    availabilityService.getAvailabilityById.mockResolvedValue(null);

    const response = await request(app)
      .get('/availability/ecc616c5-0102-490e-8583-b74c7b0a7f01')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Availability not found' });
  });

  it('should return availabilities by professional ID', async () => {
    availabilityService.getAvailabilitiesByProfessionalId.mockResolvedValue([
      availabilityResponse,
    ]);

    const response = await request(app)
      .get('/availability/professional/ecc616c5-0102-490e-8583-b74c7b0a7f01')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual([availabilityResponse]);
  });

  it('should return 404 if availability is not found by professional ID', async () => {
    availabilityService.getAvailabilitiesByProfessionalId.mockResolvedValue([]);

    const response = await request(app)
      .get('/availability/professional/ecc616c5-0102-490e-8583-b74c7b0a7f01')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Availabilities not found' });
  });

  it('should update availability by ID', async () => {
    availabilityService.updateAvailability.mockResolvedValue(true);

    const response = await request(app)
      .put('/availability/ecc616c5-0102-490e-8583-b74c7b0a7f01')
      .set('Authorization', `Bearer ${token}`)
      .send({ dayOfWeek: 'Wednesday', startTime: '09:00' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Availability updated successfully',
    });
  });

  it('should return 500 if there is a server error on update', async () => {
    availabilityService.updateAvailability.mockRejectedValue(
      new Error('Server error')
    );

    const response = await request(app)
      .put('/availability/ecc616c5-0102-490e-8583-b74c7b0a7f01')
      .set('Authorization', `Bearer ${token}`)
      .send({ dayOfWeek: 'Wednesday', startTime: '09:00' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Server error' });
  });

  it('should delete availability by ID', async () => {
    availabilityService.deleteAvailability.mockResolvedValue(
      'Availability deleted successfully'
    );

    const response = await request(app)
      .delete('/availability/ecc616c5-0102-490e-8583-b74c7b0a7f01')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Availability deleted successfully',
    });
  });

  it('should return 500 if there is a server error on delete', async () => {
    availabilityService.deleteAvailability.mockRejectedValue(
      new Error('Server error')
    );

    const response = await request(app)
      .delete('/availability/ecc616c5-0102-490e-8583-b74c7b0a7f01')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Server error' });
  });

  it('should return 401 if no token is provided', async () => {
    const response = await request(app)
      .post('/availability')
      .send(availabilityPayload);

    expect(response.status).toBe(401);
  });
});
