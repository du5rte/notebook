---
title: "Networking - Basics"
type: doc
created: 2018-06-18
updated: 2026-10-07
aliases: ["Networking"]
tags: [network]
---
# Networking - Basics

A network is computers passing small messages to each other. Every website, API call, `git push` and SSH session sits on top of the same few ideas: clients and servers, IP addresses, ports, and two ways of sending data (TCP and UDP). Learn these once and the rest of the networking lessons (HTTP, DNS, email, TLS) are just different conversations on the same roads.

## Packets

Data doesn't travel as one big blob. It's chopped into small chunks called **packets**, each sent on its own and put back together at the other end.

A message like this one:

```
Hi Ana, your flat white is ready at the counter. Have a nice day!
```

might travel as two packets:

```
Packet 1: Hi Ana, your flat white is ready
Packet 2:  at the counter. Have a nice day!
```

Packets can take different routes, arrive out of order, or get lost. Whether that matters is the TCP vs UDP question below.

## Clients and servers

Client and server are **roles**, not kinds of computer. Any machine can play either one.

- **Server**: listens for incoming connections and answers them.
- **Client**: starts the connection and asks for something.

Your laptop is a client when it opens a website and a server when you run `npm run dev`.

### Try it with netcat

`nc` (netcat) lets you be both ends of a raw connection. Open two terminals.

```sh
# Terminal 1: be the server, listen on port 5000
nc -l 5000
```

```sh
# Terminal 2: be the client, connect to it
nc localhost 5000
hello server, I am the client
```

Whatever you type in one terminal shows up in the other. That's a network connection with nothing on top. Some older netcat versions want `nc -l -p 5000` instead.

### Peer to peer

In **peer to peer** (P2P) networks, clients connect straight to each other with no central server in the middle. BitTorrent and WebRTC video calls work this way.

## IP addresses

An **IP address** is a machine's address on the network, like a postal address for packets.

| | Looks like | Notes |
|---|---|---|
| IPv4 | `203.0.113.10` | 4 numbers from 0 to 255. Running out. |
| IPv6 | `2001:db8::10` | Much longer, so there are enough for everything. |

A few addresses you'll see all the time:

- `127.0.0.1` (IPv4) and `::1` (IPv6): **localhost**, this machine talking to itself.
- `192.168.x.x`, `10.x.x.x`, `172.16.x.x` to `172.31.x.x`: **private** addresses inside a home or office network. They aren't reachable from the internet directly.

Humans don't remember numbers well, so we use names like `example.com`. Turning names into IP addresses is the job of [[docs/dns|DNS]].

## TCP vs UDP

Both send packets. The difference is what happens when one goes missing.

| | TCP | UDP |
|---|---|---|
| Delivery | ✅ Guaranteed, resent if lost | ❌ Fire and forget |
| Order | ✅ Arrives in order | ❌ Any order |
| Speed | ⚠️ Slower, waits for acknowledgements | ✅ Fast, no waiting |
| Used by | Web pages, APIs, SSH, email | Video calls, games, DNS lookups, HTTP/3 |

Think of TCP as a recorded delivery letter: you get a signature back ("yes, I got it"), and if you don't, it's sent again. UDP is a postcard: quick and cheap, and if one gets lost nobody chases it.

Rule of thumb: if a late packet is useless (a video frame from two seconds ago), UDP. If every byte matters (a bank transfer, a web page), TCP.

## Ports

One machine runs many services at once. A **port** is a number from `1` to `65535` that says which service a packet is for. If the IP address is the building, the port is the flat number.

```sh
# same machine, different services
curl http://localhost:3000   # your dev server
psql -h localhost -p 5432    # your Postgres database
```

Ports you'll meet often:

| Port | Service |
|---|---|
| 22 | SSH |
| 25 | SMTP (server-to-server email) |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 587 | Email submission (your app sending mail) |
| 3306 | MySQL |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 27017 | MongoDB |

On Linux, ports below `1024` are privileged: a normal user can't listen on them. That's why dev servers use `3000` or `8080`, and why [[docs/nginx|Nginx]] sits on `80` and `443` in production.

## Protocols

A **protocol** is the language two programs agree to speak over a connection. The connection (TCP or UDP) is the phone line; the protocol is the conversation.

- **HTTP / HTTPS**: web pages and APIs. See [[docs/http|Networking - HTTP]].
- **SMTP, IMAP**: sending and reading email. See [[docs/smtp|Networking - Email]].
- **SSH**: a remote shell over an encrypted connection. See [[docs/ssh|DevOps - SSH]].
- **TLS**: the encryption layer that turns HTTP into HTTPS. See [[docs/ssl|Networking - HTTPS and TLS]].
- **DNS**: turning names into IP addresses.

## Common mistakes

- **"Server" means a big machine.** It's a role. Your laptop is a server the moment something listens on a port.
- **`localhost` inside a container.** In [[docs/docker|Docker]], `localhost` is the container itself, not your laptop.
- **Port already in use.** Only one program can listen on a port at a time. `lsof -i :3000` shows who has it.
- **Listening on `127.0.0.1` and expecting the world to reach it.** That address only accepts connections from the same machine. Listen on `0.0.0.0` to accept connections from outside.

## Try it

1. Start an `nc -l 5000` server and chat with it from a second terminal.
2. Run `lsof -i -P | grep LISTEN` (macOS or Linux) and match the ports you see to the services on your machine.
3. For each of these, pick TCP or UDP and say why: a chat app, a live football stream, downloading an installer.

## Related

- [[docs/dns|Networking - DNS]]
- [[docs/http|Networking - HTTP]]
- [[docs/curl|Networking - Curl]]
- [[docs/ssl|Networking - HTTPS and TLS]]
