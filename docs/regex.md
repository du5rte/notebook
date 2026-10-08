---
title: "Regex - Basics"
type: doc
created: 2016-03-18
updated: 2026-10-07
aliases: ["Regular Expressions"]
tags: [tools]
---
# Regex - Basics

A regular expression (regex) is a small pattern that describes text: "three digits, a dash, three digits". We use them to check that input looks right, find things inside text, and search and replace. They look cryptic at first, but they're built from a handful of pieces, and the same pieces work in JavaScript, `grep`, your editor's search box and almost every language.

## Why not just write code?

Say we want to check a phone number like `407-555-1212`. By hand, we'd test each character in turn:

```js
if (phone[0] >= '0' && phone[0] <= '9' && phone[1] >= '0' /* ...and on, for 12 characters */) {}
```

With a regex, the whole rule fits on one line:

```js
/^\d{3}-\d{3}-\d{4}$/.test('407-555-1212')   // true
/^\d{3}-\d{3}-\d{4}$/.test('407-5555-1212')  // false
```

By the end of this lesson you'll be able to read every part of that.

## Writing a regex in JavaScript

A regex goes between two slashes, with optional flags after the last one. If the pattern is built from a string, use `new RegExp`.

```js
const latte = /latte/i;                 // literal
const fromString = new RegExp('latte', 'i');  // same thing
```

The methods you'll use most:

| Method | Returns | Use it to |
| --- | --- | --- |
| `regex.test(str)` | `true` / `false` | Check if text matches |
| `str.match(regex)` | First match, or all matches with `g`, or `null` | Pull matches out |
| `str.matchAll(regex)` | An iterator of every match with its groups | Loop over matches |
| `str.replace(regex, x)` | A new string | Search and replace |
| `str.split(regex)` | An array | Split on a pattern |

## Literal characters and "or"

Most characters just match themselves. `|` means "or".

```js
/407/.test('407-555-1212')        // true
/321/.test('407-555-1212')        // false
/boat|ship/.test('a big ship')    // true
```

## Character classes

Square brackets match **one** character from a set. A dash inside makes a range, and `^` at the start means "anything except".

```js
'Captain Hook'.match(/[A-Z]/g)    // ['C', 'H']
/[aeiou]/.test('rhythm')          // false
/[^0-9]/.test('2026')             // false: nothing that isn't a digit
```

The common sets have shortcuts. The capital letter means the opposite.

| Shortcut | Matches | Opposite |
| --- | --- | --- |
| `\d` | a digit, `[0-9]` | `\D` not a digit |
| `\w` | a word character, `[A-Za-z0-9_]` | `\W` |
| `\s` | whitespace: space, tab, new line | `\S` |
| `.` | any character except a new line | |

```js
'Order 12 lattes and 3 teas'.match(/\d+/g)   // ['12', '3']
'Order 12 lattes'.replace(/\D/g, '')         // '12'
```

## Escaping special characters

Characters like `. * + ? ( ) [ ] { } ^ $ | \ /` have special meanings. To match them literally, put a backslash in front.

```js
/\$3\.99/.test('Price: $3.99')   // true
/3.99/.test('3x99')              // true: the unescaped dot matches any character
```

## Quantifiers: how many

A quantifier goes after a character, class or group and says how many times it repeats.

| Quantifier | Means |
| --- | --- |
| `+` | one or more |
| `*` | zero or more |
| `?` | zero or one (optional) |
| `{3}` | exactly 3 |
| `{2,}` | 2 or more |
| `{1,3}` | between 1 and 3 |

```js
'arrrr matey'.match(/ar+/)[0]     // 'arrrr'
'Wow!!! nice!'.match(/!{2,}/g)    // ['!!!']
/^\d{5}$/.test('99705')           // true: a US zip code
```

## Greedy vs lazy

Quantifiers are greedy: they grab as much as they can. Add `?` after one to make it lazy, matching as little as possible.

```js
'<b>bold</b>'.match(/<.+>/)[0]    // '<b>bold</b>'  greedy
'<b>bold</b>'.match(/<.+?>/)[0]   // '<b>'          lazy
```

## Anchors and word boundaries

Anchors match a position, not a character.

- `^` the start of the text
- `$` the end of the text
- `\b` a word boundary: between a word character and anything else

Without anchors, a regex can match anywhere inside the text. With `^...$`, the whole text must match, which is what you want for validation.

