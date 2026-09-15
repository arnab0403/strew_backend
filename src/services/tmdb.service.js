const env = require("../config/env");

const tmdbBASEURL = "https://api.themoviedb.org/3";

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${env.TMDB_API_KEY}`
};

const TMDB_ENDPOINT = {
  // discover
  fetchNowPlaying: "/movie/now_playing",
  fetchTrending: `/trending/all/week`,
  fetchPopular: `/trending/all/week`,
  fetchUpcoming: `/movie/upcoming?include_video=true`,
  fetchTopRated: `/movie/top_rated?include_video=true`,

  // Movies
  fetchActionMovies: `/discover/movie?language=en-US&with_genres=28`,
  fetchComedyMovies: `/discover/movie?language=en-US&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?language=en-US&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?language=en-US&with_genres=10749`,
  fetchAnimeMovies: "/discover/movie?language=en-US&with_genres=16",
  fetchMovieVideos: (id) => `/movie/${id}/videos`,
  fetchMovieDetails: (id) => `/movie/${id}`,
  fetchMovieByName: (name) => `/search/movie?query=${name}&include_adult=false&language=en-US&page=1`,

  // Tv Shows
  fetchActionTvShows: `/discover/tv?language=en-US&with_genres=10759`,
  fetchComedyTvShows: `/discover/tv?language=en-US&with_genres=35`,
  fetchMysteryTvShows: `/discover/tv?language=en-US&with_genres=9648`,
  fetchDramaTvShows: `/discover/tv?language=en-US&with_genres=18`,
  fetchCrimeTvShows: `/discover/tv?language=en-US&with_genres=80`,
  fetchTvShowVideos: (id) => `/tv/${id}/videos`,
  fetchTvShowDetails: (id) => `/tv/${id}`
};

// Cache implementation
const cache = {};
const cacheTimers = {};
const CACHE_DURATION = 24 * 60 * 60 * 1000;

const setCache = (key, data) => {
  cache[key] = data;
  if (cacheTimers[key]) {
    clearTimeout(cacheTimers[key]);
  }
  cacheTimers[key] = setTimeout(() => {
    delete cache[key];
    delete cacheTimers[key];
  }, CACHE_DURATION);
};

const getCache = (key) => cache[key];
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchTMDB(endpoint) {
    const cacheKey = `tmdb_${endpoint}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
      console.log(`Cache hit for: ${endpoint}`);
      return cachedData;
    }

    console.log(`Cache miss for: ${endpoint}`);
    const url = tmdbBASEURL + endpoint;
    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch(url, { method: "GET", headers });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCache(cacheKey, data);
        console.log(`Data cached for: ${endpoint}`);
        return data;
      } catch (error) {
        lastError = error;
        console.log(`Attempt ${attempt} failed:`, error.message);
        if (attempt < 3) {
          const waitTime = attempt * 100;
          await sleep(waitTime);
        }
      }
    }

    console.error(`All 3 attempts failed for ${endpoint}`);
    throw lastError;
}

module.exports = { ENDPOINTS: TMDB_ENDPOINT, fetch: fetchTMDB };
