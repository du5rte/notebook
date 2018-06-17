# Technology Foundations

## DNS Domain Name System
Likes a phonebook, directs domain names to device's IP addresses

## IP Address
A number that corresponds to a device on the network, usually in the format 1.2.3.4.

## Network
Either a local network or the Internet.

## TLD - Top Level Domain
(e.g. example ".com".)
Country code (.uk .us .es) | generic (.com .org) | infastructure
There are currently 326 different top level domains.
! can not be all numbers !

## wwww.example.com
sub-domain = www | domain = example | top-level-domain = com
There can be 127 levels of domain each may have up to 63 characters
Full domain name is limieted to 253 chracters of text
Must use the ASCII character set and the LDH rule.
Letters = A - Z lower or upper | Digits = 0 - 9 | Hyphens = '-'
Domain names cannot start or end with a hyphen.

## TTL - Time To Live
A mechanism that limits the lifespan or lifetime of data in a computer or network

## Propagation:
the process of the changes being picked up across the Internet

## Different Types of DNS Hosting

## Name Servers
Name servers answer questions to your DNS queries.
There are two kinds of DNS Name Servers: master and slave.
The master name server stores original copies of records.
Slave name servers get copies of the data and share load as well as improve availability.

## Registrar DNS Hosting
Registrar provided DNS can be a quick and easy solution for setting up your own DNS. Generally, registrar provided DNS is relatively basic and may not have the more advanced features of a DNS only provider. On the up side, registrar provided DNS services are generally free when you purchase a domain with a given registrar.

## DNS Hosting Services
There are providers out there that can host your DNS for you, such as DNSimple, DNS Made Easy, and Amazon Web Services. One of the benefits of hosting your DNS with a provider that is separate from your registrar is that you will have less work to do should you ever decide to transfer your domain name from one registrar to another. Another benefit that DNS providers have recently started offering is templates for external services to your domains. These can be things like Google Apps, GitHub Pages, content delivery networks, and more. While this feature isn’t completely necessary, it can be a huge time saver. Some DNS providers, such as DNSimple, will also allow you to register domains with them.

## DNS Self Hosting
Another option is hosting your own DNS server. There is software out there that can be used to manage and configure DNS. There are a ton of different programs that can be used to manage DNS, some being closed and some open source. The pros of hosting your own DNS is that you have complete control of every aspect of it. The cons of hosting your own DNS is that it can be quite difficult to set up and configure and you generally need to have at least two servers dedicated to the task, one being for backup.

## Root Servers
The DNS root servers keep track of the root zone and keep track of all of the top level domains such as .com, .org, and more.
These are hold by a company named ICANN (Internet Coporation for assigned names and number), without it there would be no internet

## 'A' Records
DNS A Records map hosts names to IP addresses. These are the most common type of DNS records.

## Wildcard Domain
An asterisk denotes a wildcard domain `(e.g. *.jason.teamtreehouse.com would point to one server)`.

## AAAA Records
The IPv6 version of an A record is called the AAAA record. Contain two more set of information than IP Address (the future of internet)

## MX Records
Specify how mail should be routed via SMTP (Simple Mail Transfer Protocol), specified via a FQDN (Fully Qualified Domain Name)
MX records are specified via priority, such as 1, 5, 10, etc.
Backup MX servers hold mail in a queue in case the priority server is not available.
- Example MX Records
- Google's MX Records:
	- 1    aspmx.l.google.com.
	- 5    alt1.aspmx.l.google.com.
	- 10   aspmx3.googlemail.com.

## CNAME Records (Canonical Name)
Used for aliases when creating domain names
- city1.restaurant.com
- city2.restaurant.com
CName records are written with a dot at the end. A big advantage of CNAME records is aliasing several domains to one IP address which makes it easier to update in the event an IP changes. CName records can also be aliased to hosts outside of the given domain.

## FQDN (Fully Qualified Domain Name)
There could be several entries for "www" when looking up a domain which is why the FQDN exists. The FQDN refers to a whole domain name and ends with a dot (.) like the CNAME.

## TXT Record Uses
Service providers can use TXT records to verify domain ownership.

## SPF Records
help to reduce SPAM.

## DKIM (DomainKeys Identified Mail)
A method for associating a domain name with an email message, thereby allowing a person, role, or organization to claim some responsibility for the message.

## Reverse DNS

## PTR Records
Determine that a domain name is associated with a given IP.
Used to check if the server name is actually associated with the IP address where connection was initiated from.

## Forward-confirmed reverse DNS
Which will ensure that both the PTR and A records match. Example: mail.teamtreehouse.com PTR and A record both go to the same IP address.

## PTR Record Format
Format: in-addr.arpa along with the IP address.
Example: mail.teamtreehouse.com points to 1.2.3.4
The PTR record would be 4.3.2.1.in-addr.arpa

## SOA Records (Start of Authority )
The first entry in the DNS zone file. The SOA indicates that this DNS name server is the best source for data within this domain.
- Start of Authority Information and Format:
- Source host
- Contact email (admin.example.com)
- Serial Number
- Refresh time in seconds
- Retry Time
- Expire Time
- Minimum TTL