```js
/\d{5}/.test('my zip is 99705!')   // true: found somewhere
/^\d{5}$/.test('997051')           // false: the whole string must be 5 digits
'cat category concat'.match(/\bcat\b/g)   // ['cat']: whole word only
```

## Groups

Parentheses group things together, so a quantifier or `|` applies to all of it.

```js
'ok okay oki'.match(/\bok(ay)?\b/g)                   // ['ok', 'okay']
'battle axe, pickaxe, axe'.match(/(?:battle |pick)?axe/g)  // ['battle axe', 'pickaxe', 'axe']
```

Groups also **capture** what they matched, so we can pull out pieces.

```js
const [, year, month, day] = '2026-10-06'.match(/(\d{4})-(\d{2})-(\d{2})/);
year   // '2026'
```

Named groups are easier to read:

```js
const { groups } = '2026-10-06'.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
groups.month   // '10'
```

In `replace`, `$1`, `$2`... refer to captured groups:

```js
'2026-10-06'.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3/$2/$1')   // '06/10/2026'
```

`(?: )` groups without capturing. Use it when you only need the grouping, like the axe example above.

## Flags

Flags go after the closing slash and change how the whole pattern behaves.

| Flag | Name | Effect |
| --- | --- | --- |
| `g` | global | Find every match, not just the first |
| `i` | ignore case | `a` matches `A` |
| `m` | multiline | `^` and `$` match at the start and end of each line |
| `u` | unicode | Treat emoji and other characters outside the basic range correctly |

```js
'espresso ESPRESSO'.match(/espresso/gi)   // ['espresso', 'ESPRESSO']
'latte\nmocha'.match(/^\w+$/gm)           // ['latte', 'mocha']
'latte\nmocha'.match(/^\w+$/g)            // null
```

## Putting it together

Find every hashtag:

```js
'Loving my #coffee and #croissant'.match(/#\w+/g)   // ['#coffee', '#croissant']
```

Loop over matches with their groups:

```js
for (const [, name, score] of 'Ana: 3, Rui: 5'.matchAll(/(\w+): (\d+)/g)) {
  console.log(name, score)   // 'Ana' '3', then 'Rui' '5'
}
```

Split messy, comma-separated input:

```js
'red, green,blue ,  yellow'.split(/\s*,\s*/)   // ['red', 'green', 'blue', 'yellow']
```

Take an address apart:

```js
'1 Reindeer Lane, North Pole, AK 99705'
  .match(/^(\d+) ([\w\s]+), ([\w\s]+), ([A-Z]{2}) (\d{5})$/)
  .slice(1)
// ['1', 'Reindeer Lane', 'North Pole', 'AK', '99705']
```

## Regex in HTML forms

The `pattern` attribute checks an input against a regex before the form submits. It must match the whole value, so you don't need `^` and `$`.

```html
<input name="zip" pattern="\d{5}" required>
```

Typing `9970` shows the browser's "match the requested format" message. Add a `title` to explain the format to the user. See [[docs/html/html-forms|HTML - Forms]].

## Common mistakes

- **Forgetting to escape the dot.** `/example.com/` also matches `exampleXcom`. Write `/example\.com/`.
- **Validating without anchors.** `/\d{5}/` accepts `abc12345xyz`. Use `^` and `$`.
- **Reusing a `g` regex with `test`.** A global regex remembers where it stopped (`lastIndex`), so the same call can alternate between `true` and `false`. Drop `g` for `test`.
- **`matchAll` without `g`.** It throws a `TypeError`.
- **Trying to write the perfect email regex.** Check for something like `^[^\s@]+@[^\s@]+\.[^\s@]+$`, then confirm by sending an email.
- **Greedy `.*` eating too much.** Use a lazy `.*?` or a narrower class like `[^"]*`.

## Try it

1. Write a regex that matches a time like `09:30` or `17:05`, and rejects `9:30` and `24:00`.
2. Use `replace` with groups to turn `Silva, Ana` into `Ana Silva`.
3. Extract every price like `$3.99` from `Latte $3.20, Mocha $3.99, Tea $2`.

Paste your patterns into an online regex tester to see each piece highlighted as you build it.

## Related
- [[docs/javascript/javascript-strings|JavaScript - Strings]]
- [[docs/linux/linux-pipe|Shell - Pipes and Redirection]]
- [[docs/html/html-forms|HTML - Forms]]
- [[docs/markdown|Markdown - Basics]]
