# GraphQL - GraphiQL


## GraphiQL
Is the interface to test `graphlQL` with automatic documentation and auto complete. Queries are resolved asynchronously.

## Fields
are like `keys` in JSON

```graphiql
# query is optional
query {
  # Fields
  # are like keys in JSON
  posts {
    title
    summary

    # fields can contain nested fields
    comments(limit: 1) {
      content
    }
  }

  # a query can contain multiple fields resolved asynchronously
  authors {
    name
  }

  # fields can be assigned to custom keys variables
  authors: getOnlyFamousAuthors {
    name
  }


}
```

## Arguments
some queries might use arguments to do queries like fetching only the first 10 posts

```
{
  recentPosts(first: 5) {
    title
  }
}
```

## Query Variables

```
query getFewPosts($postCount: Int!) {
  recentPosts(count: $postCount) {
    title
  }
}
```
```
{
  "postCount": 2
}
```

## Fragments
Useful when multiple fields are the same fields

```
{
  arunoda: author(_id: "arunoda") {
    _id,
    name,
    twitterHandle
  },
  pahan: author(_id: "pahan") {
    _id,
    name,
    twitterHandle
  },
  indi: author(_id: "indi") {
    _id,
    name,
    twitterHandle
  }
}
```

```
fragment authorInfo on Author {
  _id,
  name,
  twitterHandle
}

query {
  arunoda: author(_id: "arunoda") {
    ...authorInfo
  },
  pahan: author(_id: "pahan") {
    ...authorInfo
  },
  indi: author(_id: "indi") {
    ...authorInfo
  }
}
```

## Mutations
Mutation are use to change, add or modify data. arguments with an exclamation mark `String!` are `required`. unlike queries, mutations are executed `synchronously` on a sequence. Otherwise, it's hard to detect errors like adding the same author again and again.

```
mutation {
  createAuthor( id: "john", name: "John Carter", twitterHandle: "@john") {
    id,
    name
  }
}
```
