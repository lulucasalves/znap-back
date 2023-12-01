"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.masterOrdersRouter = void 0;
const controllers_1 = require("../controllers");
function masterOrdersRouter(router) {
    router.get("/master-orders", controllers_1.getMasterOrdersController);
    router.get("/master-order/:id", controllers_1.getMasterOrderController);
    router.post("/master-order", controllers_1.postMasterOrdersController);
    router.put("/master-order/:id", controllers_1.putMasterOrdersController);
    router.del("/master-order/:id", controllers_1.deleteMasterOrdersController);
}
exports.masterOrdersRouter = masterOrdersRouter;
