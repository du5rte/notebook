# JavaScript - Algorithms



## Recursion
when a function calls itself. A Recursion should have at least one base case and one recursion case, otherwise it can spin into a infinite loop.
```
// function counter() {
//     for (let n = 0; n <= 10; n++) {
//         console.log(n) // 0,1,2,3,4,5,6,7,8,9,10
//     }
// }

function counter(n=0) {
    console.log(n) // 0,1,2,3,4,5,6,7,8,9,10
    
    if (n === 10) {
        return
    }
    
    return counter(n + 1)
}

counter()
```

This function `findSix` works but it's not very dynamic, what if there's multiple levels of nesting?
```
const items = [[1,2,3],[4,5,6]]

function findSix(i){
    let hasSix="no!"
    i.forEach(a => {
        a.forEach(l => {
            if(l === 6){
                hasSix = "yes!"
            }
        })
    })
    return hasSix // yes
}
```

Using a recursion function we can deal with infinite levels of nesting
```
const items = [[1,2,3],[4,5,[6]]]

function findSix(a){
    let hasSix="no!"
    a.forEach(i => {
        if (i === 6) {
            hasSix = "yes"
        }
        if (Array.isArray(i)) {
            hasSix = findSix(i)
        }
    })
    return hasSix
}

console.log(findSix(items)) // yes
```

### Divide and Conquer
Are recursive algorithms, they're not a algorithm you can apply to a problem but rather a way to think about a problem, by break it down and divide to it's simplest forms.

```js
function sum(arr) {
  let total = 0;

  for (let i of arr) {
    total += i;
  }

  return total;
}

console.log(sum([1,2,3,4,5]))
```

Recursion is nice because it keeps returning our new state after each function.
```js
function sum(arr) {
  if (arrr.length === 0) {
    return 0
  }

  return arr[0] + sum(arr.slice(1))
}

// 1 + sum([2,3,4,5]) // 3
// 3 + sum([3,4,5]) // 6
// 6 + sum([4,5]) // 10
// 10 + sum([5]) // 15

console.log(sum([1,2,3,4,5]))
```

### ~~Selection Sorting~~

- Function that loops through array for largest number
- Function that loops through list calling ^^, removing largest from list

```js
const itemsToSort = [3, 2, 4, 1, 6]

function findLargestValue(list) {
  let largest = list[0]
  let indexOfLargest = 0

  for (let i = 0; i <= list.length; i++) {
    if (largest < list[0]) {
      largest = list[i]
      indexOfLargest = i
    }
  }

  return indexOfLargest
}

function selectionSort(list) {
  let newList = []
  // let indexOfLargest

  while (list.length) {
    let indexOfLargest = findLargestValue(list)
    newList.push(list[indexOfLargest])
    list.splice(indexOfLargest, 1)
  }

  return newList
}

console.log(selectionSort(itemsToSort))
```
### Quick Sorting
Is a sorting algorithm that is much faster than selection sort
// The three fundamental components of quick sort is working with an array that holds the elements less than the chosen pivot element. The pivot element and then the array of elements that holds the elements greater than the pivot element.

D&C algorithm that uses recursion:
1. less than array
2. pivot
3. greater than array

```js
function quickSort(array) {
  // if the arary is 1 or empty there's nothing to sort
  if (array.length <= 1) {
    return array
  }

  // we find the middle
  let pivotIndex = Math.floor(array.length / 2)
  let pivot = array[pivotIndex]

  // split the less and greater values from the middle
  let less = []
  let greater = []

  for (let i in array) {
    if (i != pivotIndex) {
      if (array[i] > pivot) {
        greater.push(array[i])
      } else {
        less.push(array[i])
      }
    }
  }

  // repeat this process as necessary
  return [
    ...quickSort(less),
    pivot,
    ...quickSort(greater)
  ]

  return array
}

console.log(quickSort(itemsToSort))
```

### ~~Linear Search~~
This is relatively fast, with just a small sample size. What if our list had 1,000 items, or 10,000, or even a million? The worst case scenario is, our program would take one million loops until it found our item. This has some real performance issues as it grows larger.

> O = Once (Operation) for each element in the array

> The big `O` notation is `O(n)`, which represents linear time. Big O represents the worst case scenario. 

```js
const items = [1,5,2,7,3,12,6,10]

function search(list, item) {
  let hasItem = null
  let counter = 0

  for (let i of list) {
    counter++

    if (i === item) {

    }
  }
}
```

### Binary Search
Binary search is an algorithm that accepts a sorted list and returns a search element from the list. With our current search function, because the number 12 was towards the end of the array, it took us six iterations until we found the number. 

```js
function search(list, item) {
  let low = 0
  let high = list.length
  let counter = 0

  while(low <= high) {
    counter++

    // we jump right to the middle and try guess it
    let mid = Math.floor((low + high) / 2)
    let guess = list[mid]

    if (guess === item) {
      return true
    } 
    // if the guess is too big we ignore everything after
    if (guess > item) {
      
      high = mid - 1
    } 
    // if the value too low we ignore everything before
    else {
      low = mid + 1
    }
  }

  console.log(counter)

  return null
}
```






