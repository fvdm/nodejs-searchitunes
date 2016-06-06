searchitunes
============

Light node.js module to quickly search the Apple iTunes Store and App Store for music, apps, etc.

[![npm](https://img.shields.io/npm/v/searchitunes.svg?maxAge=3600)](https://github.com/fvdm/nodejs-searchitunes/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-searchitunes.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-searchitunes)
[![Dependency Status](https://gemnasium.com/badges/github.com/fvdm/nodejs-searchitunes.svg)](https://gemnasium.com/github.com/fvdm/nodejs-searchitunes#runtime-dependencies)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-searchitunes/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-searchitunes?branch=master)


Installation
------------

`npm install searchitunes`


Usage
-----

### ( params, [timeout], callback )

argument  | type     | required | default | description
:---------|:---------|:---------|:--------|:------------------------------
params    | object   | yes      |         | Search parameters
timeout   | number   | no       | 5000    | Wait time out in ms
callback  | function | yes      |         | [Callback](#callback) function to process results


* [Search API documentation](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#overview)
* [Live demo](https://tonicdev.com/npm/searchitunes)


#### Lookup by ID

When you wish to retrieve one specific item by its ID,
include one of the following params to use the Lookup API.
The result `data` will be only the _object_ with the item's details.

* [Lookup API documentation](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#lookup)


**ID params**

* amgAlbumId
* amgArtistId
* amgVideoId
* id
* isbn
* upc


```js
searchitunes ({ id: 123456 }, callback);
```


#### Callback

The `callback` function receives two parameters: `err` and `data`.
On success `err` is _null_ and `data` is the result object.
On error `err` is an instance of _Error_ and `data` is not set, see [Errors](#errors) below.


#### Example

```js
var searchitunes = require ('searchitunes');

var searchParams = {
  entity: 'software',
  country: 'NL',
  term: 'github',
  limit: 1,
  price: 0
};
  

// Find free Github app for iPhone in Dutch App Store
searchitunes (searchParams, function (err, data) {
  if (err) {
    console.log (err);
    return;
  }

  // All good
  console.log (data);
);


// Get one specific item by ID
searchitunes ({ id: 512939461 }, console.log);
```


#### Output

When you lookup an item by its ID you only get the singular result _object_.

```js
{ resultCount: 1,
  results: 
   [ { screenshotUrls: 
        [ 'http://a4.mzstatic.com/eu/r30/Purple69/v4/8e/b6/b1/8eb6b18c-1703-3fe9-1311-9a891a851f2b/screen1136x1136.jpeg',
          'http://a5.mzstatic.com/eu/r30/Purple69/v4/8c/9c/df/8c9cdf9a-36ec-9b81-63af-68be202691d3/screen1136x1136.jpeg',
          'http://a3.mzstatic.com/eu/r30/Purple69/v4/9b/f7/6f/9bf76f76-05d8-80b0-4b9f-6dbb365a782a/screen1136x1136.jpeg',
          'http://a1.mzstatic.com/eu/r30/Purple69/v4/3d/81/77/3d8177a8-2653-7cbb-e04c-d45942ca980e/screen1136x1136.jpeg',
          'http://a4.mzstatic.com/eu/r30/Purple49/v4/b8/4d/24/b84d24c8-3647-9df3-2244-ea0ddea32bc6/screen1136x1136.jpeg' ],
       ipadScreenshotUrls: 
        [ 'http://a1.mzstatic.com/eu/r30/Purple69/v4/f6/44/ee/f644ee69-53ed-65dd-85f0-24cf31f7daa1/screen480x480.jpeg',
          'http://a5.mzstatic.com/eu/r30/Purple69/v4/56/94/d3/5694d376-cea1-ab3f-51b4-f771c73c9bce/screen480x480.jpeg',
          'http://a3.mzstatic.com/eu/r30/Purple69/v4/2e/19/1d/2e191d6d-c571-360a-5d7c-a5a3e636af39/screen480x480.jpeg',
          'http://a4.mzstatic.com/eu/r30/Purple69/v4/aa/ec/91/aaec918e-4e32-f90e-dc18-9d183a636925/screen480x480.jpeg',
          'http://a4.mzstatic.com/eu/r30/Purple69/v4/6e/0d/30/6e0d30fc-aaa8-f3f4-0fd7-42f92b876e96/screen480x480.jpeg' ],
       appletvScreenshotUrls: [],
       artworkUrl60: 'http://is2.mzstatic.com/image/thumb/Purple30/v4/19/f4/66/19f46673-c118-c52d-ca78-a1f3439a020e/source/60x60bb.jpg',
       artworkUrl512: 'http://is2.mzstatic.com/image/thumb/Purple30/v4/19/f4/66/19f46673-c118-c52d-ca78-a1f3439a020e/source/512x512bb.jpg',
       artworkUrl100: 'http://is2.mzstatic.com/image/thumb/Purple30/v4/19/f4/66/19f46673-c118-c52d-ca78-a1f3439a020e/source/100x100bb.jpg',
       artistViewUrl: 'https://itunes.apple.com/nl/developer/dillon-buchanan/id551531425?uo=4',
       kind: 'software',
       features: [ 'iosUniversal' ],
       supportedDevices: 
        [ 'iPad2Wifi',
          'iPad23G',
          'iPhone4S',
          'iPadThirdGen',
          'iPadThirdGen4G',
          'iPhone5',
          'iPodTouchFifthGen',
          'iPadFourthGen',
          'iPadFourthGen4G',
          'iPadMini',
          'iPadMini4G',
          'iPhone5c',
          'iPhone5s',
          'iPhone6',
          'iPhone6Plus',
          'iPodTouchSixthGen' ],
       advisories: [],
       isGameCenterEnabled: false,
       trackCensoredName: 'CodeHub - A Client for GitHub',
       languageCodesISO2A: [ 'EN' ],
       fileSizeBytes: '42310545',
       sellerUrl: 'http://codehub-app.com',
       contentAdvisoryRating: '4+',
       trackViewUrl: 'https://itunes.apple.com/nl/app/codehub-a-client-for-github/id707173885?mt=8&uo=4',
       trackContentRating: '4+',
       genreIds: [ '6007', '6005' ],
       currency: 'EUR',
       wrapperType: 'software',
       version: '2.9.3',
       description: 'CodeHub is the best way to browse and maintain your GitHub repositories on any iPhone, iPod Touch, and iPad device! Keep an eye on your projects with the ability to view everything from pull requests to commenting on individual file diffs in the latest changeset. CodeHub brings GitHub to your finger tips in a sleek and efficient design. \n\nFeatures include: \n\n- GitHub.com and GitHub Enterprise support\n- Multiple GitHub profiles for easy switching \n- View repository events, issues, and change sets, pull requests, etc..\n- Browse source directories & files with beautiful syntax highlighting\n- Edit files and commit them!\n- View file diffs from checkins and pull requests\n- Update, comment and manage repository issues\n- Upload images directly from your devices to comments/issues.\n- Explore other GitHub open source repositories \n- Inline commit commenting\n- Access your public, private, and starred gists\n- Slide out menu for quick and efficient navigation\n- Much much more! \n\nFollow the project on twitter: @CodeHubApp\n\nPlease note: CodeHub is not affiliated with GitHub in any way. CodeHub is a third-party GitHub client.',
       artistId: 551531425,
       artistName: 'Dillon Buchanan',
       genres: [ 'Productiviteit', 'Sociaal netwerken' ],
       price: 0,
       trackName: 'CodeHub - A Client for GitHub',
       trackId: 707173885,
       bundleId: 'com.dillonbuchanan.codehub',
       releaseDate: '2013-10-01T01:00:56Z',
       primaryGenreName: 'Productivity',
       isVppDeviceBasedLicensingEnabled: false,
       primaryGenreId: 6007,
       formattedPrice: 'Gratis',
       releaseNotes: '- Bug fixes',
       currentVersionReleaseDate: '2016-05-04T16:04:45Z',
       sellerName: 'Dillon Buchanan',
       minimumOsVersion: '9.0',
       averageUserRating: 4.5,
       userRatingCount: 19 } ] }
```


Errors
------

message          | description
:----------------|:--------------------------------------------
http error       | API communication failed
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

[Franklin van de Meent](https://frankl.in)
