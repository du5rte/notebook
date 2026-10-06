---
name: ingest
description: Ingest a source from raw/ into the wiki. Use when the user says "ingest", adds a file to raw/, or shares an article, video transcript or paper to file into the vault.
---

# Ingest

Turn one source into wiki pages. Conventions (frontmatter, page types, naming) are in `CLAUDE.md`.

## Input

- A path in `raw/`, or
- A URL or pasted text: save it to `raw/<kebab-title>.md` first, with the original URL at the top. Never edit it afterwards.

If the argument is ambiguous or `raw/` has several un-ingested files, list them and ask which.

## Steps

1. Read the source fully.
2. Read `wiki/index.md` to see what already exists. Search `wiki/` and `docs/` for the source's main topics.
3. Create `wiki/sources/<kebab-title>.md`, `type: source`, with `url`, `author` and `published` only if known. Record what the source claims, as claims, with no evaluation.
4. For each entity (person, org, product, tool) and concept it meaningfully covers:
   - If the page exists, add what this source contributes, link the source, and bump `updated`. If the source contradicts the page, say so on the page and tag it `disputed`.
   - Otherwise, create it in `wiki/entities/` or `wiki/concepts/`.
   - Skip passing mentions.
5. Link related `docs/` notes from concept pages where relevant. Don't edit `docs/`.
6. Synthesis pages only if the source creates a genuine cross-source finding. Usually none.
7. Update `wiki/index.md`: one line per new page under the right type and theme, and refresh the Gaps list (linked but missing pages).
8. Append one line to `wiki/log.md`: `YYYY-MM-DD ingest raw/<file> -> N source, N concepts, N entities, N links`.

## Report

What was created, what was updated, any contradictions found, and new gaps. Don't commit.
