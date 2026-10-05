# Console - Environment


## Environment
The console has it's own environment that contains information about the machine system.

```sh
# view variables
$ env
```

## Environment Variables
Variables can be store in this environment to be used by various programs
```sh
# set variables
$ MESSAGE="Hello World"
# check variable
$ echo $MESSAGE
```

By default it will stay in it's own session or process, we can use export to set an environment variable that will be visible to child processes.
```sh
$ export MESSAGE="Hello World"
```

## Echo
Prints display the arguments sent to echo
```sh
$ echo $HOME
```

## Bash
Start a new session within your current session
```sh
$ bash
```

## which
Prints the location of a program
```sh
$ which node # /usr/local/bin/node
```

## Path
Is a list of executables paths, separated by collons ':', `.bashrc` a file that runs everytime we startup bash.
```sh
echo $PATH
# add a new high priority directory
mkdir bin
# to the bottom of `.bashrc`
export PATH=/home/treehouse/bin:$PATH
```
