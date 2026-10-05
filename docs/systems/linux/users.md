# Console - Users

Resources:
- [Server Setup](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)
- [How To Add and Delete Users](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-an-ubuntu-14-04-vps)
- [Creating user without passowrd](http://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)
- [adduser](http://www.unix.com/man-page/Linux/8/adduser/)

## whoami
Displays the user you are currently logged in as.
```sh
$ whoami
```

## adduser
Interactive tool for creating users

```sh
$ adduser
$ sudo adduser mike
# Add user to the sudo group
$ gpasswd -a mike sudo
# Create user without password, can only be accessed through ssh
$ adduser --disabled-password --gecos "" mike
```

## Switch User
Logs as a different user
```sh
$ su mike
```

## Delete User
Deletes a user which then should be followed up by the deleting the user’s home directory
```sh
$ userdel josh
$ rm -rf /home/josh
# or
$ deluser --remove-home john
```
