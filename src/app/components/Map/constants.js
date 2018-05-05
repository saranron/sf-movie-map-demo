export const LOCATION_DEFAULT = 'San Francisco, USA';

export const MAP_API_ENDPOINT = [
  'https://maps.googleapis.com/maps/api/js?v=3.exp',
  // `key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
  `libraries=${process.env.REACT_APP_GOOGLE_LIBRARIES}`,
].join('&');

export default {
  LOCATION_DEFAULT,
  MAP_API_ENDPOINT,
};
