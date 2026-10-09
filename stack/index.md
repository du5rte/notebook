---
title: "Stack"
type: doc
created: 2026-10-07
updated: 2026-10-09
tags: [library, index]
---
# Stack

Everything I have used: languages, frameworks, libraries, services and tools, one file each. Bookmarks I haven't used yet live in `saved/`. `status` is one of `using`, `trying`, `watching`, `legacy` (replaced by something better, but I still use it), `dropped` or `deprecated` (the project itself is no longer maintained, listed with Dropped); `verified: false` means the status is a guess from old notes and has not been confirmed. The Dropped table at the bottom is the retrospective: filter it by platform for web, backend or mobile.

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
| [[stack/mobile/expo|Expo]] | framework, tooling | react-native |  |  |
| Lucide | icons |  |  | Feather |
| [[stack/web/javascript|JavaScript]] | language | web, react-native, node | 2015 |  |
| [[stack/web/typescript|TypeScript]] | language | web, react-native, node | 2015 | [[stack/web/coffeescript|CoffeeScript]] |
| [[stack/mobile/react-navigation|React Navigation]] | navigation | react-native |  |  |
| [[stack/web/legend-state|Legend State]] | state | web, react-native |  |  |
| [[stack/mobile/mmkv|MMKV]] | state | react-native |  |  |
| [[stack/mobile/restyle|Restyle]] | styling, ui | react-native |  |  |
| [[stack/tooling/jest|Jest]] | testing | web, react-native, node |  |  |
| [[stack/tooling/maestro|Maestro]] | testing | react-native |  |  |
| [[stack/tooling/eslint|ESLint]] | tooling | web, react-native, node |  |  |
| [[stack/mobile/fastlane|Fastlane]] | tooling | react-native, ios |  |  |
| [[stack/tooling/lefthook|Lefthook]] | tooling | node |  | [[stack/tooling/husky|Husky]], simple-git-hooks |
| [[stack/tooling/npm|npm]] | tooling | web, react-native, node | 2015 | Bower |
| [[stack/tooling/prettier|Prettier]] | tooling | web, react-native, node |  |  |
| [[stack/mobile/quickpush|QuickPush]] | tooling | react-native |  |  |
| [[stack/tooling/vite|Vite]] | tooling | web |  | [[stack/tooling/webpack|Webpack]] |
| [[stack/mobile/flashlist|FlashList]] | ui | react-native |  |  |
| [[stack/web/react-aria|React Aria]] | ui | web |  | [[stack/web/radix|Radix UI]] |
| [[stack/web/dayjs|Day.js]] | utils | web, react-native, node |  |  |
| [[stack/web/remeda|Remeda]] | utils | web, react-native, node |  | [[stack/web/lodash|Lodash]] |
| [[stack/web/tinycolor|TinyColor]] | utils | web, react-native |  |  |
| [[stack/tooling/obsidian|Obsidian]] | tooling |  |  |  |

## Legacy

| Library | Categories | Platforms | Using since | Replaced by |
|---|---|---|---|---|
| [[stack/backend/mongodb|MongoDB]] | database | node | 2016 | [[stack/backend/convex]] |
| [[stack/web/redux|Redux]] | state | web, react-native | 2016 | [[stack/web/zustand]] |
| [[stack/tooling/webpack|Webpack]] | tooling | web | 2015 | [[stack/tooling/vite]] |

## Trying

| Library | Categories | Platforms | Trying since | Replaces |
|---|---|---|---|---|
| [[stack/motion/lottie|Lottie]] | animation, graphics | web, react-native |  |  |
| [[stack/backend/clerk|Clerk]] | auth | web, react-native |  |  |
| [[stack/mobile/vector-icons|Vector Icons]] | icons | react-native |  |  |
| [[stack/mobile/skia|Skia]] | graphics, animation | react-native |  |  |
| [[stack/backend/python|Python]] | language | node | 2018 |  |
| [[stack/mobile/bottom-sheet|Bottom Sheet (gorhom)]] | navigation | react-native |  |  |
| [[stack/mobile/portal|Portal (gorhom)]] | navigation | react-native |  |  |
| [[stack/web/zustand|Zustand]] | state | web, react-native |  | [[stack/web/redux|Redux]] |
| [[stack/design/pen-dev|Pen.dev]] | graphics |  |  |  |
| [[stack/web/tailwind|Tailwind CSS]] | styling | web |  |  |
| [[stack/tooling/browserstack|BrowserStack]] | testing | web, react-native |  |  |
| [[stack/web/shadcn-ui|shadcn/ui]] | ui-kit | web |  |  |
| [[stack/mobile/tamagui|Tamagui]] | ui-kit, styling | web, react-native |  |  |
| [[stack/motion/ffmpeg|ffmpeg]] | utils | node |  |  |
| [[stack/web/fuse|Fuse.js]] | utils | web, react-native |  |  |
| [[stack/web/i18next|i18next]] | utils | web, react-native |  |  |
| [[stack/web/numbro|numbro]] | utils | web, react-native |  |  |

