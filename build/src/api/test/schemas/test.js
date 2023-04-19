"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaStore = void 0;
const schemaStore = {
    type: "object",
    properties: {
        name: {
            type: "string"
        }
    },
    required: ['name']
};
exports.schemaStore = schemaStore;
