import Booking from '../../../models/Booking.js';
import { createBooking } from '../../../repositories/bookingRepository.js';

jest.mock('../../../models/Booking.js');

describe('Booking Repository', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const bookingData = {
    userId: 'a9d328d3-e7a5-43b7-b208-fb4d8a53e9de',
    slotId: 'ca72b3d3-b847-4d94-9a17-91967a907e16',
  };

  it('should create a booking successfully', async () => {
    const booking = {
      id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      userId: bookingData.userId,
      slotId: bookingData.slotId,
    };
    Booking.create.mockResolvedValue(booking);

    const result = await createBooking(bookingData.userId, bookingData.slotId);

    expect(result).toEqual(booking);
    expect(Booking.create).toHaveBeenCalledWith({
      userId: bookingData.userId,
      slotId: bookingData.slotId,
    });
  });

  it('should throw an error if booking creation fails', async () => {
    Booking.create.mockRejectedValue(new Error('Failed to create booking'));

    await expect(
      createBooking(bookingData.userId, bookingData.slotId)
    ).rejects.toThrow('Failed to create booking');
  });
});
