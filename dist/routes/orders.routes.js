"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRouter = void 0;
const controllers_1 = require("../controllers");
function ordersRouter(router) {
    router.get("/orders", controllers_1.getOrdersController);
    router.post("/order/master", controllers_1.postOrdersNewController);
    router.get("/order/master/:id", controllers_1.getMasterOrderController);
    router.post("/order", controllers_1.postOrdersController);
}
exports.ordersRouter = ordersRouter;
