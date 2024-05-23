import { Router } from "express";

import { END_POINTS } from "../config/endPoints";
import {
  connectToXstream,
  getLiveStreamCat,
  getVODStreamCategories,
  getVODStreamsByCategory,
  getLiveStreamsByCategory,
} from "../controllers/xstreamcode.controller";
import { createDevice } from "../controllers/device.controller";
import { verifyUser } from "../middleware/authMiddleWare";

const userRoute = Router();

/**
 * @swagger
 * /api/v1/connect-xstream:
 *   post:
 *     summary: Connect to xstream server
 *     tags: [Xstream]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               device_id:
 *                 type: string
 *                 default: 80a5b5e2-9360-400f-9464-fecd20a21fd7
 *               nickname:
 *                 type: string
 *                 default: kelz
 *               username:
 *                 type: string
 *                 default: Dawazak
 *               password:
 *                 type: string
 *                 default: wcunmgpamy
 *               url:
 *                 type: string
 *                 default: http://ottkiller.pro
 *     responses:
 *       200:
 *         description: Successfully connected to xstream server
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
userRoute.post(END_POINTS.XSTREAM_CONNECT, connectToXstream);

/**
 * @swagger
 * /api/v1/generate-device-id:
 *   post:
 *     summary: Generate device id
 *     tags: [Device]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 default: tv
 *               os:
 *                 type: string
 *                 default: webOs
 *     responses:
 *       200:
 *         description: Device ID generated successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
userRoute.post(END_POINTS.CREATE_DEVICE, createDevice);

/**
 * @swagger
 * /api/v1/live-stream-category:
 *   get:
 *     summary: Get Live Stream Categories
 *     tags: [Live Stream]
 *     parameters:
 *       - in: header
 *         name: device_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *     responses:
 *       200:
 *         description: Live stream categories retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRoute.get(END_POINTS.LIVE_STREAM_CATEGORY, verifyUser, getLiveStreamCat);

/**
 * @swagger
 * /api/v1/vod-stream-category:
 *   get:
 *     summary: Get VOD Categories
 *     tags: [VOD]
 *     parameters:
 *       - in: header
 *         name: device_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *     responses:
 *       200:
 *         description: VOD categories retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRoute.get(END_POINTS.VOD_STREAM_CATEGORY, verifyUser, getVODStreamCategories);

/**
 * @swagger
 * /api/v1/live-stream:
 *   get:
 *     summary: Get Live Streams By Category
 *     tags: [Live Stream]
 *     parameters:
 *       - in: header
 *         name: device_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Live streams retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRoute.get(END_POINTS.LIVE_STREAMS, verifyUser, getLiveStreamsByCategory);

/**
 * @swagger
 * /api/v1/vod-stream:
 *   get:
 *     summary: Get VOD Streams By Category
 *     tags: [VOD]
 *     parameters:
 *       - in: header
 *         name: device_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: VOD streams retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
userRoute.get(END_POINTS.VOD_STREAMS, verifyUser, getVODStreamsByCategory);

export default userRoute;
