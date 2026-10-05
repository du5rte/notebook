# AWS

Amazon Web Services is a collection of over 55+ services to choose from and develop with, many services depend on another services.

Most services communicate with each other over `TCP` or sometimes `HTTP(S)` connections or a designated port based on the service

|             |                      |
| ----------- | -------------------- |
| S3          | https://...          |
| EC2         | 10.0.0.4             |
| ElastiCache | 10.0.0.3             |
| DynamoDB    | arn.aws:dynamodb:... |

### Access

AWS can be accessed by `Web Console` their web interface, `CLI` through the terminal or their `SDK` through our application.

## Elastic Cloud Compute (EC2)

The core of the web of AWS is `EC2`, it serves the bases of many other services. It's basicly the service that provides `instances` of a computers, you can login use as a remote virtual machine, install programs, compute and run applications.

- `Elastic`: Means instance can increase or decrease at will
- `Cloud Compute`: Computing `instances` operating in remote data servers around the world
- `Instance`: A virtual server machine, the basic building block of EC2.

### Creating a Test EC2

1. Create a `t2.micro` EC2 instance, with default setting and `http` access
2. Create a `key pair` to access that instance later on, this should be a `.pem` file.
3. SSH into the instance using the `.pem`

```sh
ssh -i "test01.pem" ec2-user@ec2-3-248-195-49.eu-west-1.compute.amazonaws.com
```

Incase this error comes up

```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
Permissions 0644 for 'myinstance.pem' are too open.
```

You just need to adjust the file permissions

```sh
chmod 400 myinstance.pem
```

### Amazon Machine Image (AMI)

Operating system and software used on an EC2 instance. Once you select an image you'll need to select an image type (e.g. CPU, RAM, Network performance)

## Elastic Computing Service (ECS)

Handles high availability, scaling and load balancing.

- `Cluster`: Is the top level element in ECS, used to container and organised tasks and services.
- `Tasks`: Is a package of metadata defining an application along with network, storage and security environment it will need. A tasks need a `Container` which is the heart of the whole thing.
- `Container`: An instance of a `Container Image` from the `registry`.
- `Container Image`: A template for a container, this has everything it needs to run the application code.
- `Registry`: Where application images are stored (e.g. `Docker Hub`, `Elastic Container Registry`).

### Orchestrator

In ECS the `service` is what manages all of this.

- Fargate: Fully managed
- Ansible
- Kubernetes

Tools thse intelligence

## Create a cluster

```sh
aws ecs create-cluster --cluster-name myapp
```

### Auto Scaling Group

Rules for automatically scaling EC2 images up and down

### Elastic Block Storage (EBS)

### Elastic Container Registry

