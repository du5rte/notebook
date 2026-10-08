---
title: "React - Forms"
type: doc
created: 2026-10-07
updated: 2026-10-07
tags: [react, forms]
---
# React - Forms

Forms are where your app takes input from people, which means validation, error messages, disabled buttons and a submit that can fail. React gives you two ways to wire an input, controlled and uncontrolled. For anything bigger than a search box, I reach for **React Hook Form + Zod**: Zod describes what valid data looks like, React Hook Form handles the inputs, and TypeScript gets the types from the schema for free.

## Controlled inputs

A controlled input gets its value from React state and reports every keystroke back with `onChange`. React is the source of truth.

```tsx
import { useState } from 'react'

function NameField() {
  const [name, setName] = useState('')

  return (
    <>
      <input value={name} onChange={(event) => setName(event.target.value)} />
      <p>Order for {name || '...'}</p>
    </>
  )
}
// type "Ana" → "Order for Ana"
```

Good when the UI reacts to every keystroke: live search, a character counter, formatting a phone number as you type. The cost: the component re-renders on every key.

## Uncontrolled inputs

An uncontrolled input keeps its own value in the DOM. You read it when you need it, usually on submit.

```tsx
function NoteForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data.get('note')) // 'extra hot please'
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="note" defaultValue="" />
      <button type="submit">Send</button>
    </form>
  )
}
```

Note `defaultValue`, not `value`. Less code and no re-render per key. Harder when you need to react to the value as it changes.

## Controlled vs uncontrolled

|  | Controlled | Uncontrolled |
|---|---|---|
| Source of truth | React state | the DOM |
| Re-renders on typing | ✅ every key | ❌ none |
| Live validation / formatting | ✅ easy | ⚠️ manual |
| Code | more | less |

React Hook Form is mostly uncontrolled under the hood, which is why it stays fast on big forms.

## Zod: describe valid data once

A Zod schema is a description of your data that can check values at runtime and give you a TypeScript type.

```tsx
import { z } from 'zod'

const orderSchema = z.object({
  name: z.string().min(1, 'Tell us your name'),
  email: z.email('That email looks wrong'),
  shots: z.number().int().min(1).max(4),
})

type Order = z.infer<typeof orderSchema>
// { name: string; email: string; shots: number }

orderSchema.safeParse({ name: 'Ana', email: 'nope', shots: 2 }).success // false
```

One schema, two jobs: the type for your code and the checks for your users. No hand-written `type Order` that drifts away from the validation rules. The same schema can validate the request on the server too.

## React Hook Form + Zod

`useForm` takes the schema through `zodResolver`. `register` wires an input, `handleSubmit` validates before calling you, and `formState.errors` holds the messages.

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Order>({
    resolver: zodResolver(orderSchema),
    defaultValues: { name: '', email: '', shots: 1 },
  })

  async function onSubmit(order: Order) {
    await placeOrder(order) // only called with valid, typed data
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="number" {...register('shots', { valueAsNumber: true })} />
      {errors.shots && <p>{errors.shots.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        Order
      </button>
    </form>
  )
}
// submit with email "nope" → "That email looks wrong", onSubmit not called
```

`register('name')` is typed: a typo like `register('nmae')` is a compile error. `valueAsNumber` matters because HTML inputs always give you strings.

## Controller for custom inputs

`register` needs a real input it can attach to. For custom components (a date picker, a design-system `Select`, every input in React Native) use `Controller`, which hands you `value` and `onChange`.

```tsx
import { Controller } from 'react-hook-form'

<Controller
  control={control}
  name="shots"
  render={({ field }) => <ShotPicker value={field.value} onChange={field.onChange} />}
/>
```

## React's own form actions

React 19 lets a `<form>` take a function as its `action`. `useActionState` gives you the result and a pending flag. It shines with server actions in [[docs/nextjs|Next.js - Basics]], where the form works before JavaScript loads.

```tsx
import { useActionState } from 'react'

const [state, formAction, isPending] = useActionState(subscribe, { message: '' })

<form action={formAction}>
  <input name="email" />
  <button disabled={isPending}>Subscribe</button>
  <p>{state.message}</p>
</form>
```

Fine for a one-field form. For forms with several fields and per-field errors, React Hook Form + Zod is still the nicer experience, and you can run the same Zod schema inside the action on the server.

## Common mistakes

- Mixing `value` and `defaultValue`, or switching an input from `undefined` to a string ("changing an uncontrolled input to be controlled").
- Forgetting `event.preventDefault()` in a plain `onSubmit`, so the page reloads.
- Number inputs arriving as strings. Use `valueAsNumber` or `z.coerce.number()`.
- Writing a `type` by hand next to the schema. Use `z.infer`.
- Trusting client validation only. Validate again on the server.

## Try it

1. Build a sign-up form (name, email, password of at least 8 characters) with React Hook Form + Zod, showing each error under its field.
2. Add a "confirm password" field and make the schema reject mismatches with `.refine()`.
3. Rewrite the name field as a controlled input that shows "3/20 characters" as you type.

## Related
- [[docs/react/react|React - Basics]]
- [[docs/react/react-state|React - State and Hooks]]
- [[docs/nextjs|Next.js - Basics]]
- [[docs/html/html-forms|HTML - Forms]]
- [[docs/typescript/typescript|TypeScript - Basics]]
- [[docs/react-native/react-native|React Native - Basics]]
