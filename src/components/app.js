import React from 'react';
import { getRecipes } from '../shared/recipeApiService';
import Header from './header';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { recipes: [] };
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(e) {
    getRecipes(e.target.value).then(r => {
      this.setState({ recipes: r });
    });
  }

  render() {
    const recipes = this.state.recipes || [];
    return (
      <div>
        <Header />
        <section className="container">
          <div className="search-field">
            <input
              type="text"
              placeholder="Search term"
              data-test-id="search-bar"
              onChange={this.onInputChange}
            />
            <button>Search</button>
          </div>
          <ul className='recipes' data-test-id="recipes">
            {recipes.map(recipe => (
              <li key={recipe.title}>
                <a href={recipe.href} target="_blank">
                  {recipe.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }
}
