import * as restify from "restify";
import { createConnection } from "typeorm";
import { typeorm } from "./typeorm";
import { routes } from "./routes";
const corsMiddleware = require("restify-cors-middleware2");

export const server = restify.createServer({
  name: "Znap Server",
  version: "1.0.0",
});

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["http://localhost:3000", "https://znap-front.vercel.app"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"],
  credentials: true,
});

server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

(async () => {
  const connection = await createConnection(typeorm);
  try {
    connection.runMigrations().catch((err) => err);
  } catch (err) {}
})();

routes(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server available on the port ${PORT}`);
});
