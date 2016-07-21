# PostFix

resources:
- [How To Install and Configure Postfix on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-on-ubuntu-16-04)
- [Redirect domain emails to gmail](http://codewithintent.com/how-to-redirect-your-domain-emails-to-gmail-for-free-digital-ocean-postfix-dns-setup/)
- [Forwarding email for self-hosting multiple domains using Ubuntu](https://blog.ham1.co.uk/tag/email-forwarding/)

## Add DNS Records
Add an `A` and `MX` Record

| | |
---|--------|-------------------
A  | `mail` | `123.456.78.90`
MX | `5`    | `mail.example.com`


```sh

# Install PostFix
# Choose `Internet Site` `example.com`
$ sudo apt-get install postfix

# Configure it
$ sudo nano /etc/postfix/main.cf
```

```sh
# Custom Configuration
# add domains
virtual_alias_domains = example.com, another.com, evenmore.com
# link to virtual map file
virtual_alias_maps = hash:/etc/postfix/virtual
```

Create the virtual map file `virtual` in `/etc/postfix/`
```sh
$ sudo touch /etc/postfix/virtual
$ sudo nano /etc/postfix/virtual
```

add entries to `virtual`
```sh
#Simple redirect
admin@example.com example@gmail.com

#Multiple recipients
sales@another.com example@gmail.com another@gmail.com

#Catch all emails
@evenmore.com evenmore@gmail.com
```

Reload PostFix
```sh
$ sudo postmap /etc/postfix/virtual
$ sudo service postfix reload
```
