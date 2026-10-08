---
title: "DevOps - Server Setup"
type: doc
created: 2016-01-20
updated: 2026-10-07
aliases: ["Ubuntu", "Server Setup"]
tags: [devops]
---
# DevOps - Server Setup

A fresh server from a cloud provider is a blank Ubuntu machine with a public IP and a root login, and bots will start knocking on it within minutes. Before you deploy anything, spend ten minutes on the basics: a normal user, SSH keys only, a firewall and automatic security updates. You'll do it the same way every time, so this lesson is a checklist as much as an explanation.

Before you start, ask yourself honestly: do I need a server? A managed platform or a container service handles all of this for you. A server is great for learning and for full control, but you're now the one who patches it.

## The plan

1. Log in as root and update everything.
2. Create your own user with `sudo`.
3. Give that user your SSH key.
4. Turn off root login and passwords.
5. Turn on the firewall.
6. Keep security updates automatic.

## 1. Log in and update

Most providers let you add your SSH public key when you create the server. Do it, then:

```sh
ssh root@203.0.113.10

apt update && apt upgrade -y
# if it says "System restart required":
reboot
```

`apt update` refreshes the list of packages; `apt upgrade` installs the new versions. You need both.

## 2. Create your own user

Working as root means one typo can wipe the machine. Make a normal user and borrow root powers only when needed with `sudo`.

```sh
adduser ana                # asks for a password: you'll use it for sudo
usermod -aG sudo ana       # add ana to the sudo group
```

`-aG` means **append** to a group. Without `-a`, you'd remove ana from all her other groups. More on users and groups in [[docs/linux/linux-users|Shell - Users]] and [[docs/linux/linux-permissions|Shell - Permissions]].

## 3. Give your user your SSH key

Copy root's authorised keys to the new user, with the right owner:

```sh
rsync --archive --chown=ana:ana ~/.ssh /home/ana
```

Now, **in a second terminal**, check it works before going further:

```sh
ssh ana@203.0.113.10
sudo whoami
# root
```

If you didn't add a key when creating the server, use `ssh-copy-id` from your laptop instead. See [[docs/ssh|DevOps - SSH]].

## 4. Lock down SSH

Edit the SSH server config:

```sh
sudo nano /etc/ssh/sshd_config
```

```
PermitRootLogin no
PasswordAuthentication no
```

Gotcha: Ubuntu also reads files in `/etc/ssh/sshd_config.d/`, and the **first** value SSH finds wins. A cloud image may ship one there that turns passwords back on. Check what SSH will really use, then restart:

```sh
sudo sshd -t                                   # test the config
sudo sshd -T | grep -Ei 'permitrootlogin|passwordauthentication'
# permitrootlogin no
# passwordauthentication no
sudo systemctl restart ssh
```

Keep your current session open and log in from a new terminal. Only close the old one once that works.

## 5. Turn on the firewall

`ufw` (Uncomplicated Firewall) ships with Ubuntu. Block everything coming in, allow everything going out, then open only what you need.

```sh
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH          # ⚠️ before enabling, or you lock yourself out
sudo ufw enable
sudo ufw status
# OpenSSH   ALLOW   Anywhere
```

Once you install [[docs/nginx|Nginx]], open the web ports with its profile:

```sh
sudo ufw allow 'Nginx Full'    # ports 80 and 443
```

Your app on port `3000` stays closed to the outside: only Nginx talks to it.

## 6. Automatic security updates

Ubuntu Server comes with `unattended-upgrades`, which installs security updates on its own. Check it's on:

```sh
sudo dpkg-reconfigure --priority=low unattended-upgrades
```

## Then install what your app needs

A typical web server from here:

- **Nginx** in front: `sudo apt install nginx`.
- **HTTPS** with Certbot: see [[docs/ssl|Networking - HTTPS and TLS]].
- **Your runtime**: install Node from nodejs.org's recommended packages or a version manager, rather than an old version from the default package list. Or skip it and run the app in [[docs/docker|Docker]].
- **Something to keep the app running** and restart it after a reboot: a systemd service, PM2, or Docker's restart policy.
- **DNS**: point an `A` record at the server's IP. See [[docs/dns|Networking - DNS]].

Pick a managed database over installing one on the same box, unless it's a toy. Backups and upgrades are their job then, not yours.

## Common mistakes

- **Enabling `ufw` before allowing SSH.** Instant lockout. Most providers have a web console to rescue you.
- **Closing your only session** while changing SSH settings.
- **Passwordless sudo for everything** (`NOPASSWD` in `visudo`). Convenient, but anyone who gets your user gets root.
- **Never updating.** Unpatched servers are how most break-ins happen.
- **Opening database ports to the world.** Keep them on `localhost` and use an SSH tunnel to reach them.

## Try it

1. Create a small server and work through the six steps. Then try `ssh root@your-ip` and confirm it's refused.
2. Run `sudo ufw status numbered` and explain each rule.
3. Write the steps as a shell script you could run on the next server. Which steps can't be automated safely?

## Related

- [[docs/ssh|DevOps - SSH]]
- [[docs/nginx|DevOps - Nginx]]
- [[docs/docker|DevOps - Docker]]
- [[docs/ssl|Networking - HTTPS and TLS]]
- [[docs/dns|Networking - DNS]]
- [[docs/linux/linux-users|Shell - Users]]
- [[docs/aws|AWS]]
