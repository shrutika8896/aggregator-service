import { gql } from 'apollo-server';
import { githubTypeDefs } from './github';
import { gitlabTypeDefs } from './gitlab';

export const typeDefs = gql`
  ${githubTypeDefs}
  ${gitlabTypeDefs}
`;