---
title: "Git - Tag"
type: doc
created: 2015-08-27
updated: 2017-08-12
tags: [git]
---
# Git - Tag

Resources:
- [Semantic Versioning](http://semver.org)
- [Git Basics - Tagging](http://git-scm.com/book/en/v2/Git-Basics-Tagging)

## git tag
Lists the available tags in Git

```bash
git tag
```

You can also search for tags with a particular pattern. The Git source repo, for instance, contains more than 500 tags

```bash
git tag -l 'v1.8.5*'
```

## Creating Tags
Git uses two main types of tags: lightweight and annotated.

A lightweight tag is very much like a branch that doesn’t change – it’s just a pointer to a specific commit. To create a lightweight tag, don’t supply the -a, -s, or -m option:

```bash
git tag v1.4
```

Annotated tags, however, are stored as full objects in the Git database.

```bash
git tag -a v1.4 -m 'my version 1.4'
```

### Sharing Tags
By default, the git push command doesn’t transfer tags to remote servers. This process is just like sharing remote branches `git push origin [tagname]`

```bash
git push origin v1.5
```

### Deleting tags
Delete existing tags with the given names.

- `-d` `--delete`

```bash
git tag -d v1.3
```
