# GraphQL Aggregator Service

This project is a GraphQL aggregator service that exposes APIs for interacting with GitHub and GitLab. It is built using Node.js and TypeScript, and utilizes Apollo Server for handling GraphQL requests.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)
- [Application Testing](#application-testing)
- [Technical Overview](#technical-overview)

## Prerequisites

- Node.js (version 18 or higher)
- npm (Node Package Manager)
- Docker (optional, for containerization)
- PostgreSQL (for credential storage)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/shrutika8896/aggregator-service.git
   cd graphql-aggregator-service
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Set up your environment variables by copying the example file:

   Update the `.env` file with your postgresql credentials and other details

## Running the Application

1. Start the application:

   ```
   npm run build
   npm run start
   ```

   This will compile the TypeScript files and start the Apollo Server.

2. Open your browser and navigate to `http://localhost:4000/graphql` to access the GraphQL Playground.

## Environment Variables

The following environment variables are required:
- `Database Credentials`:
-  POSTGRES_HOST
-  POSTGRES_PORT
-  POSTGRES_USER
-  POSTGRES_PASSWORD
-  POSTGRES_DB


## API Endpoints
GraphQL queries:

- `getUser`: Get the user details using user id
- `getCredentials`: Get service credentials for the user. This API returns all the credentials added by specific user
- `githubIssues`: Fetches issues from a specified GitHub repository.
- `githubRepositories`: Fetches issues from a specified github repository.
- `githubUserProfile`: Fetch user profile based on username
- `githubOrganizationMembers`: Fetch members in the organizations
- `gitlabIssues`: Fetches list of issues in project
- `gitlabProjects`: Fetches gitlab projects
- `gitlabProfile`: Fetches gitlab user profile

GraphQL Mutations:
- `createUser`: Create new user by passing name, email and password as a parameter
- `createCredential`: Create credentials for the user by passing userId, service, username and accessToken as parameter
- `generateToken`: Need to pass email and password for the API. This API validates the user and if valid generates the jwt token which can be used for authenticating APIs.

## Docker
Added the Dockerfile in the project and image is uploaded to docker hub. Following are the commands to update and fetch latest docker image:
`build docker image`: docker build -t shrutika8896/aggregator-service .
`push image to hub`: docker push shrutika8896/aggregator-service
`pull image`: docker pull shrutika8896/aggregator-service
`run on the local system`: docker run -it -p 4000:4000 shrutika8896/aggregator-service

Docker image public URL: https://hub.docker.com/r/shrutika8896/aggregator-service

## Application Testing
1. Use the `createUser` mutation to create a new user. This will return the details of the newly created user, including the `userId`.
2. Retrieve the `userId` and create credentials for a service using the `createCredential` mutation. Currently, only `github` and `gitlab` are supported. Ensure the service name matches exactly as specified.
3. Verify the created credentials using the `getCredentials` query.
4. Once credentials are set up for a service, you can utilize all the queries related to that service.
5. The application supports multiple users and credentials. By querying with a specific `userId`, the corresponding user details will be returned.
6. A sample user with `userId: 1` is pre-configured in the database, along with credentials for GitHub and GitLab. You can use this `userId` to access all services.
7. For API testing, use the Apollo Studio Sandbox Explorer at https://studio.apollographql.com/sandbox/explorer.
8. The `generateToken` mutation is available to validate a user by accepting their username and password. It returns a JWT token upon successful validation. While API authentication is not yet implemented, the future plan is to validate the JWT token in the request header, extract the `userId` from it, and fetch the corresponding third-party service credentials. Currently, the `userId` is sent in the request body.
9. If you prefer not to set up the code locally, you can use the Docker image and run it on port 4000. Refer to the `Docker` section for the command.
10. For convenience, the `.env` file is included in the repository, so you don't need to create a new database instance.

## Technical Overview
1. The application is built using Apollo Server.
2. Code formatting is handled by `prettier`, which can be executed using the `npm run format` command. This command is also included in the build process.
3. Linting is configured with `eslint` and can be run using `npm run lint` or `npm run lint:fix`.
4. Database connections and schema definitions are managed using `typeorm`.
5. Logging and error handling are implemented. Logging is configured with `newrelic`, and local setup logs can be viewed at https://onenr.io/0VwgEaoW0jJ.
6. The application uses an `AWS RDS PostgreSQL` instance with a VPC and security group configured. For now, inbound rules allow connections from any IP, and SSL encryption is disabled.
7. Passwords are encrypted using `bcrypt`.
8. API authentication is managed with `jsonwebtoken`.
9. A Docker image is available on Docker Hub for easy deployment.

