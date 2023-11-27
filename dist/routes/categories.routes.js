"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const controllers_1 = require("../controllers");
function categoriesRouter(router) {
    router.get("/categories", controllers_1.getProductCategoriesController);
    router.post("/category", controllers_1.postProductCategoriesController);
    router.put("/category/:id", controllers_1.putProductCategoriesController);
}
exports.categoriesRouter = categoriesRouter;
