# notebook

My development notebook, set up as an [Obsidian](https://obsidian.md) vault.

- [docs/](docs/index.md): lessons on the tech I use, written to teach from
- [wiki/](wiki/index.md): knowledge distilled from sources in `raw/`
- [archive/](archive/index.md): tools I no longer use
- [stack/](stack/index.md): everything I have used, with status: using, trying, watching, legacy or dropped
- [saved/](saved/ui-kits.md): UI kits, icons, fonts and design links I've bookmarked

## Use

1. **Read:** open the folder as a vault in Obsidian and start at [docs/index.md](docs/index.md). Each note ends with a Related section.
2. **Add a source:** drop an article, transcript or paper into `raw/` (or paste a URL to Claude), then run `/ingest` in Claude Code. It writes the wiki pages, index and log.
3. **Check health:** `/lint` reports broken links, orphans, stale pages and missing frontmatter.

Conventions (layout, naming, frontmatter) are in [CLAUDE.md](CLAUDE.md). How I write and work, for me and for AI tools, is in [VOICE.md](VOICE.md). Pending work is in [TODO.md](TODO.md).
