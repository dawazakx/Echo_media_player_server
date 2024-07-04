import { Router } from "express";
import { END_POINTS } from "../config/endPoints";
import { adminLogin, adminSignup } from "../controllers/admin.controller";

const adminRoute = Router();

/**
 * @swagger
 * /api/v1/admin/register-admin:
 *   post:
 *     summary: Register new Admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 default: kelechi
 *               lastName:
 *                 type: string
 *                 default: kelz
 *               email:
 *                 type: string
 *                 default: test1@mailinator.com
 *               password:
 *                 type: string
 *                 default: Test@123
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
adminRoute.post(END_POINTS.REGISTER_ADMIN, adminSignup);

/**
 * @swagger
 * /api/v1/admin/login:
 *   post:
 *     summary: Admin Login
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: test1@mailinator.com
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User verified
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
adminRoute.post(END_POINTS.LOGIN, adminLogin);

export default adminRoute;
