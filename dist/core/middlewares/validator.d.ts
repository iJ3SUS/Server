declare const validatorMiddleware: (schema: Schema) => (request: IRequest, reply: IReply) => Promise<void>;
export default validatorMiddleware;
