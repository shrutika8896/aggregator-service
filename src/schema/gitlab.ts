import { gql } from 'apollo-server';

export const gitlabTypeDefs = gql`
  type Project {
    id: ID!
    name: String!
    url: String!
  }

  type Query {
    gitlabIssues: [Issue!]!
    gitlabProjects: [Project!]!
  }

  type Issue {
    id: ID!
    title: String!
    body: String
    url: String!
    createdAt: String!
    updatedAt: String!
  }
`;
