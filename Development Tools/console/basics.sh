###	Console - Basics	###
	#
	#	Introduction
	#			The Console
	#			Why use the Console?
	#			Unix
	#			Linux, or GNU/Linux
	#			POSIX
	#			Microsoft Windows
	#
	#	Using The Console
	#			Prompt
	#			User
	#			Current Directery
	#			Dollar Sign
	#			Dollar Sign
	#			Command line
	#			Cursor
	#
	#	running Commands
	#			list files
	#			clear
	#			Print Working Directory
	#			Change Directory
	#			less (More)
	#			cat (Concat)
	#			nano
	#			mv (Move)
	#			cp (Copy)
	#			rm (Remove)
	#			mkdir (Make Directory)


### Introduction ###


### The Console
	# Instead of working with windows, toolbars,menus, and buttons, we just interacting with text. We perform actions by writing commandsget and we get information back from the computer in the form of text.

### Why use the Console?
	# Websites and web applications will be deployed on remote computers called servers and most of the time, the only way to interact directly with these machines is to use a command line over a remote connection called SSH.

### Unix
	# An operating system first developed in the 1960s, created a lot of great ideas on how an operating system should work, a lot of operating systems were created using the same ideas and philosophies, and they mimic Unix. Linux is one of those descendants.

### Linux, or GNU/Linux
	# The vast majority of servers on-line run some flavor of Linux. Another operating system that is based on Unix is called Darwin. Darwin is what powers Apple's Mac OS10.

### POSIX
	# A standard that makes sure that all of these different yet related operating systems stay consistent to some degree. So that once you know one, you can use another. This is one reason why OS10 is so popular with web developers.

### Microsoft Windows
	# it's not a POSIX compatible operating system at all. The way Windows works is actually quite different. Making it a less desirable choice when doing web development because it's not compatible with the operating systems that we're likely to use on her web servers.


### Using The Console ##


### Prompt
	# Everything up to the dollar sign
	treehouse ~ $ 

### User
	treehouse

### Current Directery
	# Short for home/usr in linux or users/usr in mac
	~

### Dollar Sign
	# Tells us that our prompt ends and our input beings
	$

### Command line
	# Where we run our commands

### Cursor
	# lets us know it's ready for text

	
### running Commands ##

	
### list files
	ls
	ls documents/
	ls -l /etc
	# prints long form of file list
	-l
	# show all files, including hidden files
	-a
	
### clear
	# clears the screen
	clear

### Print Working Directory
	# Display your current location in the file system
	pwd

### Change Directory
	# Changes our current directory
	cd documents
	# goes back to home
	cd
	# or
	cd ~ 
	cd /home/treehouse
	# Moving Back directory
	cd ..
	cd ../..
	
### less (More)
	# A program that displays the content of a file
	less hello.txt
	# Press q to exit
	q
	
### cat (Concat)
	# Prints the contents of one or more files to the console
	cat hello.txt documents/how_to_go_home.txt

### nano
	# A simple text editor
	nano hello.text
	
### mv (Move)
	# Moves, or renames, a file or directory
	#
	# Renames
	mv hello.txt hi.txt 
	# Moves it to the documents folder
 	mv hi.txt documents/		
	# Bring it to the current directory
	# . dot (current directory)
	mv documents/hi.txt .
	# moves to documents and remanes it
	mv hi.txt documenets/hello.txt
	# Also works on directories
	mov documents docs

### cp (Copy)
	# Copies a file or directory
	cp hello.txt hi.txt
	# to copy directories we use recursive 
	# Recursive is a fancy word for this and everything below. If you think of a directory structure as an upside down tree you have the root and branches going down. Recursiveness follows all the little branches to their end.
	cp -r documents docs

### rm (Remove)
	# Removes a File or Directory
	rm hi.txt 
	rm -r docs

### mkdir (Make Directory)
	# Creates a new directory
	mkdir pictures
	mkdir documents/notes
	# allows to create deep sub directories
	mkdir -p documents/notes/console/part1


