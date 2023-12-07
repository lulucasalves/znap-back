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
exports.getClientService = exports.deleteClientService = exports.putClientService = exports.postClientService = exports.getClientsService = void 0;
const models_1 = require("../../models");
const typeorm_1 = require("typeorm");
function getClientsService({ limit, page, order, sort, filter, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const limitInt = parseInt(limit);
        const currentInt = parseInt(page);
        const limitQuery = limit ? limitInt : 15;
        const pageQuery = limit ? currentInt : 1;
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        let whereConditions = {};
        if (filter) {
            whereConditions = {
                where: [
                    { name: (0, typeorm_1.ILike)(`%${filter}%`) },
                    { email: (0, typeorm_1.ILike)(`%${filter}%`) },
                    { phone: (0, typeorm_1.ILike)(`%${filter}%`) },
                ],
            };
        }
        const clients = yield clientsRepository.findAndCount(Object.assign({ skip: (pageQuery - 1) * limitQuery, take: limitQuery, order: { [order !== null && order !== void 0 ? order : "created_at"]: sort !== null && sort !== void 0 ? sort : "DESC" } }, whereConditions));
        return {
            data: clients[0],
            count: clients[1],
            page: pageQuery,
            limit: limitQuery,
            maxPages: Math.ceil(clients[1] / limitQuery),
        };
    });
}
exports.getClientsService = getClientsService;
function postClientService({ body }) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const findDuplicated = yield clientsRepository.findOne({
            where: Object.assign({}, body),
        });
        if (findDuplicated)
            throw new Error("Cliente duplicado!");
        const createClient = clientsRepository.create(body);
        const createdClient = yield clientsRepository.save(createClient);
        return createdClient;
    });
}
exports.postClientService = postClientService;
function putClientService({ body, id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const findDuplicated = yield clientsRepository.findOne({
            where: Object.assign({}, body),
        });
        if (findDuplicated)
            throw new Error("Cliente duplicado!");
        const editClient = yield clientsRepository.update({
            id,
        }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
        return editClient;
    });
}
exports.putClientService = putClientService;
function deleteClientService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const masterOrdersRepository = (0, typeorm_1.getRepository)(models_1.MasterOrders);
        const ordersRepository = (0, typeorm_1.getRepository)(models_1.Orders);
        const entityManager = (0, typeorm_1.getManager)();
        const [getMasterOrder] = yield entityManager.query(`SELECT id FROM master_orders WHERE client_id = '${id}'`);
        if (getMasterOrder) {
            yield ordersRepository.delete({
                master_order_id: getMasterOrder.id,
            });
            yield masterOrdersRepository.delete({
                id: getMasterOrder.id,
            });
        }
        const deletedComponent = yield clientsRepository.delete({
            id,
        });
        return { deletedComponent };
    });
}
exports.deleteClientService = deleteClientService;
function getClientService({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const client = yield clientsRepository.findOne({
            where: { id },
        });
        if (!client)
            throw new Error("Cliente não encontrado");
        return client;
    });
}
exports.getClientService = getClientService;
