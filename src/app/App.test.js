import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Map from './components/Map';
import MovieTable from './components/MovieTable';

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

  it('renders without crashing', () => {
    expect(wrapper.find(Map)).toExist();
    expect(wrapper.find(MovieTable)).toExist();
  });

  test('componentDidMount should call api to get movies', async () => {
    const expected = movies.map(movie => expect.objectContaining({
      ...movie,
      locations: [expect.objectContaining({ location: movie.locations })],
    }));

    await wrapper.instance().componentDidMount();

    expect(wrapper).toHaveState({ movies: expected });
  });

  test('selectMovieLocations saves all locations of movie objects in state', () => {
    const selectedMovies = [
      { locations: [{ location: 'location1' }] },
      { locations: [{ location: 'location2' }] },
    ];
    const expected = [
      expect.objectContaining({ location: 'location1' }),
      expect.objectContaining({ location: 'location2' }),
    ];
    wrapper.instance().selectMovieLocations(selectedMovies);

    expect(wrapper).toHaveState({ markedPlaces: expected });
  });

  test('selectSingleLocation saves the selected location in state', () => {
    const location = { location: 'location1' };
    const expected = [location];
    wrapper.instance().selectSingleLocation(location);

    expect(wrapper).toHaveState({ markedPlaces: expected });
  });
});
