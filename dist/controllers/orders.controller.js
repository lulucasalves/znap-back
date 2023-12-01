"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderController = exports.deleteOrderController = exports.putOrderController = exports.postOrderController = void 0;
const services_1 = require("../services");
function postOrderController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, services_1.postOrderService)({ body: req.body });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao criar o pedido" });
                    break;
            }
        }
    });
}
exports.postOrderController = postOrderController;
function putOrderController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.putOrderService)({ id, body: req.body });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao editar o pedido" });
                    break;
            }
        }
    });
}
exports.putOrderController = putOrderController;
function deleteOrderController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.deleteOrderService)({ id });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao deletar o pedido" });
                    break;
            }
        }
    });
}
exports.deleteOrderController = deleteOrderController;
function getOrderController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.getOrderService)({ id });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                case err.message !== undefined:
                    res.status(404);
                    res.json({ error: true, message: err.message });
                    break;
                default:
                    res.json({ error: true, message: "Erro ao procurar o pedido" });
                    break;
            }
        }
    });
}
exports.getOrderController = getOrderController;
