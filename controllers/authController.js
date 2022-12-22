const login =  async(request, reply) => {

    const { db, body } = request
    
    if(body.document){
        body.document = String( body.document )
    }

    const model = await db.collection('users').findOne({
        cc: body.document
    })

    if(model){
        return reply.send(model) 
    }

    return reply.code(401).send("Unauthorized")

}

const logs = async(request, reply) => {

    return reply.send({
        response: true
    })

}


export default {
    logs,
    login
}