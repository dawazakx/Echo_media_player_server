import { Router } from "express";
import { END_POINTS } from "../config/endPoints";
import { createSubscription } from "../controllers/admin.controller";
import { verifyToken } from "../middleware/authMiddleWare";

const subscribeRoute = Router();

/**
 * @swagger
 * /api/v1/subscribe:
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
subscribeRoute.post(END_POINTS.SUBSCRIBE_APP, verifyToken, createSubscription);

export default subscribeRoute;
