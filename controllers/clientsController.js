
const create =  async(request, reply) => {

    if(!request.body){
        return reply.send({})
    }

    await request.db.collection('clients').insertMany(request.body);

    return reply.send({
        message: "OK"
    })
}

export default {
    create
}