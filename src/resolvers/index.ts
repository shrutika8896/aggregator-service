import { githubResolvers } from './github';
import { gitlabResolvers } from './gitlab';

export const resolvers = {
  Query: {
    ...githubResolvers.Query,
    ...gitlabResolvers.Query,
  },
};

export default resolvers;