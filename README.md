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
   git clone https://github.com/yourusername/graphql-aggregator-service.git
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
- `GITLAB_TOKEN`: Your GitLab API token.
- `DATABASE_URL`: Connection string for your PostgreSQL database.

## API Endpoints

The following GraphQL queries are available:

- `getGitHubIssues`: Fetches issues from a specified GitHub repository.
- `getGitLabIssues`: Fetches issues from a specified GitLab project.
- Additional queries and mutations can be added as needed.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.