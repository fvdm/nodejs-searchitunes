/*
Name:         openkvk - test.js
Description:  Test script for openkvk.js
Source:       https://github.com/fvdm/nodejs-openkvk
Feedback:     https://github.com/fvdm/nodejs-openkvk/issues
License:      Public Domain / Unlicense (see LICENSE file)
*/

var util = require ('util');

// Setup
var app = require ('./');


// handle exits
var errors = 0;
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\033[1mDONE, no errors.\033[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\033[1mFAIL, '+ errors +' error'+ (errors > 1 ? 's' : '') +' occurred!\033[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
  console.log ();
  errors++;
});

// Queue to prevent flooding
var queue = [];
var next = 0;

function doNext () {
  next++;
  if (queue[next]) {
    queue[next] ();
  }
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  if (err instanceof Error) {
    console.error (label +': \033[1m\033[31mERROR\033[0m\n');
    console.error (util.inspect (err, false, 10, true));
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    var testErrors = [];
    tests.forEach (function (test) {
      if (test[1] !== true) {
        testErrors.push (test[0]);
        errors++;
      }
    });

    if (testErrors.length === 0) {
      console.log (label +': \033[1m\033[32mok\033[0m');
    } else {
      console.error (label +': \033[1m\033[31mfailed\033[0m ('+ testErrors.join (', ') +')');
    }
  }

  doNext ();
}


queue.push (function () {
  app (null, function (err) {
    doTest (null, 'Error: invalid params', [
      ['error', err && err.message === 'invalid params']
    ]);
  });
});


queue.push (function () {
  app (
    {
      entity: 'software',
      country: 'NL',
      term: null,
      limit: 1,
      price: 0
    },
    function (err) {
      doTest (null, 'Error: no results', [
        ['error', err && err.message === 'no results']
      ]);
    }
  );
});


queue.push (function () {
  app (
    {
      entity: 'software',
      country: 'NL',
      term: 'github',
      limit: 1,
      price: 0
    },
    function (err, data) {
      doTest (err, 'search', [
        ['data type', data && data instanceof Object],
        ['resultCount', data && data.resultCount && data.resultCount === 1],
        ['results type', data && data.results && data.results instanceof Array],
        ['results length', data && data.results && data.results instanceof Array && data.results.length === 1],
        ['item type', data && data.results && data.results[0] && data.results[0] instanceof Object],
        ['item kind', data && data.results && data.results[0] && data.results[0].kind === 'software']
      ]);
    }
  );
});


// Start the tests
console.log ('Running tests...\n');
queue[0] ();
