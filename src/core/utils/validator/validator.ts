class Validator {

    public schema
    public rules 
    public payload
    private errors : any = {}
    private copy : any = null
    private keys : any = []
    private params : any = null

    constructor(schema : any, payload:any, params: any, rules : any){
        
        this.payload = payload
        this.schema = schema
        this.rules = rules

        this.params = params

        this.keys = Object.keys(schema.rules)

    }

    public async validate(){

        this.copy = {
            ...this.schema.rules
        }

        await this.validateObject(this.payload)

        Object.keys(this.copy).forEach((item : any) => {

            const error = {
                rule: 'unkown',
                message: 'No exists key'
            }

            this.errors[item] ? this.errors[item].push(error) : this.errors[item] = [error]
        })

        const errors = Object.keys(this.errors).length > 0 ? this.errors : null

        return {
            errors: errors,
            payload: this.payload
        }
        
    }

    private async validateObject(payload : any, path : string = '__ROOT', realPath : string = '__ROOT'){

        const type = this.getType(payload)

        if(type == 'string') return

        for (let key in payload) {

            const { xPath, yPath } = this.calculatePaths(path, realPath, type, key)

            const rules = this.schema.rules[xPath]

            this.deleteCopy(xPath)
            
            if(this.removeProperty(rules, xPath)){

                delete payload[key] 
                continue
                
            }

            for(let rule in rules){

                const handler = this.rules[rule]
                
                try {
                    
                    if(!handler){

                        throw {
                            rule: rule,
                            message: "No existe esta regla de validación"
                        }

                    }
                   
                    const newType = this.getType(payload[key])
                
                    const response = await handler(this.payload, payload[key], this.params, rules[rule], newType, xPath)

                    payload[key] = response
    
                } catch (error : any) {

                    if(this.schema.messages && this.schema.messages[xPath] && this.schema.messages[xPath][rule]){
                       
                        error.message = this.schema.messages[xPath][rule]

                    }

                    this.errors[yPath] ? this.errors[yPath].push(error) : this.errors[yPath] = [error]


                }  

            }

            await this.validateObject(payload[key], xPath, yPath)

        }

    }

    private calculatePaths(path : string, realPath : string,  type : string, key: string){

        return {
            xPath: path == '__ROOT' ? key : type == 'object' ?  (path + '.' + key) : (path + '.*'),
            yPath: realPath == '__ROOT' ? key : (realPath + '.' + key)
        }
     
    }

    private deleteCopy(path : string){
        delete this.copy[path]
    }

    private removeProperty(rules : any, path : string){

        if(rules) return false

        return !this.keys.some((item : string) => {
            return item.startsWith(path)
        })
    }

    public getType(payload: any){

        if(typeof payload === 'string') return 'string'

        if(payload instanceof Array ) return 'array'

        return 'object'

    }

}

export default Validator