---
title: "Relay"
type: doc
created: 2016-06-18
updated: 2016-06-18
tags: [react, graphql]
---
# Relay

## React - Relay

Resources:
- [React with Relay and GraphQL with Andrew Smith](https://www.youtube.com/watch?v=Cfna8gwt9h8)
- [Auth0 - Getting Started with Relay](https://auth0.com/blog/2015/10/06/getting-started-with-relay/)
https://github.com/mhart/simple-relay-starter
https://medium.com/@clayallsopp/relay-101-building-a-hacker-news-client-bb8b2bdc76e6#.lbt00qiqu
https://gist.github.com/miracle2k/f39aaaccbc0d287b2ddb


### Relay
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


### Setup
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


### Container

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

### Route

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

## GraphQL - Relay

Resources:
- [relay-mongodb-connection](https://github.com/mikberg/relay-mongodb-connection)
- [graphql-relay-js](https://github.com/graphql/graphql-relay-js)
- [A look at Relay and Apollo](https://medium.com/front-end-developers/a-look-at-relay-and-apollo-96fcb215e1d#.jzct16bbl)
- [Facebook, Relay and GraphQL, Give it 5 days](http://red-badger.com/blog/2015/08/28/give-it-5-days-facebook-relay-and-graphql/)

### Node Edge Pattern

```js
import {
  connectionDefinitions,
  connectionArgs,
  connectionFromArray
} from 'graphql-relay'

import connectionFromMongoCursor from 'relay-mongodb-connection'

var { connectionType: CustomersConnection } = connectionDefinitions({
  nodeType: CustomerType
})

var customers = {
  // adds the edge node pattern along with cursor and pageInfo
  type: CustomersConnection,
  // adds query parameters (first, last, after amd before)
  args: connectionArgs,
  async resolve(root, args, ctx, info) {
    args.first = args.first || 100
    // automatically skips and limits the MongoDB Cursor
    // so that only the necessary documents are retrieved from the database.
    let customers = await connectionFromMongoCursor(
      db.collection('bank_data').find({})
      , args
    )

    return customers
  }
}
```

```graphiql
{
  store {
    customers(first: 2) {
      edges {
        node {
          _id
          first_name
          last_name
        }
      }
    }
  }
}
```
