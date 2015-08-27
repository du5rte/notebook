###	Console Environment and Redirection ###
	#
	#	Environment Variables
	#			Variables
	#			env
	#			echo
	#			bash
	#			which
	#			Path
	#
	#	Find and Grep
	#			find
	#			grep
	#
	#	Pipes and Redirection
	#			Default Standard Input
	#			< FILE
	#			> FILE
	#			>> FILE
	#			2> FILE
	#					/dev/null
	#			Pipe
	#			sort


### Environment Variables ###


### Variables
	# Store configuration information on our computers
	# !! When setting variables we don't use a $ dollar sign !!
	# VARIABLE=value - set a local environment variable
	PS1="\w > "
	MESSAGE="Hello World"

	# by default it will stay in it's own session or process, we can use export to set an environment variable that will be visible to child processes
	# export VARIABLE=value
	export MESSAGE="Hello World"

### env
	# view environment variables
	env

### echo
	# Prints display the arguments sent to echo
	echo $HOME

### bash
	# start a new session within your current session
	bash

### which
	# Print the location of a program
	# We can also run programs with directories but it's not pratic
	# /bin/echo Hello
	which echo

### Path
	# Search directories list for executables, separated by collons ':'
	# /usr/local/sbin:/user/local/bin:/usr/sbin/:usr/bin:/sbin:/bin:/usr/games
	echo $PATH
	# add a new high priority directory
	mkdir bin
	export PATH=/home/treehouse/bin:$PATH
	# .bashrc
	# if the computer retarded we would lose it but there's a file that runs everytime we startup bash
	# add the line on the bottom
	export PATH=/home/treehouse/bin:$PATH


### Find and Grep ###


### find
	# Locate a file by name
	find . -name "how_to_go_home.txt"
	# doesnt need quotes, but it's good pratice
	# / = root directory
	find / -name "sudoer"
	# search multiple directories
	find documents bin -name "how_to_go_home.txt"

### grep
	# Search inside a file for a pattern
	# Global Regular Expression Print
	# doesnt need quotes, but it's good pratice
	grep "is" hello.txt

	# Print the line in results
	# By default grep is case sensitive
	grep -n "this" hello.txt

	# Perform a case insensitive search
	grep -i "this" hello.txt

	# Show lines without the pattern
	grep -v "this" hello.txt

	# We can look at the manual
	man grep

	# Can be used in the output of programs
	ps aux | grep init


### Pipes and Redirection	###


### Default Standard Input
	# The default standar input is the keyboard without a file it will use our keyboard as input
	# to get out ctrl + d
	grep "hello"

### < FILE
	# Use FILE as the standard input
	# somecommand < inputfile run somecommand with input from inputfile, instead of the keyboard
	grep "this" < hello.txt # grep "this" hello.txt

### > FILE
	# Redirect standar output to FILE
	# somecommand > outputfile run somecommand with output to outputfile instead of the terminal screen.
	grep "this" hello.txt > grep_output.txt

	# Running a new grep will overide the previous file
	grep "line" hello.txt > grep_output.txt

	# >> FILE
	# Redicrect output to append to FILE
	grep "line" hello.txt >> grep_output.txt

### 2> FILE
	# Redirect the standar error stream to FILE
	find / -name "sudoers" 2> error_log.txt

	# /dev/null
	# A special file that will delete anything written into it
	find / -name "sudoers" 2> /dev/null

### Pipe
	# Pipe the output of Command A to the input of Command B
	# command1 | command2 pipe the output of command1 to the input of command 2
	ps aux | grep bash

### sort
	# Sorts the lines of standard input and sends it to standard output
	sort
	ps aux | grep bash | sort
	ps aux | grep bash | sort > sorted_bash_procs.txt
