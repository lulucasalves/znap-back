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
exports.putProductCategoryController = exports.deleteProductCategoryController = exports.getProductCategoryController = exports.postProductCategoryController = exports.getProductCategoriesController = void 0;
const services_1 = require("../services");
function getProductCategoriesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { limit, page, order, sort, filter, active } = req.query;
            const data = yield (0, services_1.getProductCategoriesService)({
                limit,
                page,
                order,
                sort,
                filter,
                active,
            });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                case err.message !== undefined:
                    res.json({ error: true, message: err.message });
                    break;
                default:
                    res.json({ error: true, message: "Erro ao procurar as categorias" });
                    break;
            }
        }
    });
}
exports.getProductCategoriesController = getProductCategoriesController;
function postProductCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield (0, services_1.postProductCategoryService)({ body: req.body });
            res.status(201);
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                case (err.sqlMessage && err.sqlMessage.includes("Duplicate entry")) ||
                    err.message.includes("key"):
                    res.json({ error: true, message: "Categoria duplicada" });
                    break;
                case err.message !== undefined:
                    res.json({ error: true, message: err.message });
                    break;
                default:
                    res.json({ error: true, message: "Erro ao criar nova categoria" });
                    break;
            }
        }
    });
}
exports.postProductCategoryController = postProductCategoryController;
function getProductCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.getProductCategoryService)({ id });
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
                    res.json({ error: true, message: "Erro ao procurar a categoria" });
                    break;
            }
        }
    });
}
exports.getProductCategoryController = getProductCategoryController;
function deleteProductCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.deleteProductCategoryService)({ id });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                case err.message !== undefined:
                    res.json({ error: true, message: err.message });
                    break;
                default:
                    res.json({ error: true, message: "Erro ao remover a categoria" });
                    break;
            }
        }
    });
}
exports.deleteProductCategoryController = deleteProductCategoryController;
function putProductCategoryController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = yield (0, services_1.putProductCategoryService)({ id, body: req.body });
            res.json(data);
        }
        catch (err) {
            res.status(400);
            switch (true) {
                case (err.sqlMessage && err.sqlMessage.includes("Duplicate entry")) ||
                    err.message.includes("key"):
                    res.json({ error: true, message: "Categoria duplicada" });
                    break;
                case err.message !== undefined:
                    res.json({ error: true, message: err.message });
                    break;
                default:
                    res.json({ error: true, message: "Erro ao editar a categoria" });
                    break;
            }
        }
    });
}
exports.putProductCategoryController = putProductCategoryController;
