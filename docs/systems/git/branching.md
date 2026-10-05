# Git - Branching

## Branching Out
One of the most powerful features that version control systems have to offer is the concept of Branching, the ease with which you can manage branches in Git is one of the big reasons behind its wide popularity

```bash
git status # On branch master
```

## git branch
Allows you to conveniently work on multiple versions of your code at once

### Listing
Lists all branches in the current repository and indicate which branch you're currently in

```bash
git branch
```

### Creating
Creates a copy of whatever branch you're currently using

```bash
git branch branch_name
```

### Switching
Switches to the branch

```bash
git checkout branch_name
```

### Creating and Switching
Creates a new branch and switches to that branch

```bash
git checkout -b branch_name
```

### Deleting
Deletes the branch from the repository.

```bash
git branch -D some_branch
```
