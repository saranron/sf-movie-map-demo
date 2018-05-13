import React from 'react';
import { shallow } from 'enzyme';
import MovieInfo from '../index';

describe('<MovieInfo />', () => {
  const props = {
    movie: {
      title: 'movie 1',
      actors: ['actor1', 'actor2'],
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

  it('should render actors array as joined string', () => {
    const expected = props.movie.actors.join(', ');
    expect(wrapper.find('.movie-info__table')).toIncludeText(expected);
  });

  it('should not render any li when locations are empty', () => {
    const noLocationProps = { ...props.movie, location: [] };
    const noLocationWrapper = shallow(<MovieInfo {...noLocationProps} />);

    expect(noLocationWrapper.find('li')).not.toExist();
  });

  it('should disable show all button when areAllLocationsVisible is true', () => {
    wrapper.setState({ areAllLocationsVisible: true });

    expect(wrapper.find('.movie-info__show-all-button')).toBeDisabled();
  });

  it('should reset areAllLocationsVisible when click on button', () => {
    wrapper.setState({ areAllLocationsVisible: false });

    wrapper.find('.movie-info__show-all-button').simulate('click');

    expect(wrapper).toHaveState({ areAllLocationsVisible: true });
  });

  describe('selectLocation', () => {
    it('should set areAllLocationsVisible false', () => {
      const location = { location: 'location' };

      wrapper.instance().selectLocation(location)();

      expect(wrapper).toHaveState({ areAllLocationsVisible: false });
    });

    it('should invoke onLocationSelectionChanged callback', () => {
      const location = { location: 'location' };

      wrapper.instance().selectLocation(location)();

      expect(props.onLocationSelectionChanged).toHaveBeenCalledTimes(1);
      expect(props.onLocationSelectionChanged).toHaveBeenCalledWith(location);
    });
  });

  describe('showAllLocations', () => {
    it('should set areAllLocationsVisible true', () => {
      wrapper.setState({ areAllLocationsVisible: undefined });

      wrapper.instance().showAllLocations();

      expect(wrapper).toHaveState({ areAllLocationsVisible: true });
    });

    it('should invoke onLocationSelectionChanged with undefined', () => {
      wrapper.instance().showAllLocations();

      expect(props.onLocationSelectionChanged).toHaveBeenCalledTimes(1);
      expect(props.onLocationSelectionChanged).toHaveBeenCalledWith(undefined);
    });
  });
});
