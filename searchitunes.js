/*
Name:     nodejs-searchitunes
Source:   https://github.com/fvdm/nodejs-searchitunes
Feedback: https://github.com/fvdm/nodejs-searchitunes/issues
License:  unlicense / public domains

API docs: http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>
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
