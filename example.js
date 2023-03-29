// Load module
const itunes = require( 'searchitunes' );

// Find an app
itunes( {
  entity: 'software',
  country: 'NL',
  term: 'github',
  limit: 1,
  price: 0,

} )
  .then( data => console.dir( data, {
    depth: null,
    colors: true,
  } ) )
  .catch( console.error )
;

