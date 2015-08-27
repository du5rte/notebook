###		Git - Stage Area		###
	#
	#		The Staging Area
	#		git status
	#		git add
	#		git commit
	
### The Staging Area
	# Provides us precise control over what gets included in our commit

### git status
	# Shows the current status of the git repository, including if there are any uncommitted changes and whether or not any of our changes have been put in the staging area
	git status

### git add
	# Does something more than just add files to be tracked - it also adds changes to the staging area
	git add file1

### git commit
	# Without any arguments (or the -a flag) it will default to committing everything that's currently in the staging area.
	git commit -m "changed file1"