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
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./index"));
const recursive_modules_1 = __importDefault(require("./core/utils/misc/recursive-modules"));
const module_1 = __importDefault(require("./core/plugins/fastify/module"));
const ioc_1 = __importDefault(require("./core/plugins/fastify/ioc"));
index_1.default.register(ioc_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const controllers = yield (0, recursive_modules_1.default)(path_1.default.join(__dirname, 'modules'));
    controllers.forEach((i) => {
        index_1.default.register(module_1.default, {
            controller: i.default,
            prefix: i.prefix
        });
    });
    yield index_1.default.listen({ port: 3000 });
});
start();
