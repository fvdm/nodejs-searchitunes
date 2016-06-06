// Load module
var itunes = require ('searchitunes');

// Search parameters
var params1 = {
  entity: 'software',
  country: 'NL',
  term: 'github',
  limit: 1,
  price: 0
};

// Fancy console.log
function output (err, data) {
  console.dir (err || data, {
    depth: null,
    colors: true
  });
}

// Do the search by term
itunes.searchByTerm(params1, output);

// Search parameters
var params2 = {
  entity: 'software',
  country: 'NL',
  id: '12345678',
  limit: 1,
  price: 0
};

// Do the search by id
itunes.searchByTerm(params2, output);
