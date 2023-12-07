"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientsRouter = void 0;
const controllers_1 = require("../controllers");
function clientsRouter(router) {
    router.get("/clients", controllers_1.getClientsController);
    router.get("/client/:id", controllers_1.getClientController);
    router.post("/client", controllers_1.postClientController);
    router.put("/client/:id", controllers_1.putClientController);
    router.del("/client/:id", controllers_1.deleteClientController);
}
exports.clientsRouter = clientsRouter;
