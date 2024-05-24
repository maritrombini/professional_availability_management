import bodyParser from 'body-parser';
import express from 'express';
import sequelize from './config/database.js';
import setupSwagger from './docs/swagger.js';
import availabilityRoutes from './routes/availabilityRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import professionalRoutes from './routes/professionalRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
app.use(bodyParser.json());

app.use('/api/availabilities', availabilityRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/professionals', professionalRoutes);
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

setupSwagger(app);

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.log('Error syncing database:', err));

export default app;
