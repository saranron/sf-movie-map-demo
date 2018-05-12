import React from 'react';
import { shallow } from 'enzyme';
import { Marker } from 'react-google-maps';

import { GEOCODE_STATUS } from '../geocoderApi';
import AddressMarker from '../AddressMarker';

describe('<AddressMarker />', () => {
  const address = 'Tokyo';
  const props = { address };

  it('should render a Marker', () => {
    const wrapper = shallow(<AddressMarker {...props} />);
    expect(wrapper.find(Marker).length).toBe(1);
  });

  it('should render its children', () => {
    const WrappedComponent = () => (<div>wrapped component</div>);
    const wrapper = shallow(<AddressMarker {...props}><WrappedComponent /></AddressMarker>);
    expect(wrapper.find(WrappedComponent)).toExist();
  });

  describe('lifecycle', () => {
    const onAddressLoaded = jest.fn();
    const onAddressRemoved = jest.fn();
    const onAddressError = jest.fn();
    const callbackProps = {
      ...props,
      onAddressLoaded,
      onAddressRemoved,
      onAddressError,
    };
    const latLng = { lat: 10, lng: -10 };
    const place = {
      geometry: {
        location: {
          lat: () => latLng.lat,
          lng: () => latLng.lng,
        },
      },
    };
    const mockGeocode = (result, status) => {
      window.google.maps.Geocoder = class {
        geocode = jest.fn().mockImplementation((request, callback) => {
          callback(result, status);
        });
      };
    };

    beforeAll(() => {
      jest.useFakeTimers();
    });

    afterAll(() => {
      jest.clearAllTimers();
    });

    afterEach(() => {
      Object.keys(props).forEach((key) => {
        const prop = props[key];
        if (typeof prop.mockReset === 'function') {
          prop.mockReset();
        }
      });
    });

    test('componentDidMount should set state', () => {
      const result = [place];
      const status = GEOCODE_STATUS.OK;
      mockGeocode(result, status);

      const wrapper = shallow(
        <AddressMarker {...callbackProps} />,
        { disableLifecycleMethods: true },
      );
      wrapper.instance().componentDidMount();
      jest.runAllTimers();

      setImmediate(() => {
        expect(wrapper).toHaveState('latLng', latLng);
      });
    });

    test('componentDidMount should invoke onAddressLoaded callback', () => {
      const result = [place];
      const status = GEOCODE_STATUS.OK;
      mockGeocode(result, status);

      const wrapper = shallow(
        <AddressMarker {...callbackProps} />,
        { disableLifecycleMethods: true },
      );
      wrapper.instance().componentDidMount();
      jest.runAllTimers();

      setImmediate(() => {
        expect(callbackProps.onAddressLoaded).toHaveBeenCalledTimes(1);
        expect(callbackProps.onAddressLoaded).toHaveBeenCalledWith(expect.objectContaining({
          address: callbackProps.address,
        }));
      });
    });

    test('componentDidMount should invoke onAddressError callback', () => {
      const result = [];
      const status = GEOCODE_STATUS.ZERO_RESULTS;
      mockGeocode(result, status);

      const wrapper = shallow(
        <AddressMarker {...callbackProps} />,
        { disableLifecycleMethods: true },
      );
      wrapper.instance().componentDidMount();

      setImmediate(() => {
        expect(callbackProps.onAddressError).toHaveBeenCalledTimes(1);
        expect(callbackProps.onAddressError).toHaveBeenCalledWith(status);
      });
    });

    test('componentWillUnmount should invoke onAddressRemoved callback', () => {
      const wrapper = shallow(
        <AddressMarker {...callbackProps} />,
        { disableLifecycleMethods: true },
      );

      wrapper.instance().componentWillUnmount();

      expect(callbackProps.onAddressRemoved).toHaveBeenCalledTimes(1);
      expect(callbackProps.onAddressRemoved).toHaveBeenCalledWith(address);
    });
  });

  describe(('findPlace'), () => {
    it('should return null when argument is null', async () => {
      const wrapper = shallow(<AddressMarker {...props} />);

      const actual = await wrapper.instance().findPlace();

      expect(actual).toBeNull();
    });

    it('should request with given argument', async () => {
      const result = [{ place: 'place1' }];
      const status = GEOCODE_STATUS.OK;
      window.google.maps.Geocoder = class {
        geocode = (request, callback) => {
          callback(result, status);
        };
      };

      const wrapper = shallow(<AddressMarker{...props} />);
      const actual = await wrapper.instance().findPlace(address);

      expect(actual).toEqual(result[0]);
    });
  });
});
