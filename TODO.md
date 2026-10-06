# TODO

## Scrub personal info from git history

Current files use placeholders, but older commits still contain my old email, old GitHub handle, old nickname and old home-folder username. The repo is public.

1. Back up: `git clone --mirror . ../notebook-backup.git`
2. Install: `brew install git-filter-repo`
3. Check commit authors for the old email: `git log --all --format='%an <%ae>' | sort -u`. If it's there, add a `--mailmap` step.
4. Write a `replacements.txt` **outside the repo** (`old==>new` per line; `regex:` prefix for patterns), mapping each old value to `you@example.com`, `username`, `Jane`/`jane`, `/Users/username/`.
5. Rewrite (combined with the step below):
   `git filter-repo --force --replace-text ../replacements.txt --path-glob '*.DS_Store' --invert-paths`
6. `git remote add origin https://github.com/du5rte/notebook.git`
7. Force-push master and all open branches.
8. Optionally ask GitHub Support to purge cached views of old commits.

## Remove .DS_Store from git history

Already untracked and in `.gitignore`. Still present in old commits. Covered by `--path-glob '*.DS_Store' --invert-paths` in the step above.

Rewriting history changes every commit ID: rebuild or rebase any open stacked PRs after.
