"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const plugin = (server, opts, done) => {
    const client = new mongodb_1.MongoClient(opts.uri, {
        serverSelectionTimeoutMS: 3500
    });
    client.connect().catch(err => {
        server.log.error(err);
    });
    const util = {
        objectId: mongodb_1.ObjectId
    };
    const db = client.db(opts.database);
    server.decorate('db', db);
    server.decorate('util', util);
    done();
};
const pluginDB = (0, fastify_plugin_1.default)(plugin);
exports.default = pluginDB;
