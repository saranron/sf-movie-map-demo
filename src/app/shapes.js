import PropTypes from 'prop-types';

export const MovieShape = PropTypes.shape({
  actors: PropTypes.arrayOf(PropTypes.string),
  director: PropTypes.string,
  distributor: PropTypes.string,
  locations: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string,
    funFact: PropTypes.string,
  })),
  productionCompany: PropTypes.string,
  releaseYear: PropTypes.string,
  title: PropTypes.string.required,
  writer: PropTypes.string,
});

export default {
  MovieShape,
};
