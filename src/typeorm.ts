import { ConnectionOptions } from "typeorm";
import "dotenv/config";

const isDev = process.env.DEV === "true";

export const typeorm: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: isDev ? true : false,
  logging: false,
  entities: isDev ? [`src/models/*.ts`] : [`dist/models/*.js`],
  migrations: isDev ? [`src/migrations/*.ts`] : [`dist/migrations/*.js`],
};
