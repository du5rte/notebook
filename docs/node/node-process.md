---
title: "Node - Process"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: [Process, Node - CLI]
tags: [node]
---
# Node - Process

Every time you run `node app.js`, the operating system starts a **process**: a running program with its own memory, its own arguments and environment, and three channels for input and output. Node hands all of that to us through the global `process` object. This is how you write scripts and command-line tools: read what the user typed, print results, exit with the right code, and run other programs.

## Arguments: process.argv

`process.argv` is an array of everything on the command line. The first two items are the path to `node` and the path to your script, so the user's arguments start at index 2.

```js
// greet.js
console.log(process.argv)
```

```sh
node greet.js Ana --loud
# [ '/usr/local/bin/node', '/home/ana/greet.js', 'Ana', '--loud' ]
```

```js
const [name = 'world'] = process.argv.slice(2)
console.log(`Hello ${name}`) // Hello Ana
```

For flags, Node has a built-in parser, so you don't need a package for simple tools:

```js
import { parseArgs } from 'node:util'

const { values, positionals } = parseArgs({
  allowPositionals: true,
  options: { loud: { type: 'boolean', short: 'l' } },
})

const message = `Hello ${positionals[0] ?? 'world'}`
console.log(values.loud ? message.toUpperCase() : message)
// node greet.js Ana -l   →   HELLO ANA
```

## Environment variables: process.env

Environment variables are settings that live outside your code: which port to use, the database URL, API keys. They're all strings, and missing ones are `undefined`.

```js
const port = Number(process.env.PORT ?? 3000)
```

```sh
PORT=8080 node server.js
```

Secrets go in a `.env` file that you never commit. Node can load it for you:

```
# .env
PORT=8080
DATABASE_URL=postgres://localhost/shop
```

```sh
node --env-file=.env server.js
```

See [[docs/linux/linux-environment|Shell - Environment]] for how the shell sets these.

## Output: stdout and stderr

A process has two output channels. **stdout** is for results; **stderr** is for errors and logs. Keeping them apart means `node report.js > report.txt` saves the report without the noise.

```js
console.log('result')   // writes to process.stdout
console.error('oops')   // writes to process.stderr

process.stdout.write('no newline added')
```

## Exit codes

When a process ends it returns a number. `0` means success, anything else means failure. Shells, scripts and CI read it to decide what happens next.

```js
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL is missing')
  process.exitCode = 1
}
```

```sh
node check.js && echo 'all good'   # only echoes if the exit code was 0
```

Prefer setting `process.exitCode` and letting Node finish naturally. `process.exit()` stops immediately, even if output is still being written.

Node exits by itself once there's nothing left to wait for. A running server or a `setInterval` keeps it alive:

```js
let count = 3
const timer = setInterval(() => {
  console.log(count--)
  if (count === 0) {
    clearInterval(timer) // nothing left to wait for, so Node exits
    console.error('Lift off')
  }
}, 1000)
// 3, 2, 1, Lift off
```

## Running other programs: child_process

Sometimes a script needs another program: `git`, `ffmpeg`, another Node script. `node:child_process` starts it as a **child process**.

`execFile` runs a command and gives you its whole output at the end. Good for short commands.

```js
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'

const run = promisify(execFile)

const { stdout } = await run('git', ['branch', '--show-current'])
console.log(stdout.trim()) // 'main'
```

`spawn` streams the output as it happens. Good for long-running work or big output.

```js
import { spawn } from 'node:child_process'

const child = spawn('npm', ['test'], { stdio: 'inherit' }) // child shares our terminal

child.on('close', (code) => console.log(`tests finished with code ${code}`))
```

| | `execFile` / `exec` | `spawn` |
|---|---|---|
| Output | all at once, buffered | streamed as it arrives |
| Best for | short commands, small output | long jobs, big output, live logs |

`exec` runs the command through a shell (so pipes and `*` work), which also means user input can sneak in shell commands. Prefer `execFile` or `spawn` with an arguments array.

## Making it a command-line tool

Turn a script into a command you can run by name.

1. Add a "shebang" as the very first line, so the system knows to run it with Node:

```js
#!/usr/bin/env node
console.log('Hello from my tool')
```

2. Point `bin` in `package.json` at it:

```json
{
  "name": "coffee-cli",
  "type": "module",
  "bin": { "coffee": "./index.js" }
}
```

3. Link it globally while you develop:

```sh
npm link
coffee   # Hello from my tool
```

Published to npm, anyone can run it with `npx coffee-cli`. See [[docs/node/node-npm|Node - npm and pnpm]].

## Common mistakes

- **Reading `process.argv[0]` as the first argument.** User arguments start at `process.argv[2]`.
- **Treating env vars as numbers or booleans.** With `DEBUG=false`, `if (process.env.DEBUG)` still runs: `'false'` is a non-empty string, so it's truthy. Convert explicitly.
- **Committing `.env`.** Add it to `.gitignore` and share a `.env.example` with empty values.
- **`exec` with user input.** ``exec(`cat ${file}`)`` runs whatever is in `file`. Use `execFile('cat', [file])`.

## Try it

1. Write `tip.js` that takes a bill and a percentage (`node tip.js 40 15`) and prints the tip. Exit with code `1` and a message on stderr if either is missing.
2. Read a `GREETING` env var with a default, and load it from a `.env` file with `--env-file`.
3. Turn `tip.js` into a `tip` command with a shebang, `bin` and `npm link`.

## Related
- [[docs/node/node|Node - Basics]]
- [[docs/node/node-streams|Node - Streams]]
- [[docs/node/node-npm|Node - npm and pnpm]]
- [[docs/linux/linux-processes|Shell - Processes]]
- [[docs/linux/linux-environment|Shell - Environment]]
