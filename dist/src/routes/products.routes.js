"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const controllers_1 = require("../controllers");
function productsRouter(router) {
    router.get("/products", controllers_1.getProductsController);
}
exports.productsRouter = productsRouter;
