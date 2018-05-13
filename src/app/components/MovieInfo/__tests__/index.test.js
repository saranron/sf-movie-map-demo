import React from 'react';
import { shallow } from 'enzyme';
import MovieInfo from '../index';

describe('<MovieInfo />', () => {
  const props = {
    movie: {
      title: 'movie 1',
      locations: [{ location: 'location 1' }, { location: 'location2' }],
    },
    onLocationSelectionChanged: jest.fn(),
  };
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<MovieInfo {...props} />);
  });

  afterEach(() => {
    props.onLocationSelectionChanged.mockReset();
  });

  it('should renders', () => {
  });

  test('selectLocation should set state', () => {
    const location = { location: 'location' };

    wrapper.instance().selectLocation(location)();

    expect(wrapper).toHaveState({
      areAllLocationsVisible: false,
      selectedLocation: location,
    });
  });

  test('selectLocation should invoke onLocationSelectionChanged callback', () => {
    const location = { location: 'location' };

    wrapper.instance().selectLocation(location)();

    expect(props.onLocationSelectionChanged).toHaveBeenCalledTimes(1);
    expect(props.onLocationSelectionChanged).toHaveBeenCalledWith(location);
  });
});
