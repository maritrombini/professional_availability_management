import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Professional from './Professional.js';

const Slot = sequelize.define(
  'Slot',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    professionalId: {
      type: DataTypes.UUID,
      references: {
        model: Professional,
        key: 'id',
      },
    },
    dayOfWeek: {
      type: DataTypes.ENUM(
        'SUNDAY',
        'MONDAY',
        'TUESDAY',
        'WEDNESDAY',
        'THURSDAY',
        'FRIDAY',
        'SATURDAY'
      ),
      allowNull: false,
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    isBooked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: true,
  }
);

Professional.hasMany(Slot, { foreignKey: 'professionalId' });
Slot.belongsTo(Professional, { foreignKey: 'professionalId' });

export default Slot;
