Teachers Admin Web Service
========

## Background

Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.
This project is to provide a web server (NodeJs and MySql) with public exposed API to fulfill the requirement.

## Quick start

##### Public service
You can try either way to run the web service.

###### Postman collections
    Use ./tests/integration/ .........j...
    
###### Try with your own tools
    http://ec2-13-250-35-152.ap-southeast-1.compute.amazonaws.com:3000/

The interface spec strictly follows the requirement, i.e.:

    POST http://ec2-13-250-35-152.ap-southeast-1.compute.amazonaws.com:3000/api/register
    GET http://ec2-13-250-35-152.ap-southeast-1.compute.amazonaws.com:3000/api/commonstudents
    POST http://ec2-13-250-35-152.ap-southeast-1.compute.amazonaws.com:3000/api/suspend
    POST http://ec2-13-250-35-152.ap-southeast-1.compute.amazonaws.com:3000/api/retrievefornotifications

##### Source code
    https://github.com/haisheng-zhang/teacher-admin

## How to run

##### Preparation
###### NodeJs
    Install NodeJs in your way
    Install dependency modules:
        sudo npm install express -g
        sudo npm install mysql -g
        sudo npm install jest -q

###### DB
    [optional] Install Docker
    Install MySql DB in Docker or in physical machine on your choise
    Create Database and tables by running:
        ./DB/sql-scripts/1. tables.sql
    Insert test data by running:
        ./DB/sql-scripts/2. data.sql

##### Run application locally
    Get code from GitHub:
        git clone https://github.com/haisheng-zhang/teacher-admin
    Go to the teacher-admin/ folder and run:
        npm start

##### Troublesooting
If there is any error, please check config file for Database connection:
    ./config.js
The default config is:

	host:     'localhost', 	    // database host
	user:     'root',           // your database username
	password: 'pass123',        // your database password
	port:     3306,             // default MySQL port
	db:       'teacherdb'       // your database name

please change it accordingly.

##### Run unit test
    npm test

##### Run integration test (with Postman)
    npm integration or script or postman?

## Design

###### Overview
This is a typical web service, where is no much surprice in design.
The logic structure in the project is designed this way:

***routes*** serves as both route and controller (receive request, dispatch, compose response and send back to client)
***service*** serves as a middle layer to handle the bisiness logic, flow, input check and data massage, etc.
***model*** connects to Database with MySql dialect support

###### NodeJs Modules

- express: as web server framework
- mysql: Database connection and operation
- jest: run unit test


##### Deployment architecture 
***Application server***: hosting NodeJs and applicatoin
***Database server***: hosting MySql server and a Database named teacherdb

### Interface
RESTful API is designed.

## Next step (Tasks that I'd have done but not done)

##### CI/CD
Any project should have a proper designed CI/CD pipeline, which includes (but not limited):

    version control server (GitHub), -> 
    static and dynamic code check (SonarQube) ->
    security check (?)
    build, package and unit test (Jenkins) ->
    deploy to container (Docker) ->
    test automation (selenium or any other tools or self developed tools) ->
    automate bug report (Jira)

##### Containerize application server
The application is deployed to AWS VM for now, a container environment is a better choise to host it.

##### Typescript
I was told to start from Typescript (because it is type safe) instead of Javascript especially in a big complex project.

## Reference

I started the project by referring this project:
    
    https://github.com/chapagain/nodejs-mysql-crud
