import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle } from 'recompose';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

import MAP_DEFAULTS, { MAP_API_ENDPOINT } from './constants';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultLocation: MAP_DEFAULTS.DEFAULT_LOCATION,
    };
  }

  render() {
    const { defaultLocation } = this.state;
    const { isMarkerShown } = this.props;
    return (
      <GoogleMap
        defaultZoom={MAP_DEFAULTS.DEFAULT_ZOOM}
        defaultCenter={defaultLocation}
      >
        {isMarkerShown && <Marker position={defaultLocation} />}
      </GoogleMap>
    );
  }
}

Map.defaultProps = {
  isMarkerShown: true,
};

Map.propTypes = {
  isMarkerShown: PropTypes.bool,
};

const mapProps = {
  googleMapURL: MAP_API_ENDPOINT,
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '100%', width: '100%' }} />,
  mapElement: <div style={{ height: '100%' }} />,
};

const withLifeCycle = lifecycle({
  componentDidMount() {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { address: MAP_DEFAULTS.DEFAULT_PLACE },
      (results, status) => {
        if (status === 'OK') {
          const { location } = results[0].geometry;
          this.setState({ defaultLocation: { lat: location.lat(), lng: location.lng() } });
        } else {
          // TODO: find a better way to handle error
          console.error(`Geocode was not successful for the following reason: ${status}`);
        }
      },
    );
  },
});

export default compose(withProps(mapProps), withScriptjs, withGoogleMap, withLifeCycle)(Map);
