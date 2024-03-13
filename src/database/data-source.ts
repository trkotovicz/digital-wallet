import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Person } from './entity/Person';
import { Account } from './entity/Account';
import { Card } from './entity/Card';
import { Transaction } from './entity/Transaction';

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [Person, Account, Card, Transaction],
  migrations: ["src/database/migrations/*.ts"],
  subscribers: [],
});
