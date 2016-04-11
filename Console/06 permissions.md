# Console - Permissions

Resources:
- [7 Security Measures](https://www.digitalocean.com/community/tutorials/7-security-measures-to-protect-your-servers?utm_source=Customerio&utm_medium=Email_Internal&utm_campaign=Email_UbuntuDistroNginxWelcome)
- [Setup a Firewall with UFW](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)
- [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)



## File Permissions
Each file has a 10 character permission representation such as `drwxrwxrwx`. Each character represents a permission on the file.

- `r` Read
- `w` Write
- `x` Execute

- `u` User (Owner)
- `g` Group
- `o` Other

```
 u   g   o
rwx rwx rwx
```
If the letter is replaced with a dash `-`, it indicates the permission is not granted. The first character determines if it's a directory `d`.
```sh
-rw-r--r-- 1 root root  314 Nov 30 18:18 app.js
drwxr-xr-x 3 root root 4096 Nov 30 18:00 node_modules
```

## Change Mode
Changes the permissions mode of a file or directory, `+` to allow or `-` to disable, chmod `rgo``+/-` `rwx` `file/directory`

```sh
# Allows Other users to write
$ chmod o+w hello.txt
# Disables Users and Groups to Read
$ chmod ug-r hello.txt
```

## Change Owner
Changes the owner of a file or directory

```sh
$ sudo chown mike hello.text
# change the group
$ sudo chown mike:mike hello.text
```


###### Octal Notation
Numerical representation using the digits 0 through 7

Decimal
```
0  1  2  3  4  5  6  7  8  9
10 11 12 13 14 15 16 17 18 19
```
Octal
```
0  1  2  3  4  5  6  7
10 11 12 13 14 15 16 17
```
```
7 r w x
6 r w -
5 r - x
4 r - -
3 - w x  
2 - w -
1 - - x
0 - - -
```
```
read     r = 4
write   w = 2
execute x = 1
```
```sh
chmod 777 hello.txt # rwxrwxrwx
chmod 640 hello.txt # rw-r-----
```
