---
title: "Browser - Storage"
type: doc
created: 2016-07-21
updated: 2026-10-07
aliases: ["Storage"]
tags: [browser]
---
# Browser - Storage

Sometimes a page needs to remember something: the theme the user picked, a half-written order, the last tab they opened. The browser gives every site a small key/value store for this. `localStorage` keeps it until someone clears it. `sessionStorage` keeps it only while the tab is open. Think of `localStorage` as a notebook left at the counter, and `sessionStorage` as a sticky note that goes in the bin when you leave.

## Saving and reading

Both stores have the same small API. Keys and values are always strings.

```js
localStorage.setItem('theme', 'dark')
localStorage.getItem('theme') // 'dark'
localStorage.getItem('font') // null (nothing saved yet)

localStorage.removeItem('theme')
localStorage.clear() // removes everything for this site
```

`sessionStorage` works exactly the same:

```js
sessionStorage.setItem('step', '2')
sessionStorage.getItem('step') // '2'
```

## Everything is a string

Storage turns whatever you give it into a string. Numbers and booleans come back as strings, and objects come back broken.

```js
localStorage.setItem('cups', 3)
localStorage.getItem('cups') // '3' (a string)

// ❌ an object becomes useless text
localStorage.setItem('order', { drink: 'latte' })
localStorage.getItem('order') // '[object Object]'

// ✅ turn it into JSON first, and parse it on the way back
localStorage.setItem('order', JSON.stringify({ drink: 'latte', size: 'large' }))
JSON.parse(localStorage.getItem('order')) // { drink: 'latte', size: 'large' }
```

See [[docs/javascript/javascript-json|JavaScript - JSON]] for more on `stringify` and `parse`.

## A safe pattern

Storage can fail: private browsing modes, a full quota, or saved data that isn't valid JSON. Wrap it once and reuse it.

```js
function load(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved === null ? fallback : JSON.parse(saved)
  } catch {
    return fallback
  }
}

function save(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage is full or blocked: the page should still work
  }
}

save('favourites', ['latte', 'flat white'])
load('favourites', []) // ['latte', 'flat white']
load('missing', []) // []
```

The rule of thumb: storage is a convenience. The page must still work when it comes back empty.

## localStorage vs sessionStorage

| | `localStorage` | `sessionStorage` |
|---|---|---|
| Lasts | until cleared by code or the user | until the tab closes |
| Shared between tabs | ✅ same site, all tabs | ❌ one tab only |
| Good for | theme, language, dismissed banners | a multi-step form, scroll position |

Both are per origin: `https://ana.example` can't read what `https://bob.example` saved.

## Listening for changes in other tabs

When one tab changes `localStorage`, the other open tabs of the same site get a `storage` event. Handy for keeping a theme or a cart in sync.

```js
window.addEventListener('storage', (event) => {
  console.log(event.key, event.newValue) // 'theme' 'light'
})
```

The tab that made the change does not get the event itself.

## When to use what

Storage in the browser has a few options. Pick by what the data is for.

| Need | Use |
|------|-----|
| A small preference on this device | `localStorage` |
| Temporary state for one tab | `sessionStorage` |
| The server must see it on every request (a login session) | a cookie, set by the server |
| Lots of data, files, or offline apps | IndexedDB (usually through a small library) |
| Data that must follow the user to other devices | your server or database |

## Common mistakes

- Storing secrets or login tokens in `localStorage`. Any script running on the page can read it, so one injected script can steal them.
- Forgetting `JSON.stringify`, then reading back `'[object Object]'`.
- Treating it as a database. It's small (a few megabytes per site), synchronous, and the user can wipe it any time.
- Reading `'false'` back and treating it as false. Any non-empty string is truthy.

## Try it

1. Add a theme toggle button that saves `'light'` or `'dark'` and applies it on page load.
2. Save a half-filled order form to `sessionStorage` on every `input` event, and restore it on reload.
3. Open the page in two tabs and keep the theme in sync with the `storage` event.

## Related

- [[docs/browser/browser|Browser - DOM]]
- [[docs/javascript/javascript-json|JavaScript - JSON]]
- [[docs/javascript/javascript|JavaScript - Basics]]
- [[docs/html/html-forms|HTML - Forms]]
