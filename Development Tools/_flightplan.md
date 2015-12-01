# Flightplan

Resources:
- [learncodeacademy flightplan Gist](https://gist.github.com/learncodeacademy/35045e64d2bbe6eb14f9)

## Getting Started
installing globably will give access to the `fly` command
```sh
$ npm install -g flightplan
```

In local procject folter
```sh
$ npm install --save-dev flightplan
# Create a git repository
git init
git add -A
git commit -m "first commit"
```

Create a `flightplan.js` file set the ssh `host` and `username`

"build": "gulp --type production && webpack -p",

```js
var plan = require('flightplan');

var appName = 'node-app';
var username = 'deploy';
var startFile = 'bin/www';

var tmpDir = appName+'-' + new Date().getTime();

// configuration
plan.target('staging', [
  {
    host: '104.131.93.214',
    username: username,
    agent: process.env.SSH_AUTH_SOCK
  }
]);

plan.target('production', [
  {
    host: '104.131.93.215',
    username: username,
    agent: process.env.SSH_AUTH_SOCK
  },
//add in another server if you have more than one
// {
//   host: '104.131.93.216',
//   username: username,
//   agent: process.env.SSH_AUTH_SOCK
// }
]);

// run commands on localhost
plan.local(function(local) {
  // Run a build on own machine first
  local.log('Run build');
  local.exec('gulp build');

  local.log('Copy files to remote hosts');
  var filesToCopy = local.exec('git ls-files', {silent: true});
  // rsync files to all the destination's hosts
  local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote hosts (destinations)
plan.remote(function(remote) {
  remote.log('Move folder to root');
  remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
  remote.rm('-rf /tmp/' + tmpDir);

  remote.log('Install dependencies');
  remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

  remote.log('Reload application');
  remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: username});
  remote.exec('forever stop ~/'+appName+'/'+startFile, {failsafe: true});
  remote.exec('forever start ~/'+appName+'/'+startFile);
});
```
