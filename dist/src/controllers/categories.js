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
exports.putProductCategoriesController = exports.postProductCategoriesController = exports.getProductCategoriesController = void 0;
const models_1 = require("../models");
const typeorm_1 = require("typeorm");
function getProductCategoriesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { limit, page, order } = req.query;
        const limitInt = parseInt(limit);
        const currentInt = parseInt(page);
        const categoriesRepository = (0, typeorm_1.getRepository)(models_1.ProductCategories);
        const categories = yield categoriesRepository.findAndCount({
            skip: (currentInt - 1) * limitInt,
            take: limitInt,
        });
        res.json(categories);
    });
}
exports.getProductCategoriesController = getProductCategoriesController;
function postProductCategoriesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const categoriesRepository = (0, typeorm_1.getRepository)(models_1.ProductCategories);
        const createCategory = categoriesRepository.create(body);
        const createdCategory = yield categoriesRepository.save(createCategory);
        res.json(createdCategory);
    });
}
exports.postProductCategoriesController = postProductCategoriesController;
function putProductCategoriesController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const body = req.body;
        const categoriesRepository = (0, typeorm_1.getRepository)(models_1.ProductCategories);
        const createdCategory = yield categoriesRepository.update({
            id,
        }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
        res.json(createdCategory);
    });
}
exports.putProductCategoriesController = putProductCategoriesController;
