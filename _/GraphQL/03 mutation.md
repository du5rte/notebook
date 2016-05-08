

## Mutation


```
mutation {
  createAuthor(
    _id: "john",
    name: "John Carter",
    twitterHandle: "@john"
  ) {
    _id,
    name
  }
}
```

fields with an exclamation mark `String!` are `required`

mutations are executed as a sequence. Otherwise, it's hard to detect errors like adding the same author again and again.
