import axios from 'axios';
import { LoggerService as logger } from '../services/logger';
import dotenv from 'dotenv';
dotenv.config();
const GITHUB_API_URL = 'https://api.github.com/graphql';
const token = process.env.GITHUB_TOKEN;
const username = process.env.GITHUB_USERNAME;
export class GithubService {
  static async fetchGitHubIssues(owner: string, repo: string) {
    logger.info(`Fetching GitHub issues for ${owner}/${repo}`);
    const query = `
            query($owner: String!, $repo: String!) {
                repository(owner: $owner, name: $repo) {
                    issues(first: 10) {
                        nodes {
                            id
                            title
                            body
                            url
                            createdAt
                            updatedAt
                        }
                    }
                }
            }
        `;

    const variables = { owner, repo };

    const response = await axios.post(
      GITHUB_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data.data.repository.issues.nodes;
  }

  static async fetchGitHubRepositories() {
    logger.info(`Fetching GitHub repositories for ${username}`);
    const query = `
            query($username: String!) {
                user(login: $username) {
                    repositories(first: 10) {
                        nodes {
                            name
                            url
                            createdAt
                        }
                    }
                }
            }
        `;

    const variables = { username };

    const response = await axios.post(
      GITHUB_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data.data.user.repositories.nodes;
  }

  static async fetchGitHubUserProfile() {
    logger.info(`Fetching GitHub user profile for ${username}`);
    const query = `
            query($username: String!) {
                user(login: $username) {
                    id
                    name
                    login
                    avatarUrl
                    bio
                    company
                    location
                    email
                    createdAt
                }
            }
        `;

    const variables = { username };
    const response = await axios.post(
      GITHUB_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data.data.user;
  }

  static async fetchGitHubOrganizationMembers(org: string) {
    logger.info(`Fetching GitHub organization members for ${org}`);

    const query = `
            query($org: String!) {
                organization(login: $org) {
                    membersWithRole(first: 10) {
                        nodes {
                            id
                            login
                            name
                            avatarUrl
                            email
                        }
                    }
                }
            }
        `;

    const variables = { org };

    const response = await axios.post(
      GITHUB_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data.data.organization.membersWithRole.nodes;
  }
}
