import Rules from '../../utils/validator/rules'

import Validator from "../../utils/validator/validator"

import fp from 'fastify-plugin'

const plugin = (server: Server, opts:any, done:any) => {
    
    const rules = new Rules( server )

    rules.addRule({
        key: "required",
        handler: (context: Server) => async (payload : any, value : any, params: any, options: any, type : string, path : string) => {

            if(value === null || typeof value === 'undefined'){
                throw {
                    rule: 'required',
                    message: "Este valor es requerido"
                }
            }

            return value

        }
    })
 
    rules.addRule({
        key: "type",
        handler: (context: Server) => async (payload : any, value : any, params: any, options: any, type : string, path : string) => {
      
            if(options != type){

                throw {
                    rule: 'type',
                    message: "Este valor no corresponse al tipo correspondiente"
                }
            }

            return value

        }
    })

    const validate = async (schema: Schema, payload: any, params : any) => {

        const allRules = rules.getRules()

        const  validator = new Validator(schema, payload, params, allRules)

        return await validator.validate()

    }

    server.decorate('validate', validate)

    done()
}

const pluginDB = fp( plugin )

export default pluginDB

