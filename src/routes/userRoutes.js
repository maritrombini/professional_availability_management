import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Anne Rice
 *               email:
 *                 type: string
 *                 format: email
 *                 example: anne@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: password123
 *     responses:
 *       '201':
 *         description: Successfully created a user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created user
 *                   example: ecc616c5-0102-490e-8583-b74c7b0a7f01
 *                 name:
 *                   type: string
 *                   description: The name of the user
 *                   example: Anne Rice
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email of the user
 *                   example: anne@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was created
 *                   example: '2024-05-21T16:51:43.366Z'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was last updated
 *                   example: '2024-05-21T16:51:43.366Z'
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: User already exists
 *       '500':
 *         description: Internal Server Error
 */
router.post('/', userController.createUser);

export default router;
