"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("@root/util/controllers/decorators/validator");
class Controller {
    constructor(server) {
        this.server = server;
    }
    browse(request, reply) {
        return reply.send(request.body);
    }
    browse2(request, reply) {
        return reply.send(request.body);
    }
}
__decorate([
    (0, validator_1.validate)('e')
], Controller.prototype, "browse", null);
exports.default = Controller;
