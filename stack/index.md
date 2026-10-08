---
title: "Stack"
type: doc
created: 2026-10-07
updated: 2026-10-08
tags: [library, index]
---
# Stack

Everything I have used: languages, frameworks, libraries, services and tools, one file each. Bookmarks I haven't used yet live in `saved/`. `status` is one of `using`, `trying`, `watching`, `legacy` (replaced by something better, but I still use it) or `dropped`; `verified: false` means the status is a guess from old notes and has not been confirmed. The Dropped table at the bottom is the retrospective: filter it by platform for web, backend or mobile.

Categories (usually one, sometimes two): `animation`, `auth`, `data`, `database`, `forms`, `framework`, `graphics`, `icons`, `language`, `navigation`, `services`, `state`, `styling`, `testing`, `tooling`, `ui`, `ui-kit`, `utils`.

`ui-kit` is a set of ready-styled components (shadcn/ui, HeroUI); `ui` is a single component or unstyled primitives (FlashList, React Aria). `icons` is an icon set.

UI kits, icon sets, fonts and design links I've only bookmarked live in [[saved/ui-kits|saved/]]. They get a file here once I use them in a project.

## Using

| Library | Categories | Platforms | Using since | Replaces |
|---|---|---|---|---|
| [[stack/gesture-handler|Gesture Handler]] | animation | react-native |  |  |
| [[stack/reanimated|Reanimated]] | animation | react-native |  | [[stack/react-motion|React Motion]] |
| [[stack/apollo|Apollo]] | data | web, react-native, node | 2016 | [[stack/relay|Relay]] |
| [[stack/graphql|GraphQL]] | data | web, react-native, node | 2016 |  |
| [[stack/convex|Convex]] | database, data | web, react-native |  | [[stack/firebase|Firebase]], [[stack/mongodb|MongoDB]] |
| [[stack/react|React]] | framework | web | 2016 | [[stack/jquery|jQuery]] |
| [[stack/react-native|React Native]] | framework | react-native | 2017 | [[stack/swift|Swift]] |
| [[stack/react-native-web|React Native for Web]] | framework | web |  |  |
| [[stack/expo|Expo]] | framework, tooling | react-native |  |  |
| [[stack/react-native-svg|react-native-svg]] | graphics | react-native |  |  |
| Lucide | icons |  |  | Feather |
| [[stack/javascript|JavaScript]] | language | web, react-native, node | 2015 |  |
| [[stack/typescript|TypeScript]] | language | web, react-native, node | 2015 | [[stack/coffeescript|CoffeeScript]] |
| [[stack/react-navigation|React Navigation]] | navigation | react-native |  |  |
| [[stack/legend-state|Legend State]] | state | web, react-native |  |  |
| [[stack/mmkv|MMKV]] | state | react-native |  |  |
| [[stack/restyle|Restyle]] | styling, ui | react-native |  |  |
| [[stack/jest|Jest]] | testing | web, react-native, node |  |  |
| [[stack/maestro|Maestro]] | testing | react-native |  |  |
| [[stack/codesandbox|CodeSandbox]] | tooling | web |  |  |
| [[stack/eslint|ESLint]] | tooling | web, react-native, node |  |  |
| [[stack/fastlane|Fastlane]] | tooling | react-native, ios |  |  |
| [[stack/keycode|KeyCode]] | tooling | web |  |  |
| [[stack/lefthook|Lefthook]] | tooling | node |  | [[stack/husky|Husky]], [[stack/simple-git-hooks|simple-git-hooks]] |
| [[stack/npm|npm]] | tooling | web, react-native, node | 2015 | [[stack/bower|Bower]] |
| [[stack/patch-package|patch-package]] | tooling | web, react-native, node |  |  |
| [[stack/prettier|Prettier]] | tooling | web, react-native, node |  |  |
| [[stack/quickpush|QuickPush]] | tooling | react-native |  |  |
| [[stack/runjs|RunJS]] | tooling | web |  |  |
| [[stack/vite|Vite]] | tooling | web |  | [[stack/webpack|Webpack]] |
| [[stack/flashlist|FlashList]] | ui | react-native |  |  |
| [[stack/react-aria|React Aria]] | ui | web |  | [[stack/radix|Radix UI]] |
| [[stack/safe-area-context|Safe Area Context]] | ui | react-native |  |  |
| [[stack/dayjs|Day.js]] | utils | web, react-native, node |  |  |
| [[stack/nanoid|Nano ID]] | utils | web, react-native, node |  |  |
| [[stack/remeda|Remeda]] | utils | web, react-native, node |  | [[stack/lodash|Lodash]] |
| [[stack/tinycolor|TinyColor]] | utils | web, react-native |  |  |

