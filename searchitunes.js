/*
Name:         searchitunes
Description:  Search the Apple iTunes Store and App Store.
Author:       Franklin van de Meent (https://frankl.in)
Source:       https://github.com/fvdm/nodejs-searchitunes
Feedback:     https://github.com/fvdm/nodejs-searchitunes/issues
API docs:     http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html
License:      Unlicense (Public Domain, see UNLICENSE file)
              (https://github.com/fvdm/nodejs-searchitunes/raw/master/UNLICENSE)
*/

var httpreq = require ('httpreq');

var config = {
  timeout: 5000,
  idKeys: [
    'amgAlbumId',
    'amgArtistId',
    'amgVideoId',
    'id',
    'isbn',
    'upc'
  ]
};


/**
 * Check if one of the keys is a property
 *
 * @param   {array}    keys  Property names to check
 * @param   {object}   obj   Object to process
 * @return  {boolean}        `true` = yes
 */

function keysInObject (keys, obj) {
  var i = 0;

  for (i; i < keys.length; i++) {
    if (obj [keys [i]]) {
      return true;
    }
  }

  return false;
}


/**
 * Call back a request error
 *
 * @callback  callback
 * @param     {error}   err      The error to include in `.error`
 * @param     {object}  res      Response details from httpreq
 * @param     {string}  message  Error message to report
 * @return    {Error}   error
 */

function httpError (err, res, message) {
  var error = new Error (message);

  error.code = res && res.statusCode;
  error.body = res && res.body;
  error.error = err;

  return error;
}


/**
 * Process HTTP response
 *
 * @callback  callback
 * @param     {Error|null}  err                  Client error
 * @param     {object}      [res]                Response details
 * @param     {function}    [callback]           `(err, data)`
 * @param     {boolean}     [firstResult=false]  Call back only first result
 * @return    {void}
 */

function httpResponse (err, res, callback, firstResult) {
  var data = res && res.body || '';
  var error = null;

  try {
    data = JSON.parse (data);

    if (!(data.results instanceof Array) || !data.results.length) {
      error = new Error ('no results');
    } else if (firstResult) {
      data = data.results [0];
    }
  } catch (e) {
    error = httpError (e, res, 'invalid response');
  }

  if (err) {
    error = httpError (err, res, 'http error');
  }

  if (error) {
    callback (error);
  } else {
    callback (null, data);
  }
}


/**
 * Send HTTP request
 *
 * @callback  callback
 * @param     {object}    props                 Request details
 * @param     {string}    props.url             URL to fetch
 * @param     {object}    props.params          Parameters to send along
 * @param     {number}    [props.timeout=5000]  Wait time out in ms
 * @param     {function}  callback              `(err, data)`
 * @return    {void}
 */

function httpRequest (props, callback) {
  var firstResult = false;
  var options = {
    url: 'https://itunes.apple.com/search',
    method: 'GET',
    parameters: props.params || {},
    timeout: props.timeout || config.timeout,
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'searchitunes.js'
    }
  };

  if (keysInObject (config.idKeys, options.parameters)) {
    options.url = 'https://itunes.apple.com/lookup';
    firstResult = true;
  }

  httpreq.doRequest (options, function (err, res) {
    httpResponse (err, res, callback, firstResult);
  });
}


/**
 * Module interface
 *
 * @callback  callback
 * @param     {object}    params          Parameters to send to API
 * @param     {number}    [timeout=5000]  Wait time out in ms
 * @param     {function}  callback        `(err, data)`
 * @return    {void}
 */

module.exports = function (params, timeout, callback) {
  var options = {
    params: params || {}
  };

  if (typeof timeout === 'function') {
    callback = timeout;
    timeout = null;
  }

  if (!params || !(params instanceof Object)) {
    callback (new Error ('invalid params'));
    return;
  }

  options.params.version = params.version || 2;
  options.timeout = timeout;
  httpRequest (options, callback);
};
