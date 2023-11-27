"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const products_routes_1 = require("./products.routes");
const categories_routes_1 = require("./categories.routes");
function routes(router) {
    (0, products_routes_1.productsRouter)(router);
    (0, categories_routes_1.categoriesRouter)(router);
}
exports.routes = routes;
