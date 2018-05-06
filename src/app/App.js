import React, { Component } from 'react';
import 'antd/dist/antd.css';

import Map from './components/Map';
import MovieTable from './components/MovieTable';
import { FETCH_END_POINT, DATA_ROW_LIMIT } from './constants';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      movies: [],
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    let response;
    let locations;
    this.setState({ isLoading: true });
    try {
      const restoredLocations = localStorage.getItem('locations');
      if (!restoredLocations) {
        response = await fetch(`${FETCH_END_POINT}?$limit=${DATA_ROW_LIMIT}&$order=title`);
        locations = await response.json();

        localStorage.setItem('locations', JSON.stringify(locations));
      } else {
        locations = JSON.parse(localStorage.getItem('locations'));
      }
      const movies = locations.reduce(this.groupMovieByTitle, []);
      this.setState({ movies });
    } catch (error) {
      this.removeItem('locations');
    } finally {
      this.setState({ isLoading: false });
    }
  }

  /* eslint-disable camelcase */
  createMovieObject = ({
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

  groupMovieByTitle = (movies, location) => {
    if (movies.length === 0) {
      const movie = this.createMovieObject(location);
      movies.push(movie);
      return movies;
    }

    const latestMovie = movies[movies.length - 1];
    if (latestMovie.title === location.title) {
      latestMovie.locations.push(location.locations);
    } else {
      const nextMovie = this.createMovieObject(location);
      movies.push(nextMovie);
    }
    return movies;
  };

  render() {
    return (
      <div className="app">
        <div className="app-map">
          <Map />
        </div>
        <div className="app-box">
          <MovieTable
            isLoading={this.state.isLoading}
            movies={this.state.movies}
          />
        </div>
      </div>
    );
  }
}

export default App;
