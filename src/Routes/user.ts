import { Router } from "express";
import { END_POINTS } from "../config/endPoints";
import {
  forgotPasswordHandler,
  loginUser,
  resetPasswordHandler,
  resendUserOtp,
  signup,
  verifyUserOtp,
  changeUserPassword,
} from "../controllers/user.controller";
import { verifyToken } from "../middleware/authMiddleWare";

const UserRoute = Router();

/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
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
UserRoute.post(END_POINTS.SIGNUP, signup);

/**
 * @swagger
 * /api/v1/user/verify:
 *   post:
 *     summary: Account verification
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               otp:
 *                 type: string
 *               email:
 *                 type: string
 *                 default: test1@mailinator.com
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
UserRoute.post(END_POINTS.VERIFY_USER, verifyUserOtp);

/**
 * @swagger
 * /api/v1/user/login:
 *   post:
 *     summary: User Login
 *     tags: [Users]
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
UserRoute.post(END_POINTS.LOGIN, loginUser);

/**
 * @swagger
 * /api/v1/user/resend-otp:
 *   post:
 *     summary: Resend OTP
 *     tags: [Users]
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
UserRoute.post(END_POINTS.RESEND_OTP, resendUserOtp);

/**
 * @swagger
 * /api/v1/user/forgot-password:
 *   post:
 *     summary: Forgot Password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 default: test3@mailinator.com
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
UserRoute.post(END_POINTS.FORGOT_PASSWORD, forgotPasswordHandler);

/**
 * @swagger
 * /api/v1/user/reset-password:
 *   post:
 *     summary: Reset Password
 *     tags: [Users]
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
 *               otp:
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
UserRoute.post(END_POINTS.RESET_PASSWORD, resetPasswordHandler);

/**
 * @swagger
 * /api/v1/user/change-password:
 *   post:
 *     summary: Change Password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       parameters:
 *         - in: authorization
 *           name: token
 *           schema:
 *             type: string
 *           required: true
 *           description: Bearer token for authentication
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
UserRoute.post(END_POINTS.CHANGE_PASSWORD, verifyToken, changeUserPassword);

export default UserRoute;
