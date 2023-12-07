"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const products_routes_1 = require("./products.routes");
const categories_routes_1 = require("./categories.routes");
const clients_routes_1 = require("./clients.routes");
const master_orders_routes_1 = require("./master-orders.routes");
const orders_routes_1 = require("./orders.routes");
function routes(router) {
    (0, products_routes_1.productsRouter)(router);
    (0, categories_routes_1.categoriesRouter)(router);
    (0, clients_routes_1.clientsRouter)(router);
    (0, orders_routes_1.ordersRouter)(router);
    (0, master_orders_routes_1.masterOrdersRouter)(router);
}
exports.routes = routes;
