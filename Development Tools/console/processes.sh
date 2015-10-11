###	Console Processes ###
	#
	#	Programs
	#			top
	#			ps
	#			Grep
	#
	#	Stopping Processes
	#			Stop
	#			fg
	#			jobs
	#			Pause
	#
	#	Killing Processes
	#			signal
	#			TERM (terminate)
	#			kill


### Programs ###


### top
	# A task manager that shows live active processes
	# 'h' or '?' for help. F to sort processes. Q to quit
	top
	
### ps
	# Show process statuses
	ps
	# view a full list of all processes
	ps aux # all procresses for all users (u x)

### Grep
	# Allows us to take some input and filter only the lines with that pattern
	# pipe allows to combine programs together
	ps aux | grep "top"

	
### Stopping Processes ###

	
### Stop
	# Stop or pause the current process
	ctrl + z

### fg (foreground)
	# Bring the most recently stopped program to the foreground
	fg
	# & (background)
	# Stars a process on the background
	top &

### jobs
	# Prints the list of jobs in this session
	jobs
	# job number	#file name		#working directory
	# [1]+ Stopped	nano demo.txt		(wd: ~)
	jobs 1

### Pause
	# Terminate or exit a process
	ctrl + c

	
### Killing Processes ###

	
### signal
	# A message sent to a process by the operating system

### TERM (terminate)
	# Requests that the process terminates after any cleanup

### kill
	# Send a signal to a process
	# by defaults it sends a -TERM
	kill 1399 		# kill -TERM 1399
	kill -9 1399  # kill -KILL 1399
	kill -STOP		# pause the progress



