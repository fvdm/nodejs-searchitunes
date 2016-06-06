/*
Name:         searchitunes
Description:  Search the Apple iTunes Store and App Store.
Author:       Franklin van de Meent (https://frankl.in)
Source:       https://github.com/fvdm/nodejs-searchitunes
Feedback:     https://github.com/fvdm/nodejs-searchitunes/issues
API docs:     http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html
License:      Unlicense / Public Domain, see UNLICENSE file
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
 * @param keys {array} - Property names to check
 * @param obj {object} - Object to process
 * @returns {boolean} - `true` = yes
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
 * @callback callback
 * @param err {Error} - The error to include in `.error`
 * @param res {object} - Response details from httpreq
 * @param message {string} - Error message to report
 * @param callback {function} - Function to post-process the error
 * @returns {void}
 */

function httpError (err, res, message, callback) {
  var error = new Error (message);

  error.code = res && res.statusCode;
  error.body = res && res.body;
  error.error = err;
  callback (error);
}


/**
 * Process HTTP response
 *
 * @callback callback
 * @param err {Error, null} - Client error
 * @param [res] {object} - Response details
 * @param [callback] {function} - `function (err, data) {}`
 * @param [firstResult = false] {boolean} - Call back only first result
 * @returns {void}
 */

function httpResponse (err, res, callback, firstResult) {
  var data = res && res.body || '';

  if (err) {
    httpError (err, res, 'http error', callback);
    return;
  }

  try {
    data = JSON.parse (data);
  } catch (e) {
    httpError (e, res, 'invalid response', callback);
    return;
  }

  if (!(data.results instanceof Array) || !data.results.length) {
    callback (new Error ('no results'));
    return;
  }

  if (firstResult) {
    data = data.results [0];
  }

  callback (null, data);
}


/**
 * Send HTTP request
 *
 * @callback callback
 * @param props {object} - Request details
 * @param props.url {string} - URL to fetch
 * @param props.params {object} - Parameters to send along
 * @param [props.timeout = 5000] {number} - Wait time out in ms
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
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
 * @callback callback
 * @param params {object} - Parameters to send to API
 * @param [timeout = 5000] {number} - Wait time out in ms
 * @param callback {function} - `function (err, data) {}`
 * @returns {void}
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
