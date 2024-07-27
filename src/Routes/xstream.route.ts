import { Router } from "express";

import { END_POINTS } from "../config/endPoints";
import {
  connectToXstream,
  getLiveStreamCat,
  getVODStreamCategories,
  getVODStreamsByCategory,
  getLiveStreamsByCategory,
  getStreamUrl,
  getLiveEPG,
  searchLiveTV,
  searchVOD,
  getSeriesCategories,
  getSeriesStreamsByCategory,
  getSeriesInfo,
  getDevicePlaylists,
  updatePlaylistNickname,
} from "../controllers/xstreamcode.controller";
import { createDevice } from "../controllers/device.controller";
import { verifyToken, verifyUser } from "../middleware/authMiddleWare";
import { verifyByPlayerid } from "../middleware/playerMiddleware";

const xstreamRoute = Router();

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
xstreamRoute.post(END_POINTS.XSTREAM_CONNECT, connectToXstream);

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
xstreamRoute.post(END_POINTS.CREATE_DEVICE, createDevice);

/**
 * @swagger
 * /api/v1/live-stream-category:
 *   get:
 *     summary: Get Live Stream Categories
 *     tags: [Live Stream]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
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
xstreamRoute.get(
  END_POINTS.LIVE_STREAM_CATEGORY,
  verifyUser,
  verifyByPlayerid,
  getLiveStreamCat
);

/**
 * @swagger
 * /api/v1/vod-stream-category:
 *   get:
 *     summary: Get VOD Categories
 *     tags: [VOD]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
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
xstreamRoute.get(
  END_POINTS.VOD_STREAM_CATEGORY,
  verifyUser,
  verifyByPlayerid,
  getVODStreamCategories
);

/**
 * @swagger
 * /api/v1/stream-url:
 *   get:
 *     summary: Get Stream Url
 *     tags: [Stream Url]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
 *       - in: query
 *         name: stream_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Stream ID
 *       - in: query
 *         name: stream_extension
 *         schema:
 *           type: string
 *         required: true
 *         description: Stream Extension
 *     responses:
 *       200:
 *         description: Stream URL retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
xstreamRoute.get(END_POINTS.STREAM_URL, verifyUser, verifyByPlayerid, getStreamUrl);

/**
 * @swagger
 * /api/v1/live-stream:
 *   get:
 *     summary: Get Live Streams By Category
 *     tags: [Live Stream]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
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
xstreamRoute.get(
  END_POINTS.LIVE_STREAMS,
  verifyUser,
  verifyByPlayerid,
  getLiveStreamsByCategory
);

/**
 * @swagger
 * /api/v1/vod-stream:
 *   get:
 *     summary: Get VOD Streams By Category
 *     tags: [VOD]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
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
xstreamRoute.get(END_POINTS.VOD_STREAMS, verifyUser, verifyByPlayerid, getVODStreamsByCategory);

/**
 * @swagger
 * /api/v1/live-stream-epg:
 *   get:
 *     summary: Get Live Streams EPG
 *     tags: [Live Stream]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
 *       - in: query
 *         name: channelId
 *         schema:
 *           type: string
 *         required: true
 *         description: Channel ID
 *     responses:
 *       200:
 *         description: Live EPG retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
xstreamRoute.get(END_POINTS.LIVE_STREAM_EPG, verifyUser, verifyByPlayerid, getLiveEPG);

/**
 * @swagger
 * /api/v1/search-livetv:
 *   get:
 *     summary: Get Live Streams by name search
 *     tags: [Live Stream]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: name
 *     responses:
 *       200:
 *         description: Live tv retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
xstreamRoute.get(END_POINTS.SEARCH_LIVE_STREAM, verifyUser, verifyByPlayerid, searchLiveTV);

/**
 * @swagger
 * /api/v1/search-vod:
 *   get:
 *     summary: Get VOD Streams by name search
 *     tags: [VOD]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: name
 *     responses:
 *       200:
 *         description: vod retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
xstreamRoute.get(END_POINTS.SEARCH_VOD, verifyUser, verifyByPlayerid, searchVOD);

/**
 * @swagger
 * /api/v1/series-category:
 *   get:
 *     summary: Get Series Categories
 *     tags: [Series]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
 *     responses:
 *       200:
 *         description: Series categories retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
xstreamRoute.get(END_POINTS.SERIES_CATEGORY, verifyUser, verifyByPlayerid, getSeriesCategories);

/**
 * @swagger
 * /api/v1/series-streams:
 *   get:
 *     summary: Get Series Streams
 *     tags: [Series]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Series streams retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
xstreamRoute.get(
  END_POINTS.SERIES_STREAMS,
  verifyUser,
  verifyByPlayerid,
  getSeriesStreamsByCategory
);

/**
 * @swagger
 * /api/v1/series-info:
 *   get:
 *     summary: Get Series Info
 *     tags: [Series]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
 *       - in: query
 *         name: series_id
 *         schema:
 *           type: string
 *         required: true
 *         description: Series ID
 *     responses:
 *       200:
 *         description: Series info retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
xstreamRoute.get(END_POINTS.SERIES_INFO, verifyUser, verifyByPlayerid, getSeriesInfo);

/**
 * @swagger
 * /api/v1/playlist:
 *   get:
 *     summary: Get User playlist
 *     tags: [Playlist]
 *     parameters:
 *       - in: header
 *         name: device-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Device ID
 *       - in: header
 *         name: playlist-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Playlist ID
 *       - in: header
 *         name: Authorization
 *         schema:
 *           type: string
 *         required: true
 *         description: Bearer token for authentication
 *     responses:
 *       200:
 *         description: playlist retrieved successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
xstreamRoute.get(END_POINTS.USER_PLAYLIST, verifyUser, verifyToken, getDevicePlaylists);

/**
 * @swagger
 * /api/v1/update-playlist:
 *   patch:
 *     summary: update playlist
 *     tags: [Xstream]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               playlist_id:
 *                 type: string
 *               nickname:
 *                 type: string
 *                 default: kelz
 *     responses:
 *       200:
 *         description: Successfully updated playlist nickname
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
xstreamRoute.patch(END_POINTS.UPDATE_PLAYLIST, updatePlaylistNickname);

export default xstreamRoute;
