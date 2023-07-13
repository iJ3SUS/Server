import Validator from "@root/core/utils/validator/validator"


const validatorMiddleware = (schema : Schema) => async (request : Request, reply: Reply) => {


    const data = request.method == 'GET' ? request.query : request.body

    const { errors, payload } = await request.server.validate(schema, data, request.params)

    if(errors){
        throw {
            statusCode: 422,
            errors: errors
        }
    }

}

export default validatorMiddleware