"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deserializeUser_1 = __importDefault(require("../middleware/deserializeUser"));
const routes_1 = __importDefault(require("../routes"));
function creatServer() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(deserializeUser_1.default);
    (0, routes_1.default)(app);
    return app;
}
exports.default = creatServer;
