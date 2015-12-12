# Console

Resources:
- [Initial Server Setup with Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)

## The Console
Most Websites and web applications are deployed on remote computers called `servers` and most of the time, the only way to interact directly with these machines is to use a `command line` over a remote connection called `SSH`.

## Basics

#### Prompt
Is everything up to the dollar sign, is made up of the `username` followed by the `current directory`, `~` is short for `home/usr` in linux or `users/usr` in mac.
```sh
treehouse ~ $
```

#### Clear
Clears the screen
```sh
$ clear
```

#### sudo
Executes commands as the super user `root`, it saves us the hustle of changing users and possibly damage important system file.
```sh
$ sudo
# The most recently run command
$ whoami  # treehouse
$ sudo !! # root
```

#### Stoping Processes
`ctrl` + `Z` stops or pauses the current process

#### Pause Processes
`ctrl` + `C` terminates or exit the current process



## Files and Directories

#### List Files
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

#### Print Working Directory
Display your current location in the file system
```sh
$ pwd # /Users/monteiro/some_folder
```

#### Change Directory
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

#### Less
A program that displays the content of a file
```sh
$ less hello.txt
# Press q to exit
q
```

#### cat
A simple text editor
```sh
$ nano hello.text
```

#### Move
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

#### Copy
Copies a file or directory, to copy `directories` it needs the `-r` recursive flag, Recursive is a fancy word for this and everything below.
```sh
# Can copy multiple files
$ cp hello.txt hi.txt
# Copies directories and all files
$ cp -r documents docs
```

#### Remove
Removes a File or Directory, again, to copy `directories` it needs the `-r` recursive flag or `-rf` recursive and force
```sh
$ rm hi.txt
$ rm -r docs
```

#### Make Directory
Creates a new directory
```sh
$ mkdir pictures
$ mkdir documents/notes
# Create deep sub directories
$ mkdir -p documents/notes/console/part1
```

#### Touch
Quick way to creates empty files

```js
$ touch app.js
```

#### find
Locate a file by name
```sh

$ find . -name "hello.txt"
# In root directory
$ find / -name "sudoer"
# Search multiple directories
$ find documents bin -name "hello.txt"
```

#### Grep
Global Regular Expression Print Searchs for patterns, doesnt need quotes, but it's good pratice

```sh
# Searches for the word `is` in `hello.text`
$ grep "is" hello.txt
# Print the line in results
$ grep -n "is" hello.txt
# Perform a case `insensitive` search
grep -i "this" hello.txt
# Show lines without the pattern
grep -v "this" hello.txt
# We can look at the manual
man grep
# Can be used in the output of programs
ps aux | grep init
```

## Pipes and Redirection

#### Default Standard Input
The default standart input is the keyboard without a file it will use our keyboard as input.

#### File
To use a file as the standard input we use

- `<` Direct
- `>` Redirect
- `>>` Redirects output to append to file
- `2>`


```sh
$ grep "this" < hello.text
$ grep "line" hello.txt >> grep_output.txt
```

#### Pipe
Pipes the output of Command `A` to the input of Command `B`
```sh
$ ps aux | grep bash
```

#### sort
Sorts the lines of standard input and sends it to standard output
```sh
$ sort
$ ps aux | grep bash | sort
$ ps aux | grep bash | sort > sorted_bash_procs.txt
```

## Processes
A task manager that shows live active processes


#### Top
A task manager that shows live active processes, `h` or `?` for help. `F` to sort processes. `Q` to quit.
```sh
$ top
```

#### Process
Shows all process statuses

```sh
$ ps
# show All processes of all Users
$ ps aux
# Allows us to take some input and filter only the lines with that pattern
$ ps aux | grep "node"
```


#### Foreground
Brings the most recently stopped program to the foreground
```sh
$ fg
```

#### Jobs
Prints the list of jobs in the session
```sh
$ jobs
# [1]+ Stopped  nano demo.txt    (wd: ~)
# job number   |  file name    | working directory
```



#### Killing Processes
Signals a message to terminate `-TERM` to the process  (default), which requests that the process terminates after any cleanup, if the process is not responding then we should submit a `-KILL` signal which forces it to terminate wihout cleanup.

```sh
$ kill 1399     # kill -TERM 1399
$ kill -9 1399  # kill -KILL 1399
$ kill -STOP    # pause the progress
```


## Users and Permissions

#### whoami
Displays the user you are currently logged in as.
```sh
$ whoami
```

