# React - Style

Resources:
- [CSS in JS by Vjeux](https://speakerdeck.com/vjeux/react-css-in-js)
- [CSS modules by Mark Dalgleish](https://www.youtube.com/watch?v=zR1lOuyQEt8)
- [radium](http://stack.formidable.com/radium/)
- [REACT STYLE by Andrey Popp](https://andreypopp.com/posts/2014-08-06-react-style.html)
- [Styling React Components in JavaScript](https://www.youtube.com/watch?v=0aBv8dsZs84)
- [Colin Megill - Inline Styles are About to Kill CSS](https://www.youtube.com/watch?v=NoaxsCi13yQ)
- [PostCSS](https://github.com/postcss/postcss-loader)
- [PostCSS JS](https://github.com/postcss/postcss-js)

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

  this.handleMouseEnter() {
    this.setState({
      hovered: true
    })
  }

  this.handleMouseLeave() {
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

## Radium

```js
@Radium
class Button extends React.Component {
  render() {
    let style = {
      color: 'red'
      ':hover': {
        color: 'green'
      }
    }

    return (
      <h1 style={style}>Hover Me</h1>
    )
  }
}
```
