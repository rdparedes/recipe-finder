import axios from 'axios';

export const apiUrl = 'http://www.recipepuppy.com/api';

const formatQuery = q =>
  q
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '%20');

export const getRecipes = searchTerm =>
  Promise.all([
    axios.get(`${apiUrl}/?q=${formatQuery(searchTerm)}&p=1`),
    axios.get(`${apiUrl}/?q=${formatQuery(searchTerm)}&p=2`)
  ]).then(([firstResponse, secondResponse]) => [
    ...firstResponse.data.results.map(r => ({ title: r.title, href: r.href })),
    ...secondResponse.data.results.map(r => ({ title: r.title, href: r.href }))
  ]);
