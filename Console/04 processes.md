# Console - Processes


## Processes
All the active processes running on the machine

```sh
$ ps
# show All processes of all Users
$ ps aux
# Allows us to take some input and filter only the lines with that pattern
$ ps aux | grep "node"
```

## Top
A task manager that shows live active processes, `h` or `?` for help. `F` to sort processes. `Q` to quit.
```sh
$ top
```

## Foreground
Brings the most recently stopped program to the foreground
```sh
$ fg
```

## Jobs
Prints the list of jobs in the session
```sh
$ jobs
# [1]+ Stopped  nano demo.txt    (wd: ~)
# job number   |  file name    | working directory
```

## Killing Processes
Signals a message to terminate `-TERM` to the process  (default), which requests that the process terminates after any cleanup, if the process is not responding then we should submit a `-KILL` signal which forces it to terminate wihout cleanup.

```sh
$ kill 1399     # kill -TERM 1399
$ kill -9 1399  # kill -KILL 1399
$ kill -STOP    # pause the progress
```

## Reboot
```
$ reboot
```

## whoami
Displays the user you are currently logged in as.
```sh
$ whoami
```
