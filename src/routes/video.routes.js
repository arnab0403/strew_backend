const express = require("express");
const { getAllPremiumVideos, getVideosThumbnail, getPremiumVideos } = require("../controllers/video.controller");

const videoRouter = express.Router();

videoRouter.get("/video", getAllPremiumVideos);
videoRouter.get("/video/stream", getPremiumVideos);
videoRouter.get("/video/thumbnail", getVideosThumbnail);

module.exports = videoRouter;
