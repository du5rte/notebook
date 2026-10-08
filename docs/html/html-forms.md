---
title: "HTML - Forms"
type: doc
created: 2015-11-12
updated: 2026-10-07
tags: [html]
---
# HTML - Forms

A form is how a page asks the visitor for something: a name, an email, a coffee order. HTML gives us the controls (text fields, checkboxes, menus), labels that explain them, and free validation, all before we write any JavaScript. In this lesson we build an order form for a coffee shop.

## The form element

`<form>` wraps the controls and says where to send the data and how.

```html
<form action="/order" method="post">
  <!-- controls go here -->
</form>
```

- `action`: the URL that receives the data. Leave it out to send to the current page.
- `method`: `get` puts the data in the URL (`/search?q=latte`), good for searches. `post` sends it in the request body, good for anything that changes data or is private.

Forms cannot be nested inside one another.

## Inputs and the name attribute

`<input>` is one element that turns into many controls depending on its `type`. The `name` is the key the server receives.

```html
<input type="text" name="customer_name">
<input type="email" name="customer_email">
<input type="password" name="password">
```

If someone types "Ana" and "ana@example.com", the server gets something like:

```
customer_name=Ana&customer_email=ana%40example.com
```

No `name`, no data: a field without one is not sent at all.

Other useful types: `number`, `tel`, `url`, `date`, `time`, `search`, `range`, `color`, `file`. On phones, `email`, `tel` and `number` bring up a matching keyboard. The full list is on MDN.

## Labels: always

`<label>` tells everyone what a control is for. Connect it with `for`, which must match the input's `id`.

```html
<label for="name">Your name</label>
<input type="text" id="name" name="customer_name">
```

Clicking the label now focuses the input, and screen readers read "Your name" when the field gets focus. You can also wrap the input inside the label, which needs no `id`:

```html
<label>
  Your name
  <input type="text" name="customer_name">
</label>
```

```html
<!-- ❌ the hint vanishes as soon as you type -->
<input type="email" name="customer_email" placeholder="Email">
<!-- ✅ a real label, with an example as the placeholder -->
<label for="email">Email</label>
<input type="email" id="email" name="customer_email" placeholder="ana@example.com">
```

`placeholder` is not a label. It disappears as soon as you type and is often low contrast. Use it for an example value at most.

## id vs name

They look alike but do different jobs.

| Attribute | Used by | Must be unique? |
|-----------|---------|-----------------|
| `id` | labels, CSS, JavaScript, `#links` | yes, on the whole page |
| `name` | the server, when the form is sent | no (radios share one) |

## Textarea, select and options

`<textarea>` takes several lines of text. Most browsers let the user resize it.

```html
<label for="notes">Anything else?</label>
<textarea id="notes" name="notes" rows="3"></textarea>
```

`<select>` is a drop-down. Each `<option>` has a `value` (sent to the server) and visible text (shown to the user). `<optgroup>` groups options under a heading.

```html
<label for="drink">Drink</label>
<select id="drink" name="drink">
  <optgroup label="Hot">
    <option value="espresso">Espresso</option>
    <option value="latte">Latte</option>
  </optgroup>
  <optgroup label="Cold">
    <option value="iced_tea">Iced tea</option>
  </optgroup>
</select>
<!-- choosing "Latte" sends drink=latte -->
```

## Checkboxes vs radio buttons

- **Checkboxes**: pick any number. Each one is on or off.
- **Radio buttons**: pick exactly one from a group. They are a group because they share the same `name`.

```html
<fieldset>
  <legend>Size</legend>
  <input type="radio" id="small" name="size" value="small" checked>
  <label for="small">Small</label>
  <input type="radio" id="large" name="size" value="large">
  <label for="large">Large</label>
</fieldset>

<fieldset>
  <legend>Extras</legend>
  <input type="checkbox" id="oat" name="extras" value="oat_milk">
  <label for="oat">Oat milk</label>
  <input type="checkbox" id="shot" name="extras" value="extra_shot">
  <label for="shot">Extra shot</label>
</fieldset>
```

`checked` sets the starting choice. An unchecked checkbox sends nothing at all.

## Fieldset and legend

`<fieldset>` groups related controls, and `<legend>` gives the group a caption. For radio buttons this matters: a screen reader says "Size, Small, radio button" instead of just "Small".

## Buttons

`<button>` inside a form is a submit button by default. Be explicit with `type`.

```html
<button type="submit">Place order</button>
<button type="reset">Clear</button>    <!-- rarely what users want -->
<button type="button">Show menu</button> <!-- does nothing until JavaScript says so -->
```

Forgetting `type="button"` on a button that only runs JavaScript is a classic bug: it submits the form and reloads the page.

## Built-in validation

The browser can check inputs before sending, with no JavaScript.

```html
<input type="email" name="customer_email" required>
<input type="number" name="cups" min="1" max="10">
<input type="text" name="postcode" pattern="[0-9]{4}-[0-9]{3}">
```

`required`, `min`, `max`, `minlength`, `maxlength` and `pattern` all block submit and show a message. This helps the user, but always validate again on the server: anyone can skip the browser.

## Reading a form with JavaScript

`FormData` collects every named field in one go.

```js
const form = document.querySelector('form')

form.addEventListener('submit', (event) => {
  event.preventDefault() // stop the page reload
  const data = Object.fromEntries(new FormData(form))
  console.log(data) // { customer_name: 'Ana', drink: 'latte', size: 'small' }
})
```

`Object.fromEntries` keeps only the last value for repeated names, like several checked `extras`. Use `new FormData(form).getAll('extras')` to get them all.

## Common mistakes

- Inputs without a label, or a label whose `for` doesn't match any `id`.
- Forgetting `name`, so the field silently isn't sent.
- Radio buttons with different `name`s, so you can pick them all.
- Trusting browser validation alone.

## Try it

1. Build the coffee order form: name, email, drink, size, extras, notes and a submit button.
2. Make name and email required and try sending it empty.
3. Add the JavaScript above and log the order instead of sending it.

## Related

- [[docs/html/html|HTML - Basics]]
- [[docs/html/html-tables|HTML - Tables]]
- [[docs/browser/browser|Browser - DOM]]
- [[docs/browser/browser-storage|Browser - Storage]]
