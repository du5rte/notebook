---
title: "Git - Merging"
type: doc
created: 2015-08-27
updated: 2017-08-12
tags: [git]
---
# Git - Merging

## Merging
Most version control systems provide a concept called merging that lets us combine our changes together

## git merge
Merges the history from branchname into the current branch

```bash
git merge branch_name
```

## Merging Conflicts
If Git can't handle a merge for us automatically, it generates what we call a "merge conflict" that we have to resolve on our own.

```bash
git merge new_feature
```

```
Auto-merging file1
CONFLICT (content): Merge conflict in file1
Automatic merge failed; fix conflicts and then commit the result.
```

Git adds conflict markers to show us where the conflict occurred

```bash
nano file1
```

Before:

```
<<<<<<< HEAD
Wha'up Dwag!?
=======
Good Day Sir!
>>>>>>> new_feature
```

After:

```
Good Day Dwag!
```

Once we solve the conflict we need to let git know it been taken cared of

```bash
git add file1
git commit
```

Git automatically knows you're resolving a merge and writes the merge commit message for you

```
[master 9c22137] Merge branch 'new_feature'
```

## Related
- [[docs/git/git-branching|Git - Branching]]
- [[docs/git/git-flow|Git - Flow]]
