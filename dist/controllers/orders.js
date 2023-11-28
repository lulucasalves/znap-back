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
exports.postOrdersController = exports.postOrdersNewController = exports.getMasterOrderController = exports.getOrdersController = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
function getOrdersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { limit, page, order, sort } = req.query;
        const limitInt = parseInt(limit);
        const currentInt = parseInt(page);
        const masterOrdersRepository = (0, typeorm_1.getRepository)(models_1.MasterOrders);
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const master_orders = yield masterOrdersRepository.findAndCount({
            skip: (currentInt - 1) * limitInt,
            take: limitInt,
            order: { [order !== null && order !== void 0 ? order : "created_at"]: sort !== null && sort !== void 0 ? sort : "DESC" },
            relations: ["client_id"],
        });
        let masterOrdersData = master_orders[0].map((value) => (Object.assign(Object.assign({}, value), { orders: [] })));
        const orders = yield ordersRepository.findAndCount({
            where: { master_order_id: (0, typeorm_1.In)(master_orders[0].map((value) => value.id)) },
            relations: ["master_order_id", "product_id"],
        });
        for (const order of orders[0].map((value) => (Object.assign(Object.assign({}, value), { master_order_id: value.master_order_id.id })))) {
            const otherMasterOrdersData = masterOrdersData.filter((value) => value.id !== order.master_order_id);
            const masterOrderData = masterOrdersData.filter((value) => value.id === order.master_order_id)[0];
            masterOrdersData = [
                ...otherMasterOrdersData,
                Object.assign(Object.assign({}, masterOrderData), { orders: [...masterOrderData.orders, order] }),
            ];
        }
        console.log(orders);
        res.json({
            data: masterOrdersData,
            count: master_orders[1],
            page: currentInt,
            limit: limitInt,
            maxPages: Math.ceil(master_orders[1] / limitInt),
        });
    });
}
exports.getOrdersController = getOrdersController;
function getMasterOrderController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const masterOrdersRepository = (0, typeorm_1.getRepository)(models_1.MasterOrders);
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const masterOrders = (yield masterOrdersRepository.findOne({
            relations: ["client_id"],
            where: { id },
        }));
        const allOrders = yield ordersRepository.find({
            where: { master_order_id: { id: id } },
            relations: ["product_id"],
        });
        res.json(Object.assign(Object.assign({}, masterOrders), { orders: allOrders }));
    });
}
exports.getMasterOrderController = getMasterOrderController;
function postOrdersNewController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { orders, data } = req.body;
        const masterOrdersRepository = (0, typeorm_1.getRepository)(models_1.MasterOrders);
        const createMasterOrder = masterOrdersRepository.create(data);
        const createdMaster = (yield masterOrdersRepository.save(createMasterOrder));
        let result = Object.assign(Object.assign({}, createdMaster), { orders });
        for (const order of orders) {
            const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
            const createOrder = ordersRepository.create(Object.assign(Object.assign({}, order), { master_order_id: createdMaster.id }));
            const createdOrder = yield ordersRepository.save(createOrder);
            result = Object.assign(Object.assign({}, result), { orders: [createdOrder, ...result.orders] });
        }
        res.json(result);
    });
}
exports.postOrdersNewController = postOrdersNewController;
function postOrdersController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const createOrder = ordersRepository.create(body);
        const createdOrder = yield ordersRepository.save(createOrder);
        res.json(createdOrder);
    });
}
exports.postOrdersController = postOrdersController;
