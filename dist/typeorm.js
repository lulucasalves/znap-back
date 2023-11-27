"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeorm = void 0;
require("dotenv/config");
const isDev = process.env.DEV === "true";
exports.typeorm = {
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
