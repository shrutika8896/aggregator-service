import { gql } from 'apollo-server';
import { githubTypeDefs } from './github';
import { gitlabTypeDefs } from './gitlab';
import { userTypeDefs } from './user';

export const typeDefs = gql`
  ${githubTypeDefs}
  ${gitlabTypeDefs}
  ${userTypeDefs}
`;
