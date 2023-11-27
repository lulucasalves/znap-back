"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsController = void 0;
const models_1 = require("../models");
const typeorm_1 = require("typeorm");
function getProductsController(req, res, next) {
    const { limit, page, order, categories } = req.query;
    const productRepository = (0, typeorm_1.getRepository)(models_1.Products);
    const products = productRepository.find();
    res.json(products);
}
exports.getProductsController = getProductsController;
