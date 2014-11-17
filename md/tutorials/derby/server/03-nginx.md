# Installing Nginx on Ubuntu


## SPDY Support

```
sudo -s
apt-get update 
apt-get upgrade -y
apt-get install -y software-properties-common

nginx=stable # use nginx=development for latest development version
add-apt-repository ppa:nginx/$nginx
apt-get update 
apt-get upgrade -y
apt-get install -y nginx

nginx -V
```


## SSL
1. Gernerate Certificates using StartSSL

TODO


2. Create a directory for the SSL certs

```bash
mkdir -p /etc/nginx/ssl
```

3. Copy Certs to the newly created Directory

```bash
mkdir -p /etc/nginx/ssl
cp www.example.com/* /etc/nginx/ssl
```

4. Firefox complains if we don't provide the intermediate CA certificate

```
curl https://www.startssl.com/certs/sub.class1.server.ca.pem >>/etc/nginx/ssl/www.example.com.crt
curl https://www.startssl.com/certs/ca.pem >>/etc/nginx/ssl/www.example.com.crt
```

Make a directory for our cache

```
sudo mkdir -p /data/nginx/cache
```

```
rm /etc/nginx/sites-available/default
```

`vim /etc/nginx/nginx.conf`

```
user www-data;
worker_processes 4;
pid /run/nginx.pid;

events {
  worker_connections 768;
  # multi_accept on;
}

http {
  ##
  # Proxy Cache Settings
  ##

  proxy_cache_path /data/nginx/cache keys_zone=one:1m 
              inactive=1w loader_threshold=300
              loader_files=200 max_size=2000m;

  ##
  # Basic Settings
  ##

  sendfile on;
  tcp_nopush on;
  tcp_nodelay on;
  keepalive_timeout 65;
  types_hash_max_size 2048;
  # server_tokens off;

  # server_names_hash_bucket_size 64;
  # server_name_in_redirect off;

  include /etc/nginx/mime.types;
  default_type application/octet-stream;

  ##
  # Logging Settings
  ##

  access_log /var/log/nginx/access.log;
  error_log /var/log/nginx/error.log;

  ##
  # Gzip Settings
  ##

  gzip on;
  gzip_disable "msie6";

  ##
  # Virtual Host Configs
  ##

  include /etc/nginx/conf.d/*.conf;
  include /etc/nginx/sites-enabled/*;
}

```

`vim /etc/nginx/sites-available/www.example.com`

```
# the IP(s) on which your node server is running. I chose port 3000.
upstream backend {
   ip_hash;
   server 127.0.0.1:3000 max_fails=2  fail_timeout=10s;
   # server 127.0.0.1:3001 max_fails=2  fail_timeout=10s;
}

# Redirect HTTP traffic to HTTPS
# server {
#   listen 80;
#   server_name www.example.com;
#   return 301 https://$server_name$request_uri;
# }

# the nginx server instance
server {
  server_name www.example.com;
  access_log /var/log/nginx/www.example.com.log;

  listen 80;
  # Adding default_server will cause Nginx to send this ssl cert as a default
  # for browsers that don't support SNI SSL
  listen 443 default_server deferred ssl spdy;
  ssl_certificate /etc/nginx/ssl/www.example.com.crt;
  ssl_certificate_key /etc/nginx/ssl/www.example.com.key;
  
  # pass the request to the node.js server with the correct headers and much more can be added, see nginx config options
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;
 
    proxy_pass http://backend;
    proxy_redirect off;
 
    # Websockets
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
  location /-/images {
    proxy_cache one;
    proxy_cache_valid  200 302  1w;
    proxy_cache_valid  404      1m;
    # expires 1m;
    proxy_pass http://backend;
  }
  # location ~* \.(css|js|gif|jpe?g|png)$ {
  #   proxy_cache one;
  #   proxy_cache_valid  200 302  10m;
  #   proxy_cache_valid  404      1m;
  #   proxy_pass http://backend;
  # }
}
```

Link the new config
```
ln -s /etc/nginx/sites-available/www.example.com /etc/nginx/sites-enabled/www.example.com 
```

Reload Nginx

```
service nginx reload
```

Test the config

```
nginx -t
```

### Resources

- [How to install and configure SPDY on Nginx](http://www.nginxtips.com/how-to-install-and-configure-spdy-on-nginx/)
- [Digital Ocean: How To Set Up Multiple SSL Certificates on One IP with Nginx on Ubuntu 12.04](https://www.digitalocean.com/community/tutorials/how-to-set-up-multiple-ssl-certificates-on-one-ip-with-nginx-on-ubuntu-12-04)
- [Nginx Pitfalls](http://wiki.nginx.org/Pitfalls)
- [Nginx Quickstart](http://wiki.nginx.org/QuickStart)
- [Nginx Configuration](http://wiki.nginx.org/Configuration)
