---
title: "Libraries"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [library, index]
---
# Libraries

One file per library. `status` is one of `using`, `trying`, `watching` or `dropped`; `verified: false` means the status is a guess from old notes and has not been confirmed. The Dropped table at the bottom is the retrospective: filter it by platform for web, backend or mobile.

Categories: `animation`, `auth`, `data`, `database`, `forms`, `framework`, `graphics`, `language`, `navigation`, `services`, `state`, `styling`, `testing`, `tooling`, `ui`, `utils`.

Comparisons: [[docs/comparisons/utilities|Utility libraries]], [[docs/comparisons/git-hooks|Git hook managers]], [[docs/comparisons/databases|Databases and data layers]], [[docs/comparisons/auth|Auth providers]]

## Using

| Library | Category | Platforms | Using since | Replaces |
|---|---|---|---|---|
| [[docs/libraries/gesture-handler|Gesture Handler]] | animation | react-native |  |  |
| [[docs/libraries/reanimated|Reanimated]] | animation | react-native |  | [[docs/libraries/react-motion|React Motion]] |
| [[docs/libraries/apollo-client|Apollo Client]] | data | web, react-native | 2016 | [[docs/libraries/relay|Relay]] |
| [[docs/libraries/apollo-server|Apollo Server]] | data | node | 2016 |  |
| [[docs/libraries/graphql|GraphQL]] | data | web, react-native, node | 2016 |  |
| [[docs/libraries/convex|Convex]] | database | web, react-native |  | [[docs/libraries/firebase|Firebase]], [[docs/libraries/mongodb|MongoDB]] |
| [[docs/libraries/expo|Expo]] | framework | react-native |  |  |
| [[docs/libraries/react|React]] | framework | web | 2016 | [[docs/libraries/jquery|jQuery]] |
| [[docs/libraries/react-native|React Native]] | framework | react-native | 2017 | [[docs/libraries/swift|Swift]] |
| [[docs/libraries/react-native-web|React Native for Web]] | framework | web |  |  |
| [[docs/libraries/react-native-svg|react-native-svg]] | graphics | react-native |  |  |
| [[docs/libraries/javascript|JavaScript]] | language | web, react-native, node | 2015 |  |
| [[docs/libraries/typescript|TypeScript]] | language | web, react-native, node | 2015 | [[docs/libraries/coffeescript|CoffeeScript]] |
| [[docs/libraries/react-navigation|React Navigation]] | navigation | react-native |  |  |
| [[docs/libraries/legend-state|Legend State]] | state | web, react-native |  |  |
| [[docs/libraries/mmkv|MMKV]] | state | react-native |  |  |
| [[docs/libraries/restyle|Restyle]] | styling | react-native |  |  |
| [[docs/libraries/jest|Jest]] | testing | web, react-native, node |  |  |
| [[docs/libraries/maestro|Maestro]] | testing | react-native |  |  |
| [[docs/libraries/codesandbox|CodeSandbox]] | tooling | web |  |  |
| [[docs/libraries/eslint|ESLint]] | tooling | web, react-native, node |  |  |
| [[docs/libraries/fastlane|Fastlane]] | tooling | react-native, ios |  |  |
| [[docs/libraries/keycode|KeyCode]] | tooling | web |  |  |
| [[docs/libraries/lefthook|Lefthook]] | tooling | node |  | [[docs/libraries/husky|Husky]], [[docs/libraries/simple-git-hooks|simple-git-hooks]] |
| [[docs/libraries/npm|npm]] | tooling | web, react-native, node | 2015 | [[docs/libraries/bower|Bower]] |
| [[docs/libraries/patch-package|patch-package]] | tooling | web, react-native, node |  |  |
| [[docs/libraries/prettier|Prettier]] | tooling | web, react-native, node |  |  |
| [[docs/libraries/quickpush|QuickPush]] | tooling | react-native |  |  |
| [[docs/libraries/runjs|RunJS]] | tooling | web |  |  |
| [[docs/libraries/vite|Vite]] | tooling | web |  | [[docs/libraries/webpack|Webpack]] |
| [[docs/libraries/flashlist|FlashList]] | ui | react-native |  |  |
| [[docs/libraries/react-aria|React Aria]] | ui | web |  | [[docs/libraries/radix|Radix UI]] |
| [[docs/libraries/safe-area-context|Safe Area Context]] | ui | react-native |  |  |
| [[docs/libraries/dayjs|Day.js]] | utils | web, react-native, node |  |  |
| [[docs/libraries/nanoid|Nano ID]] | utils | web, react-native, node |  |  |
| [[docs/libraries/remeda|Remeda]] | utils | web, react-native, node |  | [[docs/libraries/lodash|Lodash]] |
| [[docs/libraries/tinycolor|TinyColor]] | utils | web, react-native |  |  |

## Trying

