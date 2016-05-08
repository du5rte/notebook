# Javascript - Weird and Awesome



## Closures

    Closure
    to retain state and scope after executing

When we first run this code it sets up the listeners, and it's done! Only inside `.click` gets re-run but what about `var a = 1;`? JavaScript is smart enough to remember it and store it in the scope to use it later on. As long there's a reference to `var a = 1;` JavaScript will keep it in memory.

```js
// $(document).ready(function() {
//   var a = 1;
      $('button').on('click', function () {
          alert(a);
      });
// });
```

If we were to call `.off` and terminate the `listener` JavaScript would automatically bin it and `var a = 1;` from memory as it no longer needs it.

```js
// $(document).ready(function() {
//   var a = 1;
//   $('button').on('click', function () {
//      alert(a);
//   });
      $('button').off('click');
// });
```
