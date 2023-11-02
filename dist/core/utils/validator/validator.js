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
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    constructor(schema, payload, params, rules) {
        this.errors = {};
        this.copy = null;
        this.keys = [];
        this.params = null;
        this.payload = payload;
        this.schema = schema;
        this.rules = rules;
        this.params = params;
        this.keys = Object.keys(schema.rules);
    }
    validate() {
        return __awaiter(this, void 0, void 0, function* () {
            this.copy = Object.assign({}, this.schema.rules);
            yield this.validateObject(this.payload);
            Object.keys(this.copy).forEach((item) => {
                const error = {
                    rule: 'unkown',
                    message: 'No exists key'
                };
                this.errors[item] ? this.errors[item].push(error) : this.errors[item] = [error];
            });
            const errors = Object.keys(this.errors).length > 0 ? this.errors : null;
            return {
                errors: errors,
                payload: this.payload
            };
        });
    }
    validateObject(payload, path = '__ROOT', realPath = '__ROOT') {
        return __awaiter(this, void 0, void 0, function* () {
            const type = this.getType(payload);
            if (type == 'string')
                return;
            for (let key in payload) {
                const { xPath, yPath } = this.calculatePaths(path, realPath, type, key);
                const rules = this.schema.rules[xPath];
                this.deleteCopy(xPath);
                if (this.removeProperty(rules, xPath)) {
                    delete payload[key];
                    continue;
                }
                for (let rule in rules) {
                    const handler = this.rules[rule];
                    try {
                        if (!handler) {
                            throw {
                                rule: rule,
                                message: "No existe esta regla de validación"
                            };
                        }
                        const newType = this.getType(payload[key]);
                        const response = yield handler(this.payload, payload[key], this.params, rules[rule], newType, xPath);
                        payload[key] = response;
                    }
                    catch (error) {
                        if (this.schema.messages && this.schema.messages[xPath] && this.schema.messages[xPath][rule]) {
                            error.message = this.schema.messages[xPath][rule];
                        }
                        this.errors[yPath] ? this.errors[yPath].push(error) : this.errors[yPath] = [error];
                    }
                }
                yield this.validateObject(payload[key], xPath, yPath);
            }
        });
    }
    calculatePaths(path, realPath, type, key) {
        return {
            xPath: path == '__ROOT' ? key : type == 'object' ? (path + '.' + key) : (path + '.*'),
            yPath: realPath == '__ROOT' ? key : (realPath + '.' + key)
        };
    }
    deleteCopy(path) {
        delete this.copy[path];
    }
    removeProperty(rules, path) {
        if (rules)
            return false;
        return !this.keys.some((item) => {
            return item.startsWith(path);
        });
    }
    getType(payload) {
        if (typeof payload === 'string')
            return 'string';
        if (payload instanceof Array)
            return 'array';
        return 'object';
    }
}
exports.default = Validator;
