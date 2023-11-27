import { getProductsController } from "../controllers";

import * as restify from "restify";

export function productsRouter(router: restify.Server) {
  router.get("/products", getProductsController);
}
