# JavaScript Strings


## Strings
Stores text format (text, words, sentences, etc). Wrapping in quotes lets JavaScript know it's just text, in single quotes `' '`, double quotes `" "` or in ES6, backsticks for templating.
```js
var message = ("Hello Dave");
var message = ('Hello John');
// ES6
var message = (`Hello Steve`);
```


## Quotes
When using quotes within quotes we need to alternate `''` and `""` or use backslashes `\` to escape.

wrong examples
```js
// wrong!
// 'She's a great person!'
```
right examples
```js
"She's a great person!"
'She\'s a great person!'
'<h1 class="special">Important Headline</h1>'
"<h1 class=\"special\">Important Headline</h1>"
```

## Concatenation
Combining strings with a `+` operator

```js
var name = "Dave";
var greet = "Hello " + name; // Hello, Dave
// Incrementing variables
greet = greet + ', how are you?'; // Hello, Dave, how are you?
// Incrementing shortand
greet += ', how are you?'; // Hello, Dave, how are you?

```

## String Properties
Strings have properties, e.g. `length` of a string, access objects properties using a dot `string.Property`
```js
var string = 'some value'; // 11 characters string
string.length // 11
```

## String Methods
Strings also have methods, e.g. `toLowerCase()` actions the object can perform

```js
var string = 'Example';
string.toLowerCase()  // 'example'
string.toUpperCase()  // 'EXAMPLE'
```

## Template Strings
In ES6 backsticks allow to do `interpolation` and `breaks` without backslash escapes.

```js
/*
Hi, my name is Thomas
and I like to
PARTY!
*/
```
```js
var name = 'Thomas';
var hobby = 'party';
var greet = 'Hi, my name is ' + name +
            '\n and I like to \n' +
            hobby.toUpperCase() + '!';
```
```js
let name = 'Thomas'
let hobby = 'party'
let greet = `Hi, my name is ${name}
and I like to
${hobby.toUpperCase()}!`
```

`dedent`, might be a coming in the future, multiline strings that don't break indentation.
```js
console.log(dedent `hello ${name},
                    how are you ${time}?`);
```

## Template Strings
Modify it's output by tagging a `function`

```js
function titleCase(strings) {
  return strings
    .join()
    .replace(/\b\w/g, match => match.toUpperCase())
}

titleCase`javascript is awesome` // Javascript Is Awesome
```
