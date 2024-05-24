import bodyParser from 'body-parser';
import express from 'express';
import request from 'supertest';
import professionalRoute from '../../../routes/professionalRoutes';
import * as professionalService from '../../../services/professionalService';

jest.mock('../../../services/professionalService');

const app = express();
app.use(bodyParser.json());
app.use('/professionals', professionalRoute);

describe('Professional Integration Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a professional and return 201', async () => {
    professionalService.getByEmail.mockResolvedValue(false);
    professionalService.createProfessional.mockResolvedValue({
      dataValues: {
        name: 'Anne Rice',
        email: 'anne@example.com',
        password: 'hashedpassword'
      }
    });

    const response = await request(app)
      .post('/professionals')
      .send({
        name: 'Anne Rice',
        email: 'anne@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      name: 'Anne Rice',
      email: 'anne@example.com'
    });
  });

  it('should return 400 if validation fails (invalid email)', async () => {
    const response = await request(app)
      .post('/professionals')
      .send({
        name: 'Anne Rice',
        email: 'invalid-email',
        password: 'password123'
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: '"email" must be a valid email'
    });
  });

  it('should return 409 if professional already exists', async () => {
    professionalService.getByEmail.mockResolvedValue(true);

    const response = await request(app)
      .post('/professionals')
      .send({
        name: 'Anne Rice',
        email: 'anne@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      message: 'Professional already exists'
    });
  });

  it('should return 500 if there is a server error', async () => {
    professionalService.getByEmail.mockRejectedValue(new Error('Server error'));

    const response = await request(app)
      .post('/professionals')
      .send({
        name: 'Anne Rice',
        email: 'anne@example.com',
        password: 'password123'
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Server error'
    });
  });
});
