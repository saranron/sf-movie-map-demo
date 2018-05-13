import React, { Component } from 'react';
import 'antd/dist/antd.css';

import Map from './components/Map';
import MovieTable from './components/MovieTable';
import MovieInfo from './components/MovieInfo';
import Api from './apis';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      markedPlaces: [],
      selectedMovie: undefined,
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

  selectMovie = (movie) => {
    this.setState({
      selectedMovie: movie,
      markedPlaces: movie.locations,
    });
  };

  selectSingleLocation = (location) => {
    if (location) {
      this.setState({ markedPlaces: [location] });
    } else {
      this.setState({
        markedPlaces: this.state.selectedMovie.locations,
      });
    }
  };

  render() {
    return (
      <div className="app">
        <div className="app-map">
          <Map places={this.state.markedPlaces} />
        </div>
        <div className="app-box">
          <div className="movie-table">
            <MovieTable
              isLoading={this.state.isLoading}
              movies={this.state.movies}
              onMovieSelectionChanged={this.selectMovie}
            />
          </div>
          <div className="movie-info">
            {
              this.state.selectedMovie ?
                <MovieInfo
                  movie={this.state.selectedMovie}
                  onLocationSelectionChanged={this.selectSingleLocation}
                /> :
                <div className="movie-info__placeholder">Select a movie from the left</div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
