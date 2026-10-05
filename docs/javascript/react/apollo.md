# React - Apollo Client

Resources:
- [A look at Relay and Apollo](https://medium.com/front-end-developers/a-look-at-relay-and-apollo-96fcb215e1d#.jzct16bbl)
- [Appolo on Medium](https://medium.com/apollo-stack)
- [Apollo - Deep-dive into Meteor's future stack with GraphQL, Relay and Galaxy](https://transmission.simplecast.fm/7)

```js
import ApolloClient, { createNetworkInterface } from 'apollo-client'
import gql from 'apollo-client/gql'

const client = new ApolloClient({
  networkInterface: createNetworkInterface('http://localhost:4000'),
})

client.query({
  query: gql`
    query {
      hello
    }
  `
}).then(({ errors, data }) => {
  console.log('got data', data)
})
```

```js
import React from 'react'
import Relay from 'react-relay'

import { connect } from 'react-apollo'
import gql from 'apollo-client/gql'

function mapQueriesToProps({ ownProps, state }) {
  return {
    hello: {
      query: gql`
        query {
          hello
        }
      `
    }
  }
}

@connect({
  mapQueriesToProps
})
export default class Hello extends React.Component {
  render() {
    console.log(this.props)

    let hello = this.props.hello.loading ? 'loading...' : this.props.hello.hello

    return (
      <h1>{hello}</h1>
    )
  }
}

```
