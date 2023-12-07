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
exports.putProductCategoryService = exports.deleteProductCategoryService = exports.getProductCategoryService = exports.postProductCategoryService = exports.getProductCategoriesService = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
function getProductCategoriesService({ limit, page, order, sort, filter, active, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const limitInt = parseInt(limit);
        const currentInt = parseInt(page);
        const activeQuery = active === "true";
        const limitQuery = limit ? limitInt : 15;
        const pageQuery = limit ? currentInt : 1;
        const categoriesRepository = (0, typeorm_1.getRepository)(models_1.ProductCategories);
        let where = {};
        if (!activeQuery) {
            where = Object.assign(Object.assign({}, where), { is_deletable: 1 });
        }
        if (filter) {
            where = Object.assign(Object.assign({}, where), { name: (0, typeorm_1.ILike)(`%${filter}%`) });
        }
        const categories = yield categoriesRepository.findAndCount({
            skip: (pageQuery - 1) * limitQuery,
            take: limitQuery,
            order: { [order !== null && order !== void 0 ? order : "created_at"]: sort !== null && sort !== void 0 ? sort : "DESC" },
            where,
        });
        return {
            data: categories[0],
            count: categories[1],
            page: pageQuery,
            limit: limitQuery,
            maxPages: Math.ceil(categories[1] / limitQuery),
        };
    });
}
exports.getProductCategoriesService = getProductCategoriesService;
function postProductCategoryService({ body, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoriesRepository = (0, typeorm_1.getRepository)(models_1.ProductCategories);
        const createCategory = categoriesRepository.create(body);
        const createdCategory = yield categoriesRepository.save(createCategory);
        return createdCategory;
    });
}
exports.postProductCategoryService = postProductCategoryService;
function getProductCategoryService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoriesRepository = (0, typeorm_1.getRepository)(models_1.ProductCategories);
        const category = yield categoriesRepository.findOne({
            where: { id },
        });
        if (!category)
            throw new Error("Categoria não encontrada");
        return category;
    });
}
exports.getProductCategoryService = getProductCategoryService;
function deleteProductCategoryService({ id, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoriesRepository = (0, typeorm_1.getRepository)(models_1.ProductCategories);
        const productsRepository = (0, typeorm_1.getRepository)(models_1.Products);
        const categoryNoCategory = yield categoriesRepository.findOne({
            where: { name: "Sem categoria" },
        });
        if (!categoryNoCategory)
            throw new Error("Não foi possível trocar a categoria dos produtos");
        yield productsRepository.update({
            category_id: id,
        }, { category_id: categoryNoCategory.id });
        const category = yield categoriesRepository.delete({
            id,
        });
        return category;
    });
}
exports.deleteProductCategoryService = deleteProductCategoryService;
function putProductCategoryService({ id, body, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoriesRepository = (0, typeorm_1.getRepository)(models_1.ProductCategories);
        const createdCategory = yield categoriesRepository.update({
            id,
        }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
        return createdCategory;
    });
}
exports.putProductCategoryService = putProductCategoryService;
