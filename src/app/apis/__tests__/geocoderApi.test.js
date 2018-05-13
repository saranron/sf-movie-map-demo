import Api, { GEOCODE_STATUS } from '../geocoderApi';

describe('geocoderApi', () => {
  const mockGeocode = { geocode: jest.fn() };
  const mockRequest = { address: 'TEST ADDRESS' };

  afterEach(() => {
    mockGeocode.geocode.mockReset();
  });

  it('should return the first location', async () => {
    const results = [{ place: 'place1' }, { place: 'place2' }];
    const status = GEOCODE_STATUS.OK;
    mockGeocode.geocode.mockImplementation((request, callback) => {
      callback(results, status);
    });

    const actual = await Api(mockGeocode, mockRequest);

    expect(actual).toEqual(results[0]);
  });

  it('should reject when status is not OK', async () => {
    const results = [{ place: 'place1' }, { place: 'place2' }];
    const status = GEOCODE_STATUS.ZERO_RESULTS;
    mockGeocode.geocode.mockImplementation((request, callback) => {
      callback(results, status);
    });

    try {
      await Api(mockGeocode, mockRequest);
    } catch (error) {
      expect(error).toEqual(GEOCODE_STATUS.ZERO_RESULTS);
    }
  });
});
