import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
    password: String
    createdAt: String
  }

  type Credential {
    id: ID
    userId: String
    service: String
    userName: String
    accessToken: String
    createdAt: String
  }

  type Token {
    token: String!
  }

  type Query {
    getUser(id: ID!): User
    getCredentials(userId: ID!, service: String!): [Credential!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User!
    createCredential(
      userId: ID!
      service: String!
      userName: String!
      accessToken: String!
    ): Credential!
    generateToken(email: String!, password: String!): Token!
  }
`;
