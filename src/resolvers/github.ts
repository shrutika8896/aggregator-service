import { GithubService } from '../services/github';
import { LoggerService as logger } from '../services/logger';

export const githubResolvers = {
  Query: {
    githubIssues: async (
      _: any,
      { repo, owner }: { repo: string; owner: string }
    ) => {
      try {
        return await GithubService.fetchGitHubIssues(owner, repo);
      } catch (error: any) {
        logger.error(error);
        throw new Error(
          'Failed to fetch GitHub issues. Please try again later.'
        );
      }
    },

    githubRepositories: async () => {
      try {
        return await GithubService.fetchGitHubRepositories();
      } catch (error: any) {
        logger.error(error);
        throw new Error(
          'Failed to fetch GitHub repositories. Please try again later.'
        );
      }
    },

    githubUserProfile: async () => {
      try {
        return await GithubService.fetchGitHubUserProfile();
      } catch (error: any) {
        logger.error(error);
        throw new Error(
          'Failed to fetch GitHub user profile. Please try again later.'
        );
      }
    },

    githubOrganizationMembers: async (
      _: any,
      { organization }: { organization: string }
    ) => {
      try {
        return await GithubService.fetchGitHubOrganizationMembers(organization);
      } catch (error: any) {
        logger.error(error);
        throw new Error(
          'Failed to fetch GitHub organization members. Please try again later.'
        );
      }
    }
  }
};
