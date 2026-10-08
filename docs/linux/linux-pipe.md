---
title: "Shell - Pipes and Redirection"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: ["Console - Pipes and Redirection"]
tags: [linux]
---
# Shell - Pipes and Redirection

Shell commands are small tools that each do one job well. Pipes and redirection let us connect them, like pieces of plumbing: the output of one command flows into the next, or into a file. This is where the shell becomes more powerful than any file explorer.

## Standard input, output and error

Every command has three streams:

| Stream | Number | Default |
| --- | --- | --- |
| Standard input (stdin) | 0 | the keyboard |
| Standard output (stdout) | 1 | the screen |
| Standard error (stderr) | 2 | the screen |

Normal results go to stdout and error messages go to stderr. Both show up on screen, but they're separate pipes, and we can send them to different places.

## Redirecting output to a file

```sh
ls > files.txt          # write stdout to a file (replaces what was there)
ls >> files.txt         # append to the end instead
```

`>` overwrites without asking. `>>` adds. Mixing them up is a classic way to lose a log file.

## Redirecting errors

Errors have their own number, 2.

```sh
find / -name "hosts" 2> errors.txt    # errors to a file, results on screen
find / -name "hosts" 2> /dev/null     # throw errors away
npm run build > build.log 2>&1        # both streams into one file
```

`/dev/null` is a bin that discards anything written to it. `2>&1` means "send stderr wherever stdout is going".

## Reading input from a file

`<` feeds a file into a command's stdin, instead of the keyboard.

```sh
sort < guests.txt
```

Most commands also accept a file name directly (`sort guests.txt`), so you'll use `<` less often than `>`.

## Pipes

The pipe `|` sends one command's stdout into the next command's stdin.

```sh
ls | wc -l                       # how many files are here?
history | grep "git"             # which git commands did I run?
cat guests.txt | sort | uniq     # sorted, with duplicates removed
```

Read a pipeline left to right, like a sentence: "list the files, then count the lines".

## grep: find matching lines

`grep` prints the lines that match a pattern. It's the pipe's best friend.

```sh
grep "error" server.log          # lines containing "error"
grep -i "error" server.log       # ignore case
grep -n "error" server.log       # show line numbers
grep -v "debug" server.log       # lines that do NOT match
grep -r "TODO" src/              # search every file in a folder
```

The pattern is a regular expression, see [[docs/regex|Regex - Basics]]. Quote it so the shell doesn't interpret special characters.

## Building a pipeline

A few more small tools make pipes really useful:

| Command | Does |
| --- | --- |
| `sort` | Sorts lines (`-n` numeric, `-r` reverse) |
| `uniq` | Removes adjacent duplicates (`-c` counts them) |
| `wc -l` | Counts lines |
| `head` / `tail` | First or last lines |

Put together: the five most common lines in a log.

```sh
cat access.log | sort | uniq -c | sort -rn | head -n 5
```

## Copying to the clipboard

Pipe into the clipboard tool for your system:

```sh
cat ~/.ssh/id_ed25519.pub | pbcopy      # macOS
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard   # Linux with X11 (install xclip)
```

## Common mistakes

- **`>` when you meant `>>`.** The file is emptied before the command even runs.
- **Redirecting into the file you're reading.** `sort guests.txt > guests.txt` leaves you with an empty file. Write to a new file, then rename.
- **`uniq` on unsorted input.** It only removes duplicates that are next to each other. Sort first.

## Try it

1. Save the output of `ls -l` in your home folder to `listing.txt`, then append the output of `ls -l /tmp` to it.
2. Count how many processes mention your user name: `ps aux | grep ana | wc -l`.
3. Make a file with ten names, some repeated, and print each name once with how many times it appears.

## Related
- [[docs/linux/linux-files|Shell - Files and Directories]]
- [[docs/linux/linux-processes|Shell - Processes]]
- [[docs/regex|Regex - Basics]]
- [[docs/node/node-streams|Node - Streams]]
