"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const plugin = (server, opts, done) => {
    server.addHook('onRequest', (request, reply, done) => {
        const startTime = performance.now();
        request.startTime = startTime;
        done();
    });
    // server.addHook('onSend', (request:any, reply:any, response:any, done:any) => {
    //     const endTime = performance.now()
    //     const cpuTime = endTime - request.startTime
    //     console.log(`La solicitud ${request.id} tomó ${cpuTime} milisegundos de tiempo de CPU.`)
    //     done()
    // })
    done();
};
const pluginDB = (0, fastify_plugin_1.default)(plugin);
exports.default = pluginDB;
