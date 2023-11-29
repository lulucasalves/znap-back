"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
          ? (desc = Object.getOwnPropertyDescriptor(target, key))
          : desc,
      d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clients = void 0;
const typeorm_1 = require("typeorm");
const Clients = class Clients {
  constructor() {
    this.updated_at = new Date();
  }
};
exports.Clients = Clients;
__decorate(
  [
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String),
  ],
  Clients.prototype,
  "id",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String),
  ],
  Clients.prototype,
  "name",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String),
  ],
  Clients.prototype,
  "email",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String),
  ],
  Clients.prototype,
  "phone",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String),
  ],
  Clients.prototype,
  "city",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String),
  ],
  Clients.prototype,
  "state",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String),
  ],
  Clients.prototype,
  "address",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String),
  ],
  Clients.prototype,
  "cep",
  void 0
);
__decorate(
  [(0, typeorm_1.Column)({ type: "int" }), __metadata("design:type", Number)],
  Clients.prototype,
  "address_number",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({
      name: "created_at",
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date),
  ],
  Clients.prototype,
  "created_at",
  void 0
);
__decorate(
  [
    (0, typeorm_1.Column)({ type: "timestamp" }),
    __metadata("design:type", Date),
  ],
  Clients.prototype,
  "updated_at",
  void 0
);
exports.Clients = Clients = __decorate(
  [(0, typeorm_1.Entity)("clients")],
  Clients
);
