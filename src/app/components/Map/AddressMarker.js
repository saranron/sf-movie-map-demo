import React from 'react';
import PropTypes from 'prop-types';
import { Marker } from 'react-google-maps';

import MAP_DEFAULTS from './constants';
import geocodeApi from './geocoderApi';

class AddressMarker extends React.Component {
  constructor(props) {
    super(props);
    this.geocoder = null;
    this.state = { latLng: null };
  }

  componentDidMount() {
    const { address } = this.props;
    this.findPlace(address).then((place) => {
      const { location } = place.geometry;
      const latLng = { lat: location.lat(), lng: location.lng() };
      this.setState({ latLng });
      setTimeout(() => {
        this.props.onAddressLoaded({ address, place });
      }, 10);
    }).catch((error) => {
      this.props.onAddressError(error);
    });
  }

  componentWillUnmount() {
    this.props.onAddressRemoved(this.props.address);
  }

  findPlace = async (address) => {
    if (!address) {
      return null;
    }

    const request = {
      address: `${address} ${MAP_DEFAULTS.DEFAULT_PLACE}`,
      region: 'US',
    };

    const geocoder = new window.google.maps.Geocoder();
    const result = await geocodeApi(geocoder, request);
    return result;
  };

  render() {
    const { latLng } = this.state;
    const {
      address, onAddressLoaded, onAddressRemoved, onAddressError, children, ...restProps
    } = this.props;

    return (
      <Marker {...restProps} position={latLng}>
        {
          children ? React.cloneElement(children) : null
        }
      </Marker>
    );
  }
}

AddressMarker.defaultProps = {
  children: null,
  onAddressLoaded: () => {},
  onAddressRemoved: () => {},
  onAddressError: () => {},
};

AddressMarker.propTypes = {
  address: PropTypes.string.isRequired,
  children: PropTypes.node,
  onAddressLoaded: PropTypes.func,
  onAddressRemoved: PropTypes.func,
  onAddressError: PropTypes.func,
};

export default AddressMarker;
