"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRouter = void 0;
const controllers_1 = require("../controllers");
function productsRouter(router) {
    router.get("/products", controllers_1.getProductsController);
    router.get("/product/:id", controllers_1.getProductController);
    router.post("/product", controllers_1.postProductController);
    router.put("/product/:id", controllers_1.putProductController);
    router.del("/product/:id", controllers_1.deleteProductController);
}
exports.productsRouter = productsRouter;
