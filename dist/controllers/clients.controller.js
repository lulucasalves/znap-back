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
exports.getClientController = exports.deleteClientController = exports.putClientController = exports.postClientController = exports.getClientsController = void 0;
const services_1 = require("../services");
function getClientsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, page, order, sort } = req.query;
            const data = yield (0, services_1.getClientsService)({ limit, sort, order, page });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao procurar clientes" });
                    break;
            }
        }
    });
}
exports.getClientsController = getClientsController;
function postClientController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, services_1.postClientService)({ body: req.body });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao criar cliente" });
                    break;
            }
        }
    });
}
exports.postClientController = postClientController;
function putClientController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.putClientService)({ body: req.body, id });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao editar cliente" });
                    break;
            }
        }
    });
}
exports.putClientController = putClientController;
function deleteClientController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.deleteClientService)({ id });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            console.log(err);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao deletar cliente" });
                    break;
            }
        }
    });
}
exports.deleteClientController = deleteClientController;
function getClientController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.getClientService)({ id });
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
                    res.json({ error: true, message: "Erro ao procurar os clientes" });
                    break;
            }
        }
    });
}
exports.getClientController = getClientController;
