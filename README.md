# Node Authentication Server

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

### What is it?
This is implemention of authentication with node.js and mongodb using jwt to have token.

#### `node-auth` provides the following features:

* full ES6 language.
* architecture and modular REST API.
* reuse modules.
* how to use config file with node.js.
* how to wrap callbacks in promises.
* how to working with mongodb with promises.
* using node middlware to handle request authentication
* jwt for identification.
* How to test node using Mocha and Chai

### Requirements
---

In order to compile the examples found here, your system needs to have the following prerequisites:

<dl>

<dt><strong>node.js</strong></dt>
<dd>Current version is 7.2.1 (<a href='http://nodejs.org/'>http://www.nodejs.org</a>)</dd>

<dt><strong>MongoDB</strong></dt>
<dd>MongoDB available from <a href='http://docs.mongodb.org/manual/installation/'>mongodb.com</a> or/and Node driver from <a href='https://npmjs.org/package/mongodb'>https://npmjs.org/package/mongodb</a></dd>
</dl>

### How to start?
---

### MongoDB
This the steps to quick configure mongodb server:

**WINDOWS**

1. Download MongoDB in link above, then install it.
2. Using a terminal window, change into installation directory (should be `Program Files\MongoDB\Server\3.2\bin`).
3. Run the following: `mongod.exe` for example
 `$ C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe'

* Now the process should run and you see message like:
> I NETWORK  [initandlisten] waiting for connections on port 27017

* This mean mongodb server run on port 27017 as default (you can also configure this).
* Once you break the process (by closing window) also the connection be closed.
* **if you run mongodb on another port you need to change the config file. see on Configuration section.**


In order to start the server use:

```bash
$ git clone https://github.com/wizardnet972/node-auth.git
$ cd node-auth

# install the project's dependencies
$ npm install
# fast install (via Yarn, https://yarnpkg.com)
$ yarn install  # or yarn

# start the server
# should up and running in post 8080 (see Configuration section)
$ npm start

# OR you can WATCHES your files and uses livereload by default
$ npm watch

# to run tests use:

# install mocha on the global
$ npm install mocha -g

# run the tests
$ npm test
```
# Configuration
Default application server configuration store in config.js (see Directory Structure section)

```config.js
	'secret': 'nodeauth',                           <- secret key (what ever you want)
	'database': 'mongodb://localhost:27017/authdb', <- connection string to mongodb
	'expiresToken': '86400',                        <- expires in mils
	'port': 8080                                    <- application port
```
# Running tests

```bash
$ npm test
```
## POSTMAN

* [Download Postman for Chrome](http://www.getpostman.com/)

# HTTP Requests

* see test folder and files to see examples of requests and response.

| url															        	| auth required? | Method  | Code | Output											     |
|-------------------------------------------|----------------|---------|------|----------------------------------|
| http://localhost:8080/										| No						 |  GET		 | 200  | "ready"											     |
| http://localhost:8080/api									| No						 |  GET		 | 200  | empty object								  	 |
| http://localhost:8080/api/signup 					| No						 |  POST	 | 201  | user id created									 |
| http://localhost:8080/api/login						| No						 |  POST   | 200  | user + token										 |
| http://localhost:8080/api/users						| Yes						 |  GET    | 200  | array of users									 |
| http://localhost:8080/api/users/:userId		| Yes						 |  GET    | 200  | user by given userid						 |
| http://localhost:8080/api/users/:userId		| Yes						 |  PUT    | 200  | updated user by given userid		 |
| http://localhost:8080/api/users/:userId		| Yes						 |  DELETE | 200  | delete property as true or false |
| http://localhost:8080/api/users						| Yes						 |  GET    | 200  | array of users									 |
| http://localhost:8080/api/user						| Yes						 |  GET    | 200  | object of loggedin user     		 |
| http://localhost:8080/api/user						| Yes						 |  PUT    | 200  | object of user with changes 		 |


# Directory Structure

```
.
├── README.md
├── www.js                  <- server file
├── package.json            <- dependencies of the project
├── config.js               <- environment configuration
├── utils                      
│   └── authorize.js        <- middleware for authorize jwt
│   └── crypt.js            <- handle encryption with promises
├── tests                      
│   └── api.spec.js         <- test suites for api route
│   └── user.spec.js        <- test suites for user route, the loggin user.
├── app                     <- source code of the application
│   └── db
│       └── user.js         <- mongodb user schema 
│   └── api
│       ├── index.js        <- api route controller 
│       ├── users.js        <- users route controller
│       └── user.js         <- user route controller
│   └── index.js            <- the main application
└── yarn.lock
```