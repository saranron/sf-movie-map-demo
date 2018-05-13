/*
 * Mock geocode api callback with the given result and status.
 * @see {@link https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingResponses|Geocoding Responses}
 * for more details.
 * @param {Object} result The search result object returned from geocode api.
 * @param {Object[]} result.results The array of results from geocode api
 * @param {string} status Geocode api status.
 */
export const mockGeocode = (result, status) => {
  window.google.maps.Geocoder = class {
    geocode = jest.fn().mockImplementation((request, callback) => {
      callback(result, status);
    });
  };
};

/*
 * Returns mock response for geocode api
 * @param {Object} latLng
 * @param {number} latLng.lat
 * @param {number} latLng.lng
 * @return {Object} response
 * @return {Object[]} response.results
 * @return {Object} response.results.geometry
 * @return {Object} response.results.geometry.location
 * @return {Function} response.results.geometry.location.lat Returns the latitude.
 * @return {Function} response.results.geometry.location.lng Returns the longitude.
 */
export const mockGeocodeResponse = latLng => ([{
  geometry: {
    location: {
      lat: () => latLng.lat,
      lng: () => latLng.lng,
    },
  },
}]);

export default {
  mockGeocode,
  mockGeocodeResponse,
};
