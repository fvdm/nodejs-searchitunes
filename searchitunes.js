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

var http = require ('httpreq');

module.exports = function (params, callback) {
  if (!params || !(params instanceof Object)) {
    return callback (new Error ('invalid params'));
  }

  params.version = params.version || 2;

  http.get (
    'https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/wsSearch',
    {
      parameters: params,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'searchitunes.js'
      }
    },
    function (err, res) {
      if (err) {
        var error = new Error ('http error');
        error.code = res.statusCode;
        error.body = res.body;
        return callback (error);
      }

      try {
        data = JSON.parse (res.body);
        if (!(data.results instanceof Array) || data.results.length === 0) {
          return callback (new Error ('no results'));
        }
        return callback (null, data);
      }
      catch (e) {
        var error = new Error ('invalid response');
        error.error = e;
        callback (error);
      }
    }
  );
};
