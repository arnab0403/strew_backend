const express = require("express");
const { getNowPlaying, getPopular, getToprated, getTrending, getUpcoming } = require("../controllers/discover.controller");

const discoverRouter = express.Router();

discoverRouter.get("/now-playing", getNowPlaying);
discoverRouter.get("/trending", getTrending);
discoverRouter.get("/top-rated", getToprated);
discoverRouter.get("/upcoming", getUpcoming);
discoverRouter.get("/popular", getPopular);

module.exports = discoverRouter;
