const { ENDPOINTS, fetch: fetchTMDB } = require("../services/tmdb.service");
const { sendSuccess, sendError } = require("../utils/response");

async function getActionMovies(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchActionMovies);
    return sendSuccess(res, 200, "Action Movies", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getComedyMovies(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchComedyMovies);
    return sendSuccess(res, 200, "Comedy Movies", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getHorrorMovies(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchHorrorMovies);
    return sendSuccess(res, 200, "Horror Movies", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getRomanceMovies(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchRomanceMovies);
    return sendSuccess(res, 200, "Romance Movies", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getAnimeMovies(req, res) {
  try {
    const response = await fetchTMDB(ENDPOINTS.fetchAnimeMovies);
    return sendSuccess(res, 200, "Anime Movies", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error");
  }
}

async function getMovieDetails(req, res) {
  try {
    const { id } = req.query;
    const response = await fetchTMDB(ENDPOINTS.fetchMovieVideos(id));
    return sendSuccess(res, 200, "Movies Details", { media: response });
  } catch (error) {
    return sendError(res, 400, "Internal Server Error", { media: error });
  }
}

async function getMovieDetailsByName(req, res) {
  try {
    const { movieName } = req.query;
    const response = await fetchTMDB(ENDPOINTS.fetchMovieByName(movieName));
    const media = response.results.filter((vid) => vid.poster_path);
    return sendSuccess(res, 200, "Movies Details", { media });
  } catch (error) {
    console.log(error);
    return sendError(res, 400, "Internal Server Error", { media: error });
  }
}

module.exports = {
  getActionMovies,
  getComedyMovies,
  getHorrorMovies,
  getRomanceMovies,
  getAnimeMovies,
  getMovieDetails,
  getMovieDetailsByName
};
