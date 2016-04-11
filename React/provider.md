
Resouces:
- [react-redux-provide](https://github.com/loggur/react-redux-provide)
- [React, Automatic Redux Providers, and Replicators](https://medium.com/@timbur/react-automatic-redux-providers-and-replicators-c4e35a39f1#.474tzbonj)

## Providers
Reduces a lot of the boilerplate around of using `react-redux` each provider contains it's own `reducer`, `actions` and automated generated `store` and `initialState`


in `providers/counter.js`
```js
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import logger from 'redux-logger'

// REDUCERS

export const reducers = {
  count(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1
      case 'DECREMENT':
        return state - 1
      default:
        return state
    }
  }
}

// ACTIONS

export const actions = {
  increment() {
    return {type: 'INCREMENT'}
  },
  incrementAsync() {
    return (dispatch) => {
      setTimeout(() => {
        return dispatch({type: 'INCREMENT'})
      }, 2000)
    }
  },
  decrement() {
    return {type: 'DECREMENT'}
  }
}

// EXPORTER

export default {
  actions,
  reducers,
  middleware: [thunk, promise, logger()]
}

// no need for store or actionCreator
// provider does that for us
```

in `providers/index.js`
```js
import counter from './counter'
import another from './another'

// PROVIDERS

// supports multiple entries
// each with their own store, reducers and actions

export const providers = {
  counter,
  another
}
```

in `app.jsx`
```js
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import provide from 'react-redux-provide';
import providers from './providers';

// provider decorator allows to pull props from context

@provide export default class Counter extends Component {
  static propTypes = {
    count: PropTypes.number.isRequired,
    increment: PropTypes.func.isRequired,
    decrement: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div>
        <h1>{this.props.count}</h1>
        <button onClick={()=> {this.props.decrement()} }>-</button>
        <button onClick={()=> {this.props.increment()} }>+</button>
      </div>
    )
  }
}

// The top Component needs to be decorated with provider

@provide export default class App extends Component {
  render() {
    return (
      <Counter />
    )
  }
}

const context = {
  providers: {
    counter: counterProvider
  },
  /* initial state (optional) */
  providedState: {
    appName: 'Some App'
    count: 0
  }
}

ReactDOM.render(<App {...context} />, document.getElementById('root'))

// or more simply
// ReactDOM.render(<App {...providers} />, document.getElementById('root'))
// or
// ReactDOM.render(<App providers={providers} />, document.getElementById('root'))
```
