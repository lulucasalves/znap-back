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
exports.deleteProductService = exports.putProductService = exports.getProductService = exports.postProductService = exports.getProductsService = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
function getProductsService({ limit, order, page, sort, categories, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const limitInt = parseInt(limit);
        const currentInt = parseInt(page);
        const limitQuery = limit ? limitInt : 15;
        const pageQuery = limit ? currentInt : 1;
        const categoriesQuery = categories ? categories.split(",") : [];
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const products = yield productsRepository.findAndCount({
            skip: (pageQuery - 1) * limitQuery,
            take: limitQuery,
            order: { [order !== null && order !== void 0 ? order : "created_at"]: sort !== null && sort !== void 0 ? sort : "DESC" },
            relations: ["category_id"],
            where: categoriesQuery.length ? { category_id: (0, typeorm_1.In)(categoriesQuery) } : {},
        });
        return {
            data: products[0],
            count: products[1],
            page: pageQuery,
            limit: limitQuery,
            maxPages: Math.ceil(products[1] / limitQuery),
        };
    });
}
exports.getProductsService = getProductsService;
function postProductService({ body }) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const createProduct = productsRepository.create(body);
        const createdProduct = yield productsRepository.save(createProduct);
        return createdProduct;
    });
}
exports.postProductService = postProductService;
function getProductService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const product = yield productsRepository.findOne({
            where: { id },
            relations: ["category_id"],
        });
        if (!product)
            throw new Error("Produto não encontrado");
        return product;
    });
}
exports.getProductService = getProductService;
function putProductService({ id, body }) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const product = yield productsRepository.update({
            id,
        }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
        return product;
    });
}
exports.putProductService = putProductService;
function deleteProductService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const orders = yield ordersRepository.delete({
            product_id: id,
        });
        const product = yield productsRepository.delete({
            id,
        });
        return { product, orders };
    });
}
exports.deleteProductService = deleteProductService;
