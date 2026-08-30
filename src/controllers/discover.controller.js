const TMDBService = require("../services/tmdb.service");
const { sendSuccess, sendError } = require("../utils/response");

async function getNowPlaying(req, res) {
  try {
    const response = await TMDBService.fetch(TMDBService.ENDPOINTS.fetchNowPlaying);
    return sendSuccess(res, 200, "Now Playing Movies", { nowPlaying: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getTrending(req, res) {
  try {
    const response = await TMDBService.fetch(TMDBService.ENDPOINTS.fetchTrending);
    return sendSuccess(res, 200, "Tranding Movies", { nowPlaying: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getPopular(req, res) {
  try {
    const response = await TMDBService.fetch(TMDBService.ENDPOINTS.fetchPopular);
    return sendSuccess(res, 200, "Popular Movies", { nowPlaying: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getUpcoming(req, res) {
  try {
    const response = await TMDBService.fetch(TMDBService.ENDPOINTS.fetchUpcoming);
    return sendSuccess(res, 200, "Popular Movies", { nowPlaying: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getToprated(req, res) {
  try {
    const response = await TMDBService.fetch(TMDBService.ENDPOINTS.fetchTopRated);
    return sendSuccess(res, 200, "Popular Movies", { nowPlaying: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

module.exports = {
  getNowPlaying,
  getTrending,
  getPopular,
  getUpcoming,
  getToprated
};