## Legacy

| Library | Categories | Platforms | Using since | Replaced by |
|---|---|---|---|---|
| [[stack/mongodb|MongoDB]] | database | node | 2016 | [[stack/convex]] |
| [[stack/redux|Redux]] | state | web, react-native | 2016 | [[stack/zustand]] |
| [[stack/webpack|Webpack]] | tooling | web | 2015 | [[stack/vite]] |

## Trying

| Library | Categories | Platforms | Trying since | Replaces |
|---|---|---|---|---|
| [[stack/lottie|Lottie]] | animation, graphics | web, react-native |  |  |
| [[stack/clerk|Clerk]] | auth | web, react-native |  |  |
| [[stack/vector-icons|Vector Icons]] | icons | react-native |  |  |
| [[stack/skia|Skia]] | graphics, animation | react-native |  |  |
| [[stack/python|Python]] | language | node | 2018 |  |
| [[stack/bottom-sheet|Bottom Sheet (gorhom)]] | navigation | react-native |  |  |
| [[stack/hold-menu|Hold Menu]] | navigation | react-native |  |  |
| [[stack/portal|Portal (gorhom)]] | navigation | react-native |  |  |
| [[stack/sticky-parallax-header|Sticky Parallax Header]] | navigation | react-native |  |  |
| [[stack/adjust|Adjust]] | services | react-native |  |  |
| [[stack/appdynamics|AppDynamics]] | services | react-native |  |  |
| [[stack/zustand|Zustand]] | state | web, react-native |  | [[stack/redux|Redux]] |
| [[stack/linear-gradient|Linear Gradient]] | styling | react-native |  |  |
| [[stack/masked-view|Masked View]] | styling | react-native |  |  |
| [[stack/react-native-dynamic|react-native-dynamic]] | styling | react-native |  |  |
| [[stack/tailwind|Tailwind CSS]] | styling | web |  |  |
| [[stack/browserstack|BrowserStack]] | testing | web, react-native |  |  |
| [[stack/reactotron|Reactotron]] | tooling | react-native |  |  |
| [[stack/device-info|Device Info]] | ui | react-native |  |  |
| [[stack/fast-image|FastImage]] | ui | react-native |  |  |
| [[stack/shadcn-ui|shadcn/ui]] | ui-kit | web |  |  |
| [[stack/sonner|Sonner]] | ui | web, react-native |  |  |
| [[stack/tamagui|Tamagui]] | ui-kit, styling | web, react-native |  |  |
| [[stack/delay|delay]] | utils | web, react-native, node |  |  |
| [[stack/ffmpeg|ffmpeg]] | utils | node |  |  |
| [[stack/fuse|Fuse.js]] | utils | web, react-native |  |  |
| [[stack/i18next|i18next]] | utils | web, react-native |  |  |
| [[stack/numbro|numbro]] | utils | web, react-native |  |  |

## Watching

