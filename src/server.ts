import * as restify from "restify";
import { createConnection } from "typeorm";
import corsMiddleware from "restify-cors-middleware";
import { typeorm } from "./typeorm";
import { routes } from "./routes";

export const server = restify.createServer({
  name: "Znap Server",
  version: "1.0.0",
});

const cors = corsMiddleware({
  preflightMaxAge: 5,
  origins: ["http://localhost:3000", "https://seuoutrodominio.com"],
  allowHeaders: ["Authorization"],
  exposeHeaders: ["Authorization"],
  credentials: true,
});

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

createConnection(typeorm);
routes(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server available on the port ${PORT}`);
});
