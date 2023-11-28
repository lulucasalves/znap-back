"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const restify = __importStar(require("restify"));
const typeorm_1 = require("typeorm");
const typeorm_2 = require("./typeorm");
const routes_1 = require("./routes");
exports.server = restify.createServer({
    name: "Znap Server",
    version: "1.0.0",
});
exports.server.use(restify.plugins.acceptParser(exports.server.acceptable));
exports.server.use(restify.plugins.queryParser());
exports.server.use(restify.plugins.bodyParser());
(0, typeorm_1.createConnection)(typeorm_2.typeorm);
(0, routes_1.routes)(exports.server);
const PORT = process.env.PORT || 8080;
exports.server.listen(PORT, () => {
    console.log(`Server available on the port ${PORT}`);
});
