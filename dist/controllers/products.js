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
const models_1 = require("../models");
const typeorm_1 = require("typeorm");
function getProductsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { limit, page, order, sort } = req.query;
        const limitInt = parseInt(limit);
        const currentInt = parseInt(page);
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const products = yield productsRepository.findAndCount({
            skip: (currentInt - 1) * limitInt,
            take: limitInt,
            order: { [order !== null && order !== void 0 ? order : "created_at"]: sort !== null && sort !== void 0 ? sort : "DESC" },
            relations: ["category_id"],
        });
        res.json({
            data: products[0],
            count: products[1],
            page: currentInt,
            limit: limitInt,
            maxPages: Math.ceil(products[1] / limitInt),
        });
    });
}
exports.getProductsController = getProductsController;
function postProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const createProduct = productsRepository.create(body);
        const createdProduct = yield productsRepository.save(createProduct);
        res.json(createdProduct);
    });
}
exports.postProductController = postProductController;
function getProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const product = yield productsRepository.findOne({
            where: { id },
            relations: ["category_id"],
        });
        res.json(product);
    });
}
exports.getProductController = getProductController;
function putProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const { id } = req.params;
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const product = productsRepository.update({
            id,
        }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
        res.json(product);
    });
}
exports.putProductController = putProductController;
function deleteProductController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const product = productsRepository.delete({
            id,
        });
        res.json(product);
    });
}
exports.deleteProductController = deleteProductController;
