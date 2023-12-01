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
exports.deleteMasterOrdersController = exports.putMasterOrdersController = exports.postMasterOrdersController = exports.getMasterOrderController = exports.getMasterOrdersController = void 0;
const services_1 = require("../services");
function getMasterOrdersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, page, order, sort, categories, products, dateFrom, dateTo, clients, } = req.query;
            const data = yield (0, services_1.getMasterOrdersService)({
                limit,
                page,
                order,
                sort,
                categories,
                products,
                dateFrom,
                dateTo,
                clients,
            });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            console.log(err);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao procurar os pedidos" });
                    break;
            }
        }
    });
}
exports.getMasterOrdersController = getMasterOrdersController;
function getMasterOrderController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.getMasterOrderService)({ id });
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
                    res.json({ error: true, message: "Erro ao procurar os pedidos" });
                    break;
            }
        }
    });
}
exports.getMasterOrderController = getMasterOrderController;
function postMasterOrdersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, services_1.postMasterOrdersService)({ body: req.body });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao criar pedidos" });
                    break;
            }
        }
    });
}
exports.postMasterOrdersController = postMasterOrdersController;
function putMasterOrdersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.putMasterOrdersService)({ body: req.body, id });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao editar os pedidos" });
                    break;
            }
        }
    });
}
exports.putMasterOrdersController = putMasterOrdersController;
function deleteMasterOrdersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.deleteMasterOrderService)({ id });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao deletar os pedidos" });
                    break;
            }
        }
    });
}
exports.deleteMasterOrdersController = deleteMasterOrdersController;
