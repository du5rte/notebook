---
title: "Git - Remotes"
type: doc
created: 2015-08-27
updated: 2026-10-07
aliases: ["Git - Remote"]
tags: [git]
---
# Git - Remotes

A remote is another copy of the same repository, usually hosted on a site like GitHub. Just as we merge history between branches, we can send and receive history between copies: we **push** our commits up and **pull** other people's commits down. That is how a team shares one project while everyone keeps a full copy locally.

## Cloning a repository

`git clone` downloads a repository, with its whole history, into a new folder.

```sh
git clone https://github.com/username/coffee-shop.git
git clone https://github.com/username/coffee-shop.git my-shop   # pick the folder name
```

You can clone over HTTPS (works everywhere, asks for a token) or SSH (uses your SSH key, no prompts once set up):

```sh
git clone git@github.com:username/coffee-shop.git
```

A clone also works from another folder on your own machine (`git clone ~/coffee-shop`), which is handy for practising.

## origin and git remote

A clone remembers where it came from, under the name `origin`. The original doesn't know about its clones.

```sh
git remote -v
# origin  https://github.com/username/coffee-shop.git (fetch)
# origin  https://github.com/username/coffee-shop.git (push)
```

`origin` is just a name, a nickname for a URL. You can add others:

```sh
git remote add upstream https://github.com/someone/coffee-shop.git
git remote rename upstream original
git remote remove original
```

A common setup when contributing to someone else's project: `origin` is your fork, `upstream` is the original.

## Remote-tracking branches

Your clone keeps a read-only record of where the remote's branches were the last time you talked to it. They are named `origin/main`, `origin/add-pastries` and so on.

```text
local main:   Add menu - Add prices - You: fix typo
origin/main:  Add menu - Add prices - Teammate: add teas
```

Here a teammate pushed "add teas" and you committed "fix typo" locally. Your `main` and `origin/main` have grown apart, and you'll need to combine them before you can push.

## fetch vs pull

| Command | What it does |
| --- | --- |
| `git fetch` | Downloads new commits and updates `origin/main`. Doesn't touch your branches or files. |
| `git pull` | `git fetch`, then merges (or rebases) `origin/main` into your current branch. |

`fetch` is the safe look-before-you-leap version. Fetch, look at what came in, then merge:

```sh
git fetch
git log --oneline main..origin/main   # commits on the remote you don't have yet
git merge origin/main
```

Most of the time `git pull` is fine. See [[docs/git/git-flow|Git - Flow]] for pulling with rebase instead of merge.

## git push

`git push` sends your commits on the current branch to the remote.

```sh
git push -u origin add-pastries   # first push of a new branch
git push                          # after that, just this
```

`-u` (short for `--set-upstream`) links your local branch to the remote one, so later `git push`, `git pull` and `git status` know where to compare.

If the remote has commits you don't have, the push is rejected:

```text
! [rejected]  main -> main (fetch first)
```

That's Git protecting your teammate's work. Pull first, resolve any conflicts, then push again.

## Pushing tags

Tags are not pushed with your commits. Send them on purpose:

```sh
git push origin v1.4.0     # one tag
git push --tags            # every local tag
```

Tags are covered in [[docs/git/git-history|Git - History]].

## Putting a new project on GitHub

Create an empty repository on GitHub (no README, so the histories don't clash), copy its URL, then from your local project:

```sh
git remote add origin https://github.com/username/coffee-shop.git
git remote -v                # check it
git push -u origin main
```

## Common mistakes

- **Thinking `origin/main` is live.** It's a snapshot from your last fetch. Run `git fetch` to update it.
- **Force-pushing a shared branch.** `git push --force` overwrites the remote's history and can delete teammates' commits. If you must, use `git push --force-with-lease`, which refuses when the remote has changed, and only on your own branches.
- **Creating the GitHub repo with a README, then pushing an existing project.** The two histories are unrelated and the push is rejected. Start the remote repo empty.

## Try it

1. Clone a repo you own into two different folders, as if you were two people.
2. Commit and push a change from the first folder. In the second, run `git fetch` and `git log --oneline main..origin/main`, then pull.
3. Make both folders change the same line, push from one, and pull in the other. Resolve the conflict and push.

## Related
- [[docs/git/git|Git - Basics]]
- [[docs/git/git-branching|Git - Branching]]
- [[docs/git/git-history|Git - History]]
- [[docs/git/git-flow|Git - Flow]]
- [[docs/ssh|SSH]]
