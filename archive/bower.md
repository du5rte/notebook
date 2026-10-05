# Bower

- Package Manager
- Installing
- Using Bower
- bower list
- Dependencies
- bower uninstall
- Package Version
- bower init


## Package Manager
Stop us from having to download javascript and css files yourselfs! Bower is an extremely useful package manager for web development that not only does the downloading for you, it allows for quick and easy install of all dependencies at once and gives you a method for sharing those dependencies with others.

## Installing
First we require node and npm and install bower globally
```sh
$ npm install -g bower
```

## Using Bower
Bower download the lastest version of the package in `bower_components`
```sh
# Initiates a bower.json file
$ bower init
# Downloads all dependencies
$ bower install
# Will download jquery
$ bower install jquery
# Will download jquery and save to bower.json file as a dependency
# --save or -S
$ bower install jquery --save
# GitHub shorthand
$ bower install desandro/masonry
# Git endpoint
$ bower install git://github.com/user/package.git
# URL
$ bower install http://example.com/script.js
```

## bower list
Will check for new versions and print out the list of packages
```
└── jquery#2.1.4 extraneous
```
```sh
# Lists it's dependencies
$ bower list
# Logs the paths for our package list main files
# example jquery: 'bower_components/jquery/dist/jquery.js'
$ bower list --paths
```
## Dependencies
If a package has a dependency of another package bower will download it as well
```sh
# e.g. backbone.js requires underscore.js
$ bower install backbone
```

## bower uninstall
Uninstalls packages, deleting them from the folder
```sh
# use --save to also removes it from the `bower.json` file
$ bower uninstall jquery --save
```

## Package Version
We can install older versions, if the version no longer exist will print out available versions
```sh
$ bower install jquery#1.11.3
```
```json
{
	"name": "test_bower",
	"version": "0.0.0",
	"authors": [
		"Eddie Monteiro <monteirocode@gmail.com>"
	],
	"license": "MIT",
	"ignore": [
		"**/.*",
		"node_modules",
		"bower_components",
		"test",
		"tests"
	],
	"dependencies": {
		"backbone": "~1.1.2",
		"jquery": "1.11.3"
	}
}
```
