---
title: "JavaScript - TypeScript"
type: doc
created: 2015-11-12
updated: 2016-03-18
tags: [typescript]
---
# JavaScript - TypeScript

Still-valid fundamentals moved to [[docs/javascript/typescript|JavaScript - TypeScript]].

Resources:
- [TypeScript Interactive Playground](http://www.typescriptlang.org/Playground)
- [Why TypeScript is Hot Now](http://blog.teamtreehouse.com/typescript-hot-now-looking-forward)
- [TypeScript tooling for greater productivity](https://www.youtube.com/watch?v=yy4c0hzNXKw)

## TypeScript
Is a ECMAScript 6 wrapper with **optional typing**, each helps us do understand better the code we write and produce less errors

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
