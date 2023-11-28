import * as restify from "restify";

import {
  getMasterOrderController,
  getOrdersController,
  postOrdersController,
  postOrdersNewController,
} from "../controllers";

export function ordersRouter(router: restify.Server) {
  router.get("/orders", getOrdersController);
  router.post("/order/master", postOrdersNewController);
  router.get("/order/master/:id", getMasterOrderController);
  router.post("/order", postOrdersController);
}