## Watching

| Library | Categories | Platforms |
|---|---|---|
| [[stack/web/lenis|Lenis]] | animation | web |
| [[stack/backend/better-auth|Better Auth]] | auth | web, node |
| [[stack/web/swr|SWR]] | data | web, react-native |
| [[stack/backend/trpc|tRPC]] | data | web, node |
| [[stack/web/tanstack-form|TanStack Form]] | forms | web |
| [[stack/mobile/victory-native|Victory Native]] | graphics | react-native |
| [[stack/mobile/detour|detour]] | navigation | react-native |
| [[stack/backend/sendgrid|SendGrid]] | services | node |
| [[stack/tooling/re-pack|Re.Pack]] | tooling | react-native |
| [[stack/web/animate-ui|Animate UI]] | ui-kit | web |
| [[stack/mobile/gifted-chat|Gifted Chat]] | ui | react-native |
| [[stack/web/heroui|HeroUI]] | ui-kit | web, react-native |
| [[stack/mobile/legend-list|Legend List]] | ui | react-native |
| [[stack/web/just|just]] | utils | web, react-native, node |
| [[stack/web/usehooks|useHooks]] | utils | web |

## Dropped

| Library | Categories | Platforms | Used | Replaced by |
|---|---|---|---|---|
| [[stack/web/react-motion|React Motion]] | animation | web | 2016 | [[stack/mobile/reanimated]] |
| [[stack/web/relay|Relay]] | data | web | 2016 | [[stack/backend/apollo]] |
| [[stack/backend/firebase|Firebase]] | database | web, react-native |  | [[stack/backend/convex]] |
| [[stack/backend/realm|Realm]] | database | react-native |  |  |
| [[stack/web/formik|Formik]] | forms | web, react-native |  |  |
| [[stack/3d/cinema-4d|Cinema 4D]] | graphics |  |  |  |
| [[stack/design/sketch|Sketch]] | graphics |  |  |  |
| Feather | icons |  |  | Lucide |
| [[stack/web/coffeescript|CoffeeScript]] | language | web | 2015 | [[stack/web/typescript]] |
| [[stack/mobile/swift|Swift]] | language | ios | 2016 | [[stack/mobile/react-native]] |
| [[stack/web/jotai|Jotai]] | state | web, react-native |  |  |
| [[stack/web/recoil|Recoil]] | state | web, react-native |  |  |
| [[stack/web/sass|Sass]] | styling | web | 2015 |  |
| [[stack/mobile/appcenter|App Center]] | tooling | react-native |  |  |
| [[stack/tooling/babel|Babel]] | tooling | web, node |  |  |
| [[stack/tooling/browsersync|BrowserSync]] | tooling | web | 2015 |  |
| [[stack/backend/flightplan|Flightplan]] | tooling | node | 2015 |  |
| [[stack/tooling/husky|Husky]] | tooling | node |  | [[stack/tooling/lefthook]] |
| [[stack/web/bootstrap|Bootstrap]] | ui-kit | web |  |  |
| [[stack/web/jquery|jQuery]] | ui | web | 2015–2016 | [[stack/web/react]] |
| [[stack/web/radix|Radix UI]] | ui | web |  | [[stack/web/react-aria]] |
| [[stack/web/lodash|Lodash]] | utils | web, react-native, node |  | [[stack/web/remeda]] |

## Not libraries

UI galleries, component sites and other saved UI kits are in [[saved/ui-kits]].

AI tools have records in `stack/ai/`: [[stack/ai/chatgpt|ChatGPT]], [[stack/ai/claude|Claude]], [[stack/ai/gemini|Gemini]], [[stack/ai/codex|Codex]], [[stack/ai/kling|Kling]]. MidJourney, Perplexity and n8n have none yet. Windsurf is in `stack/tooling/` with the other code editors.
