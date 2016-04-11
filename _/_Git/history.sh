###		Git - History		###
	#
	#		Looking Back on What’ve Done
	#		git log
	#		Commit Identifier
	#		git checkout
	#		git diff


### Looking Back on What’ve Done
	# Now that we've committed changes to our repository we are ablue to view our project's history
	
### git log
	# Show us a chronological log of all of our commits to the current repository
	git log
	
### Commit Identifier
	# Each commit has a unique hash number indentifier
	commit 9ef949ca1f04c6cd162a4ee6ac9bd711ca4ebe23
	
### git checkout 
	# 'Checks out' a different version  from the one you're currently looking at
	# We can get away with just writing the first 5 digits
	git checkout 7e5e3
	# HEAD~1 is a special commit identifier in git which stands for the previous commit 
	git checkout HEAD~1
	# To return to our most recent commit
	git checkout master
	# or HEAD, is a special term for the lastet commint in the current branch
	git checkout HEAD
	
### git diff 
	# Creates a 'different' view to demonstrate what has changed between two different versions of your repository.
	git diff 7e5e3
	