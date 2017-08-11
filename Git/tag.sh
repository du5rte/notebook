

Semantic Versioning - http://semver.org

http://git-scm.com/book/en/v2/Git-Basics-Tagging


### git tag
  # Lists the available tags in Git
  $ git tag
  # You can also search for tags with a particular pattern.
  # The Git source repo, for instance, contains more than 500 tags
  $ git tag -l 'v1.8.5*'

### Creating Tags
  # Git uses two main types of tags: lightweight and annotated.Ω

  # A lightweight tag is very much like a branch that doesn’t change – it’s just a pointer to a specific commit.
  # To create a lightweight tag, don’t supply the -a, -s, or -m option:
  $ git tag v1.4

  #Annotated tags, however, are stored as full objects in the Git database.
  $ git tag -a v1.4 -m 'my version 1.4'

  # Sharing Tags
  # By default, the git push command doesn’t transfer tags to remote servers.
  # This process is just like sharing remote branches git push origin [tagname]
  $ git push origin v1.5

  # Deleting tags
  # Delete existing tags with the given names.
  # -d --delete
  $ git tag -d v1.3
