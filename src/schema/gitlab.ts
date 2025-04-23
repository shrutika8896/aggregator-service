import { gql } from 'apollo-server';

export const gitlabTypeDefs = gql`
  type Project {
    id: ID
    name: String
    url: String
  }

  type Query {
    gitlabIssues(projectId: String!, userId: String): [Issue!]!
    gitlabProjects(userId: String): [Project!]!
    gitlabProfile(userId: String): Profile!
  }

  type Issue {
    id: ID!
    title: String
    body: String
    url: String
    createdAt: String
    updatedAt: String
  }

  type Profile {
    id: String!
    name: String
    webUrl: String
    username: String
    avatarUrl: String
    email: String
  }
`;
