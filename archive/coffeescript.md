# CoffeeScript

## Installing
First we need `node` and `npm`
```
$ npm install -g coffee-script
```

## What makes a Programming Language Beautiful?
- Least amount of code to solve problems
- Readable and Understandable
- Easy to Maintain

## What is CoffeeScript?
Is a JavaScript compiler. We write `CoffeeScript` and it compiles to plain `JavaScript`
```coffee
message = "Ready for some Coffee?"
alert(message)
```
```js
var message;
message = "Ready for some Coffee?";
alert(message);
```
## Rules?
- No Variable declarations `var`,
- No Named Functions declarations `function`
- No semicolons `;`
- `1 tab` or `2 spaces` indent for nesting (needs to be consistant)
- `functions` will always have a `return`

## Functions
CoffeeScript only uses Function Expressions

Named Functions
```js
function coffee() {
  return confirm("Ready for some Coffee?")
}
coffee();
```

Function Expressions
```js
var coffee = function() {
  return confirm("Ready for some Coffee?")
}
coffee();
```

### Creating Functions
`->` convertes to `function() {}` and using

```coffee
coffee = ->
  confirm "Ready for some Coffee?"
```

### Returning a String
```coffee
coffee = ->
  answer = confirm "Ready for some Coffee?"
  "Your answer is " + answer
```

We can write the same thing better with interpolator
```coffee
coffee = ()->
  answer = confirm "Ready for some Coffee?"
  "Your answer is #{answer}"
```
or
```coffee
coffee = (message)->
  "Your answer is #{message}"
```
Another Example
```coffee
# alert both arguments, separated by a single white space.
greet = (message, message2) ->
  alert "#{message} #{message2}"
  # return alert("" + message + " " + message2);
```

### Calling a function
Parentheses are optional, but it's good practice to use parentheses on everything but the outermost call
```js
coffee("Yo") // Parentheses are optional
coffee "Yo"
coffee("Yo", 2)
coffee "Yo", 2
alert coffee("Yo", 2) // outermost call `alert`
```

### Optional Parameters
Allows us to have a starter default value in our function

```coffee
coffee = (message="Ready for some Coffee?")->
  "Your answer is #{message}"
```
compile into a `if` `null`
```js
coffee = function(message) {
  if (message == null) {
    message = "Ready for some Coffee?";
  }
  return "Your answer is " + message;
};
```
