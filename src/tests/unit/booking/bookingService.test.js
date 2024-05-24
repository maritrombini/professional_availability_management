import * as availabilityRepository from '../../../repositories/availabilityRepository.js';
import * as bookingRepository from '../../../repositories/bookingRepository.js';
import * as userRepository from '../../../repositories/userRepository.js';
import { bookSession } from '../../../services/bookingService.js';

jest.mock('../../../repositories/availabilityRepository.js');
jest.mock('../../../repositories/bookingRepository.js');
jest.mock('../../../repositories/userRepository.js');

describe('Booking Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const userId = 'f4b9fb4c-6159-417c-a1b2-d3f7bc42963c';
  const bookingData = {
    slotId: 'ca72b3d3-b847-4d94-9a17-91967a907e16',
  };

  it('should book a slot successfully', async () => {
    const slot = {
      id: bookingData.slotId,
      isBooked: false,
      professionalId: 'f4b9fb4c-6159-417c-a1b2-d3f7bc42963c',
      startTime: '10:00:00',
    };
    const user = {
      id: userId,
      name: 'Anne Rice',
      email: 'anne@example.com',
    };
    const booking = {
      id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      userId: userId,
      slotId: bookingData.slotId,
    };

    availabilityRepository.findAllAvailabilities.mockResolvedValue([slot]);
    availabilityRepository.updateSlotBooking.mockResolvedValue(true);
    bookingRepository.createBooking.mockResolvedValue(booking);
    userRepository.findUserById.mockResolvedValue(user);

    const result = await bookSession(bookingData.slotId, userId);

    expect(result).toEqual({ booking, user });
    expect(availabilityRepository.findAllAvailabilities).toHaveBeenCalledTimes(1);
    expect(bookingRepository.createBooking).toHaveBeenCalledWith(userId, bookingData.slotId);
    expect(userRepository.findUserById).toHaveBeenCalledWith(userId);
  });

  it('should throw an error if no slots are available', async () => {
    availabilityRepository.findAllAvailabilities.mockResolvedValue([]);

    await expect(bookSession(bookingData.slotId, userId)).rejects.toThrow('No available slots');
  });

  it('should throw an error if slot is already booked', async () => {
    const slot = { id: bookingData.slotId, isBooked: true };

    availabilityRepository.findAllAvailabilities.mockResolvedValue([slot]);

    await expect(bookSession(bookingData.slotId, userId)).rejects.toThrow('Slot already booked');
  });

  it('should throw an error if slot is not found', async () => {
    const slot = { id: 'anotherSlotId', isBooked: false };

    availabilityRepository.findAllAvailabilities.mockResolvedValue([slot]);

    await expect(bookSession(bookingData.slotId, userId)).rejects.toThrow('Slot not found.');
  });
});
