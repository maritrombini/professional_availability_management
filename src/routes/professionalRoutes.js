import express from 'express';
import * as professionalController from '../controllers/professionalController.js';

const router = express.Router();

/**
 * @swagger
 * /professionals:
 *   post:
 *     summary: Create a new professional
 *     tags: [Professionals]
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
 *         description: Successfully created a professional
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The ID of the newly created professional
 *                   example: ecc616c5-0102-490e-8583-b74c7b0a7f01
 *                 name:
 *                   type: string
 *                   description: The name of the professional
 *                   example: Anne Rice
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The email of the professional
 *                   example: anne@example.com
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the professional was created
 *                   example: '2024-05-21T16:43:36.141Z'
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the professional was last updated
 *                   example: '2024-05-21T16:43:36.141Z'
 *       '400':
 *         description: Bad request
 *       '409':
 *         description: Professional already exists
 *       '500':
 *         description: Internal Server Error
 */
router.post('/', professionalController.createProfessional);

export default router;
