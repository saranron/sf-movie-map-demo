import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs } from 'react-google-maps';

import AddressMarker from './AddressMarker';
import MAP_DEFAULTS, { MAP_API_ENDPOINT } from './constants';
import geocoderApi from './geocoderApi';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.geocoder = null;
    this.state = {
      defaultLocation: MAP_DEFAULTS.DEFAULT_LOCATION,
    };
  }

  render() {
    const { defaultLocation } = this.state;
    const { places } = this.props;

    return (
      <GoogleMap
        defaultZoom={MAP_DEFAULTS.DEFAULT_ZOOM}
        defaultCenter={defaultLocation}
      >
        {
          places.map(place => (
            <AddressMarker
              key={place}
              address={`${place} ${MAP_DEFAULTS.DEFAULT_PLACE}`}
              onAddressLoaded={this.onAddressLoaded}
              onAddressRemoved={this.onAddressRemoved}
              defaultDraggable={false}
            />
          ))
        }
      </GoogleMap>
    );
  }
}

Map.defaultProps = {
  places: [],
};

Map.propTypes = {
  places: PropTypes.arrayOf(PropTypes.string),
};

const mapProps = {
  googleMapURL: MAP_API_ENDPOINT,
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '100%', width: '100%' }} />,
  mapElement: <div style={{ height: '100%' }} />,
};

const withLifeCycle = lifecycle({
  componentDidMount() {
    const request = { address: MAP_DEFAULTS.DEFAULT_PLACE };
    const geocoder = new window.google.maps.Geocoder();
    geocoderApi(geocoder, request).then((result) => {
      const { location } = result.geometry;
      this.setState({ defaultLocation: { lat: location.lat(), lng: location.lng() } });
    });
  },
});

export default compose(withProps(mapProps), withScriptjs, withGoogleMap, withLifeCycle)(Map);
