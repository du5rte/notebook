---
title: "React - Redux"
type: doc
created: 2016-03-18
updated: 2016-06-18
tags: [react]
---
# React - Redux

Fundamentals kept from [[archive/react/redux|React - Redux (2016)]].

## Redux
The three main principles of redux are:

- Single source of truth
- State is read-only
- Changes are only made with pure functions

States are wrapped in a single object called the `store` **the tree of truth**, which is read only, the only way to change states is to use a store `dispatch` which rewrite a whole new state tree enforcing Immutability and that data only flows one way.

## Reducer
A pure function with a switch case that returns a new copy of state. It should always return `state` by default

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

## Store
Wraps the `reducer` in a store, which provides three methods `getState`, `dispatch` and `subscribe`

redux also provides methods to `combine` reducers and apply `middleware`

#### Get state
Get the current state from the store
```js
store.getState() // {counter: 0}
```

#### Dispatch
Dispatches an action to the store reducer
```js
store.dispatch({type: 'INCREMENT'}) // {counter: 1}
```

#### Subscribe
Registers a callback that trigger every time there's a change, every time `dispatch` is called
```js
store.subscribe(() => {
  // ...
})
```

## Actions
A representation of a dispatcher

```js
function increment(payload) {
  return {
    type: 'INCREMENT', // required
    // payLoad: {} // optional
  }
}
```

## React Redux
Provides easier ways to connect our store and actions with `Provider` and `connect`

## Related
- [[docs/react/basics|React - Basics]]
- [[docs/javascript/functions|JavaScript Functions]]
