---
title: "Node - npm and pnpm"
type: doc
created: 2015-10-11
updated: 2026-10-07
aliases: [npm, pnpm]
tags: [node]
---
# Node - npm and pnpm

npm is the package manager that comes with Node. It downloads other people's code (packages) into our project, keeps a list of what we depend on in `package.json`, and runs our project's commands. Think of `package.json` as the recipe card for a project: anyone can take it, run one command, and end up with the same ingredients. We learn npm first because it ships with Node, then switch to pnpm, which I use everywhere.

## package.json

Every Node project starts with one. `npm init` asks a few questions; `npm init -y` accepts the defaults.

```sh
npm init -y
```

```json
{
  "name": "coffee-shop",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^5.1.0"
  },
  "devDependencies": {
    "eslint": "^9.0.0"
  }
}
```

- `name` and `version` identify the project.
- `type: "module"` turns on ES modules: see [[docs/node/node-modules|Node - Modules]].
- `scripts` are commands we can run with npm.
- `dependencies` are needed to run the app; `devDependencies` only while building or testing it.

## Installing packages

```sh
npm install express        # add to dependencies
npm install -D eslint      # add to devDependencies
npm install                # install everything listed in package.json
npm uninstall express      # remove it
```

`npm i` is short for `npm install`. Packages land in a `node_modules` folder, and we import them by name:

```js
import express from 'express'
```

`node_modules` can be huge and is always rebuilt from `package.json`, so never commit it. Add it to `.gitignore`:

```
node_modules/
.env
```

## Semantic versioning

Package versions follow `MAJOR.MINOR.PATCH`, and each number promises something.

| Bump | Example | Means |
|---|---|---|
| PATCH | `2.1.4` → `2.1.5` | bug fixes only |
| MINOR | `2.1.4` → `2.2.0` | new features, nothing broken |
| MAJOR | `2.1.4` → `3.0.0` | something that worked before may break |

The symbol in front of a version in `package.json` says how far npm may update it:

| Range | Allows | Example: `2.1.4` can become |
|---|---|---|
| `^2.1.4` | minor and patch | `2.9.0`, not `3.0.0` |
| `~2.1.4` | patch only | `2.1.9`, not `2.2.0` |
| `2.1.4` | exactly this | `2.1.4` only |

`^` is npm's default and a sensible one, as long as package authors respect the rules.

## The lockfile

`package.json` says "any `^2.1.4`". `package-lock.json` records exactly which version of every package (and every package's packages) was installed. Commit it. That's how your teammate, your CI and your server all get the identical tree.

| Command | Use it when |
|---|---|
| `npm install` | developing: may update the lockfile within the allowed ranges |
| `npm ci` | CI and deploys: installs exactly what the lockfile says, fails if it doesn't match `package.json` |

## Scripts

`scripts` give a project short, shared names for its commands. Everyone runs `npm test` and doesn't need to remember the tool behind it.

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "node --watch server.js",
    "test": "node --test",
    "lint": "eslint ."
  }
}
```

```sh
npm start      # node server.js
npm test       # node --test
npm run dev    # custom names need "run"
npm run lint
```

Scripts can use any package in `node_modules/.bin` by name, so `eslint` works here without a global install. Chain them with `&&` to run one after another:

```json
"check": "npm run lint && npm test"
```

## npx

`npx` runs a package's command without adding it to the project. Handy for one-off tools and project generators.

```sh
npx eslint .                 # uses the local copy if installed
npx create-vite my-app       # downloads, runs, and doesn't keep it
```

This is also why we rarely install packages globally (`npm install -g`) any more: `npx` or a project script does the same job, and each project keeps its own version.

## Keeping up to date

```sh
npm outdated   # what's behind, and by how much
npm update     # update within the ranges in package.json
npm audit      # known security issues in your dependency tree
```

To jump a major version, install it explicitly (`npm install express@latest`) and read its changelog first.

## Publishing (briefly)

To share your own package on the npm registry, bump the version and publish.

```sh
npm version patch   # 1.0.0 → 1.0.1, also makes a git tag
npm publish
```

The npm docs cover accounts, scopes and access in full.

## pnpm: the one I use 🥇

Everything above is npm, because it ships with Node and every tutorial assumes it. For your own projects, I recommend **pnpm**. It reads the same `package.json`, uses the same semver ranges and runs the same scripts. It just does the installing better.

| | npm | pnpm |
|---|---|---|
| Install speed | ⚠️ fine | ✅ fast |
| Disk space | ❌ a full copy of every package in every project | ✅ one shared store on your machine, linked into each project |
| `node_modules` | ⚠️ flat: you can import packages you never installed | ✅ strict: you can only import what's in your `package.json` |
| Monorepos | ⚠️ workspaces, basic | ✅ workspaces, first class |
| Lockfile | `package-lock.json` | `pnpm-lock.yaml` |

The strict `node_modules` is the quiet win. With npm's flat folder, your code can import a package that's only there because something else depends on it (a "phantom dependency"). It works until that other package drops it, then breaks. pnpm doesn't let that happen.

```sh
npm install -g pnpm      # once per machine

pnpm install             # npm install
pnpm add express         # npm install express
pnpm add -D eslint       # npm install -D eslint
pnpm remove express      # npm uninstall express
pnpm dev                 # npm run dev (no "run" needed)
pnpm dlx create-vite     # npx create-vite
```

In CI, `pnpm install` refuses to change the lockfile, so it already behaves like `npm ci`.

**Workspaces** let one repo hold several packages, say an app and a shared UI library, that depend on each other. List them in a `pnpm-workspace.yaml` at the root:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

```sh
pnpm install                          # installs every package in one go
pnpm --filter web dev                 # run "dev" in the package named web
pnpm add zod --filter web             # add a dependency to one package
```

A package depends on a sibling with `"ui": "workspace:*"` in its `package.json`, and pnpm links the local folder instead of downloading anything.

Pick one package manager per project and stick to it: one lockfile, never both.

## Common mistakes

- **Mixing package managers.** A `package-lock.json` next to a `pnpm-lock.yaml` means two sources of truth. Delete the one you don't use.
- **Committing `node_modules`.** Commit `package.json` and `package-lock.json` instead.
- **Deleting the lockfile to "fix" an install.** You lose the exact versions that were working. Try `npm ci` first.
- **`npm run start` vs `npm start`.** Both work, but custom scripts like `dev` always need `run`.
- **Putting build tools in `dependencies`.** Linters, test runners and bundlers belong in `devDependencies`.

## Try it

1. Make a folder, run `npm init -y`, then install one package and one dev package. Look at what changed in `package.json`.
2. Add a `dev` script that runs your app with `node --watch` and start it with `npm run dev`.
3. In `package.json`, what versions could `~1.4.2` and `^1.4.2` each install?
4. Redo exercise 1 with pnpm (`pnpm add`, `pnpm add -D`) and compare the lockfile it writes.

## Related
- [[docs/node/node|Node - Basics]]
- [[docs/node/node-modules|Node - Modules]]
- [[docs/javascript/javascript|JavaScript - Basics]]
- [[docs/git/git|Git - Basics]]
