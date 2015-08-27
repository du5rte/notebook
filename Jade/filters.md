


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
