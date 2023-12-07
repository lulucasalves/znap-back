"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const controllers_1 = require("../controllers");
function ordersRouter(router) {
    router.get("/order/:id", controllers_1.getOrderController);
    router.post("/order", controllers_1.postOrderController);
    router.put("/order/:id", controllers_1.putOrderController);
    router.del("/order/:id", controllers_1.deleteOrderController);
}
exports.ordersRouter = ordersRouter;
