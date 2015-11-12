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





	```jade
	// STYLES
	style
	  //- include file
	  style: include:sass styles/manifest.sass

	  //- import file
	  style
	    :sass
	      @import front/styles/manifest.sass
	      body
	        +center

	// SCRIPTS
	script
	  //- Coffee
	  :coffee-script
	    square = (x) -> x * x
	    square 4

	  //- Uglify
	  :uglify-js
	    function qwe(asd,zxc) {
	      return asd + zxc;
	    }
	    qwe(32,43);
	```


```jade
// variables
- var n = 1
// iteration
while n <= 3
  fieldset
    input(
			// attributes
      type="checkbox"
			// interpolation
      id="check#{n}"
      name="check#{n}"
			// conditionals
			checked = n === 1 || n === 5 ? true : false
			disabled = n === 6 || n === 5 ? true : false
    )
    label(for="radio#{n}") Option #{n}
    - n++
```
```html
<fieldset>
  <input type="checkbox" id="check1" name="check1" checked="checked"/>
  <label for="radio1">Option 1</label>
</fieldset>
<fieldset>
  <input type="checkbox" id="check2" name="check2"/>
  <label for="radio2">Option 2</label>
</fieldset>
<fieldset>
  <input type="checkbox" id="check3" name="check3" disabled="disabled"/>
  <label for="radio3">Option 3</label>
</fieldset>
```
