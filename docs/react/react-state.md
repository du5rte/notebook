---
title: "React - State and Hooks"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: [React - Hooks]
tags: [react, state]
---
# React - State and Hooks

State is the data a component remembers between renders: what's in the basket, whether a menu is open, what you typed. When state changes, React re-renders the component with the new value. Hooks are the functions (`useState`, `useEffect`...) that let a function component hold state and talk to the outside world.

**TLDR;** keep as little state as possible. Compute what you can, keep each piece in one place, and let a server cache own server data.

## useState

`useState` gives you the current value and a setter. Calling the setter schedules a re-render with the new value.

```tsx
import { useState } from 'react'

function Counter() {
  const [shots, setShots] = useState(1)

  return (
    <button onClick={() => setShots(shots + 1)}>
      {shots} {shots === 1 ? 'shot' : 'shots'}
    </button>
  )
}
// click, click → "3 shots"
```

Two rules that catch everyone:

- The value doesn't change until the next render. `setShots(shots + 1)` twice in a row adds one, not two. When the new value depends on the old one, pass a function: `setShots((current) => current + 1)`.
- Never mutate. React compares by reference, so a pushed array looks unchanged.

```tsx
// ❌ same array, React sees no change
basket.push(latte)
setBasket(basket)

// ✅ new array
setBasket([...basket, latte])
```

## Rules of hooks

Hooks are called at the **top level** of a component or another hook. Not inside `if`, loops or callbacks. React tracks hooks by call order, so the order must be the same every render. A linter rule (`react-hooks`) catches this for you.

## Derived state: don't store what you can compute

If a value can be calculated from props or other state, calculate it during render. Don't put it in state and try to keep it in sync.

```tsx
type Item = { name: string; price: number }

// ❌ two sources of truth, one will drift
const [items, setItems] = useState<Item[]>([])
const [total, setTotal] = useState(0)

// ✅ one source, total is always right
const [items, setItems] = useState<Item[]>([])
const total = items.reduce((sum, item) => sum + item.price, 0)
// items: latte 3.2, mocha 3.6 → total 6.8
```

Same for filtered lists, counts, `isValid` flags, full names. If you catch yourself writing a `useEffect` to update one state from another, it's derived state.

## Lifting state up

When two components need the same data, move the state to their closest common parent and pass it down as props. The parent owns it; the children read it and call back to change it.

```tsx
function Order() {
  const [size, setSize] = useState<'small' | 'large'>('small')

  return (
    <>
      <SizePicker size={size} onChange={setSize} />
      <Price size={size} />
    </>
  )
}

type SizePickerProps = {
  size: 'small' | 'large'
  onChange: (size: 'small' | 'large') => void
}

function SizePicker({ size, onChange }: SizePickerProps) {
  return (
    <button onClick={() => onChange(size === 'small' ? 'large' : 'small')}>
      {size}
    </button>
  )
}

function Price({ size }: { size: 'small' | 'large' }) {
  return <p>£{size === 'small' ? '3.00' : '3.60'}</p>
}
```

Data flows down, events flow up. When passing props through five layers gets painful, that's when you reach for context or a store, not before.

## Why Redux existed

Before hooks, sharing state across an app was hard, and Redux was the answer most of us used. Its ideas were good: **one store** as the single source of truth, state is read-only, and every change goes through a **pure reducer** `(state, action) => newState`.

```tsx
type Action = { type: 'increment' } | { type: 'decrement' }

function counter(state: number, action: Action): number {
  switch (action.type) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
  }
}
```

Most of what lived in those stores was server data (users, products, orders) copied into the client by hand. Server caches now do that job, and React has `useReducer` built in for the reducer pattern. Keep the ideas, skip the boilerplate.

## One source of truth: don't mirror server state

Data from an API already has an owner: the server, and the cache in front of it (Apollo, Convex, React Query). Read it from there. ❌ Fetch it and copy it into `useState` or a global store, and you now have two copies that disagree the moment someone else changes it.

```tsx
// ❌ a second copy that goes stale
const { data } = useQuery(PRODUCTS)
const [products, setProducts] = useState(data?.products ?? [])

// ✅ read straight from the cache
const { data } = useQuery(PRODUCTS)
const products = data?.products ?? []
```

Client state is only what the server doesn't know: is the drawer open, which tab is selected, a draft not yet saved. That's usually small. For the bit that's shared across the app, a small store does the job (I use Legend State for this).

## useEffect, and when you don't need it

`useEffect` runs code **after** render to sync with something outside React: a subscription, a timer, a browser API. Return a function to clean up.

```tsx
import { useEffect, useState } from 'react'

function useOnline() {
  const [online, setOnline] = useState(navigator.onLine)

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, []) // [] = run once after the first render

  return online
}
```

The dependency array lists every value from the component the effect uses. When one changes, React cleans up and runs the effect again.

You **don't** need an effect to:

- Compute a value from props or state. Do it in render (derived state, above).
- Respond to a click or submit. Do it in the event handler.
- Fetch data. Use your data library (Apollo, Convex, React Query) or a Server Component in [[docs/nextjs|Next.js - Basics]]. Hand-rolled fetch effects forget loading states, race conditions and caching.

The React docs have a whole page on this, "You Might Not Need an Effect". Worth reading twice.

## useMemo, useCallback and memo

By default, when a component re-renders, so do its children, and every function and object inside it is created again.

- `useMemo(() => value, [deps])` keeps a computed value until a dependency changes.
- `useCallback(fn, [deps])` keeps the same function reference.
- `memo(Component)` skips re-rendering a component when its props are the same.

```tsx
import { memo, useCallback, useMemo } from 'react'

const sorted = useMemo(() => [...drinks].sort(byPrice), [drinks])
const handleAdd = useCallback((id: string) => addToBasket(id), [addToBasket])
const DrinkRow = memo(function DrinkRow(props: DrinkRowProps) { /* ... */ })
```

They only help together: `memo` is useless if you pass it a new function every render. Reach for them when you've measured a slow render, or when a stable reference matters (long lists, animation, effect dependencies). On a cheap Android phone, long lists are exactly where it matters. The React Compiler now adds most of this memoisation automatically, so with it on you write far less of it by hand.

## Custom hooks

A custom hook is a function whose name starts with `use` and that calls other hooks. It's how you reuse **stateful logic**, not UI. `useOnline` above is one.

```tsx
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn((current) => !current), [])
  return [on, toggle] as const
}

const [menuOpen, toggleMenu] = useToggle()
// menuOpen: false → toggleMenu() → true
```

Each component that calls a hook gets its own state. Hooks share logic, not data.

## Common mistakes

- Storing derived values (totals, filtered lists) in state and syncing them with effects.
- Copying query results into `useState` or a store.
- Mutating arrays or objects, then calling the setter with the same reference.
- Missing values in the dependency array. Trust the lint rule.
- Fetching in `useEffect` without handling loading, errors and stale responses.
- Wrapping everything in `useMemo` "for performance" without measuring.

## Try it

1. Build a basket with `useState<Item[]>`: add and remove items, and show a total that is **computed**, not stored.
2. Lift the selected size of a drink into a parent so both a picker and a price label use it.
3. Write a `useLocalStorage(key, initial)` hook that reads once on mount and writes on every change.

## Related
- [[docs/react/react|React - Basics]]
- [[docs/react/react-forms|React - Forms]]
- [[docs/graphql/graphql|GraphQL - Basics]]
- [[docs/nextjs|Next.js - Basics]]
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/react-native/react-native|React Native - Basics]]
