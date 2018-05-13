import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Map from './components/Map';
import MovieTable from './components/MovieTable';
import MovieInfo from './components/MovieInfo';

describe('<App />', () => {
  let wrapper;
  const movies = [
    { title: 'title1', locations: 'location1' },
    { title: 'title2', locations: 'location2' },
  ];

  beforeAll(() => {
    const fetchPromise = Promise.resolve({
      json: () => Promise.resolve(movies),
    });
    window.fetch = () => fetchPromise;
  });

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it('should render Map and MovieTable, but not MovieInfo', () => {
    expect(wrapper.find(Map)).toExist();
    expect(wrapper.find(MovieTable)).toExist();
    expect(wrapper.find(MovieInfo)).not.toExist();
  });

  it('should render MovieInfo when selectedMovie is set', () => {
    const movie = {
      title: 'movie 1',
      locations: [{ location: 'location 1' }],
    };
    wrapper.setState({ selectedMovie: movie });

    expect(wrapper.find(MovieInfo)).toExist();
  });

  test('componentDidMount should call api to get movies', async () => {
    const expected = movies.map(movie => expect.objectContaining({
      ...movie,
      locations: [expect.objectContaining({ location: movie.locations })],
    }));

    await wrapper.instance().componentDidMount();

    expect(wrapper).toHaveState({ movies: expected });
  });

  test('selectMovie should set selectedMovie and markedPlaces in state', () => {
    const movie = {
      title: 'movie 1',
      locations: [{ location: 'location 1' }],
    };
    const expected = {
      selectedMovie: movie,
      markedPlaces: movie.locations,
    };

    wrapper.instance().selectMovie(movie);

    expect(wrapper).toHaveState(expected);
  });

  test('selectSingleLocation sets the selected location in state', () => {
    const location = { location: 'location1' };
    const expected = [location];
    wrapper.instance().selectSingleLocation(location);

    expect(wrapper).toHaveState({ markedPlaces: expected });
  });

  test('selectSingleLocation sets selectedMovie.locations in state when argument is undefined', () => {
    const selectedMovie = {
      title: 'movie 1',
      locations: [{ location: 'location 1' }],
    };
    wrapper.setState({ selectedMovie });

    wrapper.instance().selectSingleLocation();

    expect(wrapper).toHaveState({ markedPlaces: selectedMovie.locations });
  })
});
