# Setting Up SSH

## Speed testing

On os 
```
cat ~/.ssh/id_rsa.pub | ssh root@s1.example.com "mkdir -p ~/.ssh; cat >> ~/.ssh/authorized_keys"
```

You will something like this:
```
The authenticity of host 'www.example.com (1.2.3.4)' can't be established.
RSA key fingerprint is 10:22:z3:15:b1:6b:f0:7d:z6:z2:z2:z6:26:9z:7z:6z.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added 'www.example.com' (RSA) to the list of known hosts.
root@s1.example.com's password: 
```
**Note:** You will need your root password

### Resources
