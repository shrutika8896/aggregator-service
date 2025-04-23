import { GithubService } from '../services/github';
import { LoggerService as logger } from '../services/logger';
import { AppError } from '../utils/AppError';

export const githubResolvers = {
  Query: {
    githubIssues: async (
      _: any,
      { repo, owner, userId }: { repo: string; owner: string; userId: string }
    ) => {
      try {
        return await GithubService.fetchGitHubIssues(owner, repo, userId);
      } catch (error: any) {
        logger.error(error);
        throw new AppError(
          'Failed to fetch GitHub issues. Please try again later.'
        );
      }
    },

    githubRepositories: async (_: any, { userId }: { userId: string }) => {
      try {
        return await GithubService.fetchGitHubRepositories(userId);
      } catch (error: any) {
        logger.error(error);
        throw new AppError(
          'Failed to fetch GitHub repositories. Please try again later.'
        );
      }
    },

    githubUserProfile: async (_: any, { userId }: { userId: string }) => {
      try {
        return await GithubService.fetchGitHubUserProfile(userId);
      } catch (error: any) {
        logger.error(error);
        throw new AppError(
          'Failed to fetch GitHub user profile. Please try again later.'
        );
      }
    },

    githubOrganizationMembers: async (
      _: any,
      { organization, userId }: { organization: string; userId: string }
    ) => {
      try {
        return await GithubService.fetchGitHubOrganizationMembers(
          organization,
          userId
        );
      } catch (error: any) {
        logger.error(error);
        throw new AppError(
          'Failed to fetch GitHub organization members. Please try again later.'
        );
      }
    }
  }
};
