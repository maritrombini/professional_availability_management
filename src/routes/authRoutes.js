import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User and Professional Authentication
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       '200':
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "generated_token"
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal server error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/auth/professional/login:
 *   post:
 *     summary: Login professional
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: professional@example.com
 *               password:
 *                 type: string
 *                 example: password456
 *     responses:
 *       '200':
 *         description: Professional logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "generated_token"
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal server error
 */
router.post('/professional/login', authController.professionalLogin);

export default router;
