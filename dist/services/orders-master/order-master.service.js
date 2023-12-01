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
exports.deleteMasterOrderService = exports.putMasterOrdersService = exports.postMasterOrdersService = exports.getMasterOrderService = exports.getMasterOrdersService = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../../models");
const date_fns_1 = require("date-fns");
const getMasters_1 = require("./utils/getMasters");
function getMasterOrdersService({ limit, page, order, sort, categories, products, clients, dateFrom, dateTo, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const limitInt = parseInt(limit);
        const currentInt = parseInt(page);
        const date = new Date();
        const formattedDate = (0, date_fns_1.format)(date, "yyyy-MM-dd");
        const dateFromQuery = dateFrom !== null && dateFrom !== void 0 ? dateFrom : "0001-01-01";
        const dateToQuery = dateTo !== null && dateTo !== void 0 ? dateTo : formattedDate;
        const orderQuery = order !== null && order !== void 0 ? order : "created_at";
        const sortQuery = sort !== null && sort !== void 0 ? sort : "DESC";
        const pageQuery = page ? currentInt : 1;
        const offsetQuery = limit && page ? (currentInt - 1) * limitInt : 0;
        const limitQuery = limit ? limitInt : 15;
        const categoriesQuery = categories
            ? categories
                .split(",")
                .map((value) => `'${value}'`)
                .join(",")
            : "";
        const clientsQuery = clients
            ? clients
                .split(",")
                .map((value) => `'${value}'`)
                .join(",")
            : "";
        const productsQuery = products
            ? products
                .split(",")
                .map((value) => `'${value}'`)
                .join(",")
            : "";
        const entityManager = (0, typeorm_1.getManager)();
        const where = (0, getMasters_1.getMastersWhere)({
            dateFromQuery,
            dateToQuery,
            clientsQuery,
            categoriesQuery,
            productsQuery,
        });
        let queryBuilder = yield entityManager.query(`
    SELECT
    DISTINCT(mo.id),
    mo.shipping,
    mo.date,
    mo.created_at,
    mo.updated_at,
    CONCAT('{ "id": "', c.id, '", "name": "', c.name, '" }') AS client,
    (
      SELECT COUNT(*) AS count
      FROM orders o_select
      WHERE o_select.master_order_id = mo.id
    ) AS number_orders,
    (
        SELECT CAST(SUM(o_select.quantity) AS DECIMAL) AS quantity
        FROM orders o_select
        WHERE o_select.master_order_id = mo.id
    ) AS total_quantity,
    (
        SELECT CAST(SUM(o_select.price * o_select.quantity) AS DECIMAL)
        FROM orders o_select
        WHERE o_select.master_order_id = mo.id
    ) AS total_price,
    (
        SELECT CAST(SUM(o_select.price * o_select.quantity) AS DECIMAL) / CAST(SUM(o_select.quantity) AS DECIMAL)
        FROM orders o_select
        WHERE o_select.master_order_id = mo.id
    ) AS average_price
    FROM master_orders as mo
    INNER JOIN clients as c ON c.id = mo.client_id
    INNER JOIN orders as o ON o.master_order_id = mo.id
    INNER JOIN products as p ON o.product_id = p.id
    ${where}
    ORDER BY ${orderQuery} ${sortQuery}
    LIMIT ${limitQuery}
    OFFSET ${offsetQuery}
    `);
        const master_orders_count_query = yield entityManager.query(`
    SELECT COUNT(DISTINCT mo.id) as count FROM master_orders as mo
    INNER JOIN clients as c ON c.id = mo.client_id
    INNER JOIN orders as o ON o.master_order_id = mo.id
    INNER JOIN products as p ON o.product_id = p.id
    ${where}
  `);
        const master_orders_count = parseInt(master_orders_count_query[0].count);
        const data = queryBuilder.map((val) => {
            return Object.assign(Object.assign({}, val), { client: JSON.parse(val.client) });
        });
        return {
            data,
            count: master_orders_count,
            page: pageQuery,
            limit: limitQuery,
            maxPages: Math.ceil(master_orders_count / limitQuery),
        };
    });
}
exports.getMasterOrdersService = getMasterOrdersService;
function getMasterOrderService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const masterOrdersRepository = (0, typeorm_1.getRepository)(models_1.MasterOrders);
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const masterOrders = (yield masterOrdersRepository.findOne({
            relations: ["client_id"],
            where: { id },
        }));
        if (!masterOrders)
            throw new Error("Pedidos não encontrados");
        const allOrders = yield ordersRepository.find({
            where: { master_order_id: { id: id } },
            relations: ["product_id"],
        });
        return Object.assign(Object.assign({}, masterOrders), { orders: allOrders });
    });
}
exports.getMasterOrderService = getMasterOrderService;
function postMasterOrdersService({ body }) {
    return __awaiter(this, void 0, void 0, function* () {
        const masterOrdersRepository = (0, typeorm_1.getRepository)(models_1.MasterOrders);
        const createMasterOrder = masterOrdersRepository.create(body);
        const createdMaster = yield masterOrdersRepository.save(createMasterOrder);
        return createdMaster;
    });
}
exports.postMasterOrdersService = postMasterOrdersService;
function putMasterOrdersService({ body, id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const masterOrdersRepository = (0, typeorm_1.getRepository)(models_1.MasterOrders);
        const editMasterOrder = yield masterOrdersRepository.update({ id }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
        return editMasterOrder;
    });
}
exports.putMasterOrdersService = putMasterOrdersService;
function deleteMasterOrderService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const masterOrdersRepository = (0, typeorm_1.getRepository)(models_1.MasterOrders);
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const deleteOrders = yield ordersRepository.delete({
            master_order_id: id,
        });
        const deleteMasterOrder = yield masterOrdersRepository.delete({ id });
        return { deleteMasterOrder, deleteOrders };
    });
}
exports.deleteMasterOrderService = deleteMasterOrderService;
