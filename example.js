// Load module
const itunes = require ('searchitunes');

// Search parameters
const params = {
  entity: 'software',
  country: 'NL',
  term: 'github',
  limit: 1,
  price: 0
};

// Do the search
itunes (params)
  .then (data => console.dir (data, {
    depth: null,
    colors: true
  }))
  .catch (console.error);
