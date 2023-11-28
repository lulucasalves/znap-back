import * as restify from "restify";

import {
  getProductCategoriesController,
  postProductCategoryController,
  putProductCategoryController,
  getProductCategoryController,
  deleteProductCategoryController,
} from "../controllers";

export function categoriesRouter(router: restify.Server) {
  router.get("/categories", getProductCategoriesController);
  router.get("/category/:id", getProductCategoryController);
  router.post("/category", postProductCategoryController);
  router.put("/category/:id", putProductCategoryController);
  router.del("/category/:id", deleteProductCategoryController);
}