| Library | Category | Platforms | Trying since | Replaces |
|---|---|---|---|---|
| [[docs/libraries/lottie|Lottie]] | animation | web, react-native |  |  |
| [[docs/libraries/clerk|Clerk]] | auth | web, react-native |  |  |
| [[docs/libraries/skia|Skia]] | graphics | react-native |  |  |
| [[docs/libraries/vector-icons|Vector Icons]] | graphics | react-native |  |  |
| [[docs/libraries/python|Python]] | language | node | 2018 |  |
| [[docs/libraries/bottom-sheet|Bottom Sheet (gorhom)]] | navigation | react-native |  |  |
| [[docs/libraries/hold-menu|Hold Menu]] | navigation | react-native |  |  |
| [[docs/libraries/portal|Portal (gorhom)]] | navigation | react-native |  |  |
| [[docs/libraries/sticky-parallax-header|Sticky Parallax Header]] | navigation | react-native |  |  |
| [[docs/libraries/adjust|Adjust]] | services | react-native |  |  |
| [[docs/libraries/appdynamics|AppDynamics]] | services | react-native |  |  |
| [[docs/libraries/zustand|Zustand]] | state | web, react-native |  | [[docs/libraries/redux|Redux]] |
| [[docs/libraries/linear-gradient|Linear Gradient]] | styling | react-native |  |  |
| [[docs/libraries/masked-view|Masked View]] | styling | react-native |  |  |
| [[docs/libraries/react-native-dynamic|react-native-dynamic]] | styling | react-native |  |  |
| [[docs/libraries/tailwind|Tailwind CSS]] | styling | web |  |  |
| [[docs/libraries/browserstack|BrowserStack]] | testing | web, react-native |  |  |
| [[docs/libraries/reactotron|Reactotron]] | tooling | react-native |  |  |
| [[docs/libraries/device-info|Device Info]] | ui | react-native |  |  |
| [[docs/libraries/fast-image|FastImage]] | ui | react-native |  |  |
| [[docs/libraries/shadcn-ui|shadcn/ui]] | ui | web |  |  |
| [[docs/libraries/sonner|Sonner]] | ui | web, react-native |  |  |
| [[docs/libraries/tamagui|Tamagui]] | ui | web, react-native |  |  |
| [[docs/libraries/delay|delay]] | utils | web, react-native, node |  |  |
| [[docs/libraries/ffmpeg|ffmpeg]] | utils | node |  |  |
| [[docs/libraries/fuse|Fuse.js]] | utils | web, react-native |  |  |
| [[docs/libraries/i18next|i18next]] | utils | web, react-native |  |  |
| [[docs/libraries/numbro|numbro]] | utils | web, react-native |  |  |

## Watching

| Library | Category | Platforms |
|---|---|---|
| [[docs/libraries/confetti|Confetti]] | animation | react-native |
| [[docs/libraries/lenis|Lenis]] | animation | web |
| [[docs/libraries/pressto|Pressto]] | animation | react-native |
| [[docs/libraries/pulsar|Pulsar]] | animation | react-native, ios |
| [[docs/libraries/sortables|React Native Sortables]] | animation | react-native |
| [[docs/libraries/css-animations|react-native-css-animations]] | animation | react-native |
| [[docs/libraries/react-native-ease|react-native-ease]] | animation | react-native |
| [[docs/libraries/reanimated-dnd|react-native-reanimated-dnd]] | animation | react-native |
| [[docs/libraries/screen-transitions|react-native-screen-transitions]] | animation | react-native |
| [[docs/libraries/tickle|react-native-tickle]] | animation | react-native |
| [[docs/libraries/better-auth|Better Auth]] | auth | web, node |
| [[docs/libraries/nitro-fetch|react-native-nitro-fetch]] | data | react-native |
| [[docs/libraries/swr|SWR]] | data | web, react-native |
| [[docs/libraries/trpc|tRPC]] | data | web, node |
| [[docs/libraries/instantdb|InstantDB]] | database | web, react-native |
| [[docs/libraries/watermelon-db|WatermelonDB]] | database | react-native |
| [[docs/libraries/tanstack-form|TanStack Form]] | forms | web |
| [[docs/libraries/d3|D3.js]] | graphics | web |
| [[docs/libraries/nano-icons|Nano Icons]] | graphics | react-native |
| [[docs/libraries/fast-squircle|react-native-fast-squircle]] | graphics | react-native |
| [[docs/libraries/victory-native|Victory Native]] | graphics | react-native |
| [[docs/libraries/solidity|Solidity]] | language | web |
| [[docs/libraries/detour|detour]] | navigation | react-native |
| [[docs/libraries/expo-motion-tabs|expo-motion-tabs]] | navigation | react-native |
| [[docs/libraries/react-native-onboarding|react-native-onboarding]] | navigation | react-native |
| [[docs/libraries/sendgrid|SendGrid]] | services | node |
| [[docs/libraries/unocss|UnoCSS]] | styling | web |
| [[docs/libraries/radon-ide|Radon IDE]] | tooling | react-native |
| [[docs/libraries/re-pack|Re.Pack]] | tooling | react-native |
| [[docs/libraries/animate-ui|Animate UI]] | ui | web |
| [[docs/libraries/boneyard|Boneyard]] | ui | web, react-native |
| [[docs/libraries/daisyui|daisyUI]] | ui | web |
| [[docs/libraries/expo-ui|Expo UI]] | ui | react-native |
| [[docs/libraries/expo-live-activity|expo-live-activity]] | ui | react-native, ios |
| [[docs/libraries/expo-quick-actions|expo-quick-actions]] | ui | react-native |
| [[docs/libraries/flash-calendar|Flash Calendar]] | ui | react-native |
| [[docs/libraries/gifted-chat|Gifted Chat]] | ui | react-native |
| [[docs/libraries/heroui|HeroUI]] | ui | web, react-native |
| [[docs/libraries/legend-list|Legend List]] | ui | react-native |
| [[docs/libraries/primer|Primer]] | ui | web |
| [[docs/libraries/react-bits|React Bits]] | ui | web |
| [[docs/libraries/react-native-reusables|React Native Reusables]] | ui | react-native |
| [[docs/libraries/coachmark|react-native-coachmark]] | ui | react-native |
| [[docs/libraries/enriched|react-native-enriched]] | ui | react-native |
| [[docs/libraries/nitro-device-info|react-native-nitro-device-info]] | ui | react-native |
| [[docs/libraries/ui-datepicker|react-native-ui-datepicker]] | ui | react-native |
| [[docs/libraries/just|just]] | utils | web, react-native, node |
| [[docs/libraries/react-handyhooks|React Handyhooks]] | utils | web |
| [[docs/libraries/usehooks|useHooks]] | utils | web |

