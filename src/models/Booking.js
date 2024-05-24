import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Slot from './Slot.js';
import User from './User.js';

const Booking = sequelize.define(
  'Booking',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      },
    },
    slotId: {
      type: DataTypes.UUID,
      references: {
        model: Slot,
        key: 'id',
      },
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Slot.hasMany(Booking, { foreignKey: 'slotId' });
Booking.belongsTo(Slot, { foreignKey: 'slotId' });

export default Booking;
