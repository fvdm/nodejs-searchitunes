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

async function keysInObject (obj) {
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

async function httpResponse ({
  res,
  first = false,
}) {
  const data = JSON.parse (res.body);

  if (!data.results || !data.results.length) {
    throw new Error ('no results');
  }

  if (first) {
    return data.results[0];
  }

  return data;
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

module.exports = async ({
  timeout = 5000,
  userAgent = 'searchitunes.js',
  trackId,
}) => {
  let options = {
    method: 'POST',
    url: 'https://itunes.apple.com/search',
    parameters: arguments[0],
    timeout,
    headers: {
      'Accept': 'application/json',
      'User-Agent': userAgent,
    },
  };

  // Convert trackId from a search response
  if (trackId) {
    options.parameters.id = trackId;
    delete options.parameters.trackId;
  }

  // Search or lookup
  if (keysInObject (options.parameters)) {
    options.url = 'https://itunes.apple.com/lookup';
    first = true;
  }

  // Process request
  const res = await doRequest (options);

  return httpResponse ({ res, first });
};

