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
const timeout = String (process.env.testTimeout);

const goodParams = {
  entity: 'software',
  country: 'NL',
  term: 'github',
  limit: 1,
  price: 0,
  userAgent: 'test.js',
};

const badParams = {
  entity: 'software',
  country: 'NL',
  term: null,
  limit: 1,
  price: 0,
};


// Tests
dotest.add ('Interface', test => {
  test ()
    .isFunction ('fail', 'exports', app)
    .done ()
  ;
});


dotest.add ('Error: invalid params', async test => {
  let data;
  let error;

  try {
    data = await app (null);
  }
  catch (err) {
    error = err;
  }

  test ()
    .isError ('fail', 'error', error)
    .isExactly ('fail', 'error.message', error && error.message, 'invalid params')
    .isUndefined ('fail', 'data', data)
    .done ()
  ;
});


dotest.add ('Error: no results', async test => {
  let error;
  let data;

  try {
    data = await app ({ badParams });
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


dotest.add ('Error: http error', async test => {
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
    .isExactly ('fail', 'error.message', error && error.message, 'http error')
    .isUndefined ('fail', 'error.statusCode', error && error.statusCode)
    .isUndefined ('fail', 'data', data)
    .done ()
  ;
});


dotest.add ('Lookup by ID', async test => {
  let error;
  let data;

  try {
    data = await app ({ id: 512939461 });
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
    data = await app (goodParams);
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
