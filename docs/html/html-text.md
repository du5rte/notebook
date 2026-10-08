---
title: "HTML - Text"
type: doc
created: 2016-03-18
updated: 2026-10-07
tags: [html]
---
# HTML - Text

Most of the web is text. HTML gives us elements to say what each piece of text *is*: a heading, a paragraph, a list, a quote, some code. The browser gives each one a default style, but the point is meaning. Style comes later with CSS. In this lesson we mark up a small café blog post from top to bottom.

## Headings

There are six levels, `<h1>` to `<h6>`. Think of them as the outline of a book: one title, then chapters, then sub-chapters.

```html
<h1>Ana's Coffee Shop</h1>
<h2>Menu</h2>
<h3>Hot drinks</h3>
<h3>Cold drinks</h3>
<h2>Opening hours</h2>
```

Use one `<h1>` per page and don't skip levels. Screen reader users often jump from heading to heading to find their way, so the outline matters more than the size. If `<h2>` looks too big, change it with CSS.

## Paragraphs and line breaks

`<p>` is for a paragraph. The browser collapses extra spaces and new lines in your markup into a single space.

```html
<p>We open at 8.
   Come early,     the croissants go fast.</p>
<!-- shows: We open at 8. Come early, the croissants go fast. -->
```

`<br>` forces a line break. Use it only where the line break is part of the content, like a poem or an address, not to add space.

```html
<p>
  Roses are red,<br>
  coffee is brown.
</p>
```

`<wbr>` marks a spot where a long word *may* break if it runs out of room, handy for long URLs.

```html
<p>visit anascoffee<wbr>shop<wbr>.example</p>
```

## Lists

- `<ul>`: unordered list, where order doesn't matter (bullets).
- `<ol>`: ordered list, where order matters (numbers).
- `<li>`: each item, in either one.

Lists can be nested inside a list item.

```html
<ol>
  <li>Grind the beans</li>
  <li>Heat the water
    <ul>
      <li>About 93°C</li>
      <li>Not boiling</li>
    </ul>
  </li>
  <li>Pour and wait</li>
</ol>
```

A description list `<dl>` pairs terms `<dt>` with descriptions `<dd>`. It is less common, but perfect for glossaries or key/value details.

```html
<dl>
  <dt>Espresso</dt>
  <dd>A small, strong shot of coffee.</dd>
  <dt>Latte</dt>
  <dd>Espresso with lots of steamed milk.</dd>
</dl>
```

## Links

`<a>` (anchor) links to another page, a file, or a spot on the same page.

```html
<a href="menu.html">Our menu</a>                    <!-- page on our site -->
<a href="https://example.com">An external site</a>  <!-- another site -->
<a href="#hours">Jump to opening hours</a>         <!-- same page -->

<h2 id="hours">Opening hours</h2>
```

Write link text that makes sense on its own. "See the menu" is better than "click here", because screen reader users often list all the links on a page.

## Emphasis: strong and em vs b and i

These pairs look the same by default, but they mean different things.

| Element | Meaning | Default look |
|---------|---------|-------------|
| `<strong>` | important, serious, urgent | bold |
| `<em>` | stress emphasis, changes how you'd say it | italic |
| `<b>` | draw attention, no extra importance (keywords, product names) | bold |
| `<i>` | different voice: a foreign word, a thought, a technical term | italic |

```html
<p><strong>Warning:</strong> the cup is hot.</p>
<p>I said a <em>small</em> coffee.</p>
<p>The French call it <i lang="fr">café au lait</i>.</p>
```

If you only want bold for looks, use CSS `font-weight` instead.

## Quotes and citations

`<blockquote>` is for a longer quote on its own. `<q>` is for a short quote inside a sentence, and the browser adds the quote marks. `<cite>` is for the title of a work: a book, a film, a song.

```html
<blockquote>
  <p>I think, therefore I am.</p>
</blockquote>

<p>Descartes wrote <q>I think, therefore I am</q>.</p>

<p>My favourite book is <cite>A Tale of Two Cities</cite> by Charles Dickens.</p>
```

## Code and preformatted text

`<code>` marks a bit of code and uses a monospace font. `<pre>` keeps every space and line break exactly as written. Together they show blocks of code.

```html
<p>Call <code>greet()</code> to say hi.</p>

<pre><code>function greet(name) {
  return `Hi ${name}`
}</code></pre>
```

Start the code right after `<pre><code>`, because `<pre>` keeps the indentation and new line you put before it too.

## Small but useful

```html
<!-- Abbreviation, with the full form in title -->
<p>We use <abbr title="Hypertext Markup Language">HTML</abbr>.</p>

<!-- Contact details for the page or article author -->
<address>
  Ana's Coffee Shop<br>
  12 Market Street
</address>

<!-- A thematic break between sections of content -->
<hr>
```

`title` on `<abbr>` only shows on mouse hover, so on touch screens and for many screen readers it's invisible. Spell the term out the first time you use it.

## Special characters

Some characters mean something to HTML, so we write them as *entities*. `&lt;` is `<`, `&gt;` is `>` and `&amp;` is `&`.

```html
<p>5 &lt; 10 &amp; 10 &gt; 5</p>
<!-- shows: 5 < 10 & 10 > 5 -->

<p>10&nbsp;km</p>
<!-- &nbsp; is a non-breaking space: "10" and "km" stay on the same line -->
```

With `<meta charset="utf-8">` you can type most other characters directly: é, ☕, €. In CSS `content`, use the hex code instead: `content: '\00A0'` is a non-breaking space. The full list of named entities is on MDN.

## Common mistakes

- Picking headings by size instead of by outline.
- Using `<br><br>` to make space. Use separate paragraphs, or margin in CSS.
- Closing tags in the wrong order: `<p><strong>Hot</p></strong>`. Close the inner one first.
- Typing a raw `<` in text. Write `&lt;` instead.

## Try it

1. Mark up a recipe with an `<h1>`, an ingredients `<ul>` and a numbered `<ol>` of steps.
2. Add a link at the top that jumps to the steps.
3. Write a sentence where `<em>` changes the meaning, and one where `<strong>` marks a warning.

## Related

- [[docs/html/html|HTML - Basics]]
- [[docs/html/html-media|HTML - Images and Media]]
- [[docs/html/html-tables|HTML - Tables]]
- [[docs/css/css-fonts|CSS - Fonts]]
