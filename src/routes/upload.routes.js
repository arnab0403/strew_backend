const express = require("express");
const { uploadVideo: uploadVideoMiddleware } = require("../middlewares/upload.middleware");
const { uploadVideo, createStrew, getStrews } = require("../controllers/upload.controller");

const uploadRouter = express.Router();

// POST /api/upload/video with multipart/form-data and a single `video` field.
uploadRouter.post("/video", uploadVideoMiddleware, uploadVideo);
uploadRouter.post("/strew", createStrew);
uploadRouter.get("/strews", getStrews);

module.exports = uploadRouter;
