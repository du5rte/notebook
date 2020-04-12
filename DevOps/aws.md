# AWS

Amazon Web Services

## Elastic Cloud Compute (EC2)

Basically a instance of a computer, you can login use as a remote virtual machine, install programs, compute and run applications.

### Cloud Compute

Computing services operating in remote data servers around the world

### Elastic

Means instance can increase or decrease at will

### EC2 Instance

A virtual server machine, the basic building block of EC2,

### Amazon Machine Image (AMI)

Operating system and software used on an EC2 instance. Once you select an image you'll need to select an image type (e.g. CPU, RAM, Network performance)

### Auto Scaling Group

Rules for automatically scaling EC2 images up and down

### Elastic Block Storage (EBS)

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
