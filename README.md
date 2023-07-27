# lc-check
1. Add your .env file


## Deploy in aws ec2 linux

1. Install docker
   ```sudo yum install docker```
3. install docker-compose
   ```
   sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose\
   sudo chmod +x /usr/local/bin/docker-compose\
   docker-compose version
   ```
3. start the docker
  ```sudo systemctl start docker```
4. add your .env file
  ```touch .env```
4. run containers in background
  ```docker-compose --env-file  .env up -d```
