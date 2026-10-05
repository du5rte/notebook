## JavaScript - JSON



## JSON
*JavaScript Object Notation* is the most common used way to transfer information between browsers, servers, databases and other online services. JSON is a string that's formatted LIKE JavaScript, but isn't actual JavaScript code.

## Format
Property names and strings must be double `""` quoted, It can be formatted as a `Array` notation or as a `Object` notation and it's commonly used both.

#### Array Notation
```json
["string", 3, true, false, [1, 2, 3] ]
```

#### Object Notation
```json
{
  "name" : "Jim",
  "phone" : "503-555-1212"
}
```

#### Array Object Notation
```json
[
  {
    "name": "Aime",
    "inoffice": false
  },
  {
    "name": "Ben",
    "inoffice": true
  }
]
```

## Parse
Json is returned as a string so it need to be parse into `JavaScript` like data it can use.

```js
var data = JSON.parse(result)
```
