---
title: "Git - Stage Area"
type: doc
created: 2015-08-27
updated: 2017-08-12
tags: [git]
---
# Git - Stage Area

## The Staging Area
Provides us precise control over what gets included in our commit

## git status
Shows the current status of the git repository, including if there are any uncommitted changes and whether or not any of our changes have been put in the staging area

```bash
git status
```

## git add
Does something more than just add files to be tracked - it also adds changes to the staging area

```bash
git add file1
```

## git commit
Without any arguments (or the -a flag) it will default to committing everything that's currently in the staging area.

```bash
git commit -m "changed file1"
```

## Related
- [[docs/git/basics|Git - Basics]]
- [[docs/git/history|Git - History]]
- [[docs/git/stashing|Git - Stashing]]
- [[docs/git/branching|Git - Branching]]
