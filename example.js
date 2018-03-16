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

// Fancy console.log
function output (result) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}

// Do the search
itunes (params)
  .then (output)
  .catch (console.error);
