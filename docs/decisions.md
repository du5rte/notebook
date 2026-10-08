---
title: "Engineering - Decision Records"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["ADR", "Architecture Decision Records", "Utilities Libraries"]
tags: [engineering, architecture]
---
# Engineering - Decision Records

An Architecture Decision Record (ADR) is a one-page note that says what we chose, what else we looked at, and why. Every project is full of decisions that look strange from the outside: "why Lefthook and not Husky?", "why isn't Lodash in here?". Without a record, the answer lives in someone's head, and six months later the team argues the same thing again. An ADR is a receipt for a decision: short, dated by git, and easy to find when someone asks.

## When to write one

Write an ADR when a choice is **hard to reverse** or **likely to be questioned**: a library, a tool, a pattern the whole codebase follows. Don't write one for a variable name.

A good test: if a new teammate would reasonably ask "why did we do it this way?", that's an ADR.

## Where they live

One file per decision, numbered, in the repo next to the code:

```
docs/decisions/
├── 0001-lefthook-over-husky.md
├── 0002-apollo-over-tanstack-query.md
└── 0003-mmkv-over-async-storage.md
```

The filename is `000N-x-over-y.md`: the number keeps them in order, and the title **is the decision**. You can read the folder listing and know what the project uses.

ADRs are never edited to change the answer. If you change your mind, write a new one ("0007-biome-over-eslint") that supersedes the old one.

## The template

```markdown
# Lefthook over Husky

## Context
What problem are we solving? One or two sentences.

## Options considered
### Option A
One line on what it is, then ✅ / ❌ points.
### Option B ✓
...

## Decision
**Option B.** The one reason that settled it.

## Why not A
What would have to change for A to win.
```

Keep it to one page with a verdict and no hedging. Mark the winner with ✓, or a 🥇🥈🥉 podium when you're ranking several. If the comparison is wide, put a `TLDR;` table at the top and the details below.

## Example 1: utility libraries

A full ADR on which utility library to use, with Lodash as the incumbent.

### TLDR;

| | | |
|---|---|---|
| 🥇 | Type-safe and composable | **Remeda** |
| 🥈 | Super light, one-function utilities | **just** |
| 🥉 | Schema-based projects | **Zod** utils |

### Lodash

The best-known JavaScript utility library, and the best-known cause of big bundles ❌.

```ts
import _ from 'lodash'

_.omit({ name: 'Ana', password: 'secret' }, ['password']) // { name: 'Ana' }
```

Importing one function at a time (`import omit from 'lodash/omit'`) lets bundlers drop the rest ⚠️. But some functions mutate their input ❌:

```ts
import set from 'lodash/set'

const order = { drink: 'latte' }
const updated = set(order, 'size', 'large')

order   // { drink: 'latte', size: 'large' }  the original changed too
updated // { drink: 'latte', size: 'large' }
```

`lodash/fp` fixes that with immutable, curried, data-last functions. ❌ I just find it difficult to use.

### Remeda ✓

Functional, composable and written for TypeScript ✅. Every function is tree-shakable and none of them mutate. Call them data-first, or data-last inside a `pipe`:

```ts
import { omit, pipe, set } from 'remeda'

const user = { name: 'Ana', email: 'ana@example.com', password: 'secret' }

omit(user, ['password']) // { name: 'Ana', email: 'ana@example.com' }

const publicUser = pipe(user, omit(['password']), set('name', 'Ana Silva'))
// { name: 'Ana Silva', email: 'ana@example.com' }
user.name // 'Ana' (unchanged)
```

### just

Super tiny, one package per function. Perfect when you need just one or two helpers.

```ts
import omit from 'just-omit'

omit({ name: 'Ana', password: 'secret' }, ['password']) // { name: 'Ana' }
```

### Comparison

| Library | API style | Type safety 🔒 | Tree-shakable 🌲 | Immutable 🔁 | Best for |
|---|---|---|---|---|---|
| Lodash | `_.set` | ⚠️ partial | ❌ not fully | ❌ | legacy projects |
| lodash/fp | curried, data-last | ⚠️ decent | ⚠️ somewhat | ✅ | FP fans who know Lodash |
| **Remeda** | FP, TS-native | ✅ excellent | ✅ | ✅ | TypeScript-first code |
| **just** | one-liners | ✅ great | ✅ tiny packages | ✅ | lightweight helpers |
| Ramda | Haskell-style FP | ❌ weak | ⚠️ meh | ✅ | hardcore FP fans |
| Zod utils | schema methods (`.pick`, `.omit`) | ✅ great | ✅ | ✅ | form and API validation |

### Why not Lodash

Bundle size and mutation. Most of what we used it for is built into the language now (`Object.entries`, `Array.prototype.flat`, `structuredClone`). For the rest, Remeda gives the same helpers with real types. Reach for Immer only when you need deep immutable updates.

## Example 2: Git hook manager

A short one. This is the whole ADR.

**Context.** Enforce lint, type checks and tests at commit time in a React Native / Expo monorepo.

**Options considered.**
- **Husky**: popular, but slow with no parallel execution, and v9 brought breaking changes. Shell scripts with extra steps.
- **simple-git-hooks**: zero magic, maps hooks to commands in `package.json`. Not enough control for several parallel tasks.
- **Lefthook ✓**: a Go binary, so no Node dependency. Parallel execution out of the box. One clean YAML config.

**Decision.** **Lefthook.** Parallel pre-commit (lint + `tsc` + tests) keeps hooks fast enough not to interrupt flow, and there's no risk of hooks silently failing because `node_modules` is missing.

The config itself is in [[docs/commits|Engineering - Commits]].

## Common mistakes

- **Surveying without a verdict.** A list of options isn't a decision. Pick one.
- **Editing an old ADR** to match today's code. Write a new one that supersedes it; the old reasoning is part of the history.
- **Writing it months later.** The "options considered" part is only honest while you still remember them.
- **Too long.** If it's more than a page, the context section is doing a design doc's job.

## Try it

1. Write `0001-x-over-y.md` for a library your current project already uses. Can you still say why it won?
2. Turn the Lodash vs Remeda comparison into an ADR for your own project, with your own verdict.
3. Find a decision in your codebase that confused you when you joined. Write the ADR you wish had existed.

## Related

- [[docs/principles|Engineering - Principles]]
- [[docs/commits|Engineering - Commits]]
- [[docs/monorepo|Engineering - Monorepos]]
- [[docs/markdown|Markdown - Basics]]
