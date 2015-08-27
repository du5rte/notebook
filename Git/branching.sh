###		Git - Branching		###
	#
	#		Branching Out
	#		git branch
	#				listing
	#				creating
	#				switching
	#				Creating and Switching
	#				Deleting
	
	
### Branching Out
	#	One of the most powerful features that version control systems have to offer is the concept of Branching, the ease with which you can manage branches in Git is one of the big reasons behind its wide popularity
	git status # On branch master
	
### git branch
	# Allows you to conveniently work on multiple versions of your code at once
	
	# listing
	# Lists all branches in the current repository and indicate which branch you're currently in
	git branch
	
	# Creating
	# Creates a copy of whatever branch you're currently using
	git branch branch_name 
	
	# Switching
	# Switchs to the branch 
	git checkout branch_name 
	
	# Creating and Switching
	# Creates a new branch and switchs to that branch
	git checkout -b branch_name
	
	# Deleting
	# Deletes the branch from the repository.
	git branch -D some_brach