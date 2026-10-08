---
title: "DevOps - Docker"
type: doc
created: 2020-04-11
updated: 2026-10-07
aliases: ["Docker Basics", "Docker"]
tags: [devops]
---
# DevOps - Docker

Docker packs your app together with everything it needs to run (the right Node version, system libraries, config) into one box called a **container**. That box runs the same on your laptop, a teammate's laptop and a server. It's the cure for "it works on my machine". You'll use it most to run databases locally without installing them, and to ship apps to servers.

Resources:
- [Dockerfile reference](https://docs.docker.com/engine/reference/builder/)
- [Best practices for Dockerfiles](https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/)

## Images vs containers

The one idea to get right first.

| | Image | Container |
|---|---|---|
| What | A read-only snapshot: files, settings, a start command | A running instance of an image |
| Like | A recipe | The dish you cooked from it |
| In code terms | A class | An object |
| Made with | `docker build` | `docker run` |

One image can run as many containers as you like, each isolated from the others.

## Containers vs virtual machines

| | Container | Virtual machine |
|---|---|---|
| Includes | Your app and its libraries | A whole operating system |
| Starts in | Seconds | Minutes |
| Size | Megabytes | Gigabytes |
| Shares | The host's kernel | Nothing |

Containers are lighter because they share the host's kernel. On macOS and Windows, Docker Desktop quietly runs a small Linux VM for them.

## Running your first container

Images come from a **registry**, usually Docker Hub. `docker run` downloads the image if you don't have it, then starts a container.

```sh
docker run -d -p 8080:80 --name web nginx
# -d          run in the background (detached)
# -p 8080:80  your port 8080 → the container's port 80
# --name web  a name, so you don't need the id
```

Open `http://localhost:8080` and you get the Nginx welcome page. Read `-p` as **host:container**.

The commands you'll use every day:

```sh
docker ps                 # running containers (add -a for stopped ones)
docker logs -f web        # follow its output
docker exec -it web sh    # open a shell inside it
docker stop web           # stop it
docker rm web             # delete the container
docker images             # images on your machine
docker rmi nginx          # delete an image
```

`-it` means interactive with a terminal, so you can type into the shell.

## A Dockerfile

A `Dockerfile` is the recipe for an image: a list of instructions, run top to bottom. Here's one for a Node app.

```dockerfile
# Start from an official Node image (pick the current LTS)
FROM node:22-slim

# Every following path is relative to /app
WORKDIR /app

# Copy only the dependency files first...
COPY package*.json ./
# ...so this slow step is cached until they change
RUN npm ci --omit=dev

# Now copy the rest of the code
COPY . .

# Don't run as root: the official Node images include a `node` user
USER node

# Documents the port the app listens on
EXPOSE 3000

# The command that runs when the container starts
CMD ["node", "server.js"]
```

And a `.dockerignore` beside it, so you don't copy junk (or secrets) into the image:

```
node_modules
.git
.env
```

Build it and run it:

```sh
docker build -t coffee-api .
docker run -d -p 3000:3000 -e DATABASE_URL="postgres://..." coffee-api
```

`-t` names (tags) the image; `coffee-api` means `coffee-api:latest`. `-e` sets an environment variable.

## Layers and caching

Each instruction makes a **layer**, and Docker reuses layers that haven't changed. That's why the Dockerfile copies `package*.json` and runs `npm ci` **before** copying the code: change one line of `server.js` and only the last steps rebuild. Copy everything first and every build reinstalls all your dependencies.

Rule of thumb: things that change rarely at the top, things that change often at the bottom.

## RUN vs CMD vs ENTRYPOINT

- `RUN` runs **while building** the image: installing things.
- `CMD` runs **when the container starts**. Arguments after the image name in `docker run` replace it.
- `ENTRYPOINT` also runs at start, but arguments are **added** to it instead of replacing it.

```sh
docker run coffee-api node seed.js   # replaces CMD: runs the seed script instead
```

Use the exec form (`["node", "server.js"]`) so your app receives stop signals and shuts down cleanly.

## Data: volumes

A container's files disappear when you delete it. For anything that must survive (a database), use a **volume**.

```sh
docker run -d --name db -e POSTGRES_PASSWORD=dev -v pgdata:/var/lib/postgresql/data postgres
# pgdata lives on after the container is gone
```

## Docker Compose

Real apps are several containers: an API, a database, maybe Redis. **Compose** describes them in one `compose.yaml` and starts them together.

```yaml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://postgres:dev@db:5432/coffee
    depends_on:
      - db

  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: coffee
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

```sh
docker compose up -d     # build if needed and start everything
docker compose logs -f   # follow all the logs
docker compose down      # stop and remove the containers (volumes stay)
```

Notice the API reaches the database at `db:5432`: Compose puts the services on one network where each service name works as a hostname.

## Common mistakes

- **`localhost` inside a container** means the container itself. Use the service name (`db`) in Compose.
- **Copying everything before `npm ci`.** Every build reinstalls dependencies. Copy `package*.json` first.
- **Secrets baked into the image.** Anyone with the image can read them. Pass them as environment variables at run time.
- **Data in the container, not a volume.** Delete the container, lose the database.
- **Using `latest` in production.** It changes under you. Pin a version tag.

## Try it

1. Run Postgres with a named volume, create a table, delete the container, start a new one with the same volume. Is the table still there?
2. Write a Dockerfile for a small Node app. Change one line of code and rebuild: which steps say `CACHED`?
3. Write a `compose.yaml` for your app plus Postgres and Redis.

## Related

- [[docs/server-setup|DevOps - Server Setup]]
- [[docs/nginx|DevOps - Nginx]]
- [[docs/aws|AWS]]
- [[docs/networking|Networking - Basics]]
