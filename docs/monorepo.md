---
title: "Engineering - Monorepos"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["Monorepo", "pnpm workspaces"]
tags: [engineering, node]
---
# Engineering - Monorepos

A monorepo is one repository that holds several projects: say a mobile app, a website and the shared code they both use. Think of it as one kitchen serving two restaurants: the menus are different, but the sauces are made once and shared. Instead of publishing a shared package, bumping its version and updating three repos, you change it once and every app sees the change in the same commit. I build almost everything this way now, with **pnpm workspaces**.

## Why a monorepo

- **One change, one commit.** Rename a function in a shared package and fix every app that uses it, together. No version dance.
- **Shared code is cheap.** Pulling a helper into its own package costs a folder, not a new repo with its own CI and releases.
- **One set of tools.** One lockfile, one TypeScript config, one linter, one set of git hooks.

The cost: installs and CI cover more code, and you need a little structure so it doesn't turn into one giant tangled app. The rest of this lesson is that structure.

## Apps vs packages

Split the repo into two kinds of things:

- **apps**: things you run or deploy. They import packages; nothing imports them.
- **packages**: shared code. Small, focused, each with one job.

```
.
├── apps
│   ├── mobile        # Expo app
│   ├── web           # Next.js site
│   └── storybook     # component playground
├── packages
│   ├── ui            # visual components
│   ├── theme         # colours, typography, spacing
│   ├── price         # formatting and maths for money
│   ├── icons
│   └── config        # shared tsconfig and lint config
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml
```

Dependencies only point one way: apps → packages, and packages → other packages. If two packages need each other, they're really one package.

## pnpm workspaces

pnpm finds your packages through `pnpm-workspace.yaml` at the root:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

An app depends on a sibling package with the `workspace:` protocol. pnpm links the local folder instead of downloading anything:

```json
{
  "name": "@coffee/web",
  "dependencies": {
    "@coffee/price": "workspace:*"
  }
}
```

```sh
pnpm install                         # installs every app and package at once
pnpm --filter @coffee/web dev        # run "dev" in one package
pnpm -r test                         # run "test" in every package that has it
pnpm add zod --filter @coffee/price  # add a dependency to one package
```

The basics of pnpm itself are in [[docs/node/node-npm|Node - npm and pnpm]].

## One package, one front door

Every package has a single public entry: an `index.ts` that exports what other code is allowed to use. Everything else is private, even though it's technically reachable.

```
packages/price/
├── package.json     # "name": "@coffee/price"
├── index.ts         # the front door
├── format.ts
└── round.ts
```

```ts
// packages/price/index.ts
export { formatPrice } from './format'
```

```json
// packages/price/package.json
{
  "name": "@coffee/price",
  "exports": { ".": "./index.ts" }
}
```

The `exports` field makes the front door the only door: importing `@coffee/price/round` fails.

Pointing `exports` straight at the TypeScript source means there's no build step for internal packages: the app's bundler compiles them. Metro (Expo) handles that out of the box; Next.js needs the package listed in `transpilePackages` in `next.config`.

## Import by name, never by path

Across packages, always import by the package's `@scope/name`. Never reach into another package with a relative path.

```ts
// ❌ couples you to another package's folders and skips its front door
import { formatPrice } from '../../../packages/price/format'

// ✅
import { formatPrice } from '@coffee/price'

formatPrice(3.5) // '€3.50'
```

Relative imports are fine **inside** a package. Across packages, the name is the contract: you can move, split or rewrite the internals of `@coffee/price` and nothing outside it breaks.

## Nx and Turborepo

pnpm workspaces install and link packages. They don't know which tasks depend on which, and they don't cache results. That's what build orchestrators add:

| | pnpm workspaces | Turborepo | Nx |
|---|---|---|---|
| Install and link packages | ✅ | uses your package manager | uses your package manager |
| Run a script across packages | ✅ `-r`, `--filter` | ✅ | ✅ |
| Task ordering (build `ui` before `web`) | ⚠️ topological order with `-r` | ✅ | ✅ |
| Cache results, skip unchanged work | ❌ | ✅ | ✅ |
| Only run what a change affects | ⚠️ `--filter` by git diff | ✅ | ✅ |
| Extra config to learn | none | small | larger |

They earn their keep when builds are slow, there are many packages and many people pushing: the cache means CI only rebuilds what changed. A team project I work on uses Nx for exactly that.

For my own projects, I tried Turborepo in 2024 and went back to **plain pnpm workspaces**. With a handful of packages, `--filter` and `-r` cover it, and that's one less tool and one less config. Start without an orchestrator; add one when CI time tells you to.

## Common mistakes

- **Relative imports across packages.** They work until someone moves a folder.
- **Deep imports** like `@coffee/ui/src/button`. Go through the front door, and add `exports` so nobody can do otherwise.
- **A `utils` or `shared` package that grows forever.** Name packages by what they do (`price`, `theme`), not by "misc".
- **Apps importing from other apps.** Move the shared bit into a package.
- **Installing a dependency at the root** that only one package uses. Add it to that package with `--filter`.

## Try it

1. Create a workspace with `apps/web` and `packages/price`, and import `formatPrice` in `web` via `workspace:*`.
2. Add an `exports` field to `price` and confirm a deep import now fails.
3. Run `pnpm -r test` and `pnpm --filter @coffee/price test`. What's the difference in what ran?

## Related

- [[docs/node/node-npm|Node - npm and pnpm]]
- [[docs/node/node-modules|Node - Modules]]
- [[docs/principles|Engineering - Principles]]
- [[docs/commits|Engineering - Commits]]
- [[docs/decisions|Engineering - Decision Records]]
