"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
//SERVER
const server_1 = __importDefault(require("@root/plugins/server"));
//PLUGINS
const validator_1 = __importDefault(require("@root/plugins/fastify/validator"));
const db_1 = __importDefault(require("@root/plugins/fastify/db"));
//ROUTES
const routes_1 = __importDefault(require("@root/api/test/routes"));
server_1.default.register(db_1.default, {
    uri: "mongodb://J3SUS:12345678@127.0.0.1:27017",
    database: "xPrueba"
});
server_1.default.register(validator_1.default, {
    removeAdditional: 'all',
    useDefaults: true,
    coerceTypes: true,
    allErrors: true
});
server_1.default.register(routes_1.default, {
    prefix: 'test'
});
server_1.default.get('/', (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    return { pong: 'it worked sd sd !' };
}));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server_1.default.listen({ port: 3000 });
        console.log("SERVER ON!!!");
    }
    catch (err) {
        server_1.default.log.error(err);
    }
});
start();
