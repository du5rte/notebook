---
title: "Markdown - Basics"
type: doc
created: 2015-10-14
updated: 2026-10-07
aliases: ["Markdown"]
tags: [tools]
---
# Markdown - Basics

Markdown is a way to write formatted text using plain characters: `#` for a heading, `*` for emphasis, `-` for a list. The file stays readable as plain text, and tools like GitHub, Obsidian and most docs sites turn it into clean HTML. READMEs, pull requests, notes and this whole notebook are written in it.

## Headings

One to six `#`, then a space. More `#` means a smaller, lower-level heading.

```markdown
# Coffee Shop
## Menu
### Hot drinks
```

Use one `#` heading per page, as the title, and don't skip levels. Screen readers and tables of contents rely on the order.

## Paragraphs and line breaks

A blank line starts a new paragraph. A single line break inside a paragraph is ignored, so these two lines become one:

```markdown
We open at 8.
We close at 6.
```

To keep them as separate lines, leave a blank line between them, or end the first line with a backslash `\`.

## Emphasis

```markdown
*italic* or _italic_
**bold**
~~struck through~~
`inline code`
```

*italic*, **bold**, ~~struck through~~, `inline code`. Strikethrough is a GitHub Flavored Markdown extension, supported almost everywhere.

## Lists

```markdown
- Espresso
- Latte
  - with oat milk
- Tea

1. Grind the beans
2. Tamp
3. Brew
```

Indent by two (or four) spaces to nest. In ordered lists the numbers you type don't have to be right: `1.` on every line still renders as 1, 2, 3, which makes reordering easy.

Task lists are another GitHub extension, handy in issues and PRs:

```markdown
- [x] Order milk
- [ ] Fix the grinder
```

## Links and images

The text goes in `[ ]`, the address in `( )`, and an optional hover title in quotes.

```markdown
[Our menu](https://example.com/menu "See today's menu")
[Opening hours](hours.md)
```

An image is a link with `!` in front. The text in `[ ]` is the alt text, read aloud by screen readers and shown if the image fails, so describe the image.

```markdown
![A latte with a heart drawn in the foam](images/latte.jpg)
```

## Code blocks

Wrap code in three backticks and name the language to get syntax highlighting.

````markdown
```js
const order = ['latte', 'croissant'];
order.length // 2
```
````

To show backticks inside a code block, like the example above, wrap it with four.

## Quotes and rules

```markdown
> Please order at the counter.

---
```

`>` makes a blockquote. Three dashes on their own line draw a horizontal rule. (At the very top of a file, `---` starts frontmatter instead, the metadata block these notes use.)

## Tables

Tables come from GitHub Flavored Markdown. Pipes separate columns, and the dashes row separates the header. Colons set alignment.

```markdown
| Drink    | Size  | Price |
| -------- | ----- | ----: |
| Espresso | Small |  1.60 |
| Latte    | Large |  3.20 |
```

The columns don't need to line up in the source; it's just nicer to read.

## Escaping

Put a backslash before a character to show it literally instead of formatting.

```markdown
\*not italic\*
2 \* 3 = 6
```

## Flavours

The original Markdown left a lot undefined, so tools added their own extras. The two to know:

- **CommonMark**: a strict, shared specification of the core syntax.
- **GitHub Flavored Markdown (GFM)**: CommonMark plus tables, task lists, strikethrough and autolinks.

Some tools add more. Obsidian adds `[[wikilinks]]`, and GitHub and Obsidian both draw diagrams from ` ```mermaid ` code blocks. If something renders in one place and not another, it's probably an extension.

## Common mistakes

- **No space after `#` or `-`.** `#Title` is plain text in most renderers. Write `# Title`.
- **No blank line before a list or code block.** Some renderers glue it onto the paragraph above.
- **Expecting a single line break to show.** Use a blank line between paragraphs.
- **Empty alt text on meaningful images.** Describe what the image shows.

## Try it

1. Write a README for a coffee shop with a title, a short paragraph, a menu table and a link to an hours page.
2. Add a task list of three jobs for opening the shop, with one done.
3. Add a JavaScript code block that prints the menu, and check it's highlighted in a Markdown preview.

## Related
- [[docs/regex|Regex - Basics]]
- [[docs/html/html-text|HTML - Text]]
- [[docs/git/git-flow|Git - Flow]]
