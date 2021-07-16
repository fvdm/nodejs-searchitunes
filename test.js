/*
Name:         openkvk - test.js
Description:  Test script for openkvk.js
Source:       https://github.com/fvdm/nodejs-openkvk
Feedback:     https://github.com/fvdm/nodejs-openkvk/issues
License:      Public Domain / Unlicense (see LICENSE file)
*/

const dotest = require ('dotest');
const app = require ('./');

// Setup
const timeout = process.env.testTimeout || 5000;


// Tests
dotest.add ('Interface', test => {
  test ()
    .isFunction ('fail', 'exports', app)
    .done ()
  ;
});


dotest.add ('Error: no results', async test => {
  let error;
  let data;

  try {
    data = await app ({
      entity: 'software',
      country: 'NL',
      term: 'this_is_hopefully_not_an_existing_app_in_the_app_store',
      limit: 1,
      price: 0,
      timeout,
    });
  }
  catch (err) {
    error = err;
  }

  test ()
    .isError ('fail', 'error', error)
    .isExactly ('fail', 'error.message', error && error.message, 'no results')
    .isUndefined ('fail', 'data', data)
    .done ()
  ;
});


dotest.add ('Error: request error', async test => {
  let error;
  let data;

  try {
    data = await app ({ timeout: 1 });
  }
  catch (err) {
    error = err;
  }

  test ()
    .isError ('fail', 'error', error)
    .isExactly ('fail', 'error.code', error && error.code, 'TIMEOUT')
    .isUndefined ('fail', 'data', data)
    .done ()
  ;
});


dotest.add ('Lookup by ID', async test => {
  let error;
  let data;

  try {
    data = await app ({
      id: 512939461,
      timeout,
    });
  }
  catch (err) {
    error = err;
  }

  test (error)
    .isObject ('fail', 'data', data)
    .isExactly ('fail', 'data.trackId', data && data.trackId, 512939461)
    .done ()
  ;
});


dotest.add ('Search by term', async test => {
  let error;
  let data;
  let item;

  try {
    data = await app ({
      entity: 'software',
      country: 'NL',
      term: 'github',
      limit: 1,
      price: 0,
      userAgent: 'test.js',
      timeout,
    });

    item = data.results && data.results [0];
  }
  catch (err) {
    error = err;
  }

  test (error)
    .isObject ('fail', 'data', data)
    .isExactly ('fail', 'data.resultCount', data && data.resultCount, 1)
    .isArray ('fail', 'data.results', data && data.results)
    .isNotEmpty ('fail', 'data.results', data && data.results)
    .isObject ('fail', 'data.results[0]', item)
    .isExactly ('fail', 'data.results[0].kind', item && item.kind, 'software')
    .done ()
  ;
});


// Start the tests
dotest.run ();
