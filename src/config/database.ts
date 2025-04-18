import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Credential } from '../entities/credential';
import dotenv from 'dotenv';
dotenv.config();

/* This is the database configuration file for the application.
   It uses TypeORM to connect to a PostgreSQL database.
   The database connection details are read from environment variables.
   If the environment variables are not set, it falls back to default values. For development
   purposes hardcoded values are used. Need to be changed in production.
*/
export const AppDataSource = new DataSource({
  type: 'postgres',
  host:
    process.env.POSTGRES_HOST ||
    'aggregator.c94qsk4sgwxf.us-east-2.rds.amazonaws.com',
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'rGbl7HiPNugwDZtiRQAE',
  database: process.env.POSTGRES_DB || 'aggregator-service',
  entities: [User, Credential],
  synchronize: true, // Set to false in production
  logging: false,
  ssl: {
    rejectUnauthorized: false
  }
});
