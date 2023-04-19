"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const ajv_1 = __importDefault(require("ajv"));
const plugin = (server, opts, done) => {
    const validator = new ajv_1.default({
        removeAdditional: 'all',
        useDefaults: true,
        coerceTypes: true,
        allErrors: true
    });
    server.decorate('validator', validator);
    done();
};
const validation = (0, fastify_plugin_1.default)(plugin);
exports.default = validation;
