---
title: "Git - Stashing"
type: doc
created: 2015-08-27
updated: 2017-08-12
tags: [git]
---
# Git - Stashing

## git stash
Stores modifications away, Helpful for temporary storage

```bash
git stash
# Brings back stored modifications
git stash apply
```

Helpful when working on the wrong branch

```bash
git stash
git checkout -b some_new_feature
git stash apply # brings back modification on new branch
```

## git stash list
Lists all stored stashes

```bash
git stash list
```

```
stash@{0}:WIP on some_new_feature: eefd3cf Adding the initial files
stash@{1}: WIP on some_new_feature: eefd3cf Adding the initial files
```

Retrieve selected stash

```bash
git stash apply stash@{1}
```

## Related
- [[docs/git/stage|Git - Stage Area]]
- [[docs/git/branching|Git - Branching]]
