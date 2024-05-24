import Professional from '../../../models/Professional.js';
import * as professionalRepository from '../../../repositories/professionalRepository.js';

jest.mock('../../../models/Professional.js');

describe('Professional Repository Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a professional', async () => {
    const name = 'Anne Rice';
    const email = 'anne@example.com';
    const password = 'hashedPassword';

    const expectedResult = { name, email, password };
    Professional.create.mockResolvedValue(expectedResult);

    const result = await professionalRepository.createProfessional(
      name,
      email,
      password
    );

    expect(result).toEqual(expectedResult);
    expect(Professional.create).toHaveBeenCalledWith({ name, email, password });
  });

  it('should find a professional by email', async () => {
    const email = 'anne@example.com';
    const expectedResult = {
      name: 'Anne Rice',
      email,
      password: 'hashedPassword',
    };

    Professional.findOne.mockResolvedValue(expectedResult);

    const result = await professionalRepository.findProfessionalByEmail(email);

    expect(result).toEqual(expectedResult);
    expect(Professional.findOne).toHaveBeenCalledWith({ where: { email } });
  });
});
