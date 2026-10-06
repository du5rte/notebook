---
title: "SSL"
type: doc
created: 2016-07-21
updated: 2018-06-18
tags: [network]
---
# SSL

Resources:
- [letsencrypt.org](https://letsencrypt.org/)
- [Self-Signed SSL Certificate for Nginx in Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04)
- [Secure Nginx with Let's Encrypt on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-16-04)
- [letsencrypt.org with nginx](https://hirschmann.io/lets-encrypt-with-nginx-and-digitalocean/)
- [ssl-config-generator](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
- [ssllabs](https://www.ssllabs.com/ssltest/)


```sh
letsencrypt-auto certonly --standalone --email [YOUR_EMAIL] -d [YOUR_DOMAIN] -d [YOUR_DOMAIN_WITH_WWW]
```

```sh
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

## Related
- [[docs/security/cryptography|Cryptography]]
- [[docs/security/jwt|JWT]]
- [[docs/security/security|Security]]
- [[docs/network/nginx|Nginx]]
- [[docs/network/dns|Technology Foundations]]
- [[docs/linux/server-setup|Ubuntu]]
