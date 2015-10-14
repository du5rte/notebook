////  JavaScript - Module Pattern ////
  //
  //



//// Global Name Space
  // When working with bigger scale project we will work with a lot of libaries
  // (e.g. jquery, angular) and can lead to variables name colliding
  function foo() {
    console.log('foobar');
  }
  foo();


//// Self Executing Annonymous function
  // When we wrap the function saying we're saying 'treat this whole thing as an
  // expression which is evaluated immediately and does not necessarily require
  // naming or assignment.
  //// Now foo no longer exists in the Global Variable Scope
  (function() {
    function foo() {
        console.log('foobar');
    }
    foo();
  }());
  // A more Elegant Way to do this is by adding an '!' or '+' before
  !function() {
    function foo() {
      console.log('foobar');
    }
    foo();
  }();


//// Importing modules
  // We module pattern we can import other globals to be used within the module
  // but with the reference, locally within the module. (e.g. underscore)
  //// Renaming the variable makes it obvious that you are doing something
  //// different or special with this variable in your module
  //// There's also a slight performance benefit, because the variable is now
  //// referenced in the local scope, the interpreter does not have to crawl
  //// through the global scope looking for it
  !function(underscore) {
    underscore.someawesomemethod = "yaay!!!";
    console.log(underscore.VERSION);
  }(_);
  // _.someawesomemethod "yayy!!!"


//// Module Export Pattern
  // Keeps the code from cluttering the global namespace and you want to share
  // allows us to share information with different parts of your application
  var awesomeNewModule = (function(){
    var exports = {
      foo: 5,
      bar: 10
    };

    exports.helloMars = function() {
      console.log("Hello Mars!");
    };

    exports.goodbye = function() {
      console.log("Goodbye!");
    };

    return exports
  }());
  // Now it can be accessed by the awesomeNewModule object
  awesomeNewModule.foo; // 5
  awesomeNewModule.helloMars(); // Hello Mars!


//// Loose Augmentation
  // Rarely for large projects, we'll have all our code in one file. At first,
  // it is easy enough to split your code into different files and then smash
  // them together in a specific order.
  //// Using loose augmentation take advantage of JavaScript's
  //// asynchronous runtime environment
  var awesomeNewModule = (function(exports){
    var exports = {
      foo: 5,
      bar: 10
    };
    exports.helloMars = function() {
      console.log("Hello Mars!");
    };
    exports.goodbye = function() {
      console.log("Goodbye!");
    };
    return exports
  // If awesomeNewModule exists import it, otherswise it's simply an object
  }( awesomeNewModule || {} ));
  // Now all of exports values will be assigned to awesomeNewModule
  // if it's the first file or it will be assigned to awesomeNewModule
  // ! repeated variables names will be overwriten


//// SubModule Pattern
  // Allows us to namespace your application even further. Good module and sub
  // module naming can structure our app into super logical and readable bits
  //// Simply and '.sub' or desired '.name'
  var awesomeNewModule.sub = (function(exports){
    var exports = {
      foo: 5,
      bar: 10
    };
    exports.helloMars = function() {
      console.log("Hello Mars!");
    };
    exports.goodbye = function() {
      console.log("Goodbye!");
    };
    return exports
  // If awesomeNewModule exists import it, otherswise it's simply an object
}( awesomeNewModule.sub || {} ));
