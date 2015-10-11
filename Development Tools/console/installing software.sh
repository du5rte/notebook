###	Console Installing Software	###
	#
	#	Building Software From Source
	#	
	#	
	#	


### Building Software From Source ###


### Installing Software Manually
	# Step 1 - Download source file
	# Step 2 - Untar file
	# Step 3 - Run ./configre script
	# Step 4 - Run make command
	# Step 5 - Run sudo make install

### apt-get
	# Update your computer's catalog of available software 
	sudo apt-get update
	# Install the tools needed to build software from source code
	sudo apt-get install build-essential
	# We can double check by looking for 'make' a program for making things which build-essentials installs
	which make
	
### curls -O
	# A programed use to make resquests from the internet
	curl -O http:#sqlite.org/2015/sqlite-autoconf-3080803.tar.gz

### tar
	# Decompress the tar.gz file to the current directory
	# (flags) x=extract | v=verbal outputs | f=file
	tar -xvf FILENAME.tar.gz
	
### ./configure 
	# Run the configure script that comes with the source code. This creates a Makefile
	# creates a Makefile, which specifies how to build the program so it's compatible with our system
	./configure 
	
### make
	# Run the build specified in the Makefile
	make 
	# Run the install script from the Makefile. This installs the program (Moves the executales to somewhere where it will available to our PATH)
	sudo make install
	# we can double check using which "packagename"
	which sqilte3
	
	
### Using Package Managers ###

	
### apt
	# Package manager for Ubuntu Linux 
	
### apt-get
	# Update your package catalog on your computer 
	sudo apt-get update
	
### apt-cache
	# search PATTERN Search the available packages for a pattern
	apt-cache search git
	
### apt-get install
	# PACKAGE Install one or more packages
	# It will automaticly install any packaged it needs to runs git
	apt-get install git
	
### apt-get upgrade
	# Upgrade to the latest version of all the packages installed
	sudo apt-get upgrade

### apt-get remove
	# remove PACKAGE Remove or uninstall package from your computer
	# it will not removed the additionally installed packages with git
	sudo apt-get remove git
	
### apt-get autoremove
	# removes any left over packages