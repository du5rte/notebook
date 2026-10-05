# npm
Node(no longer just node) Package Manager

resources:
- [npm](http://npmjs.com/)
- [How to Use npm as a Build Tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
- [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)
- [Publishing npm packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)


## Creating a package.json
Create a package.json file in the current directory, this is used to save a registry of the packages our project uses

```sh
$ npm init
```

## Installing Packages
Running `npm install`  will install all dependencies found in the local `package.json` file

```sh
$ npm install
# install only "dependencies"
$ NODE_ENV=production npm install
$ npm install --production
```

Installing individual packages
```sh
# install mocha
$ npm install mocha
# install and save as "dependencies"
$ npm install --save mocha
$ npm i -S mocha
# install and save as "devDependencies"
$ npm install --save-dev mocha
$ npm i -D mocha
```

Which can then be required using `require` or in ES6 `import` in our project

```js
var mocha = require('mocha')
// or in es6
import mocha from 'mocha'
```


## Global Packages
Some packages can be useful to install globally some we can access them from any location in our console but can't be required in our project

```sh
$ npm install -g mocha
```

Packages are installed in `node_modules` each module can have it's own node_modules in `npm 3` all dependencies are installed in the top folder.

## Updating

```sh
# Check for outdated packages
$ npm outdated
# Updates local packages
$ npm update
```

## Semantic Versioning

Is a guideline for package versions
```
MAJOR.MINOR.PATCH
```

- `MAJOR` means API's that worked before might not work now
- `MINOR` means there was been significate upgrades
- `PATCH` means there's only been small bugs fixed

```json
"dependencies": {
  "jquery": "^2.1.4",
}
```

- `^` installs up to the latest `MINOR`, can install `2.2` but not `3.0`
- `~` installs up to the latest `PATCH`, can install `2.1.5` but not `2.2.0`


## Sharing Packages
Before sharing a package with `git` is wise to create a `.gitignore` for files and folders we want to ignore.

`.gitignore` example:
```
node_modules/
.DS_Store
config/database.yml
```

## Scripts
Custom commands can be stores within `package.json`, [How npm handles the "scripts" field](https://docs.npmjs.com/misc/scripts)

```json
{
  "scripts": {
    "test": "mocha",
    "start" "node app.js"
  }
}
```
```sh
$ npm test # $ mocha
$ npm start # $ node app.js
```


## Publish
To share a package on [npm](http://npmjs.com/)

[Publishing npm packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)

```sh
$ npm publish
# the version needs to be bumped before publishing again
$ npm version 1.2.4
# or use major, minor, patch, etc.
$ npm version patch
# then publish
$ npm publish
```
