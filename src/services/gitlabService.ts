import axios from 'axios';
import { gql } from 'apollo-server-express';

const GITLAB_API_URL = 'https://gitlab.com/api/v4';
const GITLAB_TOKEN = process.env.GITLAB_TOKEN;

export class GitlabService {
    static async getProjects() {
        const query = gql`
            query {
                projects {
                    id
                    name
                    web_url
                }
            }
        `;

        const response = await axios.get(`${GITLAB_API_URL}/projects`, {
            headers: {
                'Authorization': `Bearer ${GITLAB_TOKEN}`
            }
        });

        return response.data;
    }

    static async getIssues(projectId: string) {
        const response = await axios.get(`${GITLAB_API_URL}/projects/${projectId}/issues`, {
            headers: {
                'Authorization': `Bearer ${GITLAB_TOKEN}`
            }
        });

        return response.data;
    }

    // Additional static methods can be added here for other GitLab API interactions.
}