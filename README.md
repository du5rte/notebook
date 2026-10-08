# notebook

My development notebook, set up as an [Obsidian](https://obsidian.md) vault.

- [docs/](docs/index.md): reference notes on web, JavaScript, Node, systems, languages, ML and tools
- [wiki/](wiki/index.md): knowledge distilled from sources in `raw/`
- [archive/](archive/index.md): tools I no longer use

## Use

1. **Read:** open the folder as a vault in Obsidian and start at [docs/index.md](docs/index.md). Each note ends with a Related section.
2. **Add a source:** drop an article, transcript or paper into `raw/` (or paste a URL to Claude), then run `/ingest` in Claude Code. It writes the wiki pages, index and log.
3. **Check health:** `/lint` reports broken links, orphans, stale pages and missing frontmatter.

Conventions (layout, naming, frontmatter) are in [CLAUDE.md](CLAUDE.md). Pending work is in [TODO.md](TODO.md).
