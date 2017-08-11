# Regex - Basics

Resources:
- [Regxr](http://regexr.com/)
- [Regular Expressions Tuts+](http://code.tutsplus.com/tutorials/8-regular-expressions-you-should-know--net-6149)
- [js regexp](http://www.w3schools.com/js/js_regexp.asp)


## Regular Expression
Is a way to searching or matching text in a `string`, it takes a `subject string` and a `regex` expression.

To validated this number in JavaScript
```
"407-555-1212"
```

It would start to look something like
```js
if( (chars[0] == 4 && chars[1] == 0 && chars[2] == 7)) {
  /* and this is just for the first 3 digits */
}
```

With Regular expressions
```js
var chars = "407-555-1212"

chars.match(/407/) // true
chars.match(/321/) // false
chars.match(/407|321/) // false
```

## Regex
Uses a specific group of characters to match a pattern, the pattern start after the  first slash `/` and ends with the last slash `/`

```js
chars.match(/boat|ship/) // boat or ship
```



```
ar
arrr
arrrrrr
```
selects `ar` and any `r`'s after it
```
/ar+/
```

## Character Sets
Using square brackets `[ ]` creates a range, e.g. `[a-z]` from `a` to `z`

```
smitty
jameson
Blackbeard
CapitanHook
JohnThe3rd
```
They all have alphabet letters but writing `/a|b|c|d|e|f ... /` would be very inefficient instead a `character set` can be used `/[a-z]/`, it only works with one character at the time but using `+` it matches any words, still any `lowercase` characters are ignore, here we can add another character set `/[a-zA-Z]+/` or `/[a-z]+/i` which ignores case. finally numerical characters also can be added `/[a-z0-9]+/i` or `/\w+/` wich is the same as `/[a-zA-Z0-9]+` so the `/i` can be dropped
```
/\w+/
```

## White Space

using a simple ` ` white space `/Capitan Hook/` is bad practice as it might be missed, instead `/s` is a better practice `/Capitan\sHook/` it selects all `spaces`, `tabs` or `new lines`.


## Wild Card
`.` is a wild card, it matches any characters except newline, `\.` will match the literak `.` character.

`/$3\.99`

```
name@example.com
name@example!com
name@example.co.uk
```
`\w@\w`

`\w+@\w+.\w+`
`\w+@\w+.\w+`

characters with special meaning can be spaced with a blackslash `\` beforehand
`\w+@\w+\.\w+`

select the email or just `com`, `net` or `org` not the full email
`\w+@\w+\.\w+|com|net|org/i`

parentheses group expression
`\w+@\w+\.\w+(com|net|org)/i`

something else after it is selected
`\^\w+@\w+\.(com|org|net)$\i

## Anchors
`^` strt looking at the beginning of the subject, stop looking at the end of the subject

`/^learnbydoing$/`


```
http://www.twitter.com/codeschool
http://www.twitter.com/puralsight
```

`http:\/\/\www\.twitter\.com\/\w+`


```
battle axe
splitting axe
pickaxe
```

`(battle\s|splitting\s|pick)axe`

## Boundary Metacharacter

`\b`

splits words
`\b\w+\b/g`

## Optinal operator

```js
ok Okay okayy sure unsure oki doki yes y hay
```

`\bok(ay)?\b`


`\b(ok(a+y+)?|sure|y(es)?|hay)\b`

`http(s)?:\/\/(www\.)?twitter\.(com|org)`

## not

all number
`\d+`

anything that's not a number
`[^\d]+`

Capitalizing `\W` or `\D` matches the opposite of it
`\D`

`[^/d]+`
`\D+`
`[^0-9]`
`[^0123456789]`


selects all words without vocals
\b[^aeiouy\s]+\b

only two letters
`[a-z]{2}`

minium letters 1 max letters 3
`[a-z]{1,3}`

minium letters 10
`[a-z]{10,}`

only exclamation marks attached to a word
`\b\!{3,10}`


`/i`
`/g` global
`/m` multiline


```
Alabama
Florida
Maine
Maryland
New Jersey
North Carolina
Ohio
Oklahoma
Oregon
Pennsylvania
Rhode Island
South Dakota
West Virginia
Wyoming
```
only states with two names
```
^(new|north|south|west|rhode)?\s?\w+$
```


`\learn((by)doing)` return learnbydoing bydoing by

```
gold metal golden wood gold plastic metal stone rubber gold
```
captures all gold word on their own
`\b(gold)\b`



```
1 Reindeer Lane, North Pole, AK 99705
120 East 4th Street, Juneau, AK 99705
```

`\^\d+\s[\w\s]+\w{4,6},\s[\w\s]+,\s\w{2}\s\d{5}$\igm`

```js
var querier = /^(\d+)\s([\w\s]+\w{4,6}),\s([\w\s]+),\s(\w{2}\s\d{5})$/igm

a.split(querier).map(v => console.log(v))
```

non capturing group

(?:)

ignore the protocol
`/(?:http|ftp)://([^/\r\n]+)(/[^\r\n]*)?/`


## HTML

if we try to input number it will prompt `Please match the required format`
```
<form>
  <input type="text" pattern="w" required/>
</form>
```
