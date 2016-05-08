# Git - Basics

Resources:
- [Getting Started About Version Control](http://git-scm.com/book/en/v2/Getting-Started-About-Version-Control)
- [Git](http://git-scm.com/)
- [Linux Kernel Development Numbers](http://royal.pingdom.com/2012/04/16/linux-kernel-development-numbers/)

## Git
Invented by the father of Linux OS 'Linus Torvalds', which still mantains the 'Linux Kernel' the software at the heart of every Linux system.

## The Linux Kernel
Git was originally invented to manage all of the work maintaining Linux Kernel.

- Over 15 million lines of code
- About 3,500 new lines of code are added every day
- Every new kernel released involves approximately 1,000 developers

## Version control System
VCS allows developers to works together without stepping on each others toes

## Github
The most popular site for sharing code and managing software projects, like a social network for sharing repositories, publicly with the world or privately with friends or collaborators, other people can view, comments and submit commits to make the project better

## Repository
A collection of all the versions of the project, along with the order and description of each change, and additional info, like who's responsible for each change

## Hidden Files
In UNIX-based systems, hidden files and folders are indicated by having their name prefixed with a '.' - so a file named repository isn't hidden, but a file named .repository would be

## Commits
The act of telling the VCS that a version is finished, so it commits the changes to the repository and stores a new version.

## Review
Provides a set of tools to review your project history, or even switch what version the project displays.

## Distributed Version Control
There's no central repository, everyone that works on the project has their own repository

## Plumbing vs Porcelain
Originally Git has not going to be a CVS but a collection of tools and commands to build a VCS (The plumbing of a good version control system). Over Time Git gain some porcelain commands of it's own, and has evolved into a fully functional VCS. But we still have access to the internal (plumbings) which allows to do really advanced and powerful things with Git

## Installing
Git comes installed in back by defaults

```sh
sudo apt-get install git
git --version
```

## git init
Initializes a new repository on the current directory.

```sh
git init
# If project_name is provided, it creates a new project directory with that name.
git init my_repository
# The files will be hidden
ls -a my_repository # .git
# Unless the folder is removed keep will keep tracking changes
rm -rf .git
```

## git add
Adds files to the repository so that Git knows to track their changes.

```sh
# Git VCS doesn't automatically tracks everything in the directory, this is useful to allows us to keep some files outside the VCS
git add README
# Add all filed
git add -A
#or
git .
```

## git commit
Commits all added files to the repository as a change.

```sh
# to use git with nano
export EDITOR=nano
# Commits all added files to the repository as a change
# It's good pratice to include short and meaningful message
git commit
# -a flag, commits all changes to all tracked files
# -m flag, allows you to specify a commit message directly on the command line instead of in your default editor.
git commit -a -m "Added a new awesome line."
```

## git config
Allow us to make configuration changes to Git

```sh
git config
# --global flag, makes these changes available across your entire system
git config --global user.name "My Name"
git config --global user.email "myemail@gmail.com"
```
