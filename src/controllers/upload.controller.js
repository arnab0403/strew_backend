const UploadService = require("../services/upload.service");
const { sendError, sendSuccess } = require("../utils/response");

async function uploadVideo(req, res, next) {
  try {
    if (!req.file) {
      return sendError(res, 400, "A video file is required in the 'video' field");
    }

    const upload = await UploadService.uploadVideo(req.file);
    return sendSuccess(res, 201, "Video uploaded successfully", { upload });
  } catch (error) {
    return next(error);
  }
}

async function createStrew(req, res, next) {
  try {
    const strew = await UploadService.createStrew(req.body);
    return sendSuccess(res, 201, "Strew created successfully", { strew });
  } catch (error) {
    return next(error);
  }
}

async function getStrews(req, res, next) {
  try {
    const strews = await UploadService.getStrews();
    return sendSuccess(res, 200, "Strews fetched successfully", { strews });
  } catch (error) {
    return next(error);
  }
}

module.exports = { uploadVideo, createStrew, getStrews };
