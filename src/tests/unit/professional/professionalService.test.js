import bcrypt from 'bcrypt';
import * as professionalRepository from '../../../repositories/professionalRepository.js';
import * as professionalService from '../../../services/professionalService.js';

jest.mock('../../../repositories/professionalRepository.js');

describe('Professional Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a professional', async () => {
    const data = {
      name: 'Anne Rice',
      email: 'anne@example.com',
      password: 'password123',
    };
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const expectedResult = {
      id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };

    professionalRepository.createProfessional.mockResolvedValue(expectedResult);

    const result = await professionalService.createProfessional(data);

    expect(result.email).toEqual(expectedResult.email);
  });

  it('should get professional by email', async () => {
    const email = 'anne@example.com';
    const expectedResult = {
      name: 'Anne Rice',
      email,
      password: 'hashedPassword',
    };

    professionalRepository.findProfessionalByEmail.mockResolvedValue(
      expectedResult
    );

    const result = await professionalService.getByEmail(email);

    expect(result).toEqual(expectedResult);
    expect(professionalRepository.findProfessionalByEmail).toHaveBeenCalledWith(
      email
    );
  });
});
