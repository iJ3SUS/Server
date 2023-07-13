
class Rules {

    private rules : any = {}
    private server: Server

    constructor(server : Server){
        this.server = server
    }

    public addRule(rule: any){

        this.rules[rule.key] = rule.handler(this.server)

    }

    public getRules(){
        return this.rules
    }


}


export default Rules