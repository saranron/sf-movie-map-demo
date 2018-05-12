import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle } from 'recompose';
import { GoogleMap, withGoogleMap, withScriptjs, InfoWindow } from 'react-google-maps';

import AddressMarker from './AddressMarker';
import MAP_DEFAULTS, { MAP_API_ENDPOINT } from './constants';
import geocoderApi from './geocoderApi';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.geocoder = null;
    this.state = {
      defaultLocation: MAP_DEFAULTS.DEFAULT_LOCATION,
      visibleWindowIndex: undefined,
    };
  }

  toggleInfoWindow = index => () => {
    const { visibleWindowIndex } = this.state;
    const newVisibleWindowIndex = visibleWindowIndex === index ? undefined : index;

    this.setState({ visibleWindowIndex: newVisibleWindowIndex });
  };

  render() {
    const { defaultLocation, visibleWindowIndex } = this.state;
    const { places } = this.props;

    return (
      <GoogleMap
        defaultZoom={MAP_DEFAULTS.DEFAULT_ZOOM}
        defaultCenter={defaultLocation}
      >
        {
          places.map((place, index) => (
            <AddressMarker
              key={place.location}
              address={`${place.location} ${MAP_DEFAULTS.DEFAULT_PLACE}`}
              onAddressLoaded={this.onAddressLoaded}
              onAddressRemoved={this.onAddressRemoved}
              onClick={this.toggleInfoWindow(index)}
              defaultDraggable={false}
            >
              {
                visibleWindowIndex === index && place.funFact ?
                  <InfoWindow key={place.location} onCloseClick={this.toggleInfoWindow(index)}>
                    <span>{ place.funFact }</span>
                  </InfoWindow> :
                  null
              }
            </AddressMarker>
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
  places: PropTypes.arrayOf(PropTypes.shape({
    location: PropTypes.string,
    funFact: PropTypes.string,
  })),
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
