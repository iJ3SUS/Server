"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./core/types/global");
const server_1 = __importDefault(require("./core/plugins/server"));
exports.default = server_1.default;
