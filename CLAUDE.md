# Notebook

Duarte's programming documentation and learning notes. One Obsidian vault, plain markdown, versioned in git.

## Layout

```
raw/       source material (articles, videos, papers). Never edited after it lands.
wiki/      agent-maintained knowledge: sources/ entities/ concepts/ synthesis/, plus index.md and log.md
docs/      legacy notebook, human-written: <topic>/<note>.md (css/, node/, git/...), plus index.md
archive/   superseded tools, libraries and API versions: <topic>/<note>.md, plus index.md. Out of the main index, still searchable.
```

New `docs/` notes go in the matching topic folder and get a line under their area in `docs/index.md` (`basics` first, then alphabetical).

Archive a note when following it today would mislead (tool dead, API superseded). Keep fundamentals even if old:
- Library still alive but the note is outdated: move the still-valid fundamentals (concepts, principles, patterns) into a `docs/` note, link it to the archived original (`Fundamentals kept from [[archive/...]]`), and archive the rest. Merge into newer notes on the same topic when they exist.
- Tool completely obsolete (jQuery, Bower, Gulp, CoffeeScript...): archive whole, nothing kept.

Max two levels deep; no area folders above topics. Areas (Web, JavaScript, Systems...) are sections in `docs/index.md`. No binary or raster files (`.png`, `.ai`, `.pdf`). Diagrams are Mermaid in the note, or `.svg` beside it.

## Rules

- Never edit `raw/`. To fix a source, replace the file and re-ingest.
- `docs/` is mine. Mechanical changes only (frontmatter, renames, link fixes) unless asked.
- Never invent facts, dates or URLs. Omit a field rather than guess it.
- Use `git mv` for moves. Do not commit unless asked.
- Update `wiki/index.md` and `wiki/log.md` in the same run as the change.

## Naming and links

- Filenames: lowercase kebab-case, no numeric prefixes. One H1 matching `title`.
- `[[wikilinks]]`, on first meaningful mention. Link to missing pages rather than skip. They become the "Gaps" list in the index.
- Alternate names go in `aliases`, not in duplicate pages.
- Drafts use `status: draft`, not a `_` prefix.

## Frontmatter

```yaml
---
title:
type: doc | source | entity | concept | synthesis
created: YYYY-MM-DD
updated: YYYY-MM-DD
aliases: []
tags: []       # two or three, one word, lowercase; propose new ones, don't invent silently
status: draft  # optional
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
