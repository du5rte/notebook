###		Git - Merging		###
	#
	#		Merging
	#		git merge 
	#		Merging Conflicts

	
### Merging
	# Most version control systems provide a concept called merging that lets us combine our changes together
	
### git merge 
	#	Merges the history from branchname into the current branch
	git merge branch_name
	
### Merging Conflicts
	# If Git can't handle a merge for us automatically, it generates what we call a "merge conflict" that we have to resolve on our own.
	git merge new_feature
	#
	#		Auto-merging file1
	#		CONFLICT (content): Merge conflict in file1
	#		Automatic merge failed; fix conflicts and then commit the result.
	#
	# Git adds conflict markers to show us where the conflit occored
	nano file1
	#
	#		-------- before --------
	#
	#		<<<<<<< HEAD
	#		Wha'up Dwag!?
	#		=======
	#		Good Day Sir!
	#		>>>>>>> new_feature
	#
	#		------- after ---------
	#
	#		Good Day Dwag!
	#
	#		-----------------------
	#
	#	Once we solve the conflit we need to let git know it been taken cared of
	git add file1
	git commit
	
	# Git Automaticly will you're solvering a merge
	#
	#		[master 9c22137] Merge branch 'new_feature'
	#