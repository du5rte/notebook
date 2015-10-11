###	Console Environment and Redirection ###
	#
	#	Creating Users
	#			Apply the patch
	#			whoami
	#			adduser
	#			su (Switch User)
	#
	#	File Permissions
	#			rwx notation
	#			chmod (Change Mode)
	#			Octal Notation
	#			chown (Change Owner)
	#			sudo
	#			!!


### Creating Users ###


### Apply the patch
	# If you receive an error when creating a new user stating that mike is already a user, the above command will remove the user so you can create him again.
	curl -L trhou.se/patch01 | bash

### whoami
	# Displays the user you are currently logged in as
	whoami
	
### adduser 
	# Interactive tool for creating users
	adduser
	sudo adduser mike
	
### su (Switch User)
	# Allows you to log in as a different user
	su mike 
	
	
###/ File Permissions ###


### rwx notation
	# each file has a 10 character permission representation such as drwxrwxrwx. Each character represents a permission on the file. 
	r			Red
	w			Write
	x			Execute
	
	u			User
	g			Group
	o			Other
	
	 u	 g	 o
	rwx rwx rwx

	# If the letter is replaced with a dash (-), it indicates the permission is not granted. The first character denotes if it is a dirctory. d means directory, -, means not a directory.
	drwrwxr-x
	-rw-rw-r--
	drwxrwxr-x
	
### chmod (Change Mode)
	# Change the permissions (mode) of a file or directory
	# chmod (o(+/-)) (r/w/x) (file)
	chmod o+w hello.txt
	chmod ug+r hello.txt

### Octal Notation
	# Numerical representation using the digits 0 through 7
	
	# Decimal
	 0  1  2  3  4  5  6  7  8  9
	10 11 12 13 14 15 16 17 18 19 
	
	# Octal
	 0  1  2  3  4  5  6  7
	10 11 12 13 14 15 16 17
	
	7 r w x
	6 r w -
	5 r - x
	4 r - -
	3 - w x	
	2 - w - 
	1 - - x 
	0 - - -

	read 		r = 4
	write 	w = 2
	execute x = 1
	
	chmod 777 hello.txt # rwxrwxrwx
	chmod 640 hello.txt # rw-r-----
	
### chown (Change Owner)
	# Change the owner of a file or directory.
	sudo chown mike hello.text 
	# change the group
	sudo chown mike:mike hello.text
	
### sudo 
	# Perform a command as the super user
	# Executes commands as the root user, only it saves us the hustle of changing users and possibly damage important system file
	sudo
	
### !!
	# Represents the most recently run command
	!! 				# whoami treehouse
	sudo !! 	# sudo whoami root
