"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRouter = void 0;
const controllers_1 = require("../controllers");
function categoriesRouter(router) {
    router.get("/categories", controllers_1.getProductCategoriesController);
    router.get("/category/:id", controllers_1.getProductCategoryController);
    router.post("/category", controllers_1.postProductCategoryController);
    router.put("/category/:id", controllers_1.putProductCategoryController);
    router.del("/category/:id", controllers_1.deleteProductCategoryController);
}
exports.categoriesRouter = categoriesRouter;
