https://doesnotscale.com/deploying-node-js-with-pm2-and-nginx/
http://blog.danyll.com/setting-up-express-with-nginx-and-pm2/
https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx
https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts
http://stackoverflow.com/questions/33711257/host-multiple-meteor-application-on-digitalocean
http://antrikshy.com/blog/deploy-an-expressjs-app-on-digital-ocean-complete-succinct-guide/
hosting-multiple-domains-with-nginx-in-ubuntu-14-04-on-digital-ocean
https://www.digitalocean.com/community/tutorials/how-to-set-up-nginx-server-blocks-virtual-hosts-on-ubuntu-14-04-lts
Web Server default port `80` https `443`
https://www.digitalocean.com/community/tutorials/how-to-configure-nginx-to-use-custom-error-pages-on-ubuntu-14-04

- [How To Redirect www to Non-www](https://www.digitalocean.com/community/tutorials/how-to-redirect-www-to-non-www-with-nginx-on-centos-7)
---------

# Nginx

Resources:
- [Tuts+ Nginx Guide](http://code.tutsplus.com/series/nginx-guide--cms-792)
- [Codemy School DevOps](https://www.youtube.com/watch?v=TIaBrUo2944&list=PLjQo0sojbbxUav7I746f0lT4apGX8-iON&index=3)


## Static Server

```sh
server {
  # listens to port 80 (default)
  # listen 80;
  server_name example.com;
  # point it to the root
  root /home/example/public;
  # point it to the index (default)
  # index index.html
}
```

## Reverse Proxy
Redirects the request to a application running

```sh
upstream example {
    server 127.0.0.1:4000;
}
server {
   # listens to port 80 (default)
   # listen 80;
   # accepts non and "www"
   server_name example.com www.example.com;

   location / {
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_set_header Host $http_host;
     # websocket support
     proxy_set_header Upgrade $http_upgrade;
     proxy_set_header Connection "upgrade";
     proxy_set_header X-NginX-Proxy true;
     # hands of request to the upstream
     proxy_pass http://example;
     proxy_redirect off;
   }
}
```

## Caching

```sh
$ sudo service nginx restart
```
