import { GitlabService } from '../services/gitlabService';
import dotenv from 'dotenv';

dotenv.config();

export const gitlabResolvers = {
  Query: {
    gitlabIssues: async () => {
      const gitlabToken = process.env.GITLAB_TOKEN;
      if (!gitlabToken) {
        throw new Error('GitLab token is not defined in the environment variables.');
      }
      return await GitlabService.getIssues(gitlabToken);
    },
    gitlabProjects: async () => {
      return await GitlabService.getProjects();
    },
  },
};