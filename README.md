searchitunes
============

Light node.js module to quickly search the Apple iTunes Store and App Store for music, apps, etc.

[![Build Status](https://travis-ci.org/fvdm/nodejs-searchitunes.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-searchitunes)


Installation
------------

Stable: `npm install searchitunes`

Source: `npm install fvdm/nodejs-searchitunes`


Usage
-----

### ( params, callback )

parameter | type     | required | description
--------- | -------- | -------- | -----------------------------
params    | object   | yes      | object with search parameters
callback  | function | yes      | function to process results


Params: [API documentation](http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html)


### Callback

The `callback` function receives two parameters: `err` and `data`.
On success `err` is _null_ and `data` is the result object.
On error `err` is an instance of _Error_ and `data` is not set, see *Errors* below.


### Example

```js
var searchitunes = require ('searchitunes');

// Find free Github app for iPhone in Dutch App Store
searchitunes (
  {
    entity: 'software',
    country: 'NL',
    term: 'github',
    limit: 1,
    price: 0
  },
  function (err, data) {
    if (err) {

      // Error
      console.log ('Search failed: %s', err.message);

    } else {

      // All good
      console.log (data);

    }
  }
);
```


#### Output

```js
{
  resultCount: 1,
  results: [
    {
      kind: 'software',
      features: [
        'iosUniversal'
      ],
      supportedDevices: [
        'iPad23G',
        'iPhone5',
        'iPadMini4G',
        'iPhone5s',
        'iPad2Wifi',
        'iPadFourthGen4G',
        'iPadThirdGen4G',
        'iPhone4S',
        'iPadFourthGen',
        'iPodTouchFifthGen',
        'iPadThirdGen',
        'iPhone4',
        'iPhone5c',
        'iPadMini'
      ],
      advisories: [],
      isGameCenterEnabled: false,
      screenshotUrls: [
        'http://a5.mzstatic.com/eu/r30/Purple/v4/89/22/af/8922afb3-2977-112d-9a6c-517195e90923/screen1136x1136.jpeg',
        'http://a5.mzstatic.com/eu/r30/Purple6/v4/72/e2/ef/72e2efff-81fe-2072-2e79-159ab412f39a/screen1136x1136.jpeg',
        'http://a4.mzstatic.com/eu/r30/Purple/v4/e2/9a/69/e29a69d2-7fbe-e4bb-0b96-656789a0fcd8/screen1136x1136.jpeg',
        'http://a2.mzstatic.com/eu/r30/Purple6/v4/a2/ec/f2/a2ecf2b9-8880-55ea-e51f-77a14a4b1e38/screen1136x1136.jpeg',
        'http://a1.mzstatic.com/eu/r30/Purple/v4/3b/70/e4/3b70e426-3d06-cca4-388c-23ca0754c878/screen1136x1136.jpeg'
      ],
      ipadScreenshotUrls: [
        'http://a1.mzstatic.com/eu/r30/Purple4/v4/34/49/b4/3449b49d-9159-aa13-bd7f-650d5d61fae7/screen480x480.jpeg',
        'http://a3.mzstatic.com/eu/r30/Purple6/v4/48/9f/76/489f7624-6748-a7f9-33f7-4989b1ea9be8/screen480x480.jpeg',
        'http://a3.mzstatic.com/eu/r30/Purple6/v4/b4/6d/50/b46d5066-4bf0-b74a-ee56-23a2901f49e2/screen480x480.jpeg',
        'http://a2.mzstatic.com/eu/r30/Purple/v4/4b/76/78/4b7678b7-93bf-dd9e-22bc-7992a7c30ebd/screen480x480.jpeg',
        'http://a3.mzstatic.com/eu/r30/Purple4/v4/95/79/61/95796168-cad7-322f-cb42-a189997084cb/screen480x480.jpeg'
      ],
      artworkUrl60: 'http://a1453.phobos.apple.com/us/r30/Purple2/v4/7c/f3/10/7cf31092-9315-6d88-8a8f-f7654fc3c477/Icon.png',
      artworkUrl512: 'http://a1363.phobos.apple.com/us/r30/Purple4/v4/47/96/97/479697ad-2032-3cb6-af4c-1ed00afe6848/mzl.sdsxxvxi.png',
      artistViewUrl: 'https://itunes.apple.com/nl/artist/dillon-buchanan/id551531425?uo=4',
      artistId: 551531425,
      artistName: 'Dillon Buchanan',
      price: 0,
      version: '2.3.3',
      description: '...',
      currency: 'EUR',
      genres: [
        'Productiviteit', 'Sociaal netwerken'
      ],
      genreIds: [
        '6007', '6005'
      ],
      releaseDate: '2013-10-01T01:00:56Z',
      sellerName: 'Dillon Buchanan',
      bundleId: 'com.dillonbuchanan.codehub',
      trackId: 707173885,
      trackName: 'CodeHub - GitHub for iOS',
      primaryGenreName: 'Productivity',
      primaryGenreId: 6007,
      releaseNotes: '...',
      minimumOsVersion: '7.0',
      wrapperType: 'software',
      formattedPrice: 'Gratis',
      trackCensoredName: 'CodeHub - GitHub for iOS',
      languageCodesISO2A: [
        'EN'
      ],
      fileSizeBytes: '20558576',
      contentAdvisoryRating: '4+',
      averageUserRatingForCurrentVersion: 5,
      userRatingCountForCurrentVersion: 3,
      artworkUrl100: 'http://a1363.phobos.apple.com/us/r30/Purple4/v4/47/96/97/479697ad-2032-3cb6-af4c-1ed00afe6848/mzl.sdsxxvxi.png',
      trackViewUrl: 'https://itunes.apple.com/nl/app/codehub-github-for-ios/id707173885?mt=8&uo=4',
      trackContentRating: '4+',
      averageUserRating: 4.5,
      userRatingCount: 13
    }
  ]
}
```


Errors
------

message          | description
---------------- | --------------------------------------------
request failed   | Request can not be made, see `err.error`
request closed   | Request was closed too early
invalid response | API returned unreadable data, see `err.body`
invalid params   | Client provided no or invalid parameters
no results       | No results received


Unlicense
---------

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


Author
------

Franklin van de Meent
| [Website](https://frankl.in)
| [Github](https://github.com/fvdm)
