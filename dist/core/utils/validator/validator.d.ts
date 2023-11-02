declare class Validator {
    schema: any;
    rules: any;
    payload: any;
    private errors;
    private copy;
    private keys;
    private params;
    constructor(schema: any, payload: any, params: any, rules: any);
    validate(): Promise<{
        errors: any;
        payload: any;
    }>;
    private validateObject;
    private calculatePaths;
    private deleteCopy;
    private removeProperty;
    getType(payload: any): "object" | "string" | "array";
}
export default Validator;
