---
title: "Shell - Users"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: ["Console - Users"]
tags: [linux]
---
# Shell - Users

Linux is built for many people sharing one machine. Each user has their own name, home folder and permissions, and groups let us give several users the same access at once. On your laptop you're probably the only person, but on a server you'll create users for people and for services, like a `deploy` user that runs your app without root powers.

The commands in this lesson are for Linux servers (Debian and Ubuntu). macOS manages users through System Settings instead.

## Who am I?

```sh
whoami          # ana
id              # uid=1000(ana) gid=1000(ana) groups=1000(ana),27(sudo)
groups          # ana sudo
```

`id` shows your user id, your main group and every group you're in.

## root and sudo

`root` is the admin account that can do anything. Logging in as root all the time is risky, so on most systems you use a normal account and borrow root's powers with `sudo` for one command at a time (see [[docs/linux/linux|Shell - Basics]]).

Who can use `sudo` is decided by group: on Debian and Ubuntu it's the `sudo` group.

## Adding a user

`adduser` is the friendly, interactive way on Debian and Ubuntu: it creates the home folder and asks for a password.

```sh
sudo adduser mike
```

To let `mike` use `sudo`, add him to the group:

```sh
sudo usermod -aG sudo mike
```

`-aG` means *append* to *groups*. Without `-a`, `usermod -G` replaces all his other groups.

A user for a service, with no password, so it can only be reached with an SSH key or by switching to it:

```sh
sudo adduser --disabled-password deploy    # press Enter through the name questions
```

`useradd` also exists. It's the lower-level tool that works on every Linux, but it doesn't create a home folder unless you pass `-m`. On Debian and Ubuntu, prefer `adduser`.

## Switching user

```sh
su - mike               # become mike (asks for mike's password)
sudo -iu deploy         # become deploy using your own sudo rights
exit                    # back to yourself
```

The `-` (or `-i`) gives you a full login, with that user's home folder and environment, as if they'd logged in.

## Removing a user

```sh
sudo deluser mike                  # keep his home folder
sudo deluser --remove-home mike    # delete it too
```

## Common mistakes

- **`usermod -G` without `-a`.** It removes the user from every group not listed, sometimes including `sudo`.
- **Group changes not taking effect.** Groups are read at login. The user needs to log out and back in.
- **Running apps as root.** If the app is compromised, so is the whole server. Create a dedicated user.

## Try it

On a Linux virtual machine or a throwaway server:

1. Run `id` and list the groups you belong to.
2. Create a user `guest`, switch to it with `su - guest`, and check `whoami` and `pwd`.
3. Remove `guest` along with its home folder.

## Related
- [[docs/linux/linux-permissions|Shell - Permissions]]
- [[docs/linux/linux|Shell - Basics]]
- [[docs/ssh|SSH]]
- [[docs/server-setup|Ubuntu]]
