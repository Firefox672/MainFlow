const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch popular movies
export const fetchPopularMovies = async () => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

// Search movies by title
export const searchMovies = async (query) => {
  const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
  const data = await res.json();
  return data;
};

// Get movie details by ID
export const getMovieDetails = async (id) => {
  const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

// Discover movies by filters (genre, year, sort)
export const discoverMovies = async ({ genre, year, sort }) => {
  const url = new URL(`${BASE_URL}/discover/movie`);
  url.searchParams.append('api_key', API_KEY);
  if (genre) url.searchParams.append('with_genres', genre);
  if (year) url.searchParams.append('primary_release_year', year);
  if (sort) url.searchParams.append('sort_by', sort);

  const res = await fetch(url.toString());
  const data = await res.json();
  return data;
};
