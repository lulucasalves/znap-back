import { ConnectionOptions } from "typeorm";
import "dotenv/config";

const isDev = process.env.DEV === "true";

export const typeorm: ConnectionOptions = {
  type: "mysql",
  host: "sql10.freesqldatabase.com",
  port: 3306,
  username: "sql10664983",
  password: "pAHkZSWxxm",
  database: "sql10664983",
  synchronize: isDev ? true : false,
  logging: false,
  entities: isDev ? [`src/models/*.ts`] : [`dist/models/*.js`],
};
