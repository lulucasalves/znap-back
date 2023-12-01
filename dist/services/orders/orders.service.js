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
exports.getOrderService = exports.deleteOrderService = exports.putOrderService = exports.postOrderService = void 0;
const models_1 = require("../../models");
const typeorm_1 = require("typeorm");
function postOrderService({ body }) {
    return __awaiter(this, void 0, void 0, function* () {
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const createOrder = ordersRepository.create(body);
        const createdOrder = yield ordersRepository.save(createOrder);
        return createdOrder;
    });
}
exports.postOrderService = postOrderService;
function putOrderService({ id, body }) {
    return __awaiter(this, void 0, void 0, function* () {
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const updateOrder = yield ordersRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
        return updateOrder;
    });
}
exports.putOrderService = putOrderService;
function deleteOrderService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const deletedOrder = yield ordersRepository.delete({ id });
        return deletedOrder;
    });
}
exports.deleteOrderService = deleteOrderService;
function getOrderService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const getOrder = yield ordersRepository.findOne({
            where: { id },
            relations: ["product_id"],
        });
        if (!getOrder)
            throw new Error("Pedido não encontrado");
        return getOrder;
    });
}
exports.getOrderService = getOrderService;
