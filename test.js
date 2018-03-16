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
  price: 0
};

const badParams = {
  entity: 'software',
  country: 'NL',
  term: null,
  limit: 1,
  price: 0
};


// Tests
dotest.add ('Interface', test => {
  test ()
    .isFunction ('fail', 'exports', app)
    .done ();
});


dotest.add ('Promise - good', test => {
  app ({ id: 512939461 })
    .then (data => test()
      .isObject ('fail', 'data', data)
      .isNotEmpty ('fail', 'data', data)
    )
    .then (() => test().done());
});


dotest.add ('Promise - Error', test => {
  app (null)
    .catch (err => test()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid params')
    )
    .then(() => test().done());
});


dotest.add ('Error: invalid params', test => {
  app (null, err => {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'invalid params')
      .done ();
  });
});


dotest.add ('Error: no results', test => {
  app (badParams, timeout, err => {
    test ()
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'no results')
      .done ();
  });
});


dotest.add ('Error: http error', test => {
  app ({}, 1, (err, data) => {
    test (null)
      .isError ('fail', 'err', err)
      .isExactly ('fail', 'err.message', err && err.message, 'http error')
      .isUndefined ('fail', 'err.statusCode', err && err.statusCode)
      .isUndefined ('fail', 'data', data)
      .done ();
  });
});


dotest.add ('Lookup by ID', test => {
  app ({ id: 512939461 }, timeout, (err, data) => {
    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.trackId', data && data.trackId, 512939461)
      .done ();
  });
});


dotest.add ('Search by term', test => {
  app (goodParams, timeout, (err, data) => {
    const item = data && data.results && data.results [0];

    test (err)
      .isObject ('fail', 'data', data)
      .isExactly ('fail', 'data.resultCount', data && data.resultCount, 1)
      .isArray ('fail', 'data.results', data && data.results)
      .isNotEmpty ('fail', 'data.results', data && data.results)
      .isObject ('fail', 'data.results[0]', item)
      .isExactly ('fail', 'data.results[0].kind', item && item.kind, 'software')
      .done ();
  });
});


// Start the tests
dotest.run ();
