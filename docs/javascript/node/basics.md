## Node.js - Basics

Resources:
- [node.js](https://nodejs.org/en/)
- [7 Things you should stop doing in node](http://webapplog.com/seven-things-you-should-stop-doing-with-node-js/)

## Installing
Node comes with `npm` (Node) Package Manager to handle our dependencies. It can be downloaded from the main website [node.js](https://nodejs.org/en/)

```sh
# Check both are installed
$ node -v # 4.2.1
$ npm -v # 2.14.4
```


## Node V8 Engine
*Ryan Dahl* ripped Chrome's V8 JavaScript engine out of the browser, leaving only the host objects behind and adding new ones allowing new types of applications to be written. Node is written in `C` code, one of the reasons it's so fast.

## REPL
Read Evalute Print Loop runs node on the console. To start run `$ node`, to exit press `CTRL + C`.

```sh
$ node
1 + 2 # 3
var name = 'Sarah'
name # "Sarah"
```
There's not a `window` in node but there is `global` root object.
```sh
global.name # 'Sarah'
global
process
```

## Running File
To execute a file we run `$ node filename.js`, node automatically looks for `index.js` file so it's not needed.
```sh
$ node app # node ./app.js
$ node . # node ./index.js
```

## Blocking
Most web servers, languages or frameworks handle one set of tasks from beginning to end before repeating the process again, repeating the same steps for another task, when accessing a database or uploading file it can't perform other tasks until it finishes executing the task order.

```
task_1 >>>>>>>>>
                task_2 >>>>>>>>>
                                task_3 >>>>>>>>>
|-------------------------|-----------------------------|
0s                       0.5s                           1s
```

## Workers
Are a way of decreasing blocking by using clones to share the handling of tasks. But this requires more CPU power

```
worker_1 >>>>>>>>>
worker_2 >>>>>>>>>
worker_3 >>>>>>>>>
|-------------------------|-----------------------------|
0s                       0.5s                           1s
```

## Non-Blocking
Node Stays in RAM memory and works Asynchronously, waiting for task and doing them as they arrive, why it's so fast.

```
task_1 >>>>>>>>>
task_2 >>>>>>>>>
task_3 >>>>>>>>>
|-------------------------|-----------------------------|
0s                       0.5s                           1s
```

## Nodemon
A thin wrapper around node that automatically restarts it on file changes. A ignore file can be created `.nodemonignore`

```sh
$ nodemon app.js # watches for changes
```

## Node Inspector
Uses the browser to debug the node application with `breakpoints`, breakpoints give access to it's current `scope`, writing `debugger` in the code will also create a breakpoint in the application.

```sh
$ node-inspector # listens for port 5858
$ node --debug app.js # runs a debugger on 58585
```
