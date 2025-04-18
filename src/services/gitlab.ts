import axios from 'axios';

const GITLAB_API_URL = 'https://gitlab.com/api/graphql';
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

export class GitlabService {
  static async getProjects() {
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
          Authorization: `Bearer ${GITLAB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the response to verify the structure
    console.log(response.data);

    // Adjust the return statement based on the actual structure of response.data
    return response.data.data?.projects?.nodes || [];
  }

  static async getIssues(projectId: string) {
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
          Authorization: `Bearer ${GITLAB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the response to verify the structure
    console.log(response.data);

    // Adjust the return statement based on the actual structure of response.data
    return response.data.data?.project?.issues?.nodes || [];
  }

  static async getGitlabProfile() {
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
          Authorization: `Bearer ${GITLAB_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Log the response to verify the structure
    console.log(response.data);

    // Adjust the return statement based on the actual structure of response.data
    return response.data.data?.currentUser || null;
  }

  // Additional static methods can be added here for other GitLab API interactions.
}
