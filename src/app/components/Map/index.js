import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps } from 'recompose';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

import { MAP_API_ENDPOINT } from './constants';

const Map = props => (
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
  </GoogleMap>
);

Map.defaultProps = {
  isMarkerShown: true,
};

Map.propTypes = {
  isMarkerShown: PropTypes.bool,
};

const mapProps = {
  googleMapURL: MAP_API_ENDPOINT,
  loadingElement: <div style={{ height: '100%' }} />,
  containerElement: <div style={{ height: '100%' }} />,
  mapElement: <div style={{ height: '100%' }} />,
};

export default compose(withProps(mapProps), withScriptjs, withGoogleMap)(Map);
