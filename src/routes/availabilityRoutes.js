import express from 'express';
import * as availabilityController from '../controllers/availabilityController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Availability
 *   description: Endpoints to manage professionals’ availability
 */

/**
 * @swagger
 * /availabilities:
 *   post:
 *     summary: Create availability of a professional
 *     tags:
 *       - Availability
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               professionalId:
 *                 type: string
 *               dayOfWeek:
 *                 type: string
 *               startTime:
 *                 type: string
 *               endTime:
 *                 type: string
 *           example:
 *             professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *             dayOfWeek: "Wednesday"
 *             startTime: "15:00"
 *             endTime: "17:00"
 *     responses:
 *       '201':
 *         description: Availability created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   professionalId:
 *                     type: string
 *                   dayOfWeek:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                   endTime:
 *                     type: string
 *                   isBooked:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - id: "29418e2e-4616-4a5a-a618-033f17f8a299"
 *                 isBooked: false
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "15:00:00"
 *                 endTime: "15:30:00"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:02:52.554Z"
 *               - id: "493b6e9a-042d-4416-a68c-770d61ae43e7"
 *                 isBooked: false
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "15:30:00"
 *                 endTime: "16:00:00"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:02:52.554Z"
 *               - id: "2ff69cdf-84e2-4749-a35b-76b1a2cb3df5"
 *                 isBooked: false
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "16:00:00"
 *                 endTime: "16:30:00"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:02:52.554Z"
 *               - id: "e9cb8941-165b-490a-86af-758bbaeb8b28"
 *                 isBooked: false
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "16:30:00"
 *                 endTime: "17:00:00"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:02:52.554Z"
 *               - id: "91bc37cf-9f09-4e71-9e05-4bb379871f57"
 *                 isBooked: false
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "17:00:00"
 *                 endTime: "17:30:00"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:02:52.554Z"
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden. Only professionals can perform this operation.
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 */

router.post('/', authenticate, availabilityController.createAvailability);

/**
 * @swagger
 * /availabilities:
 *   get:
 *     summary: List all availabilities
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: dayOfWeek
 *         schema:
 *           type: string
 *         example: SUNDAY
 *         description: Availability day of the week
 *       - in: query
 *         name: startTime
 *         schema:
 *           type: string
 *           format: time
 *         example: 16:00:00
 *         description: Availability start time
 *       - in: query
 *         name: endTime
 *         schema:
 *           type: string
 *           format: time
 *         example: 17:00:00
 *         description: Availability end time
 *       - in: query
 *         name: isBooked
 *         schema:
 *           type: boolean
 *         description: Indicates whether availability is reserved
 *     responses:
 *       '200':
 *         description: List of all availabilities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   professionalId:
 *                     type: string
 *                   dayOfWeek:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                   endTime:
 *                     type: string
 *                   isBooked:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - id: "2ff69cdf-84e2-4749-a35b-76b1a2cb3df5"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "16:00:00"
 *                 endTime: "16:30:00"
 *                 isBooked: true
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:05:54.844Z"
 *               - id: "e9cb8941-165b-490a-86af-758bbaeb8b28"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "16:30:00"
 *                 endTime: "17:00:00"
 *                 isBooked: true
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:05:54.906Z"
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal Server Error
 */

router.get('/', authenticate, availabilityController.listAllAvailabilities);

/**
 * @swagger
 * /availabilities/{id}:
 *   get:
 *     summary: Get availability by ID
 *     tags:
 *       - Availability
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Availability ID
 *     responses:
 *       '200':
 *         description: Availability found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 professionalId:
 *                   type: string
 *                 dayOfWeek:
 *                   type: string
 *                 startTime:
 *                   type: string
 *                 endTime:
 *                   type: string
 *                 isBooked:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: "91bc37cf-9f09-4e71-9e05-4bb379871f57"
 *               professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *               dayOfWeek: "THURSDAY"
 *               startTime: "12:30:00"
 *               endTime: "13:30:00"
 *               isBooked: false
 *               createdAt: "2024-05-22T00:02:52.554Z"
 *               updatedAt: "2024-05-22T01:42:14.807Z"
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Availability not found
 *       '500':
 *         description: Internal Server Error
 */

router.get('/:id', authenticate, availabilityController.getAvailabilityById);

/**
 * @swagger
 * /availabilities/professional/{professionalId}:
 *   get:
 *     summary: List all availabilities of a professional by ID
 *     tags:
 *       - Availability
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: professionalId
 *         schema:
 *           type: string
 *         required: true
 *         description: Professional ID
 *     responses:
 *       '200':
 *         description: List all availabilities of a professional by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   professionalId:
 *                     type: string
 *                   dayOfWeek:
 *                     type: string
 *                   startTime:
 *                     type: string
 *                   endTime:
 *                     type: string
 *                   isBooked:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *             example:
 *               - id: "29418e2e-4616-4a5a-a618-033f17f8a299"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "15:00:00"
 *                 endTime: "15:30:00"
 *                 isBooked: false
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:02:52.554Z"
 *               - id: "493b6e9a-042d-4416-a68c-770d61ae43e7"
 *                 professionalId: "1042bb3c-7fda-47bf-aa92-f29d8dc08e26"
 *                 dayOfWeek: "WEDNESDAY"
 *                 startTime: "15:30:00"
 *                 endTime: "16:00:00"
 *                 isBooked: false
 *                 createdAt: "2024-05-22T00:02:52.554Z"
 *                 updatedAt: "2024-05-22T00:02:52.554Z"
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Availabilities not found
 *       '500':
 *         description: Internal Server Error
 */

router.get(
  '/professional/:professionalId',
  authenticate,
  availabilityController.getAvailabilitiesByProfessionalId
);

/**
 * @swagger
 * /availabilities/{id}:
 *   put:
 *     summary: Update availability by ID
 *     tags: [Availability]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Availability ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dayOfWeek:
 *                 type: string
 *                 enum: [sunday, monday, tuesday, wednesday, thursday, friday, saturday]
 *           example:
 *             dayOfWeek: thursday
 *     responses:
 *       '200':
 *         description: Availability updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Availability updated successfully"
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden. Only professionals can perform this operation.
 *       '404':
 *         description: Availability not found
 *       '409':
 *         description: Conflict
 *       '500':
 *         description: Internal Server Error
 */

router.put('/:id', authenticate, availabilityController.updateAvailabilityById);

/**
 * @swagger
 * /availabilities/{id}:
 *   delete:
 *     summary: Delete availability by ID
 *     tags:
 *       - Availability
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Availability ID
 *     responses:
 *       '200':
 *         description: Availability deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Availability deleted successfully
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '403':
 *         description: Forbidden. Only professionals can perform this operation.
 *       '404':
 *         description: Availability not found
 *       '500':
 *         description: Internal Server Error
 */
router.delete('/:id', authenticate, availabilityController.deleteAvailability);

export default router;
