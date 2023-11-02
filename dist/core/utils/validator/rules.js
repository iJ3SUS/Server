"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Rules {
    constructor(server) {
        this.rules = {};
        this.server = server;
    }
    addRule(rule) {
        this.rules[rule.key] = rule.handler(this.server);
    }
    getRules() {
        return this.rules;
    }
}
exports.default = Rules;
