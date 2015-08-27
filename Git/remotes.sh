###		Git - Remote	###
	#
	#

###	Working With Remote Repositories	###
	# Much like merging history between branches in a single repository we can merge history between different copies of the same repository
	# In git this is done by pushing or pulling changes from a remote repository to our local copy

### Cloning Repositories
	# When working with other developers they will need access to their own workstation, for that create a copy of the repository on their own computer

### git clone
	# create a new repository that is a clone of a remote repository
	git clone ~/my_really_cool_project
	# optionally we can name our copy
	git clone ~/my_really_cool_project our_cloned_project
	# Can also use external files
	git clone git://mygithosting.com/git_basics/cool_stuff.git

### git remote
	# list all remote repositories associated with the current repository
	git remote
	#
	# By default cloned projects are linked to the original but the original is not linked to every clone
	#
	#			~our_cloned_project $ git remote
	#			origin
	#			~my_really_cool_project $ git remote
	#			(none)

### git remote add
	# add a new remote repository to the current repository
	git remote add our_clone ~/our_clone_project/
	#
	#			~my_really_cool_project $ git remote
	#			our_clone
	#
	# Can also use external files
	git remote add tommy http://tommysgitstuff.com/git_basics/cool_stuff.git

### git push
	# push your latest changes to a remote repository
	git push origin new_feature
	# we can push back the changes on master to our_clone
	git push our_clone

### git git pull
	# pull the latest changes from a remote repository to your repository
	git pull origin master
	git pull origin new_feature

### GitHub
	# At the top of your GitHub repository's Quick Setup page, click  to copy the remote repository URL.
	# Sets the new remote
	$ git remote add origin https://github.com/monteirocode/typoRhythm.git
	# Verifies the new remote URL
	$ git remote -v
	# Pushes the changes in your local repository up to the remote repository you specified as the origin
	$ git push -u origin master
