import * as restify from "restify";

import { productsRouter } from "./products.routes";
import { categoriesRouter } from "./categories.routes";
import { clientsRouter } from "./clients.routes";
import { ordersRouter } from "./orders.routes";

export function routes(router: restify.Server) {
  productsRouter(router);
  categoriesRouter(router);
  clientsRouter(router);
  ordersRouter(router);
}
