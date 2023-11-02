const validatorMiddleware = (schema : Schema) => async (request : IRequest, reply: IReply) => {


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