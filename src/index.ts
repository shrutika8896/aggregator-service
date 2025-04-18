import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './resolvers';
import 'newrelic';
import 'reflect-metadata';
import { AppDataSource } from './config/database';
import dotenv from 'dotenv';
import { LoggerService as logger } from './services/logger';

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (error: import('graphql').GraphQLError) => {
    // Log the error to New Relic
    logger.error(error);

    /* Format the error for the response
     todo: Create separate error handling middleware
     to handle different types of errors (e.g., validation, authentication)
     and return appropriate messages to the client
     For now, we will just return the error message and locations
     along with the error code and exception details */
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
