import * as restify from "restify";
import { productsRouter } from "./products.routes";
import { categoriesRouter } from "./categories.routes";

export function routes(router: restify.Server) {
  productsRouter(router);
  categoriesRouter(router);
}
