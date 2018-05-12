const DEFAULT_LOCATION = {
  lat: 37.7749295,
  lng: -122.4194155,
};
const DEFAULT_PLACE = 'San Francisco, CA, US';
const DEFAULT_ZOOM = 12;

export const MAP_API_ENDPOINT = [
  'https://maps.googleapis.com/maps/api/js?v=3.exp',
  `key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
  `libraries=${process.env.REACT_APP_GOOGLE_LIBRARIES}`,
].join('&');

export default {
  DEFAULT_LOCATION,
  DEFAULT_PLACE,
  DEFAULT_ZOOM,
};
