/*
Name:         searchitunes
Description:  Search the Apple iTunes Store and App Store.
Author:       Franklin van de Meent (https://frankl.in)
Source:       https://github.com/fvdm/nodejs-searchitunes
Feedback:     https://github.com/fvdm/nodejs-searchitunes/issues
API docs:     https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/
License:      Unlicense (Public Domain, see UNLICENSE file)
              (https://github.com/fvdm/nodejs-searchitunes/raw/master/UNLICENSE)
*/

const { doRequest } = require ('httpreq');
const { promisify } = require ('es6-promisify');

let config = {
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
 * @return  {boolean}        `true` = yes
 *
 * @param   {array}    keys  Property names to check
 * @param   {object}   obj   Object to process
 */

function keysInObject (keys, obj) {
  let i = 0;

  for (i; i < keys.length; i++) {
    if (obj [keys [i]]) {
      return true;
    }
  }

  return false;
}


/**
 * Callback a request error
 *
 * @callback  callback
 * @return    {Error}   error
 *
 * @param     {error}   err      The error to include in `.error`
 * @param     {object}  res      Response details from httpreq
 * @param     {string}  message  Error message to report
 */

function httpError (err, res, message) {
  let error = new Error (message);

  error.code = res && res.statusCode;
  error.body = res && res.body;
  error.error = err;

  return error;
}


/**
 * Process HTTP response
 *
 * @callback  callback
 * @return    {void}
 *
 * @param     {Error|null}  err                  Client error
 * @param     {object}      [res]                Response details
 * @param     {function}    [callback]           `(err, data)`
 * @param     {bool}        [firstResult=false]  Call back only first result
 */

function httpResponse (err, res, callback, firstResult) {
  let data = res && res.body || '';
  let error = null;

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
 * @return    {void}
 *
 * @param     {object}    props                 Request details
 * @param     {string}    props.url             URL to fetch
 * @param     {object}    props.params          Parameters to send along
 * @param     {int}       [props.timeout=5000]  Wait time out in ms
 * @param     {function}  callback              `(err, data)`
 */

function httpRequest (props, callback) {
  let firstResult = false;
  let options = {
    url: 'https://itunes.apple.com/search',
    method: 'GET',
    parameters: props.params || {},
    timeout: parseInt (props.timeout || config.timeout, 10),
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'searchitunes.js'
    }
  };

  if (keysInObject (config.idKeys, options.parameters)) {
    options.url = 'https://itunes.apple.com/lookup';
    firstResult = true;
  }

  doRequest (options, (err, res) => {
    httpResponse (err, res, callback, firstResult);
  });
}


/**
 * Module interface
 *
 * @callback  callback
 * @return    {object}                    Promises then & catch
 *
 * @param     {object}    params          Parameters to send to API
 * @param     {int}       [timeout=5000]  Wait time out in ms
 * @param     {function}  callback        `(err, data)`
 */

module.exports = promisify ((params, timeout, callback) => {
  let options = {
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
});
