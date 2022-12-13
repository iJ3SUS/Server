
const browse = async (request, reply) => {

    const { db } = request

    const criteria = request.query

    const model = await db.collection('clients').find( criteria ).toArray()

    return reply.send( model )

} 

const show = async (request, reply) =>{

    const { db, objectId } = request

    const { id } = request.params

    const model = await db.collection('clients').findOne( new objectId(id) )

    return reply.send(model)
}

const create = async(request, reply) => {

    if(!request.body){
        return reply.send({})
    }

    const model = await request.db.collection('clients').insertOne(request.body)

    return reply.send(model)
}

const update = async(request, reply) => {

    const { db, objectId } = request

    const { id } = request.params

    if(request.body._id){
        delete request.body._id
    }

    const model = await request.db.collection('clients').updateOne(
        { _id: new objectId(id) },
        {
          $set: request.body,
          $currentDate: { lastModified: true }
        }
    )

    return reply.send(model)

}
export default {
    update,
    browse,
    create,
    show
}