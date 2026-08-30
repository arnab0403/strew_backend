const path = require("path");
const VideoService = require("../services/video.service");
const { sendSuccess, sendError } = require("../utils/response");

const rootDir = path.join(__dirname, "..", "..");

async function getAllPremiumVideos(req, res) {
  try {
    const videos = await VideoService.getAllPremiumVideos();
    return sendSuccess(res, 200, "All videos", { videos });
  } catch (error) {
    return sendError(res, 500, "Internal Sevrer Error");
  }
}

function getVideosThumbnail(req, res) {
  try {
    const { name } = req.query;
    const thumbnailPath = VideoService.getVideosThumbnail(name, rootDir);
    return res.sendFile(thumbnailPath);
  } catch (error) {
    console.log(error);
  }
}

function getPremiumVideos(req, res) {
  try {
    const { name } = req.query;
    const range = req.headers.range;
    if (range) {
      VideoService.streamVideo(name, range, req, res, rootDir);
    } else {
      return sendError(res, 400, "Invalid Request");
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllPremiumVideos,
  getVideosThumbnail,
  getPremiumVideos
};
