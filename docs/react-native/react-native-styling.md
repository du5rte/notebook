---
title: "React Native - Styling and Themes"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [react, mobile]
---
# React Native - Styling and Themes

Styling in React Native is plain JavaScript objects: no CSS files, no cascade, no selectors. That sounds limiting, but it's why styles are predictable: a component looks the way its own props say, nothing leaks in from elsewhere. The skill is not writing styles, it's **organising them**: a typed theme of tokens, and components that pick from it through variants. Think of a paint shop with a fixed colour chart: you order "ocean blue", not a hex code, and every wall in the house matches.

## Style objects

Every core component takes a `style` prop. Property names are camelCase, numbers are density-independent points (no `px`), and layout is [[docs/css/css-flexbox|flexbox]].

```tsx
<View style={{ padding: 16, backgroundColor: '#fff8f0' }}>
  <Text style={{ fontSize: 18, fontWeight: '600' }}>Flat white</Text>
</View>
```

Two differences from CSS on the web catch everyone:

- `flexDirection` defaults to `'column'`, not `'row'`. Things stack top to bottom.
- Nothing is inherited, except text styles from a parent `<Text>` to a nested `<Text>`. A colour on a `<View>` doesn't reach the text inside it.

## Arrays and state

`style` also takes an array. Later entries win, and `false` or `undefined` are ignored. That's how you do conditional styles.

```tsx
<Text style={[styles.label, isSoldOut && styles.muted]}>Croissant</Text>
// isSoldOut = true → label + muted styles
```

There is no `:hover`. For touch feedback, `Pressable` passes `pressed` to a style function:

```tsx
<Pressable style={({ pressed }) => [styles.button, pressed && { opacity: 0.6 }]}>
  <Text>Order</Text>
</Pressable>
// fades while your finger is down
```

## StyleSheet vs a typed theme

`StyleSheet.create` is the built-in way: a named object of styles beside the component.

```tsx
const styles = StyleSheet.create({
  card: { padding: 16, borderRadius: 12, backgroundColor: '#ffffff' },
})
```

It works, but every value is hard-coded. Change the brand colour and you're grepping for `#ffffff` across fifty files, and dark mode means doing it twice.

A **theme** fixes this. You define the design tokens once, with types, and components can only use names from it.

```ts
export const theme = {
  colors: {
    background: '#fff8f0',
    surface: '#ffffff',
    primary: '#6b3e26',
    text: '#1f1a17',
    muted: '#8a817c',
  },
  spacing: { s: 8, m: 16, l: 24, xl: 40 },
  radii: { s: 6, m: 12 },
  text: {
    title: { fontSize: 24, fontWeight: '700' },
    body: { fontSize: 16 },
  },
} as const

type Theme = typeof theme
type Colour = keyof Theme['colors'] // 'background' | 'surface' | 'primary' | ...
```

Now a typo is a type error, not a wrong colour in production. A dark theme is the same shape with different values, and you swap the whole object based on `useColorScheme()`.

| | `StyleSheet` | Typed theme |
|---|---|---|
| Values | Hard-coded per file | ✅ Defined once |
| Dark mode | ❌ Duplicate everything | ✅ Swap the theme |
| Typos | ⚠️ Silent | ✅ Type error |
| Consistency | Up to discipline | Enforced by types |

Restyle (from Shopify) is a library built on exactly this idea: you pass a theme, and components like `Box` and `Text` take token names as props (`<Box padding="m" backgroundColor="surface">`). I used Restyle for years and ended up forking it into my own package.

## Variants

Most components come in a few flavours: a button can be primary or secondary, small or large, disabled or not. Instead of `if`s scattered through the JSX, declare them once as **variants**, and the component just picks.

With `tailwind-variants` the shape looks like this:

```ts
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'rounded-xl px-4 py-3',
  variants: {
    intent: {
      primary: 'bg-primary',
      secondary: 'bg-surface',
    },
    disabled: {
      true: 'opacity-50',
    },
  },
  defaultVariants: { intent: 'primary' },
})

button({ intent: 'secondary', disabled: true })
// 'rounded-xl px-4 py-3 bg-surface opacity-50'
```

How I write them:

- Boolean variants use `'true'` / `'false'` keys, so `disabled` reads like any other variant.
- Declare variants **lowest priority first**. Later variants override earlier ones, so `disabled` goes last: it should win over `intent`.
- Keep the variant styles beside the component, in `<name>.styles.ts`.

My own `rv()` is the same idea on top of a Restyle-style theme: variants that resolve to theme tokens instead of class names.

## Uniwind: Tailwind for React Native

Uniwind brings Tailwind to React Native: you write `className` on native components, and it compiles the classes to native styles. If you already use Tailwind on the web, your muscle memory transfers, and your design tokens can live in one Tailwind theme shared by web and native.

```tsx
<View className="p-4 rounded-xl bg-surface">
  <Text className="text-lg font-semibold text-primary">Flat white</Text>
</View>
```

It pairs well with tailwind-variants: `className={button({ intent: 'primary' })}`. Setup lives in the Uniwind docs.

I tried Uniwind with HeroUI Native and went back to Restyle with `rv()`. Typed theme or Tailwind, the rule is the same: **tokens, never raw values**.

## Common mistakes

- **Hard-coding values.** `padding: 13` or `color: '#333'` in a component means it will drift from the design. Use a token.
- **Inline objects everywhere.** `style={{ ... }}` creates a new object every render and hides the design decisions. Put styles in variants.
- **Expecting inheritance.** Setting a font on a `<View>` does nothing for its text.
- **Forgetting dark mode until the end.** If everything is a token, dark mode is one new theme. If not, it's a rewrite.

## Try it

1. Write a `theme` object with four colours and three spacing steps, and a `Colour` type from its keys.
2. Build a `Card` that takes `tone: 'default' | 'highlight'` and picks its background from the theme.
3. Add a dark theme with the same keys and switch between them with `useColorScheme()`.

## Related
- [[docs/react-native/react-native|React Native - Basics]]
- [[docs/react-native/react-native-animation|React Native - Animation]]
- [[docs/css/css-flexbox|CSS - Flexbox]]
- [[docs/react/react|React - Basics]]
- [[docs/typescript/typescript|TypeScript - Basics]]
