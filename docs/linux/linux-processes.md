---
title: "Shell - Processes"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: ["Console - Processes"]
tags: [linux]
---
# Shell - Processes

A process is a program that is running right now. Your editor, your browser, a Node server and the shell itself are all processes. Knowing how to see them, pause them and stop them is how you deal with a frozen program or a server that's still holding on to port 3000.

## Every process has an id

The system gives each process a number, its PID (process id). Commands that manage processes use that number.

## ps: a snapshot

`ps` lists processes once and exits.

```sh
ps                       # just the ones started from this terminal
ps aux                   # every process, from every user
ps aux | grep node       # find the Node ones
# ana  1399  0.5  1.2 ... node server.js
```

In `ps aux`, the second column is the PID.

## top: a live view

`top` is a task manager in the terminal. It refreshes every few seconds, busiest processes first. Press `q` to quit.

```sh
top
```

`htop` is a friendlier version with colours and mouse support. It's usually not installed by default (see [[docs/linux/linux-applications|Shell - Applications]]).

## Stopping a process: kill

`kill` sends a signal to a process. Despite the name, the default signal politely asks it to finish.

```sh
kill 1399            # send TERM: "please stop", lets it clean up
kill -9 1399         # send KILL: stop immediately, no clean-up
pkill node           # by name instead of PID
```

| Signal | Meaning |
| --- | --- |
| `TERM` (15) | Please stop. The default. |
| `KILL` (9) | Stop now. The process can't refuse or clean up. |
| `INT` | Interrupt, what `Ctrl` + `C` sends |
| `TSTP` | Pause, what `Ctrl` + `Z` sends |

Try `TERM` first. Use `-9` only when a process ignores it, since it won't get to save files or close connections.

## Foreground and background

A command normally runs in the foreground: it holds the terminal until it finishes. You can run it in the background instead, or move it there.

```sh
npm run dev &        # start in the background, terminal is free
jobs                 # list this shell's jobs
# [1]+  Running   npm run dev &
```

The common dance when you've started something and want your prompt back:

```sh
nano notes.txt       # press Ctrl + Z
# [1]+  Stopped   nano notes.txt
jobs                 # see it's paused
fg                   # bring it back to the foreground
bg                   # or let it keep running in the background
```

`Ctrl` + `C` vs `Ctrl` + `Z`: the first ends the program, the second only pauses it. A paused job still exists until you `fg` it or kill it (`kill %1` kills job number 1).

## Who's using that port?

A classic: you start a server and get "address already in use". Find the process holding the port and stop it.

```sh
lsof -i :3000
# node  1399  ana  ...  TCP *:3000 (LISTEN)
kill 1399
```

## Restarting the machine

```sh
sudo reboot
sudo shutdown -h now   # power off
```

On a server, rebooting drops everyone's connections, so warn people first.

## Common mistakes

- **Reaching for `kill -9` first.** It can leave half-written files and lock files behind. Start with plain `kill`.
- **Leaving jobs paused with `Ctrl` + `Z`.** They keep holding memory, files and ports. Check `jobs` before closing a terminal.
- **Killing the wrong PID.** `grep node` also matches the `grep` command itself. Read the line before you kill.

## Try it

1. Run `sleep 300`, pause it with `Ctrl` + `Z`, check `jobs`, then resume it with `bg` and kill it with `kill %1`.
2. Start `sleep 600 &`, find its PID with `ps aux | grep sleep`, and stop it with `kill`.
3. Open `top`, find the process using the most memory, then quit.

## Related
- [[docs/linux/linux-pipe|Shell - Pipes and Redirection]]
- [[docs/linux/linux-environment|Shell - Environment]]
- [[docs/node/node-process|Node - Process]]
