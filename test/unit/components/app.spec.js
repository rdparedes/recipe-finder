import { mount, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../../src/components/app';
import * as recipeApiService from '../../../src/shared/recipeApiService';

configure({ adapter: new Adapter() });

describe('App', () => {
  let wrapper;
  let getRecipesMock;

  beforeEach(() => {
    wrapper = mount(<App />);
    getRecipesMock = jest.spyOn(recipeApiService, 'getRecipes');
  });
  
  afterEach(() => {
    getRecipesMock.mockRestore();
  });

  it('calls getRecipes when search bar is updated', () => {
    getRecipesMock.mockReturnValue(Promise.resolve());
    const searchBar = wrapper.find('[data-test-id="search-bar"]');
    searchBar.instance().value = 'abc';
    searchBar.simulate('change');
    expect(getRecipesMock.mock.calls[0][0]).toEqual('abc');
  });

  it('renders recipes', done => {
    const fakeRecipes = [
      {
        title: 'Pasta',
        href: 'pasta'
      }
    ];
    getRecipesMock.mockReturnValue(Promise.resolve(fakeRecipes));
    const searchBar = wrapper.find('[data-test-id="search-bar"]');
    searchBar.instance().value = 'abc';
    searchBar.simulate('change');
    setTimeout(() => {
      wrapper.update();
      const recipes = wrapper.find('[data-test-id="recipes"]');
      expect(recipes.children()).toHaveLength(1);
      done();
    }, 10);
  });
});
