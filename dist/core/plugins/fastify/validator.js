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
const rules_1 = __importDefault(require("../../utils/validator/rules"));
const validator_1 = __importDefault(require("../../utils/validator/validator"));
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const plugin = (server, opts, done) => {
    const rules = new rules_1.default(server);
    rules.addRule({
        key: "required",
        handler: (context) => (payload, value, params, options, type, path) => __awaiter(void 0, void 0, void 0, function* () {
            if (value === null || typeof value === 'undefined') {
                throw {
                    rule: 'required',
                    message: "Este valor es requerido"
                };
            }
            return value;
        })
    });
    rules.addRule({
        key: "type",
        handler: (context) => (payload, value, params, options, type, path) => __awaiter(void 0, void 0, void 0, function* () {
            if (options != type) {
                throw {
                    rule: 'type',
                    message: "Este valor no corresponse al tipo correspondiente"
                };
            }
            return value;
        })
    });
    const validate = (schema, payload, params) => __awaiter(void 0, void 0, void 0, function* () {
        const allRules = rules.getRules();
        const validator = new validator_1.default(schema, payload, params, allRules);
        return yield validator.validate();
    });
    server.decorate('validate', validate);
    done();
};
const pluginDB = (0, fastify_plugin_1.default)(plugin);
exports.default = pluginDB;
