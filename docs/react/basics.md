---
title: "React - Basics"
type: doc
created: 2016-03-18
updated: 2016-04-11
tags: [react]
---
# React - Basics

Fundamentals kept from [[archive/react/basics|React - Basics (2016)]], [[archive/react/style|React - Style (2016)]] and [[archive/react/react-native|React Native (2017)]].

## Components
Every Component in react is a Virtual DOM `element`, to create a component we need to create a `React Component`, the most simple component that can be created is with the `render` method.

Because React uses a `virtual DOM` we can't simply return a string.

## JSX
But it looks really ugly, so facebook invented `jsx`, which uses a transformer to compile `html` like syntax to javascript with `return`

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
The rendering engine `ReactDOM` comes separated from `react`.

## Rendering Variables
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

## Rendering Logic
Logic can be rendered directly on the `render` method but it's a bad practice and with `classes` we have a lot of other options.

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
        {this.greeting} { this.getName('Dude') }!
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
}

class Parent extends React.Component {
  render() {
    return <p>Bill Senior is <Child />'s dad</p>
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
        { [<Child />, <Child />, <Child />] }
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
        <button onClick={this.findOut.bind(this)} >Find Out the Results</button>
      </div>
    )
  }
}
```

## Styles

```js
function Button(props) {
  return (
    <button style={{color: 'blue'}}>
      Hello
    </button>
  )
}
```

## Dynamic Styles

```js
class Button extends React.Component {
  constructor() {
    super()
    this.state = {
      hovered: false
    }
  }

  handleMouseEnter() {
    this.setState({
      hovered: true
    })
  }

  handleMouseLeave() {
    this.setState({
      hovered: false
    })
  }

  render() {
    let style = {
      color: this.state.hovered ? 'green' : 'red'
    }

    return (
      <h1
        style={style}
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
      >Hover Me</h1>
    )
  }
}
```

## React Native Primitives
Instead of `div` we have `View`, `p` as `Text`, `img` as `Image`.

```js
import { View, Text, StyleSheet } from 'react-native';
```

## Related
- [[docs/react/redux|React - Redux]]
- [[docs/javascript/object-oriented|JavaScript - Classes]]
- [[docs/dom/basics|DOM - Basics]]
- [[docs/css/modular|CSS - Modular CSS]]
