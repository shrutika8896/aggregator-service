import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './resolvers';
import 'newrelic';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error: import('graphql').GraphQLError) => {
    // Log the error to New Relic
    console.error(error.message, error.locations, error.path);

    // Format the error for the response
    return {
      message: error.message,
      locations: error.locations,
      path: error.path,
      extensions: {
        code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
        exception: error.extensions?.exception || {}
      }
    };
  }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
