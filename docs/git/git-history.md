---
title: "Git - History"
type: doc
created: 2015-08-27
updated: 2026-10-07
aliases: ["Git - Tag"]
tags: [git]
---
# Git - History

Once we have commits, Git becomes a time machine. We can read the history, compare any two versions, look at an old one, undo mistakes and put labels (tags) on important moments like a release.

Resources:
- [Git Basics - Tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)
- [Semantic Versioning](https://semver.org)

## git log

`git log` lists the commits on the current branch, newest first.

```sh
git log
# commit 9ef949ca1f04c6cd162a4ee6ac9bd711ca4ebe23 (HEAD -> main)
# Author: Ana Silva <ana@example.com>
# Date:   ...
#
#     Raise espresso to 1.60
```

The full log is long. These views are the ones you will actually use:

```sh
git log --oneline              # 9ef949c Raise espresso to 1.60
git log --oneline --graph --all  # draw branches as a tree
git log -p menu.txt            # every change to one file, with diffs
```

Press `q` to leave the log.

## Commit ids and HEAD

Every commit has a unique id, a long hash like `9ef949ca1f04...`. You only need the first few characters, as long as they are unique in the repo (`9ef949c`).

`HEAD` means "where I am now", usually the latest commit on the current branch. You can count back from it:

| Name | Means |
| --- | --- |
| `HEAD` | the current commit |
| `HEAD~1` | one commit before it |
| `HEAD~3` | three commits before it |

## git diff

`git diff` shows what changed, line by line. Which two things it compares depends on what you pass it.

```sh
git diff                 # working tree vs staging area (unstaged edits)
git diff --staged        # staging area vs last commit (what you're about to commit)
git diff HEAD~1          # working tree vs one commit ago
git diff 7e5e3 9ef94     # between two commits
```

Lines starting with `-` were removed, lines with `+` were added.

```diff
-Espresso 1.50
+Espresso 1.60
```

## Looking at an old version

To look around an old commit, switch to it in "detached HEAD" mode. Detached means you are not on a branch, just visiting a commit.

```sh
git switch --detach 7e5e3
# HEAD is now at 7e5e3 Add menu with espresso price
git switch main          # back to the latest commit
```

You will also see `git checkout 7e5e3` in older guides. It does the same thing. `checkout` used to do many jobs, so Git split it into `switch` (move between branches and commits) and `restore` (bring back file contents).

To bring back just one file as it was in an older commit, without moving:

```sh
git restore --source=HEAD~1 menu.txt
```

## Undoing changes

Pick the tool by where the mistake lives.

| Mistake is in | Undo with | What happens |
| --- | --- | --- |
| Working tree (not staged) | `git restore menu.txt` | Throws away your edits to that file |
| Staging area | `git restore --staged menu.txt` | Unstages it, keeps your edits |
| Last commit, not pushed | `git commit --amend` | Rewrites the last commit with what's staged now |
| A commit already shared | `git revert 9ef949c` | Adds a new commit that undoes it |

`git restore` on an unstaged file can't be undone, because those edits were never saved anywhere. Read `git status` first.

`revert` is the safe choice once others have the commit: it adds to history instead of rewriting it.

## Tags

A tag is a permanent label on a commit, usually a release version like `v1.4.0`. Unlike a branch, a tag never moves.

```sh
git tag -a v1.4.0 -m "Spring menu"   # annotated tag on the current commit
git tag                              # v1.3.0  v1.4.0
git tag -l "v1.*"                    # filter by pattern
git show v1.4.0                      # the tag and the commit it points to
git tag -d v1.3.0                    # delete a local tag
```

There are two kinds:

- **Annotated** (`-a`): stores who tagged it, when, and a message. Use these for releases.
- **Lightweight** (`git tag v1.4.0`): just a name pointing at a commit. Fine for a private bookmark.

Versions usually follow semantic versioning, `MAJOR.MINOR.PATCH`: bump MAJOR for breaking changes, MINOR for new features, PATCH for fixes.

`git push` does not send tags by default. See [[docs/git/git-remotes|Git - Remotes]] for sharing them.

## Common mistakes

- **Making commits in detached HEAD and switching away.** They are not on any branch and are easy to lose. If you want to keep them, create a branch first: `git switch -c fix-from-old-version`.
- **Amending a commit you already pushed.** It rewrites history that others may have. Use `git revert` instead.
- **Confusing `git diff` and `git diff --staged`.** If `git diff` shows nothing but you know you changed something, it's probably staged.

## Try it

1. In a repo with a few commits, run `git log --oneline` and then `git diff` between the first and the latest commit.
2. Edit a file, then throw the edit away with `git restore`. Edit it again, stage it, and unstage it.
3. Tag the current commit as `v0.1.0` with a message and look at it with `git show`.

## Related
- [[docs/git/git|Git - Basics]]
- [[docs/git/git-branching|Git - Branching]]
- [[docs/git/git-remotes|Git - Remotes]]
