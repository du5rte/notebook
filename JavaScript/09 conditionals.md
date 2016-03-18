# JavaScript - Conditionals


## Conditional Statements
Blocks of code that run if the `condition` is `true`

```js
if(true) {
  console.log('Nothing can travel faster than light.'); // true
}
```

## If
Conditionally runs code only if the statement inside it's parentheses `(  )` is `true` or `thruthy`.

```js
if(false) {
  console.log('tupac is alive!'); // the truth will never come out
}
```

## Else If
Conditionally runs code if the conditional statements before it failed and if statement is `true` or `thruthy`.

```js
if(false) {
  console.log('tupac is alive!'); // the truth will never come out
} else if (null) {
  console.log('what about biggie?') // we don't know ..
}
```

## Else
Works as a backup if everything else fails.

```js
if(false) {
  console.log('Tupac is alive!'); // the truth will never come out
} else if (null) {
  console.log('Who killed JFK?') // we don't know ..
} else if (undefined) {
  console.log('Illuminati is real!') // does not exist!
} else {
  console.log('Science if the only truth!');
}
```

## Shorthand
`?` equals to `if` and `:` equals to `else`
[JavaScript Shorthand Coding Techniques - sitepoint](http://www.sitepoint.com/shorthand-javascript-techniques/)

```js
(condition) ? (true action) : (false action)
```

```js
function checkFriends(friends) {
  console.log('You have ' + friends + ((friends === 1) ? ' friend.'  : (friends === 1) ? 'no' : ' friends.'));
};

checkFriends(0); // 'You have no friends.'
checkFriends(1); // 'You have 1 friend.'
checkFriends(3); // 'You have 3 friends.'
```

## Switch
A cleaner way to define actions based on multiple conditions

```js
function counter(state = 0, action) {
  if(action.type === 'INCREMENT') {
    return state + 1
  } else if (action.type === 'DECREMENT') {
    return state - 1
  } else {
    return state
  }
}
```
```js
function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}
```
