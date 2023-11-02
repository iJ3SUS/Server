declare class Rules {
    private rules;
    private server;
    constructor(server: Server);
    addRule(rule: any): void;
    getRules(): any;
}
export default Rules;
