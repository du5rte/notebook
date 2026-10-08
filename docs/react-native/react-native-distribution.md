---
title: "React Native - Distribution"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [react, mobile]
---
# React Native - Distribution

Distribution is getting your app from your laptop onto people's phones: testers first, then the stores. It's the part web developers find strangest, because there's no "deploy": you build a signed package, upload it, and wait for review. With Expo, EAS does the building, signing and uploading for you, and OTA updates let you skip the store for JavaScript-only fixes.

## The three file types

| Format | Platform | Install directly? | Store upload? | Typical use |
|---|---|---|---|---|
| **APK** | Android | ✅ Yes | ❌ No | Local and internal testing builds |
| **AAB** | Android | ❌ No | ✅ Yes | Google Play distribution |
| **IPA** | iOS | ⚠️ Only if correctly signed | ✅ Yes | TestFlight and App Store releases |

- **APK** (Android Package): the original Android app file. Any Android device can install it directly (if the user allows it), which makes it perfect for sharing a test build. Google Play no longer accepts it for new apps.
- **AAB** (Android App Bundle): the Google Play standard. You upload one AAB and Google generates an optimised APK for each user's device. You can't install an AAB directly.
- **IPA** (iOS App Store Package): the iOS app file. It needs proper Apple signing and provisioning. Installs usually go through TestFlight or the App Store; Apple keeps direct sideloading limited.

The practical workflow:

- Internal QA on Android → build an **APK**
- Google Play → upload an **AAB**
- TestFlight and the App Store → upload an **IPA**

## Signing

Both stores only accept signed apps: a certificate proves the update came from you.

- **Android**: a keystore. Lose it and you can't update your app (Play App Signing softens this by keeping the upload key replaceable).
- **iOS**: a distribution certificate plus a provisioning profile that ties the app to your Apple Developer account.

EAS can create and store these for you. Let it, unless you have a reason not to: this is the part that used to eat whole afternoons.

## EAS Build

EAS Build compiles your app in the cloud, so you don't need Xcode to ship iOS. Builds are described by **profiles** in `eas.json`.

```json
{
  "build": {
    "development": { "developmentClient": true, "distribution": "internal" },
    "preview": { "distribution": "internal", "android": { "buildType": "apk" } },
    "production": {}
  }
}
```

```sh
eas build --profile development --platform ios     # your dev client
eas build --profile preview --platform android     # an APK to share with testers
eas build --profile production --platform all      # AAB + IPA for the stores
```

- `development`: the dev client from [[docs/react-native/react-native|React Native - Basics]].
- `preview`: an installable build for QA, shared with a link.
- `production`: store builds. Android defaults to an AAB.

## EAS Submit

Submit uploads a finished build to the stores: the IPA to App Store Connect (and from there to TestFlight), the AAB to Google Play.

```sh
eas submit --platform ios
eas submit --platform android
```

You still fill in the store listing, screenshots and review notes in each store's console. Submit just saves you the upload.

## OTA updates

An app is two layers: **native code** (the compiled binary, native libraries, permissions) and **JavaScript plus assets** (your React code, images). Only the first needs a store release. With `expo-updates`, you can publish the second straight to users.

```sh
eas update --channel production --message "fix: typo on the checkout screen"
# phones on the production channel download it on next launch
```

| Change | OTA update? |
|---|---|
| A bug fix in a component | ✅ Yes |
| New copy, colours, images | ✅ Yes |
| Adding a native library | ❌ New build |
| New permission, app icon, SDK upgrade | ❌ New build |

The **runtime version** is the safety catch: an update is only delivered to builds whose native layer matches. Ship an update that needs native code the installed app doesn't have, and it would crash, so Expo won't send it.

Stores allow fixes and small changes over the air, not a different app. Use OTA for fixes, not for sneaking in features that need review.

## Common mistakes

- **Sending testers an AAB.** They can't install it. Build an APK with the `preview` profile.
- **OTA-updating native changes.** If you added a library with native code, it needs a new build.
- **Forgetting to bump the runtime version.** After a native change, old builds must not receive the new JavaScript.
- **Losing signing credentials.** Let EAS manage them, or back them up somewhere you'll still have in two years.

## Try it

1. Add a `preview` profile that builds an APK, build it, and install it on an Android phone from the link.
2. Change a text in the app and ship it with `eas update`. Close and reopen the app to see it arrive.
3. For each of these, say whether it needs a new build or an OTA update: a new screen, a new camera permission, a new brand colour.

## Related
- [[docs/react-native/react-native|React Native - Basics]]
- [[docs/react-native/react-native-performance|React Native - Performance]]
- [[docs/react/react|React - Basics]]
- [[docs/typescript/typescript|TypeScript - Basics]]
