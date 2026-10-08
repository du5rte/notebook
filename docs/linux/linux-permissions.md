---
title: "Shell - Permissions"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: ["Console - Permissions"]
tags: [linux]
---
# Shell - Permissions

Every file and folder on Linux and macOS has an owner and a set of permissions that say who can read it, change it or run it. It's what stops one user from reading another's email and stops a web server from rewriting its own config. You'll meet permissions the first time a script won't run or a command says "Permission denied".

## Reading permissions

`ls -l` shows them as the first column.

```sh
ls -l
# -rw-r--r--  1 ana  staff   314 Nov 30 18:18 app.js
# drwxr-xr-x  3 ana  staff  4096 Nov 30 18:00 node_modules
# -rwxr-xr-x  1 ana  staff   120 Nov 30 18:05 deploy.sh
```

The first character is the type: `-` for a file, `d` for a directory. The next nine are three groups of three:

```text
-  rwx  r-x  r-x
   │    │    └── others: everyone else
   │    └─────── group: members of the file's group (staff)
   └──────────── user: the owner (ana)
```

Each group reads `r`, `w`, `x` in that order, with `-` meaning "not allowed".

## What r, w and x mean

| Letter | On a file | On a folder |
| --- | --- | --- |
| `r` read | See its contents | List what's inside |
| `w` write | Change it | Add, rename or delete files inside |
| `x` execute | Run it as a program | Enter it with `cd` |

So `deploy.sh` above can be read and run by everyone, but only `ana` can change it.

## chmod with letters

`chmod` (change mode) changes permissions. The letter form reads like a sentence: who, add or remove, what.

```sh
chmod u+x deploy.sh      # user can now execute
chmod go-w notes.txt     # group and others can no longer write
chmod a+r README.md      # all (user, group, others) can read
```

Who: `u` user, `g` group, `o` others, `a` all. Action: `+` add, `-` remove.

The one you'll use most: making a script runnable.

```sh
./deploy.sh              # Permission denied
chmod +x deploy.sh
./deploy.sh              # runs
```

## chmod with numbers

You'll also see permissions as three digits, one per group. Each permission has a value, and you add them up.

| Permission | Value |
| --- | --- |
| `r` | 4 |
| `w` | 2 |
| `x` | 1 |

So `rwx` is 4 + 2 + 1 = 7, `r-x` is 4 + 1 = 5, `rw-` is 6 and `r--` is 4.

```sh
chmod 755 deploy.sh      # rwxr-xr-x  scripts and folders
chmod 644 index.html     # rw-r--r--  ordinary files
chmod 600 ~/.ssh/id_ed25519   # rw-------  private keys: only you
```

Those three, 755, 644 and 600, cover most real situations.

## chown: changing the owner

`chown` changes who owns a file. You need `sudo` to give files away.

```sh
sudo chown mike notes.txt          # new owner
sudo chown mike:editors notes.txt  # new owner and group
sudo chown -R www-data /var/www/site   # a folder and everything inside
```

## Common mistakes

- **`chmod 777` to make an error go away.** It lets every user on the machine change the file. Find out who actually needs access and grant just that.
- **Using `sudo` with npm or pip to install global packages.** It leaves root-owned files in your home folder and causes more permission errors later. Use a version manager (like nvm for Node) so packages install in your own folders.
- **Forgetting `x` on folders.** A folder with `r` but no `x` can be listed but not entered.

## Try it

1. Create `hello.sh` containing `echo "Hello"`. Try `./hello.sh`, then fix it with `chmod`.
2. Work out the number for `rw-r-----`, set it on a file, and check with `ls -l`.
3. Remove your own read permission from a file and try to `cat` it. Then put it back.

## Related
- [[docs/linux/linux-files|Shell - Files and Directories]]
- [[docs/linux/linux-users|Shell - Users]]
- [[docs/linux/linux-pipe|Shell - Pipes and Redirection]]
- [[docs/ssh|SSH]]
