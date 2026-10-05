# npm
Node(no longer just node) Package Manager

resources:
- [npm](http://npmjs.com/)
- [How to Use npm as a Build Tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)
- [Publishing npm packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)
- [Running scripts with npm](http://www.jayway.com/2014/03/28/running-scripts-with-npm/)
- [task automation with npm run](http://substack.net/task_automation_with_npm_run)
- [https://www.npmjs.com/package/ttab](https://www.npmjs.com/package/ttab)

# CLI

```sh
# shows all commands available
$ npm
# to Initializing a package.json
$ npm init
```

## Installing Packages

```sh
# install all dependencies in package.json
$ npm install
# install
$ npm install mocha
# install and save as dependency
$ npm install --save mocha
$ npm i -S mocha
# install and save as development dependency
$ npm install --save-dev mocha
$ npm i -D mocha
# install only production dependencies
NODE_ENV=production npm install mocha
# installing different versions or beta versions
$ npm i angular@1.5.0-beta.1
$ npm i gulpjs/gulp.git#4.0
# installing for production (not Devdepencies)
$ npm production
```

## Global Packages
Some packages can be useful to install globably some we can access them from any location - [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)

```sh
$ npm install -g http-server
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

## Commands
We can create custom npm scripts to run in `package.json`

```json
{
  "scripts": {
    "test": "mocha"
  }
}
```
```sh
$ npm test
```
To chain scripts use `&&` to run in sequence or `&` to run in parallel [task automation with npm run](http://substack.net/task_automation_with_npm_run)
```json
{
  "scripts": {
    "custom": "gulp && mocha && node server.js"
  }
}
```
npm supports some scripts (e.g. `start`, `install`, 'preinstall') but custom scripts need to be called with `run`
```sh
$ npm run custom-script
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
