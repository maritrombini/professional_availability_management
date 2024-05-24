import { Op } from 'sequelize';
import Slot from '../../../models/Slot.js';
import * as availabilityRepository from '../../../repositories/availabilityRepository.js';

jest.mock('../../../models/Slot.js');

describe('Availability Repository Tests', () => {
  const availabilitiesResponse = [
    {
      id: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      professionalId: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      dayOfWeek: 'Tuesday',
      startTime: '07:00',
      endTime: '07:30',
      isBooked: false,
      createdAt: '2024-05-22T00:02:52.554Z',
      updatedAt: '2024-05-22T00:02:52.554Z',
    },
    {
      id: 'ecc616c5-0102-490e-8583-b74c7b0a7f02',
      professionalId: 'ecc616c5-0102-490e-8583-b74c7b0a7f01',
      dayOfWeek: 'Tuesday',
      startTime: '07:30',
      endTime: '08:00',
      isBooked: false,
      createdAt: '2024-05-22T00:02:52.554Z',
      updatedAt: '2024-05-22T00:02:52.554Z',
    },
  ];

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should save availability to database', async () => {
    const professionalId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';
    const slots = [
      { dayOfWeek: 'Tuesday', startTime: '07:00', endTime: '12:00' },
    ];

    Slot.bulkCreate.mockResolvedValue(slots);

    const result = await availabilityRepository.saveAvailability(
      professionalId,
      slots
    );

    expect(result).toEqual(slots);
    expect(Slot.bulkCreate).toHaveBeenCalledWith(
      slots.map((slot) => ({ ...slot, professionalId })),
      { validate: true }
    );
  });

  it('should find availabilities by professional ID', async () => {
    const professionalId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';

    Slot.findAll.mockResolvedValue(availabilitiesResponse);

    await availabilityRepository.findAvailabilitiesByProfessionalId(
      professionalId
    );

    expect(Slot.findAll).toHaveBeenCalledWith({
      where: { professionalId, isBooked: false },
      order: [
        ['createdAt', 'DESC'],
        ['dayOfWeek', 'ASC'],
        ['startTime', 'ASC'],
      ],
    });
  });

  it('should find all availabilities with filters', async () => {
    const filters = {
      startTime: '07:00',
      endTime: '08:00',
      dayOfWeek: 'Tuesday',
    };
    const whereClause = {
      startTime: { [Op.gte]: filters.startTime },
      endTime: { [Op.lte]: filters.endTime },
      dayOfWeek: filters.dayOfWeek.toUpperCase(),
    };

    Slot.findAll.mockResolvedValue(availabilitiesResponse);

    await availabilityRepository.findAllAvailabilities(filters);

    expect(Slot.findAll).toHaveBeenCalledWith({
      where: whereClause,
      order: [
        ['dayOfWeek', 'ASC'],
        ['startTime', 'ASC'],
      ],
    });
  });

  it('should find slot by ID', async () => {
    const slotId = '0eb0a6b3-3201-48e1-b1db-75bd36b91fe5';

    Slot.findByPk.mockResolvedValue(null);

    await availabilityRepository.findSlot(slotId);

    expect(Slot.findByPk).toHaveBeenCalledWith(slotId);
  });

  it('should update slot booking', async () => {
    const slotId = 'f4b9fb4c-6159-417c-a1b2-d3f7bc42963c';
    const isBooked = true;

    Slot.update.mockResolvedValue(1);

    await availabilityRepository.updateSlotBooking(slotId, isBooked);

    expect(Slot.update).toHaveBeenCalledWith(
      { isBooked },
      { where: { id: slotId } }
    );
  });

  it('should find availability by ID', async () => {
    const availabilityId = 'ecc616c5-0102-490e-8583-b74c7b0a7f01';

    Slot.findByPk.mockResolvedValue(null);

    await availabilityRepository.findAvailabilityById(availabilityId);

    expect(Slot.findByPk).toHaveBeenCalledWith(availabilityId);
  });

  it('should update availability', async () => {
    const availabilityId = '0eb0a6b3-3201-48e1-b1db-75bd36b91fe5';
    const updates = { dayOfWeek: 'Wednesday', startTime: '09:00' };

    Slot.update.mockResolvedValue(1);

    await availabilityRepository.updateAvailability(availabilityId, updates);

    expect(Slot.update).toHaveBeenCalledWith(updates, {
      where: { id: availabilityId },
    });
  });

  it('should delete availability by ID', async () => {
    const slotId = 'f4b9fb4c-6159-417c-a1b2-d3f7bc42963c';

    Slot.destroy.mockResolvedValue(1);

    await availabilityRepository.deleteAvailability(slotId);

    expect(Slot.destroy).toHaveBeenCalledWith({ where: { id: slotId } });
  });
});
