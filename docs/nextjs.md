---
title: "Next.js - Basics"
type: doc
created: 2026-10-07
updated: 2026-10-07
aliases: [Next.js, App Router]
tags: [react, nextjs]
---
# Next.js - Basics

Next.js is a React framework: it adds routing, server rendering, data fetching and a build setup on top of React, so you write components and folders instead of wiring webpack and a server. It's my default for anything on the web that needs more than one page. These notes cover the **App Router** (the `app/` folder), which is the current way to build with it.

## When to pick Next.js

| You're building | Pick |
|---|---|
| A website or web app with pages, SEO, auth, a backend bit | ✓ Next.js |
| A mobile app | Expo (see [[docs/react-native/react-native\|React Native - Basics]]) |
| A widget or a single interactive page inside something else | plain React with Vite |

The rule of thumb: if you'd otherwise end up adding a router, a server and a build config yourself, use Next.js.

## Folders are routes

Every folder in `app/` is a URL segment, and a `page.tsx` inside it makes that segment a page.

```
app/
  page.tsx                 → /
  menu/
    page.tsx               → /menu
    [drinkId]/
      page.tsx             → /menu/latte, /menu/mocha...
  layout.tsx               → wraps every page
```

A folder in square brackets is a **dynamic segment**. Its value arrives in `params`, which is a promise you `await`.

```tsx
// app/menu/[drinkId]/page.tsx
type Props = { params: Promise<{ drinkId: string }> }

export default async function DrinkPage({ params }: Props) {
  const { drinkId } = await params
  return <h1>{drinkId}</h1>
}
// /menu/latte → <h1>latte</h1>
```

Link between pages with `<Link href="/menu">` from `next/link`, not a bare `<a>`, so navigation stays client-side and fast.

## Layouts

A `layout.tsx` wraps every page below it and **stays mounted** when you navigate between them. Put the shell there: header, nav, providers.

```tsx
// app/layout.tsx
import type { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>Coffee shop</header>
        {children}
      </body>
    </html>
  )
}
```

A nested `app/menu/layout.tsx` wraps only the menu pages. Special files next to a page handle the other states: `loading.tsx` (shown while the page loads) and `error.tsx` (shown when it throws), `not-found.tsx` for 404s.

## Server Components vs Client Components

This is the big mental shift. In the App Router, components are **Server Components by default**: they run on the server, can be `async`, can read a database or a secret, and send only HTML to the browser. No JavaScript for them ships to the client.

A **Client Component** runs in the browser too, so it can use state, effects and event handlers. You opt in with `'use client'` at the top of the file.

```tsx
// app/menu/add-button.tsx
'use client'

import { useState } from 'react'

export function AddButton() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(count + 1)}>Add ({count})</button>
}
```

|  | Server Component | Client Component |
|---|---|---|
| Default | ✅ | needs `'use client'` |
| `async` / `await` data | ✅ | ❌ |
| Secrets, database access | ✅ | ❌ never |
| `useState`, `useEffect`, `onClick` | ❌ | ✅ |
| Adds JavaScript to the bundle | ❌ | ✅ |

`'use client'` marks a **boundary**: that file and everything it imports become client code. So push it down to the leaves. Keep the page a Server Component and make only the interactive button a Client Component. A Server Component can render a Client Component and pass it serialisable props (strings, numbers, plain objects; not functions).

## Fetching data

In a Server Component you fetch right where you need it. No `useEffect`, no loading state by hand.

```tsx
// app/menu/page.tsx
import { AddButton } from './add-button'

type Drink = { id: string; name: string }

export default async function MenuPage() {
  const drinks: Drink[] = await getDrinks() // a database call or fetch
  return (
    <ul>
      {drinks.map((drink) => (
        <li key={drink.id}>
          {drink.name} <AddButton />
        </li>
      ))}
    </ul>
  )
}
```

While it awaits, Next.js shows the nearest `loading.tsx`. Caching is opt-in in current versions, so check the caching docs for your version before assuming a response is cached or fresh.

Client Components get server data in two ways: as props from a Server Component parent, or through a client data library (Apollo, React Query, Convex) when the data must stay live.

## Server Actions

A Server Action is an `async` function marked `'use server'` that runs on the server but can be called from a form or a Client Component. It replaces writing an API route for your own mutations.

```tsx
// app/menu/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function addDrink(formData: FormData) {
  const name = String(formData.get('name'))
  await saveDrink({ name }) // database write
  revalidatePath('/menu') // refresh the menu page's data
}
```

```tsx
// app/menu/new/page.tsx
import { addDrink } from '../actions'

export default function NewDrinkPage() {
  return (
    <form action={addDrink}>
      <input name="name" />
      <button>Add</button>
    </form>
  )
}
```

The form works even before JavaScript loads. Treat every action like a public API endpoint: anyone can call it, so validate the input (Zod) and check the user is allowed.

## Common mistakes

- `'use client'` at the top of every page "to make it work". You lose server rendering and ship far more JavaScript. Move it to the small interactive piece.
- Importing a server-only module (database client, secrets) into a Client Component.
- Passing a function from a Server Component to a Client Component as a prop.
- Fetching in `useEffect` in a Client Component when the parent could have fetched on the server.
- Server Actions without validation or auth checks.

## Try it

1. Build `/menu` and `/menu/[drinkId]` with a shared layout that has a header.
2. Fetch the drinks in a Server Component and add a Client Component "Add to basket" button to each row.
3. Add a form at `/menu/new` that uses a Server Action, validates with Zod and revalidates `/menu`.

## Related
- [[docs/react/react|React - Basics]]
- [[docs/react/react-state|React - State and Hooks]]
- [[docs/react/react-forms|React - Forms]]
- [[docs/graphql/graphql|GraphQL - Basics]]
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/react-native/react-native|React Native - Basics]]
