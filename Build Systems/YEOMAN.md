# YEOMAN - Basics

Creates a scafolding of our webapp

## Installing

```sh
$ npm install -g yo
```

## Using

```sh
$ yo
```
```sh
Duartes-iMac:testyo monteiro$ yo
? 'Allo Duarte! What would you like to do? (Use arrow keys)
  Run a generator
❯ Generator
  Gulp Webapp
  ──────────────
  Update your generators
  Install a generator
  Find some help
  Get me out of here!
```



## Creating a Generator
- [yeoman.io](http://yeoman.io/authoring/)
- [stephenplusplus](http://stephenplusplus.github.io/yeoman.io/generators.html)
- [tuts+](https://code.tutsplus.com/tutorials/build-your-own-yeoman-generator--cms-20040)
- [tuts+ class](http://code.tutsplus.com/courses/create-a-custom-yeoman-generator)
- [tagtree](http://tagtree.tv/yeoman-generator)
- [youtube](https://www.youtube.com/watch?v=1OAfGm_cI6Y)

```sh
$ npm install -g yo generator-generator
$ yo generator
$ npm link
```

## Prompts


## Dependencies

```js
generators.Base.extend({
  installingLodash: function() {
    this.npmInstall(['lodash'], { 'saveDev': true });
  }
}):
```

This is equivalent to call:
```sh
npm install lodash --save-dev
```
