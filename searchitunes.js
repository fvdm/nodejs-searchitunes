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
 * @return  {Promise<boolean>}  `true` = yes
 *
 * @param   {object}   obj   Object to process
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
 * Send HTTP request
 *
 * @return  {Promise<object>}
 * @param   {object}  options  httpreq.doRequest options
 */

function httpRequest (options) {
  return new Promise ((resolve, reject) => {
    doRequest (options, (err, res) => {
      if (err) {
        reject (err);
        return;
      }

      resolve (res);
    });
  });
}


/**
 * Process HTTP response
 *
 * @return  {Promise<object|array>}
 *
 * @param   {object}   res            Response
 * @param   {bool}     [first=false]  Only first result
 */

function httpResponse ({
  res,
  first,
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
 * @param   {object}  params          Parameters to send along
 * @param   {number}  [timeout=5000]  Wait timeout in ms
 * @param   {string}  [userAgent]     Custom User-Agent header
 */

module.exports = async params => {
  let res;
  let first = false;
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

  // Search or lookup
  if (keysInObject (options.parameters)) {
    options.url = 'https://itunes.apple.com/lookup';
    first = true;
  }

  // Process request
  res = await httpRequest (options);
  return httpResponse ({ res, first });
};
