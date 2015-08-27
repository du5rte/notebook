# npm

resources
  - [npm website](https://www.npmjs.com)
  - [How to Use npm as a Build Tool](http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/)


## Fixing npm permissions

    $ sudo chown -R monteiro /usr/local/lib/node_modules
    $ sudo chown -R monteiro /usr/local/bin
    $ sudo chown -R monteiro /usr/local/share

## Publish

[Publishing npm packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)

```sh
$ npm publish
```

## Version
If publish the same version npm will throw an error

```sh
# version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease]
$ npm version patch
$ npm publish
```
