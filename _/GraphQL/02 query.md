# GraphQL - Query


## Fields

```
{
  latestPost {
    title
    summary
  }
}
```

## Arguments

```
{
  recentPosts(count: 5) {
    title
  }
}
```

## Nested Fields

```
{
  recentPosts(count: 2) {
    title,
    comments(limit: 1) {
      content
    }
  }
}
```


## Multiple fields

```
{
  latestPost {
    title
  },

  authors {
    name
  }
}
```

## Assigning Variables

```
{
  authorNames: authors {
    name
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
