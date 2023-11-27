import * as restify from "restify";
import { routes } from "./routes";
import { createConnection } from "typeorm";

export const server = restify.createServer({
  name: "Znap Server",
  version: "1.0.0",
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
createConnection();

routes(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server available on the port ${PORT}`);
});
