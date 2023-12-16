/*
Name:         searchitunes - test.js
Description:  Test script for searchitunes.js
Source:       https://github.com/fvdm/nodejs-searchitunes
License:      Public Domain / Unlicense (see LICENSE file)
*/

const dotest = require( 'dotest' );
const app = require( './' );

// Setup
const timeout = process.env.testTimeout || 5000;


// Tests
dotest.add( 'Interface', test => {
  test()
    .isFunction( 'fail', 'exports', app )
    .done()
  ;
} );


dotest.add( 'Error: no results (throwEmpty = true)', async test => {
  let error;
  let data;

  try {
    data = await app( {
      entity: 'software',
      country: 'NL',
      term: 'this_is_hopefully_not_an_existing_app_in_the_app_store',
      limit: 1,
      price: 0,
      timeout,
    } );
  }
  catch ( err ) {
    error = err;
  }

  test()
    .isError( 'fail', 'error', error )
    .isExactly( 'fail', 'error.message', error && error.message, 'no results' )
    .isUndefined( 'fail', 'data', data )
    .done()
  ;
} );


dotest.add( 'Error: request error', async test => {
  let error;
  let data;

  try {
    data = await app( { timeout: 1 } );
  }
  catch ( err ) {
    error = err;
  }

  test()
    .isError( 'fail', 'error', error )
    .isExactly( 'fail', 'error.name', error && error.name, 'TimeoutError' )
    .isUndefined( 'fail', 'data', data )
    .done()
  ;
} );


dotest.add( 'Lookup by ID - One item', async test => {
  let error;
  let data;

  try {
    data = await app( {
      id: 1477376905,
      timeout,
    } );
  }
  catch ( err ) {
    error = err;
  }

  test( error )
    .isObject( 'fail', 'data', data )
    .isExactly( 'fail', 'data.trackId', data && data.trackId, 1477376905 )
    .isUndefined( 'fail', 'error', error )
    .done()
  ;
} );


dotest.add( 'Lookup by ID - Bulk', async test => {
  let error;
  let data;

  try {
    data = await app( {
      id: [1477376905, 6448311069],
      timeout,
    } );
  }
  catch ( err ) {
    error = err;
  }

  test( error )
    .isArray( 'fail', 'data', data )
    .isExactly( 'fail', 'data.length', data?.length, 2 )
    .isUndefined( 'fail', 'error', error )
    .done()
  ;
} );


dotest.add( 'Lookup by trackId', async test => {
  let error;
  let data;

  try {
    data = await app( {
      trackId: 1477376905,
      timeout,
    } );
  }
  catch ( err ) {
    error = err;
  }

  test( error )
    .isObject( 'fail', 'data', data )
    .isExactly( 'fail', 'data.trackId', data && data.trackId, 1477376905 )
    .isUndefined( 'fail', 'error', error )
    .done()
  ;
} );


dotest.add( 'Search by term', async test => {
  let error;
  let data;
  let item;

  try {
    data = await app( {
      entity: 'software',
      country: 'NL',
      term: 'github',
      media: 'software',
      limit: 1,
      price: 0,
      userAgent: 'test.js',
      timeout,
    } );

    item = data.results && data.results[0];
  }
  catch ( err ) {
    error = err;
  }

  test( error )
    .isObject( 'fail', 'data', data )
    .isExactly( 'fail', 'data.resultCount', data && data.resultCount, 1 )
    .isArray( 'fail', 'data.results', data && data.results )
    .isNotEmpty( 'fail', 'data.results', data && data.results )
    .isObject( 'fail', 'data.results[0]', item )
    .isExactly( 'fail', 'data.results[0].kind', item && item.kind, 'software' )
    .isUndefined( 'fail', 'error', error )
    .done()
  ;
} );


dotest.add( 'Default timeout', async test => {
  let error;
  let data;

  try {
    data = await app( {
      entity: 'software',
      country: 'NL',
      term: 'github',
      media: 'software',
      limit: 1,
      price: 0,
      userAgent: 'test.js',
    } );
  }
  catch ( err ) {
    error = err;
  }

  test( error )
    .isObject( 'fail', 'data', data )
    .isExactly( 'fail', 'data.resultCount', data && data.resultCount, 1 )
    .isArray( 'fail', 'data.results', data && data.results )
    .isNotEmpty( 'fail', 'data.results', data && data.results )
    .isUndefined( 'fail', 'error', error )
    .done()
  ;
} );


dotest.add( 'throwEmpty = false', async test => {
  let error;
  let data;

  try {
    data = await app( {
      entity: 'software',
      term: 'SomethingThatShouldNotExistForAPITestingPuposes',
      throwEmpty: false,
    } );
  }
  catch ( err ) {
    error = err;
  }

  test( error )
    .isArray( 'fail', 'data', data )
    .isEmpty( 'fail', 'data', data )
    .isUndefined( 'fail', 'error', error )
    .done()
  ;
} );


dotest.add( 'Error: API error', async test => {
  let error;
  let data;

  try {
    data = await app( {
      id: 'error-test',
    } );
  }
  catch ( err ) {
    error = err;
  }

  test()
    .isError( 'fail', 'error', error )
    .isRegexpMatch( 'fail', 'error.message', error?.message, /^API: .+/ )
    .isUndefined( 'fail', 'data', data )
    .done()
  ;
} );


// Start the tests
dotest.run();

