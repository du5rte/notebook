###		Git - Flow	###
	#
	#		Feature Branch
	#		Git-Flow


### Feature Branch
	# Master Branch is treated like a canonical branch, code needs to be finished, working, and ready to to g into the production version of the site before being added to master
	# http://martinfowler.com/bliki/FeatureBranch.html
	# We create a branch for each new feature, big refactor/redesign, substantial chang
	git checkout -b add_github_to_profiles
	
### Git-Flow
	# 
	# https://github.com/nvie/gitflow
	# http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/
	#
	# Installing
	sudo port install git-flow
	# Setting up a new git repository
	git flow init
	# Starting a new feature
	# Creates a new branch based on develop
	git flow feature start feature_name
	# Finish a new feature
	git flow feature finish feature_name
	# Fix a bug
	# Creates a new branch based of master
	git flow hotfix start oh_no_not_a_bug