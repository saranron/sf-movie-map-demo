import React from 'react';
import { shallow } from 'enzyme';
import { GoogleMap, InfoWindow } from 'react-google-maps';

import MapWithGoogleScript, { Map } from '../index';
import AddressMarker from '../AddressMarker';
import { GEOCODE_STATUS } from '../geocoderApi';
import { mockGeocode, mockGeocodeResponse } from '../../../../testUtils';

fdescribe('<Map />', () => {
  const options = { disableLifecycleMethods: true };
  const props = { places: [{ location: 'location 1' }, { location: 'location 2', funFact: 'fun fact' }] };

  it('renders GoogleMap', () => {
    const wrapper = shallow(<Map />, options);

    expect(wrapper.find(GoogleMap).length).toBe(1);
  });

  it('renders AddressMarker', () => {
    const wrapper = shallow(<Map {...props} />, options);

    expect(wrapper.find(AddressMarker).length).toBe(2);
  });

  it('does not render InfoWindow when visibleWindowIndex is undefined', () => {
    const wrapper = shallow(<Map {...props} />, options);

    expect(wrapper.find(InfoWindow)).not.toExist();
  });

  it('should render InfoWindow when visibleWindowIndex is set', () => {
    const wrapper = shallow(<Map {...props} />, options);
    wrapper.setState({ visibleWindowIndex: 1 });

    expect(wrapper.find(InfoWindow)).toExist();
  });

  it('should set visibleWindowIndex when it is undefined and AddressMarker is clicked', () => {
    const index = 0;
    const wrapper = shallow(<Map {...props} />, options);
    wrapper.setState({ visibleWindowIndex: undefined });
    wrapper.childAt(0).simulate('click');

    expect(wrapper).toHaveState({ visibleWindowIndex: index });
  });

  it('should set visibleWindowIndex undefined when it is already set and AddressMarker is clicked', () => {
    const index = 0;
    const wrapper = shallow(<Map {...props} />, options);
    wrapper.setState({ visibleWindowIndex: index });

    wrapper.childAt(0).simulate('click');

    expect(wrapper).toHaveState({ visibleWindowIndex: undefined });
  });

  it('should reset visibleWindowIndex when InfoWindow is clicked', () => {
    const wrapper = shallow(<Map {...props} />, options);
    wrapper.setState({ visibleWindowIndex: 1 });

    wrapper.find(InfoWindow).simulate('closeClick');

    expect(wrapper).toHaveState({ visibleWindowIndex: undefined });
  });

  test('componentDidMount sets defaultLocation', async () => {
    const latLng = { lat: 10, lng: 10 };
    const response = mockGeocodeResponse(latLng);
    mockGeocode(response, GEOCODE_STATUS.OK);
    const wrapper = shallow(<Map {...props} />, options);

    await wrapper.instance().componentDidMount();

    expect(wrapper).toHaveState({ defaultLocation: latLng });
  });
});
