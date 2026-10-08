---
title: "Browser - Geolocation"
type: doc
created: 2016-06-18
updated: 2026-10-07
aliases: ["JavaScript - Geolocation"]
tags: [browser]
---
# Browser - Geolocation

The Geolocation API asks the browser where the user is. It's how a site can say "the nearest café is 300 m away" or centre a map on you. The browser always asks the user first, and they can say no, so your page has to handle both answers.

## Asking for a position

`navigator.geolocation.getCurrentPosition` takes two functions: one for success, one for failure. It answers once.

```js
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude, accuracy } = position.coords
    console.log(latitude, longitude) // 38.7223 -9.1393
    console.log(`Accurate to ${accuracy} m`) // 'Accurate to 35 m'
  },
  (error) => {
    console.log(error.message) // 'User denied Geolocation'
  },
)
```

The first time, the browser shows a permission prompt. Nothing happens until the user answers.

## What you get back

`position.coords` has:

- `latitude` and `longitude`, in decimal degrees.
- `accuracy`: how far off it might be, in metres.
- `altitude`, `heading` and `speed`: often `null`, depending on the device.

`position.timestamp` says when it was measured.

## Handling errors

The error has a `code`. Plan for all three.

```js
function explain(error) {
  if (error.code === error.PERMISSION_DENIED) return 'Location is off. Type your town instead.'
  if (error.code === error.POSITION_UNAVAILABLE) return "We couldn't find you right now."
  if (error.code === error.TIMEOUT) return 'That took too long. Try again.'
}
```

Always offer another way, like a search box, because many people will say no.

## Options

A third argument tunes the request.

```js
navigator.geolocation.getCurrentPosition(onSuccess, onError, {
  enableHighAccuracy: true, // use GPS if available: slower, more battery
  timeout: 10_000,          // give up after 10 seconds
  maximumAge: 60_000,       // a position up to 1 minute old is fine
})
```

## getCurrentPosition vs watchPosition

| | `getCurrentPosition` | `watchPosition` |
|---|---|---|
| Answers | once | every time the position changes |
| Good for | "find cafés near me" | live tracking, a delivery on a map |
| Stop it | not needed | `clearWatch(id)` |

```js
const id = navigator.geolocation.watchPosition((position) => {
  console.log(position.coords.latitude, position.coords.longitude)
})

// later, when the user leaves the map
navigator.geolocation.clearWatch(id)
```

Forgetting `clearWatch` keeps the GPS running and drains the battery.

## Wrapping it in a promise

The API uses callbacks. A small wrapper lets you use `await` (see [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]).

```js
function getPosition(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

const { coords } = await getPosition({ timeout: 10_000 })
console.log(coords.latitude) // 38.7223
```

## Common mistakes

- Asking on page load. Ask when the user clicks "Find cafés near me", so they know why.
- Not handling a "no". The page should still be useful.
- Testing over plain `http://`. Geolocation only works on secure pages (`https://` or `localhost`).
- Leaving `watchPosition` running.

## Try it

1. Add a "Where am I?" button that shows your latitude and longitude, or a friendly message if you deny it.
2. Show the accuracy, then turn on `enableHighAccuracy` and compare.
3. Use `watchPosition` and a "Stop" button that calls `clearWatch`.

## Related

- [[docs/browser/browser|Browser - DOM]]
- [[docs/browser/browser-storage|Browser - Storage]]
- [[docs/javascript/javascript-async|JavaScript - Asynchronous Programming]]
