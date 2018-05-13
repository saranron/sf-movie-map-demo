import React from 'react';
import PropTypes from 'prop-types';

import { MovieShape } from '../../shapes';
import './styles.css';

class MovieInfo extends React.PureComponent {
  state = {
    areAllLocationsVisible: true,
  };

  showAllLocations = () => {
    this.setState({ areAllLocationsVisible: true });
    this.props.onLocationSelectionChanged(undefined);
  };

  selectLocation = location => () => {
    this.setState({ areAllLocationsVisible: false });
    this.props.onLocationSelectionChanged(location);
  };

  render() {
    const {
      title,
      actors,
      director,
      locations,
      releaseYear,
      productionCompany,
    } = this.props.movie;
    const { areAllLocationsVisible } = this.state;
    return (
      <section className="movie-info-box">
        <div className="movie-info__title">
          <div className="movie-info__title--left">
            <span className="movie-title">{title}</span>
            <span className="movie-title__year">{`(${releaseYear})`}</span>
          </div>
          <div className="movie-info__title--right">
            <button
              className="movie-info__show-all-button"
              onClick={this.showAllLocations}
              disabled={areAllLocationsVisible}
            >
              Show all locations
            </button>
          </div>
        </div>
        <div className="movie-info__table">
          <div className="movie-info__line">
            <div className="movie-info__heading">Director</div>
            <div className="movie-info__text">{director || '-'}</div>
          </div>
          <div className="movie-info__line">
            <div className="movie-info__heading">Actors</div>
            <div className="movie-info__text">{(actors && actors.join(', ')) || '-'}</div>
          </div>
          <div className="movie-info__line">
            <div className="movie-info__heading">Production Company</div>
            <div className="movie-info__text">{productionCompany || '-'}</div>
          </div>
        </div>
        <div className="movie-info__locations">
          <div>Locations</div>
          <div>
            <ul className="movie-locations-list">
              {
                locations.length === 0 ?
                  <div>Not available</div> :
                  locations.map(location => (
                    // eslint-disable-next-line
                    <li
                      className="movie-locations__item"
                      key={location.location}
                      onClick={this.selectLocation(location)}
                    >
                      { location.location }
                    </li>
                  ))
              }
            </ul>
          </div>
        </div>
      </section>
    );
  }
}

MovieInfo.defaultProps = {
  movie: {
    actors: [],
    director: '',
    distributor: '',
    locations: [],
    productionCompany: '',
    releaseYear: '',
    writer: '',
  },
  onLocationSelectionChanged: () => {},
};

MovieInfo.propTypes = {
  movie: MovieShape,
  onLocationSelectionChanged: PropTypes.func,
};

export default MovieInfo;
