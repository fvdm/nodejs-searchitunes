/*
Name:         searchitunes
Description:  Search the Apple iTunes Store and App Store.
Author:       Franklin (https://fvdm.com)
Source:       https://github.com/fvdm/nodejs-searchitunes
License:      Unlicense (Public Domain, see UNLICENSE file)
*/

const { doRequest } = require ('httpreq');


/**
 * Check if one of the keys is a property
 *
 * @param   {object}  obj  Object to process
 *
 * @return  {Promise<boolean>}  `true` = yes
 */

function keysInObject (obj) {
  const keys = [
    'amgAlbumId',
    'amgArtistId',
    'amgVideoId',
    'id',
    'isbn',
    'upc',
  ];

  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]]) {
      return true;
    }
  }

  return false;
}


/**
 * Process HTTP response
 *
 * @param   {object}   res            Response
 * @param   {bool}     [first=false]  Only first result
 *
 * @return  {Promise<object|array>}
 */

function httpResponse ({
  res,
  first = false,
}) {
  return new Promise ((resolve, reject) => {
    const data = JSON.parse (res.body);

    if (!data.results || !data.results.length) {
      reject (new Error ('no results'));
      return;
    }

    if (first) {
      resolve (data.results[0]);
      return;
    }

    resolve (data);
  });
}


/**
 * Send HTTP request
 *
 * @return  {Promise<object|array>}
 *
 * @param   {object}  params                 Parameters to send along
 * @param   {number}  [params.timeout=5000]  Wait timeout in ms
 * @param   {string}  [params.userAgent]     Custom User-Agent header
 */

module.exports = async params => {
  let res;
  let first;
  let options = {
    method: 'POST',
    url: 'https://itunes.apple.com/search',
    parameters: params,
    timeout: 5000,
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'searchitunes.js',
    },
  };

  // Process internal settings
  if (params.timeout) {
    options.timeout = params.timeout;
    delete options.parameters.timeout;
  }

  if (params.userAgent) {
    options.headers['User-Agent'] = params.userAgent;
    delete options.parameters.userAgent;
  }

  // Convert trackId from a search response
  if (params.trackId) {
    options.parameters.id = params.trackId;
    delete options.parameters.trackId;
  }

  // Search or lookup
  if (keysInObject (options.parameters)) {
    options.url = 'https://itunes.apple.com/lookup';
    first = true;
  }

  // Process request
  res = await doRequest (options);
  return httpResponse ({ res, first });
};

