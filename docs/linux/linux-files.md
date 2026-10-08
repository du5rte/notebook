---
title: "Shell - Files and Directories"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: ["Console - Files and Directories"]
tags: [linux]
---
# Shell - Files and Directories

Most of what we do in the shell is move around folders and work with files: list them, read them, copy, rename and delete them. It's the same as using Finder or a file explorer, but faster once your fingers know it, and it's the only option on a server.

## Where am I? pwd

The shell is always "in" one folder, the current directory. `pwd` (print working directory) tells you which.

```sh
pwd   # /home/ana/projects
```

## What's here? ls

`ls` lists what's in the current folder, or in another one if you name it.

```sh
ls                 # app.js  notes.txt  images
ls images/         # cat.png  logo.svg
ls -l              # long form: permissions, owner, size, date
ls -a              # include hidden files (names starting with .)
ls -lah            # all of the above, with readable sizes like 4.0K
```

## Paths

A path is the address of a file. There are two kinds.

| Path | Starts from | Example |
| --- | --- | --- |
| Absolute | the root `/` | `/home/ana/projects/notes.txt` |
| Relative | where you are now | `projects/notes.txt` |

Some shortcuts work in any path:

- `.` the current folder
- `..` the parent folder
- `~` your home folder

## Moving around: cd

`cd` (change directory) moves you to another folder.

```sh
cd projects       # into projects
cd ..             # up one level
cd ../..          # up two levels
cd ~              # home (plain `cd` does the same)
cd -              # back to the previous folder
```

## Making things: mkdir and touch

```sh
mkdir notes                      # a new folder
mkdir -p notes/shell/part-1      # create the missing parents too
touch notes/todo.txt             # an empty file (or update an existing file's date)
```

## Reading files: cat and less

```sh
cat todo.txt      # print the whole file
less server.log   # scroll through a long file: space for next page, / to search, q to quit
head -n 5 todo.txt   # first 5 lines
tail -n 5 todo.txt   # last 5 lines
```

`cat` is fine for short files. For anything longer than a screen, use `less`.

To edit a file in the terminal, `nano` is the friendliest editor: `nano todo.txt`, then `Ctrl` + `O` to save and `Ctrl` + `X` to exit.

## Copying: cp

`cp` copies a file. To copy a folder you need `-r` (recursive: "this and everything inside it").

```sh
cp todo.txt todo-backup.txt
cp todo.txt notes/               # into a folder, same name
cp -r notes notes-backup         # a whole folder
```

## Moving and renaming: mv

The shell has no "rename" command. Renaming is moving a file to a new name.

```sh
mv todo.txt notes/               # move into a folder
mv notes/todo.txt .              # move back here
mv todo.txt tasks.txt            # rename
mv tasks.txt notes/done.txt      # move and rename at once
mv notes docs                    # works on folders too, no -r needed
```

## Deleting: rm

`rm` deletes files. Folders need `-r`.

```sh
rm todo-backup.txt
rm -r notes-backup
rmdir empty-folder               # only removes empty folders, a safe choice
```

There is no bin. `rm` is permanent. `rm -rf` (recursive, force, no questions) is the most dangerous command you'll type regularly, so read the path twice before pressing enter.

## Finding files: find

`find` searches a folder and everything under it.

```sh
find . -name "todo.txt"          # in the current folder
find . -name "*.log"             # by pattern (quote it)
find ~ -type d -name "notes"     # only folders
```

## Common mistakes

- **Spaces in names.** `cd my notes` looks for a folder called `my`. Quote it (`cd "my notes"`) or let Tab complete it for you.
- **`cp` or `rm` on a folder without `-r`.** You'll get "is a directory". Add `-r`.
- **`mv` overwriting silently.** If the target name exists, it's replaced. Use `mv -i` to be asked first.
- **`rm -rf` with a variable or a typo in the path.** Double-check, and prefer deleting a named folder over wildcards.

## Try it

1. In your home folder, create `course/week-1/notes.txt` in one `mkdir` and one `touch`.
2. Copy `week-1` to `week-2`, rename `notes.txt` inside it to `homework.txt`, then list both with `ls -R course`.
3. Use `find` to list every `.txt` file under `course`, then delete `week-2`.

## Related
- [[docs/linux/linux|Shell - Basics]]
- [[docs/linux/linux-permissions|Shell - Permissions]]
- [[docs/linux/linux-pipe|Shell - Pipes and Redirection]]
