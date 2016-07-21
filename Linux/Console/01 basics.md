# Console - Basics

Resources:
- [Initial Server Setup with Ubuntu](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)

## The Console
Most Websites and web applications are deployed on remote computers called `servers` and most of the time, the only way to interact directly with these machines is to use a `command line` over a remote connection called `SSH`.

## Prompt
Is everything up to the dollar sign, is made up of the `username` followed by the `current directory`, `~` is short for `home/usr` in linux or `users/usr` in mac.
```sh
treehouse ~ $
```

## Clear
Clears the screen
```sh
$ clear
```

## sudo
Executes commands as the super user `root`, it saves us the hustle of changing users and possibly damage important system file.
```sh
$ sudo
# The most recently run command
$ whoami  # treehouse
$ sudo !! # root
```

## Stoping Processes
`ctrl` + `Z` stops or pauses the current process

## Pause Processes
`ctrl` + `C` terminates or exit the current process
