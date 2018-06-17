# Docker

- [Infrastructure as Code](https://martinfowler.com/bliki/InfrastructureAsCode.html)
- [But it Works on My Machine!](https://www.usenix.org/conference/ures14/technical-sessions/presentation/it-works-my-machine-how-container-technologies)
- [More reasons to use Docker](http://blog.flux7.com/blogs/docker/the-great-debate-should-you-use-docker-or-not)

"It works on my machine" - Developers everywhere

## Docker
Docker bundles app with all the services it depends on in a container so it can be deployed anywhere. Docker standardises how an app is built through a simple configuration file.

## Container
You can think of a container for an app as a real-life shipping container for freight. An app container is also like a VM, but far more lightweight and with the same security and operational isolation from system resources.

### Continuous Delivery
When an app is setup so that it’s easily sent through the process of build, test, and deployment. Often referred to as CI or CD (Continuous Integration or Software Delivery Pipelines).

### Dockerized App
An app that has a Dockerfile made for it and can be built into a Docker image and run as a container.


`Dockerfile`
```sh
# Dockerfile for building a MongoDB service

# Pull base image.
FROM mongo

# Define mountable directories.
VOLUME ["/data/db"]

# Define working directory.
WORKDIR /data

# Define default command.
CMD ["mongod"]

# Expose ports.
#   - 27017: process
#   - 28017: http
EXPOSE 27017
EXPOSE 28017
```

```sh
# tag the image with a name
$ docker build -t mongotest .
# build image ...

$ docker run -p 27017:27017 -p 28017:28017 mongotest
```
