### 2.4.0 (2018-03-16)

##### Chores

* **package:**
  *  Update minimum node to v6 ([1a87868a](https://github.com/fvdm/nodejs-searchitunes/commit/1a87868ace4117fb01449f0ff64b994ffb95761b))
  *  Update httpreq dep ([757621be](https://github.com/fvdm/nodejs-searchitunes/commit/757621befaa47e6e2a929c8d21efda84dd2dccb2))
  *  Update dotest dev dep ([cbbb9df3](https://github.com/fvdm/nodejs-searchitunes/commit/cbbb9df3ae9dea1a36a2bfdfedf327bf18025e82))
  *  Update dev deps ([53ad56b9](https://github.com/fvdm/nodejs-searchitunes/commit/53ad56b9f6595244a2370419435de4ee54f486a8))
* **develop:**  Clean up gitignore ([e5e07cac](https://github.com/fvdm/nodejs-searchitunes/commit/e5e07cac5062fde9b1268923c3331f539fe41459))
* **example:**
  *  Fix and shorten callback ([c34d8aa7](https://github.com/fvdm/nodejs-searchitunes/commit/c34d8aa75d31a2375c99fb89daefeeabf422a141))
  *  Rewrite to promises ([9d8bd694](https://github.com/fvdm/nodejs-searchitunes/commit/9d8bd6940d50b2e1a2fbec04f43effc1a34e0ac1))

##### Documentation Changes

* **readme:**
  *  Clean up ([96ec3423](https://github.com/fvdm/nodejs-searchitunes/commit/96ec342315eee76759128ac58e53052379fd19a1))
  *  Add coffee link to Author ([b188f5ea](https://github.com/fvdm/nodejs-searchitunes/commit/b188f5ea4133721c9d4f73d1f573470f087c22c0))
* **badges:**  Moved GreenKeeper ([cef2a96c](https://github.com/fvdm/nodejs-searchitunes/commit/cef2a96cee87bda2b1ff6f54198ba8663b01fbfc))

##### New Features

* **interface:**  Return promises ([b4637e63](https://github.com/fvdm/nodejs-searchitunes/commit/b4637e635377dd4b8c323f1823dd412e3329ea8a))

##### Bug Fixes

* **request:**  Parse timeout to int ([17ceab20](https://github.com/fvdm/nodejs-searchitunes/commit/17ceab20721bb5d2fcb0a546c42f6e4f2454e8e9))

##### Refactors

* **package:**  Add es6-promisify to deps ([b711a72d](https://github.com/fvdm/nodejs-searchitunes/commit/b711a72d99e5efcb7b54211a73e3a88915a1b341))

##### Code Style Changes

* **test:**  Convert to const, let, arrows ([d6cd8eec](https://github.com/fvdm/nodejs-searchitunes/commit/d6cd8eec71a40a1d629e80448d2a7ce5f73e559e))
* **syntax:**  Convert to const, let & arrows ([ad847cf3](https://github.com/fvdm/nodejs-searchitunes/commit/ad847cf3ef7aa266da39a633d7589a45ad4ac98e))
* **main:**  Cleaner comments ([db75a86e](https://github.com/fvdm/nodejs-searchitunes/commit/db75a86ec3195adfb175cfe64a6f6ba3d47e53e0))
* **comments:**  Clean up JSDoc comments ([e02e72f0](https://github.com/fvdm/nodejs-searchitunes/commit/e02e72f0be596713c37deb3145280bc2ef93a697))

##### Tests

* **main:**
  *  Fix broken script after failed promise ([859eae62](https://github.com/fvdm/nodejs-searchitunes/commit/859eae62c989541d0b99fcf2ff953e537e4ed64c))
  *  Just pass the timeout ([add96439](https://github.com/fvdm/nodejs-searchitunes/commit/add964391a033ac9ebab712393aa2b6633431534))
  *  Added tests for promises ([27bc99fb](https://github.com/fvdm/nodejs-searchitunes/commit/27bc99fb9880608445e9058c92cf6ddbfda13eb7))
* **package:**  Change dev deps to dotest ([359a8ff4](https://github.com/fvdm/nodejs-searchitunes/commit/359a8ff4d3427a89ad8c177afb9ff021bf66d702))
* **config:**
  *  Update Travis CI node versions ([543d70c5](https://github.com/fvdm/nodejs-searchitunes/commit/543d70c56f6d54866d9b4430806c8a23a0905175))
  *  Travis CI update node versions ([18b433f7](https://github.com/fvdm/nodejs-searchitunes/commit/18b433f714ccba8e256f070a358338f754c7c7e6))

#### 2.3.2 (2016-10-26)

##### Chores

* **package:**
  * Updated dev dependencies ([fbe13d78](https://github.com/fvdm/nodejs-searchitunes/commit/fbe13d782531c1fe47da66792a1227b71f8d359e))
  * Replaced test runner and dev deps by dotest ([b10a9fbf](https://github.com/fvdm/nodejs-searchitunes/commit/b10a9fbf1b2e176c645c086be178183245dc5228))
  * update eslint to version 3.0.0 ([435c7afb](https://github.com/fvdm/nodejs-searchitunes/commit/435c7afb89488c5cecb0ab3bf0662542427dac7f))
* **develop:** Added bitHound config ([d0551f3e](https://github.com/fvdm/nodejs-searchitunes/commit/d0551f3e15e9e8cac32280bccf496632937a8e17))

##### Documentation Changes

* **readme:**
  * ES6-style code example ([dc99610f](https://github.com/fvdm/nodejs-searchitunes/commit/dc99610f5a2173a6f3e55bfe98a11dc22fbc744f))
  * Fixed syntax typo ([427f5107](https://github.com/fvdm/nodejs-searchitunes/commit/427f51072ea987866b5edde8f41829bbb8723f89))
* **develop:** Added CONTRIBUTING.md doc ([65c345e2](https://github.com/fvdm/nodejs-searchitunes/commit/65c345e219ed6b1ac1388cd309b1135d488299ee))
* **badges:**
  * Added code quality status from bitHound ([db6dd064](https://github.com/fvdm/nodejs-searchitunes/commit/db6dd064127ab67222e3a446f5ac2e8edf22690a))
  * Replaced Gemnasium with bitHound deps ([435a54e0](https://github.com/fvdm/nodejs-searchitunes/commit/435a54e0a8e0f4b172603202a82a50222836c4f2))

##### Refactors

* **package:**
  * Renamed UNLICENSE file to LICENSE ([4988e80a](https://github.com/fvdm/nodejs-searchitunes/commit/4988e80a05440ed0c02c4a8017133a9588e1b0ae))
  * Minimum supported node v4.0 ([9ccb3591](https://github.com/fvdm/nodejs-searchitunes/commit/9ccb35911145b384962c205a0b206b99b2ae31f3))
* **errors:** Error handling without returns ([ac9126eb](https://github.com/fvdm/nodejs-searchitunes/commit/ac9126ebfb1be34103d93dd9df8f2f5dbbc14816))

##### Tests

* **config:**
  * Set bitHound max lines to 400 ([89e979b7](https://github.com/fvdm/nodejs-searchitunes/commit/89e979b78d25fd567bea984f78758cddceddc2e3))
  * Use dynamic node versions on Travis CI ([9f60008c](https://github.com/fvdm/nodejs-searchitunes/commit/9f60008ced5191f16db1b99263aad51becf006e4))
* **lint:** Update eslint to ES6 ([b24c9651](https://github.com/fvdm/nodejs-searchitunes/commit/b24c9651a8f44d14fdd39604db19da0582d97e03))

#### 2.3.1 (2016-6-6)

##### Refactors

* **errors:** Moved HTTP error handling to function ([5d721802](https://github.com/fvdm/nodejs-searchitunes/commit/5d721802dcef2c348d94113f4d336f02aedbb15e))

##### Tests

* **setup:** Config defaults are set by the module ([2842341f](https://github.com/fvdm/nodejs-searchitunes/commit/2842341fd4082a50183de5a5577ff060c81993be))

### 2.3.0 (2016-6-6)

##### Chores

* **readme:** Update example output, author footnote ([fda3d70c](https://github.com/fvdm/nodejs-searchitunes/commit/fda3d70c23dc44fc5f1c5e66ee7f6d155d00dee0))
* **package:** Update dependencies version ([9658ac39](https://github.com/fvdm/nodejs-searchitunes/commit/9658ac39fd07f101f7ca0a0cac5fac5854b7234f))

##### Documentation Changes

* **readme:**
  * Update links in intro text ([d30d2bc0](https://github.com/fvdm/nodejs-searchitunes/commit/d30d2bc0a8cb3d2ba162c934c86fef43872384b2))
  * Rewrite cleaner example code ([f4c80f8f](https://github.com/fvdm/nodejs-searchitunes/commit/f4c80f8f93d8bc3659affe709ea26163ddd87c51))
* **badges:**
  * Add Coveralls status ([7238e6c1](https://github.com/fvdm/nodejs-searchitunes/commit/7238e6c12ef4faa4670f54c716eadf9956d4c24f))
  * Add gemnasium dependencies status ([587d9b1b](https://github.com/fvdm/nodejs-searchitunes/commit/587d9b1bef812afeb45e5b5569baacfae918c120))
  * Add npm version for changelog ([95f8fa7c](https://github.com/fvdm/nodejs-searchitunes/commit/95f8fa7c0ec0cd691d13f027caf97685a5df0a82))

##### New Features

* **main:** Add lookup support for IDs ([a000456d](https://github.com/fvdm/nodejs-searchitunes/commit/a000456d47dbe9678757529f0b6e2ffbfeb13170))

##### Bug Fixes

* **httpResponse:** Check res before res.statusCode ([251e790a](https://github.com/fvdm/nodejs-searchitunes/commit/251e790aaad1ba78ca0bfc6dd897d6d764b4a471))
* **main:** Fixed idKeys typo isbn ([f8ac730d](https://github.com/fvdm/nodejs-searchitunes/commit/f8ac730d316ac6cfe1a601d845858215899293ff))

##### Other Changes

* **docs:** Add Lookup by ID method ([5dddd322](https://github.com/fvdm/nodejs-searchitunes/commit/5dddd322798e2044515431fe42772de99f5cb8bd))
* **undefined:** add node v6 to Travis config ([e2555c38](https://github.com/fvdm/nodejs-searchitunes/commit/e2555c38b69fb9d155a0c8c8889f5ec9ab41216f))

##### Refactors

* **package:**
  * Add test coverage and devDependencies ([737cd1a8](https://github.com/fvdm/nodejs-searchitunes/commit/737cd1a84f49768a0979d06e34301a045494f867))
  * Add .gitignore config ([61617703](https://github.com/fvdm/nodejs-searchitunes/commit/61617703c4308342112b00c35fdd924fcee38e2e))
  * A few more keywords for npm ([4a1a67fd](https://github.com/fvdm/nodejs-searchitunes/commit/4a1a67fdda474539908be92974de58bc5d4e84b4))
* **main:** Rewrite module to clean structure ([39324154](https://github.com/fvdm/nodejs-searchitunes/commit/39324154b528db88a16f6b9487b8501fdfe473f7))

##### Tests

* **main:**
  * Add http error test ([e5983e50](https://github.com/fvdm/nodejs-searchitunes/commit/e5983e501f0e5ce312ced144c0197a4980ac07bc))
  * Add Search by ID method ([bcba3f0b](https://github.com/fvdm/nodejs-searchitunes/commit/bcba3f0b5a3860a91474636074320121e18e4064))
* **config:** eslint operator-linebreak before ([b079b5d3](https://github.com/fvdm/nodejs-searchitunes/commit/b079b5d3eee24aa8c5e59cad226b41e32a5e0149))

