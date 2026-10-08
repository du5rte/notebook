---
title: "JavaScript - Algorithms"
type: doc
created: 2020-04-11
updated: 2026-10-07
tags: [javascript]
---
# JavaScript - Algorithms

An algorithm is a step-by-step recipe for solving a problem. In day-to-day work you'll mostly call built-ins like `sort` and `includes`, but knowing a few classic algorithms teaches you two things that come up everywhere: thinking recursively, and asking "how slow does this get when the list is huge?". We'll start with recursion, use it to divide and conquer, then compare searching and sorting approaches.

## Recursion

A recursive function calls itself. It needs two parts: a **base case** that stops, and a **recursive case** that moves closer to the base case. Without a base case it never ends.

```js
function countdown(n) {
  if (n === 0) return 'Lift off!' // base case
  console.log(n)
  return countdown(n - 1)        // recursive case
}

countdown(3) // logs 3, 2, 1, returns 'Lift off!'
```

Any loop can be written as recursion, and the other way round. Recursion earns its place when the data itself is nested.

## When recursion shines: nested data

Loops handle a known depth. This only checks two levels:

```js
const boxes = [[1, 2, 3], [4, 5, 6]]

boxes.some((box) => box.includes(6)) // true
```

Add a box inside a box and it breaks. Recursion handles any depth: if an item is an array, search inside it the same way.

```js
function contains(items, target) {
  return items.some((item) =>
    Array.isArray(item) ? contains(item, target) : item === target,
  )
}

contains([[1, 2, 3], [4, 5, [6]]], 6) // true
contains([[1, [2, [3]]]], 7)          // false
```

File trees, menus with submenus and comment threads all have this shape. (For arrays specifically, `items.flat(Infinity).includes(6)` does the same job.)

## Divide and conquer

Divide and conquer isn't one algorithm but a way of thinking: solve the smallest version of the problem, then express the bigger problem in terms of a smaller one.

```js
function sum(numbers) {
  if (numbers.length === 0) return 0     // smallest version
  const [first, ...rest] = numbers
  return first + sum(rest)               // a smaller problem
}

sum([1, 2, 3, 4, 5]) // 15
// 1 + sum([2, 3, 4, 5])
// 1 + 2 + sum([3, 4, 5])
// ... down to 1 + 2 + 3 + 4 + 5 + 0
```

In real code you'd write `numbers.reduce((total, n) => total + n, 0)`. The point is the way of thinking, which quick sort below relies on.

## Big O: how does it scale?

Big O describes how the work grows as the input grows, in the worst case. It ignores the exact time and keeps only the shape.

| Big O | Name | Example | 1,000 items → steps |
|---|---|---|---|
| `O(1)` | constant | read `list[0]` | 1 |
| `O(log n)` | logarithmic | binary search | about 10 |
| `O(n)` | linear | linear search | 1,000 |
| `O(n log n)` | | quick sort (on average) | about 10,000 |
| `O(n²)` | quadratic | selection sort | 1,000,000 |

## Linear search vs binary search

**Linear search** checks every item, one by one. Simple, works on any list, but on a million items the worst case is a million checks: `O(n)`.

```js
function linearSearch(list, target) {
  for (const [index, item] of list.entries()) {
    if (item === target) return index
  }
  return -1
}

linearSearch([1, 5, 2, 7, 3, 12], 12) // 5, after six checks
```

That's what `indexOf` and `includes` do for you.

**Binary search** only works on a **sorted** list. Like looking up a name in a phone book: open the middle, decide which half it's in, throw the other half away, repeat. Each guess halves the list: `O(log n)`.

```js
function binarySearch(sortedList, target) {
  let low = 0
  let high = sortedList.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const guess = sortedList[mid]

    if (guess === target) return mid
    if (guess > target) high = mid - 1 // too big: drop the top half
    else low = mid + 1                 // too small: drop the bottom half
  }

  return -1
}

binarySearch([1, 2, 3, 5, 7, 12], 12) // 5, after three checks
```

## Selection sort vs quick sort

**Selection sort** finds the smallest item, moves it to a new list, and repeats. Easy to understand, but each pass scans the whole remaining list: `O(n²)`.

```js
function selectionSort(list) {
  const remaining = [...list] // don't mutate the input
  const sorted = []

  while (remaining.length) {
    const smallest = Math.min(...remaining)
    sorted.push(smallest)
    remaining.splice(remaining.indexOf(smallest), 1)
  }

  return sorted
}

selectionSort([3, 2, 4, 1, 6]) // [1, 2, 3, 4, 6]
```

**Quick sort** divides and conquers. Pick a pivot, split the rest into "less than" and "greater than", sort each side the same way, and join them: `less + pivot + greater`. On average `O(n log n)`.

```js
function quickSort(list) {
  if (list.length <= 1) return list // base case: nothing to sort

  const [pivot, ...rest] = list
  const less = rest.filter((n) => n <= pivot)
  const greater = rest.filter((n) => n > pivot)

  return [...quickSort(less), pivot, ...quickSort(greater)]
}

quickSort([3, 2, 4, 1, 6]) // [1, 2, 3, 4, 6]
```

## In real code: use the built-ins

```js
const prices = [10, 9, 100, 1]

prices.sort()                // [1, 10, 100, 9]: compares as strings!
prices.toSorted((a, b) => a - b) // [1, 9, 10, 100]: new array, original untouched
```

`sort` changes the array in place and, without a compare function, sorts as text. `toSorted` returns a sorted copy.

## Common mistakes

- **No base case**, or one the recursion never reaches: "Maximum call stack size exceeded".
- **Binary search on an unsorted list**: it returns wrong answers without any error.
- **`high = list.length`** instead of `length - 1`: reads one past the end.
- **`sort()` on numbers without a compare function**: `[10, 9, 1].sort()` gives `[1, 10, 9]`.

## Try it

1. Write a recursive `factorial(n)`, where `factorial(5) // 120`.
2. Write `countFiles(folder)` for a nested object like `{ name: 'docs', children: [{ name: 'a.md' }, { name: 'img', children: [...] }] }`.
3. Count how many guesses `binarySearch` makes on a sorted array of 1,000 numbers, and compare with `linearSearch`.

## Related

- [[docs/javascript/javascript-arrays|JavaScript - Arrays]]
- [[docs/javascript/javascript-functions|JavaScript - Functions]]
- [[docs/javascript/javascript-loops|JavaScript - Loops]]
- [[docs/javascript/javascript-unit-testing|JavaScript - Unit Testing]]
