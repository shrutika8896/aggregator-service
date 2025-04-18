import { GraphQLError } from 'graphql';
import { LoggerService as logger } from '../services/logger';
import { HttpStatusCodes } from '../utils/constant';

  /* Format the error for the response
     todo: Create separate error handling middleware
     to handle different types of errors (e.g., validation, authentication)
     and return appropriate messages to the client
     For now, we will just return the error message and locations
     along with the error code and exception details */
     
export const errorHandler = (error: GraphQLError) => {
  logger.error(error);
  console.log('Error:', error);

  return {
    message: error.message,
    locations: error.locations,
    path: error.path,
    extensions: {
      code:
        error.extensions?.exception.statusCode ||
        error.extensions?.code ||
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
      exception: error.extensions?.exception || {}
    }
  };
};
