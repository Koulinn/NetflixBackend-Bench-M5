import { getJSONMovies } from "./service-utils.js";

export const findMovie = async (movieId) => {
  const moviesList = await getJSONMovies();
  const foundMovie = moviesList.find((movies) => movies.imdbID === movieId);
  return foundMovie;
};
export const remainingMoviesFiltered = async (movieId) => {
  const moviesList = await getJSONMovies();
  const filteredMovie = moviesList.filter(
    (movies) => movies.imdbID !== movieId
  );
  return filteredMovie;
};
