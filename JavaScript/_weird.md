# Javascript - Weird and Awesome


### 5 things that make Javascript WEIRD... and AWESOME
- First Class Functions
- Event-Driven Environment
- Closures
- scope
- Context


## First Class Functions

`Functions` can be passed as `arguments`, why a lot of Javascript syntax is the way it is.

```js
// Here we are only passing the callback, not calling it yet!
function add(first, second, callback) {
    // It does everything he needs to do
    console.log(first+second);
    // Then it's calls the function
    callback();
}

// Our 3rd parameter is a function
add(2,3, function() {
    console.log('done');
});
```

A function is a first class `object`, basically a `variable`
```js
function logDone() {
    console.log('done');
}
// we passing `logDone` as a `variable` which happens to contain a function
add(2,3,logDone)
```

Commonly in jQuery the `callback` is in a `if`, so it there only if we require it. Otherwise it would through an error if didn't pass a function

    callback is not a function

```js
function add(first, second, callback) {
    console.log(first+second);
    // only runs the function if a callback exists
    if (callback) {
        callback();
    }
}
```

So in jQuery when we say this, we are actually passing a `function` that `.click` won't do anything with until the `click-event` fires

```js
$('#myDiv').click(function() {
    //something awesome
});
```

A cleaner way to do our jQuery is by using named Functions

```js
function handleClick() {
    //something awesome
}

$('#myDiv').click(handleClick);
```


## Event-Driven Enrironment

Specially useful for working with `node.js`. A big advantage of JavaScript is that it works on events, white PHP script starts, runs and dies and we have to start the whole process again. JavaScript runs and stays in memory waiting for changes in events.

PHP Script Example
```
`scripts` starts
    get username
        go to database
            put html together
                spit the page
                    `script` dies
```

JavaScript is basically doing _nothing_ all we did was set up listeners and when we click it does not reload the whole thing just the lil code inside the event triggered

```js
// the first function does nothing until the document is ready
$(document).ready(function() {
    // We set up a listener which does nothing until button is clicked
    $('button').on('click', function () {
        alert('yay!');
    });
});
```

## Closures

    Closure
    to retain state and scope after executing

When we first run this code it sets up the listeners, and it's done! Only inside `.click` gets re-run but what about `var a = 1;`? JavaScript is smart enough to remember it and store it in the scope to use it later on. As long there's a reference to `var a = 1;` JavaScript will keep it in memory.

```js
// $(document).ready(function() {
//   var a = 1;
      $('button').on('click', function () {
          alert(a);
      });
// });
```

If we were to call `.off` and terminate the `listener` JavaScript would automatically bin it and `var a = 1;` from memory as it no longer needs it.

```js
// $(document).ready(function() {
//   var a = 1;
//   $('button').on('click', function () {
//      alert(a);
//   });
      $('button').off('click');
// });
```

## Scope

    scope === variable access
    context === this

Scope means variable access, when a piece of script is running what variables do I access to?

When we create `a` we are actually creating `window.a`
```js
var a = 1;

a // = 1
window.a // = 1
window.a === a // true
```

We can create child `scopes` with functions.

    If a `parents` buys cookies into his home the child automatically has access to the cookies but if a child buys cookies with it's own money the parents doesn't have access to the cookies

```js
// parent
function foo() {
  // child
  var b = 2;
}

foo();
console.log(b); // Error! b is not defined
```

If we create the same variable inside the `foo` scope it create a `Variable Conflict` which will overwrite the link to the global `window.a`
```js
var a = 1;
function foo() {
  // a becomes `2`
  var a = 2;
  // Unless we re-wire it to the global `window.a`
  console.log(a); // 2
  console.log(window.a); // 1
  // without the `var` JavaScript Will look for an existing variable
  // So it only redefines `window.a`
  // if `a` it does not exist, JavaScript will create it as a global
  a = 2;
}
foo();

console.log(a); // 2
```

### Context

```js
console.log(this); // window
this === window // true

var a = 1;
console.log(this.a); // 1
console.log(window.a); // 1
```

Even though it's inside a scope the context by default is where foo runs, in this case in `window.foo` so `this` === `window`

```js
function foo() {
  console.log(this);
}
foo(); // window
```

Because the function is inside a object now it console.logs the `obj` as `this`
```js
var obj = {
    foo: function () {
      console.log(this);
      console.log(this === obj); // true
      console.log(this === window); // false
    }
};

obj.foo();
```
### Methods of changing context

#### Call
Change the `context` in which it fires `foo`
```js
obj.foo.call(window); // this === window
// If we need to pass parameters they would go after the context
obj.foo.call(window, 1,2,3); // this === window
```

#### Apply
Pretty much the same only it only takes 2 values the `context` and a array of `parameters`
```js
obj.foo.apply(window, [1,2,3]); // this === window
```

#### Bind
Works differently, it doesn't actually execute the function, it return a `bound function`
```js
var myBoundFoo = obj.foo.bind(window);
myBoundFoo(); // this === window
obj.foo(); // this === obj
```

In JavaScript when we setup a event listener on the `DOM` it will run with the context of that `DOM element`

```js
$('body').on('click', obj.foo); // this === <body></body>
```

Here we want to increment all `li` but we only want to increment one at the time, not all at once!

```xml
<ul>
    <li>Clicked <span>0<span> </li>
    <li>Clicked <span>0<span> </li>
    <li>Clicked <span>0<span> </li>
</ul>

```
```js
$('li').on('click', function() {
  // var currentTimes = parseInt( $('li span').html() );
  var currentTimes = parseInt( $(this).find('span').html() );
  $(this).find('span').html(currentTimes+1);
})
```

Common Problem using `this`. Lest say we wanted to create a button which toggles a div to show up, simple enough
```js
$('#opendiv').on('click', function() {
  $(this).toggleClass("active");
  $('#div1').slideToggle();
});
```

now lest say we only want the button to turn `.active` once the animation has finished
```js
$('#opendiv').on('click', function() {
  // So now we have change slideToggle to include a callback
  $('#div1').slideToggle(300, function() {
      // and then we toggle it to active
      // !PROBLEM IS, THIS === #DIV1 !
      $(this).toggleClass("active");
  });
});
```

We can fix it by creating a variable within the `#opendiv` scoop pointing to `this` ( some people use `_this` `_self` `opendiv`), use `#opendiv` it self
```js
$('#opendiv').on('click', function() {
  var self = this;
  $('#div1').slideToggle(300, function() {

      $(self).toggleClass("active");
  });
});
```
Or better yet use bind to always run it within the `#opendiv` scope. A disadvantage is that we can no longer access `this` within `#div1` scope to select itself

```js
$('#opendiv').on('click', function() {
  $('#div1').slideToggle(300, function() {
      $(this).toggleClass("active");
  }.bind(this));
});
```
