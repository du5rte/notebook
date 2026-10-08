---
title: "Shell - Applications"
type: doc
created: 2016-04-11
updated: 2026-10-07
aliases: ["Console - Applications"]
tags: [linux]
---
# Shell - Applications

On the command line we install software with a package manager: a tool that downloads programs from a trusted catalogue, installs whatever else they need, and keeps them up to date. Think of it as an app store you drive with commands. Linux distributions each come with one (`apt` on Debian and Ubuntu); on macOS most developers add Homebrew.

## Package managers at a glance

| | Debian / Ubuntu | macOS |
| --- | --- | --- |
| Tool | `apt` | `brew` (Homebrew) |
| Needs `sudo` | Yes | No |
| Refresh the catalogue | `sudo apt update` | `brew update` |
| Install | `sudo apt install git` | `brew install git` |
| Upgrade everything | `sudo apt upgrade` | `brew upgrade` |
| Remove | `sudo apt remove git` | `brew uninstall git` |
| Search | `apt search sqlite` | `brew search sqlite` |

Same ideas, different words. Learn one and the other takes five minutes.

## apt on Debian and Ubuntu

`apt` keeps a local copy of the catalogue. `update` refreshes that list; `upgrade` actually installs newer versions. On a fresh server, always run both first.

```sh
sudo apt update             # refresh the list of available packages
sudo apt upgrade -y         # upgrade everything (-y answers yes)
sudo apt install git htop   # install one or more packages, plus what they depend on
```

Removing:

```sh
sudo apt remove htop        # remove the program, keep its config files
sudo apt purge htop         # remove it and its config files
sudo apt autoremove         # clean up dependencies nothing needs any more
```

You'll see `apt-get` in older guides and scripts. It still works and does the same jobs; `apt` is the friendlier version for typing by hand.

## Homebrew on macOS

Homebrew installs command line tools into its own folder (`/opt/homebrew` on Apple silicon), so it doesn't need `sudo` and doesn't touch system files. The install command is on the Homebrew website.

```sh
brew install git node
brew upgrade                # upgrade everything installed with brew
brew list                   # what you've installed
brew install --cask firefox # desktop apps are "casks"
```

## Checking what got installed

```sh
which git        # /usr/bin/git: where the program lives
git --version    # git version 2.x
```

If `which` prints nothing, the program isn't installed or isn't in your `PATH` (see [[docs/linux/linux-environment|Shell - Environment]]).

## Language tools: a separate world

Node, Python and friends have their own package managers for libraries (`npm`, `pip`) and often their own version managers (`nvm` for Node). The usual split:

- System tools (git, curl, htop) come from `apt` or `brew`.
- Language versions come from a version manager, so each project can pick its own.
- Project libraries come from `npm` or `pip`, installed inside the project.

See [[docs/node/node-npm|Node - npm and pnpm]].

## Downloading files: curl

`curl` fetches a URL. Two options cover most uses:

```sh
curl https://example.com                   # print the response
curl -LO https://example.com/tool.tar.gz   # save it as a file (-O), following redirects (-L)
```

More in [[docs/curl|Networking - Curl]].

## Unpacking archives: tar

Software is often shipped as a `.tar.gz` file, a bundle of files that's been compressed.

```sh
tar -xzf tool.tar.gz       # x extract, z gunzip, f from this file
tar -czf backup.tar.gz notes/   # c create an archive from a folder
```

## Building from source

When a program isn't in any catalogue, you can compile it yourself. It's rarer now than it used to be, but the steps are always the same:

```sh
sudo apt install build-essential   # compilers and make (macOS: xcode-select --install)
tar -xzf tool.tar.gz && cd tool
./configure        # checks your system and writes a Makefile
make               # builds the program
sudo make install  # copies it into a folder on your PATH, usually /usr/local/bin
```

Prefer a package when one exists: the package manager can upgrade and remove it for you, `make install` can't.

## Common mistakes

- **`apt install` on a fresh server without `apt update` first.** The catalogue is stale and you'll get "Unable to locate package".
- **`sudo brew`.** Homebrew refuses to run as root, and doesn't need to.
- **Installing the same tool two ways.** Node from `apt` and from `nvm` will fight over which one is in `PATH`. Pick one.

## Try it

1. Install `htop` with your package manager, run it, then remove it.
2. Use `which` and `--version` to find where `git` and `curl` live on your machine.
3. Download any `.tar.gz` file with `curl -LO`, unpack it with `tar`, and look inside.

## Related
- [[docs/linux/linux-environment|Shell - Environment]]
- [[docs/linux/linux|Shell - Basics]]
- [[docs/node/node-npm|Node - npm and pnpm]]
- [[docs/curl|Networking - Curl]]
- [[docs/server-setup|Ubuntu]]
