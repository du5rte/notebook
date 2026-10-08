---
title: "Engineering - Commits"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["Semantic Commits", "Conventional Commits", "Git Hooks", "Lefthook"]
tags: [engineering, git]
---
# Engineering - Commits

A commit message is a note to the next person who runs `git log`, usually you. A shared convention makes that history easy to scan and lets tools read it too: to work out the next version number, write the changelog, or check a message before it lands. Pair the convention with **git hooks**, small scripts Git runs for you on commit, and broken code stops reaching `main` without anyone having to remember a checklist.

## Conventional Commits

Conventional Commits is a convention on top of commit messages. Every subject line has the same shape:

```
type(scope): subject
```

```sh
git commit -m "feat(cart): add tip selector"
git commit -m "fix(checkout): round totals to two decimals"
git commit -m "docs: explain the release flow"
```

- **type**: what kind of change this is.
- **scope** (optional): the part of the project it touches. In a monorepo, use the package name.
- **subject**: what the commit does, in a few words.

## The types

Two types matter most, because they map onto semantic versioning:

| Type | Meaning | Version bump |
|---|---|---|
| `fix` | patches a bug | PATCH (`1.4.2` → `1.4.3`) |
| `feat` | adds a feature | MINOR (`1.4.2` → `1.5.0`) |
| `!` or a `BREAKING CHANGE:` footer | breaks the API | MAJOR (`1.4.2` → `2.0.0`) |

```sh
git commit -m "feat(api)!: remove the v1 orders endpoint"
```

The rest come from the common commitlint preset (based on the Angular convention): `build`, `chore`, `ci`, `docs`, `perf`, `refactor`, `revert`, `style`, `test`.

I add one of my own: **`tweak`**, for copy, spacing and colour polish. It's not a `fix` (nothing was broken) and not a `style` (that one means code formatting).

```sh
git commit -m "tweak(onboarding): soften the welcome copy"
```

## Writing the subject

- **Lowercase**: `add tip selector`, not `Add tip selector`.
- **Imperative**, as if giving a command: `add`, `fix`, `remove`. A good test: it should finish the sentence "If applied, this commit will…".
- **No full stop** at the end.
- **Under 72 characters**, including the type and scope.

```
❌ Fixed the bug.
❌ feat: Added a new Tip Selector component to the cart screen so users can tip
✅ feat(cart): add tip selector
```

If the why isn't obvious, leave a blank line and explain it in the body. The subject says what; the body says why.

> Older guides, including Chris Beams' classic "How to Write a Git Commit Message", say to capitalise the subject. That was my rule too before 2024. With a `type:` prefix in front, lowercase reads better and is what commitlint's default preset expects, so lowercase it is.

## Small commits

One commit, one idea. Small commits are easier to review, easier to revert and easier to find with `git bisect` when something breaks. If your subject needs an "and", it's probably two commits.

```
❌ feat(cart): add tip selector and fix rounding and rename hooks
✅ feat(cart): add tip selector
✅ fix(cart): round totals to two decimals
✅ refactor(cart): rename useCartTotal to useOrderTotal
```

On a solo branch, it's fine to make messy work-in-progress commits and squash them into clean ones before merging.

## Git hooks

A git hook is a script Git runs at a moment in its lifecycle. The two you'll use most:

- `pre-commit`: runs before the commit is created. Lint, typecheck and test here. If it fails, there's no commit.
- `commit-msg`: runs on the message. Check it follows the convention here.

Hooks live in `.git/hooks`, which isn't versioned. So we use a **hook manager**: a tool that reads a config file committed in the repo and installs the hooks for everyone.

## Lefthook

Lefthook is the hook manager I use. Its config is one YAML file at the root of the repo:

```yaml
# lefthook.yml
pre-commit:
  parallel: true
  commands:
    lint:
      glob: '*.{ts,tsx}'
      run: pnpm biome check {staged_files}
    typecheck:
      run: pnpm tsc --noEmit
    test:
      glob: '*.{ts,tsx}'
      run: pnpm jest --findRelatedTests --passWithNoTests {staged_files}

commit-msg:
  commands:
    commitlint:
      run: pnpm commitlint --edit {1}
```

```sh
pnpm add -D lefthook
pnpm lefthook install    # writes the hooks into .git/hooks
```

`parallel: true` is the point: lint, typecheck and the **related** tests run at the same time, so the hook stays fast enough not to interrupt your flow. `{staged_files}` limits lint and tests to what you're committing.

The `commit-msg` hook runs commitlint. To allow `tweak` and the 72-character limit, extend the preset:

```js
// commitlint.config.js
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test', 'tweak']],
    'header-max-length': [2, 'always', 72],
  },
}
```

## Lefthook over Husky

| | Husky | simple-git-hooks | Lefthook ✓ |
|---|---|---|---|
| Parallel tasks | ❌ | ❌ | ✅ |
| No Node dependency | ❌ | ❌ | ✅ a Go binary |
| Config | shell scripts | a key in `package.json` | one YAML file |

Husky is the popular one, but it runs tasks one after the other and is really just shell scripts with extra steps. simple-git-hooks has zero magic but not enough control for several tasks at once. Lefthook runs them in parallel, and because it doesn't depend on `node_modules`, hooks can't silently fail when dependencies aren't installed. The full write-up is the second example in [[docs/decisions|Engineering - Decision Records]].

## Common mistakes

- **`git commit --no-verify` as a habit.** It skips every hook. If the hook is too slow to live with, fix the hook.
- **Running the whole test suite on commit.** Run related tests on commit and the full suite in CI.
- **Vague subjects** like `fix: stuff` or `chore: updates`. The type doesn't excuse the subject.
- **Mixing two changes** in one commit, so one can't be reverted without the other.

## Try it

1. Rewrite these as Conventional Commits: "Fixed login crash", "New dark mode!!", "Changed button padding".
2. Add Lefthook to a project with a `pre-commit` hook that runs your linter on staged files.
3. Add commitlint with the `tweak` type, then try committing `Update stuff.` and read the error.

## Related

- [[docs/git/git|Git - Basics]]
- [[docs/git/git-history|Git - History]]
- [[docs/git/git-flow|Git - Flow]]
- [[docs/node/node-npm|Node - npm and pnpm]]
- [[docs/decisions|Engineering - Decision Records]]
- [[docs/monorepo|Engineering - Monorepos]]