| Library | Categories | Platforms |
|---|---|---|
| [[stack/confetti|Confetti]] | animation | react-native |
| [[stack/lenis|Lenis]] | animation | web |
| [[stack/pressto|Pressto]] | animation | react-native |
| [[stack/pulsar|Pulsar]] | animation | react-native, ios |
| [[stack/sortables|React Native Sortables]] | animation | react-native |
| [[stack/react-native-css-animations|react-native-css-animations]] | animation | react-native |
| [[stack/react-native-ease|react-native-ease]] | animation | react-native |
| [[stack/reanimated-dnd|react-native-reanimated-dnd]] | animation | react-native |
| [[stack/screen-transitions|react-native-screen-transitions]] | animation | react-native |
| [[stack/tickle|react-native-tickle]] | animation | react-native |
| [[stack/better-auth|Better Auth]] | auth | web, node |
| [[stack/nitro-fetch|react-native-nitro-fetch]] | data | react-native |
| [[stack/swr|SWR]] | data | web, react-native |
| [[stack/trpc|tRPC]] | data | web, node |
| [[stack/instantdb|InstantDB]] | database | web, react-native |
| [[stack/watermelon-db|WatermelonDB]] | database | react-native |
| [[stack/tanstack-form|TanStack Form]] | forms | web |
| [[stack/nano-icons|Nano Icons]] | icons | react-native |
| [[stack/fast-squircle|react-native-fast-squircle]] | graphics | react-native |
| [[stack/victory-native|Victory Native]] | graphics | react-native |
| [[stack/d3|D3.js]] | graphics, data | web |
| [[stack/solidity|Solidity]] | language | web |
| [[stack/detour|detour]] | navigation | react-native |
| [[stack/expo-motion-tabs|expo-motion-tabs]] | navigation | react-native |
| [[stack/react-native-onboarding|react-native-onboarding]] | navigation | react-native |
| [[stack/sendgrid|SendGrid]] | services | node |
| [[stack/unocss|UnoCSS]] | styling | web |
| [[stack/radon-ide|Radon IDE]] | tooling | react-native |
| [[stack/re-pack|Re.Pack]] | tooling | react-native |
| [[stack/animate-ui|Animate UI]] | ui-kit | web |
| [[stack/boneyard|Boneyard]] | ui | web, react-native |
| [[stack/daisyui|daisyUI]] | ui-kit | web |
| [[stack/expo-ui|Expo UI]] | ui | react-native |
| [[stack/expo-live-activity|expo-live-activity]] | ui | react-native, ios |
| [[stack/expo-quick-actions|expo-quick-actions]] | ui | react-native |
| [[stack/flash-calendar|Flash Calendar]] | ui | react-native |
| [[stack/gifted-chat|Gifted Chat]] | ui | react-native |
| [[stack/heroui|HeroUI]] | ui-kit | web, react-native |
| [[stack/legend-list|Legend List]] | ui | react-native |
| [[stack/primer|Primer]] | ui-kit | web |
| [[stack/react-bits|React Bits]] | ui-kit | web |
| [[stack/react-native-reusables|React Native Reusables]] | ui-kit | react-native |
| [[stack/coachmark|react-native-coachmark]] | ui | react-native |
| [[stack/enriched|react-native-enriched]] | ui | react-native |
| [[stack/nitro-device-info|react-native-nitro-device-info]] | ui | react-native |
| [[stack/ui-datepicker|react-native-ui-datepicker]] | ui | react-native |
| [[stack/just|just]] | utils | web, react-native, node |
| [[stack/react-handyhooks|React Handyhooks]] | utils | web |
| [[stack/usehooks|useHooks]] | utils | web |

## Dropped

| Library | Categories | Platforms | Used | Replaced by |
|---|---|---|---|---|
| [[stack/react-motion|React Motion]] | animation | web | 2016 | [[stack/reanimated]] |
| [[stack/relay|Relay]] | data | web | 2016 | [[stack/apollo]] |
| [[stack/firebase|Firebase]] | database | web, react-native |  | [[stack/convex]] |
| [[stack/realm|Realm]] | database | react-native |  |  |
| [[stack/formik|Formik]] | forms | web, react-native |  |  |
| Feather | icons |  |  | [[stack/lucide]] |
| [[stack/coffeescript|CoffeeScript]] | language | web | 2015 | [[stack/typescript]] |
| [[stack/swift|Swift]] | language | ios | 2016 | [[stack/react-native]] |
| [[stack/jotai|Jotai]] | state | web, react-native |  |  |
| [[stack/recoil|Recoil]] | state | web, react-native |  |  |
| [[stack/sass|Sass]] | styling | web | 2015 |  |
| [[stack/amd|AMD (RequireJS)]] | tooling | web | 2015 | [[stack/webpack]] |
| [[stack/appcenter|App Center]] | tooling | react-native |  |  |
| [[stack/babel|Babel]] | tooling | web, node |  |  |
| [[stack/bower|Bower]] | tooling | web | 2015 | [[stack/npm]] |
| [[stack/browsersync|BrowserSync]] | tooling | web | 2015 |  |
| [[stack/flightplan|Flightplan]] | tooling | node | 2015 |  |
| [[stack/gulp|Gulp]] | tooling | web | 2015 | [[stack/webpack]] |
| [[stack/husky|Husky]] | tooling | node |  | [[stack/lefthook]] |
| [[stack/simple-git-hooks|simple-git-hooks]] | tooling | node |  | [[stack/lefthook]] |
| [[stack/yeoman|Yeoman]] | tooling | web | 2015 |  |
| [[stack/bootstrap|Bootstrap]] | ui-kit | web |  |  |
| [[stack/jquery|jQuery]] | ui | web | 2015–2016 | [[stack/react]] |
| [[stack/radix|Radix UI]] | ui | web |  | [[stack/react-aria]] |
| [[stack/lodash|Lodash]] | utils | web, react-native, node |  | [[stack/remeda]] |

## Not libraries

UI galleries, component sites and other saved UI kits are in [[saved/ui-kits]].

AI apps (MidJourney, Kling, Perplexity, n8n, Windsurf, Claude and others) are tools, not libraries, and are left for a separate list.
