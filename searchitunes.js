/*
Name:         searchitunes
Description:  Search the Apple iTunes Store and App Store.
Author:       Franklin (https://fvdm.com)
Source:       https://github.com/fvdm/nodejs-searchitunes
License:      Unlicense (Public Domain, see UNLICENSE file)
*/


/**
 * Send HTTP request
 *
 * @return  {Promise<object|array>}
 *
 * @param   {object}  params                 Parameters to send along
 * @param   {number}  [params.timeout=5000]  Wait timeout in ms
 * @param   {string}  [params.userAgent]     Custom User-Agent header
 */

module.exports = async function SearchItunes ( {

  timeout = 5000,
  userAgent = 'searchitunes.js',
  trackId,

} ) {

  let params = arguments[0];
  let url = 'https://itunes.apple.com/search';

  let options = {
    signal: AbortSignal.timeout( parseInt( timeout, 10 ) ),
    headers: {
      'Accept': 'application/json',
      'User-Agent': userAgent,
    },
  };

  delete params.timeout;
  delete params.userAgent;

  // Convert trackId from a search response
  if ( trackId ) {
    params.id = trackId;
    delete params.trackId;
  }

  // Lookup API
  const idKeys = [
    'amgAlbumId',
    'amgArtistId',
    'amgVideoId',
    'id',
    'isbn',
    'upc',
  ];

  let bulkRequest = false;
  let idKey = false;
  let key;

  for ( let i = 0; i < idKeys.length; i++ ) {
    key = idKeys[i];

    if ( params[key] ) {
      idKey = true;
      url = 'https://itunes.apple.com/lookup';

      // Bulk request
      if ( Array.isArray( params[key] ) ) {
        bulkRequest = true;
        params[key] = params[key].join( ',' );
      }

      break;
    }
  }

  // Process
  params = new URLSearchParams( params );
  url += '?' + params.toString();

  const res = await fetch( url, options );
  const data = await res.json();

  // Empty result
  if ( ! data.results || ! data.results.length ) {
    throw new Error( 'no results' );
  }

  // Lookup response
  if ( idKey ) {

    // Bulk lookup
    if ( bulkRequest ) {
      return data.results;
    }

    // Single lookup
    return data.results[0];
  }

  // Search response
  return data;

};
