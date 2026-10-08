---
title: "HTML - Images and Media"
type: doc
created: 2015-08-27
updated: 2026-10-07
aliases: ["Video and Audio", "HTML - Objects"]
tags: [html]
---
# HTML - Images and Media

Pages are more than text: photos of the latte art, a short video of the café, a podcast episode, a map. HTML has native elements for all of these, with controls and accessibility built in. No plugins or player libraries needed. In this lesson we go from a single image to a captioned video and an embedded page.

## Images and alt text

`<img>` shows an image. It needs a `src` and an `alt`.

```html
<img src="img/latte.jpg" alt="A latte with a heart drawn in the milk foam" width="800" height="600">
```

`alt` is what a screen reader reads, and what shows if the image fails to load. Describe what matters in this context, not "image of".

```html
<!-- ❌ says nothing useful -->
<img src="img/latte.jpg" alt="image of latte.jpg">
<!-- ✅ says what you'd tell a friend on the phone -->
<img src="img/latte.jpg" alt="A latte with a heart drawn in the milk foam">
```
 If the image is pure decoration, use an empty `alt=""` so screen readers skip it. Leaving `alt` out entirely is different: some screen readers then read the file name.

Setting `width` and `height` lets the browser reserve the space before the image loads, so the page doesn't jump around.

## Faster images: lazy loading and sizes

Two small attributes save a lot of data.

```html
<img src="img/terrace.jpg" alt="Our terrace in the sun" loading="lazy">
```

`loading="lazy"` waits until the image is close to the screen before downloading it. Use it for images further down the page, not for the big one at the top.

`srcset` offers several sizes, and the browser picks the right one for the screen.

```html
<img
  src="img/terrace-800.jpg"
  srcset="img/terrace-400.jpg 400w, img/terrace-800.jpg 800w, img/terrace-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Our terrace in the sun">
```

`<picture>` goes further and lets you offer different formats or crops. The full story of responsive images is on MDN.

## Video

`<video>` plays a video inline. Add `controls` so the user gets play, pause, volume and fullscreen for free.

```html
<video src="video/pouring.mp4" controls width="640"></video>
```

Useful attributes:

- `controls`: show the browser's player controls. Almost always yes.
- `poster`: an image to show before it plays.
- `autoplay`: start on its own. Browsers only allow this when the video is also `muted`.
- `muted`, `loop`, `playsinline`: common for short background clips (`playsinline` stops phones from jumping to fullscreen).
- `preload="none"`: don't download anything until the user presses play.

```html
<video src="video/steam.mp4" autoplay muted loop playsinline></video>
```

Autoplaying motion can be distracting or make some people feel unwell. Keep it short, give it a pause button, or skip it.

## Audio

`<audio>` works the same way, just without a picture.

```html
<audio src="audio/episode-1.mp3" controls></audio>
```

Without `controls`, an audio element is invisible, which is only useful when JavaScript plays it.

## Several sources

`<source>` lets you list more than one file. The browser plays the first one it supports. Text between the tags shows only in browsers that can't play media at all.

```html
<video controls poster="img/pouring.jpg">
  <source src="video/pouring.webm" type="video/webm">
  <source src="video/pouring.mp4" type="video/mp4">
  <p>Your browser can't play this video. <a href="video/pouring.mp4">Download it</a> instead.</p>
</video>
```

MP4 with H.264 video plays in every current browser, so it makes a safe last option. When you export video for the web, keep the resolution, frame rate and bitrate as low as still looks good.

## Captions with track

Captions help people who are deaf or hard of hearing, people watching in a noisy café without headphones, and people who don't know the language well. Even without speech, mention sounds and music.

The web format is WebVTT, a plain text file ending in `.vtt`:

```
WEBVTT

00:00:00.000 --> 00:00:03.000
[Coffee machine hissing]

00:00:03.000 --> 00:00:06.500
This is how we pour the perfect latte.
```

Attach it with `<track>`:

```html
<video controls src="video/pouring.mp4">
  <track kind="captions" src="captions/pouring-en.vtt" srclang="en" label="English" default>
  <track kind="subtitles" src="captions/pouring-pt.vtt" srclang="pt" label="Português">
</video>
```

| `kind` | Use it for |
|--------|-----------|
| `captions` | speech plus sounds, in the same language |
| `subtitles` | a translation of the speech |
| `descriptions` | text describing what is on screen |

Caption files must come from the same origin as the page (or be served with CORS), so open your page through a local server, not as a `file://` path. Any simple dev server works.

## Controlling media with JavaScript

The browser's player is usually enough. When you need your own buttons, the element has a small API.

```js
const video = document.querySelector('video')
const button = document.querySelector('#play')

button.addEventListener('click', () => {
  if (video.paused) video.play()
  else video.pause()
})

video.addEventListener('ended', () => console.log('Thanks for watching!'))
```

`currentTime`, `duration`, `volume` and `muted` are properties you can read and set. The full list of media events is on MDN. Custom player libraries used to be needed to make video work everywhere. Today native `<video>` does, so only add one if you really need a custom look.

## Embedding other pages with iframe

`<iframe>` shows another web page inside yours: a map, a video from a video site, a payment form.

```html
<iframe
  src="https://www.example.com/map"
  title="Map to Ana's Coffee Shop"
  width="600" height="400"
  loading="lazy">
</iframe>
```

Give every iframe a `title`: it is how screen readers announce it. Video sites give you a ready-made embed code. Copy theirs instead of writing it by hand.

## Common mistakes

- Missing `alt`, or `alt` that repeats the file name.
- `autoplay` without `muted`, then wondering why it doesn't start.
- Video with speech and no captions.
- Opening the page from `file://` and getting blocked caption files.

## Try it

1. Add an image with good `alt` text, and a decorative one with `alt=""`.
2. Add a video with `controls`, a `poster` and an English caption track. Write a three-line `.vtt` file for it.
3. Make your own play/pause button with `addEventListener`.

## Related

- [[docs/html/html|HTML - Basics]]
- [[docs/html/html-text|HTML - Text]]
- [[docs/svg/svg|SVG - Basics]]
- [[docs/browser/browser|Browser - DOM]]