#### adduser
Interactive tool for creating users

```sh
$ adduser
$ sudo adduser mike
# Add user to the sudo group
$ gpasswd -a mike sudo
```

#### Switch User
Logs as a different user
```sh
$ su mike
```

#### Delete User
Deletes a user which then should be followed up by the deleting the user’s home directory
```sh
userdel josh
rm -rf /home/josh
```

#### File Permissions
Each file has a 10 character permission representation such as `drwxrwxrwx`. Each character represents a permission on the file.

- `r` Read
- `w` Write
- `x` Execute

- `u` User (Owner)
- `g` Group
- `o` Other

```
 u   g   o
rwx rwx rwx
```
If the letter is replaced with a dash `-`, it indicates the permission is not granted. The first character determines if it's a directory `d`.
```sh
-rw-r--r-- 1 root root  314 Nov 30 18:18 app.js
drwxr-xr-x 3 root root 4096 Nov 30 18:00 node_modules
```

#### Change Mode
Changes the permissions mode of a file or directory, `+` to allow or `-` to disable, chmod `rgo``+/-` `rwx` `file/directory`

```sh
# Allows Other users to write
$ chmod o+w hello.txt
# Disables Users and Groups to Read
$ chmod ug-r hello.txt
```

#### Change Owner
Changes the owner of a file or directory

```sh
$ sudo chown mike hello.text
# change the group
$ sudo chown mike:mike hello.text
```


### Octal Notation
Numerical representation using the digits 0 through 7

Decimal
```
0  1  2  3  4  5  6  7  8  9
10 11 12 13 14 15 16 17 18 19
```
Octal
```
0  1  2  3  4  5  6  7
10 11 12 13 14 15 16 17
```
```
7 r w x
6 r w -
5 r - x
4 r - -
3 - w x  
2 - w -
1 - - x
0 - - -
```
```
read     r = 4
write   w = 2
execute x = 1
```
```sh
chmod 777 hello.txt # rwxrwxrwx
chmod 640 hello.txt # rw-r-----
```

## Installing Applications

### Get Application
The program installer in linux systems similar to `brew` for mac, in a new server we should always run an update first to update it's catalog.
```sh
# Updates
$ sudo apt-get update
# Installs the packaged and any packages it needs to runs it
$ apt-get install git
# Removes the packaged but not the additional packages
$ apt-get remove git
# Removes the packaged and additional packages
$ apt-get autoremove git
```

### Manual Installation
Not always Applications are listed in it's catalog sometimes they require a manual installation.
```sh
# Installs the tools needed to build software from source code
$ sudo apt-get install build-essential
# We can double check by looking for 'make'
$ which make
```

#### Which
Used to double check packages installations
```sh
$ which make
```

#### Curl
A programed use to make requests from the internet
```sh
$ curl -O http:#sqlite.org/2015/sqlite-autoconf-3080803.tar.gz
```

#### Tar
Decompress the `tar.gz` files to the current directory, flags `x` extract, `v` verbal outputs, `f` file.
```sh
$ tar -xvf FILENAME.tar.gz
```

#### Config
Running the configure script that comes with the source code creates a Makefile, which specifies how to build the program so it's compatible with our system.
```sh
$ ./configure
```

#### Make
A program for making things which build-essentials installs
```sh
# Runs the build specified in the Makefile
$ make
# Run the install script from the Makefile. This installs the program (Moves the executables to somewhere where it will available to our PATH)
$ sudo make install
# we can double check with which
$ which sqilte3
```

## Environments


#### Environment
view environment variables
```sh
$ env
```

#### Environment Variables
Store configuration information on our computers, to set a variable we don't use a `$` dollar sign
```sh
$ MESSAGE="Hello World"
$ echo $MESSAGE
```

By default it will stay in it's own session or process, we can use export to set an environment variable that will be visible to child processes.
```sh
$ export MESSAGE="Hello World"
```

#### Echo
Prints display the arguments sent to echo
```sh
$ echo $HOME
```

#### Bash
Start a new session within your current session
```sh
$ bash
```

#### which
Prints the location of a program
```sh
$ which node # /usr/local/bin/node
```

#### Path
Is a list of executables paths, separated by collons ':', `.bashrc` a file that runs everytime we startup bash.
```sh
echo $PATH
# add a new high priority directory
mkdir bin
# to the bottom of `.bashrc`
export PATH=/home/treehouse/bin:$PATH
```
