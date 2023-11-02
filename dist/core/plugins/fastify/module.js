"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
const register = (controller) => {
    const dependencies = Reflect.getMetadata('design:paramtypes', controller);
    if (!dependencies)
        return [];
    let result = [];
    dependencies.forEach((dependency) => {
        result.push(dependency);
        result = [
            ...register(dependency),
            ...result
        ];
    });
    return result;
};
const plugin = (server, opts, done) => {
    const dependencies = register(opts.controller);
    dependencies.forEach((dependency) => {
        server.container.bind(dependency).to(dependency);
    });
    const controller = server.container.resolve(opts.controller);
    if (controller._routes) {
        controller._routes.forEach((route) => {
            // route.url =  route.url.startsWith("/") ? route.url : '/' + route.url
            let prefix = opts.prefix + route.url;
            // prefix = prefix.endsWith("/") ? prefix.slice(0, -1) : prefix
            // prefix =  prefix.startsWith("//") ? prefix.slice(1) : prefix
            const regex = /^\/+|\/+$/g;
            prefix = prefix.replace(regex, '');
            prefix = `/${prefix}`;
            console.log("RUTA REGISTRADA: " + prefix);
            server.route({
                method: route.method,
                url: prefix,
                preHandler: route.preHandler,
                handler: controller[route.handler].bind(controller)
            });
        });
    }
    done();
};
const pluginDB = (0, fastify_plugin_1.default)(plugin);
exports.default = pluginDB;
