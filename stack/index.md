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
| [[stack/mobile/gesture-handler|Gesture Handler]] | animation | react-native |  |  |
| [[stack/mobile/reanimated|Reanimated]] | animation | react-native |  | [[stack/web/react-motion|React Motion]] |
| [[stack/backend/apollo|Apollo]] | data | web, react-native, node | 2016 | [[stack/web/relay|Relay]] |
| [[stack/backend/graphql|GraphQL]] | data | web, react-native, node | 2016 |  |
| [[stack/backend/convex|Convex]] | database, data | web, react-native |  | [[stack/backend/firebase|Firebase]], [[stack/backend/mongodb|MongoDB]] |
| [[stack/web/react|React]] | framework | web | 2016 | [[stack/web/jquery|jQuery]] |
| [[stack/mobile/react-native|React Native]] | framework | react-native | 2017 | [[stack/mobile/swift|Swift]] |
| [[stack/web/react-native-web|React Native for Web]] | framework | web |  |  |
| [[stack/mobile/expo|Expo]] | framework, tooling | react-native |  |  |
| [[stack/design/react-native-svg|react-native-svg]] | graphics | react-native |  |  |
| Lucide | icons |  |  | Feather |
| [[stack/web/javascript|JavaScript]] | language | web, react-native, node | 2015 |  |
| [[stack/web/typescript|TypeScript]] | language | web, react-native, node | 2015 | [[stack/web/coffeescript|CoffeeScript]] |
| [[stack/mobile/react-navigation|React Navigation]] | navigation | react-native |  |  |
| [[stack/web/legend-state|Legend State]] | state | web, react-native |  |  |
| [[stack/mobile/mmkv|MMKV]] | state | react-native |  |  |
| [[stack/design/restyle|Restyle]] | styling, ui | react-native |  |  |
| [[stack/devops/jest|Jest]] | testing | web, react-native, node |  |  |
| [[stack/devops/maestro|Maestro]] | testing | react-native |  |  |
| [[stack/devops/codesandbox|CodeSandbox]] | tooling | web |  |  |
| [[stack/devops/eslint|ESLint]] | tooling | web, react-native, node |  |  |
| [[stack/devops/fastlane|Fastlane]] | tooling | react-native, ios |  |  |
| [[stack/devops/keycode|KeyCode]] | tooling | web |  |  |
| [[stack/devops/lefthook|Lefthook]] | tooling | node |  | [[stack/devops/husky|Husky]], [[stack/devops/simple-git-hooks|simple-git-hooks]] |
| [[stack/devops/npm|npm]] | tooling | web, react-native, node | 2015 | [[stack/devops/bower|Bower]] |
| [[stack/devops/patch-package|patch-package]] | tooling | web, react-native, node |  |  |
| [[stack/devops/prettier|Prettier]] | tooling | web, react-native, node |  |  |
| [[stack/devops/quickpush|QuickPush]] | tooling | react-native |  |  |
| [[stack/devops/runjs|RunJS]] | tooling | web |  |  |
| [[stack/devops/vite|Vite]] | tooling | web |  | [[stack/devops/webpack|Webpack]] |
| [[stack/mobile/flashlist|FlashList]] | ui | react-native |  |  |
| [[stack/web/react-aria|React Aria]] | ui | web |  | [[stack/web/radix|Radix UI]] |
| [[stack/mobile/safe-area-context|Safe Area Context]] | ui | react-native |  |  |
| [[stack/web/dayjs|Day.js]] | utils | web, react-native, node |  |  |
| [[stack/web/nanoid|Nano ID]] | utils | web, react-native, node |  |  |
| [[stack/web/remeda|Remeda]] | utils | web, react-native, node |  | [[stack/web/lodash|Lodash]] |
| [[stack/web/tinycolor|TinyColor]] | utils | web, react-native |  |  |

## Legacy

| Library | Categories | Platforms | Using since | Replaced by |
|---|---|---|---|---|
| [[stack/backend/mongodb|MongoDB]] | database | node | 2016 | [[stack/backend/convex]] |
| [[stack/web/redux|Redux]] | state | web, react-native | 2016 | [[stack/web/zustand]] |
| [[stack/devops/webpack|Webpack]] | tooling | web | 2015 | [[stack/devops/vite]] |

## Trying

