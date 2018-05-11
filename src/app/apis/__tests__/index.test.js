import Api, * as helpers from '../index';

describe('createMovieObject', () => {
  it('should rename fields release_year and production_company', () => {
    const object = { release_year: '2018', production_company: 'company' };
    const expected = {
      releaseYear: object.release_year,
      productionCompany: object.production_company,
    };

    const actual = helpers.createMovieObject(object);

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should aggregate actor fields, omitting undefined', () => {
    const actor1 = 'actor_1';
    const actor3 = 'actor_3';
    const object = { actor_1: actor1, actor_3: actor3 };
    const expected = { actors: [actor1, actor3] };

    const actual = helpers.createMovieObject(object);

    expect(actual).toEqual(expect.objectContaining(expected));
  });

  it('should return locations array', () => {
    const locations = 'location1';
    const object = { locations };
    const expected = { locations: [locations] };

    const actual = helpers.createMovieObject(object);

    expect(actual).toEqual(expect.objectContaining(expected));
  });
});

describe('getMovies', () => {
  it('should return aggregated result', async () => {
    const response = [
      { title: 'title1' },
      { title: 'title1' },
      { title: 'title2' },
      { title: 'title3' },
    ];
    const expected = [
      expect.objectContaining({ title: 'title1' }),
      expect.objectContaining({ title: 'title2' }),
      expect.objectContaining({ title: 'title3' }),
    ];

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(response),
    }));

    const actual = await Api.getMovies();

    expect(actual).toEqual(expected);
  });

  it('should throw', async () => {
    const errorMessage = 'error';
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error(errorMessage)));

    try {
      await Api.getMovies();
    } catch (error) {
      expect(error.message).toEqual(errorMessage);
    }
  });
});
