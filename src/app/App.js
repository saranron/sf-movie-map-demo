import React, { Component } from 'react';
import 'antd/dist/antd.css';

import Map from './components/Map';
import MovieTable from './components/MovieTable';
import Api from './apis';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      markedPlaces: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  getMovies = async () => {
    this.setState({ isLoading: true });
    try {
      const movies = await Api.getMovies();
      this.setState({ movies });
    } catch (error) {
      // TODO: handle error
    } finally {
      this.setState({ isLoading: false });
    }
  };

  selectMovieLocations = (movies) => {
    const places = movies.reduce((locations, movie) => [...locations, ...movie.locations], []);
    this.setState({ markedPlaces: places });
  };

  selectSingleLocation = (location) => {
    this.setState({ markedPlaces: [location] });
  };

  render() {
    return (
      <div className="app">
        <div className="app-map">
          <Map places={this.state.markedPlaces} />
        </div>
        <div className="app-box">
          <MovieTable
            isLoading={this.state.isLoading}
            movies={this.state.movies}
            onMovieSelectionChanged={this.selectMovieLocations}
            onLocationSelectionChanged={this.selectSingleLocation}
          />
        </div>
      </div>
    );
  }
}

export default App;
