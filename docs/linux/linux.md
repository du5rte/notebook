---
title: "Shell - Basics"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: ["Console - Basics"]
tags: [linux]
---
# Shell - Basics

The shell is a program that reads the commands you type and runs them. It's how developers move around files, run tools like Git and npm, and manage servers. Most websites run on remote Linux machines that have no screen or mouse, so the only way in is a command line over SSH. Learn the shell once and you can drive your laptop and any server the same way.

This is the first lesson of a short course: basics, files, permissions, pipes, processes, environment, users, installing apps.

## Terminal vs shell

- The **terminal** is the window (Terminal on macOS, the terminal app on Linux, Windows Terminal with WSL).
- The **shell** is the program running inside it that understands your commands. On macOS the default is `zsh`; on most Linux systems it's `bash`. For everything in this course they behave the same.

```sh
echo $SHELL   # /bin/zsh
```

## The prompt

The prompt is the text before your cursor. It usually shows who you are, which machine you're on and which folder you're in, then waits.

```text
ana@laptop ~ $
```

`~` is short for your home folder: `/home/ana` on Linux, `/Users/ana` on macOS. A `$` at the end means a normal user; `#` means you are `root`, the all-powerful admin, so be careful.

In these notes, lines starting with `$` are commands and the rest is output. Don't type the `$`.

## Anatomy of a command

Most commands follow the same shape: the command, then options (flags) that change its behaviour, then arguments it works on.

```sh
ls -l -a documents
# ls        the command
# -l -a     options (long format, include hidden files)
# documents the argument
```

Short options can be combined (`ls -la`), and many have a long form (`ls --all`).

## Getting help

You don't need to remember every option. Ask the command.

```sh
man ls        # the full manual, q to quit, / to search
ls --help     # a shorter summary (on Linux)
```

## Shortcuts that save time

| Keys | What it does |
| --- | --- |
| `Tab` | Complete a command or file name. Press twice to see options. |
| `↑` / `↓` | Step through previous commands |
| `Ctrl` + `R` | Search your command history |
| `Ctrl` + `C` | Stop (cancel) the running command |
| `Ctrl` + `Z` | Pause the running command (see [[docs/linux/linux-processes|Shell - Processes]]) |
| `Ctrl` + `L` | Clear the screen, same as `clear` |

Tab completion is the habit that matters most. It's faster and it stops typos.

## sudo

Some commands change the system and need admin rights. `sudo` ("superuser do") runs one command as `root`, after asking for your password.

```sh
whoami          # ana
sudo whoami     # root
```

Forgot to use it? `!!` repeats the previous command, so this re-runs it with `sudo`:

```sh
apt update      # Permission denied
sudo !!         # sudo apt update
```

Only use `sudo` when a command needs it. Running everything as root is how you accidentally delete system files.

## Connecting to a server

On a remote machine you get the same shell over SSH:

```sh
ssh ana@203.0.113.10
```

Everything in this course works the same there. See [[docs/ssh|SSH]] for keys and config.

## Common mistakes

- **Typing the `$`** from examples. It's part of the prompt, not the command.
- **Mixing up `Ctrl` + `C` and `Ctrl` + `Z`.** `C` cancels the program; `Z` only pauses it, and it keeps running in the background until you resume or kill it.
- **Reaching for `sudo` to fix every error.** "Permission denied" usually means you're in the wrong folder or have a permissions problem worth understanding.

## Try it

1. Open a terminal, find out which shell you're using, and print your user name.
2. Read the manual for `ls` and find the option that sorts by modification time.
3. Run three commands, then use `Ctrl` + `R` to find and re-run the first.

## Related
- [[docs/linux/linux-files|Shell - Files and Directories]]
- [[docs/linux/linux-permissions|Shell - Permissions]]
- [[docs/ssh|SSH]]
- [[docs/git/git|Git - Basics]]
