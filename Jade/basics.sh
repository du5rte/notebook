### Jade - Basics ###
	# 
	# 


### Templating Language
	# Allows us to write clean, minimal html

### Document
	# http://jade-lang.com/reference/attributes/

### Installing
	# Originally packaged as as node module
	$ npm install jade --global

### Command Line Interface
	# Originally packaged as as node module
	$ jade --help

### Using
	# $ jade [options] [dir|file ...]
	# Converts a jade file to HTML file
	$ jade index.jade
	# compile pretty html
	$ jade -P index.jade
	# watch files for changes and automatically re-render
	$ jade -P -w index.jade