declare const route: (method: string, url: string, ...middlewares: any[]) => (target: any, handler: string, descriptor: PropertyDescriptor) => PropertyDescriptor;
export { route };
