import {
  getProductCategoriesController,
  postProductCategoriesController,
  putProductCategoriesController,
} from "../controllers";

import * as restify from "restify";

export function categoriesRouter(router: restify.Server) {
  router.get("/categories", getProductCategoriesController);
  router.post("/category", postProductCategoriesController);
  router.put("/category/:id", putProductCategoriesController);
}
