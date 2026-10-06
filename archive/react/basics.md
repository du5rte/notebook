---
title: "React - Basics"
type: doc
created: 2016-03-18
updated: 2016-04-11
tags: [react]
---
# React - Basics

Still-valid fundamentals moved to [[docs/react/basics|React - Basics]].

Resources:
- [Getting Started with React](https://thinkster.io/getting-started-with-react)
- [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
- [React JS Tutorials LearnCode Academy](https://www.youtube.com/playlist?list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b)
- [React with Typescript](http://blog.mgechev.com/2015/07/05/using-jsx-react-with-typescript/)


```sh
$ npm install --save react react-dom
```

## Components
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

```jsx
var React = require('react')

var Hello = Reach.createClass({
  render: function() {
    return <div>Hello, World!</div>
  }
})
```

## Rendering
To render to the `DOM` first pass component we want to render then where we want it to render to

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
