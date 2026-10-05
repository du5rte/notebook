# React - Relay

Resources:
- [React with Relay and GraphQL with Andrew Smith](https://www.youtube.com/watch?v=Cfna8gwt9h8)
- [Auth0 - Getting Started with Relay](https://auth0.com/blog/2015/10/06/getting-started-with-relay/)
https://github.com/mhart/simple-relay-starter
https://medium.com/@clayallsopp/relay-101-building-a-hacker-news-client-bb8b2bdc76e6#.lbt00qiqu
https://gist.github.com/miracle2k/f39aaaccbc0d287b2ddb


## Relay
Is the glue between react and `graphQL`

GraphiQL
```
fragment greeting on Root {
  hello(name: "World")
}


query {
	test {
    ...greeting
  }
}
```


## Setup
Validates GraphQL schemas while developing

`.babelrc`
```js
{
  "presets": [
    "react",
    "es2015",
    "stage-0"
  ],
  "plugins": [
    "transform-runtime",
    "transform-decorators-legacy",
    "./babelRelayPlugin"
  ],
  "env": {
    "development": {
      "presets": ["react-hmre"]
    }
  }
}
```

`babelRelayPlugin.js`
```js
// `babel-relay-plugin` returns a function for creating plugin instances
const getBabelRelayPlugin = require('babel-relay-plugin');

// load previously saved schema data (see "Schema JSON" below)
const schemaJSON = require('../graphql-test/data/schema.json').data;

// create a plugin instance
module.exports = getBabelRelayPlugin(schemaJSON);
```


## Container

```js

class Hello extends React.Component {
  render() {
    return <h1>{this.props.greeting.hello}</h1>;
  }
}

let HelloContainer = Relay.createContainer(Hello, {
  fragments: {
    greeting: () => Relay.QL`
      fragment on Root {
        hello(name: "World")
      }
    `
  }
})
```

with `ES7` decorators
```js
export function relayContainer(fragments) {
  return function decorator(Component) {
    return Relay.createContainer(Component, {
      fragments
    })
  }
}
```
```js
@relayContainer({
  fragments: {
    greeting: () => Relay.QL`
      fragment on Test {
        hello(name: "World")
      }
    `
  }
})
class Hello extends React.Component {
  render() {
    return <h1>{this.props.greeting.hello}</h1>;
  }
}
```

## Route

```js
class HelloRoute extends Relay.Route {
  static routeName = 'HelloRoute'
  static queries = {
    greeting: (Component) => Relay.QL`
      query {
        test {
          ${Component.getFragment('greeting')},
        },
      }
    `,
  }
}

ReactDOM.render(
  <Relay.RootContainer
    Component={HelloContainer}
    route={new HelloRoute()}
  />,
  mountNode
)
```

with `ES7` decorators
```js
export function relayRoot(rootConfig) {
  return function decorator(Component) {
    return function(props) {
      // accepts either and `object` of a `function(props)`
      let rootPropsConfig = typeof rootConfig === 'function' ? rootConfig(props) : rootConfig

      let rootProps = {
        Component,
        ...rootPropsConfig
      }

      return <Relay.RootContainer { ...rootProps } />
    }
  }
}
```
```js
@relayRoot({
  route: {
    name: 'HelloRoute',
    params: {},
    queries: {
      greeting: (Component) => Relay.QL`
        query {
          test {
            ${Component.getFragment('greeting')},
          },
        }
      `,
    },
  }
})
@relayContainer({
  fragments: {
    greeting: () => Relay.QL`
      fragment on Test {
        hello(name: "World")
      }
    `
  }
})
class Hello extends React.Component {
  render() {
    return <h1>{this.props.greeting.hello}</h1>;
  }
}

ReactDOM.render(
  <Hello />,
  mountNode
)
```
