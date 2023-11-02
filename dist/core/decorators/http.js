"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = void 0;
const route = (method, url, ...middlewares) => {
    return function (target, handler, descriptor) {
        const router = {
            method: method,
            url: url,
            preHandler: middlewares,
            handler: handler
        };
        if (target._routes) {
            let routeIndex = target._routes.findIndex((i) => i.handler == handler && i.method == method);
            if (routeIndex != -1) {
                target._routes[routeIndex] = router;
            }
            else {
                target._routes.push(router);
            }
        }
        else {
            target._routes = [router];
        }
        return descriptor;
    };
};
exports.route = route;
