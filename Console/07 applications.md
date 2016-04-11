# Console - Applications

Resources:
- [Installing Node 5.x on Ubuntu](https://github.com/nodesource/distributions)

## Get Application
The program installer in linux systems similar to `brew` for mac, in a new server we should always run an update first to update it's catalog.
```sh
# Updates the repositories
$ sudo apt-get update
# Upgrades outdates applications, `-y` answers yes to everything
$ sugo apt-get -y upgrade
# Installs the packaged and any packages it needs to runs it
$ apt-get install git
# Removes the packaged but not the additional packages
$ apt-get remove git
# Removes the packaged and additional packages
$ apt-get autoremove git
```

## Manual Installation
Not always Applications are listed in it's catalog sometimes they require a manual installation.
```sh
# Installs the tools needed to build software from source code
$ sudo apt-get install build-essential
# We can double check by looking for 'make'
$ which make
```

## Which
Used to double check packages installations
```sh
$ which make
```

## Curl
A programed use to make requests from the internet
```sh
$ curl -O http:#sqlite.org/2015/sqlite-autoconf-3080803.tar.gz
```

## Tar
Decompress the `tar.gz` files to the current directory, flags `x` extract, `v` verbal outputs, `f` file.
```sh
$ tar -xvf FILENAME.tar.gz
```

## Config
Running the configure script that comes with the source code creates a Makefile, which specifies how to build the program so it's compatible with our system.
```sh
$ ./configure
```

## Make
A program for making things which build-essentials installs
```sh
# Runs the build specified in the Makefile
$ make
# Run the install script from the Makefile. This installs the program (Moves the executables to somewhere where it will available to our PATH)
$ sudo make install
# we can double check with which
$ which sqilte3
```
