import { GitlabService } from '../services/gitlab';

export const gitlabResolvers = {
  Query: {
    gitlabIssues: async () => {
      return await GitlabService.getIssues('12345'); // Replace with actual project ID
    },
    gitlabProjects: async () => {
      return await GitlabService.getProjects();
    },
    gitlabProfile: async () => {
      return await GitlabService.getGitlabProfile();
    }
  }
};
