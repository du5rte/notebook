---
name: lint
description: Health-check the vault and report problems without fixing them. Use when the user says "lint", "check the vault", or asks what's broken, stale or missing.
---

# Lint

Report only. Fix nothing unless the user asks afterwards. Conventions are in `CLAUDE.md`.

## Checks

Run over `docs/`, `wiki/`, `archive/` and `saved/` (skip `raw/`):

1. **Frontmatter**: missing, or missing required fields (`title`, `type`, `tags`). Wiki pages also need `created`/`updated`. `type` must match the folder (`docs/`, `archive/` and `saved/` use `doc`; `wiki/sources/` uses `source`, and so on).
2. **Headings**: exactly one H1, matching `title`. Ignore `#` lines inside code fences.
3. **Naming**: not lowercase kebab-case, numeric prefixes, `_` prefixes, nesting deeper than `<folder>/<topic>/<note>.md`.
4. **Links**: broken `[[wikilinks]]`. Ignore `[[...]]` inside code, such as JS arrays. Orphans: notes nothing links to, indexes aside.
5. **Indexes**: `docs/` notes missing from `docs/index.md`, wiki pages missing from `wiki/index.md`, index entries pointing nowhere, an outdated Gaps list.
6. **Duplicates**: notes covering the same topic, or the same title or alias twice.
7. **Staleness**: wiki pages whose `updated` is over a year old. `docs/` notes on fast-moving tech that look superseded: suggest archiving them.
8. **Contradictions**: wiki pages that disagree with each other or with their sources.
9. **Files**: binary or raster files (`.png`, `.ai`, `.pdf`), files that aren't markdown or SVG.

A script is fine for the mechanical checks (1–5, 9). Judge 6–8 by reading.

## Report

Group by check, as `path: problem`, most important first. End with counts and up to three suggested fixes. Don't commit.
