---
title: "Node - Streams"
aliases: ["Node.js - Streams"]
type: doc
created: 2018-06-18
updated: 2026-10-07
tags: [node]
---
# Node - Streams

A stream moves data piece by piece instead of all at once. Think of drinking through a straw versus waiting for someone to pour the whole jug into your mouth. With streams you start working on the first chunk as soon as it arrives, and a 4 GB video never has to sit in memory. You've already used them: an HTTP request, an HTTP response, `process.stdin` and `process.stdout` are all streams.

## Four kinds of stream

| Kind | Data flows | Examples |
|---|---|---|
| Readable | out of it | `fs.createReadStream`, an incoming `req`, `process.stdin` |
| Writable | into it | `fs.createWriteStream`, the outgoing `res`, `process.stdout` |
| Duplex | both ways | a network socket |
| Transform | in, changed, out | gzip, encryption, "uppercase everything" |

Under the hood they're all [[docs/node/node-events|EventEmitters]]: a readable fires `'data'` for each chunk and `'end'` when it's finished.

## Reading chunk by chunk

The easiest way to read a stream is `for await`. Each chunk is a `Buffer` (raw bytes) unless you set an encoding.

```js
import { createReadStream } from 'node:fs'

const file = createReadStream('menu.txt', { encoding: 'utf8' })

for await (const chunk of file) {
  console.log('got', chunk.length, 'characters')
}
// got 65536 characters
// got 65536 characters
// got 1024 characters
```

## A response is a stream too

A writable stays open until you call `.end()`. That means a server can send part of a page now and the rest later.

```js
import http from 'node:http'

http.createServer((req, res) => {
  res.write('Order received...\n')
  setTimeout(() => res.end('Your coffee is ready ☕\n'), 3000)
}).listen(3000)
```

```sh
curl localhost:3000
# Order received...
# (three seconds later)
# Your coffee is ready ☕
```

## pipeline: connecting streams

Connecting a readable to a writable is the most common thing you'll do. Use `pipeline` from `node:stream/promises`. It moves the data, handles back-pressure (pausing a fast reader when the writer can't keep up), cleans up, and rejects if any step fails.

Copying a file:

```js
import { createReadStream, createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'

await pipeline(
  createReadStream('readme.md'),
  createWriteStream('readme-copy.md'),
)
```

It works like `|` in the shell (see [[docs/linux/linux-pipe|Shell - Pipes and Redirection]]): add as many steps in the middle as you like.

```js
import { createGzip } from 'node:zlib'

await pipeline(
  createReadStream('orders.csv'),
  createGzip(),
  createWriteStream('orders.csv.gz'),
)
```

## pipe vs pipeline

You'll see `.pipe()` in older code and tutorials.

```js
// ❌ an error in any step is not passed on, and streams can leak
createReadStream('a.txt').pipe(createWriteStream('b.txt'))

// ✅ errors reject the promise, and everything is closed
await pipeline(createReadStream('a.txt'), createWriteStream('b.txt'))
```

`.pipe()` is fine for a quick experiment. In real code, use `pipeline`.

## Writing a transform

A transform takes chunks in and pushes changed chunks out. Here's one that shouts:

```js
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'

const toUpper = () =>
  new Transform({
    transform(chunk, encoding, callback) {
      callback(null, chunk.toString().toUpperCase())
    },
  })

await pipeline(process.stdin, toUpper(), process.stdout)
```

```sh
echo 'one flat white please' | node shout.js
# ONE FLAT WHITE PLEASE
```

Because streams share one interface, the same transform works on a file, a network request or the keyboard.

## Uploading a file

`req` is a readable, so a server can stream an upload straight to disk. The whole file is never in memory at once.

```js
import http from 'node:http'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream/promises'

http.createServer(async (req, res) => {
  try {
    await pipeline(req, createWriteStream('upload.bin'))
    res.end('uploaded!\n')
  } catch {
    res.statusCode = 500
    res.end('upload failed\n')
  }
}).listen(3000)
```

```sh
curl --upload-file photo.jpg localhost:3000   # uploaded!
```

## Tracking progress

To report progress, count bytes as they pass through. The `Content-Length` header tells us the total.

```js
http.createServer(async (req, res) => {
  const total = Number(req.headers['content-length'])
  let received = 0

  req.on('data', (chunk) => {
    received += chunk.length
    res.write(`progress: ${Math.floor((received / total) * 100)}%\n`)
  })

  await pipeline(req, createWriteStream('upload.bin'))
  res.end('done\n')
}).listen(3000)
```

```sh
curl --upload-file photo.jpg localhost:3000
# progress: 3%
# progress: 12%
# ...
# done
```

## Collecting a whole stream

Sometimes you do want everything, for example a small JSON body. `node:stream/consumers` reads a stream to the end for you. Only do this when you know the data is small.

```js
import { json, text } from 'node:stream/consumers'

const order = await json(req)          // parse a request body
const input = await text(process.stdin) // everything typed until Ctrl + D
```

## Common mistakes

- **Reading a big file with `readFile`.** It loads the whole thing into memory. For large files, stream it.
- **Using `.pipe()` and no error handling.** A failed read leaves the writer open. Use `pipeline`.
- **Forgetting chunks are Buffers.** Call `.toString()` or set `encoding: 'utf8'` when you want text.
- **Assuming one chunk is one line.** Chunks are cut by size, not meaning. Use `node:readline` to read line by line.

## Try it

1. Write `cat.js` that streams the file named in `process.argv[2]` to `process.stdout`.
2. Gzip a file with `pipeline` and `createGzip`, then check the new file is smaller.
3. Write a transform that replaces every `coffee` with `☕` and run text through it from `stdin`.

## Related
- [[docs/node/node-events|Node - Events]]
- [[docs/node/node-http|Node - HTTP]]
- [[docs/node/node-process|Node - Process]]
- [[docs/linux/linux-pipe|Shell - Pipes and Redirection]]
