export const GEOCODE_STATUS = {
  OK: 'OK',
  ZERO_RESULTS: 'ZERO_RESULTS',
};

export default (geocoder, request) => new Promise((resolve, reject) => {
  geocoder.geocode(
    request,
    (results, status) => {
      if (status === GEOCODE_STATUS.OK) {
        const placeDetail = results[0];
        resolve(placeDetail);
      } else {
        reject(status);
      }
    },
  );
});
