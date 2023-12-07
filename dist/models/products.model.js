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
exports.Products = void 0;
const typeorm_1 = require("typeorm");
const _1 = require(".");
let Products = class Products {
    constructor() {
        this.available = true;
        this.updated_at = new Date();
    }
};
exports.Products = Products;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Products.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], Products.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "float" }),
    __metadata("design:type", Number)
], Products.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "bool" }),
    __metadata("design:type", Boolean)
], Products.prototype, "available", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "created_at",
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Products.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Products.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => _1.ProductCategories, (category) => category.id),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", _1.ProductCategories)
], Products.prototype, "category_id", void 0);
exports.Products = Products = __decorate([
    (0, typeorm_1.Entity)("products")
], Products);
