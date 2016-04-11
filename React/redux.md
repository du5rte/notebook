# React - Redux

Resources:
- [Redux](http://redux.js.org)
- [Kurt Weiberth React + Redux + Webpack](https://www.youtube.com/watch?v=fZKaq623y38&list=PLQDnxXqV213JJFtDaG0aE9vqvp6Wm7nBg)
- [redux-promise](https://github.com/acdlite/redux-promise)
- [redux-saga](https://github.com/yelouafi/redux-saga)

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

```js
import { createStore } from 'redux'

store = createStore(counter)
```

redux also provides methods to `combine` reducers and apply `middleware`
```js
import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import logger from 'redux-logger'

const store = createStore(
  combineReducers({ counter, todo }),
  applyMiddleware(thunk, promise, logger())
)
```

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
function someAction(payload) {
  return {
    type: 'SOME_VALUE', // required
    payLoad: {} // optional
  }
}
```

## Basic Example

```js
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

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

// create the state store
let store = createStore(counter)

function Counter() {
  return (
    <div>
      <h1>{store.getState()}</h1>
      <button onClick={ function() {store.dispatch({type: 'INCREMENT'})} }>-</button>
      <button onClick={ function() {store.dispatch({type: 'DECREMENT'})} }>-</button>
    </div>
  )
}

function render() {
  ReactDOM.render(<Counter />, document.getElementById('root'))
}

// subscribe the render function
store.subscribe(render)

render()
```

## React Redux
Provides easier ways to connect our store and actions with `Provider` and `connect`


```js
function Counter(props) {
  console.log(props)
  return (
    <div>
      <h1>{props.counter}</h1>
      <button onClick={()=> {props.actions.decrement()} }>-</button>
      <button onClick={()=> {props.actions.increment()} }>+</button>
    </div>
  )
}

// connects the whole store to props
function mapStateToProps(state) {
  return state
}
// or only the state branch we want
function mapStateToProps(state) {
  return {
    counter: state.counter
  }
}

// wraps actions as store.dispatch(action)
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

// var Counter = connect(mapStateToProps, mapDispatchToProps)(Counter)

// or make sure actions are wrapped in bindActionCreators

// import { bindActionCreators } from 'redux'

const actionsCreator = {
  actions: bindActionCreators({
    increment: function() { ... },
    decrement: function() { ... }
  }, store.dispatch)
}

var Counter = connect(store => store, dispatch => actionsCreator)(Counter)

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
```
