"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const plugin = (server, opts, done) => {
    const container = new inversify_1.Container();
    server.decorate('container', container);
    done();
};
const pluginDB = (0, fastify_plugin_1.default)(plugin);
exports.default = pluginDB;
