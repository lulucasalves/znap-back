import * as restify from "restify";

import {
  deleteMasterOrdersController,
  getMasterOrderController,
  getMasterOrdersController,
  postMasterOrdersController,
  putMasterOrdersController,
} from "../controllers";

export function masterOrdersRouter(router: restify.Server) {
  router.get("/master-orders", getMasterOrdersController);
  router.get("/master-order/:id", getMasterOrderController);
  router.post("/master-order", postMasterOrdersController);
  router.put("/master-order/:id", putMasterOrdersController);
  router.del("/master-order/:id", deleteMasterOrdersController);
}
