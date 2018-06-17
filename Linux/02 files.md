# Console - Files and Directories

## List Files
Shows a list of files on the `current directory`

```sh
$ ls
# Lists another directory
$ ls downloads/
# Prints long form of file list
$ ls -l
# Shows hidden files
$ ls -a
```

## Print Working Directory
Display your current location in the file system
```sh
$ pwd # /Users/monteiro/some_folder
```

## Change Directory
Changes our current directory
```sh
# Move to documents
$ cd documents
# Move back home
$ cd
# or
$ cd ~
# Move back
$ cd ..
# Move back 2 steps
$ cd ../..
```

## Less
A program that displays the content of a file
```sh
$ less hello.txt
# Press q to exit
q
```

## cat
A simple text editor
```sh
$ nano hello.text
```

## Move
Moves, or renames, a file or directory
```sh
# Moves file to the documents folder
$ mv hi.txt documents/
# Brings it back to the current directory
# `.` current directory
$ mv documents/hi.txt .
# Renames, moves files to a different name file
$ mv hello.txt hi.txt
# Moves to documents and renames it
$ mv hi.txt documenets/hello.txt
# Also works on directories
$ mv documents docs
```

## Copy
Copies a file or directory, to copy `directories` it needs the `-r` recursive flag, Recursive is a fancy word for this and everything below.
```sh
# Can copy multiple files
$ cp hello.txt hi.txt
# Copies directories and all files
$ cp -r documents docs
```

## Remove
Removes a File or Directory, again, to copy `directories` it needs the `-r` recursive flag or `-rf` recursive and force
```sh
$ rm hi.txt
$ rm -r docs
```

## Make Directory
Creates a new directory
```sh
$ mkdir pictures
$ mkdir documents/notes
# Create deep sub directories
$ mkdir -p documents/notes/console/part1
```

## Touch
Quick way to creates empty files

```js
$ touch app.js
```

## find
Locate a file by name
```sh

$ find . -name "hello.txt"
# In root directory
$ find / -name "sudoer"
# Search multiple directories
$ find documents bin -name "hello.txt"
```