| Library | Categories | Platforms | Trying since | Replaces |
|---|---|---|---|---|
| [[stack/design/lottie|Lottie]] | animation, graphics | web, react-native |  |  |
| [[stack/backend/clerk|Clerk]] | auth | web, react-native |  |  |
| [[stack/design/vector-icons|Vector Icons]] | icons | react-native |  |  |
| [[stack/design/skia|Skia]] | graphics, animation | react-native |  |  |
| [[stack/backend/python|Python]] | language | node | 2018 |  |
| [[stack/mobile/bottom-sheet|Bottom Sheet (gorhom)]] | navigation | react-native |  |  |
| [[stack/mobile/hold-menu|Hold Menu]] | navigation | react-native |  |  |
| [[stack/mobile/portal|Portal (gorhom)]] | navigation | react-native |  |  |
| [[stack/mobile/sticky-parallax-header|Sticky Parallax Header]] | navigation | react-native |  |  |
| [[stack/backend/adjust|Adjust]] | services | react-native |  |  |
| [[stack/backend/appdynamics|AppDynamics]] | services | react-native |  |  |
| [[stack/web/zustand|Zustand]] | state | web, react-native |  | [[stack/web/redux|Redux]] |
| [[stack/design/linear-gradient|Linear Gradient]] | styling | react-native |  |  |
| [[stack/design/masked-view|Masked View]] | styling | react-native |  |  |
| [[stack/design/react-native-dynamic|react-native-dynamic]] | styling | react-native |  |  |
| [[stack/design/tailwind|Tailwind CSS]] | styling | web |  |  |
| [[stack/devops/browserstack|BrowserStack]] | testing | web, react-native |  |  |
| [[stack/devops/reactotron|Reactotron]] | tooling | react-native |  |  |
| [[stack/mobile/device-info|Device Info]] | ui | react-native |  |  |
| [[stack/mobile/fast-image|FastImage]] | ui | react-native |  |  |
| [[stack/design/shadcn-ui|shadcn/ui]] | ui-kit | web |  |  |
| [[stack/web/sonner|Sonner]] | ui | web, react-native |  |  |
| [[stack/design/tamagui|Tamagui]] | ui-kit, styling | web, react-native |  |  |
| [[stack/web/delay|delay]] | utils | web, react-native, node |  |  |
| [[stack/backend/ffmpeg|ffmpeg]] | utils | node |  |  |
| [[stack/web/fuse|Fuse.js]] | utils | web, react-native |  |  |
| [[stack/web/i18next|i18next]] | utils | web, react-native |  |  |
| [[stack/web/numbro|numbro]] | utils | web, react-native |  |  |

## Watching

| Library | Categories | Platforms |
|---|---|---|
| [[stack/mobile/confetti|Confetti]] | animation | react-native |
| [[stack/web/lenis|Lenis]] | animation | web |
| [[stack/mobile/pressto|Pressto]] | animation | react-native |
| [[stack/mobile/pulsar|Pulsar]] | animation | react-native, ios |
| [[stack/mobile/sortables|React Native Sortables]] | animation | react-native |
| [[stack/mobile/react-native-css-animations|react-native-css-animations]] | animation | react-native |
| [[stack/mobile/react-native-ease|react-native-ease]] | animation | react-native |
| [[stack/mobile/reanimated-dnd|react-native-reanimated-dnd]] | animation | react-native |
| [[stack/mobile/screen-transitions|react-native-screen-transitions]] | animation | react-native |
| [[stack/mobile/tickle|react-native-tickle]] | animation | react-native |
| [[stack/backend/better-auth|Better Auth]] | auth | web, node |
| [[stack/mobile/nitro-fetch|react-native-nitro-fetch]] | data | react-native |
| [[stack/web/swr|SWR]] | data | web, react-native |
| [[stack/backend/trpc|tRPC]] | data | web, node |
| [[stack/backend/instantdb|InstantDB]] | database | web, react-native |
| [[stack/backend/watermelon-db|WatermelonDB]] | database | react-native |
| [[stack/web/tanstack-form|TanStack Form]] | forms | web |
| [[stack/design/nano-icons|Nano Icons]] | icons | react-native |
| [[stack/design/fast-squircle|react-native-fast-squircle]] | graphics | react-native |
| [[stack/design/victory-native|Victory Native]] | graphics | react-native |
| [[stack/design/d3|D3.js]] | graphics, data | web |
| [[stack/backend/solidity|Solidity]] | language | web |
| [[stack/mobile/detour|detour]] | navigation | react-native |
| [[stack/mobile/expo-motion-tabs|expo-motion-tabs]] | navigation | react-native |
| [[stack/mobile/react-native-onboarding|react-native-onboarding]] | navigation | react-native |
| [[stack/backend/sendgrid|SendGrid]] | services | node |
| [[stack/design/unocss|UnoCSS]] | styling | web |
| [[stack/devops/radon-ide|Radon IDE]] | tooling | react-native |
| [[stack/devops/re-pack|Re.Pack]] | tooling | react-native |
| [[stack/design/animate-ui|Animate UI]] | ui-kit | web |
| [[stack/web/boneyard|Boneyard]] | ui | web, react-native |
| [[stack/design/daisyui|daisyUI]] | ui-kit | web |
| [[stack/mobile/expo-ui|Expo UI]] | ui | react-native |
| [[stack/mobile/expo-live-activity|expo-live-activity]] | ui | react-native, ios |
| [[stack/mobile/expo-quick-actions|expo-quick-actions]] | ui | react-native |
| [[stack/mobile/flash-calendar|Flash Calendar]] | ui | react-native |
| [[stack/mobile/gifted-chat|Gifted Chat]] | ui | react-native |
| [[stack/design/heroui|HeroUI]] | ui-kit | web, react-native |
| [[stack/mobile/legend-list|Legend List]] | ui | react-native |
| [[stack/design/primer|Primer]] | ui-kit | web |
| [[stack/design/react-bits|React Bits]] | ui-kit | web |
| [[stack/design/react-native-reusables|React Native Reusables]] | ui-kit | react-native |
| [[stack/mobile/coachmark|react-native-coachmark]] | ui | react-native |
| [[stack/mobile/enriched|react-native-enriched]] | ui | react-native |
| [[stack/mobile/nitro-device-info|react-native-nitro-device-info]] | ui | react-native |
| [[stack/mobile/ui-datepicker|react-native-ui-datepicker]] | ui | react-native |
| [[stack/web/just|just]] | utils | web, react-native, node |
| [[stack/web/react-handyhooks|React Handyhooks]] | utils | web |
| [[stack/web/usehooks|useHooks]] | utils | web |

