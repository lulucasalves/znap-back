import * as restify from "restify";

import {
  deleteClientController,
  getClientController,
  getClientsController,
  postClientController,
  putClientController,
} from "../controllers";

export function clientsRouter(router: restify.Server) {
  router.get("/clients", getClientsController);
  router.get("/client/:id", getClientController);
  router.post("/client", postClientController);
  router.put("/client/:id", putClientController);
  router.del("/client/:id", deleteClientController);
}
