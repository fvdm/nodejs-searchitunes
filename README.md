nodejs-searchitunes
===================

Light Node.js module to quickly search Apple's iTunes Store for music and apps.

Basically this performs a GET request to the iTunes API and validates the returned data to make sure the process doesn't die by remote failures.


# Installation

Installation and connecting is simple:


### From NPM

```
npm install searchitunes
```

```js
var itunes = require('searchitunes')
```


### From Github

```
git clone https://github.com/fvdm/nodejs-searchitunes
```

```js
var itunes = require('./nodejs-searchitunes')
```


# Usage

### ( paramsObject, callback )

* **paramsObject** -- object with search parameters.
* **callback** -- function that receives results.

You can find all the parameters in the API documentation: http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html


## callback

**Success**: callbackFunction ( resultObject )

**Faillure**: callbackFunction ( result, errorObject )

**Result** is always the response body, in case of JSON the parsed object. In case of faillure **errorObject** is provided with *reason* and *headers*.


## Example

```js
var searchitunes = require('searchitunes')

// Find free Github app for iPhone in Dutch App Store
searchitunes({
	entity: 'software',
	country: 'NL',
	term: 'github',
	limit: 1,
	price: 0
}, console.log )
```

```js
{ resultCount: 1,
  results: 
   [ { kind: 'software',
       features: [],
       supportedDevices: [Object],
       isGameCenterEnabled: false,
       artistViewUrl: 'http://itunes.apple.com/nl/artist/github/id429758986?uo=4',
       artworkUrl60: 'http://a4.mzstatic.com/us/r1000/069/Purple/v4/95/79/4c/95794ce7-4fc0-c7c6-ac3c-5d2ede6b59ce/Icon.png',
       screenshotUrls: [Object],
       ipadScreenshotUrls: [],
       artworkUrl512: 'http://a2.mzstatic.com/us/r1000/072/Purple/v4/3e/a9/e7/3ea9e7d5-cea6-be41-d4fc-665f93d6227a/mzl.eefstvnr.png',
       artistId: 429758986,
       artistName: 'GitHub',
       price: 0,
       version: '1.0.5',
       description: '[..]',
       genreIds: [Object],
       releaseDate: '2011-08-09T09:49:17Z',
       sellerName: 'GitHub',
       currency: 'EUR',
       genres: [Object],
       bundleId: 'com.github.iceberg',
       trackId: 453833494,
       trackName: 'GitHub Issues',
       primaryGenreName: 'Utilities',
       primaryGenreId: 6002,
       releaseNotes: '- Bug fixes',
       wrapperType: 'software',
       trackCensoredName: 'GitHub Issues',
       trackViewUrl: 'http://itunes.apple.com/nl/app/github-issues/id453833494?mt=8&uo=4',
       contentAdvisoryRating: '4+',
       artworkUrl100: 'http://a2.mzstatic.com/us/r1000/072/Purple/v4/3e/a9/e7/3ea9e7d5-cea6-be41-d4fc-665f93d6227a/mzl.eefstvnr.png',
       languageCodesISO2A: [Object],
       fileSizeBytes: '1448076',
       sellerUrl: 'http://mobile.github.com',
       formattedPrice: 'Gratis',
       trackContentRating: '4+',
       averageUserRating: 4.5,
       userRatingCount: 3 } ] }
```

*(console.log goes only 3 levels deep, combined with [util.inspect](http://nodejs.org/api/util.html#util_util_inspect_object_showhidden_depth_colors) would be more useful)*


# Unlicense

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