## Dropped

| Library | Categories | Platforms | Used | Replaced by |
|---|---|---|---|---|
| [[stack/web/react-motion|React Motion]] | animation | web | 2016 | [[stack/mobile/reanimated]] |
| [[stack/web/relay|Relay]] | data | web | 2016 | [[stack/backend/apollo]] |
| [[stack/backend/firebase|Firebase]] | database | web, react-native |  | [[stack/backend/convex]] |
| [[stack/backend/realm|Realm]] | database | react-native |  |  |
| [[stack/web/formik|Formik]] | forms | web, react-native |  |  |
| Feather | icons |  |  | [[stack/design/lucide]] |
| [[stack/web/coffeescript|CoffeeScript]] | language | web | 2015 | [[stack/web/typescript]] |
| [[stack/mobile/swift|Swift]] | language | ios | 2016 | [[stack/mobile/react-native]] |
| [[stack/web/jotai|Jotai]] | state | web, react-native |  |  |
| [[stack/web/recoil|Recoil]] | state | web, react-native |  |  |
| [[stack/design/sass|Sass]] | styling | web | 2015 |  |
| [[stack/devops/amd|AMD (RequireJS)]] | tooling | web | 2015 | [[stack/devops/webpack]] |
| [[stack/devops/appcenter|App Center]] | tooling | react-native |  |  |
| [[stack/devops/babel|Babel]] | tooling | web, node |  |  |
| [[stack/devops/bower|Bower]] | tooling | web | 2015 | [[stack/devops/npm]] |
| [[stack/devops/browsersync|BrowserSync]] | tooling | web | 2015 |  |
| [[stack/devops/flightplan|Flightplan]] | tooling | node | 2015 |  |
| [[stack/devops/gulp|Gulp]] | tooling | web | 2015 | [[stack/devops/webpack]] |
| [[stack/devops/husky|Husky]] | tooling | node |  | [[stack/devops/lefthook]] |
| [[stack/devops/simple-git-hooks|simple-git-hooks]] | tooling | node |  | [[stack/devops/lefthook]] |
| [[stack/devops/yeoman|Yeoman]] | tooling | web | 2015 |  |
| [[stack/design/bootstrap|Bootstrap]] | ui-kit | web |  |  |
| [[stack/web/jquery|jQuery]] | ui | web | 2015–2016 | [[stack/web/react]] |
| [[stack/web/radix|Radix UI]] | ui | web |  | [[stack/web/react-aria]] |
| [[stack/web/lodash|Lodash]] | utils | web, react-native, node |  | [[stack/web/remeda]] |

## Not libraries

UI galleries, component sites and other saved UI kits are in [[saved/ui-kits]].

AI apps (MidJourney, Kling, Perplexity, n8n, Windsurf, Claude and others) are tools, not libraries, and are left for a separate list.
