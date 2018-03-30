
## Setup
### Shell
1. Use fish shell

```
apt-get install -y fish
```

2. Make fish the default

```
chsh -s /usr/bin/fish
```
```
# Curl
apt-get install -y curl
```

```
# Build Essentials
apt-get install -y build-essential
```

### Redis

```
apt-add-repository ppa:chris-lea/redis-server
apt-get update
apt-get install -y redis-server

```
### Install Apps

1. Node

```bash

# Update and Upgrade
apt-get update
apt-get upgrade -y
apt-get autoremove -y

# Mongo
apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
apt-get update
apt-get install -y mongodb

# Imagemagick
apt-get update
apt-get install -y imagemagick

# Node
# Use newest version of Node
curl -sL https://deb.nodesource.com/setup | sudo bash -
apt-get install -y nodejs


npm i -g forever
npm i -g coffee-script

# Git
apt-get install -y git
```

Create a directory for ourt Git repos

```
mkdir -p /srv/git
chown -R $USER:$GROUP /srv/git
```

Initialize a bare repo for our project. Change `myproject` to your projects name

```
git init --bare /srv/git/myproject.git
```


create a directory for your project
```
mkdir -p /srv/www/www.example.com
```

```
cd /srv/git/myproject/hooks
```

```
cat <<EOF >/srv/git/jmc-www.git/hooks/post-receive
#!/bin/sh

echo
echo "*** Push received"

echo
echo "*** Publishing changes"
git --work-tree=/srv/www/production.justinmcclure.com --git-dir=/srv/git/jmc-pro.git checkout -f
cd /srv/www/www.example.com || exit

echo
echo "*** Loading Node Modules"
npm install

echo
echo "*** Setting Environmental Variables"
export NODE_ENV=production
export PORT=3000

echo
echo "*** Restarting the server"
# forever start -c coffee server.coffee
forever stop server.js
forever start server.js
EOF
```

Change file permissions
```
chmod +x post-receive
```

## Local Machine

```
cd /my/workspace
mkdir myproject && cd myproject
git init
```

Tell Git to add a remote called `live` using `ssh`
```
git remote add live ssh://root@s1.example.com/srv/git/myproject.git
```

```
git push live master
```


### Resources
[How To Set Up Automatic Deployment with Git with a VPS](https://www.digitalocean.com/community/tutorials/how-to-set-up-automatic-deployment-with-git-with-a-vps)
