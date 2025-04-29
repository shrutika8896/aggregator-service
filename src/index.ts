import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import resolvers from './resolvers';
import 'newrelic';
import 'reflect-metadata';
import { AppDataSource } from './config/database';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';

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
  formatError: errorHandler
});

const PORT = process.env.PORT || 4000;

server.listen(PORT).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
