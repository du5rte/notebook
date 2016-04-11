# React - Basics

Resources:
- [Getting Started with React](https://thinkster.io/getting-started-with-react)
- [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
- [React JS Tutorials LearnCode Academy](https://www.youtube.com/playlist?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)
- [React with Typescript](http://blog.mgechev.com/2015/07/05/using-jsx-react-with-typescript/)


```sh
$ npm install --save react react-dom
```

## Components
Every Component in react is a Virtual DOM `element`, to create a component we need to create a `React Component`, the most simple component that can be created is with the `render` method.

Because React uses a `virtual DOM` we can't simply return a string.
```js
var React = require('react')

var Hello = Reach.createClass({
  // WILL NOT WORK
  render: function() {
    return (
      // Won't work
      // '<div>Hello, haters</div>'
      // Will work
      React.createElement('div', null, 'Hello World!')
    )
  }
})
```

## JSX
But it looks really ugly, so facebook invented `jsx`, which uses a transformer to compile `html` like syntax to javascript with `return`

```jsx
var React = require('react')

var Hello = Reach.createClass({
  render: function() {
    return <div>Hello, World!</div>
  }
})
```

## ES6
And with the with new `es6` syntax `class` we can just extend on `React.Component`

```jsx
import React from 'react'

class Hello extends React.Component {
  render() {
    return <div>Hello, World!</div>
  }
}
```
or
```jsx
import React, { Component } from 'react'

class Hello extends Component {
  render() {
    return <div>Hello, World!</div>
  }
}
```

## Rendering
The rending engine `ReactDOM` comes separated from `react`, To render to the `DOM` first pass component we want to render then where we want it to render to

```jsx
import * as React from 'react'
import * as ReactDOM from 'react-dom'


class Hello extends React.Component {
  render() {
    return <div>Hello World!</div>
  }
}

ReactDOM.render(<Hello />, document.body)
```

## Rending Variables
React is a big believer in vanilla javascript, anything inside curly brackets `{ }` is evaluated as plain JavaScript

```
<div> Example {1 + 2} </div>
<div> Example {(function() { return 3 })()} </div>
<div> Example {/* comment line */} </div>
```
```jsx
class Hello extends React.Component {
  render() {
    var name = 'Dude'

    return  <div> {name} </div>
  }
}
```

## Rending Logic
Logic can be rendered direcly on the `render` method but it's a bad pratice and with `classes` we have a lot of other options.

```jsx
class Hero extends React.Component {
  constructor() {
    // we need to pass super
    super()
    this.greeting = 'Hello'
  }

  getName(name) {
    return name
  }

  isActive() {
    if(true) {
      return 'active'
    } else {
      return 'disabled'
    }
  }

  render() {
    return (
      <div className={ this.isActive() }>
        {this.greeting} { this.name('Dude') }!
      </div>
    )
  }

}
```

## Multiple Components
Components can be nested inside other components using self closing `< />` elements and the class name `<Name />`

```jsx
class Child extends React.Component {
  render() {
    return <span>Bill Junior</span>
  }
})

class Parent extends React.Component {
  render() {
    return <p>Bill Senior is <Child />'s dad<p>
  }
}
```

Components can be reused multiple times
```jsx
class Parent extends React.Component {
  render() {
    return (
      <div>
        <Child />
        <Child />
        <Child />
      </div>
      )
  }
}
```

Components can be returns as an `array`
```jsx
class Parent extends React.Component {
  render() {
    return (
      <div>
        { <Child />, <Child />, <Child /> }
      </div>
      )
  }
}
```

## Properties
Using `props` we can pass data between components

```jsx
class Child extends React.Component {
  render() {
    return <li>Hi, my name is {this.props.name}</li>
  }
}

class Siblings extends React.Component {
  render() {
    return (
      <ul>
        <Child name="John" />
        <Child name="Dave" />
        <Child name="Lewis" />
      </ul>
    )
  }
}
```

## Iterating
Each child in an array or iterator should have a unique `key` prop

```jsx
class Siblings extends React.Component {
  render() {
    var names = ['John', 'Dave', 'Lewis']

    return (
      <ul>
        {
          names.map((name, index) => {
            return <Child key={index} name={name} />
          })
        }
      </ul>
    )
  }
}
```

## State
States are used to change properties within the component scope, each time `setState` is used react renders the component.

```jsx
class Parent extends React.Component {
  constructor() {
    super();
    // Set initial state
    this.state = {paternity: 'may be'};
  }

  findOut() {
    let dnaResults = Math.round(Math.random()) ? 'is' : 'is not'
    this.setState({paternity: dnaResults})
  }

  render() {

    return (
      <div>
        <p>Bill Senior {this.state.paternity} the father of <Child />.</p>
        <button onClick={findOut} >Find Out the Results</button>
      </div>
    )
  }
}
```
