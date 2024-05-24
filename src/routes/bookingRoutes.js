import express from 'express';
import * as bookingController from '../controllers/bookingController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Book a slot
 *     tags:
 *       - Bookings
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slotId:
 *                 type: string
 *                 example: "d744cd2e-3dc8-4da3-a72a-e13bdf63bc90"
 *     responses:
 *       '200':
 *         description: Successfully booked a slot
 *         content:
 *           application/json:
 *             example:
 *               booking:
 *                 id: "9d5272a2-5d1d-47dc-85cb-2674e7f220c3"
 *                 userId: "ecc616c5-0102-490e-8583-b74c7b0a7f01"
 *                 slotId: "d744cd2e-3dc8-4da3-a72a-e13bdf63bc90"
 *                 updatedAt: "2024-05-22T00:55:34.048Z"
 *                 createdAt: "2024-05-22T00:55:34.048Z"
 *               user:
 *                 id: "ecc616c5-0102-490e-8583-b74c7b0a7f01"
 *                 name: "Anne Rice"
 *                 email: "anne@mail.com"
 *                 createdAt: "2024-05-22T00:42:15.940Z"
 *                 updatedAt: "2024-05-22T00:42:15.940Z"
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Unauthorized
 *       '409':
 *         description: Slot already booked
 *       '500':
 *         description: Internal Server Error
 */

router.post('/', authenticate, bookingController.bookSession);

export default router;
