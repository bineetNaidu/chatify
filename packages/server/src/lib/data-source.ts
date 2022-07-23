import { User } from '../entities/User';
import { DataSource } from 'typeorm';
import { Channel } from '../entities/Channel';
import { Message } from '../entities/Message';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Channel, Message],
  subscribers: [],
  migrations: [],
});
