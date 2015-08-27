###		Git - Stashing	###
	#
	#		
	#		

### git stash
	# Stores modifications away, Helpful for temporaly storage
	git stash
	# Brings back stored modifications
	git stash apply
	# Helpful when working on the wrong branch
	git stash
	git checkout -b some_new_feature
	git stash apply # brings back modifcation on new branch
	
### git stash list
	# Lists all stored stashes
	get stash list
	#
	# 	stash@{0}:WIP on some_new_feature: eefd3cf Adding the initial files
	# 	stash@{1}: WIP on some_new_feature: eefd3cf Adding the initial files
	#
	# Retrieve selected stash
	git stash apply stash@{1}
	