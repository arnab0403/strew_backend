const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT || 8080,
  DB_USER: process.env.db_user,
  DB_PASSWORD: process.env.password,
  DB_LINK: process.env.DB_LINK || `mongodb+srv://${process.env.db_user}:${process.env.password}@bookres.uiel5v2.mongodb.net/?retryWrites=true&w=majority&appName=BookRes`,
  JWT_SECRET: process.env.SECRECT_KEY || process.env.JWT_SECRET || "default_secret_key",
  FRONTEND_URL: process.env.FRONT_END_URL || "http://localhost:3000",
  RAZORPAY_PUBLIC_KEY: process.env.RAZORPAY_PUBLIC_KEY,
  RAZORPAY_PRIVATE_KEY: process.env.RAZORPAY_PRIVATE_KEY,
  TMDB_API_KEY: process.env.TMDB_API_KEY || process.env.TMDB_KEY,
  GOOGLE_APP_USER: process.env.GOOGLE_APP_USER,
  GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL || "https://jio-clone-backend-2.onrender.com/api/auth/google/callback",
  AWS_REGION: process.env.AWS_REGION,
  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET
};
