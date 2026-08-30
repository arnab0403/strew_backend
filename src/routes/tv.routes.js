const express = require("express");
const {
  getActionTvShows,
  getComedyTvShows,
  getCrimeTvShows,
  getDramaTvShows,
  getMysteryTvShows,
  getTvShowsDetails
} = require("../controllers/tv.controller");

const tvRouter = express.Router();

tvRouter.get("/action", getActionTvShows);
tvRouter.get("/comedy", getComedyTvShows);
tvRouter.get("/crime", getCrimeTvShows);
tvRouter.get("/drama", getDramaTvShows);
tvRouter.get("/mystery", getMysteryTvShows);
tvRouter.get("/details", getTvShowsDetails);

module.exports = tvRouter;
