## JavaScript - TypeScript

Resources:
- [TypeScript Interactive Playground](http://www.typescriptlang.org/Playground)
- [Why TypeScript is Hot Now](http://blog.teamtreehouse.com/typescript-hot-now-looking-forward)
- [TypeScript tooling for greater productivity](https://www.youtube.com/watch?v=yy4c0hzNXKw)

## TypeScript
Is a ECMAScript 6 wrapper with **optional typing**, each helps us do understand better the code we write and produce less errors

## Static vs Optional Languages

#### Statically Typed Languages

Java
```java
String name = "Andrew";
```
C#
```cs
string name = "Andrew";
```
Objective-C
```objc
NSString name = "Andrew";
```

#### Optionally Typed Languages

TypeScript
```java
// optional!
var name: string = "Andrew";
// we can write instead
var name = "Andrew";
```

## Types
The main advantage of defining `types` is so later on we know what to pass on them, holding `cmd` will show more information about a type

sendEmail `function` expects a `contact` Object but new developers could pass the wrong type of value
```js
function sendEmail(contact) {
  console.log(`${contact.name} <${contact.email}>`)
}

sendEmail('Josh') // Error
```

Here typescript will advise to use an object
```ts
function sendEmail(contact: Object) {
  console.log(`${contact.name} <${contact.email}>`)
}

sendEmail({name: 'Josh', email: 'josh@gmail.com'})
```


## Interfaces
A way do describe how Objects should be created, often we can pass the wrong `key` or `method`

```ts
interface Emailable {
    name: string,
    email: string
}

function sendEmail(contact: Emailable) {
  console.log(`${contact.name} <${contact.email}>`)
}

sendEmail({firstName: 'Josh', emailAddress: 'josh@gmail.com'}) // Error
```

Now typescript describes the type of value `sendEmail()` expects and how the object should be constructed
```ts
interface Emailable {
    name: string,
    email: string
}

function sendEmail(contact: Emailable) {
  console.log(`${contact.name} <${contact.email}>`)
}

sendEmail({name: "Josh", email: "josh@gmail.com"});
```

## Implements <!-- TODO: not sure what's it for... -->

```ts
class Company implements Emailable {
    name: string
    email: string
    constructor(companyName: string, emailAddress: string) {
        this.name = companyName
        this.email = emailAddress
    }
}

var treehouse = new Company("Treehouse", "support@teamtreehouse.com")

sendEmail(treehouse)
```


## Public <!-- TODO: not really sure how it works -->

```ts
class Song {
    title: string
    constructor(title: string) {
        this.title = title
    }
}
```

```ts
class Song {
    constructor(
        public title: string,
        public artist: string,
        public duration: string,
        public isPlaying: boolean = false
    ) {

    }
}
```


## References
In case difference files are loaded in sequence in the browser, typescript can still be referenced

```html
<script src="song.js"></script>
<script src="playlist.js"></script>
```

`song.ts` can be reference in `playlist.ts`

```ts
/// <reference path="song.ts" />

class Playlist {
    songs: Song[]
    nowPlayingIndex: number
    constructor() {
        this.songs = []
        this.nowPlayingIndex = 0
    }
}
```


## Type Definitions
Typescript provides some built in references, and developers create some for popular frameworks, e.g. `node`, `jQuery`, `angular` ...etc

```ts
class Playlist {
  /* ... */

  renderInElement(list: HTMLElement) {
      list.innerHTML = ""
      for(var i = 0; i < this.songs.length; i++) {
          list.innerHTML += this.songs[i].toHTML()
      }
  }
}

playlist.renderInElement(document.getElementById("playlist"))
```
