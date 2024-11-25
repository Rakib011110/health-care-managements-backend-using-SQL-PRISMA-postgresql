import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), "env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,

  // Database Configuration
  database: {
    url: process.env.DATABASE_URL || "postgresql://localhost:5432/default_db",
  },

  // JWT Tokens
  jwt: {
    secret: process.env.JWT_SECRET || "default_jwt_secret",
    expiresIn: process.env.EXPIRES_IN || "1d",
    refreshTokenSecret:
      process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret",
    refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "30d",
    resetPasswordTokenSecret:
      process.env.RESET_PASS_TOKEN || "default_reset_secret",
    resetPasswordTokenExpiresIn:
      process.env.RESET_PASS_TOKEN_EXPIRES_IN || "5m",
  },

  // Email Configuration
  email: {
    address: process.env.EMAIL || "ariyanrakib983@gmail.com",
    appPassword: process.env.APP_PASS || "default_app_password",
  },

  // Reset Password Link
  resetPasswordLink:
    process.env.RESET_PASS_LINK || "http://localhost:5000/reset-password",

  // Payment Gateway
  paymentGateway: {
    storeId: process.env.STORE_ID || "default_store_id",
    storePassword: process.env.STORE_PASS || "default_store_password",
    successUrl: process.env.SUCCESS_URL || "http://localhost:5000/success",
    cancelUrl: process.env.CANCEL_URL || "http://localhost:5000/cancel",
    failUrl: process.env.FAIL_URL || "http://localhost:5000/fail",
    paymentApiUrl:
      process.env.SSL_PAYMENT_API || "https://api.paymentgateway.com",
    validationApiUrl:
      process.env.SSL_VALIDATIOIN_API || "https://api.paymentvalidation.com",
  },
};
