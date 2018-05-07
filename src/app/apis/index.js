import { FETCH_END_POINT, DATA_ROW_LIMIT } from './constants';

/* eslint-disable camelcase */
export const createMovieObject = ({
  title,
  release_year,
  director,
  production_company,
  locations,
  actor_1,
  actor_2,
  actor_3,
}) => ({
  title,
  director,
  releaseYear: release_year,
  productionCompany: production_company,
  actors: [
    actor_1,
    actor_2,
    actor_3,
  ].filter(actor => actor !== undefined),
  locations: [
    locations,
  ].filter(location => Boolean(location)),
});
/* eslint-enable camelcase */

const groupMoviesByTitle = (movies, location) => {
  if (movies.length === 0) {
    const movie = createMovieObject(location);
    movies.push(movie);
    return movies;
  }

  const latestMovie = movies[movies.length - 1];
  if (latestMovie.title === location.title) {
    latestMovie.locations.push(location.locations);
  } else {
    const nextMovie = createMovieObject(location);
    movies.push(nextMovie);
  }
  return movies;
};

const getMovies = () => fetch(`${FETCH_END_POINT}?$limit=${DATA_ROW_LIMIT}&$order=title`)
  .then(response => response.json())
  .then(locations => locations.reduce(groupMoviesByTitle, []));

export default {
  getMovies,
};
