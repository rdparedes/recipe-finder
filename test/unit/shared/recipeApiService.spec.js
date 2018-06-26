import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getRecipes, apiUrl } from '../../../src/shared/recipeApiService';

describe('recipeApiService', () => {
  let axiosMock = new MockAdapter(axios);

  beforeEach(() => {
    axiosMock.reset();
  });

  it('calls the API 2 times with a search term', () => {
    const getMock = jest
      .spyOn(axios, 'get')
      .mockReturnValue(Promise.resolve({ data: { results: [] } }));
    getRecipes('some recipe');
    const firstExpectedUrl = `${apiUrl}/?q=some%20recipe&p=1`;
    const secondExpectedUrl = `${apiUrl}/?q=some%20recipe&p=2`;
    expect(getMock.mock.calls[0][0]).toEqual(firstExpectedUrl);
    expect(getMock.mock.calls[1][0]).toEqual(secondExpectedUrl);
    getMock.mockRestore();
  });

  it('returns a list of combined recipes', done => {
    const firstFakeResponse = {
      results: [
        {
          title: 'Pasta',
          href: 'pasta'
        }
      ]
    };
    const secondFakeResponse = {
      results: [
        {
          title: 'Curry',
          href: 'curry'
        }
      ]
    };
    const expectedRecipes = [{ title: 'Pasta', href: 'pasta' }, { title: 'Curry', href: 'curry' }];
    axiosMock.onGet(`${apiUrl}/?q=some%20recipe&p=1`).reply(200, firstFakeResponse);
    axiosMock.onGet(`${apiUrl}/?q=some%20recipe&p=2`).reply(200, secondFakeResponse);
    getRecipes('some recipe').then(r => {
      expect(r).toEqual(expectedRecipes);
      done();
    });
  });

  it('returns an empty list if results are empty', done => {
    const firstFakeResponse = { results: [] };
    const secondFakeResponse = { results: [] };
    axiosMock.onGet(`${apiUrl}/?q=some%20recipe&p=1`).reply(200, firstFakeResponse);
    axiosMock.onGet(`${apiUrl}/?q=some%20recipe&p=2`).reply(200, secondFakeResponse);
    getRecipes('some recipe').then(r => {
      expect(r).toEqual([]);
      done();
    });
  });
});
