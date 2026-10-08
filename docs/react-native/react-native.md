---
title: "React Native - Basics"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: ["React Native - Introduction", "React Native"]
tags: [react, mobile]
---
# React Native - Basics

React Native lets you build iOS and Android apps with [[docs/react/react|React]]. You write components in TypeScript, and React Native turns them into **real native views**: a `View` becomes a `UIView` on iPhone and an `android.view.View` on Android. It is not a website in a wrapper. Think of React as the conductor and the phone's own UI kit as the orchestra: you describe what should be on screen, the native platform plays it. You'd reach for it when you want one codebase, one team and a native feel on both platforms.

Recommend watching 👉 the React Native launch talk from React.js Conf 2015, where it was first shown.

## Native views, not a web view

There is no DOM, no HTML and no CSS file. Your JavaScript runs on its own thread and tells the native side which views to create and update. The result scrolls, animates and feels like any other app on the phone.

```tsx
import { Text, View } from 'react-native'

export function Greeting({ name }: { name: string }) {
  return (
    <View>
      <Text>Hi {name}</Text>
    </View>
  )
}
// <Greeting name="Ana" /> renders a native view with the text 'Hi Ana'
```

If you know React, you already know most of React Native: components, props, state, hooks and JSX all work the same. What changes is the set of building blocks.

## From React to React Native

Writing components in React Native is very similar to React. The elements just have different names.

| React (web) | React Native | Notes |
|---|---|---|
| `<div />` | `<View />` | A box. Layout is flexbox by default. |
| `<span />`, `<p />` | `<Text />` | **All** text must sit inside `<Text>`. |
| `<img />` | `<Image />` | Or `expo-image` for caching and placeholders. |
| `<button />` | `<Pressable />` | Anything tappable. You style it yourself. |
| `<input />` | `<TextInput />` | |
| `<ul>` + `map` | `<FlatList />` / `FlashList` | Virtualised: only renders what's on screen. |
| scrolling `<div>` | `<ScrollView />` | Renders everything, fine for short content. |
| `onClick` | `onPress` | |

```tsx
import { Pressable, Text } from 'react-native'

<Pressable onPress={() => console.log('ordered')}>
  <Text>Order coffee</Text>
</Pressable>
// tap → 'ordered'
```

## Expo: the default way to build

Expo is a framework on top of React Native. It gives you the tooling, a big set of native modules (camera, haptics, fonts, splash screen…) and a cloud service to build and ship. The React Native team itself recommends starting with a framework, and Expo is the one.

```sh
pnpm dlx create-expo-app@latest coffee-shop
cd coffee-shop
pnpm expo start
```

The pieces you'll meet:

- **Development build** (`expo-dev-client`): your own version of the app with a dev menu, installed on your phone or simulator. You build it once and then edit JavaScript with instant reloads. Expo Go is fine for a first play, but a real app needs a dev build as soon as it uses a native library Expo Go doesn't ship.
- **Prebuild** (`pnpm expo prebuild`): generates the `ios/` and `android/` folders from `app.json` and config plugins. You treat those folders as build output, not code you hand-edit. Need a native change? Use a config plugin, then prebuild again.
- **EAS** (Expo Application Services): builds your app in the cloud, submits it to the stores and ships updates. See [[docs/react-native/react-native-distribution|React Native - Distribution]].
- **OTA updates** (`expo-updates`): push a JavaScript-only fix straight to users' phones, no store review.

This replaced the old bare React Native CLI setup, where you owned the native folders and debugged CocoaPods by hand. With prebuild, upgrading becomes "bump the SDK, prebuild again" instead of a week of merge conflicts.

## Setting up your machine

On a Mac you need the native toolchains, even with Expo, because a dev build compiles native code.

```sh
xcode-select --install          # Xcode command line tools (install Xcode from the App Store first)
brew install watchman           # fast file watching for Metro, the bundler
brew install cocoapods          # only needed for local iOS builds
```

Then Node (through a version manager such as nvm) and pnpm. For Android, install Android Studio with an emulator. If you build only in the cloud with EAS, you can skip most of the native toolchain to start with.

## Navigation with expo-router

expo-router is **file-based routing**: every file in the `app/` folder is a screen, and the folder structure is the navigation. If you've used Next.js, it's the same idea.

```
app/
  _layout.tsx        # the navigator that wraps its siblings (stack, tabs…)
  index.tsx          # '/'           home
  menu.tsx           # '/menu'
  order/[id].tsx     # '/order/42'   a dynamic route
  (tabs)/_layout.tsx # a group: organises files without adding to the URL
```

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router'

export default function RootLayout() {
  return <Stack />
}
```

```tsx
// app/order/[id].tsx
import { Link, useLocalSearchParams } from 'expo-router'
import { Text } from 'react-native'

export default function OrderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  return <Text>Order #{id}</Text>
}
// /order/42 → 'Order #42'

// anywhere else:
<Link href="/order/42">See your order</Link>
```

Every screen gets a URL for free, so deep links and universal links work without extra config. It's built on React Navigation, which you'd otherwise configure by hand.

## Common mistakes

- **Text outside `<Text>`.** `<View>Hi</View>` crashes. Every string needs a `<Text>` around it.
- **Expecting CSS.** No cascade, no class names (unless you add Uniwind), no `px`. See [[docs/react-native/react-native-styling|React Native - Styling and Themes]].
- **Hand-editing `ios/` and `android/` in an Expo app.** The next prebuild overwrites them. Use a config plugin.
- **Using `ScrollView` for long lists.** It renders every row at once. Use a list component.
- **Only testing on an iPhone simulator.** A cheap Android phone is where problems show up first.

## Try it

1. Create an Expo app and make the home screen show "Hi" plus your name, in a `<Text>`.
2. Add a `menu.tsx` screen with three drinks, and a `<Link>` from home to it.
3. Add `app/drink/[name].tsx` that shows the drink's name from the URL, and link each menu item to it.

## Related
- [[docs/react/react|React - Basics]]
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/react-native/react-native-styling|React Native - Styling and Themes]]
- [[docs/react-native/react-native-animation|React Native - Animation]]
- [[docs/react-native/react-native-performance|React Native - Performance]]
- [[docs/react-native/react-native-distribution|React Native - Distribution]]
