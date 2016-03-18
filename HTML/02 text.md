# HTML - Text

## Headline
Used for Headlines from `<h1>` to `<h6>`

```html
<h1>This is a level 1 headline</h1>
<h3>This is a level 3 headline</h3>
```

## Paragraph
Used for normal Paragraph text

```html
<p>This is a paragraph</p>
```

## Lists


Used for to create ordered `<ol>` (numbered) lists and unordered `<ul>` (not numbered) lists and `<li>` for list items

```html
<ol>
	<li>First item</li>
	<li>Second item</li>
	<li>Third item

		<!-- different lists can be mixed together -->
		<ul>
			<li>First Indented item</li>
			<li>Second Indented item</li>
		</ul>

	</li>
	<li>Last item</li>

</ol>
```

## Definition Lists
Used for definition lists, defition titles and definitions **Very uncommon**

```html
<dl>
	<dt>Video Pros</dt>
	<dd>Jon</dt>
	<dd>Michael</dt>
	<dd>Teachers</dt>
</dl>
```

## Anchor
Used to link to page elements and inside or external links

```html
<a href="#some_text">My Link</a>
	<p id="some_text"></p>
<a href="another_page.html">Another page</a>
<a href="http://google.com">Take me to Google!</a>
```

## Emphasis or Italic
Used give text emphasis, by default it italicizes text

```html
<p>This is <em>emphasised</em> and <i>italicized</i> text</p>
```

## Strong or Bold
Used to make a text look bolder, by default it makes text bolder

```html
<p>This text could be <strong>stronger</strong> and <b>bolder</b></p>
```

## Horizontal Rule
Used to break up text with a line

```html
<hr>
```

## Quotes
Used for quotes, `cite` references the origin

Block quotes indent text by default
```html
<blockquote cite="http://example.com/philosophy.html">
	A wise man once said
	I think,
	therefor I am
</blockquote>
```
Inline quoting text, adds quotes by default

```html
<p>A wise man once said <q cite="http://example.com/philosophy.html" >I think, therefor I am</q></p>
```

## code
Used for showcasing code, uses a monospace font by default

```html
<code>
	(function exec(sth) {
		return sth
	})()
</code>
```

## Preformatted
Render the space in the markup, is indented by default

```html
<pre>
	Here is some text,
		It is ...
			 Preformatted!
</pre>
```

Often used together when showcasing code
```html
<pre>
	<code>
		(function exec(sth) {
			return sth
		})()
	</code>
</pre>
```

## Break
Used to break up a line of text

```html
<p>
	This is the first line of the poem.<br>
	This is the second line.
</p>
```

## Word Break
Used for line break opportunity, only breaks text if there's not enough space

```html
<p>think<wbr>vitamin.com</p>
```

## Abbreviation
Used for acronyms, we can add a hover title to show the full meaning

```html
<p>I know how to use <abbr title="Self Contained Underwater Breathing Apparatus">SCUBA</abbr> gear.</p>
```


## Address
Used for addresses, by default it Italicized text

```html
<address>
	Nick Pettit<br>
	1234 Example Road<br>
	Metropolis
</address>
```


## Cite
Used for titles of books, movies, plays, etc. Italisized by default

```html
<p>My favourite book is <cite>A tale of Two cities</cites> by Charles Dickens.</p>
```


## Unicode
Unicode can be displayed in a few way with [charref](https://dev.w3.org/html5/html-author/charref) using `&` or using style content with an `unicode`

```html
<!--
	Non-breaking Space
	Useful to force html to render space
-->
&nbsp;
&#x00A0;
<style> span:after { content: '\00A0' } </style>
```

```html
<!-- Font-awesome -->
&#xf00d
<span class="delete">&#xf00d<span>
<style> .icon:after { family-font: FontAwesome; content: '\f00d' } </style>
```
