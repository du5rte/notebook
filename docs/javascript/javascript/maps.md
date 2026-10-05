# JavaScript - Maps

# Resources


## Maps
Are a `key`/`value` structure. Any value may be used as either a key or a value, and objects are not converted to strings

```js
let user1 = { name: 'John'}
let user2 = { name: 'Smith'}

let totalReplies = {}

totalReplies[user1] = 5
totalReplies[user2] = 42

console.log(totalReplies) // {"[object Object]":42}
```

uses `get()` and `set()` to access values in maps
```js
let totalReplies = new Map()

totalReplies.set( user1, 5 )
totalReplies.set( user2, 42 )

console.log(totalReplies) // [[{"name":"John"},5],[{"name":"Smith"},42]]
console.log(totalReplies.get(user1)) // 5
```


examples
```js
// let recentPosts = {}
let recentPosts = new Map()

createPost(newPost, (data) => {
  // recentPosts[data.author] = data.title
  // Keys unknown until runtime so... Maps!
  recentPosts.set( data.author, data.message )
})

socket.on('new post', (data) => {
  recentPosts.set( data.author, data.message )
})
```


looping maps

```js

let mapSettings = new Map()

mapSettings.set("user", "Sam")
mapSettings.set("topic", "ES2015")
mapSettings.set("replies", ["Can't wait!", "So Cool"])

for(let [key, value] of mapSettings) {
  console.log(`${key} = ${value}`)
}

```

.get()
.has()
.delete()


## Weak Maps
A more memory efficient type of `Map` that only stores objects and cannot be iterable, `strings`, `numbers` and `booleans` are not allowed.


```JS
let user = {}
let comment = {}

let mapSettings = new WeakMap()

mapSettings.set(user, "user")
mapSettings.set(user, "comment")

console.log( mapSettings.get(user) ) // "comment"

mapSettings.set("title", "ES2015") // Invalid value used as weak map key
```

## Set
Work much like arrays but only store unique values of any type, they are iterable and can also be deconstructed

```js
let tags = new Set()

tags.add('JavaScript')
tags.add('Programming')
tags.add({version: 2015})
tags.add('Programming') // ignored

console.log(tags.size) // 3

for (let tag of tags) {
  console.log(tag)
}

let [a,b,c] = tags

console.log(a,b,c)
```

## WeakSet
A more memory efficient type of Set that only stores objects and cannot be iterable

```js
let weakTag = new WeakSet()
```


example if we wanted to toggled a class of `isRead` on a forum post, traditionally we would have to modify the original post.

```js
let post { ... }

postList.addEventListener('click', (e) => {
  // mutating the post object
  post.isRead = true
})

// ... rendering list of post
for(let post of postArray) {
  // check mutation
  if(!post.isRead) {
    __addNewPostClass(post.element)
  }
}
```

```js
let readPosts = new WeakSet()

postList.addEventListener('click', (e) => {
  // adds post to list of readPosts
  readPosts.add(post)
})

// ... rendering list of post
for(let post of postArray) {
  // checks if post if in readPosts list
  if(!readPosts.has(post)) {
    __addNewPostClass(post.element)
  }
}
```
