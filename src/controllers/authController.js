import * as authService from '../services/authService.js';
import * as professionalRepository from '../repositories/professionalRepository.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authService.authenticateUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const professionalLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const professional = await professionalRepository.findProfessionalByEmail(
      email
    );
    if (!professional) {
      throw new Error('Professional not found');
    }

    const token = await authService.authenticateProfessional(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
