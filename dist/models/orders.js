"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Orders = class Orders {
    constructor() {
        this.updated_at = new Date();
    }
};
exports.Orders = Orders;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Orders.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", String)
], Orders.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.MasterOrders, (masterOrder) => masterOrder.id),
    (0, typeorm_1.JoinColumn)({ name: "master_order_id" }),
    __metadata("design:type", _1.MasterOrders)
], Orders.prototype, "master_order_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.Products, (product) => product.id),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", _1.MasterOrders)
], Orders.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Orders.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Orders.prototype, "updated_at", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Entity)("orders")
], Orders);
