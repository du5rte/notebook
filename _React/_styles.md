# React - Styles

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
<button style={ {backgroundColor: 'blue'} }>
  Hello
</button>
```

## Radium

```js
@Radium export default class Button extends React.Component {
  get styles() {
    return {
      fontSize: '32px',
      color: 'blue'
      ':hover': {
        color: 'red'
      }
    }
  }

  render() {
    return <h1 style={this.styles}>Hello, {this.who}</h1>
  }
}
```
