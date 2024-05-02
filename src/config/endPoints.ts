const END_POINTS = {
  REGISTER_USER: "/register",
  LOGIN: "/login",
  REQUEST_RESET_PASSWORD: "/req-reset-password",
  VERIFY_OTP: "/verify-otp",
  RESET_PASSWORD: "/reset-password",
  RESEND_EMAIL_OTP: "/resend-email-otp",
  UPLOAD_FILE: "/upload",
  USER_PROFILE: "/profile/:userId",
  SEARCH_USER: "/search",
};

const PREFIXES = {
  API: "/api/v1/",
  USER: "user/",
};
export { END_POINTS, PREFIXES };
