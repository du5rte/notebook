# GraphQL - Schema

Resources:
- [sitepoint graphql with mongodb](http://www.sitepoint.com/creating-graphql-server-nodejs-mongodb/)



## Schema


```js
import {
  // These are the basic GraphQL types
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLEnumType,

  // This is used to create required fileds and arguments
  GraphQLNonNull,

  // This is the class we need to create the schema
  GraphQLSchema,
} from 'graphql'
```






```js
export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'MySchema',
    description: "Root of My Schema",
    fields: () => ({

      echo: {
        type: GraphQLString,
        description: "Echo what you enter",
        args: {
          message: {
            type: GraphQLString,
            description: "Give me a message"
          }
        },
        resolve: function(root, {message}) {
          return `Received ${message}`
        }
      }

    })
  })
})
```
