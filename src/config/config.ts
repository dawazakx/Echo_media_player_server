import dotenv from "dotenv";

dotenv.config();

export const configs = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 9000,
  ENVIRONMENT: process.env.ENVIRONMENT,

  DB_TEST_URL: process.env.DB_TEST_URL || "",
  DB_DEV_URL: process.env.DB_DEV_URL || "",
  DB_PRODUCTION_URL: process.env.DB_PRODUCTION_URL || "",

  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "",

  BREVO_API_KEY: process.env.BREVO_API_KEY || "",
};

export default configs;
