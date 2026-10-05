# Git - Flow

Resources:
- [Feature Branch](http://martinfowler.com/bliki/FeatureBranch.html)
- [gitflow](https://github.com/nvie/gitflow)
- [Why aren't you using git-flow?](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/)

## Feature Branch
Master Branch is treated like a canonical branch, code needs to be finished, working, and ready to go into the production version of the site before being added to master

We create a branch for each new feature, big refactor/redesign, substantial change

```bash
git checkout -b add_github_to_profiles
```

## Git-Flow

Installing

```bash
sudo port install git-flow
```

Setting up a new git repository

```bash
git flow init
```

Starting a new feature. Creates a new branch based on develop

```bash
git flow feature start feature_name
```

Finish a new feature

```bash
git flow feature finish feature_name
```

Fix a bug. Creates a new branch based of master

```bash
git flow hotfix start oh_no_not_a_bug
```
