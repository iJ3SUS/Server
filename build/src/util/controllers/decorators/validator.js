"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
function validate(schema) {
    return function (target, methodName, descriptor) {
        const method = descriptor.value;
        descriptor.value = function (request, reply) {
            const { schema } = reply.context.config;
            const isValid = false;
            if (!isValid) {
                return reply.send(['PRUEBA PURBEA']);
            }
            return method.call(this, request, reply);
        };
        return descriptor;
    };
}
exports.validate = validate;
