import * as restify from "restify";

import {
  deleteProductController,
  getProductController,
  getProductsController,
  postProductController,
  putProductController,
} from "../controllers";

export function productsRouter(router: restify.Server) {
  router.get("/products", getProductsController);
  router.get("/product/:id", getProductController);
  router.post("/product", postProductController);
  router.put("/product/:id", putProductController);
  router.del("/product/:id", deleteProductController);
}
