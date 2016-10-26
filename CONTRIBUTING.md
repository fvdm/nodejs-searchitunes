Development
-----------

### Clone sourcecode:

```bash
git clone https://github.com/fvdm/nodejs-searchitunes
cd nodejs-searchitunes
```

### Branches

The `master` branch is always exactly the same as the
package release on npm.

While the `develop` branch is where development happens
towards the next release.

When you intent to submit a PR always base your work on
the `develop` branch and then work from a new branch.


```bash
git checkout develop
git checkout -b mycode
npm install
```


### Pull Requests

When you intent to submit a PR, please follow these instructions:


#### Code

* Stick to the code style.
* Run `npm test` to make sure it all works.
* JSdoc the functions.


```js
/**
 * Hello world - JSdoc example
 *
 * @callback callback
 * @param message {string} - Some awesome message
 * @param [amount] {number=2} - Optional argument with default
 * @param [config] {object} - Configuration
 * @param [config.prop=5] - Property
 * @param callback {function} - Callback function
 * @return void
 */

function hello (message, amount, config, callback) {
  // ...
}
```


#### Commits

* Try to describe the change in less than 50 characters.
* Commit more often with small edits instead of one commit with mixed bugfixes or new features.
* Submit a new PR for each patch and new feature.
* Do not include the `node_modules` directory or any log files.
* English only.
* Tag any related Github issue IDs in the commit message, i.e. `Added coolFeature() #123`
* All commits should be prefixed:
  * `Feat(methods)`: New method added
  * `Feat(config)`: New config params added
  * `Refactor(interface)`: Breaking changes to the interface
  * `Refactor(main)`: Production changes to main code
  * `Refactor(errors)`: Production changes to error handling
  * `Refactor(package)`: Production changes to the npm package
  * `Fix(main)`: Bug fixes to main code
  * `Fix(errors)`: Bug fixes to error handling
  * `Fix(package)`: Bug fixed to the npm package
  * `Docs(readme)`: Changes to README.md
  * `Docs(badges)`: Changed status badges in README.md
  * `Docs(contributing)`: Changes to CONTRIBUTING.md
  * `Chore(package)`: Non-production changes to the npm package, updated (dev) dependencies
  * `Chore(develop)`: Updated dev and editor files like `.gitignore`
  * `Chore(main)`: Non-production changes to the main code, like descriptive comments
  * `Style(lint)`: Code-style changes and fixes, like semicolons
  * `Test(main)`: Changes to `test.js`
  * `Test(config)`: Changes to `.eslintrc`, `.bithoundrc`, `.travis.yml` and similar


### Semantic versioning:

> **Warning:** Do not update the `package.json` version on your own.
> Only the package maintainer must do that.

The package version must follow this format: **major.minor.patch**

* **major** are breaking changes to the interface and package
* **minor** are new features, new configs to the interface
* **patch** are bugfixes, security patches, chores, docs, other changes

Changes to Test scripts, development files, etc. should not bump the version.
