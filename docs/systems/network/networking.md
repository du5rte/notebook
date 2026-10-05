# Networking
servers, clients and protocols.

## Network
Networking works by choking up data into tiny chunks of data `Packets` between computers.

e.g. the following message might be broken up by multiple packets
```
This is the message we want to send. It contains information. XXX YYYY ZZZ QWRASD BLAH bLAH
```

Packet 1
```
This is the message we want to send. It conta
```
Packet 2
```
ins information. XXX YYYY ZZZ QWRASD BLAH bLAH
```

## Servers and clients
Any networked computer can be a server. Any networked can be a client. Server and clients are only but roles.

### Server
A computer that listens for incoming connections or a computer configured to run server programs.

### Client
A computer that connects to a server, initiates a connection.

### Netcat

First create a server
```sh
$ nc -lc 5000

# or if that doesn't works
$ nc -l 5000

# received
> hello server I am the client
# send
> hello client I am the server
```

Then connect to your server in another terminal
```sh
nc localhost 5000

# send
> hello server I am the client
# received
> hello server I am the client
```

### Peer to Peer
Clients establish connections directly to other clients. Nodes in the network are symmetric with no fixed central servers. e.g. bitTorrent, webrtc.

## TCP vs UDP
With `TCP` get acknowledges back saying "yes I got it", with `UDP` you don't.

### TCP
Reliable transport if a packet is not acknowledged (ACK) on the other, end it get resent.

### UDP
Unreliable transport packets are sent but there is no confirmation that the packet was received at the other end.

Streaming audio, video, games sometimes are good examples where UDP are used although a lot of them use TCP now a days.

## Protocols
The language that computer programs speak to each other. Examples:

- HTTP - browse web pages
- HTTPS = browse web pages with encryption, a layer of SSL on top of HTTP
- SMTP - send and receive emails, very similar to HTTP
- IMAP, POP3 - load emails from an inbox
- IRC - Very old, very simple Chat protocol
- FTP - File transfer
- SSH - Remote shell over an encrypted connection
- SSL - low-level secure data transfer (used by HTTPS)

## Ports
Each computer can have many services. A port is a number between `1` and `65535` that differentiates among the services on a system.

### Customary Ports

- 21 - ftp (control port)
- 22 - SSH
- 25 - SMTP
- 443 - HTTPS
- 27017 - MongoDB
- 3306 - MYSQL
- 5432 - postgresql
- 5984 - couchdb
- 6667 - IRC
