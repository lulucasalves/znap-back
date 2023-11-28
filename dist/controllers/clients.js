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
exports.getClientController = exports.deleteClientController = exports.putClientController = exports.postClientController = exports.getClientsController = void 0;
const typeorm_1 = require("typeorm");
const models_1 = require("../models");
function getClientsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { limit, page, order, sort } = req.query;
        const limitInt = parseInt(limit);
        const currentInt = parseInt(page);
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const clients = yield clientsRepository.findAndCount({
            skip: (currentInt - 1) * limitInt,
            take: limitInt,
            order: { [order !== null && order !== void 0 ? order : "created_at"]: sort !== null && sort !== void 0 ? sort : "DESC" },
        });
        res.json({
            data: clients[0],
            count: clients[1],
            page: currentInt,
            limit: limitInt,
            maxPages: Math.ceil(clients[1] / limitInt),
        });
    });
}
exports.getClientsController = getClientsController;
function postClientController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const createClient = clientsRepository.create(body);
        const createdClient = yield clientsRepository.save(createClient);
        res.json(createdClient);
    });
}
exports.postClientController = postClientController;
function putClientController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const body = req.body;
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const createdClient = yield clientsRepository.update({
            id,
        }, Object.assign(Object.assign({}, body), { updated_at: new Date() }));
        res.json(createdClient);
    });
}
exports.putClientController = putClientController;
function deleteClientController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const deleteClient = yield clientsRepository.delete({
            id,
        });
        res.json(deleteClient);
    });
}
exports.deleteClientController = deleteClientController;
function getClientController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const clientsRepository = (0, typeorm_1.getRepository)(models_1.Clients);
        const client = yield clientsRepository.findOne({
            where: { id },
        });
        res.json(client);
    });
}
exports.getClientController = getClientController;
