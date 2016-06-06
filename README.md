searchitunes
============

Light node.js module to quickly search the Apple iTunes Store and App Store for music, apps, etc. with added searching functionality by app store id.


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


* Parameters: [API documentation](http://www.apple.com/itunes/affiliates/resources/documentation/itunes-store-web-service-search-api.html)
* Live demo: [Tonic](https://tonicdev.com/npm/searchitunes)


#### Callback

The `callback` function receives two parameters: `err` and `data`.
On success `err` is _null_ and `data` is the result object.
On error `err` is an instance of _Error_ and `data` is not set, see [Errors](#errors) below.


#### Example 1

```js
var itunes = require ('searchitunes');

// Find free Panda app for iPhone in Dutch App Store
itunes.searchByTerm (
    {
        entity: 'software',
        country: 'NL',
        term: 'Subway',
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

#### Example 2

```js
var itunes = require ('searchitunes');

// Find free app for iPhone in Dutch App Store by id from URL https://itunes.apple.com/nl/app/subway-surfers/id51293946
itunes.searchById(
    {
        entity: 'software',
        country: 'NL',
        id: '51293946',
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
  "resultCount": 1,
  "results": [
    {
      "isGameCenterEnabled": true,
      "ipadScreenshotUrls": [
        "http://a3.mzstatic.com/eu/r30/Purple20/v4/8d/c8/95/8dc89513-3f89-a1bb-2fc7-6bfebce5f7ca/screen480x480.jpeg",
        "http://a1.mzstatic.com/eu/r30/Purple60/v4/bf/9b/09/bf9b0945-5821-9e5e-0688-72753bf5154c/screen480x480.jpeg",
        "http://a3.mzstatic.com/eu/r30/Purple20/v4/aa/75/12/aa751229-68be-e7c7-fe9e-d1bcd32b67a0/screen480x480.jpeg",
        "http://a1.mzstatic.com/eu/r30/Purple18/v4/8f/c7/e0/8fc7e07a-ac97-4df3-7721-47ed395b4b47/screen480x480.jpeg",
        "http://a2.mzstatic.com/eu/r30/Purple18/v4/e8/e9/8a/e8e98ac4-c83b-eaf8-63d0-fb51fca086a8/screen480x480.jpeg"
      ],
      "screenshotUrls": [
        "http://a5.mzstatic.com/eu/r30/Purple18/v4/e6/92/40/e69240cd-475f-b37e-7c07-ba337de30705/screen1136x1136.jpeg",
        "http://a4.mzstatic.com/eu/r30/Purple20/v4/96/9a/93/969a9361-138a-ced6-8919-afad53bacad7/screen1136x1136.jpeg",
        "http://a3.mzstatic.com/eu/r30/Purple20/v4/2b/05/9e/2b059e51-09b3-bc28-51a6-6c06cdba1f7b/screen1136x1136.jpeg",
        "http://a5.mzstatic.com/eu/r30/Purple30/v4/2f/99/a8/2f99a8e3-467f-b37e-bada-ddbf8e686e57/screen1136x1136.jpeg",
        "http://a4.mzstatic.com/eu/r30/Purple30/v4/28/25/ef/2825ef93-f09c-6c33-d38d-1f1c647deea3/screen1136x1136.jpeg"
      ],
      "appletvScreenshotUrls": [

      ],
      "artworkUrl512": "http://is1.mzstatic.com/image/thumb/Purple20/v4/9d/55/d0/9d55d0b4-bd6d-924a-4759-32df55b2bad1/source/512x512bb.jpg",
      "artistViewUrl": "https://itunes.apple.com/nl/developer/kiloo/id330629809?uo=4",
      "artworkUrl60": "http://is1.mzstatic.com/image/thumb/Purple20/v4/9d/55/d0/9d55d0b4-bd6d-924a-4759-32df55b2bad1/source/60x60bb.jpg",
      "artworkUrl100": "http://is1.mzstatic.com/image/thumb/Purple20/v4/9d/55/d0/9d55d0b4-bd6d-924a-4759-32df55b2bad1/source/100x100bb.jpg",
      "kind": "software",
      "features": [
        "gameCenter",
        "iosUniversal"
      ],
      "supportedDevices": [
        "iPhone4",
        "iPad2Wifi",
        "iPad23G",
        "iPhone4S",
        "iPadThirdGen",
        "iPadThirdGen4G",
        "iPhone5",
        "iPodTouchFifthGen",
        "iPadFourthGen",
        "iPadFourthGen4G",
        "iPadMini",
        "iPadMini4G",
        "iPhone5c",
        "iPhone5s",
        "iPhone6",
        "iPhone6Plus",
        "iPodTouchSixthGen"
      ],
      "advisories": [
        "Content met mild animatiegeweld of fictief geweld kan onregelmatig voorkomen"
      ],
      "languageCodesISO2A": [
        "EN"
      ],
      "fileSizeBytes": "98067771",
      "averageUserRatingForCurrentVersion": 3.5,
      "sellerUrl": "http://www.kiloo.com/games",
      "userRatingCountForCurrentVersion": 8,
      "trackContentRating": "9+",
      "trackCensoredName": "Subway Surfers",
      "trackViewUrl": "https://itunes.apple.com/nl/app/subway-surfers/id512939461?mt=8&uo=4",
      "contentAdvisoryRating": "9+",
      "currency": "EUR",
      "wrapperType": "software",
      "version": "1.56.0",
      "description": "Presented by Kiloo Games and Sybo Games.\n\nDASH as fast as you can!\nDODGE the oncoming trains!\n\nHelp Jake, Tricky & Fresh escape from the grumpy Inspector and his dog.\n\n- Grind trains with your cool crew!\n- Colorful and vivid HD graphics!\n- Hoverboard Surfing!\n- Paint powered jetpack!\n- Lightning fast swipe acrobatics!\n- Challenge and help your friends!\n\nJoin the App Store's most daring chase!\n\nA Universal App with hd optimized graphics for retina resolution.\n\nSubway Surfers is compatible with iPod 5, iPhone 4, iPhone 4s, iPhone 5, iPhone 5s, iPhone 5c, iPhone 6, iPhone 6 Plus, iPad 2, iPad 3, iPad 4, iPad Air, iPad Air 2, iPad Mini, iPad Mini Retina, iPad Mini 3.\n\niOS 7 or later OS version is required.",
      "artistId": 330629809,
      "artistName": "Kiloo",
      "genres": [
        "Games",
        "Actie",
        "Arcade",
        "Amusement"
      ],
      "price": 0,
      "trackName": "Subway Surfers",
      "trackId": 512939461,
      "bundleId": "com.kiloo.subwaysurfers",
      "releaseDate": "2012-05-24T07:00:00Z",
      "primaryGenreName": "Games",
      "isVppDeviceBasedLicensingEnabled": true,
      "releaseNotes": "- The Subway Surfers World Tour goes to glamorous Las Vegas\n- Surf beneath the star covered sky and explore the flashy Subway\n- Unlock the new Win Outfit for Rex, the amazing performer\n- Cruise through the Subway on the fancy Roller board\n- Collect shiny Spades in the Weekly Hunts to unlock cool prizes",
      "currentVersionReleaseDate": "2016-06-02T09:56:00Z",
      "primaryGenreId": 6014,
      "sellerName": "Kiloo",
      "formattedPrice": "Gratis",
      "genreIds": [
        "6014",
        "7001",
        "7003",
        "6016"
      ],
      "minimumOsVersion": "7.0",
      "averageUserRating": 4.5,
      "userRatingCount": 26772
    }
  ]
}
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
