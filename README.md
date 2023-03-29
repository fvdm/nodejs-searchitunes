# searchitunes

Lightweight Node.js package to quickly search the Apple iTunes Store and App Store for music, movies, apps, etc.

[![npm](https://img.shields.io/npm/v/searchitunes.svg?maxAge=3600)](https://github.com/fvdm/nodejs-searchitunes/blob/master/CHANGELOG.md)
[![Build Status](https://github.com/fvdm/nodejs-searchitunes/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/fvdm/nodejs-searchitunes/actions/workflows/node.js.yml)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-searchitunes/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-searchitunes?branch=master)


## Example

```js
const searchitunes = require( 'searchitunes' );

// Find free Github app for iPhone in Dutch App Store
searchitunes( {
  entity:  'software',
  country: 'NL',
  term:    'github',
  limit:   1,
  price:   0,
} )
  .then( console.log )
  .catch( console.error )
;

// Get one specific item by ID
searchitunes( { id: 512939461 } )
  .then( console.log )
  .catch( console.error )
;
```


## Installation

`npm i searchitunes`


## Interface

The module exports only one function.
Arguments must be wrapped in an object.
It returns a Promise.


## Configuration

The parameters below can be included along with the
normal API params.

param       | type   | default         | description
:-----------|:-------|:----------------|:-----------
[timeout]   | number | 5000            | Wait time out in ms
[userAgent] | string | searchitunes.js | User-Agent header
...         | mixed  |                 | API parameters

```js
itunes( {
  timeout: 8000,
  entity:  'software',
  term:    'github',
} )
```


## Search API

For searching in the iTunes databases you simply include
the search params in your request. The function will
resolve with an object.

- [Search API docs](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/)
- [Live demo](https://npm.runkit.com/searchitunes)


### Lookup by ID

When you wish to retrieve one specific item by its ID, include one of the ID
params to use the Lookup API. The result data will be only the `object` with
the item's details.

- [Lookup API docs](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/LookupExamples.html)


**ID params**

- amgAlbumId
- amgArtistId
- amgVideoId
- id
- isbn
- upc
- trackId

When you lookup a `trackId` from a search response it will be automatically
converted to the `id` parameter instead. Otherwise the API won't understand it.


```js
searchitunes( { id: 123456 } )
  .then( console.log )
  .catch( console.error )
;
```


## Unlicense

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

For more information, please refer to <https://unlicense.org/>


## Author

[Franklin](https://fvdm.com)
| [buy me a coffee](https://fvdm.com/donating)

