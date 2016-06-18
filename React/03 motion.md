# React - Motion

Resources:
- [react-motion](https://github.com/chenglou/react-motion)
- [A gentle introduction to React Motion](https://medium.com/@nashvail/a-gentle-introduction-to-react-motion-dc50dd9f2459#.1i5d7ph7g)

Single spring Animation
```js
import { Motion, spring, presets } from 'react-motion'

function SingleSpringAnimation(props) {
  const motionProps = {
    // the initial state of the spring
    defaultStyle: {
      x: 0
    },
    // the final state of the spring
    style: {
      // it can be as single as
      // x: spring(1)
      // change with the state
      // x: this.state.ready ? spring(1) : 0
      // or be customized
      // x: spring(1, {stiffness: 14, damping: 3})
      // or use a preset
      x: spring(1, presets.wobbly)

    }
  }

  return (
    <Motion {...motionProps}>
      {
        // will rerender at each instance of the spring
        ({ x }) => <p style={{transform: `scale(${x})`}}>Single Spring: {x}</p>
      }
    </Motion>
  )
}
```

Staggered Springs Animation
```js
import { StaggeredMotion, spring } from 'react-motion'

function MultipleSpringsAnimation(props) {
  let stringNumbers = ['One', 'Two', 'Three']

  const motionProps = {
    defaultStyles: stringNumbers.map((child, i) => ({
      x: 0
    })),
    styles: prevInterpolatedStyles => prevInterpolatedStyles.map((child, i) => {
      // the first item starts the spring
      if (i === 0) {
        return {x: spring(1)}
      // the others follow the previous one
      } else {
        let { x } = prevInterpolatedStyles[i - 1]
        return {x: spring(x)}
      }
      // or for short
      // return i === 0 ? {x: spring(1)} : {x: spring(prevInterpolatedStyles[i - 1].x)}
    })
  }

  return (
    <StaggeredMotion {...motionProps}>
      {(interpolatingStyles) =>
        <ul>
          {
            // either the items or the styles need to be interpolated
            // stringNumbers.map((number, i) =>
            //   <li>Item {number} {interpolatingStyles[i].x}</li>
            // )
            // or
            interpolatingStyles.map(({ x }, i) =>
              <li style={{transform: `scale(${x})`}}>Item {stringNumbers[i]} {x}</li>
            )
          }
        </ul>
      }
    </StaggeredMotion>
  )
}
```
