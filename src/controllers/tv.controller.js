const { ENDPOINTS, fetch: fetchTMDB } = require("../services/tmdb.service");
const { sendSuccess, sendError } = require("../utils/response");

async function getActionTvShows(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchActionTvShows);
    response.results.forEach((item) => {
      item.media_type = "tv";
    });
    return sendSuccess(res, 200, "Action Tv Shows", { media: response });
  } catch (error) {
    console.log(error);
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getComedyTvShows(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchComedyTvShows);
    response.results.forEach((item) => {
      item.media_type = "tv";
    });
    return sendSuccess(res, 200, "Comedy Tv Shows", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getCrimeTvShows(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchCrimeTvShows);
    response.results.forEach((item) => {
      item.media_type = "tv";
    });
    return sendSuccess(res, 200, "Crime Tv Shows", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getDramaTvShows(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchDramaTvShows);
    response.results.forEach((item) => {
      item.media_type = "tv";
    });
    return sendSuccess(res, 200, "Drama Tv Shows", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getMysteryTvShows(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchMysteryTvShows);
    response.results.forEach((item) => {
      item.media_type = "tv";
    });
    return sendSuccess(res, 200, "Mystrey Tv Shows", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getTvShowsDetails(req, res) {
  try {
    const { id } = req.query;
    const response = await fetchTMDB(ENDPOINTS.fetchTvShowVideos(id));
    response.results.forEach((item) => {
      item.media_type = "tv";
    });
    return sendSuccess(res, 200, "Mystrey Tv Shows", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

module.exports = {
  getActionTvShows,
  getComedyTvShows,
  getCrimeTvShows,
  getDramaTvShows,
  getMysteryTvShows,
  getTvShowsDetails
};
