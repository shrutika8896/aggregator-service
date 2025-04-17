import { DataSource } from 'typeorm';
import { User } from '../entities/user';
import { Credential } from '../entities/credential';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host:
    process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER ,
  password: process.env.POSTGRES_PASSWORD ,
  database: process.env.POSTGRES_DB ,
  entities: [User, Credential],
  synchronize: true, // Set to false in production
  logging: false
});
