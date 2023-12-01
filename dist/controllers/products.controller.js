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
exports.deleteProductController = exports.putProductController = exports.getProductController = exports.postProductController = exports.getProductsController = void 0;
const services_1 = require("../services");
function getProductsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, page, order, sort, categories } = req.query;
            const data = yield (0, services_1.getProductsService)({
                limit,
                page,
                order,
                sort,
                categories,
            });
            res.json(data);
        }
        catch (err) {
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao procurar produtos" });
                    break;
            }
        }
    });
}
exports.getProductsController = getProductsController;
function postProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, services_1.postProductService)({ body: req.body });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao criar novo produto" });
                    break;
            }
        }
    });
}
exports.postProductController = postProductController;
function getProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.getProductService)({ id });
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
                    res.json({ error: true, message: "Erro ao procurar o produto" });
                    break;
            }
        }
    });
}
exports.getProductController = getProductController;
function putProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.putProductService)({ id, body: req.body });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao editar o produto" });
                    break;
            }
        }
    });
}
exports.putProductController = putProductController;
function deleteProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.deleteProductService)({ id });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                default:
                    res.json({ error: true, message: "Erro ao remover o produto" });
                    break;
            }
        }
    });
}
exports.deleteProductController = deleteProductController;
