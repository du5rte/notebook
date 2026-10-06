---
title: "React - Style"
type: doc
created: 2016-06-18
updated: 2016-06-18
tags: [react]
---
# React - Style

Still-valid fundamentals moved to [[docs/react/basics|React - Basics]].

Resources:
- [CSS in JS by Vjeux](https://speakerdeck.com/vjeux/react-css-in-js)
- [CSS modules by Mark Dalgleish](https://www.youtube.com/watch?v=zR1lOuyQEt8)
- [radium](http://stack.formidable.com/radium/)
- [REACT STYLE by Andrey Popp](https://andreypopp.com/posts/2014-08-06-react-style.html)
- [Styling React Components in JavaScript](https://www.youtube.com/watch?v=0aBv8dsZs84)
- [Colin Megill - Inline Styles are About to Kill CSS](https://www.youtube.com/watch?v=NoaxsCi13yQ)
- [PostCSS](https://github.com/postcss/postcss-loader)
- [PostCSS JS](https://github.com/postcss/postcss-js)

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
