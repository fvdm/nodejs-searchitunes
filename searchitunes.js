/*
Name:         searchitunes
Description:  Search the Apple iTunes Store and App Store.
Author:       Franklin van de Meent (https://frankl.in)
Source:       https://github.com/fvdm/nodejs-searchitunes
Feedback:     https://github.com/fvdm/nodejs-searchitunes/issues
License:      Unlicense / Public Domain, see UNLICENSE file
              (https://github.com/fvdm/nodejs-searchitunes/raw/master/UNLICENSE)

API docs:     http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html
*/

var	http = require('http'),
	querystring = require('querystring'),
	api = {
		host:	'itunes.apple.com',
		port:	80,
		path:	'/WebObjects/MZStoreServices.woa/ws/wsSearch'
	}

module.exports = function( params, cb ) {
	params.version = params.version || 2
	
	var req = http.request(
		{
			host:		api.host,
			port:		api.port,
			path:		api.path +'?'+ querystring.stringify( params ),
			method:		'GET',
			headers: {
				'Accept':	'application/json',
				'User-Agent':	'appstoresearch.js'
			}
		},
		function( response ) {
			
			var data = ''
			response.on( 'data', function( chunk ) { data += chunk })
			response.on( 'end', function() {
				
				// process response
				data = data.toString().trim()
				if( data.length >= 2 && data.substr(0,1) == '{' && data.substr( data.length -1, 1 ) == '}' ) {
					
					data = JSON.parse( data )
					if( data.resultCount !== undefined ) {
						cb( data )
					} else {
						cb( false, {reason: 'incomplete json', headers: response.headers, data: data} )
					}
					
				} else {
					
					// not json
					cb( false, {reason: 'not json', headers: response.headers, data: data} )
					
				}
			
			})
		
		}
	).end()
}