Amazon ECR provides a Docker credential helper which makes it easier to store and use Docker credentials when pushing and pulling images to Amazon ECR. [](https://docs.aws.amazon.com/AmazonECR/latest/userguide/docker-push-ecr-image.html)

1. Create a repository

```sh
aws ecr create-repository --repository-name myimage
```

2. Retrieve an authentication token and authenticate your Docker client to the registry

```sh
aws ecr get-login-password --region eu-west-1 | docker login --username AWS --password-stdin <account_id>.dkr.ecr.eu-west-1.amazonaws.com/myimage
```

2. Build the Docker image

```sh
docker build -t myimage .
```

3. Tag the image

```sh
docker tag myimage:latest <account_id>.dkr.ecr.eu-west-1.amazonaws.com/myimage:latest
```

4. Push to the repository

```sh
docker push <account_id>.dkr.ecr.eu-west-1.amazonaws.com/myimage:latest
```

### Security Group

IP-Based communication rules for single or group service instances. (e.g. who can can ssh into EC2 instance, allow access between EC2 instance, )

### Key pair

Allows you to ssh into a instance

### Pricing

Instances are charged by the hour, prices are based on Instance type, AMI type (e.g. a ). See https://aws.amazon.com/ec2/pricing/ for current pricing

| Instance Type | AMI          | Rate per hour | Rate per day |
| ------------- | ------------ | ------------- | ------------ |
| r5.large      | Amazon Linux | \$0.126 USD   | \$3.02 USD   |
| t2.micro      | Amazon Linux | \$0.013 USD   | \$0.31 USD   |

- On-demand instance -> Cheap
- Reserved instance -> Cheaper
- Spot instances -> Cheapest

Additional Pricing

|                       |                         |
| --------------------- | ----------------------- |
| Elastic Block Storage | \$0.10 USD per GB/month |
| Auto Scaling Groups   | Free                    |
| Load Balancer         | \$0.0225 USD/hour       |

## Simple Storage Service (S3)

The place to store files.

### Bucket

Is the basic foundation of S3, you can create and configure multiple buckets. With buckets

With buckets you can trigger events when objects are added/modified/deleted. You can preserve older versions of objects. Replicate objects across regions. Host a static files for websites.

The url structure of a bucket object

```
https://s3-us-west-1.amazonaws.com/ofkido.org/img/okfido_logo.png
        ------------              ----------- -------------------
      S3 Bucket Region            Bucket Name     Object Path
```

Together with CloudFront you can cache/edge your content across multiple regions in the world (CDN Service) or as a load balancer.

### Pricing

Amount of Data Store x Number of Requests x Amount of Data Transferred

| Amount of Data Store | Number of Requests      | Amount of Data Transferred |
| -------------------- | ----------------------- | -------------------------- |
| \$0.023 per GB       | \$0.005 per 1K requests | \$0.09 per GB              |

### Relational Database Service (RDS)

Are AWS own managed databases, with scheduled automated backups, simple software updates, managed infrastructure. Also comes with easy dashboard configuration and ability to create replicas

A database can be installed in EC2 but having a managed database will save you a lot of headache

## Route 53

Amazon service for DNS management, allows to resolve domain names to internal aws services.

### Domain Name System

System that translate human-readable URLs to IP addresses

EC2 Instances can be configured with fixed IP addresses, but S3 buckets or load balances don't have fixed visible addresses, so that's where Route 53 makes urls resolves to IPs addresses

## Elastic Beanstalk

Under cover is running EC2 instances but makes it easier to configure, deploy, manage and scale applications much easier to work with, event when deployed across multiple

### Application

This the building block of EB, it can be your web application or web service. A application will need a unique name. Inside each application it can have multiple versions.

| Version | Test Environment | Prod. Environment |
| ------- | ---------------- | ----------------- |
| v1      | app-test:v1      | app-prod:v1       |
| v2      | app-test:v2      | app-prod:v2       |
| v3      | app-test:v3      | app-prod:v3       |

### Environments

Is where the main logic lives

### Monitoring Metrics

- Number of Requests
- CPU Utilization
- Network Traffic

### Pricing

It's free you only pay for the S3 storage you use, the EC2 instances and load balancer

## Lambda

Provides function execution as a service (aka serverless), lambda scales automatically without management and you only pay when your code is running. Lambda can save a lot of cost for small irregular tasks.

### Function

The main block of lambda is a function, each function is configured with a language (e.g. node, python).

### Pricing

The free tier of AWS gives you a 1 million requests per month and First 400K GB/s per month. then

|                                    |                  |         |
| ---------------------------------- | ---------------- | ------- |
| Requests (\$0.20 per 1M)           | 4,000 per day    | \$0.80  |
| Execution (\$0.18 128mb per 24hrs) | 2 Second Average | \$16.64 |

## DynamoDB

A NoSQL managed database that supports both document and key value store models. You just pay for how much you store and how much you access it, the rest is taken care of.

### Pricing

Amount of data stored. First 25GB are free, then \$0.25/GB per month.

## Virtual Private Cloud

Allows to group your services into groups that follow access rules and share common space. VPC lets you have control of routing tables and NAT to control outbound traffic and control internal IP addresses for instances.

Inside a VPC there's usually multiple subnets organized into different groups.

### Private Subnet

Typically you would put your database and private instances in here, only to be access to the public subnet instances, not the public.

### Public Subnet

These services would act as a tunnel to the private services

### Routing Tables

Allows you to override and redirect IP ranges to elsewhere, example redirect all outgoing traffic to a NAT gateway which will mask the instances IP address.

### Network Access Control List

Act as subnet firewalls, allowing or disallowing IP ranges or both

### Pricing

It's free. So no reason to why not make your network more secure

## CloudWatch

Monitoring services for many of aws services. It's main functions are monitoring resources and acting on alerts.

### Alarm

You can set alarm for a multitude of metrics for different services. Notifications can range from email or SMS or performing an EC2 auto scaling group

Examples:

- EC2 CPU Utilization
- DynamoDB - ConsumerReadCapacityUnits
- S3 - NumberOfObjects
- Route53 - HealthCheckStatus
- RedShift - DatabaseConnections

### Logs

It can also consume and aggregate logs by configuring awsLogs agents on EC2 Instances, once configured CloudWatch can filter logs and trigger alerts based on defined criteria.

|                |                       |
| -------------- | --------------------- |
| Alarms         | \$0.10 each per month |
| Ingesting Logs | \$0.50 per GB         |
| Archived Logs  | \$0.03 per GB         |
| Dashboards     | \$3.00 per month      |

### CloudFront

Is a content delivery network that allows to serve files global with fast connections. It works seamlessly with Route53, Load Balancer, EC2 and S3.

### Distribution

The building block of CloudFront, A distribution defines a set of of original content to be served.

- SSL Certificates
- Allowed HTTP Methods
- Edge Locations

### Pricing

Free tier 50GB data per month and 2 million request per month for the first year

|                             |                |
| --------------------------- | -------------- |
| United States Outgoing Data | \$0.085 per GB |
| Asia Outgoing Data          | \$0.14 per GB  |

## Web Console

### Services

Expanding the all services will show all the services AWS has to offer. For web developer most likely they will use services from `Computer`, `Storage`, `Database` and `Networking & Content Delivery`

### Resources Groups

You often will assign resources for `EC2 instances` and `ElasticBean` setting common groups will make the workflow faster

### Regions

On the top right there's regions, regions also decide pricing and latency so choose accordingly, also some services might not be available in every region.

[Save yourself a lot of pain (and money) by choosing your AWS Region wisely](https://www.concurrencylabs.com/blog/choose-your-aws-region-wisely/)

### Billing

On `My Billing Dashboard` it will show an overview of expenses.

## SDK

Each AWS SDK is open sourced and available on [github](https://github.com/aws)

For `Node.js`

```sh
npm install aws-sdk
```

```js
// import the sdk
const AWS = require("aws-sdk");

// set the region to format the urls
AWS.config.update({ region: "us-east-1" });

// set a client to connect to the dynamoDB
const dynamodb = new AWS.DynamoDB();

// create a item to insert
const item = {
  Item: {
    id: {
      S: new Date().getTime().toString(),
    },
    Value: {
      S: process.argv[2],
    },
  },
  // name of value to create
  TableName: "aws-developer",
};

// put the item in the cloud
dynamodb.putItem(item, (err, res) => {
  if (err) throw err;
});
```

## CLI

Useful for writing shell scrips ot batch files. Being able to execute commands via a scripts is useful for `CI` (Continuous Integration). Automated run systems that build and deploy built application directly to the cloud. [AWS CLI Command Reference](https://docs.aws.amazon.com/cli/latest/reference/)

```sh
aws <service> <command> <arguments>
```

Install

```
brew install aws-cli
```

Once install you need to configure it. This will ask for `AWS Access Key ID` and `AWS Secret Access Key` as well as a default `region`. These can be created and deleted from the `Your Security Credentials` on the web portal.

```sh
aws configure
```

Example command

```sh
aws dynamodb put-item --table-name aws-developer --item \"{\"id\":{\"S\":\"1586635875916\"},\"Value\":{\"S\":\"pizza\"}}\"
```

Example script file `cli-demo.sh`

```bash
#!/bin/bash

# This script only runs natevily in Mac or Linux. Copy any below commands and paste into a command line for Windows machines.

# put an item into dymanodb from the command line
aws dynamodb put-item --table-name aws-developer --item \"{\"id\":{\"S\":\"1586635875916\"},\"Value\":{\"S\":\"pizza\"}}\"

# put an item into dymanodb with json file
aws dynamodb put-item --table-name aws-developer --item file://item.json
```

Run script file

```sh
sh cli-demo.sh
```

## IAM

Allows to give `groups`, `users`, `roles`, etc, access to services and resources by attaching them `policies`. Custom policies can be created as well each will be a collection of `access`.

- `Programmatic access`: Uses a `access key ID` and `secret access key` to access AWS API, CLI, SDK, and other development tools.
- `AWS Management Console access`: Allows access to AWS Management Console web interface.

## Adding a API Access

1. Add a label `username`
2. Restrisct to only `AWS Management Console access`
3. Create a custom `policy` and only give access to the resources it needs
4. Pass `access key ID` and `secret access key` securely

## Adding Another Developer

1. Add their email to `username`
2. Allow `Programmatic access` and `AWS Management Console access`
3. Attach existing policies directly, `AdministratorAccess`
4. Give them their credentials including the `Console login link`

## Fargate

A compute engine for `Elastic Container Service` that allows to run `containers` without having to provision or manage EC2 instances, configure or scale clusters of VMs.

- [Deep Dive into AWS Fargate (22 May, 2018)](https://www.youtube.com/watch?v=xBgiArJHv7E)
- [Deep Dive into AWS Fargate 2 (Apr 25, 2018)](https://www.youtube.com/watch?v=IEvLkwdFgnU)
- [ECS vs. Fargate: What's the difference?](https://cloudonaut.io/ecs-vs-fargate-whats-the-difference/)

### Task Definition

A blueprint for the launch type of our containers. There can be up to 10 `containerDefinitions` with their own configurations

```js
{
  "family": "webserver",
  "executionRoleArn": "ecsTaskExecutionRole",
  "requiresCompatibilities": ["FARGATE"],
  "containerDefinitions": [
    {
      "name": "web",
      "image": "nginx",
      "memory": "100",
      "cpu": "99"
    }
  ],
  "networkMode": "awsvpc",
  "memory": "1024",
  "cpu": "256"
}
```

### Resources

Resources can be defined in the task manager and allocated to containers, `memory`, `cpu`, etc.

#### Task Level Resources

Total cpu/memory accross all containers, `required fields`, decides billing axis.

#### Container Level Resources

Defined sharing of task resources among containers, `optional fields`

allocated to each container in the cluster

```js
{
  "family": "chat",

  // Task Level Resources

  "cpu": "1 vCpu",
  "memory": "2 gb",

  "containerDefinitions": [
    {
      "name": "chat",
      "image": "xxx.dkr.ecr.us-east-1.amazonaws.com/chat-app",

      // Container Level Resources

      "cpu": 256,
      "memoryReservation": 512,
    },
    {
      "name": "another-container",
      "image": "xxx.dkr.ecr.us-east-1.amazonaws.com/api",

      // Container Level Resources

      "cpu": 768,
      "memoryReservation": 512,
    }
  ],
}
```

#### CPU Memory Configurations
You pay for what you provision (For Task level CPU and Memory)

- `cpu-units`, 1 vCPU = 1024 cpu-units
- `memory`: MB

| CPU            | Memory                                 |
| -------------- | -------------------------------------- |
| 256 (.25 vCPU) | 512MB, 1GB, 2GB                        |
| 512 (.5 vCPU)  | 1GB, 2GB, 3GB, 4GB                     |
| 1024 (1 vCPU)  | 2GB, 3GB, 4GB, 5GB, 6GB, 7GB, 8GB      |
| 2048 (2 vCPU)  | Between 4GB and 16GB in 1GB increments |
| 4096 (4 vCPU)  | Between 8GB and 30GB in 1GB increments |

### Networking
Your task gets a `ENI` Elastic Network Interface, which can be made public or used privately inside `awsvpc`, so other `EC2` instance can connect to it if you choose so. This is also used to pull images from `ECR` or puplib repository and pushing logs to `CloudWatch`. (`awsvpc` is the only support network mode with Fargate)

[Task Networking in AWS Fargate](https://aws.amazon.com/blogs/compute/task-networking-in-aws-fargate/)

### Load Balancing
We can assign a load balancer to our container port

Task Definition
```js
{
  "family": "chat",
  "cpu": "1 vCpu",
  "memory": "2 gb",
  "networkMode": "awsvpc",
  "containerDefinitions": [
    {
      "name": "chat",
      "image": "xxx.dkr.ecr.us-east-1.amazonaws.com/chat-app",
      "cpu": 256,
      "memoryReservation": 512,
      "portMappings": [
        { "containerPort": 8080 }
      ]
    }
  ],
}
```

Load balancer
```sh
aws ecs create-service
  -- task-definition chat:1
  -- network-configuration
    "awsvpcConfigration = {
      subnets=[subnet-id],
      securityGroups=[sg-id]
    }"
  -- Load-balancers
    "[
      {
        "targetGroupArn": "<insert arn>",
        "containerName": "chat",
        "containerPort": 8080
      }
    ]"

```

### Layer Storage
<!-- Compose of `layer storage`,  -->
Docker images are composed of layers. The topmost layer is the `writable` layer to cpature file changes made by the running container. `10GB` of layer storage available per task. Writes are not visible across containers. Ephemeral, storage is not available after the task stops.

### Volume Storage
Persistent storage, Fargate provied `4GB` volume space per task. This can be visible across containers

### Logs Configurations
Use the `awslogs` driver to send stdout from your application to `Cloudwatch` logs.

1. Create a log group in `CloudWatch`
2. Configure the log driver in your task definition
3. Remember to add permissions via the `ecsTaskExecutionRole`

```js
{
  "family": "chat",
  ...
  "containerDefinitions": [
    {
      "name": "chat",
      ...
      "logConfiguration": {
        "logDiver": "awslogs",
        "options": {
          "awslogs-group": "chat-app",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "chat-app"
        }
      }
    }
  ],
}
```


### Health Check

Allows you to customise the health check inside the task definition, the default command is `"curl -f http://localhost/ || exit 1"` which tries to hits port `80`

[TaskDefinition HealthCheck](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ecs-taskdefinition-healthcheck.html)

#### NOTE!

This implementation runs on the container, the container might not have `curl` installed. [Docker Healthcheck](https://docs.docker.com/engine/reference/builder/#healthcheck).

```json
{
  "healthCheck": {
    "command": [
      "CMD-SHELL",
      "curl -f http://localhost:4000/.well-known/apollo/server-health || exit 1"
    ],
    "interval": 30,
    "timeout": 5,
    "retries": 3,
    "startPeriod": 120
  }
}
```

### GitHub Actions
Can auto deploy a new image and task-definition. [octochat example](https://github.com/github-developer/octochat-aws)