const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const discoverRouter = require("./routes/discover.routes");
const tvRouter = require("./routes/tv.routes");
const movieRouter = require("./routes/movie.routes");
const videoRouter = require("./routes/video.routes");
const paymentRouter = require("./routes/payment.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://project-jio-clone-frontend.vercel.app",
      "https://console.cron-job.org"
    ],
    credentials: true
  })
);

app.use(cookieParser());
app.use(express.json());

// Health Check
app.get("/test", (req, res) => {
  res.send("Running successfully");
});

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/discover", discoverRouter);
app.use("/api/tv", tvRouter);
app.use("/api/movies", movieRouter);
app.use("/api/premium", videoRouter);
app.use("/api/payment", paymentRouter);

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;
