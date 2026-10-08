---
title: "React - Basics"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [react, web]
---
# React - Basics

React is a library for building user interfaces out of **components**: small functions that take data and return what the screen should look like. You describe the UI for a given state, and React works out what to change in the page when that state changes. Think of a coffee shop menu board: you don't repaint the whole board when the oat milk runs out, you swap one line. React does that swapping for you.

Every example here is TypeScript (`.tsx`). The same ideas carry straight over to [[docs/react-native/react-native|React Native - Basics]], only the building blocks change (`View` instead of `div`).

## Components are functions

A component is a function whose name starts with a capital letter and that returns JSX.

```tsx
function Welcome() {
  return <h1>Welcome to the coffee shop ☕</h1>
}

// used like an HTML tag
<Welcome /> // <h1>Welcome to the coffee shop ☕</h1>
```

The capital letter matters: `<welcome />` is treated as an HTML tag, `<Welcome />` as your component.

You'll still find class components (`class Welcome extends React.Component`) in old code and old tutorials. Function components plus hooks replaced them. Don't write new ones.

## JSX

JSX looks like HTML but it's JavaScript. A compiler turns each tag into a function call, so you can put any JavaScript **expression** inside curly braces.

```tsx
const name = 'Ana'
const price = 3.5

const order = (
  <p>
    {name} ordered a flat white for £{price.toFixed(2)}
  </p>
)
// <p>Ana ordered a flat white for £3.50</p>
```

A few differences from HTML:

- `className`, not `class`. `htmlFor`, not `for`.
- Every tag closes: `<img />`, `<br />`.
- Attributes are camelCase: `onClick`, `tabIndex`.
- A component returns **one** root. Wrap siblings in a fragment `<>...</>` when you don't want an extra `div`.

```tsx
function Header() {
  return (
    <>
      <h1>Menu</h1>
      <p>Open until 6pm</p>
    </>
  )
}
```

## Props: data in

Props are the arguments of a component. You pass them like attributes and read them as one object. Type them with a `type` and destructure them in the signature.

```tsx
type DrinkProps = {
  name: string
  price: number
}

function Drink({ name, price }: DrinkProps) {
  return (
    <li>
      {name}: £{price.toFixed(2)}
    </li>
  )
}

<Drink name="Latte" price={3.2} /> // <li>Latte: £3.20</li>
```

Strings can go in quotes; everything else (numbers, booleans, objects, functions) goes in braces. Props are **read-only**: a component never changes its own props. When something needs to change, that's state (see [[docs/react/react-state|React - State and Hooks]]).

## Rendering lists with keys

To render a list, `map` an array to elements. Each item needs a `key` that is stable and unique among its siblings, so React can tell which item is which between renders.

```tsx
type Drink = { id: string; name: string; price: number }

const drinks: Drink[] = [
  { id: 'latte', name: 'Latte', price: 3.2 },
  { id: 'mocha', name: 'Mocha', price: 3.6 },
]

function Menu() {
  return (
    <ul>
      {drinks.map((drink) => (
        <li key={drink.id}>{drink.name}</li>
      ))}
    </ul>
  )
}
// <ul><li>Latte</li><li>Mocha</li></ul>
```

Use an id from your data. ❌ `key={index}` looks fine until the list is sorted, filtered or has an item removed: React then matches the wrong rows, and an input or animation sticks to the wrong drink. ✅ `key={drink.id}`.

## Conditional rendering

There's no special `if` syntax. You use plain JavaScript: an early `return`, a ternary, or `&&`.

```tsx
type BasketProps = { itemCount: number }

function Basket({ itemCount }: BasketProps) {
  if (itemCount === 0) return <p>Your basket is empty</p>

  return (
    <p>
      {itemCount} {itemCount === 1 ? 'item' : 'items'}
    </p>
  )
}

<Basket itemCount={0} /> // <p>Your basket is empty</p>
<Basket itemCount={2} /> // <p>2 items</p>
```

`&&` renders the right side only when the left is truthy. Watch out for numbers:

```tsx
// ❌ renders a lonely "0" when count is 0
{count && <Badge count={count} />}

// ✅ compare to get a real boolean
{count > 0 && <Badge count={count} />}
```

React skips `false`, `null` and `undefined`, but it happily renders `0`.

## Composition with children

Instead of giving a component a dozen props for every variation, let it wrap whatever you put inside it. Whatever sits between the tags arrives as the `children` prop.

```tsx
import type { ReactNode } from 'react'

type CardProps = {
  title: string
  children: ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <section className="card">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

<Card title="Today's special">
  <p>Pistachio latte</p>
  <button>Add to order</button>
</Card>
```

`Card` doesn't know or care what's inside. That's the point: small components that **compose** beat one big component with a pile of boolean props (`showButton`, `isSpecial`, `hasImage`...). This is the same idea as atomic design: small pieces (atoms) combine into bigger ones (molecules, organisms).

## Rendering to the page

You rarely write this by hand (Next.js and Expo do it for you), but it's good to know where it starts: React takes over one DOM node and renders your root component into it.

```tsx
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')!).render(<App />)
```

From then on you never touch the DOM directly. You change data, React updates the page.

## Common mistakes

- Lowercase component names: `<menu />` renders an HTML `<menu>`, not your `Menu`.
- Using the array index as `key` on a list that can change order.
- `{count && ...}` rendering `0`.
- Mutating props or data in place and expecting the screen to update. Create new values instead.
- Calling a component like a function (`Menu()`) instead of rendering it (`<Menu />`). It breaks hooks.

## Try it

1. Build a `Menu` that takes `drinks: Drink[]` as a prop and renders each one with a `Drink` component, keyed by id.
2. Show "Sold out" next to drinks where `inStock` is `false`, and hide the price for them.
3. Make a `Card` component with `children` and use it for two different things: a drink and an opening-hours notice.

## Related
- [[docs/react/react-state|React - State and Hooks]]
- [[docs/react/react-forms|React - Forms]]
- [[docs/nextjs|Next.js - Basics]]
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/react-native/react-native|React Native - Basics]]
- [[docs/javascript/javascript-arrays|JavaScript Arrays]]
