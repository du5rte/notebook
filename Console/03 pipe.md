# Console - Pipes and Redirection

## Pipe
Pipes the output of Command `A` to the input of Command `B`
```sh
$ ps aux | grep bash
```

## Grep
Global Regular Expression Print Searches for patterns, doesn't need quotes, but it's good practice to use them.

```sh
# Searches for the word `is` in `hello.text`
$ grep "is" hello.txt
# Print the line in results
$ grep -n "is" hello.txt
# Perform a case `insensitive` search
grep -i "this" hello.txt
# Show lines without the pattern
grep -v "this" hello.txt
# We can look at the manual
man grep
# Can be used in the output of programs
ps aux | grep init
```

Can be used with the *`Default Standard Input`* or with a `file` using the keys:

*Default Standard Input, the default standard input is the keyboard without a file it will use our keyboard as input.*

- `<` Direct
- `>` Redirect
- `>>` Redirects output to append to file
- `2>`

```sh
$ grep "this" < hello.text
$ grep "line" hello.txt >> grep_output.txt
```

## sort
Sorts the lines of standard input and sends it to standard output
```sh
$ sort
$ ps aux | grep bash | sort
$ ps aux | grep bash | sort > sorted_bash_procs.txt
```
