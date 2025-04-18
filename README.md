# GraphQL Aggregator Service

This project is a GraphQL aggregator service that exposes APIs for interacting with GitHub and GitLab. It is built using Node.js and TypeScript, and utilizes Apollo Server for handling GraphQL requests.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

- Node.js (version 14 or higher)
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

   ```
   cp .env.example .env
   ```

   Update the `.env` file with your GitHub and GitLab API credentials.

## Running the Application

1. Start the application:

   ```
   npm run start
   ```

   This will compile the TypeScript files and start the Apollo Server.

2. Open your browser and navigate to `http://localhost:4000/graphql` to access the GraphQL Playground.

## Environment Variables

The following environment variables are required:

- `GITHUB_TOKEN`: Your GitHub API token.
- `GITHUB_USERNAME`: Your GitHub username,
- `GITLAB_TOKEN`: Your GitLab API token.
- `Database Credentials`:
-  POSTGRES_HOST
-  POSTGRES_PORT
-  POSTGRES_USER
-  POSTGRES_PASSWORD
-  POSTGRES_DB


## API Endpoints

The following GraphQL queries are available:

- `githubIssues`: Fetches issues from a specified GitHub repository.
- `githubRepositories`: Fetches issues from a specified github repository.
- `githubUserProfile`: Fetch user profile based on username
- `githubOrganizationMembers`: Fetch members in the organizations
- Additional queries and mutations can be added as needed.

## Docker
`build docker image`: docker build -t shrutika8896/aggregator-service .
`push image to hub`: docker push shrutika8896/aggregator-service
`pull image`: docker pull shrutika8896/aggregator-service
`run on the local system`: docker run -it -p 4000:4000 shrutika8896/aggregator-service