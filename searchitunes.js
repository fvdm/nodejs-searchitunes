/*
 Name:                  searchitunes
 Description:           Search the Apple iTunes Store and App Store.
 Author:                Franklin van de Meent (https://frankl.in)
 Changes added by:      fruktorum.com
 Source:                https://github.com/pavelapps/nodejs-searchitunes
 API docs:              http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html
 License:               Unlicense / Public Domain, see UNLICENSE file
 (https://github.com/pavelapps/nodejs-searchitunes/raw/master/UNLICENSE)
 */

var http = require ('httpreq');

module.exports = {
    search: function (url, params, timeout, callback) {
        if (typeof timeout === 'function') {
            callback = timeout;
            timeout = 5000;
        }

        if (!params || !(params instanceof Object)) {
            callback (new Error ('invalid params'));
            return;
        }

        params.version = params.version || 2;

        http.get (url,
            {
                parameters: params,
                timeout: timeout,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'searchitunes.js'
                }
            },
            function (err, res) {
                var error = null;
                var data;

                if (err) {
                    error = new Error ('http error');
                    error.code = res.statusCode;
                    error.body = res.body;
                    callback (error);
                    return;
                }

                try {
                    data = JSON.parse (res.body);

                    if (!(data.results instanceof Array) || !data.results.length) {
                        callback (new Error ('no results'));
                        return;
                    }

                    callback (null, data);
                } catch (e) {
                    error = new Error ('invalid response');
                    error.error = e;
                    callback (error);
                }
            }
        );
    },

    searchByTerm: function (params, timeout, callback) {
        this.search('https://itunes.apple.com/WebObjects/MZStoreServices.woa/ws/wsSearch',
            params, timeout, callback);
    },

    searchById: function (params, timeout, callback) {
        this.search('http://ax.phobos.apple.com.edgesuite.net/WebObjects/MZStoreServices.woa/wa/wsLookup',
            params, timeout, callback);
    }
};
