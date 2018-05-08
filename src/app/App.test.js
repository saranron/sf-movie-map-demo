import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Map from './components/Map';
import MovieTable from './components/MovieTable';

describe('<App />', () => {
  let wrapper;
  const movies = [
    { title: 'title1' },
    { title: 'title2' },
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
    const expected = movies.map(movie => expect.objectContaining(movie));

    await wrapper.instance().componentDidMount();
    wrapper.update();

    expect(wrapper).toHaveState({ movies: expected });
  });
});
