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

var http = require('http')
var querystring = require('querystring')

module.exports = function( params, cb ) {
  // prevent multiple callbacks
  var complete = false
  function doCallback( err, res ) {
    if( !complete ) {
      complete = true
      cb( err, res || null )
    }
  }

  // check input
  if( !params || !(params instanceof Object) ) {
    doCallback( new Error('invalid params') )
    return
  }

  // build request
  params.version = params.version || 2

  var options = {
    host: 'itunes.apple.com',
    path: '/WebObjects/MZStoreServices.woa/ws/wsSearch?'+ querystring.stringify( params ),
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'searchitunes.js'
    }
  }

  var request = http.request( options )

  // response
  request.on( 'response', function( response ) {
    var data = []
    var size = 0
    
    response.on( 'data', function( ch ) {
      data.push( ch )
      size += ch.length
    })

    response.on( 'close', function() {
      doCallback( new Error('request closed') )
    })
    
    response.on( 'end', function() {
      data = new Buffer.concat( data, size ).toString('utf8').trim()

      if( response.statusCode >= 300 ) {
        var error = new Error('http error')
        error.code = response.statusCode
        error.body = data
        doCallback( error )
        return
      }

      try {
        data = JSON.parse( data )

        if( !(data.results instanceof Array) || data.results.length === 0 ) {
          doCallback( new Error('no results') )
        } else {
          doCallback( null, data )
        }
      }
      catch(e) {
        var error = new Error('invalid response')
        error.error = e
        doCallback( error )
      }
    })
  })

  // request failed
  request.on( 'error', function( err ) {
    var error = new Error('request failed')
    error.error = err
    doCallback( error )
  })

  // run it
  request.end()
}
