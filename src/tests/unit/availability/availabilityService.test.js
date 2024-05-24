import * as availabilityRepository from '../../../repositories/availabilityRepository.js';
import * as professionalRepository from '../../../repositories/professionalRepository.js';
import * as availabilityService from '../../../services/availabilityService.js';
import { generateSlots, isValidTimeSlot } from '../../../utils/timeUtils.js';

jest.mock('../../../repositories/availabilityRepository.js');
jest.mock('../../../repositories/professionalRepository.js');
jest.mock('../../../utils/timeUtils.js');

describe('Availability Service Tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create availability', async () => {
    const data = {
      professionalId: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      dayOfWeek: 'Tuesday',
      startTime: '07:00',
      endTime: '08:00',
    };
    const slots = [
      {
        dayOfWeek: 'TUESDAY',
        startTime: '07:00',
        endTime: '07:30',
      },
      {
        dayOfWeek: 'TUESDAY',
        startTime: '07:30',
        endTime: '08:00',
      },
    ];

    professionalRepository.findProfessionalByEmail.mockResolvedValue(true);
    isValidTimeSlot.mockReturnValue(true);
    generateSlots.mockReturnValue(slots);
    availabilityRepository.findAvailabilitiesByTime.mockResolvedValue([]);
    availabilityRepository.saveAvailability.mockResolvedValue(slots);

    const result = await availabilityService.createAvailability(data, data.professionalId);

    expect(result).toBe(slots);
    expect(professionalRepository.findProfessionalByEmail).toHaveBeenCalledWith(data.professionalId);
    expect(isValidTimeSlot).toHaveBeenCalledTimes(2);
    expect(generateSlots).toHaveBeenCalledWith(data.dayOfWeek.toUpperCase(), data.startTime, data.endTime);
    expect(availabilityRepository.findAvailabilitiesByTime).toHaveBeenCalledWith(
      data.professionalId,
      data.dayOfWeek.toUpperCase(),
      data.startTime,
      data.endTime
    );
    expect(availabilityRepository.saveAvailability).toHaveBeenCalledWith(data.professionalId, slots);
  });

  it('should list all availabilities', async () => {
    const filters = {
      startTime: '07:00',
      endTime: '12:00',
      dayOfWeek: 'Tuesday',
      isBooked: false,
    };
    const availabilities = [
      {
        id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
        professionalId: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
        ...filters,
      },
    ];

    availabilityRepository.findAllAvailabilities.mockResolvedValue(availabilities);

    const result = await availabilityService.listAllAvailabilities(filters);

    expect(result).toEqual(availabilities);
    expect(availabilityRepository.findAllAvailabilities).toHaveBeenCalledWith(filters);
  });

  it('should get availability by ID', async () => {
    const slotId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';
    const availability = {
      id: slotId,
      professionalId: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
    };

    availabilityRepository.findSlot.mockResolvedValue(availability);

    const result = await availabilityService.getAvailabilityById(slotId);

    expect(result).toEqual(availability);
    expect(availabilityRepository.findSlot).toHaveBeenCalledWith(slotId);
  });

  it('should get availabilities by professional ID', async () => {
    const professionalId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';
    const availabilities = [
      { id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01', professionalId },
    ];

    availabilityRepository.findAvailabilitiesByProfessionalId.mockResolvedValue(availabilities);

    const result = await availabilityService.getAvailabilitiesByProfessionalId(professionalId);

    expect(result).toEqual(availabilities);
    expect(availabilityRepository.findAvailabilitiesByProfessionalId).toHaveBeenCalledWith(professionalId);
  });

  it('should update availability', async () => {
    const availabilityId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';
    const updates = { dayOfWeek: 'WEDNESDAY' };
    const professionalId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';

    availabilityRepository.findAvailabilityById.mockResolvedValue({
      id: availabilityId,
      professionalId,
      isBooked: false,
    });
    availabilityRepository.updateAvailability.mockResolvedValue([1]);

    const result = await availabilityService.updateAvailability(availabilityId, updates.dayOfWeek, professionalId);

    expect(result).toEqual([1]);
    expect(availabilityRepository.findAvailabilityById).toHaveBeenCalledWith(availabilityId);
    expect(availabilityRepository.updateAvailability).toHaveBeenCalledWith(availabilityId, updates);
  });

  it('should not update availability if unauthorized', async () => {
    const availabilityId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';
    const updates = { dayOfWeek: 'WEDNESDAY' };
    const professionalId = 'different-professional-id';

    availabilityRepository.findAvailabilityById.mockResolvedValue({
      id: availabilityId,
      professionalId: 'another-professional-id',
    });

    await expect(
      availabilityService.updateAvailability(availabilityId, updates.dayOfWeek, professionalId)
    ).rejects.toThrow('Unauthorized to update this availability');
  });

  it('should not update availability if slot is booked', async () => {
    const availabilityId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';
    const updates = { dayOfWeek: 'WEDNESDAY' };
    const professionalId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';

    availabilityRepository.findAvailabilityById.mockResolvedValue({
      id: availabilityId,
      professionalId,
      isBooked: true,
    });

    await expect(
      availabilityService.updateAvailability(availabilityId, updates.dayOfWeek, professionalId)
    ).rejects.toThrow('Cannot update a booked slot');
  });

  it('should delete availability', async () => {
    const slotId = '1dcd702e-f9f6-49a6-9d51-04d258fb826a';
    const professionalId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';

    availabilityRepository.findAvailabilityById.mockResolvedValue({
      id: slotId,
      professionalId,
    });
    availabilityRepository.deleteAvailability.mockResolvedValue(1);

    const result = await availabilityService.deleteAvailability(slotId, professionalId);

    expect(result).toBe('Availability deleted successfully');
    expect(availabilityRepository.deleteAvailability).toHaveBeenCalledWith(slotId);
  });

  it('should not delete availability if unauthorized', async () => {
    const slotId = '1dcd702e-f9f6-49a6-9d51-04d258fb826a';
    const professionalId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';

    availabilityRepository.findAvailabilityById.mockResolvedValue({
      id: slotId,
      professionalId: 'another-professional-id',
    });

    await expect(
      availabilityService.deleteAvailability(slotId, professionalId)
    ).rejects.toThrow('Unauthorized to delete this availability');
  });
});
