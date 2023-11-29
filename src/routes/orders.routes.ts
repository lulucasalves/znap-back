import * as restify from "restify";

import {
  deleteOrderController,
  getOrderController,
  postOrderController,
  putOrderController,
} from "../controllers";

export function ordersRouter(router: restify.Server) {
  router.get("/order/:id", getOrderController);
  router.post("/order", postOrderController);
  router.put("/order/:id", putOrderController);
  router.del("/order/:id", deleteOrderController);
}
