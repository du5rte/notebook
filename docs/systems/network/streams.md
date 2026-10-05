# Networking - Streams


## Streams
Node.js has a handy interface for shuffling data around called streams. With streams:
- we can compose streaming abstractions
- we can operate on data chunk by chunk

Lets us pick apart chunk by chunk instead of dealing with the whole object at once (e.g. large video files)

we can pipe abstraction together with stream using `.pipe()`
```js
fs.createReadStream('mobydick.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(reaplce(/\s+/g, '\n'))
  .pipe(filter(/whale/i))
  pipe(linecount(console.log))
```

## Chunk by Chunk
With streams, we can operate on data chunk by chunk, without buffering everything into memory.

This means we can write programs that operate on very large files or lazily evaluate network data as it arrives

It also means we can have hundreds or thousands of concurrent streams without using much memory.

```js
const fs = require('fs')

fs.createReadStream('greetz.txt')
  .pipe(process.stdout)
```

```js
const fs = require('fs')

fs.createReadStream(process.argv[2])
  .pipe(process.stdout)
```
streams the content of the file to the console
```sh
$ node print.js print.js
```

## Stream Transform

You can chain `.pipe()` calls together just like the `|` operator in bash:

```js
const fs = require('fs')

// first part is read the stream
fs.createReadStream(process.argv[2])
  // anything in between
  .pipe(toUpper())
  // final destination
  .pipe(process.stdout)
```

```js
// const through = require('through2')
// 
// function toUpper() {
//   return through((buf, enc, next) => {
//     next(null, buf.toString().toUpperCase())
//   })
// }

const { Transform } = require('stream')

function toUpper() {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase());
    }
  });
}
```

Because streams handle data in a standard way it can handle various inputs the same way, doesn't have to be a file read

Here we use `process.stdin` to repat back in uppercase what we write to the console.

```js
const fs = require('fs')
const { Transform } = require('stream')

process.stdin
  .pipe(toUpper())
  .pipe(process.stdout)

function toUpper() {
  return new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase())
    }
  })
}
```

## Concat-Stream
Buffers up all the data in the stream.
```
npm install concat-stream
```

You can only write to a `concat-stream`, You can't read from a `concat-stream`. Keep in mind that all the data will be in memory.

Now if we write to the console then hit `CTRL` + `D` it will log the data length.
```js
const concat = require('concat-stream')

process.stdin
  .pipe(concat((body) => {
    console.log(body.length)
  }))
```

