import { gql } from 'apollo-server';

export const githubTypeDefs = gql`
  type Repository {
    id: ID
    name: String
    url: String
  }

  type GitHubUserProfile {
    id: ID!
    name: String
    login: String
    avatarUrl: String
    url: String
    bio: String
    company: String
    location: String
    email: String
    createdAt: String
  }

  type GitHubOrganizationMember {
    id: ID
    login: String
    name: String
    avatarUrl: String
    email: String
  }

  type Query {
    githubIssues(repo: String!, owner: String!, userId: String): [Issue!]!
    githubRepositories(userId: String): [Repository!]!
    githubUserProfile(userId: String): GitHubUserProfile!
    githubOrganizationMembers(
      organization: String!
      userId: String
    ): [GitHubOrganizationMember!]!
  }

  type Issue {
    id: ID!
    title: String
    body: String
    url: String
    createdAt: String
    updatedAt: String
  }
`;
