# Nginx

Resources:
- [YouTube - Nginx The Web Server You Might Actually Like](https://www.youtube.com/watch?v=YHcRzDKo6qU)
- [LearnCode.academy - Nginx Tutorial](https://www.youtube.com/watch?v=FJrs0Ar9asY)
- [How To Set Up a Node.js Application for Production on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04)
- [DgitialOcean - How To Secure Nginx with Let's Encrypt on Ubuntu 14.04](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04)
- [How To Add gzip](https://www.digitalocean.com/community/tutorials/how-to-add-the-gzip-module-to-nginx-on-ubuntu-14-04?utm_content=buffer2687d&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)

## Configuration
Any file in `etc/nginx/sites-enabled` will be runned by `nginx` we can create a link from our home folder to `sites-enabled`

```sh
$ sudo ln -s ~/nginx.conf /etc/nginx/sites-enabled/example
```

A configuration file might look like
```sh
http {
  # everything to do with http https communication
  server {
    # everything related to domains

    # include path/tosomefile.conf

    location {
      # a path within the domain
    }
  }
}
```

After reconfiguring the service needs to be restarted

```sh
$ sudo service nginx restart
```

use the test `-t` to detect problems

```sh
$ sudo service nginx -t
```

## Examples

#### Static Server

```sh
server {
  # listens to port 80 (default)
  # listen 80;
  server_name example.com;

  location / {
    # point it to the public folder
    root /home/example/public;
    # points it to the index (default)
    # index index.html
  }
}
```

#### WWW to NON-WWW

```sh
server {
  server_name www.example.com;
  # or match all
  # server_name *.example.com;
  return 301 $scheme://example.com$request_uri;
}

server {
  server_name example.com;

  location / {
    root /home/example/public;
  }
}
```

#### Reverse Proxy
Redirects the request to an application running on `http:localhost:3000`

```sh
server {
  server_name example.com;

  location / {
    proxy_pass http:localhost:3000;

    # Proxy Params
    include snippets/proxy-params.conf;
  }
}
```

`etc/nginx/snippets/ssl-params.conf`
```sh
# Proxy Params

# forwards origin information
proxy_set_header X-Real-IP $remote_addr;
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
proxy_set_header Host $http_host;
# websocket support
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection "upgrade";
proxy_set_header X-NginX-Proxy true;
proxy_redirect off;
```

#### SSL

```sh
server {
  # Redirect HTTP requests to HTTPS with a 301 Moved Permanently response.
  server_name example.com www.example.com;

  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;

  server_name example.com www.example.com;

  # SSL Certificates
  ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
  ssl_trusted_certificate /etc/letsencrypt/live/example.com/chain.pem;

  ## SSL Params
  include snippets/ssl-params.conf;

  # Any route containing a file extension (e.g. /devicesfile.js)
  location ~ (?:.+\/)((?:.+)\.(?:.+)) {
    # $1 is the filename
    try_files $uri /$1 =404;
  }

  # Any route that doesn't have a file extension (e.g. /devices)
  location / {
    try_files $uri /index.html;
  }
}
```

`etc/nginx/snippets/ssl-params.conf`
```sh
# SSL Parameters

# from https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-14-04
# and https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-nginx-in-ubuntu-16-04

ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
ssl_prefer_server_ciphers on;
ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_stapling on;
ssl_stapling_verify on;

# Diffie-Hellman parameter for DHE ciphersuites, recommended 2048 bits
ssl_dhparam /etc/ssl/certs/dhparam.pem;


resolver 8.8.8.8 8.8.4.4 valid=300s;
resolver_timeout 5s;


# HSTS (ngx_http_headers_module is required) (15768000 seconds = 6 months)
add_header Strict-Transport-Security max-age=15768000;
```
