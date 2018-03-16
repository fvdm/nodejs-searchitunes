# searchitunes

Lightweight Node.js package to quickly search the Apple iTunes Store and App Store for music, movies, apps, etc.

[![npm](https://img.shields.io/npm/v/searchitunes.svg?maxAge=3600)](https://github.com/fvdm/nodejs-searchitunes/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-searchitunes.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-searchitunes)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-searchitunes/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-searchitunes?branch=master)
[![bitHound Dependencies](https://www.bithound.io/github/fvdm/nodejs-searchitunes/badges/dependencies.svg)](https://www.bithound.io/github/fvdm/nodejs-searchitunes/develop/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/fvdm/nodejs-searchitunes/badges/code.svg)](https://www.bithound.io/github/fvdm/nodejs-searchitunes)
[![Greenkeeper badge](https://badges.greenkeeper.io/fvdm/nodejs-searchitunes.svg)](https://greenkeeper.io/)


## Example

```js
const searchitunes = require ('searchitunes');
const params = {
  entity: 'software',
  country: 'NL',
  term: 'github',
  limit: 1,
  price: 0
};

// Find free Github app for iPhone in Dutch App Store
searchitunes (params).then (console.log);

// Get one specific item by ID
searchitunes ({ id: 512939461 }).then (console.log);
```


## Installation

`npm i searchitunes`


## Usage
**( params, [timeout], [callback] )**

The module returns promises but also supports the callback argument.
It's up to you which you prefer.

argument  | type     | required | default | description
:---------|:---------|:---------|:--------|:------------------------------
params    | object   | yes      |         | Search parameters
timeout   | int      | no       | 5000    | Wait time out in ms
callback  | function | no       |         | `(err, data)` or use promises


* [Search-API docs](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#overview)
* [Live demo](https://npm.runkit.com/searchitunes)


### Lookup by ID

When you wish to retrieve one specific item by its ID,
include one of the following params to use the Lookup API.
The result data will be only the _object_ with the item's details.

* [Lookup-API docs](https://affiliate.itunes.apple.com/resources/documentation/itunes-store-web-service-search-api/#lookup)


**ID params**

* amgAlbumId
* amgArtistId
* amgVideoId
* id
* isbn
* upc


```js
searchitunes ({ id: 123456 })
  .then (console.log)
  .catch (console.error);
```


### Errors

message          | description
:----------------|:--------------------------------------------
http error       | API communication failed
invalid response | API returned unreadable data, see `err.body`
invalid params   | Client provided no or invalid parameters
no results       | No results received


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

For more information, please refer to <http://unlicense.org/>


## Author

[Franklin van de Meent](https://frankl.in)

Is this project useful to you?
[Buy me a coffee](https://ko-fi.com/franklin)
to help me stay awake while debugging.