## Dropped

| Library | Category | Platforms | Used | Replaced by |
|---|---|---|---|---|
| [[docs/libraries/react-motion|React Motion]] | animation | web | 2016 | [[docs/libraries/reanimated]] |
| [[docs/libraries/relay|Relay]] | data | web | 2016 | [[docs/libraries/apollo-client]] |
| [[docs/libraries/firebase|Firebase]] | database | web, react-native |  | [[docs/libraries/convex]] |
| [[docs/libraries/mongodb|MongoDB]] | database | node | 2016 | [[docs/libraries/convex]] |
| [[docs/libraries/realm|Realm]] | database | react-native |  |  |
| [[docs/libraries/formik|Formik]] | forms | web, react-native |  |  |
| [[docs/libraries/coffeescript|CoffeeScript]] | language | web | 2015 | [[docs/libraries/typescript]] |
| [[docs/libraries/swift|Swift]] | language | ios | 2016 | [[docs/libraries/react-native]] |
| [[docs/libraries/jotai|Jotai]] | state | web, react-native |  |  |
| [[docs/libraries/recoil|Recoil]] | state | web, react-native |  |  |
| [[docs/libraries/redux|Redux]] | state | web, react-native | 2016 | [[docs/libraries/zustand]] |
| [[docs/libraries/sass|Sass]] | styling | web | 2015 |  |
| [[docs/libraries/amd|AMD (RequireJS)]] | tooling | web | 2015 | [[docs/libraries/webpack]] |
| [[docs/libraries/appcenter|App Center]] | tooling | react-native |  |  |
| [[docs/libraries/babel|Babel]] | tooling | web, node |  |  |
| [[docs/libraries/bower|Bower]] | tooling | web | 2015 | [[docs/libraries/npm]] |
| [[docs/libraries/browsersync|BrowserSync]] | tooling | web | 2015 |  |
| [[docs/libraries/flightplan|Flightplan]] | tooling | node | 2015 |  |
| [[docs/libraries/gulp|Gulp]] | tooling | web | 2015 | [[docs/libraries/webpack]] |
| [[docs/libraries/husky|Husky]] | tooling | node |  | [[docs/libraries/lefthook]] |
| [[docs/libraries/simple-git-hooks|simple-git-hooks]] | tooling | node |  | [[docs/libraries/lefthook]] |
| [[docs/libraries/webpack|Webpack]] | tooling | web | 2015 | [[docs/libraries/vite]] |
| [[docs/libraries/yeoman|Yeoman]] | tooling | web | 2015 |  |
| [[docs/libraries/bootstrap|Bootstrap]] | ui | web |  |  |
| [[docs/libraries/jquery|jQuery]] | ui | web | 2015–2016 | [[docs/libraries/react]] |
| [[docs/libraries/radix|Radix UI]] | ui | web |  | [[docs/libraries/react-aria]] |
| [[docs/libraries/lodash|Lodash]] | utils | web, react-native, node |  | [[docs/libraries/remeda]] |
## Not libraries

UI galleries and inspiration sites from the Notion "UI Libraries" database, kept out of the library files: 21st.dev, Uiverse, Codrops, CodyHouse, shadcncraft, Shadcn Studio, Shadcn Space, Vercel Design, Material Design 3, Bit, Watermelon UI, beUI, unlumen UI, FeralUI, Bencho, 02ui Motion, Bklit UI, Evil Charts, KokonutUI, Amicro, Kinetics, Canvas UI, UI root, Layers, 000h, Cobe, ui.camera, Rare UI, Obsidian UI, ArcUI, Libraries.dev, Reactiive demos, React Native Motion.

AI apps from the Notion "Libraries" database (MidJourney, Kling, Perplexity, n8n, Windsurf, Claude and others) are tools, not libraries, and are left for a separate list.
