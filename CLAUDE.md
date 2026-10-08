# Notebook

Duarte's programming documentation and learning notes. One Obsidian vault, plain markdown, versioned in git.

## Layout

```
raw/       source material (articles, videos, papers). Never edited after it lands.
wiki/      agent-maintained knowledge: sources/ entities/ concepts/ synthesis/, plus index.md and log.md
docs/      legacy notebook, human-written: <name>.md, or <name>/<note>.md for a language or tool with several notes (css/, node/, git/...), plus index.md
archive/   tools I no longer use, same layout as docs/, plus index.md. Out of the main index, still searchable.
```

New `docs/` note: a language or tool with several notes gets its own folder (`docs/git/basics.md`, `docs/git/branching.md`); anything else is a single file (`docs/docker.md`), not grouped into a category folder. List it under its area in `docs/index.md` (in a folder, `basics` first, then A-Z).

Old notes: if I still use the tool but the note is written for an old version, keep it in `docs/` with `status: outdated`. Move it to `archive/` only once I no longer use the tool. `archive/` follows the same layout as `docs/`:
- a tool with several separate notes gets a folder: `archive/jquery/basics.md`, `archive/jquery/ajax.md`
- anything else is a single file: `archive/coffeescript.md`, `archive/sass.md`
- an archived technique of a language I still use goes in that language's folder: `archive/javascript/ajax.md`

Max two levels deep; no area folders above topics. Areas (Web, JavaScript, Systems...) are sections in `docs/index.md`. Diagrams are Mermaid in the note, or `.svg` beside it.

## Rules

- Never edit `raw/`. To fix a source, replace the file and re-ingest.
- `docs/` is mine. Mechanical changes only (frontmatter, renames, link fixes) unless asked.
- Never invent facts, dates or URLs. Omit a field rather than guess it.
- Use `git mv` for moves. Do not commit unless asked.
- Update `wiki/index.md` and `wiki/log.md` in the same run as the change.

## Naming and links

- Filenames: lowercase kebab-case. One H1 matching `title`.
- `[[wikilinks]]`, on first meaningful mention. Link to missing pages rather than skip. They become the "Gaps" list in the index.
- Alternate names go in `aliases`, not in duplicate pages.

## Frontmatter

```yaml
---
title:
type: doc | source | entity | concept | synthesis
created: YYYY-MM-DD
updated: YYYY-MM-DD
aliases: []
tags: []       # two or three, one word, lowercase; propose new ones, don't invent silently
status: draft  # optional. draft = incomplete; outdated = written for an old version of something I still use
---
```

Sources add `url`, `author`, `published`. Entities add `kind: person | org | product | tool`. Dates for `docs/` come from `git log`.

## Wiki page types

- **source**: what one item said, claims as claims, with url. No evaluation.
- **entity**: what this person, org or tool is and what mentions it. Not a biography.
- **concept**: an idea in plain language: origin, support, objections, open questions. The only type that synthesises across sources.
- **synthesis**: only when it says something no single source did. Never write one just to have one.

Commands, snippets and recipes are reference and belong in `docs/`.

## Workflows

- **Ingest**: `/ingest` skill (`.claude/skills/ingest`).
- **Lint**: `/lint` skill (`.claude/skills/lint`). Report only.
- **Query**: read `wiki/index.md` first, then `docs/index.md`. Open only relevant pages and answer with `[[links]]`. Say when the vault doesn't cover it.
