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
const controller_1 = __importDefault(require("@root/api/test/controller"));
const test_1 = require("@root/api/test/schemas/test");
const routes = (server, opts, done) => __awaiter(void 0, void 0, void 0, function* () {
    const controller = new controller_1.default(server);
    server.route({
        method: 'POST',
        url: '/',
        handler: controller.browse.bind(controller),
        config: {
            schema: test_1.schemaStore,
            permissions: [
                'module:create'
            ]
        }
    });
    done();
});
exports.default = routes;
