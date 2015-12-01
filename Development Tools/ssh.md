# SSH

resources:
- [How To Use SSH Keys with DigitalOcean Droplets](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets) [Gist](https://gist.github.com/learncodeacademy/5850f394342a5bfdbfa4)
- [LearnCode.academy - SSH Tutorial](https://www.youtube.com/watch?v=DbPDraCYju8)


## SSH
Opens a Secure Shell to another machine

## Connect to a remote machime

```sh
ssh root@22.101.3.45
# or if a domain and user is set up
ssh user@awesome.com
```

Now we have access to the machine
```sh
# Welcome to Ubuntu 14.04.3 LTS (GNU/Linux 3.13.0-57-generic x86_64)
user@awesome~: $ _
```

To exit write `exit`
```sh
user@awesome:~# exit
# logout
# Connection to 22.101.3.45 closed.
```

## Install something

```sh
# update apt-get first thing
$ sudo apt-get update
# then install, e.g. Git
$ sudo apt-get install git
```

## Copy/Deploy Files
Using `rsync` we can syncronises files, it only uploaded missing or changed files

```sh
# copy all of the files in this directory to the /home/will/newapp directory
$ rsync -av . will@domain.com:~/newapp
```

## Generate SSH keypair
For passwordless SSH we need to create a public ssh key pair and copy/paste it into the other machine

In our machine
```sh
# Generate keypair, add a comment `-C` to different it to the user
$ ssh-keygen -C "monteirocode@gmail.com"

# Copy the shh public key `id_rsa.pub` to the clipboard
$ cat ~/.ssh/id_rsa.pub | pbcopy
```

In remove machine
```sh
# Log into the remove machine
$ ssh user@mydomain.com

# Make the `.ssh` directory and get in it
$ mkdir .ssh
$ cd .ssh

# Open `authorized_keys` in nano and paste the contents in
$ nano authorized_keys
```
