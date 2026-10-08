---
title: "Shell - Environment"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: ["Console - Environment"]
tags: [linux]
---
# Shell - Environment

The environment is a set of named values the shell carries around and hands to every program it starts: your user name, your home folder, which folders to look in for programs. Programs read it to adapt to the machine they're on, and it's how we pass settings like API keys or `NODE_ENV=production` to our own apps without hard-coding them.

## Looking at the environment

```sh
env                 # every environment variable
echo $HOME          # /home/ana
echo $USER          # ana
echo $SHELL         # /bin/zsh
```

`$` in front of a name means "the value of". `echo` just prints its arguments, so `echo $HOME` prints the value.

## Shell variables vs environment variables

You can set a variable in the shell, with no spaces around `=`:

```sh
GREETING="Hello Ana"
echo $GREETING          # Hello Ana
```

That's a shell variable: only this shell can see it. Programs you start from it can't. `export` turns it into an environment variable, which is copied to every child process.

```sh
GREETING="Hello Ana"
bash -c 'echo $GREETING'     # (empty: the child shell can't see it)

export GREETING="Hello Ana"
bash -c 'echo $GREETING'     # Hello Ana
```

Copied is the key word. A child gets its own copy; changes it makes never flow back to the parent.

## Setting a variable for one command

Put the assignment before the command and it only applies to that run.

```sh
NODE_ENV=production node server.js
PORT=4000 npm start
```

Inside Node, these show up as `process.env.NODE_ENV` and `process.env.PORT` (see [[docs/node/node-process|Node - Process]]).

## PATH: where programs live

When you type `node`, the shell doesn't search the whole disk. It looks through the folders listed in `PATH`, in order, and runs the first match.

```sh
echo $PATH
# /opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin

which node          # /opt/homebrew/bin/node
```

The folders are separated by colons. Earlier folders win, which is how a newer Node installed with Homebrew takes priority over an older system one.

"command not found" almost always means the program isn't installed, or its folder isn't in `PATH`.

## Making changes stick

Anything you `export` in a terminal is gone when you close it. To keep it, add it to your shell's startup file, which runs every time a new shell opens:

| Shell | Startup file |
| --- | --- |
| zsh (macOS default) | `~/.zshrc` |
| bash (most Linux) | `~/.bashrc` |

Adding your own `bin` folder to the front of `PATH`, so your scripts run from anywhere:

```sh
mkdir -p ~/bin
echo 'export PATH="$HOME/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc     # reload it in the current shell
```

`source` runs the file in the current shell, so you don't have to open a new terminal.

## Secrets and .env files

API keys and passwords belong in the environment, not in code. Most projects keep them in a `.env` file that the app loads at start-up, and list `.env` in `.gitignore` so it's never committed.

```text
DATABASE_URL=postgres://localhost/coffee
STRIPE_KEY=sk_test_...
```

## Common mistakes

- **Spaces around `=`.** `NAME = "Ana"` runs a command called `NAME`. Write `NAME="Ana"`.
- **Forgetting `export`.** The variable works in your shell but your program sees nothing.
- **Overwriting PATH.** `export PATH="$HOME/bin"` drops every other folder, and suddenly `ls` is "not found". Always include `$PATH` in the new value.
- **Editing `.zshrc` and wondering why nothing changed.** Run `source ~/.zshrc` or open a new terminal.

## Try it

1. Set `FAVOURITE_DRINK` without `export` and check whether `bash -c 'echo $FAVOURITE_DRINK'` sees it. Then export it and try again.
2. Run `echo $PATH | tr ':' '\n'` to list your PATH one folder per line. Which folder does `which ls` point to?
3. Create a script in `~/bin`, make it executable, add `~/bin` to your PATH, and run it by name from any folder.

## Related
- [[docs/linux/linux-processes|Shell - Processes]]
- [[docs/linux/linux-applications|Shell - Applications]]
- [[docs/linux/linux-permissions|Shell - Permissions]]
- [[docs/node/node-process|Node - Process]]
