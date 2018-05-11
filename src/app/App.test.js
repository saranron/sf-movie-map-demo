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

  it('should call api on componentDidMount', async () => {
    const expected = movies.map(movie => expect.objectContaining({
      ...movie,
      locations: [movie.locations],
    }));

    await wrapper.instance().componentDidMount();

    expect(wrapper).toHaveState({ movies: expected });
  });

  test('onMovieSelectionChanged saves all locations of movie objects in state', () => {
    const expected = ['location1', 'location2'];
    wrapper.instance().onMovieSelectionChanged(movies);

    expect(wrapper).toHaveState({ markedPlaces: expected });
  });
});
