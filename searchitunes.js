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
  let first;
  let params = arguments[0];
  let url = 'https://itunes.apple.com/search?';

  let options = {
    signal: AbortSignal.timeout( timeout ),
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

  // Search or lookup
  const idKeys = [
    'amgAlbumId',
    'amgArtistId',
    'amgVideoId',
    'id',
    'isbn',
    'upc',
  ];

  const hasKeys = Object.keys( params ).some( key => idKeys.includes( key ) );

  if ( hasKeys ) {
    url = 'https://itunes.apple.com/lookup';
    first = true;
  }

  // Process request
  params = new URLSearchParams( params );
  url += '?' + params.toString();

  const res = await fetch( url, options );
  const data = await res.json();

  if ( ! data.results || ! data.results.length ) {
    throw new Error( 'no results' );
  }

  if ( first ) {
    return data.results[0];
  }

  return data;
};
