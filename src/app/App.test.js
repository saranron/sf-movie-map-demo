import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Map from './components/Map';
import MovieTable from './components/MovieTable';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Map)).toExist();
    expect(wrapper.find(MovieTable)).toExist();
  });
});
