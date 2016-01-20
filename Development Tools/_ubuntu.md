# Ubuntu

Resources
- [Server Setup](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-14-04)
- [How To Add and Delete Users](https://www.digitalocean.com/community/tutorials/how-to-add-and-delete-users-on-an-ubuntu-14-04-vps)
- [Creating user without passowrd](http://unix.stackexchange.com/questions/56765/creating-an-user-without-a-password)
- [adduser](http://www.unix.com/man-page/Linux/8/adduser/)
- [Installing Node 5.x on Ubuntu](https://github.com/nodesource/distributions)
- [fixing npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions)
- [7 Security Measures](https://www.digitalocean.com/community/tutorials/7-security-measures-to-protect-your-servers?utm_source=Customerio&utm_medium=Email_Internal&utm_campaign=Email_UbuntuDistroNginxWelcome)
- [Setup a Firewall with UFW](https://www.digitalocean.com/community/tutorials/how-to-setup-a-firewall-with-ufw-on-an-ubuntu-and-debian-cloud-server)

## Setup SSH

Digital Ocean already sets this up so it can be skipped
```sh
# with ssh-copy-id
local$ ssh-copy-id myuser@example.com
# or manually
local$ cat ~/.ssh/id_rsa.pub | pbcopy

root$ mkdir ~/.ssh
root$ nano ~/.ssh/authorized_keys # paste and save
```

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

Edit `admin` `ALL` to `NOPASSWD:ALL`
```sh
# Members of the admin group may gain root privileges
%admin  ALL=(ALL) NOPASSWD:ALL
```

Create the user (non-existante by default) and restart `sudo`
```sh
$ groupadd admin
$ service sudo restart
```


## Add User
Now users can be given a sudo access **with** or **without** password

```sh
$ adduser --disabled-password --gecos "" <user>
```

Sudo access **WITH PASSWORD**
```sh
sudo adduser <user> sudo
```

Sudo access **WITHOUT PASSWORD**
```sh
sudo adduser <user> admin
```

## Server Setup

```sh
# Create a server user www, server or pm2
# Switch user to user
$ su - server

# Update then upgrade
$ sudo apt-get -y update
$ sudo apt-get -y upgrade

# Install curl git
$ sudo apt-get install -y build-essential curl git

# Config git
$ git config --global user.name "Name Surname"
$ git config --global user.email "name@example.com"

# Install Nginx
$ sudo add-apt-repository -y ppa:nginx/stable
$ sudo apt-get update
$ sudo apt-get install -y nginx

# Install PostFix
# Choose `Internet Site`
$ sudo apt-get install postfix

# Install Node v5.x
$ curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
$ sudo apt-get install -y nodejs

# Install PM2
$ sudo npm install -g pm2
# Set it to start on reboot within user server
$ pm2 startup ubuntu -u server
```

## Setup Firewall

```sh
$ sudo ufw default deny incoming
$ sudo ufw default allow outgoing
$ sudo ufw allow ssh
$ sudo ufw allow www
$ sudo ufw allow mail
# $ sudo ufw status
$ sudo ufw enable
```

## Setup Development Tools

- yo
- bower
- gulp-cli
- webpack
- flightplan
- nodemon
- node-inspector
- npm-check-updates

```sh
$ npm install -g yo bower gulp-cli webpack flightplan nodemon node-inspector npm-check-updates
```
