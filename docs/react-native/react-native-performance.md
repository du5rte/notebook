---
title: "React Native - Performance"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [react, mobile]
---
# React Native - Performance

A React Native app that feels fine on your new iPhone can crawl on a cheap Android phone, and that cheap phone is what a lot of your users have. Performance work is about keeping two threads free: the JS thread that runs React, and the UI thread that draws. This lesson is the checklist I use, in the order I'd check things.

## Set the goal

Pick a target device and a number, or "fast enough" never ends.

- **Device**: a low-end Android phone. Mine was a Samsung J3 from 2017. If it's smooth there, it's smooth everywhere.
- **UI thread**: 60fps. This is what the user sees.
- **JS thread**: above 0fps. It can dip while working, but if it sits at 0 the app stops responding to taps.

## Where it hurts

Almost every problem lands in one of two places:

- **Scrolling lists**: too many rows rendering, or rows re-rendering when they didn't change.
- **Animations**: anything animated through React state instead of on the UI thread.

Start there before optimising anything else.

## Measure in release mode

Dev mode is slow on purpose: extra checks, warnings, and some libraries do more work when `__DEV__` is true. Never judge performance in a dev build.

```sh
pnpm expo run:android --variant release
```

Make measurements **deterministic**: run the exact same interaction every time, so before and after are comparable. On Android, `adb` can swipe for you:

```sh
adb shell input swipe 500 1000 300 300 10
# swipes from (500, 1000) to (300, 300) in 10ms: the same fling, every run
```

Use the right profiler for each thread:

| Thread | Tool |
|---|---|
| JS | React DevTools Profiler (in React Native DevTools), JS flame graph |
| UI, Android | System trace in Android Studio's profiler |
| UI, iOS | Xcode Instruments |

## Stable references

React decides whether to re-render by comparing props, and objects and functions are compared **by reference**. A new object every render looks like a change, even with the same contents.

```tsx
// ❌ a new function every render: every row re-renders
<DrinkRow onPress={() => order(drink.id)} />

// ✅ same function between renders
const handlePress = useCallback(() => order(drink.id), [drink.id])
<DrinkRow onPress={handlePress} />
```

The toolkit:

- `memo(Component)`: skip re-rendering when props are the same. Use it on list rows.
- `useCallback`: keep a function's reference stable.
- `useMemo`: keep an object stable, or cache an expensive calculation.

If your project runs the React Compiler, it adds most of this memoisation for you. You still need the mental model to understand why something re-renders.

## Lists: FlashList over FlatList

`ScrollView` renders every child, so 500 rows means 500 rows in memory. `FlatList` virtualises, but creates and destroys rows as you scroll. `FlashList` (from Shopify) **recycles** row views like the native lists do, which is much smoother on low-end phones.

```tsx
import { FlashList } from '@shopify/flash-list'

<FlashList
  data={drinks}
  keyExtractor={(drink) => drink.id}
  renderItem={({ item }) => <DrinkRow drink={item} />}
/>
```

| | `ScrollView` | `FlatList` | `FlashList` |
|---|---|---|---|
| Renders off-screen rows | ❌ All of them | ✅ Only nearby | ✅ Only nearby |
| Reuses row views | ❌ | ❌ | ✅ |
| Use for | Short content | Fine default | ✅ Long or heavy lists |

Keep rows cheap: `memo` them, avoid inline objects in their props, and keep images small.

## Don't block the JS thread

Long synchronous work (parsing a huge JSON, sorting thousands of items) freezes taps and JS-driven updates. Do it asynchronously, in smaller pieces, or on the server. Animations should already be on the UI thread with Reanimated, so they keep running either way.

## Prefer JSI libraries

JSI lets JavaScript call native code directly and synchronously, instead of sending messages over the old asynchronous bridge. Libraries built on it are noticeably faster:

- **Reanimated** for animations, see [[docs/react-native/react-native-animation|React Native - Animation]].
- **FlashList** for lists.
- **MMKV** for key-value storage.
- **expo-image** for images, with caching built in.

MMKV over AsyncStorage is a good example. AsyncStorage is asynchronous, so reading the saved theme at startup means a flash of the wrong colours while you wait. MMKV is synchronous and fast enough to read during render.

```ts
import { createMMKV } from 'react-native-mmkv'

const storage = createMMKV()
storage.set('theme', 'dark')
storage.getString('theme') // 'dark', no await
```

## Common mistakes

- **Profiling a dev build.** The numbers are meaningless. Use release.
- **Only testing on a fast iPhone.** Test on a low-end Android early, not the week before launch.
- **Memoising everything blindly.** Measure first. Fix the list rows and the animations, that's where the time goes.
- **Keeping old tools.** Flipper was the profiler of choice for years; it's gone from new React Native projects. Use React Native DevTools.

## Try it

1. Render 1,000 drinks in a `ScrollView`, then in a `FlashList`, and compare scrolling on an Android device in release mode.
2. Add a `console.log` in a list row, tap something unrelated, and count re-renders. Fix it with `memo` and `useCallback`.
3. Move a saved setting from AsyncStorage to MMKV and remove the loading state around it.

## Related
- [[docs/react-native/react-native-animation|React Native - Animation]]
- [[docs/react-native/react-native|React Native - Basics]]
- [[docs/react/react|React - Basics]]
- [[docs/typescript/typescript|TypeScript - Basics]]
