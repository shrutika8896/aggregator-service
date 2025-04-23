import axios from 'axios';
import { UserService } from './user';
import { Services, GITLAB_API_URL } from '../utils/constant';
import { LoggerService as logger } from './logger';

export class GitlabService {
  /*
  todo: Get userId from jwt token and use that to fetch service credentials from database.
  */
  static userService = new UserService();
  static async getProjects(userId: string) {
    const credentials = await this.userService.getCredentialsForService(
      userId,
      Services.GITLAB
    );
    if (!credentials) {
      logger.warn(`No credentials found for user ${userId}`);
      throw new Error('No credentials found');
    }
    const query = `
      query {
        projects {
          nodes {
            id
            name
            description
            webUrl
          }
        }
      }
    `;

    const response = await axios.post(
      GITLAB_API_URL,
      { query },
      {
        headers: {
          Authorization: `Bearer ${credentials.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the response to verify the structure
    console.log(response.data);

    // Adjust the return statement based on the actual structure of response.data
    return response.data.data?.projects?.nodes || [];
  }

  static async getIssues(projectId: string, userId: string) {
    const credentials = await this.userService.getCredentialsForService(
      userId,
      Services.GITLAB
    );
    if (!credentials) {
      logger.warn(`No credentials found for user ${userId}`);
      throw new Error('No credentials found');
    }
    const query = `
      query($projectId: ID!) {
        project(fullPath: $projectId) {
          issues {
            nodes {
              id
              title
              description
              state
              createdAt
              updatedAt
            }
          }
        }
      }
    `;

    const variables = { projectId };

    const response = await axios.post(
      GITLAB_API_URL,
      { query, variables },
      {
        headers: {
          Authorization: `Bearer ${credentials.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the response to verify the structure
    console.log(response.data);

    // Adjust the return statement based on the actual structure of response.data
    return response.data.data?.project?.issues?.nodes || [];
  }

  static async getGitlabProfile(userId: string) {
    const credentials = await this.userService.getCredentialsForService(
      userId,
      Services.GITLAB
    );
    if (!credentials) {
      logger.warn(`No credentials found for user ${userId}`);
      throw new Error('No credentials found');
    }
    const query = `
      query {
        currentUser {
          id
          username
          name
          avatarUrl
          email
        }
      }
    `;

    const response = await axios.post(
      GITLAB_API_URL,
      { query },
      {
        headers: {
          Authorization: `Bearer ${credentials.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the response to verify the structure
    console.log(response.data);

    // Adjust the return statement based on the actual structure of response.data
    return response.data.data?.currentUser || null;
  }
}
