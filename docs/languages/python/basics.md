# Python Basics


## REPL
Python  interactive shell useful for exploration
```sh
$ python
Python 3.6.5 |Anaconda, Inc.| (default, Apr 26 2018, 08:42:37) 
[GCC 4.2.1 Compatible Clang 4.0.1 (tags/RELEASE_401/final)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>> print("Hello, World")
Hello, World
>>> 
```

## Variables
In python most variables are create using `snake_ case` instead of `camelCase` 

```python
first_name = input("What is your name? ")

print("Hello", first_name)
```

## Maths Operations

```python
3 + 2 - 1 # 4
4 * 3 / 1 # 7.0

(10 - 3 ) * (5 + 8)  # 91

round(4.2) # 4

int("11") # 11
float("11") # 11.0

int(11.9) # 11

23 / 3 # 7.666666666666667
23 // 3 # 7
23 % 3 # 2
```

## String Operations

```python
str(42) # '42'

exclamation_marks = "!" * 10 # '!!!!!!!!!!'
len(exclamation_marks) # 10

quote = "A person who never made a mistake never tried anything"
quote.upper() # 'A PERSON WHO NEVER MADE A MISTAKE NEVER TRIED ANYTHING'
quote.lower() # 'a person who never made a mistake never tried anything'
quote.title() # 'A Person Who Never Made A Mistake Never Tried Anything'

template = "Thanks for learning {} with us {}"
template.format("Python", "Valentina")

"ham" in "hamster" # true
"popcorn" in "hamster" # true
```

## Boleans

```python
has_taco = "taco" in "tacocombs" # True

bool(1) # True
bool(0) # False

bool("burritos") # True
bool("") # False

not True # False
not False # True

True and True # True
True and True and False # False

False or True # True
False or False # False

(False or False or True) and (True and True) # False
(False or False or True) and not (True and True) # True
```












```sh
help(str)

class str(object)

  Methods defined here:
  
  # methods that start with double underscore are 'magic methods'
  __add__(self, value, /) 
  
  # normal methods
  capitalise(...)
    S.capitalize() -> str
...