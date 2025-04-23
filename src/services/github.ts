import axios from 'axios';
import { LoggerService as logger } from './logger';
import dotenv from 'dotenv';
import { UserService } from './user';
import { Services, GITHUB_API_URL } from '../utils/constant';
dotenv.config();

/*
todo: get userId from jwt token sent in the request headers and then get the credentials for that user. 
For now we are using it from request body. 
*/
export class GithubService {
  static userService = new UserService();
  static async fetchGitHubIssues(owner: string, repo: string, userId: string) {
    logger.info(
      `Fetching GitHub issues for ${owner}/${repo} by user ${userId}`
    );
    const credentials = await this.userService.getCredentialsForService(
      userId,
      Services.GITHUB
    );
    if (!credentials) {
      logger.warn(`No credentials found for user ${userId}`);
      throw new Error('No credentials found');
    }
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
          Authorization: `Bearer ${credentials.accessToken}`
        }
      }
    );

    return response.data.data.repository.issues.nodes;
  }

  static async fetchGitHubRepositories(userId: string) {
    const credentials = await this.userService.getCredentialsForService(
      userId,
      Services.GITHUB
    );
    if (!credentials) {
      logger.warn(`No credentials found for user ${userId}`);
      throw new Error('No credentials found');
    }
    logger.info(`Fetching GitHub repositories for ${credentials.userName}`);
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

    const variables = { username: credentials.userName };

    const response = await axios.post(
      GITHUB_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          Authorization: `Bearer ${credentials.accessToken}`
        }
      }
    );

    return response.data.data.user.repositories.nodes;
  }

  static async fetchGitHubUserProfile(userId: string) {
    const credentials = await this.userService.getCredentialsForService(
      userId,
      Services.GITHUB
    );
    if (!credentials) {
      logger.warn(`No credentials found for user ${userId}`);
      throw new Error('No credentials found');
    }
    logger.info(
      `Fetching GitHub user profile for ${credentials.userName} by user ${userId}`
    );
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

    const variables = { username: credentials.userName };
    const response = await axios.post(
      GITHUB_API_URL,
      {
        query,
        variables
      },
      {
        headers: {
          Authorization: `Bearer ${credentials.accessToken}`
        }
      }
    );

    return response.data.data.user;
  }

  static async fetchGitHubOrganizationMembers(org: string, userId: string) {
    logger.info(
      `Fetching GitHub organization members for ${org} by user ${userId}`
    );
    const credentials = await this.userService.getCredentialsForService(
      userId,
      Services.GITHUB
    );
    if (!credentials) {
      logger.warn(`No credentials found for user ${userId}`);
      throw new Error('No credentials found');
    }
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
          Authorization: `Bearer ${credentials.accessToken}`
        }
      }
    );

    return response.data.data.organization.membersWithRole.nodes;
  }
}
