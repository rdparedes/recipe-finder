# React Recipe Finder

Author: Roberto Paredes

## Description

This app was tested using Google Chrome.

My approach to this excercise was to start from the lowest level (that is the connection to the API to fetch recipes, inside recipeApiService.js) and build up from there.

Since the logic of components was small, I decided to go with one container that keeps the state and updates every time the user types something in the input box, calling to the recipeApiService.

### Issues & Assumptions

- I decided not to implement any logic in the "Search" button, since the other requirement already gets results every time the user types something in the search box.
- Due to time constraints, I wasn't able to cover 100% test cases, so that would be an improvement point.

## Commands

### Setup

- Run `npm install` to install all dependencies.

### Start the app locally

- Add the following plugin to your Chrome browser: [Allow-Control-Allow-Origin:\*](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi). This needs to be enabled to see the app in localhost, because I encountered a [CORB](https://www.chromestatus.com/feature/5629709824032768) issue when doing cross-origin requests to the RecipePuppy API using [axios](https://github.com/axios/axios).
- Run `npm start`.
- Go to http://localhost:3333/.

### Run tests

```
npm test
```

### Build app bundle

```
npm run build
```

A `dist` folder will be generated at the project root.
