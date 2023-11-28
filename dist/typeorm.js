"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeorm = void 0;
require("dotenv/config");
const isDev = process.env.DEV === "true";
exports.typeorm = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: isDev ? true : false,
    logging: false,
    entities: isDev ? [`src/models/*.ts`] : [`dist/models/*.js`],
};
