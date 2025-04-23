import { githubResolvers } from './github';
import { gitlabResolvers } from './gitlab';
import { userResolvers } from './user';

export const resolvers = {
  Query: {
    ...githubResolvers.Query,
    ...gitlabResolvers.Query,
    ...userResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation
  }
};

export default resolvers;
