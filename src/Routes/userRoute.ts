import { Router } from "express";

import { END_POINTS } from "../config/endPoints";

const userRoute = Router();

// Create A  user

userRoute.post(END_POINTS.REGISTER_USER);

// // User Login
// userRoute.post(END_POINTS.LOGIN, loginUser);

// // Request reset password
// userRoute.post(END_POINTS.REQUEST_RESET_PASSWORD, requestResetPassword);

// // Resend Otp
// userRoute.post(END_POINTS.RESEND_EMAIL_OTP, resendOtp);

// // Verify Otp
// userRoute.post(END_POINTS.VERIFY_OTP, verifyOtp);

// // Reset password
// userRoute.post(END_POINTS.RESET_PASSWORD, resetPassword);

export default userRoute;
