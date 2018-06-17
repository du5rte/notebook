# Ubuntu

Resources:
- [Initial Server Setup with Ubuntu](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-16-04)
- [How To Add and Delete Users](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-an-ubuntu-14-04-vps)
- [Creating user without passowrd](http://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)
- [adduser](http://www.unix.com/man-page/Linux/8/adduser/)
- [Installing Node 6.x on Ubuntu](https://github.com/nodesource/distributions)
- [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)
- [7 Security Measures](https://www.digitalocean.com/community/tutorials/7-security-measures-to-protect-your-servers?utm_source=Customerio&utm_medium=Email_Internal&utm_campaign=Email_UbuntuDistroNginxWelcome)
- [How To Set Up a Firewall with UFW on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)
- [How to Install MongoDB on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
- [How To Install and Configure Postfix on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-on-ubuntu-16-04)


## Setup SSH

Some servers like Digital Ocean already already set it up so it can be skipped
```sh
local$ ssh-keygen -t rsa
local$ ssh-copy-id root@<Server-IP>
```

Same as
```
local$ cat ~/.ssh/id_rsa.pub | pbcopy
root$ ssh root@<Server-IP>
root$ mkdir .ssh
root$ nano .ssh/authorized_keys # paste and save
root$ service ssh restart
```
Make sure your .ssh directory has 700 and your files are 700 permissions (rwx------).


SSH into root
```sh
# e.g. <user>@<domain/IP> root@example.com root@12.32.122.23
$ ssh root@example.com
```

Copy the `.ssh` folder into `/etc/skel/` so each new created user will be given a copy of the `authorized_keys`
```sh
$ cp -r .ssh /etc/skel/
```

Edit `sshd_config`
```sh
$ nano /etc/ssh/sshd_config
```

Disable `PasswordAuthentication` and `PermitRootLogin` for tighter security
```
PasswordAuthentication no
PermitRootLogin no
```
Restart `SSH`
```sh
$ service ssh restart
```

## Sudo Powers
Setup the admin group in `visudo` to not require password with sudo commando

```sh
$ sudo visudo
```

Create a user or group to have `sudo` privileges without password
```sh
%admin  ALL=(ALL) NOPASSWD:ALL
# or
server ALL=(ALL) NOPASSWD:ALL
```

## Add User
Now users can be given a sudo access **with** or **without** password

```sh
$ adduser --disabled-password --gecos "" mike
```

Sudo access **WITH PASSWORD**
```sh
adduser mike sudo
```

Sudo access **WITHOUT PASSWORD**
```sh
adduser mike admin
```

## Server Setup

```sh
# Create a server user www, server or pm2
# Switch user to user
$ su - server

# Update then upgrade
$ sudo apt-get -y update
$ sudo apt-get -y upgrade

# *** System restart required ***
$ sudo reboot
```

```sh
# Install curl git
$ sudo apt-get install -y build-essential curl git

# Config git
$ git config --global user.name "Name Surname"
$ git config --global user.email "name@example.com"

# Install Nginx
$ sudo add-apt-repository -y ppa:nginx/stable
$ sudo apt-get update
$ sudo apt-get install -y nginx

# Install Let's Encrypt
$ sudo apt-get install -y letsencrypt

# Install PostFix
$ sudo apt-get install -y postfix # Choose `Internet Site`

# Install Node v5.x
$ curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
$ sudo apt-get install -y nodejs

# Install PM2
$ sudo npm install -g pm2
# Set it to start on reboot within user server
$ pm2 startup ubuntu -u server

# Install MongoDB
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
$ sudo apt-get install -y --allow-unauthenticated mongodb-org
# Follow instructions on How to Install MongoDB on Ubuntu
```

## Setup Firewall

```sh
$ sudo ufw default deny incoming
$ sudo ufw default allow outgoing
$ sudo ufw allow ssh
$ sudo ufw allow 'Nginx Full'
# $ sudo ufw allow mail

# when all set
$ sudo ufw enable
```
