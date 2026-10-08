---
title: "DevOps - SSH"
type: doc
created: 2015-12-01
updated: 2026-10-07
aliases: ["SSH"]
tags: [devops]
---
# DevOps - SSH

SSH (Secure Shell) opens a terminal on another machine over an encrypted connection. It's how you log in to servers, and the same keys let you push to GitHub without typing a password. Learn three things: connecting, keys, and the `~/.ssh/config` file, and you'll use SSH comfortably for years.

## Connecting

```sh
ssh ana@203.0.113.10
# or with a domain
ssh ana@coffee.example.com
```

The format is `user@host`. The first time, SSH shows the server's **fingerprint** and asks if you trust it. Say yes and it's saved in `~/.ssh/known_hosts`.

```sh
ana@coffee:~$ _        # you're on the server now
ana@coffee:~$ exit     # back to your machine
# Connection to coffee.example.com closed.
```

## Passwords vs keys

| | Password | Key pair |
|---|---|---|
| Can be guessed | ❌ Yes, bots try all day | ✅ No |
| Typed every time | ❌ Yes | ✅ No (the agent remembers it) |
| Leaks if the server is fake | ❌ Yes | ✅ No, the private key never leaves your machine |

✓ Always use keys. On your own servers, turn password login off (see [[docs/server-setup|DevOps - Server Setup]]).

## Making a key pair

```sh
ssh-keygen -t ed25519 -C "ana@example.com"
# saves:
# ~/.ssh/id_ed25519      private key: never share, never copy anywhere
# ~/.ssh/id_ed25519.pub  public key: give this to servers and GitHub
```

The `-C` comment helps you tell keys apart later. Set a passphrase: if your laptop is stolen, the key is useless without it. Ed25519 is the modern choice: small keys, fast and strong. Why public and private keys work is in [[docs/cryptography|Security - Cryptography]].

## Putting your key on a server

The server keeps a list of allowed public keys in `~/.ssh/authorized_keys`. The easy way:

```sh
ssh-copy-id ana@coffee.example.com
# asks for your password one last time, then installs the key
```

The manual way, if `ssh-copy-id` isn't available:

```sh
# on your machine: print the public key and copy it
cat ~/.ssh/id_ed25519.pub

# on the server
mkdir -p ~/.ssh && chmod 700 ~/.ssh
nano ~/.ssh/authorized_keys      # paste it on its own line
chmod 600 ~/.ssh/authorized_keys
```

Those permissions matter: if the folder or file is readable by others, SSH ignores the key.

## The agent: type the passphrase once

`ssh-agent` holds your unlocked keys in memory, so you type the passphrase once per session.

```sh
ssh-add ~/.ssh/id_ed25519
ssh-add -l      # list the keys the agent holds
```

On macOS, add `--apple-use-keychain` to `ssh-add` to save the passphrase in the Keychain.

## The config file: stop typing so much

`~/.ssh/config` gives servers short names and default settings.

```
Host coffee
  HostName coffee.example.com
  User ana
  IdentityFile ~/.ssh/id_ed25519

Host *
  AddKeysToAgent yes
```

```sh
ssh coffee    # same as: ssh -i ~/.ssh/id_ed25519 ana@coffee.example.com
```

Every SSH-based tool (`scp`, `rsync`, `git`) understands these names.

## Copying files

`rsync` copies over SSH and only sends what changed, so the second run is fast.

```sh
# copy this folder to ~/coffee-app on the server
rsync -av ./ coffee:~/coffee-app/
```

For a single file, `scp` is fine: `scp backup.sql coffee:~/`.

## Port forwarding

Reach something on the server that isn't open to the internet, like its database, through your SSH connection.

```sh
ssh -L 5433:localhost:5432 coffee
# now localhost:5433 on your laptop is Postgres on the server
```

## When the server's key changes

Rebuild a server and SSH shouts `REMOTE HOST IDENTIFICATION HAS CHANGED`. It's protecting you from a fake server. If **you** rebuilt it, remove the old fingerprint and connect again:

```sh
ssh-keygen -R coffee.example.com
```

If you didn't rebuild it, stop and find out why.

## Common mistakes

- **Sharing the private key** or copying it between machines. Make one key per machine; it's free.
- **Wrong permissions** on `~/.ssh` (should be `700`) or `authorized_keys` (`600`). SSH silently falls back to asking for a password.
- **Blindly deleting `known_hosts` entries** whenever the warning appears.
- **Locking yourself out.** Keep one SSH session open while you change the server's SSH settings, and test from a second terminal.
- **Debugging blind.** `ssh -v coffee` shows which keys it tries and why they fail.

## Try it

1. Make an Ed25519 key with a passphrase and add the public key to your GitHub account. Test with `ssh -T git@github.com`.
2. Add a `Host` entry for a server you use and connect with the short name.
3. Use `ssh -L` to open a remote service (a database or an admin panel) on your laptop.

## Related

- [[docs/server-setup|DevOps - Server Setup]]
- [[docs/cryptography|Security - Cryptography]]
- [[docs/networking|Networking - Basics]]
- [[docs/aws|AWS]]
