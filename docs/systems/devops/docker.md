# Docker Basics

- [Infrastructure as Code](https://martinfowler.com/bliki/InfrastructureAsCode.html)
- [But it Works on My Machine!](https://www.usenix.org/conference/ures14/technical-sessions/presentation/it-works-my-machine-how-container-technologies)
- [More reasons to use Docker](http://blog.flux7.com/blogs/docker/the-great-debate-should-you-use-docker-or-not)
- [Top 10 Docker CLI commands you can’t live without](https://medium.com/the-code-review/top-10-docker-commands-you-cant-live-without-54fb6377f481)
- [A Docker Tutorial for Beginners](https://docker-curriculum.com/)

## Docker
Docker bundles app with all the services it depends on in a container so it can be deployed anywhere. Docker standardises how an app is built through a simple configuration file.
> "It works on my machine" - Developers everywhere

## Image
A docker bundle

## Container
A single instance of a Image, Docker is really good for running multiple containers of a single image. A container is also like a VM, but far more lightweight and with the same security and operational isolation from system resources.

## Dockerized App
An app that has a Dockerfile made for it and can be built into a Docker image and run as a container.

## Continuous Delivery
When an app is setup so that it’s easily sent through the process of build, test, and deployment. Often referred to as CI or CD (Continuous Integration or Software Delivery Pipelines).

## Docker Client

## Docker Host
Docker Deamon, Containers, Images

## Docker Registries 
(e.g. Docker Hub Docker Cloud, Ubuntu Redis nginx) 

```

[
    {
        "Id": "sha256:881bd08c0b08234bd19136957f15e4301097f4646c1e700f7fea2
        ...
        "Config": {
            ...
            "ExposedPorts": {
                "80/tcp": {}
            },
        ...
    }
]
```

`-p` publish port `8080` exposed port `80` 
`--detach` detach from the terminal, so it runs on the background 
```sh
docker run -p 8080:80 --detach nginx
# prints container ID
# 4222325951f6461557728aa486228b1fea974d64c2a376b0ec91d8686b9b944c
```

`ps` process status

by default container connect to bridge
```
docker ps
```

```
docker stop 4222325951f6
```


```
docker inspect network bridge
```

`-it` interactive session, teletype so we can communicate with our terminal
```
docker run -d -it --name container1 ubuntu
```

attach container1 to the terminal shell
```
docker attach container1
```


## Docker file

`Dockerfile`

```docker
# This is a comment

INSTRUCTION argument1 argument2
INSTRUCTION argument1 argument2
```

- [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)
- [Best practices for Dockerfiles](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)
- [Example Dockerfile based on the Dockerfile reference from Docker](https://gist.github.com/ju2wheels/3d1a1dfa498977874d03)

```docker
# Base Image
# Must be the first command on the docker file, usually an OS
FROM ubuntu:latest

# User Instructions
# By the default container run on root user, having full privileges, but you may want to run your app as a different user with fewer privileges.
# We'll need to create the user and a folder he can use before switching
RUN useradd treehouse

# Working directory
# Creates the directory and every file copied will be copied to the directory similar to `mkdir app && cd app`
WORKDIR /app
RUN chown treehouse /app

# Now we can switch user
USER treehouse

# Sets environment variables that you can use later in your Dockerfile, and they'll also be set within the environment of your running container.
ENV appDir=/app message="Welcome to your app!"
# WORKDIR $appDir
# RUN echo $message > README.txt
# CMD echo Read ${appDir}/README.text for a friendly greeting!

# Commands to run to install dependencies
# shell form
RUN apt-get update -y
# exec form
# RUN ["apt-get", "update", "-y"]
RUN apt-get install -y curl 
RUN apt-get install -y gnupg 
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get install -y nodejs

# Verify installations
RUN node -v
RUN npm -v

# Copy apps from the local folder to the Docker container
COPY package*.json .
COPY index.js index.js

# Sets an executable to be run each time a container starts
# ENTRYPOINT ["npm", "run"]

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Make port available
EXPOSE 8080

# If no ENTRYPOINT has been set, the first argument is treated as the executable to be run
CMD ["npm", "run", "start"]

# Command to run when the container starts
# CMD ["start"] # npm start start
# if we run:
# docker run -p 8080:3000 my-node-image dev 
# last argument will overwrite CMD
# npm run dev
```

`-t` tag name to image plus version `my-node-image:1.0` or by default `my-node-image:latest`
`ls -R /files`  we can print an folder structure on run by using the command
```sh
docker build -t my-node-image .
```

```sh
docker run -d -it --name -p 8080:3000 --name=process2 my-node-image
```


### Remove Container
```
docker rm 12d727ca4ea0
```

Remove all containers
```
docker rm $(docker ps -a -q)
```

## Images

### List Images
```
docker images
```

### Remove Image
`rmi` remove image
`--force`
```
docker rmi my-node-image
```

show the container logs, by passing the container `id` or `name`
```
docker logs 4222
```

```
docker exec -it mycontainer
```

```
docker run -d -p 8080:3000 -e PERSON="Santa Claus" --name container1 test-node-image
```
