import { Router } from "express";
import { END_POINTS } from "../config/endPoints";
import { adminLogin, adminSignup, createSubscription } from "../controllers/admin.controller";
import { verifyToken } from "../middleware/authMiddleWare";

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

/**
 * @swagger
 * /api/v1/admin/subscribe:
 *   post:
 *     summary: App Subscription
 *     tags: [Subscription]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 default: kelechi
 *               num_of_devices:
 *                 type: string
 *                 default: kelz
 *               amount:
 *                 type: string
 *                 default: test1@mailinator.com
 *               description:
 *                 type: string
 *                 default: Test@123
 *     responses:
 *       201:
 *         description: Successfully subscribed
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
adminRoute.post(END_POINTS.SUBSCRIBE_APP, verifyToken, createSubscription);

export default adminRoute;
