



## Process
when running node it executes `process`, a process can have multiple child processes each with their own scope


#### Examples

access the process passed arguments
```js
console.log(process.argv)
```
```sh
node t.js --someflag
```
```sh
[ '/usr/local/bin/node',
  '/Users/monteiro/Desktop/sesion-api/t.js',
  '--someflag' ]
```

access the process environment variables
```js
process.env
```




Standard Out Channel
Standard Error Channel

```js
console.log('yoooo')
// same as
process.stdout.write('yoooo' + '\n')
// process.stderr.write('yoooo' + '\n')
```

```js
var count = 100

setInterval(() => {
  count--
  if(count) {
    // same as
    // console.log(count)
    process.stdout.write(count + '\n')
  } else {
    // same as
    // console.err()
    process.stderr.write('finished counting' + '\n')
    // without it the program would just stay on while
    process.exit()
  }
}, 100)
```

## Exec
good for one-off small things

```js
var exec = require('child_process').exec

// executes a binary
exec('cat file.text', (err, stdout, stderr) {
  console.log('file content:', stdout)
})
```

## Spawn
gives us more controls

```js
var spawn = require('child_process').spawn

// node ./app.js
spawn(
  // node binary location
  // '/usr/local/bin/node'
  process.execPath,
  // arguments
  ['./app.js']
)
```

```js
var child = spawn(process.execPath, ['./app.js'])
    // pipes the child logs into the parent logs
    child.stdout.pipe(process.stdout)
    // pipes the child errors into the parent errors
    child.stderr.pipe(process.stderr)
```

special use case for spawning node processes
```js
var fork = require('child_process').fork

fork('./app')
```
