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
 * @return  {Promise}
 *
 * @param   {object}   res            Response
 * @param   {bool}     [first=false]  Only first result
 */

async function httpResponse ({
  res = {},
  first = false,
}) {
  let data = res.body || '';

  try {
    data = JSON.parse (data);

    if (!data.results || !data.results.length) {
      throw new Error ('no results');
    }
    else if (first) {
      return data.results[0];
    }

    return data;
  }
  catch (e) {
    return e;
  }
}


/**
 * Send HTTP request
 *
 * @return  {Promise}
 *
 * @param   {object}   [parameters]    Parameters to send along
 * @param   {number}   [timeout=5000]  Wait time out in ms
 */

module.exports = async function search ({
  parameters = {},
  timeout = 5000,
  userAgent = 'searchitunes.js',
}) {
  let first = false;

  let options = {
    url: 'https://itunes.apple.com/search',
    parameters,
    timeout,
    headers: {
      'Accept': 'application/json',
      'User-Agent': userAgent,
    },
  };

  if (keysInObject (parameters)) {
    options.url = 'https://itunes.apple.com/lookup';
    first = true;
  }

  return new Promise ((resolve, reject) => {
    doRequest (options, async (err, res) => {
      if (err) {
        reject (err);
        return;
      }

      const data = await httpResponse ({ res, first });

      resolve (data);
    });
  });
};
