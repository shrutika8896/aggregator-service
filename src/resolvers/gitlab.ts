import { GitlabService } from '../services/gitlab';

export const gitlabResolvers = {
  Query: {
    gitlabIssues: async (
      _: any,
      { projectId, userId }: { projectId: string; userId: string }
    ) => {
      return await GitlabService.getIssues(projectId, userId);
    },
    gitlabProjects: async (_: any, { userId }: { userId: string }) => {
      return await GitlabService.getProjects(userId);
    },
    gitlabProfile: async (_: any, { userId }: { userId: string }) => {
      return await GitlabService.getGitlabProfile(userId);
    }
  }
};
